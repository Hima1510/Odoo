"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserNav } from "@/components/user-nav"
import { api } from "@/lib/api"

interface SwapRequest {
  id: number
  from_user: number
  to_user: number
  skills_offered: string
  skills_wanted: string
  message?: string
  status: string
  feedback?: string
}

const incomingRequests = [
  {
    id: 1,
    name: "Emma Wilson",
    image: "/placeholder.svg?height=80&width=80",
    skill: "Web Development",
    teachingSkills: ["JavaScript", "Spanish"],
    timeAgo: "1 day ago",
    status: "New",
  },
  {
    id: 2,
    name: "Sneha Sinha",
    image: "/placeholder.svg?height=80&width=80",
    skill: "Data Structures",
    teachingSkills: ["Algorithms", "Public Speaking"],
    timeAgo: "3 days ago",
    status: "New",
  },
]

const outgoingRequests = [
  {
    id: 1,
    name: "Aarav Sharma",
    image: "/placeholder.svg?height=80&width=80",
    skill: "UI Design",
    teachingSkills: ["Figma", "JavaScript"],
    timeAgo: "2 days ago",
    status: "Pending",
  },
  {
    id: 2,
    name: "Sarah Miller",
    image: "/placeholder.svg?height=80&width=80",
    skill: "Photography",
    teachingSkills: ["Portrait", "Python"],
    timeAgo: "yesterday",
    status: "Accepted",
  },
]

export default function RequestsPage() {
  const [swapRequests, setSwapRequests] = useState<SwapRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [incoming, setIncoming] = useState(incomingRequests)
  const [outgoing, setOutgoing] = useState(outgoingRequests)

  useEffect(() => {
    const fetchSwaps = async () => {
      const response = await api.getSwaps()
      if (response.data) {
        setSwapRequests(response.data)
      }
      setLoading(false)
    }

    fetchSwaps()
  }, [])

  const handleAccept = async (swapId: number, name: string) => {
    const response = await api.updateSwapStatus(swapId, "Accepted")
    if (response.msg) {
      alert(`You accepted the swap request from ${name}!`)
      // Refresh the data
      const updatedResponse = await api.getSwaps()
      if (updatedResponse.data) {
        setSwapRequests(updatedResponse.data)
      }
    }
  }

  const handleDecline = async (swapId: number, name: string) => {
    if (confirm(`Are you sure you want to decline ${name}'s request?`)) {
      const response = await api.updateSwapStatus(swapId, "Declined")
      if (response.msg) {
        // Refresh the data
        const updatedResponse = await api.getSwaps()
        if (updatedResponse.data) {
          setSwapRequests(updatedResponse.data)
        }
      }
    }
  }

  const handleCancel = (id: number, name: string) => {
    if (confirm(`Cancel your request to ${name}?`)) {
      setOutgoing(outgoing.filter((req) => req.id !== id))
    }
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
        <h2 className="text-3xl font-bold mb-4">Swap Requests</h2>
        <p className="text-gray-600 mb-8">Manage your incoming and outgoing skill swap requests</p>

        <Tabs defaultValue="incoming" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="incoming">Incoming Requests</TabsTrigger>
            <TabsTrigger value="outgoing">Outgoing Requests</TabsTrigger>
          </TabsList>

          <TabsContent value="incoming" className="mt-6">
            <div className="space-y-4">
              {incoming.map((request) => (
                <Card key={request.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <Image
                        src={request.image || "/placeholder.svg"}
                        alt={request.name}
                        width={80}
                        height={80}
                        className="rounded-full border-4 border-white shadow-lg"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h5 className="text-xl font-semibold">{request.name}</h5>
                          <Badge className="bg-blue-100 text-blue-800">{request.status}</Badge>
                        </div>
                        <p className="text-gray-600 mb-2">
                          Wants to learn <strong>{request.skill}</strong> from you
                        </p>
                        <div className="mb-2">
                          {request.teachingSkills.map((skill, index) => (
                            <Badge key={skill} variant={index === 0 ? "default" : "secondary"} className="mr-2">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <small className="text-gray-500">Requested {request.timeAgo}</small>
                      <div className="space-x-2">
                        <Button
                          size="sm"
                          onClick={() => handleAccept(request.id, request.name)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Accept
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDecline(request.id, request.name)}
                          className="text-red-600 border-red-600 hover:bg-red-50"
                        >
                          Decline
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="outgoing" className="mt-6">
            <div className="space-y-4">
              {outgoing.map((request) => (
                <Card key={request.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <Image
                        src={request.image || "/placeholder.svg"}
                        alt={request.name}
                        width={80}
                        height={80}
                        className="rounded-full border-4 border-white shadow-lg"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h5 className="text-xl font-semibold">{request.name}</h5>
                          <Badge
                            className={
                              request.status === "Accepted"
                                ? "bg-green-100 text-green-800"
                                : "bg-blue-100 text-blue-800"
                            }
                          >
                            {request.status}
                          </Badge>
                        </div>
                        <p className="text-gray-600 mb-2">
                          You requested to learn <strong>{request.skill}</strong>
                        </p>
                        <div className="mb-2">
                          {request.teachingSkills.map((skill, index) => (
                            <Badge key={skill} variant={index === 0 ? "default" : "secondary"} className="mr-2">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <small className="text-gray-500">
                        {request.status === "Accepted" ? `Accepted ${request.timeAgo}` : `Sent ${request.timeAgo}`}
                      </small>
                      {request.status === "Pending" ? (
                        <Button variant="outline" size="sm" onClick={() => handleCancel(request.id, request.name)}>
                          Cancel Request
                        </Button>
                      ) : (
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      )}
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
            <Link href="/status" className="text-gray-500 hover:text-gray-700">
              Swap Status
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
