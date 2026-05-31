"use client"

import { useMemo, useRef, useState } from "react"
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"
import { GithubIcon } from "@/components/icons/social-icon"
import { Button } from "@/components/ui/button"
import type { Project } from "@/lib/types"

export const Projects = ({ projects }: { projects: Project[] }) => {
  const [projectActive, setProjectActive] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  const totalProjects = projects.length

  const cardWidth = useMemo(() => {
    if (!carouselRef.current) return 360
    const firstCard = carouselRef.current.querySelector<HTMLElement>("[data-project-card]")
    if (!firstCard) return 360
    return firstCard.offsetWidth + 16
  }, [projects.length])

  const goToProject = (index: number) => {
    if (!carouselRef.current) return
    const clamped = Math.max(0, Math.min(index, totalProjects - 1))
    carouselRef.current.scrollTo({ left: clamped * cardWidth, behavior: "smooth" })
    setProjectActive(clamped)
  }

  const goNext = () => goToProject(projectActive + 1)
  const goPrevious = () => goToProject(projectActive - 1)

  const onCarouselScroll = () => {
    if (!carouselRef.current) return
    const nextActive = Math.round(carouselRef.current.scrollLeft / cardWidth)
    const clamped = Math.max(0, Math.min(nextActive, totalProjects - 1))
    if (clamped !== projectActive) setProjectActive(clamped)
  }

  if (projects.length === 0) {
    return (
      <section id="projects" className="scroll-mt-28 space-y-6">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Projetos</h2>
        <p className="text-muted-foreground">Em breve novos projetos por aqui.</p>
      </section>
    )
  }

  return (
    <section id="projects" className="scroll-mt-28 space-y-8">
      <div className="flex items-end justify-between gap-4">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Projetos</h2>
          <p className="text-muted-foreground">Seleção de trabalhos recentes.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            size="icon"
            variant="outline"
            className="rounded-full"
            onClick={goPrevious}
            disabled={projectActive <= 0}
            aria-label="Projeto anterior"
          >
            <ChevronLeft />
          </Button>
          <Button
            type="button"
            size="icon"
            variant="outline"
            className="rounded-full"
            onClick={goNext}
            disabled={projectActive >= totalProjects - 1}
            aria-label="Próximo projeto"
          >
            <ChevronRight />
          </Button>
        </div>
      </div>

      <div
        ref={carouselRef}
        onScroll={onCarouselScroll}
        className="overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        aria-label="Carrossel de projetos"
      >
        <div className="flex gap-4 pb-2 snap-x snap-mandatory">
          {projects.map((project) => (
            <article
              key={project.id}
              data-project-card
              className="flex min-h-[220px] min-w-[280px] flex-none snap-start flex-col justify-between rounded-2xl surface p-6 transition-colors hover:border-foreground/20 sm:min-w-[340px] md:min-w-[380px]"
            >
              <div className="space-y-3">
                <h3 className="text-xl font-semibold">{project.name}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {project.description || "Sem descrição."}
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                {project.html_url && (
                  <a
                    href={project.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium hover:underline"
                  >
                    <GithubIcon className="size-4" />
                    Repositório
                  </a>
                )}
                {project.homepage && (
                  <a
                    href={project.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium hover:underline"
                  >
                    <ExternalLink className="size-4" />
                    Demo
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center gap-2">
        {projects.map((project, i) => (
          <button
            key={project.id}
            type="button"
            onClick={() => goToProject(i)}
            className={`h-2.5 rounded-full transition-all ${
              i === projectActive
                ? "w-6 bg-primary"
                : "w-2.5 bg-muted-foreground/40 hover:bg-muted-foreground/70"
            }`}
            aria-label={`Ir para projeto ${project.name}`}
            aria-current={i === projectActive}
          />
        ))}
      </div>
    </section>
  )
}
