"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin } from "lucide-react"
import { UserNav } from "@/components/user-nav"
import { api } from "@/lib/api"

// Add this interface at the top
interface Profile {
  id: number
  name: string
  skills: string[]
  location?: string
}

export default function ProfilesPage() {
  // Replace the static profiles array with:
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [loading, setLoading] = useState(true)
  const [skillFilter, setSkillFilter] = useState("all")
  const [locationFilter, setLocationFilter] = useState("all")

  // Add this useEffect after the state declarations:
  useEffect(() => {
    const fetchProfiles = async () => {
      const response = await api.searchUsers()
      if (response.data) {
        setProfiles(response.data)
      }
      setLoading(false)
    }

    fetchProfiles()
  }, [])

  // Update the handleRequestSwap function:
  const handleRequestSwap = async (profileId: number, profileName: string) => {
    // TODO: Get current user ID from auth context
    const currentUserId = 1 // Placeholder

    const swapData = {
      from_user: currentUserId,
      to_user: profileId,
      skills_offered: "Web Development", // TODO: Let user select
      skills_wanted: "Design", // TODO: Let user select
      message: `Hi ${profileName}, I'd like to swap skills with you!`,
    }

    const response = await api.createSwapRequest(swapData)

    if (response.msg) {
      alert(`Swap request sent to ${profileName}!`)
    } else {
      alert(response.error || "Failed to send request")
    }
  }

  // Add loading state in the render:
  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-purple-900 via-orange-300 to-purple-300 animate-gradient-x">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/placeholder.svg?height=32&width=32" alt="Skill Swap Logo" width={32} height={32} />
              <span className="text-white font-semibold">SKILL SWAP</span>
            </Link>

            <div className="flex items-center space-x-4">
              <UserNav />
              <a href="https://github.com/Skill-Swap-Network" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outline"
                  size="icon"
                  className="text-white border-white hover:bg-white hover:text-purple-900 bg-transparent"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                  </svg>
                </Button>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-4">Browse Public Profiles</h2>
        <p className="text-gray-600 mb-8">Connect with others to exchange skills and knowledge</p>

        {/* Search Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Filter by Skill</label>
                <Select value={skillFilter} onValueChange={setSkillFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Skills" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Skills</SelectItem>
                    <SelectItem value="programming">Programming</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="languages">Languages</SelectItem>
                    <SelectItem value="music">Music</SelectItem>
                    <SelectItem value="photography">Photography</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Filter by Location</label>
                <Select value={locationFilter} onValueChange={setLocationFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Locations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    <SelectItem value="new-york">New York</SelectItem>
                    <SelectItem value="london">London</SelectItem>
                    <SelectItem value="bangalore">Bangalore</SelectItem>
                    <SelectItem value="amsterdam">Amsterdam</SelectItem>
                    <SelectItem value="toronto">Toronto</SelectItem>
                    <SelectItem value="remote">Remote</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button className="bg-gradient-to-r from-purple-900 via-orange-300 to-purple-300">Apply Filters</Button>
          </CardContent>
        </Card>

        {/* Profiles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {profiles.map((profile) => (
            <Card key={profile.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <Image
                  src={profile.image || "/placeholder.svg"}
                  alt={profile.name}
                  width={100}
                  height={100}
                  className="rounded-full mx-auto mb-4 border-4 border-white shadow-lg"
                />
                <h4 className="text-xl font-semibold mb-1">{profile.name}</h4>
                {/* <p className="text-gray-600 mb-3">{profile.title}</p> */}

                {/* <div className="mb-3">
                  {profile.teachingSkills.map((skill) => (
                    <Badge key={skill} className="mr-1 mb-1 bg-blue-100 text-blue-800">
                      {skill}
                    </Badge>
                  ))}
                </div>

                <div className="mb-3">
                  {profile.learningSkills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="mr-1 mb-1 bg-yellow-100 text-yellow-800">
                      {skill}
                    </Badge>
                  ))}
                </div> */}

                <p className="text-sm text-gray-500 mb-4 flex items-center justify-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {profile.location}
                </p>

                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() => handleRequestSwap(profile.id, profile.name)}
                >
                  Request Swap
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8">
          <nav className="flex space-x-2">
            <Button variant="outline" disabled>
              Previous
            </Button>
            <Button variant="outline" className="bg-blue-600 text-white">
              1
            </Button>
            <Button variant="outline">2</Button>
            <Button variant="outline">3</Button>
            <Button variant="outline">Next</Button>
          </nav>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t py-8 mt-16">
        <div className="container mx-auto px-4">
          <nav className="flex justify-center space-x-8 mb-4">
            <Link href="/" className="text-gray-500 hover:text-gray-700">
              Home
            </Link>
            <Link href="/profiles" className="text-gray-500 hover:text-gray-700">
              My Profile
            </Link>
            <Link href="/requests" className="text-gray-500 hover:text-gray-700">
              Swap Requests
            </Link>
            <Link href="#" className="text-gray-500 hover:text-gray-700">
              Contact
            </Link>
          </nav>
          <p className="text-center text-gray-500">© 2025 Skill-Swap-Network</p>
        </div>
      </footer>
    </div>
  )
}
