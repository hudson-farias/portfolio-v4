const headerNavItems = [
    { label: "Sobre", href: "#about" },
    { label: "Stack", href: "#stack" },
    { label: "Projetos", href: "#projects" },
    { label: "Contato", href: "#contact" }
]

export function Header() {
    return (
        <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur">
            <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-3 md:px-10">
                <a href="/admin" className="font-semibold tracking-tight">Hudson</a>
                <nav className="flex items-center gap-2 text-sm">
                    {headerNavItems.map((item, i) =>
                        <a key={`navbar-item-${i}`} href={item.href} className="rounded-md px-3 py-2 text-muted-foreground transition-colors hover:text-foreground">
                            {item.label}
                        </a>
                    )}
                </nav>
            </div>
        </header>
    )
}
