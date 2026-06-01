"use client"

import { useEffect, useState } from "react"

import { FolderGit2, Plus } from "lucide-react"

import { API } from "@/api/client"
import type { AdminProject, AdminProjects } from "@/lib/admin-types"

import { useAdminAuth } from "@/contexts/admin-auth"
import { AlertBanner } from "../components/alert-banner"
import { PageHeader } from "../components/page-header"
import { RowActions } from "../components/row-actions"
import { Button } from "@/components/ui/button"

export function ProjectsPageClient({ initialData }: { initialData: AdminProjects }) {
  const { canMutate, refreshAuth } = useAdminAuth()

  const [data, setData] = useState(initialData)
  const [addingId, setAddingId] = useState<number | null>(null)

  useEffect(() => {
    setData(initialData)
  }, [initialData])

  async function handleAdd(project: AdminProject) {
    if (!canMutate) return

    setAddingId(project.git_id)
    const response = await API.post(`/admin/projects/${project.git_id}`, {})
    const next = await response.json()
    setData(next)
    await refreshAuth()
    setAddingId(null)
  }

  async function handleRemove(gitId: number) {
    if (!canMutate) return
    if (!window.confirm("Remover este projeto do portfólio?")) return

    const response = await API.delete(`/admin/projects/${gitId}`)
    const next = await response.json()
    setData(next)
    await refreshAuth()
  }

  return (
    <div>
      <PageHeader
        title="Projetos"
        description="Selecione repositórios do GitHub para exibir no portfólio"
        icon={FolderGit2}
        canMutate={false}
      />

      <div className="space-y-8 p-6 md:p-8">
        {!canMutate && (
          <AlertBanner
            variant="info"
            message="Faça login para adicionar ou remover projetos visíveis."
          />
        )}

        <section className="space-y-4">
          <div>
            <h2 className="font-semibold">Visíveis no portfólio</h2>
            <p className="text-sm text-zinc-500">
              {data.visible.length} projeto(s) selecionado(s)
            </p>
          </div>

          {data.visible.length === 0 ? (
            <p className="text-sm text-zinc-500">Nenhum projeto selecionado.</p>
          ) : (
            <ul className="space-y-3">
              {data.visible.map((project) => (
                <li
                  key={project.git_id}
                  className="flex flex-wrap items-start justify-between gap-3 rounded-lg border border-zinc-200 p-4 dark:border-zinc-800"
                >
                  <div className="min-w-0 flex-1 space-y-1">
                    <p className="font-medium">{project.name}</p>
                    <div className="flex flex-wrap gap-3 text-sm">
                      <a
                        href={project.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-600 underline-offset-4 hover:underline dark:text-zinc-400"
                      >
                        Repositório
                      </a>
                      {project.homepage && (
                        <a
                          href={project.homepage}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-zinc-600 underline-offset-4 hover:underline dark:text-zinc-400"
                        >
                          Demo
                        </a>
                      )}
                    </div>
                  </div>
                  {canMutate && (
                    <RowActions
                      canMutate
                      onDelete={() => handleRemove(project.git_id)}
                      hideEdit
                    />
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="space-y-4">
          <div>
            <h2 className="font-semibold">Disponíveis no GitHub</h2>
            <p className="text-sm text-zinc-500">
              Repositórios que ainda não estão no portfólio
            </p>
          </div>

          {data.options.length === 0 ? (
            <p className="text-sm text-zinc-500">Nenhum repositório disponível para adicionar.</p>
          ) : (
            <ul className="space-y-3">
              {data.options.map((project) => (
                <li
                  key={project.git_id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-dashed border-zinc-200 p-4 dark:border-zinc-800"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">{project.name}</p>
                    <a
                      href={project.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-zinc-600 underline-offset-4 hover:underline dark:text-zinc-400"
                    >
                      {project.html_url}
                    </a>
                  </div>
                  {canMutate && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-1.5"
                      disabled={addingId === project.git_id}
                      onClick={() => handleAdd(project)}
                    >
                      <Plus className="size-3.5" />
                      {addingId === project.git_id ? "Adicionando..." : "Adicionar"}
                    </Button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  )
}
