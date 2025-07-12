import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function HomePage() {
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
              <Link href="/login">
                <Button
                  variant="outline"
                  className="text-white border-white hover:bg-white hover:text-purple-900 bg-transparent"
                >
                  Login
                </Button>
              </Link>
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

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-900 via-orange-300 to-purple-300 animate-gradient-x text-center py-20 border-b">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold text-white mb-6">SKILL SWAP NETWORK</h1>
          <div className="max-w-2xl mx-auto">
            <p className="text-xl text-white mb-8">
              The skill swap hub revolutionizes how students learn and support one another by matching based on
              individual strengths.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-white border-white hover:bg-white hover:text-purple-900 bg-transparent"
                >
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="lg" className="bg-black text-white hover:bg-gray-800">
                  Sign up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8 border-b pb-4">Features</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">Assign mentor</h3>
            <p className="text-gray-600">
              Connect with experienced mentors who can guide you in your learning journey.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">Chat section</h3>
            <p className="text-gray-600">Real-time messaging to communicate with your skill swap partners.</p>
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">Secure</h3>
            <p className="text-gray-600">Your data and interactions are protected with advanced security measures.</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4">
          <nav className="flex justify-center space-x-8 mb-4">
            <Link href="/" className="text-gray-500 hover:text-gray-700">
              Home
            </Link>
            <Link href="/login" className="text-gray-500 hover:text-gray-700">
              Login
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
