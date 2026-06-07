export interface AdminSocialNetwork {
  id: number
  url: string
  icon: string
  show_header: boolean
  show_footer: boolean
}

export interface SocialNetworkForm {
  url: string
  icon: string
  show_header: boolean
  show_footer: boolean
}

export interface SocialNetworksPageClientProps {
  initialItems: AdminSocialNetwork[]
}
