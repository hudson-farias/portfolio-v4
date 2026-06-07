"use client"

import { ArrowRight } from "lucide-react"
import { Reveal } from "../reveal"
import { Button } from "@/components/ui/button"
import { AppIcon } from "@/components/icons/app-icon"
import type { SocialNetwork } from "../../interfaces"

export const Contact = ({
  email,
  others,
}: {
  email: string
  others: SocialNetwork[]
}) => {
  return (
    <section id="contact" className="scroll-mt-28">
      <Reveal variant="scale" duration={700}>
        <div className="surface rounded-3xl px-8 py-14 text-center transition-[transform,colors] duration-300 hover:border-foreground/15 md:px-16">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Vamos construir algo juntos?
          </h2>
          <Reveal variant="fade-up" delay={100}>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Me chama por email para conversar sobre seu projeto ou oportunidade.
          </p>
          </Reveal>
          <Reveal variant="fade-up" delay={200}>
            <Button asChild size="lg" className="mt-8 rounded-full px-8 transition-transform hover:scale-[1.02]">
              <a href={`mailto:${email}`}>
                {email}
                <ArrowRight />
              </a>
            </Button>
          </Reveal>
          {others.length > 0 && (
            <Reveal variant="fade-up" delay={260}>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
                {others.map((network, i) => (
                  <Reveal key={network.id} as="span" variant="scale" delay={280 + i * 80}>
                    <a
                      href={network.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="surface inline-flex size-10 items-center justify-center rounded-full text-muted-foreground transition-[transform,colors] hover:-translate-y-0.5 hover:border-foreground/20 hover:text-foreground"
                      aria-label={network.icon}
                    >
                      <AppIcon name={network.icon} className="size-4" />
                    </a>
                  </Reveal>
                ))}
              </div>
            </Reveal>
          )}
        </div>
      </Reveal>
    </section>
  )
}
