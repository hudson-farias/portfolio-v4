import { API } from "@/api/server"

import { ExperiencesPageClient } from "./page-client"
import type { AdminExperience, AdminRole } from "@/lib/admin-types"

export default async function ExperiencesPage() {
  const [experiencesRes, rolesRes] = await Promise.all([
    API.get("/admin/experiences"),
    API.get("/admin/roles"),
  ])

  const items: AdminExperience[] = await experiencesRes.json()
  const roles: AdminRole[] = await rolesRes.json()

  return <ExperiencesPageClient initialItems={items} roles={roles} />
}
