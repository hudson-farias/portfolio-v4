import { API } from "@/api/server"

import { RolesPageClient } from "./page-client"

export default async function RolesPage() {
  const response = await API.get("/admin/roles")
  const items = await response.json()

  return <RolesPageClient initialItems={items} />
}
