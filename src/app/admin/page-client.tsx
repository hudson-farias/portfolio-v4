"use client"

import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"

import { Briefcase, FolderGit2, Layers, Share2 } from "lucide-react"

import type { PortfolioData } from "@/lib/types"

import { StatCard } from "./components/stat-card"
import { Section } from "./components/section"

import { ExperiencesTable } from "./components/experiences-table"
import { SkillsGrid } from "./components/skills-grid"
import { ProjectsList } from "./components/projects-list"
import { SocialNetworksTable } from "./components/social-networks-table"

import { API } from "@/api/client"

export function AdminPageClient({ data, canMutate }: { data: PortfolioData; canMutate: boolean }) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const queryToken = searchParams.get("token")

    useEffect(() => {
        if (!queryToken) return
        API.setToken(queryToken)

    }, [queryToken, router])

    const skillsCount = data.skills.reduce((acc, cat) => acc + cat.skills.length, 0)
    const socialCount = data.socialNetworksHeader.length + data.socialNetworksFooter.length

    return (
        <div className="space-y-8 p-6 md:p-8">
            <header className="flex flex-wrap items-start justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
                    <p className="mt-1 text-sm text-zinc-500">
                        {canMutate
                            ? "Você pode editar o conteúdo do portfólio."
                            : "Visualização pública — faça login para editar e ver dados privados."}
                    </p>
                </div>
                <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${canMutate
                        ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200"
                        : "border border-zinc-200 text-zinc-500 dark:border-zinc-700"
                        }`}
                >
                    {canMutate ? "Edição liberada" : "Somente leitura"}
                </span>
            </header>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard label="Experiências" value={data.experiences.length} />
                <StatCard label="Skills" value={skillsCount} />
                <StatCard label="Projetos" value={data.projects.length} />
                <StatCard label="Redes sociais" value={socialCount} />
            </div>

            <div className="grid gap-6 xl:grid-cols-2">
                <Section
                    title="Experiências"
                    description="Registros da tabela experiences"
                    icon={Briefcase}
                    canMutate={canMutate}
                    onAdd={() => console.log("add experience")}
                >
                    <ExperiencesTable items={data.experiences} canMutate={canMutate} />
                </Section>

                <Section
                    title="Projetos"
                    description={
                        canMutate
                            ? "Projetos visíveis e repositórios privados"
                            : "Apenas projetos públicos"
                    }
                    icon={FolderGit2}
                    canMutate={canMutate}
                    onAdd={() => console.log("add project")}
                >
                    <ProjectsList items={data.projects} canMutate={canMutate} />
                </Section>
            </div>

            <Section
                title="Skills"
                description="Categorias e habilidades cadastradas"
                icon={Layers}
                canMutate={canMutate}
                onAdd={() => console.log("add skill")}
            >
                <SkillsGrid categories={data.skills} canMutate={canMutate} />
            </Section>

            <Section
                title="Redes sociais"
                description="Links exibidos no header e footer"
                icon={Share2}
                canMutate={canMutate}
                onAdd={() => console.log("add social network")}
            >
                <SocialNetworksTable
                    header={data.socialNetworksHeader}
                    footer={data.socialNetworksFooter}
                    canMutate={canMutate}
                />
            </Section>

            <footer className="pb-4 text-center text-xs text-zinc-500">
                Perfil: {data.profile.name} ·{" "}
                <Link href="/" className="underline-offset-4 hover:underline">
                    Ver site público
                </Link>
            </footer>
        </div>
    )
}
