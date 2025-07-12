const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

interface ApiResponse<T = any> {
  data?: T
  error?: string
  msg?: string
}

class ApiClient {
  private getAuthHeaders() {
    const token = localStorage.getItem("token")
    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    }
  }

  async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: this.getAuthHeaders(),
        ...options,
      })

      const data = await response.json()

      if (!response.ok) {
        return { error: data.error || "An error occurred" }
      }

      return { data, msg: data.msg }
    } catch (error) {
      return { error: "Network error occurred" }
    }
  }

  // Auth endpoints
  async register(userData: {
    name: string
    email: string
    password: string
    location?: string
    skills_offered?: string[]
    skills_wanted?: string[]
    availability?: string
    is_public?: boolean
  }) {
    return this.request("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    })
  }

  async login(credentials: { email: string; password: string }) {
    const response = await this.request<{ token: string }>("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    })

    if (response.data?.token) {
      localStorage.setItem("token", response.data.token)
    }

    return response
  }

  // User endpoints
  async getProfile(userId: number) {
    return this.request(`/users/profile/${userId}`)
  }

  async searchUsers(skill?: string) {
    const query = skill ? `?skill=${encodeURIComponent(skill)}` : ""
    return this.request(`/users/search${query}`)
  }

  // Swap endpoints
  async createSwapRequest(swapData: {
    from_user: number
    to_user: number
    skills_offered: string
    skills_wanted: string
    message?: string
  }) {
    return this.request("/swaps/", {
      method: "POST",
      body: JSON.stringify(swapData),
    })
  }

  async getSwaps() {
    return this.request("/swaps/")
  }

  async updateSwapStatus(swapId: number, status: string) {
    return this.request(`/swaps/${swapId}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    })
  }

  async submitFeedback(swapId: number, feedback: string) {
    return this.request(`/swaps/${swapId}/feedback`, {
      method: "POST",
      body: JSON.stringify({ feedback }),
    })
  }

  // Admin endpoints
  async banUser(userId: number) {
    return this.request(`/admin/ban/${userId}`, {
      method: "PATCH",
    })
  }

  async getAllSwaps() {
    return this.request("/admin/swaps")
  }

  async sendBroadcast(title: string, message: string) {
    return this.request("/admin/broadcast", {
      method: "POST",
      body: JSON.stringify({ title, message }),
    })
  }
}

export const api = new ApiClient()
