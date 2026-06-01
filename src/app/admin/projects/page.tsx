import { API } from "@/api/server"

import { ProjectsPageClient } from "./page-client"

export default async function ProjectsPage() {
  const response = await API.get("/admin/projects")
  const data = await response.json()

  return <ProjectsPageClient initialData={data} />
}
