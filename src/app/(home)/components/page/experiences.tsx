"use client"

import { Reveal } from "../reveal"
import type { Experience } from "@/lib/types"

export const Experiences = ({ experiences }: { experiences: Experience[] }) => {
  return (
    <section id="experience" className="scroll-mt-28 space-y-10">
      <Reveal className="mx-auto max-w-2xl space-y-3 text-center">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Experiência</h2>
        <p className="text-muted-foreground">Trajetória profissional e principais atuações.</p>
      </Reveal>

      <div className="relative mx-auto max-w-3xl space-y-4">
        <Reveal
          variant="fade"
          duration={900}
          className="absolute top-2 bottom-2 left-[1.125rem] hidden md:block"
        >
          <div aria-hidden className="h-full w-px bg-border" />
        </Reveal>

        {experiences.map((experience, i) => (
          <Reveal key={experience.id} delay={i * 120} variant="fade-left">
            <article className="relative z-0 rounded-2xl surface p-6 transition-[transform,colors,box-shadow] duration-300 ease-out hover:z-10 hover:scale-[1.02] hover:border-foreground/20 hover:shadow-lg md:pl-10">
              <span
                aria-hidden
                className="absolute top-7 left-6 hidden size-2.5 rounded-full border-2 border-primary bg-background md:block"
              />

              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h3 className="text-lg font-semibold">{experience.role}</h3>
                  <p className="text-sm text-muted-foreground">{experience.company}</p>
                </div>
                <span className="rounded-full border px-3 py-1 text-xs text-muted-foreground">
                  {experience.period}
                </span>
              </div>
              <div
                className="mt-4 space-y-2 text-sm leading-relaxed text-muted-foreground [&_a]:text-foreground [&_a]:underline [&_em]:italic [&_li]:ml-4 [&_ol]:list-decimal [&_ol]:pl-5 [&_p+p]:mt-2 [&_strong]:font-semibold [&_ul]:list-disc [&_ul]:pl-5"
                dangerouslySetInnerHTML={{ __html: experience.description }}
              />
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
