"use client"

import { useEffect, useState } from "react"

import { Briefcase } from "lucide-react"

import { API } from "@/api/client"
import type { AdminExperience } from "@/lib/admin-types"

import { useAdminAuth } from "@/contexts/admin-auth"

import { AlertBanner } from "../components/alert-banner"
import { CheckboxField, Field, TextArea, TextInput } from "../components/form-fields"
import { FormModal } from "../components/form-modal"
import { PageHeader } from "../components/page-header"
import { ExperiencesTable } from "../components/experiences-table"

const emptyForm = {
  company: "",
  period: "",
  role: "",
  description: "",
  hidden: false,
}

export function ExperiencesPageClient({ initialItems }: { initialItems: AdminExperience[] }) {
  const { canMutate, refreshAuth } = useAdminAuth()

  const [items, setItems] = useState(initialItems)
  const [modalOpen, setModalOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [form, setForm] = useState(emptyForm)

  useEffect(() => {
    setItems(initialItems)
  }, [initialItems])

  function openCreate() {
    setEditingId(null)
    setForm(emptyForm)
    setModalOpen(true)
  }

  function openEdit(item: AdminExperience) {
    setEditingId(item.id)
    setForm({
      company: item.company,
      period: item.period,
      role: item.role,
      description: item.description,
      hidden: item.hidden ?? false,
    })
    setModalOpen(true)
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    if (!canMutate) return

    setSubmitting(true)
    const response = editingId !== null ? await API.put(`/admin/experiences/${editingId}`, form) : await API.post("/admin/experiences", form)
    const data = await response.json()
    setItems(data)
    await refreshAuth()
    setModalOpen(false)
    setSubmitting(false)
  }

  async function handleDelete(id: number) {
    if (!canMutate) return
    if (!window.confirm("Excluir esta experiência?")) return

    const response = await API.delete(`/admin/experiences/${id}`)
    const data = await response.json()
    setItems(data)
    await refreshAuth()
  }

  return (
    <div>
      <PageHeader
        title="Experiências"
        description="Gerencie os registros da tabela experiences"
        icon={Briefcase}
        canMutate={canMutate}
        onAdd={openCreate}
      />

      <div className="space-y-4 p-6 md:p-8">
        {!canMutate && (
          <AlertBanner
            variant="info"
            message="Faça login para criar, editar ou excluir experiências."
          />
        )}

        {items.length === 0 ? (
          <p className="text-sm text-zinc-500">Nenhuma experiência cadastrada.</p>
        ) : (
          <ExperiencesTable
            items={items}
            canMutate={canMutate}
            onEdit={openEdit}
            onDelete={handleDelete}
          />
        )}
      </div>

      <FormModal
        open={modalOpen}
        title={editingId !== null ? "Editar experiência" : "Nova experiência"}
        submitting={submitting}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
      >
        <Field label="Empresa">
          <TextInput
            required
            value={form.company}
            onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
          />
        </Field>
        <Field label="Cargo">
          <TextInput
            required
            value={form.role}
            onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
          />
        </Field>
        <Field label="Período">
          <TextInput
            required
            placeholder="Ex: Jan 2023 — Atual"
            value={form.period}
            onChange={(e) => setForm((f) => ({ ...f, period: e.target.value }))}
          />
        </Field>
        <Field label="Descrição">
          <TextArea
            required
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
          />
        </Field>
        <CheckboxField
          label="Ocultar (visível apenas com login no admin)"
          checked={form.hidden}
          onChange={(checked) => setForm((f) => ({ ...f, hidden: checked }))}
        />
      </FormModal>
    </div>
  )
}
