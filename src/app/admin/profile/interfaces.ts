export interface AdminProfile {
  name: string
  last_name: string
  summary: string
  about_me: string
  location: string
  available: boolean
}

export interface ProfileForm {
  name: string
  last_name: string
  summary: string
  about_me: string
  location: string
  available: boolean
}

export interface ProfilePageClientProps {
  initialProfile: AdminProfile | null
}
