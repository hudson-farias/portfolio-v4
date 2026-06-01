"use client"

import { useEffect, useState } from "react"

import { Layers } from "lucide-react"

import { API } from "@/api/client"
import type { AdminSkill, AdminSkills } from "@/lib/admin-types"

import { useAdminAuth } from "@/contexts/admin-auth"
import { AlertBanner } from "../components/alert-banner"
import { Field, SelectInput, TextInput } from "../components/form-fields"
import { FormModal } from "../components/form-modal"
import { PageHeader } from "../components/page-header"
import { RowActions } from "../components/row-actions"

const emptyForm = {
  name: "",
  icon: "",
  skill_category_id: 0,
}

export function SkillsPageClient({ initialData }: { initialData: AdminSkills }) {
  const { canMutate, refreshAuth } = useAdminAuth()

  const [data, setData] = useState(initialData)
  const [modalOpen, setModalOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [form, setForm] = useState(emptyForm)

  useEffect(() => {
    setData(initialData)
  }, [initialData])

  function openCreate() {
    setEditingId(null)
    setForm({
      ...emptyForm,
      skill_category_id: data.categories[0]?.id ?? 0,
    })
    setModalOpen(true)
  }

  function openEdit(item: AdminSkill) {
    setEditingId(item.id)
    setForm({
      name: item.name,
      icon: item.icon,
      skill_category_id: item.skill_category_id,
    })
    setModalOpen(true)
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    if (!canMutate) return

    setSubmitting(true)
    const response =
      editingId !== null
        ? await API.put(`/admin/skills/${editingId}`, form)
        : await API.post("/admin/skills", form)
    const next = await response.json()
    setData(next)
    await refreshAuth()
    setModalOpen(false)
    setSubmitting(false)
  }

  async function handleDelete(id: number) {
    if (!canMutate) return
    if (!window.confirm("Excluir esta skill?")) return

    const response = await API.delete(`/admin/skills/${id}`)
    const next = await response.json()
    setData(next)
    await refreshAuth()
  }

  const skillsByCategory = data.categories.map((category) => ({
    category,
    skills: data.skills.filter((skill) => skill.skill_category_id === category.id),
  }))

  return (
    <div>
      <PageHeader
        title="Skills"
        description="Gerencie habilidades e categorias"
        icon={Layers}
        canMutate={canMutate}
        onAdd={openCreate}
      />

      <div className="space-y-4 p-6 md:p-8">
        {!canMutate && (
          <AlertBanner variant="info" message="Faça login para criar, editar ou excluir skills." />
        )}

        {data.skills.length === 0 ? (
          <p className="text-sm text-zinc-500">Nenhuma skill cadastrada.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-zinc-200 text-zinc-500 dark:border-zinc-800">
                  <th className="pb-3 pr-4 font-medium">Nome</th>
                  <th className="pb-3 pr-4 font-medium">Ícone</th>
                  <th className="pb-3 pr-4 font-medium">Categoria</th>
                  {canMutate && <th className="pb-3 font-medium">Ações</th>}
                </tr>
              </thead>
              <tbody>
                {skillsByCategory.flatMap(({ category, skills }) =>
                  skills.map((skill) => (
                    <tr
                      key={skill.id}
                      className="border-b border-zinc-100 last:border-0 dark:border-zinc-800/80"
                    >
                      <td className="py-3 pr-4 font-medium">{skill.name}</td>
                      <td className="py-3 pr-4 font-mono text-xs">{skill.icon}</td>
                      <td className="py-3 pr-4 text-zinc-500">{category.title}</td>
                      {canMutate && (
                        <td className="py-3">
                          <RowActions
                            canMutate
                            onEdit={() => openEdit(skill)}
                            onDelete={() => handleDelete(skill.id)}
                          />
                        </td>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <FormModal
        open={modalOpen}
        title={editingId !== null ? "Editar skill" : "Nova skill"}
        submitting={submitting}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
      >
        <Field label="Nome">
          <TextInput
            required
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          />
        </Field>
        <Field label="Ícone">
          <TextInput
            required
            placeholder="Ex: react, typescript"
            value={form.icon}
            onChange={(e) => setForm((f) => ({ ...f, icon: e.target.value }))}
          />
        </Field>
        <Field label="Categoria">
          <SelectInput
            required
            value={form.skill_category_id}
            onChange={(e) =>
              setForm((f) => ({ ...f, skill_category_id: Number(e.target.value) }))
            }
          >
            {data.categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.title}
              </option>
            ))}
          </SelectInput>
        </Field>
      </FormModal>
    </div>
  )
}
