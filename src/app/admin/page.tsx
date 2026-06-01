import { getAdminPortfolioData } from "@/lib/data"

import { AdminPageClient } from "./page-client"

export default async function AdminPage() {
  const data = await getAdminPortfolioData(false)

  return <AdminPageClient data={data} />
}
