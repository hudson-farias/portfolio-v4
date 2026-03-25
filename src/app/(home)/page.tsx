import { About } from "./components/page/about"
import { Stack } from "./components/page/stack"
import { Projects } from "./components/page/projects"
import { Contact } from "./components/page/contact"

import { HomePageData } from "./interfaces"


const data: HomePageData = {
  languages: ["Python", "C#", "TypeScript", "PHP"],
  frameworks: ["FastAPI", "Playwright", "Next.js", "Tailwind CSS"],
  technologies: ["Git", "SQL", "NoSQL", "Docker"],
  projects: []
}


export default async function Home() {
  return (
    <>
      <About />
      <Stack frameworks={data.frameworks} languages={data.languages} technologies={data.technologies} />
      <Projects projects={data.projects} />
      <Contact />
    </>
  )
}
