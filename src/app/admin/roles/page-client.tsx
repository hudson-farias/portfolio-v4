"use client"

import { useEffect, useState } from "react"

import { BadgeCheck } from "lucide-react"

import { API } from "@/api/client"
import type { AdminRole, RoleLocale, RoleSeniority } from "@/lib/admin-types"

import { useAdminAuth } from "@/contexts/admin-auth"

import { AlertBanner } from "../components/alert-banner"
import { CheckboxField, Field, SelectInput, TextArea, TextInput } from "../components/form-fields"
import { IconSelect } from "../components/icon-select"
import { FormModal } from "../components/form-modal"
import { PageHeader } from "../components/page-header"
import { RowActions } from "../components/row-actions"
import { AppIcon } from "@/components/icons/app-icon"

const LOCALES: { value: RoleLocale; label: string }[] = [
  { value: "pt", label: "PT" },
  { value: "en", label: "EN" },
  { value: "todos", label: "Todos" },
]

const SENIORITIES: { value: RoleSeniority; label: string }[] = [
  { value: "Junior", label: "Junior" },
  { value: "Pleno", label: "Pleno" },
  { value: "Senior", label: "Senior" },
  { value: "Lead", label: "Lead" },
]

const emptyForm = {
  title: "",
  summary: "",
  category: "",
  seniority: "" as string,
  show: false,
  featured: false,
  locale: "pt" as RoleLocale,
  active: true,
  sort_order: 0,
  color: "",
  icon: "",
}

function boolBadge(value: boolean, yes = "Sim", no = "Não") {
  return value ? (
    <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200">
      {yes}
    </span>
  ) : (
    <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
      {no}
    </span>
  )
}

function formToPayload(form: typeof emptyForm) {
  return {
    title: form.title,
    summary: form.summary || null,
    category: form.category || null,
    seniority: form.seniority ? (form.seniority as RoleSeniority) : null,
    show: form.show,
    featured: form.featured,
    locale: form.locale,
    active: form.active,
    sort_order: form.sort_order,
    color: form.color || null,
    icon: form.icon || null,
  }
}

export function RolesPageClient({ initialItems }: { initialItems: AdminRole[] }) {
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

  function openEdit(item: AdminRole) {
    setEditingId(item.id)
    setForm({
      title: item.title,
      summary: item.summary ?? "",
      category: item.category ?? "",
      seniority: item.seniority ?? "",
      show: item.show,
      featured: item.featured,
      locale: item.locale,
      active: item.active,
      sort_order: item.sort_order,
      color: item.color ?? "",
      icon: item.icon ?? "",
    })
    setModalOpen(true)
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    if (!canMutate) return

    setSubmitting(true)
    const payload = formToPayload(form)
    const response =
      editingId !== null
        ? await API.put(`/admin/roles/${editingId}`, payload)
        : await API.post("/admin/roles", payload)
    const data = await response.json()
    setItems(data)
    await refreshAuth()
    setModalOpen(false)
    setSubmitting(false)
  }

  async function handleDelete(id: number) {
    if (!canMutate) return
    if (!window.confirm("Excluir este cargo? Experiências vinculadas ficarão sem cargo.")) return

    const response = await API.delete(`/admin/roles/${id}`)
    const data = await response.json()
    setItems(data)
    await refreshAuth()
  }

  return (
    <div>
      <PageHeader
        title="Cargos"
        description="Catálogo de cargos reutilizáveis em experiências e exibição pública"
        icon={BadgeCheck}
        canMutate={canMutate}
        onAdd={openCreate}
      />

      <div className="space-y-4 p-6 md:p-8">
        {!canMutate && (
          <AlertBanner
            variant="info"
            message="Faça login para criar, editar ou excluir cargos."
          />
        )}

        {items.length === 0 ? (
          <p className="text-sm text-zinc-500">Nenhum cargo cadastrado.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead>
                <tr className="border-b border-zinc-200 text-zinc-500 dark:border-zinc-800">
                  <th className="pb-3 pr-4 font-medium">Título</th>
                  <th className="pb-3 pr-4 font-medium">Locale</th>
                  <th className="pb-3 pr-4 font-medium">Categoria</th>
                  <th className="pb-3 pr-4 font-medium">Senioridade</th>
                  <th className="pb-3 pr-4 font-medium">Exibir</th>
                  <th className="pb-3 pr-4 font-medium">Experiências</th>
                  <th className="pb-3 pr-4 font-medium">Ordem</th>
                  {canMutate && <th className="pb-3 font-medium">Ações</th>}
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-zinc-100 last:border-0 dark:border-zinc-800/80"
                  >
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-2 font-medium">
                        {item.icon && <AppIcon name={item.icon} className="size-4" />}
                        {item.color && (
                          <span
                            className="size-3 rounded-full border border-zinc-300 dark:border-zinc-600"
                            style={{ backgroundColor: item.color }}
                          />
                        )}
                        {item.title}
                      </div>
                    </td>
                    <td className="py-3 pr-4 text-zinc-500">
                      {LOCALES.find((l) => l.value === item.locale)?.label ?? item.locale}
                    </td>
                    <td className="py-3 pr-4 text-zinc-600 dark:text-zinc-400">
                      {item.category ?? "—"}
                    </td>
                    <td className="py-3 pr-4 text-zinc-600 dark:text-zinc-400">
                      {item.seniority ?? "—"}
                    </td>
                    <td className="py-3 pr-4">{boolBadge(item.show)}</td>
                    <td className="py-3 pr-4 text-zinc-500">{item.experience_count}</td>
                    <td className="py-3 pr-4 text-zinc-500">{item.sort_order}</td>
                    {canMutate && (
                      <td className="py-3">
                        <RowActions
                          canMutate
                          onEdit={() => openEdit(item)}
                          onDelete={() => handleDelete(item.id)}
                        />
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <FormModal
        open={modalOpen}
        title={editingId !== null ? "Editar cargo" : "Novo cargo"}
        submitting={submitting}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
      >
        <Field label="Título">
          <TextInput
            required
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
          />
        </Field>
        <Field label="Locale">
          <SelectInput
            required
            value={form.locale}
            onChange={(e) => setForm((f) => ({ ...f, locale: e.target.value as RoleLocale }))}
          >
            {LOCALES.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </SelectInput>
        </Field>
        <Field label="Resumo">
          <TextArea
            value={form.summary}
            onChange={(e) => setForm((f) => ({ ...f, summary: e.target.value }))}
          />
        </Field>
        {/* <Field label="Categoria">
          <TextInput
            value={form.category}
            onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
          />
        </Field> */}
        <Field label="Senioridade">
          <SelectInput
            value={form.seniority}
            onChange={(e) => setForm((f) => ({ ...f, seniority: e.target.value }))}
          >
            <option value="">—</option>
            {SENIORITIES.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </SelectInput>
        </Field>
        <Field label="Ordem">
          <TextInput
            required
            type="number"
            min={0}
            value={form.sort_order}
            onChange={(e) => setForm((f) => ({ ...f, sort_order: Number(e.target.value) }))}
          />
        </Field>
        <Field label="Cor">
          <div className="flex gap-2">
            <TextInput
              type="color"
              className="h-10 w-14 shrink-0 cursor-pointer p-1"
              value={form.color || "#3b82f6"}
              onChange={(e) => setForm((f) => ({ ...f, color: e.target.value }))}
            />
            <TextInput
              placeholder="#3b82f6"
              value={form.color}
              onChange={(e) => setForm((f) => ({ ...f, color: e.target.value }))}
            />
          </div>
        </Field>
        <Field label="Ícone">
          <IconSelect
            value={form.icon}
            onChange={(icon) => setForm((f) => ({ ...f, icon }))}
          />
        </Field>
        <div className="flex flex-wrap gap-4">
          <CheckboxField
            label="Exibir no site"
            checked={form.show}
            onChange={(checked) => setForm((f) => ({ ...f, show: checked }))}
          />
          <CheckboxField
            label="Destaque"
            checked={form.featured}
            onChange={(checked) => setForm((f) => ({ ...f, featured: checked }))}
          />
          <CheckboxField
            label="Ativo"
            checked={form.active}
            onChange={(checked) => setForm((f) => ({ ...f, active: checked }))}
          />
        </div>
      </FormModal>
    </div>
  )
}
