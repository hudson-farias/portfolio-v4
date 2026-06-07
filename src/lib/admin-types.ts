export type ContractType = "CLT" | "PJ" | "FREELANCER"

export type RoleSeniority = "Junior" | "Pleno" | "Senior" | "Lead"
export type RoleLocale = "pt" | "en" | "todos"

export interface AdminRole {
  id: number
  title: string
  summary: string | null
  category: string | null
  seniority: RoleSeniority | null
  show: boolean
  featured: boolean
  locale: RoleLocale
  active: boolean
  sort_order: number
  color: string | null
  icon: string | null
  experience_count: number
}

export interface AdminExperience {
  id: number
  company: string
  period: string
  role_id: number | null
  role_title: string | null
  contract_type: ContractType | null
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

export interface AdminProfile {
  name: string
  last_name: string
  summary: string
  about_me: string
  location: string
  available: boolean
}
