import { Suspense } from "react"

import { getAdminPortfolioData } from "@/lib/data"

import { AdminPageClient } from "./page-client"

export default async function AdminPage() {
  const canMutate = true
  // const canMutate = false
  const data = await getAdminPortfolioData(canMutate)
  // const data = await getAdminPortfolioData(false)x

  return (
    <Suspense fallback={<p className="p-6 text-sm text-zinc-500">Carregando...</p>}>
      <AdminPageClient data={data} canMutate={canMutate} />
    </Suspense>
  )
}
