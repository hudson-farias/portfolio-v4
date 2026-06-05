import { API } from "@/api/server"

import { About } from "./components/page/about"
import { Contact } from "./components/page/contact"
import { Experiences } from "./components/page/experiences"
import { Hero } from "./components/page/hero"
import { Projects } from "./components/page/projects"
import { Skills } from "./components/page/skills"
import { getPortfolioData } from "@/lib/data"

import type { ContactResponse, ExperiencesResponse, HeroResponse, ProjectsResponse, SkillsResponse } from "@/lib/types"

async function getHero(): Promise<HeroResponse> {
  const response = await API.get("/hero")
  return response.json()
}

async function getContact(): Promise<ContactResponse> {
  const response = await API.get("/contact")
  return response.json()
}

async function getExperiences(): Promise<ExperiencesResponse> {
  const response = await API.get("/experience")
  return response.json()
}

async function getSkills(): Promise<SkillsResponse> {
  const response = await API.get("/skills")
  return response.json()
}

async function getProjects(): Promise<ProjectsResponse> {
  const response = await API.get("/projects")
  return response.json()
}

export default async function Home() {
  const [data, hero, contact, experiences, skills, projects] = await Promise.all([
    getPortfolioData(),
    getHero(),
    getContact(),
    getExperiences(),
    getSkills(),
    getProjects(),
  ])

  return (
    <>
      <Hero profile={hero.profile} />
      <About profile={data.profile} stats={data.stats} socialNetworks={hero.social_networks} />
      <Skills categories={skills.skills} />
      <Experiences experiences={experiences.experiences} />
      <Projects projects={projects.projects} />
      <Contact email={contact.email} others={contact.others} />
    </>
  )
}
