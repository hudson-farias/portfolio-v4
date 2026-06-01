import { API } from "@/api/server"

import { SkillsPageClient } from "./page-client"

export default async function SkillsPage() {
  const response = await API.get("/admin/skills")
  const data = await response.json()

  return <SkillsPageClient initialData={data} />
}
