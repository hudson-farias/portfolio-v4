"use client"

import { LogIn, LogOut } from "lucide-react"

import { Button } from "@/components/ui/button"

import { API } from "@/api/client";

export const AdminLayoutClient = () => {
  const isAuthenticated = API.verify()

  return (
    <div className="space-y-2 border-t border-zinc-200 p-3 dark:border-zinc-800">
      <p className="px-3 text-xs text-zinc-500">
        {isAuthenticated ? "Sessão ativa — mutations liberadas" : "Modo leitura — dados abertos"}
      </p>

      {isAuthenticated ? (
        <form action={() => API.deleteToken()}>
          <Button type="submit" variant="outline" className="w-full justify-start gap-2 cursor-pointer">
            <LogOut className="size-4" />
            Sair
          </Button>
        </form>
      ) : (
        <Button asChild className="w-full justify-start gap-2">
          <a href={API.loginUrl}>
            <LogIn className="size-4" />
            Entrar
          </a>
        </Button>
      )}
    </div>
  )
}
