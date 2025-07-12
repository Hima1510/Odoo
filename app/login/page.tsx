"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/lib/auth"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [remember, setRemember] = useState(false)

  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const result = await login(email, password)

    if (result.success) {
      router.push("/profiles")
    } else {
      alert(result.error || "Login failed")
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
              <Link href="/signup">
                <Button className="bg-black text-white hover:bg-gray-800">Sign up</Button>
              </Link>
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

      {/* Login Form */}
      <div className="container mx-auto px-4 py-20">
        <Card className="max-w-md mx-auto bg-gradient-to-r from-cyan-50 to-purple-200">
          <CardHeader>
            <CardTitle className="text-center text-2xl">Login to Skill Swap</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={remember}
                  onCheckedChange={(checked) => setRemember(checked as boolean)}
                />
                <Label htmlFor="remember">Remember me</Label>
              </div>
              <Button type="submit" className="w-full bg-gradient-to-r from-purple-900 via-orange-300 to-purple-300">
                Login
              </Button>
              <div className="text-center space-y-2">
                <p>
                  {"Don't have an account? "}
                  <Link href="/signup" className="text-blue-600 hover:underline">
                    Sign up
                  </Link>
                </p>
                <p>
                  <Link href="#" className="text-blue-600 hover:underline">
                    Forgot password?
                  </Link>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4">
          <nav className="flex justify-center space-x-8 mb-4">
            <Link href="/" className="text-gray-500 hover:text-gray-700">
              Home
            </Link>
            <Link href="#" className="text-gray-500 hover:text-gray-700">
              Contact
            </Link>
            <Link href="#" className="text-gray-500 hover:text-gray-700">
              FAQs
            </Link>
            <Link href="#" className="text-gray-500 hover:text-gray-700">
              About
            </Link>
          </nav>
          <p className="text-center text-gray-500">© 2025 Skill-Swap-Network</p>
        </div>
      </footer>
    </div>
  )
}
