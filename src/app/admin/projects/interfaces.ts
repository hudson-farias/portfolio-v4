export interface AdminProject {
  git_id: number
  name: string
  html_url: string
  homepage?: string | null
}

export interface AdminProjects {
  visible: AdminProject[]
  options: AdminProject[]
}

export interface ProjectsPageClientProps {
  initialData: AdminProjects
}
