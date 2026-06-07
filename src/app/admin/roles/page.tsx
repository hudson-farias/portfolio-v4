import { API } from "@/api/server"

import { RolesPageClient } from "./page-client"
import type { AdminRole } from "./interfaces"

export default async function RolesPage() {
  const response = await API.get("/admin/roles")
  const items: AdminRole[] = await response.json()

  return <RolesPageClient initialItems={items} />
}
