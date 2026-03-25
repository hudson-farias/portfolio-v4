"use client"

import { Button } from "@/components/ui/button"

export function About() {
    return (
        <>
            <section className="grid items-center gap-10 rounded-3xl border bg-card p-8 md:grid-cols-2 md:p-12">
                <div className="space-y-6">
                    <p className="w-fit rounded-full border px-3 py-1 text-sm text-muted-foreground">
                        Disponivel para freelas e oportunidades
                    </p>
                    <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
                        Oi, eu sou Hudson.
                        <br />
                        Software Developer.
                    </h1>
                    <p className="max-w-xl text-lg text-muted-foreground">
                        Desenvolvedor de software com experiencia desde janeiro de 2021.
                        Construo aplicacoes web focadas em performance, qualidade e
                        manutencao.
                    </p>
                    <div className="flex flex-wrap gap-3">
                        <Button asChild size="lg">
                            <a
                                href="https://github.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Ver GitHub
                            </a>
                        </Button>
                        <Button asChild size="lg" variant="outline">
                            <a
                                href="https://www.linkedin.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Falar comigo
                            </a>
                        </Button>
                    </div>
                </div>
                <div className="rounded-2xl border bg-muted p-8">
                    <p className="text-sm text-muted-foreground">Resumo profissional</p>
                    <ul className="mt-5 space-y-3 text-sm">
                        <li className="rounded-lg border bg-card px-3 py-2">
                            Profissao: Software Developer
                        </li>
                        <li className="rounded-lg border bg-card px-3 py-2">
                            Experiencia: desde janeiro de 2021
                        </li>
                        <li className="rounded-lg border bg-card px-3 py-2">
                            Frameworks: FastAPI, Playwright, Next.js, Tailwind
                        </li>
                        <li className="rounded-lg border bg-card px-3 py-2">
                            Outros: Git, SQL, NoSQL, Docker
                        </li>
                    </ul>
                </div>
            </section>

            <section id="about" className="scroll-mt-24 space-y-4">
                <h2 className="text-2xl font-semibold tracking-tight">Sobre mim</h2>
                <p className="max-w-3xl text-muted-foreground">
                    Atuo com desenvolvimento de software e tenho como base linguagens
                    como Python, C#, TypeScript e PHP. Trabalho principalmente com
                    FastAPI, Playwright, Next.js e Tailwind, unindo backend, frontend e
                    automacao para entregar produtos confiaveis.
                </p>
            </section>

        </>
    )
}
