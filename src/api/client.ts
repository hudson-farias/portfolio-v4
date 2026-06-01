import nookies from "nookies"

const AUTH_COOKIE = 'ACCESS_TOKEN_ADMIN'

class ApiClient {
  private baseURL: string
  private _canMutate = false

  public loginUrl: string

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_URL || ''
    this.loginUrl = `${this.baseURL}/auth/discord/redirect`
  }

  get isAuth() {
    const cookies = nookies.get(null)
    const token = cookies[AUTH_COOKIE]
    return !!token
  }

  private clearToken() {
    nookies.destroy(null, AUTH_COOKIE, { path: "/" })
    this._canMutate = false
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

    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method,
      headers,
      body: payload,
    })

    if (response.status === 498) this.clearToken()
    return response
  }

  async checkAuth(): Promise<boolean> {
    await this.get("/auth/verify")
    return this.isAuth
  }

  get(endpoint: string): Promise<Response> {
    return this.request("GET", endpoint)
  }

  post(endpoint: string, body: unknown): Promise<Response> {
    return this.request("POST", endpoint, body)
  }

  put(endpoint: string, body: unknown): Promise<Response> {
    return this.request("PUT", endpoint, body)
  }

  patch(endpoint: string, body: unknown): Promise<Response> {
    return this.request("PATCH", endpoint, body)
  }

  delete(endpoint: string): Promise<Response> {
    return this.request("DELETE", endpoint)
  }

  setToken(accessToken: string, redirect: string = "/admin") {
    nookies.set(null, AUTH_COOKIE, accessToken, {
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    })

    window.location.href = redirect
  }

  deleteToken(redirect: string = "/admin"): void {
    this.clearToken()
    window.location.href = redirect
  }
}

export const API = new ApiClient()
