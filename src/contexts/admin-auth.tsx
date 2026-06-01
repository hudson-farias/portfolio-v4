"use client"

import { createContext, useCallback, useContext, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"

import { API } from "@/api/client"

type AdminAuthContextValue = {
  canMutate: boolean
  refreshAuth: () => Promise<void>
  logout: () => void
}

const AdminAuthContext = createContext<AdminAuthContextValue | null>(null)

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams()
  const queryToken = searchParams.get("token")

  const [canMutate, setCanMutate] = useState(false)

  const refreshAuth = useCallback(async () => {
    const auth = await API.checkAuth()
    setCanMutate(auth)
  }, [])

  useEffect(() => {
    if (queryToken) {
      API.setToken(queryToken)
      return
    }
    refreshAuth()
  }, [queryToken, refreshAuth])

  const logout = () => API.deleteToken()

  return (
    <AdminAuthContext.Provider value={{ canMutate, refreshAuth, logout }}>
      {children}
    </AdminAuthContext.Provider>
  )
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext)
  if (!context) {
    throw new Error("useAdminAuth deve ser usado dentro de AdminAuthProvider")
  }
  return context
}
