import { API } from "@/api/server"

import { ExperiencesPageClient } from "./page-client"
import type { AdminExperience } from "./interfaces"
import type { AdminRole } from "../roles/interfaces"

export default async function ExperiencesPage() {
  const [experiencesRes, rolesRes] = await Promise.all([
    API.get("/admin/experiences"),
    API.get("/admin/roles"),
  ])

  const items: AdminExperience[] = await experiencesRes.json()
  const roles: AdminRole[] = await rolesRes.json()

  return <ExperiencesPageClient initialItems={items} roles={roles} />
}
