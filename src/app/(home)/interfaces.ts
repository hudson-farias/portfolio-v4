import type { Experience, Project, SkillCategory, SocialNetwork } from "@/types"
export type { SocialNetwork } from "@/types"


export interface Profile {
  name: string
  roles: string[]
  location: string
  email: string
  phone: string
  about: string
  about_extended: string
  available: boolean
}

export interface Stats {
  yearsExperience: number
  projectsCount: number
  clientsCount: number
}

export type AboutStats = Stats

export interface PortfolioData {
  profile: Profile
  stats: Stats
  skills: SkillCategory[]
  experiences: Experience[]
  projects: Project[]
  socialNetworksHeader: SocialNetwork[]
  socialNetworksFooter: SocialNetwork[]
}

export interface ContactMethod {
  type: string
  value: string
}

export interface ContactResponse {
  email: string
  others: ContactMethod[]
}

export interface HeroProfile {
  name: string
  roles: string[]
  location: string
  email: string
  about: string
  available: boolean
}

export interface HeroResponse {
  profile: HeroProfile
  social_networks: SocialNetwork[]
}

export interface ExperiencesResponse {
  experiences: Experience[]
}

export interface SkillsResponse {
  skills: SkillCategory[]
}

export interface ProjectsResponse {
  projects: Project[]
}

export interface AboutResponse {
  profile: {
    about_extended: string
  }
  stats: {
    years_experience: number
    projects_count: number
    clients_count: number
  }
}

export interface LandpageResponse {
  about: AboutResponse
  contact: ContactResponse
  experiences: ExperiencesResponse
  hero: HeroResponse
  projects: ProjectsResponse
  skills: SkillsResponse
}

export interface ApiResponse {
  skills: SkillCategory[]
  experiences: Experience[]
  projects: Project[]
}
