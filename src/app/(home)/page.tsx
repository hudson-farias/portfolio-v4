import { About } from "./components/page/about"
import { Contact } from "./components/page/contact"
import { Experiences } from "./components/page/experience"
import { Hero } from "./components/page/hero"
import { Projects } from "./components/page/projects"
import { Skills } from "./components/page/skills"

import { getPortfolioData } from "@/lib/data"

export default async function Home() {
  const data = await getPortfolioData()

  return (
    <>
      <Hero profile={data.profile} socialNetworks={data.socialNetworksHeader} />
      <About profile={data.profile} stats={data.stats} />
      <Skills categories={data.skills} />
      <Experiences experiences={data.experiences} />
      <Projects projects={data.projects} />
      <Contact email={data.profile.email} />
    </>
  )
}
