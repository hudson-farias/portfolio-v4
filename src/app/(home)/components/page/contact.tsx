"use client"

import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export const Contact = ({ email }: { email: string }) => {
  return (
    <section id="contact" className="scroll-mt-28">
      <div className="surface rounded-3xl px-8 py-14 text-center md:px-16">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          Vamos construir algo juntos?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Me chama por email para conversar sobre seu projeto ou oportunidade.
        </p>
        <Button asChild size="lg" className="mt-8 rounded-full px-8">
          <a href={`mailto:${email}`}>
            {email}
            <ArrowRight />
          </a>
        </Button>
      </div>
    </section>
  )
}
