export interface AdminExperience {
  id: number
  company: string
  period: string
  role: string
  description: string
  hidden?: boolean
}

export interface AdminSkill {
  id: number
  name: string
  icon: string
  skill_category_id: number
  skill_category_name: string
}

export interface AdminSkillCategory {
  id: number
  title: string
}

export interface AdminSkills {
  skills: AdminSkill[]
  categories: AdminSkillCategory[]
}

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

export interface AdminSocialNetwork {
  id: number
  url: string
  icon: string
  show_header: boolean
  show_footer: boolean
}
