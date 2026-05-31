import Link from "next/link"

import { ArrowLeft, LayoutDashboard } from "lucide-react"

import { AdminLayoutClient } from "./layout-client"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-zinc-100 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <aside className="sticky top-0 flex h-screen w-60 shrink-0 flex-col border-r border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="border-b border-zinc-200 px-5 py-5 dark:border-zinc-800">
          <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">Portfólio</p>
          <h1 className="mt-1 text-lg font-semibold">Admin</h1>
        </div>

        <nav className="flex-1 space-y-1 p-3">
          <span className="flex items-center gap-2 rounded-lg bg-zinc-100 px-3 py-2 text-sm font-medium dark:bg-zinc-800">
            <LayoutDashboard className="size-4" />
            Dashboard
          </span>
        </nav>

        <AdminLayoutClient />

        <div className="border-t border-zinc-200 p-3 dark:border-zinc-800">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
          >
            <ArrowLeft className="size-4" />
            Voltar ao site
          </Link>
        </div>
      </aside>

      <main className="min-w-0 flex-1 overflow-auto">{children}</main>
    </div>
  )
}
