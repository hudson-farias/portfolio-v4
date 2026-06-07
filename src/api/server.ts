import { cookies } from 'next/headers'

import { AUTH_COOKIE } from './client'

class ApiServer {
  private baseURL: string

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_URL || ''
  }

  private async authHeaders(): Promise<Record<string, string>> {
    const cookieStore = await cookies()
    const token = cookieStore.get(AUTH_COOKIE)?.value

    return {
      'Content-Type': 'application/json',
      ...(token ? { Cookie: `${AUTH_COOKIE}=${token}` } : {}),
    }
  }

  async request(method: string, endpoint: string, body?: unknown): Promise<Response> {
    const headers = await this.authHeaders()

    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      cache: 'no-store',
      credentials: 'include',
    })

    return response
  }

  get(endpoint: string): Promise<Response> {
    return this.request('GET', endpoint)
  }

  post(endpoint: string, body: unknown): Promise<Response> {
    return this.request('POST', endpoint, body)
  }

  put(endpoint: string, body: unknown): Promise<Response> {
    return this.request('PUT', endpoint, body)
  }

  delete(endpoint: string): Promise<Response> {
    return this.request('DELETE', endpoint)
  }
}

export const API = new ApiServer()
