"use client"

export function Stack({ languages , frameworks , technologies }: { languages: string[], frameworks: string[], technologies: string[] }) {
    return (
        <section id="stack" className="scroll-mt-24 grid gap-6 md:grid-cols-3">
            <article className="rounded-2xl border bg-card p-5">
                <h3 className="text-base font-semibold">Linguagens</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                    {languages.join(" / ")}
                </p>
            </article>
            <article className="rounded-2xl border bg-card p-5">
                <h3 className="text-base font-semibold">Frameworks principais</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                    {frameworks.join(" / ")}
                </p>
            </article>
            <article className="rounded-2xl border bg-card p-5">
                <h3 className="text-base font-semibold">Outras tecnologias</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                    {technologies.join(" / ")}
                </p>
            </article>
        </section>
    )
}
