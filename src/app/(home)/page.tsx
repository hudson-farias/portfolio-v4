import { About } from "./components/page/about"
import { Stack } from "./components/page/stack"
import { Projects } from "./components/page/projects"
import { Contact } from "./components/page/contact"

import { HomePageData } from "./interfaces"


const data: HomePageData = {
  languages: ["Python", "C#", "TypeScript", "PHP"],
  frameworks: ["FastAPI", "Playwright", "Next.js", "Tailwind CSS"],
  technologies: ["Git", "SQL", "NoSQL", "Docker"],
  projects: [
    {
      name: "E-commerce completo",
      description: "Loja virtual com painel admin, pagamentos e area do cliente.",
      stack: "Next.js, TypeScript, Prisma, PostgreSQL",
      link: "#",
    },
    {
      name: "SaaS de gestao",
      description: "Plataforma para controle de equipes, tarefas e indicadores.",
      stack: "React, Node.js, Docker, Redis",
      link: "#",
    },
    {
      name: "Landing de conversao",
      description:
        "Pagina otimizada para campanhas e geracao de leads qualificados.",
      stack: "Next.js, Tailwind, Analytics",
      link: "#",
    },
    {
      name: "Landing de conversao",
      description:
        "Pagina otimizada para campanhas e geracao de leads qualificados.",
      stack: "Next.js, Tailwind, Analytics",
      link: "#",
    },
    {
      name: "Landing de conversao",
      description:
        "Pagina otimizada para campanhas e geracao de leads qualificados.",
      stack: "Next.js, Tailwind, Analytics",
      link: "#",
    },
  ],
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
