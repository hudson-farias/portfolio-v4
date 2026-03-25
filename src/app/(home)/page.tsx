import { About } from "./components/page/about"
import { Stack } from "./components/page/stack"
import { Projects } from "./components/page/projects"
import { Contact } from "./components/page/contact"

import { HomePageData } from "./interfaces"


const data: HomePageData = {
  about: "Desenvolvedor de software com experiencia desde janeiro de 2021. Construo aplicacoes web focadas em performance, qualidade e manutenção.",
  about2: "Atuo com desenvolvimento de software e tenho como base linguagens como Python, C#, TypeScript e PHP. Trabalho principalmente com FastAPI, Playwright, Next.js e Tailwind, unindo backend, frontend e automação para entregar produtos confiaveis.",

  languages: ["Python", "C#", "TypeScript", "PHP"],
  frameworks: ["FastAPI", "Playwright", "Next.js", "Tailwind CSS"],
  technologies: ["Git", "SQL", "NoSQL", "Docker"],
  projects: []
}


export default async function Home() {
  return (
    <>
      <About about={data.about} about2={data.about2} />
      <Stack frameworks={data.frameworks} languages={data.languages} technologies={data.technologies} />
      <Projects projects={data.projects} />
      <Contact />
    </>
  )
}
