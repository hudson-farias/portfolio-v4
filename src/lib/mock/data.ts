import type { PortfolioData } from "@/lib/types"

export const mockPortfolioData: PortfolioData = {
  profile: {
    name: "Hudson Farias",
    roles: ["Software Developer", "Fullstack Engineer", "DevOps"],
    location: "Rio de Janeiro, Brasil",
    email: "hudson.farias.dev@gmail.com",
    phone: "21 99688-9408",
    about:
      "Desenvolvedor de software com experiência desde janeiro de 2021. Construo aplicações web focadas em performance, qualidade e manutenção.",
    aboutExtended:
      "Atuo com desenvolvimento de software e tenho como base linguagens como Python, C#, TypeScript e PHP. Trabalho principalmente com FastAPI, Playwright, Next.js e Tailwind, unindo backend, frontend e automação para entregar produtos confiáveis. Experiência como Tech Leader em startup, liderando decisões técnicas, evolução arquitetural e otimizações de performance.",
    available: true,
  },

  stats: {
    yearsExperience: 5,
    projectsCount: 15,
    clientsCount: 5,
  },

  skills: [
    {
      title: "Linguagens",
      skills: [
        { id: 1, name: "Python", icon: "python" },
        { id: 2, name: "C#", icon: "csharp" },
        { id: 3, name: "TypeScript", icon: "typescript" },
        { id: 4, name: "PHP", icon: "php" },
      ],
    },
    {
      title: "Frameworks",
      skills: [
        { id: 5, name: "FastAPI", icon: "fastapi" },
        { id: 6, name: "Playwright", icon: "playwright" },
        { id: 7, name: "Next.js", icon: "nextjs" },
        { id: 8, name: "Tailwind CSS", icon: "tailwind" },
      ],
    },
    {
      title: "Ferramentas",
      skills: [
        { id: 9, name: "Git", icon: "git" },
        { id: 10, name: "SQL", icon: "database" },
        { id: 11, name: "NoSQL", icon: "database" },
        { id: 12, name: "Docker", icon: "docker" },
      ],
    },
    {
      title: "Práticas",
      skills: [
        { id: 13, name: "APIs REST", icon: "api" },
        { id: 14, name: "Automação", icon: "bot" },
        { id: 15, name: "CI/CD", icon: "pipeline" },
        { id: 16, name: "Linux/VPS", icon: "server" },
      ],
    },
  ],

  experiences: [
    {
      id: 1,
      company: "Startup",
      period: "2022 — 2025",
      role: "Tech Leader",
      description:
        "Liderança técnica, decisões arquiteturais, evolução de sistemas legados, microsserviços com FastAPI e Next.js, deploy com Docker e Nginx em VPS Linux.",
    },
    {
      id: 2,
      company: "Freelancer",
      period: "2021 — Atual",
      role: "Software Developer",
      description:
        "Desenvolvimento fullstack de aplicações web, integrações, automações com Playwright e entrega de produtos focados em performance e manutenibilidade.",
    },
  ],

  projects: [
    {
      id: 1,
      name: "Portfolio API",
      description:
        "API REST em FastAPI para servir dados do portfólio — skills, experiências, projetos e redes sociais.",
      homepage: null,
      html_url: "https://github.com/hudson-farias/portfolio-api",
      image_url: null,
    },
    {
      id: 2,
      name: "Automação Web",
      description:
        "Scripts de automação com Playwright para coleta e processamento de dados em escala.",
      homepage: null,
      html_url: "https://gitlab.com/hudsonfarias",
      image_url: null,
      isPublic: false,
    },
    {
      id: 3,
      name: "Dashboard Analytics",
      description:
        "Painel administrativo com Next.js e Tailwind para visualização de métricas e gestão de conteúdo.",
      homepage: null,
      html_url: "https://github.com/hudson-farias",
      image_url: null,
    },
  ],

  socialNetworksHeader: [
    { id: 1, url: "https://github.com/hudson-farias", icon: "github" },
    { id: 2, url: "https://gitlab.com/hudsonfarias", icon: "gitlab" },
    { id: 3, url: "https://www.linkedin.com/in/hudsonfarias/", icon: "linkedin" },
  ],

  socialNetworksFooter: [
    { id: 1, url: "https://github.com/hudson-farias", icon: "github" },
    { id: 2, url: "https://gitlab.com/hudsonfarias", icon: "gitlab" },
    { id: 3, url: "https://www.linkedin.com/in/hudsonfarias/", icon: "linkedin" },
    { id: 4, url: "mailto:hudson.farias.dev@gmail.com", icon: "mail" },
  ],
}
