"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Star } from "lucide-react"
import { UserNav } from "@/components/user-nav"

const teachingSwaps = [
  {
    id: 1,
    name: "Emma Wilson",
    image: "/placeholder.svg?height=80&width=80",
    skill: "Web Development",
    skills: ["HTML/CSS", "JavaScript"],
    progress: 33,
    completed: 2,
    total: 6,
    nextSession: "Tomorrow, 3 PM",
    status: "Active",
  },
  {
    id: 2,
    name: "Sneha Sinha",
    image: "/placeholder.svg?height=80&width=80",
    skill: "Data Structures",
    skills: ["Algorithms", "Python"],
    progress: 50,
    completed: 4,
    total: 8,
    nextSession: "Friday, 2 PM",
    status: "Active",
  },
]

const learningSwaps = [
  {
    id: 1,
    name: "Aarav Sharma",
    image: "/placeholder.svg?height=80&width=80",
    skill: "UI Design",
    skills: ["Figma", "Adobe XD"],
    progress: 60,
    completed: 3,
    total: 5,
    nextSession: "Wednesday, 4 PM",
    status: "Active",
  },
  {
    id: 2,
    name: "Sarah Miller",
    image: "/placeholder.svg?height=80&width=80",
    skill: "Photography",
    skills: ["Portrait", "Lightroom"],
    progress: 25,
    completed: 1,
    total: 4,
    nextSession: "Sunday, 11 AM",
    status: "Active",
  },
]

const completedSwaps = [
  {
    id: 1,
    name: "Alex Turner",
    image: "/placeholder.svg?height=80&width=80",
    skill: "Graphic Design",
    skills: ["Illustrator", "Branding"],
    progress: 100,
    completed: 6,
    total: 6,
    rating: 4.5,
    status: "Completed",
  },
  {
    id: 2,
    name: "Emma Wilson",
    image: "/placeholder.svg?height=80&width=80",
    skill: "Guitar",
    skills: ["Chords", "Music Theory"],
    progress: 100,
    completed: 8,
    total: 8,
    rating: 5.0,
    status: "Completed",
  },
]

export default function StatusPage() {
  const handleDetails = (name: string, skill: string) => {
    alert(`Details for your swap with ${name} (${skill}) would show here.`)
  }

  const handleMessage = (name: string) => {
    alert(`Messaging interface with ${name} would open here.`)
  }

  const handleSwapAgain = (name: string) => {
    alert(`New swap request sent to ${name}!`)
  }

  const renderStars = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)
    }

    if (hasHalfStar) {
      stars.push(<Star key="half" className="w-4 h-4 fill-yellow-400/50 text-yellow-400" />)
    }

    const remainingStars = 5 - Math.ceil(rating)
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />)
    }

    return stars
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
        <h2 className="text-3xl font-bold mb-4">Swap Status</h2>
        <p className="text-gray-600 mb-8">Track the progress of your active skill exchanges</p>

        <Tabs defaultValue="teaching" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="teaching">Teaching</TabsTrigger>
            <TabsTrigger value="learning">Learning</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value="teaching" className="mt-6">
            <div className="space-y-4">
              {teachingSwaps.map((swap) => (
                <Card key={swap.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <Image
                        src={swap.image || "/placeholder.svg"}
                        alt={swap.name}
                        width={80}
                        height={80}
                        className="rounded-full border-4 border-white shadow-lg"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h5 className="text-xl font-semibold">{swap.name}</h5>
                          <Badge className="bg-green-100 text-green-800">{swap.status}</Badge>
                        </div>
                        <p className="text-gray-600 mb-2">
                          Teaching <strong>{swap.skill}</strong>
                        </p>
                        <div className="mb-2">
                          {swap.skills.map((skill) => (
                            <Badge key={skill} className="mr-2 bg-blue-100 text-blue-800">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span>Progress</span>
                        <span>
                          {swap.completed} of {swap.total} sessions completed
                        </span>
                      </div>
                      <Progress value={swap.progress} className="h-2" />
                    </div>

                    <div className="flex justify-between items-center">
                      <small className="text-gray-500">Next session: {swap.nextSession}</small>
                      <div className="space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleDetails(swap.name, swap.skill)}>
                          Details
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleMessage(swap.name)}>
                          Message
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="learning" className="mt-6">
            <div className="space-y-4">
              {learningSwaps.map((swap) => (
                <Card key={swap.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <Image
                        src={swap.image || "/placeholder.svg"}
                        alt={swap.name}
                        width={80}
                        height={80}
                        className="rounded-full border-4 border-white shadow-lg"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h5 className="text-xl font-semibold">{swap.name}</h5>
                          <Badge className="bg-green-100 text-green-800">{swap.status}</Badge>
                        </div>
                        <p className="text-gray-600 mb-2">
                          Learning <strong>{swap.skill}</strong>
                        </p>
                        <div className="mb-2">
                          {swap.skills.map((skill) => (
                            <Badge key={skill} className="mr-2 bg-blue-100 text-blue-800">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span>Progress</span>
                        <span>
                          {swap.completed} of {swap.total} sessions completed
                        </span>
                      </div>
                      <Progress value={swap.progress} className="h-2" />
                    </div>

                    <div className="flex justify-between items-center">
                      <small className="text-gray-500">Next session: {swap.nextSession}</small>
                      <div className="space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleDetails(swap.name, swap.skill)}>
                          Details
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleMessage(swap.name)}>
                          Message
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="mt-6">
            <div className="space-y-4">
              {completedSwaps.map((swap) => (
                <Card key={swap.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <Image
                        src={swap.image || "/placeholder.svg"}
                        alt={swap.name}
                        width={80}
                        height={80}
                        className="rounded-full border-4 border-white shadow-lg"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h5 className="text-xl font-semibold">{swap.name}</h5>
                          <Badge variant="secondary">{swap.status}</Badge>
                        </div>
                        <p className="text-gray-600 mb-2">
                          Learned <strong>{swap.skill}</strong>
                        </p>
                        <div className="mb-2">
                          {swap.skills.map((skill) => (
                            <Badge key={skill} className="mr-2 bg-blue-100 text-blue-800">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span>Progress</span>
                        <span>
                          {swap.completed} of {swap.total} sessions completed
                        </span>
                      </div>
                      <Progress value={swap.progress} className="h-2" />
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <div className="flex">{renderStars(swap.rating)}</div>
                        <span className="text-sm">{swap.rating}</span>
                      </div>
                      <div className="space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleDetails(swap.name, swap.skill)}>
                          Details
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleSwapAgain(swap.name)}
                          className="text-green-600 border-green-600 hover:bg-green-50"
                        >
                          Swap Again
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <footer className="border-t py-8 mt-16">
        <div className="container mx-auto px-4">
          <nav className="flex justify-center space-x-8 mb-4">
            <Link href="/profiles" className="text-gray-500 hover:text-gray-700">
              Profile
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
