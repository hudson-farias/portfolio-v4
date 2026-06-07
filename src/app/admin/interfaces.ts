import type { Experience, Project, SkillCategory, SocialNetwork } from "@/types"

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
  social_networks_header: SocialNetwork[]
  social_networks_footer: SocialNetwork[]
}

export interface AdminPageClientProps {
  data: AdminDashboard
}
