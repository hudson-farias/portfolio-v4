"use client"

import type { Experience } from "@/lib/types"

export const Experiences = ({ experiences }: { experiences: Experience[] }) => {
  return (
    <section id="experience" className="scroll-mt-28 space-y-10">
      <div className="mx-auto max-w-2xl space-y-3 text-center">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Experiência</h2>
        <p className="text-muted-foreground">Trajetória profissional e principais atuações.</p>
      </div>

      <div className="mx-auto max-w-3xl space-y-4">
        {experiences.map((experience) => (
          <article
            key={experience.id}
            className="rounded-2xl surface p-6 transition-colors hover:border-foreground/20"
          >
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <h3 className="text-lg font-semibold">{experience.role}</h3>
                <p className="text-sm text-muted-foreground">{experience.company}</p>
              </div>
              <span className="rounded-full border px-3 py-1 text-xs text-muted-foreground">
                {experience.period}
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {experience.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
