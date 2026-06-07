import { API } from "@/api/server"

import { SkillsPageClient } from "./page-client"
import type { AdminSkills } from "./interfaces"

export default async function SkillsPage() {
  const response = await API.get("/admin/skills")
  const data: AdminSkills = await response.json()

  return <SkillsPageClient initialData={data} />
}
