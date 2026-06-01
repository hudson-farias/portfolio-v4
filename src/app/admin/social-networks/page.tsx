import { API } from "@/api/server"

import { SocialNetworksPageClient } from "./page-client"

export default async function SocialNetworksPage() {
  const response = await API.get("/admin/social_networks")
  const items = await response.json()

  return <SocialNetworksPageClient initialItems={items} />
}
