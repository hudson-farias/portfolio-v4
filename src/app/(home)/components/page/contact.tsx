"use client"

import { Button } from "@/components/ui/button"

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 rounded-3xl border bg-card p-8 text-center">
      <h2 className="text-2xl font-semibold tracking-tight">
        Vamos construir algo juntos?
      </h2>
      <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
        Me chama por email para conversar sobre seu projeto ou oportunidade.
      </p>
      <Button asChild size="lg" className="mt-6">
        <a href="mailto:hudson.farias.dev@gmail.com">hudson.farias.dev@gmail.com</a>
      </Button>
    </section>
  )
}
