export type RoleSeniority = "Junior" | "Pleno" | "Senior" | "Lead"
export type RoleLocale = "" | "pt" | "en"

export interface AdminRole {
  id: number
  title: string
  summary: string | null
  category: string | null
  seniority: RoleSeniority | null
  show: boolean
  featured: boolean
  locale: string | null
  active: boolean
  sort_order: number
  color: string | null
  icon: string | null
  experience_count: number
}

export interface RoleForm {
  title: string
  summary: string
  category: string
  seniority: string
  show: boolean
  featured: boolean
  locale: RoleLocale
  active: boolean
  sort_order: number
  color: string
  icon: string
}

export interface RolesPageClientProps {
  initialItems: AdminRole[]
}

export interface LocaleOption {
  value: RoleLocale
  label: string
}

export interface SeniorityOption {
  value: RoleSeniority
  label: string
}
