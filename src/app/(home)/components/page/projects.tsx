"use client"

import { useMemo, useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"

import { Project } from "../../interfaces"

export function Projects({ projects }: { projects: Project[] }) {
  const [projectActive, setProjectActive] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  const totalProjects = projects.length

  const cardWidth = useMemo(() => {
    if (!carouselRef.current) return 360
    const firstCard = carouselRef.current.querySelector<HTMLElement>("[data-projeto-card]")
    if (!firstCard) return 360
    return firstCard.offsetWidth + 16
  }, [projects.length])


  const goToProject = (index: number) => {
    if (!carouselRef.current) return
    const clamped = Math.max(0, Math.min(index, totalProjects - 1))
    carouselRef.current.scrollTo({
      left: clamped * cardWidth,
      behavior: "smooth",
    })
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
    return (
        <section id="projects" className="scroll-mt-24 space-y-6">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold tracking-tight">
              Projetos em destaque
            </h2>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                size="icon"
                variant="outline"
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
                onClick={goNext}
                disabled={projectActive >= totalProjects - 1}
                aria-label="Proximo projeto"
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
              {projects.map((project, i) => (
                <article
                  key={`project-${i}`}
                  data-projeto-card
                  className="flex-none min-w-[270px] space-y-4 rounded-2xl border bg-card p-5 transition-transform hover:-translate-y-0.5 snap-start sm:min-w-[320px] md:min-w-[360px]"
                >
                  <h3 className="text-lg font-semibold">{project.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {project.description}
                  </p>
                  <p className="text-xs text-muted-foreground">{project.stack}</p>
                  <a
                    href={project.link}
                    className="inline-flex text-sm font-medium hover:underline"
                  >
                    Abrir projeto
                  </a>
                </article>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center gap-2">
            {projects.map((project, i) => (
              <button
                key={`project-${i}`}
                type="button"
                onClick={() => goToProject(i)}
                className={`h-2.5 rounded-full transition-all ${i === projectActive
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
