import { API } from "@/api/server"

import { ExperiencesPageClient } from "./page-client"

export default async function ExperiencesPage() {
  const response = await API.get("/admin/experiences")
  const items = await response.json()

  return <ExperiencesPageClient initialItems={items} />
}
