import { cookies } from "next/headers"

const AUTH_COOKIE = 'ACCESS_TOKEN_ADMIN'

class ApiServer {
  private baseURL: string

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_URL || ''
  }

  private async authHeaders(): Promise<Record<string, string>> {
    const cookieStore = await cookies()
    const token = cookieStore.get(AUTH_COOKIE)?.value
    return {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    }
  }

  async request(method: string, endpoint: string, body?: unknown, requireAuth = false): Promise<Response> {
    const headers = await this.authHeaders()
    if (requireAuth && !headers.Authorization) {
      return new Response(null, { status: 401 })
    }

    return fetch(`${this.baseURL}${endpoint}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      cache: "no-store",
    })
  }

  get(endpoint: string, requireAuth = false): Promise<Response> {
    return this.request("GET", endpoint, undefined, requireAuth)
  }

  post(endpoint: string, body: unknown, requireAuth = true): Promise<Response> {
    return this.request("POST", endpoint, body, requireAuth)
  }

  put(endpoint: string, body: unknown, requireAuth = true): Promise<Response> {
    return this.request("PUT", endpoint, body, requireAuth)
  }

  delete(endpoint: string, requireAuth = true): Promise<Response> {
    return this.request("DELETE", endpoint, undefined, requireAuth)
  }

  async verify(): Promise<boolean> {
    const response = await API.get('/auth/verify')
    return response.status === 204
  }
}

export const API = new ApiServer()
