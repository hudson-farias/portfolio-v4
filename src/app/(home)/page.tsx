import { API } from "@/api/server"

import { About } from "./components/page/about"
import { Contact } from "./components/page/contact"
import { Experiences } from "./components/page/experiences"
import { Hero } from "./components/page/hero"
import { Projects } from "./components/page/projects"
import { Skills } from "./components/page/skills"
import type { AboutStats, LandpageResponse } from "./interfaces"


export default async function Home() {
  const response = await API.get("/landpage")
  const { hero, about, contact, experiences, skills, projects }: LandpageResponse = await response.json()

  const aboutStats: AboutStats = {
    yearsExperience: about.stats.years_experience,
    projectsCount: about.stats.projects_count,
    clientsCount: about.stats.clients_count,
  }

  return (
    <>
      <Hero profile={hero.profile} />
      <About aboutExtended={about.profile.about_extended} stats={aboutStats} socialNetworks={hero.social_networks} />
      <Skills categories={skills.skills} />
      <Experiences experiences={experiences.experiences} />
      <Projects projects={projects.projects} />
      <Contact email={contact.email} others={contact.others} />
    </>
  )
}
