import { API } from "@/api/server"

import { AdminPageClient } from "./page-client"

export default async function AdminPage() {
  const response = await API.get("/admin")
  const data = await response.json()

  return <AdminPageClient data={data} />
}
