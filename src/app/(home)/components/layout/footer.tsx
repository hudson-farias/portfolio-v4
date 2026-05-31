import { SocialIcon } from "@/components/icons/social-icon"
import type { SocialNetwork } from "@/lib/types"

const footerLinks = [
  { label: "Sobre", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projetos", href: "#projects" },
  { label: "Contato", href: "#contact" },
]

export const Footer = ({ socialNetworks }: { socialNetworks: SocialNetwork[] }) => {
  return (
    <footer className="mt-20 border-t">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-12 md:grid-cols-3 md:px-10">
        <div className="space-y-3">
          <p className="text-lg font-semibold">Hudson Farias</p>
          <p className="text-sm text-muted-foreground">
            Software Developer construindo produtos web confiáveis.
          </p>
          <p className="text-sm text-muted-foreground">
            © 2021 — {new Date().getFullYear()} Hudson. Todos os direitos reservados.
          </p>
        </div>

        <div>
          <p className="mb-3 text-sm font-medium">Menu</p>
          <ul className="space-y-2">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-3 text-sm font-medium">Redes</p>
          <div className="flex flex-wrap gap-2">
            {socialNetworks.map((network) => (
              <a
                key={network.id}
                href={network.url}
                target="_blank"
                rel="noopener noreferrer"
                className="surface inline-flex size-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:border-foreground/20 hover:text-foreground"
                aria-label={network.icon}
              >
                <SocialIcon icon={network.icon} className="size-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
