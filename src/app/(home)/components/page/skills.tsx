"use client"

import type { SkillCategory } from "@/lib/types"

export const Skills = ({ categories }: { categories: SkillCategory[] }) => {
  return (
    <section id="skills" className="scroll-mt-28 space-y-10">
      <div className="mx-auto max-w-2xl space-y-3 text-center">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Skills</h2>
        <p className="text-muted-foreground">
          Construindo interfaces limpas e código confiável.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <article
            key={category.title}
            className="flex flex-col rounded-2xl surface p-6 transition-colors hover:border-foreground/20"
          >
            <h3 className="text-base font-semibold">{category.title}</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <span
                  key={skill.id}
                  className="rounded-full border px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
