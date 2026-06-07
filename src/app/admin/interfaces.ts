import type { Experience, Project, SkillCategory } from "@/types"
import type { AdminSocialNetwork } from "./social-networks/interfaces"

export interface AdminDashboard {
  counts: {
    experiences: number
    skills: number
    projects: number
    social_networks: number
  }
  experiences: Experience[]
  projects: Project[]
  skills: SkillCategory[]
  social_networks: AdminSocialNetwork[]
}

export interface AdminPageClientProps {
  data: AdminDashboard
}
