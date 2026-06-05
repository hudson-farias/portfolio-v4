"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Reveal } from "../reveal"
import { Button } from "@/components/ui/button"
import type { SkillCategory } from "@/lib/types"

const GAP_PX = 16
const TRAILING_PX = 32

export const Skills = ({ categories }: { categories: SkillCategory[] }) => {
  const [activePage, setActivePage] = useState(0)
  const [pageWidth, setPageWidth] = useState(0)
  const [cardWidth, setCardWidth] = useState(0)
  const [cardsPerView, setCardsPerView] = useState(3.5)
  const [fitsAll, setFitsAll] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)
  const cloneOffsetRef = useRef(0)
  const isLoopingRef = useRef(false)

  const total = categories.length
  const cloneCount = Math.min(total, Math.ceil(cardsPerView))

  const measure = useCallback(() => {
    const container = carouselRef.current
    if (!container) return

    const viewport = container.clientWidth
    const perView = viewport < 640 ? 1.5 : 3.5
    const gaps = Math.floor(perView) * GAP_PX
    const card = (viewport - gaps) / perView

    setCardsPerView(perView)
    setPageWidth(viewport)
    setCardWidth(card)
    cloneOffsetRef.current = total * card + Math.max(0, total - 1) * GAP_PX
    setFitsAll(container.scrollWidth <= container.clientWidth + 1)
  }, [total])

  const trackWidth =
    total * cardWidth + Math.max(0, total - 1) * GAP_PX + TRAILING_PX
  const totalPages =
    pageWidth > 0 && trackWidth > 0
      ? Math.max(1, Math.ceil((trackWidth - pageWidth) / pageWidth) + 1)
      : 1

  useEffect(() => {
    measure()
    const container = carouselRef.current
    if (!container) return
    const ro = new ResizeObserver(measure)
    ro.observe(container)
    return () => ro.disconnect()
  }, [measure, total])

  useEffect(() => {
    if (activePage >= totalPages) {
      setActivePage(Math.max(0, totalPages - 1))
    }
  }, [activePage, totalPages])

  const getScrollLeftForPage = useCallback(
    (page: number) => {
      const container = carouselRef.current
      if (!container || !pageWidth || !cardWidth) return 0

      const clamped = Math.max(0, Math.min(page, totalPages - 1))
      const maxScroll = Math.max(0, trackWidth - pageWidth)

      if (clamped === totalPages - 1) return maxScroll
      return Math.min(clamped * pageWidth, maxScroll)
    },
    [cardWidth, pageWidth, totalPages, trackWidth],
  )

  const resetLoopScroll = useCallback(() => {
    const container = carouselRef.current
    if (!container) return
    container.scrollLeft = 0
    isLoopingRef.current = false
  }, [])

  const goToPage = (page: number) => {
    if (!carouselRef.current) return
    const clamped = Math.max(0, Math.min(page, totalPages - 1))
    carouselRef.current.scrollTo({
      left: getScrollLeftForPage(clamped),
      behavior: "smooth",
    })
    setActivePage(clamped)
  }

  const loopToStart = () => {
    const container = carouselRef.current
    if (!container || !cloneOffsetRef.current) return

    isLoopingRef.current = true
    setActivePage(0)

    const onScrollEnd = () => {
      if (container.scrollLeft >= cloneOffsetRef.current - 4) {
        resetLoopScroll()
      }
      container.removeEventListener("scrollend", onScrollEnd)
    }

    container.addEventListener("scrollend", onScrollEnd)
    window.setTimeout(() => {
      if (isLoopingRef.current && container.scrollLeft >= cloneOffsetRef.current - 4) {
        resetLoopScroll()
      }
      container.removeEventListener("scrollend", onScrollEnd)
    }, 700)

    container.scrollTo({ left: cloneOffsetRef.current, behavior: "smooth" })
  }

  const loopToEnd = () => {
    const container = carouselRef.current
    if (!container || !pageWidth) return

    const target = getScrollLeftForPage(totalPages - 1)
    isLoopingRef.current = true
    setActivePage(totalPages - 1)

    const onScrollEnd = () => {
      isLoopingRef.current = false
      container.removeEventListener("scrollend", onScrollEnd)
    }

    container.addEventListener("scrollend", onScrollEnd)
    window.setTimeout(() => {
      isLoopingRef.current = false
      container.removeEventListener("scrollend", onScrollEnd)
    }, 700)

    container.scrollTo({ left: target, behavior: "smooth" })
  }

  const goNext = () => {
    if (activePage >= totalPages - 1) loopToStart()
    else goToPage(activePage + 1)
  }

  const goPrevious = () => {
    if (activePage <= 0) loopToEnd()
    else goToPage(activePage - 1)
  }

  const onCarouselScroll = () => {
    if (!carouselRef.current || !pageWidth || isLoopingRef.current) return

    const { scrollLeft } = carouselRef.current
    let nearest = 0
    let minDistance = Infinity

    for (let page = 0; page < totalPages; page++) {
      const target = getScrollLeftForPage(page)
      const distance = Math.abs(scrollLeft - target)
      if (distance < minDistance) {
        minDistance = distance
        nearest = page
      }
    }

    if (nearest !== activePage) setActivePage(nearest)
  }

  if (total === 0) {
    return (
      <section id="skills" className="scroll-mt-28 space-y-10">
        <Reveal className="mx-auto max-w-2xl space-y-3 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Skills</h2>
          <p className="text-muted-foreground">Em breve novas skills por aqui.</p>
        </Reveal>
      </section>
    )
  }

  const showControls = !fitsAll && totalPages > 1

  return (
    <section id="skills" className="scroll-mt-28 space-y-10">
      <Reveal className="mx-auto max-w-2xl space-y-3 text-center">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Skills</h2>
        <p className="text-muted-foreground">
          Construindo interfaces limpas e código confiável.
        </p>
      </Reveal>

      <Reveal delay={120} className="relative px-10 sm:px-12">
        {showControls && (
          <>
            <Button
              type="button"
              size="icon"
              variant="outline"
              className="absolute top-1/2 left-0 z-20 -translate-y-1/2 rounded-full bg-background shadow-sm"
              onClick={goPrevious}
              aria-label="Página anterior"
            >
              <ChevronLeft />
            </Button>
            <Button
              type="button"
              size="icon"
              variant="outline"
              className="absolute top-1/2 right-0 z-20 -translate-y-1/2 rounded-full bg-background shadow-sm"
              onClick={goNext}
              aria-label="Próxima página"
            >
              <ChevronRight />
            </Button>
          </>
        )}

        <div
          ref={carouselRef}
          onScroll={onCarouselScroll}
          className="overflow-x-auto scroll-px-4 px-4 py-4 [-ms-overflow-style:none] [scrollbar-width:none] sm:scroll-px-6 sm:px-6 [&::-webkit-scrollbar]:hidden"
          aria-label="Carrossel de skills"
        >
          <div className="flex w-max gap-4 pr-8 snap-x snap-mandatory">
            {categories.map((category) => (
              <article
                key={category.title}
                data-skill-card
                style={{ width: cardWidth > 0 ? cardWidth : undefined }}
                className="relative z-0 flex min-h-[160px] flex-none snap-start flex-col rounded-2xl surface p-6 transition-[transform,colors,box-shadow] duration-300 ease-out hover:z-10 hover:scale-[1.03] hover:-translate-y-1 hover:border-foreground/20 hover:shadow-lg"
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
            {categories.slice(0, cloneCount).map((category, i) => (
              <article
                key={`${category.title}-clone-${i}`}
                aria-hidden
                tabIndex={-1}
                style={{ width: cardWidth > 0 ? cardWidth : undefined }}
                className="flex min-h-[160px] flex-none snap-start flex-col rounded-2xl surface p-6"
              >
                <h3 className="text-base font-semibold">{category.title}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill.id}
                      className="rounded-full border px-3 py-1 text-xs text-muted-foreground"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-10 z-10 w-10 bg-gradient-to-r from-background to-transparent sm:left-12"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-10 z-10 w-10 bg-gradient-to-l from-background to-transparent sm:right-12"
        />
      </Reveal>

      {showControls && (
        <Reveal delay={200} className="mt-6 flex items-center justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goToPage(i)}
              className={`h-2.5 rounded-full transition-all ${
                i === activePage
                  ? "w-6 bg-primary"
                  : "w-2.5 bg-muted-foreground/40 hover:bg-muted-foreground/70"
              }`}
              aria-label={`Ir para página ${i + 1} de skills`}
              aria-current={i === activePage}
            />
          ))}
        </Reveal>
      )}
    </section>
  )
}
