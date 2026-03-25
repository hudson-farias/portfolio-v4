const footerNavItems = [
    { label: "Sobre", href: "#about" },
    { label: "Projetos", href: "#projects" },
    { label: "Contato", href: "#contact" }
]


export function Footer() {
    return (
        <footer className="mt-10 border-t border-border/50 bg-background/60 backdrop-blur">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-6 py-8 md:flex-row md:items-center md:justify-between md:px-10">
                <div className="text-sm text-muted-foreground">
                    © 2021 - {new Date().getFullYear()} Hudson. Todos os direitos reservados.
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm">
                    {footerNavItems.map((item, i) =>
                        <a key={`navbar-item-${i}`} href={item.href} className="rounded-md px-3 py-2 text-muted-foreground transition-colors hover:text-foreground">
                            {item.label}
                        </a>
                    )}
                </div>
            </div>
        </footer>
    )
}
