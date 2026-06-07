import { API } from "@/api/server"

import { SocialNetworksPageClient } from "./page-client"
import type { AdminSocialNetwork } from "./interfaces"

export default async function SocialNetworksPage() {
  const response = await API.get("/admin/social_networks")
  const items: AdminSocialNetwork[] = await response.json()

  return <SocialNetworksPageClient initialItems={items} />
}
