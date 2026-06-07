import { Footer } from "./components/layout/footer"
import { Header } from "./components/layout/header"

import { API } from "@/api/server"
import type { LandpageResponse } from "./interfaces"

export default async function HomeLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const response = await API.get("/landpage")
  const { footer }: LandpageResponse = await response.json()

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-24 px-6 py-10 md:px-10 md:py-14">
        {children}
      </main>

      <Footer socialNetworks={footer.social_networks} />
    </div>
  )
}
