"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { api } from "@/lib/api"
import { ProtectedRoute } from "@/components/protected-route"

interface SwapData {
  id: number
  status: string
}

export default function AdminPage() {
  const [swaps, setSwaps] = useState<SwapData[]>([])
  const [broadcastTitle, setBroadcastTitle] = useState("")
  const [broadcastMessage, setBroadcastMessage] = useState("")
  const [banUserId, setBanUserId] = useState("")

  useEffect(() => {
    fetchSwaps()
  }, [])

  const fetchSwaps = async () => {
    const response = await api.getAllSwaps()
    if (response.data) {
      setSwaps(response.data)
    }
  }

  const handleBanUser = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!banUserId) return

    const response = await api.banUser(Number.parseInt(banUserId))
    if (response.msg) {
      alert("User banned successfully")
      setBanUserId("")
    } else {
      alert(response.error || "Failed to ban user")
    }
  }

  const handleBroadcast = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!broadcastTitle || !broadcastMessage) return

    const response = await api.sendBroadcast(broadcastTitle, broadcastMessage)
    if (response.msg) {
      alert("Broadcast message sent successfully")
      setBroadcastTitle("")
      setBroadcastMessage("")
    } else {
      alert(response.error || "Failed to send broadcast")
    }
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-white">
        {/* Navbar */}
        <nav className="bg-gradient-to-r from-purple-900 via-orange-300 to-purple-300 animate-gradient-x">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="flex items-center space-x-2">
                <Image src="/placeholder.svg?height=32&width=32" alt="Skill Swap Logo" width={32} height={32} />
                <span className="text-white font-semibold">SKILL SWAP ADMIN</span>
              </Link>

              <div className="flex items-center space-x-4">
                <Link href="/profiles">
                  <Button
                    variant="outline"
                    className="text-white border-white hover:bg-white hover:text-purple-900 bg-transparent"
                  >
                    Back to App
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Content */}
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

          <Tabs defaultValue="swaps" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="swaps">Swap Management</TabsTrigger>
              <TabsTrigger value="users">User Management</TabsTrigger>
              <TabsTrigger value="broadcast">Broadcast</TabsTrigger>
            </TabsList>

            <TabsContent value="swaps" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>All Swap Requests</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {swaps.map((swap) => (
                      <div key={swap.id} className="flex justify-between items-center p-4 border rounded-lg">
                        <div>
                          <span className="font-medium">Swap #{swap.id}</span>
                        </div>
                        <Badge
                          className={
                            swap.status === "Accepted"
                              ? "bg-green-100 text-green-800"
                              : swap.status === "Declined"
                                ? "bg-red-100 text-red-800"
                                : "bg-blue-100 text-blue-800"
                          }
                        >
                          {swap.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="users" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleBanUser} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="banUserId">User ID to Ban</Label>
                      <Input
                        id="banUserId"
                        type="number"
                        value={banUserId}
                        onChange={(e) => setBanUserId(e.target.value)}
                        placeholder="Enter user ID"
                        required
                      />
                    </div>
                    <Button type="submit" className="bg-red-600 hover:bg-red-700">
                      Ban User
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="broadcast" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Send Broadcast Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleBroadcast} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="broadcastTitle">Title</Label>
                      <Input
                        id="broadcastTitle"
                        value={broadcastTitle}
                        onChange={(e) => setBroadcastTitle(e.target.value)}
                        placeholder="Enter broadcast title"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="broadcastMessage">Message</Label>
                      <Textarea
                        id="broadcastMessage"
                        value={broadcastMessage}
                        onChange={(e) => setBroadcastMessage(e.target.value)}
                        placeholder="Enter broadcast message"
                        rows={4}
                        required
                      />
                    </div>
                    <Button type="submit" className="bg-gradient-to-r from-purple-900 via-orange-300 to-purple-300">
                      Send Broadcast
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ProtectedRoute>
  )
}
