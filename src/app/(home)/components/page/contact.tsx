"use client"

import { ArrowRight } from "lucide-react"
import { Reveal } from "../reveal"
import { Button } from "@/components/ui/button"
import type { ContactMethod } from "@/lib/types"

export const Contact = ({ email, others }: { email: string; others: ContactMethod[] }) => {
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
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {others.map((method, i) => (
                <Reveal key={`${method.type}-${method.value}`} variant="fade-up" delay={280 + i * 80} as="span">
                  <a
                    href={method.value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:underline"
                  >
                    {method.type}
                  </a>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </Reveal>
    </section>
  )
}
