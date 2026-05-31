import nookies from "nookies"

const AUTH_COOKIE = 'ACCESS_TOKEN_ADMIN'

class ApiClient {
  private baseURL: string
  public loginUrl: string

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_URL || ''
    this.loginUrl = `${this.baseURL}/auth/discord/redirect`
  }

  private headers(isForm: boolean = false): { [key: string]: string } {
    const cookies = nookies.get(null)
    const token = cookies[AUTH_COOKIE]
    const headers: Record<string, string> = {
      ...(token && { Authorization: `Bearer ${token}` }),
    }
    if (!isForm) headers["Content-Type"] = "application/json"
    return headers
  }

  private async request(method: string, endpoint: string, body?: unknown): Promise<Response> {
    const isForm = body instanceof FormData
    const headers = this.headers(isForm)
    const payload = isForm ? body : body !== undefined ? JSON.stringify(body) : undefined

    return fetch(`${this.baseURL}${endpoint}`, {
      method,
      headers,
      body: payload,
    })
  }

  public get(endpoint: string): Promise<Response> {
    return this.request("GET", endpoint)
  }

  public post(endpoint: string, body: unknown): Promise<Response> {
    return this.request("POST", endpoint, body)
  }

  public put(endpoint: string, body: unknown): Promise<Response> {
    return this.request("PUT", endpoint, body)
  }

  public patch(endpoint: string, body: unknown): Promise<Response> {
    return this.request("PATCH", endpoint, body)
  }

  public delete(endpoint: string): Promise<Response> {
    return this.request("DELETE", endpoint)
  }

  public setToken(accessToken: string, redirect: string = "/admin") {
    nookies.set(null, AUTH_COOKIE, accessToken, {
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    })

    window.location.href = redirect
  }

  public deleteToken(redirect: string = "/admin"): void {
    nookies.destroy(null, AUTH_COOKIE, { path: "/" })

    window.location.href = redirect
  }

  verify(): boolean {
    const cookies = nookies.get(null)
    return !!cookies[AUTH_COOKIE]
  }
}

export const API = new ApiClient()
