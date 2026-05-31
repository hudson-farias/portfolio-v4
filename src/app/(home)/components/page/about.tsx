"use client"

import type { Profile, Stats } from "@/lib/types"

const approachSteps = [
  { step: "01", title: "Entender objetivos", description: "Mapear necessidades, contexto e metas do produto." },
  { step: "02", title: "Desenvolver com qualidade", description: "Código limpo, arquitetura sólida e entregas incrementais." },
  { step: "03", title: "Entregar e iterar", description: "Deploy, monitoramento e melhorias contínuas." },
]

export const About = ({ profile, stats }: { profile: Profile; stats: Stats }) => {
  return (
    <section id="about" className="scroll-mt-28 space-y-12">
      <div className="mx-auto max-w-3xl space-y-4 text-center">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Sobre mim</h2>
        <p className="text-lg leading-relaxed text-muted-foreground">{profile.aboutExtended}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {approachSteps.map((item) => (
          <article
            key={item.step}
            className="rounded-2xl surface p-6 transition-colors hover:border-foreground/20"
          >
            <span className="text-sm font-medium text-muted-foreground">{item.step}</span>
            <h3 className="mt-2 text-lg font-semibold">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
          </article>
        ))}
      </div>

      <div className="grid gap-6 border-t pt-10 sm:grid-cols-3">
        <div className="text-center">
          <p className="text-4xl font-bold tracking-tight">
            {String(stats.yearsExperience).padStart(2, "0")}+
          </p>
          <p className="mt-1 text-sm text-muted-foreground">Anos de experiência</p>
        </div>
        <div className="text-center">
          <p className="text-4xl font-bold tracking-tight">
            {String(stats.projectsCount).padStart(2, "0")}+
          </p>
          <p className="mt-1 text-sm text-muted-foreground">Projetos concluídos</p>
        </div>
        <div className="text-center">
          <p className="text-4xl font-bold tracking-tight">
            {String(stats.clientsCount).padStart(2, "0")}+
          </p>
          <p className="mt-1 text-sm text-muted-foreground">Clientes atendidos</p>
        </div>
      </div>
    </section>
  )
}
