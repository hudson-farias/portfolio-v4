export interface Skill {
  id: number
  name: string
  icon: string
}

export interface SkillCategory {
  title: string
  skills: Skill[]
}

export interface Experience {
  id: number
  company: string
  period: string
  role: string
  description: string
  hidden?: boolean
}

export interface Project {
  id: number
  name: string
  description?: string
  image_url?: string | null
  homepage?: string | null
  html_url?: string | null
  isPublic?: boolean
}

export interface SocialNetwork {
  id: number
  url: string
  icon: string
}

export interface Profile {
  name: string
  roles: string[]
  location: string
  email: string
  phone: string
  about: string
  aboutExtended: string
  available: boolean
}

export interface Stats {
  yearsExperience: number
  projectsCount: number
  clientsCount: number
}

export interface PortfolioData {
  profile: Profile
  stats: Stats
  skills: SkillCategory[]
  experiences: Experience[]
  projects: Project[]
  socialNetworksHeader: SocialNetwork[]
  socialNetworksFooter: SocialNetwork[]
}

export interface SocialNetworksResponse {
  social_networks_header: SocialNetwork[]
  social_networks_footer: SocialNetwork[]
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

export interface ApiResponse {
  skills: SkillCategory[]
  experiences: Experience[]
  projects: Project[]
}
