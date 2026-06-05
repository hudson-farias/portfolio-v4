"use client"

import { useEffect, useState } from "react"

import { Share2 } from "lucide-react"

import { API } from "@/api/client"
import type { AdminSocialNetwork } from "@/lib/admin-types"

import { useAdminAuth } from "@/contexts/admin-auth"
import { AlertBanner } from "../components/alert-banner"
import { CheckboxField, Field, TextInput } from "../components/form-fields"
import { IconSelect } from "../components/icon-select"
import { FormModal } from "../components/form-modal"
import { PageHeader } from "../components/page-header"
import { AppIcon } from "@/components/icons/app-icon"
import { socialIconNames } from "@/components/icons/map"
import { RowActions } from "../components/row-actions"

const emptyForm = {
  url: "",
  icon: "",
  show_header: false,
  show_footer: false,
}

function placementLabel(item: { show_header: boolean; show_footer: boolean }) {
  const parts: string[] = []
  if (item.show_header) parts.push("Header")
  if (item.show_footer) parts.push("Footer")
  return parts.length > 0 ? parts.join(" · ") : "—"
}

export function SocialNetworksPageClient({ initialItems }: { initialItems: AdminSocialNetwork[] }) {
  const { canMutate, refreshAuth } = useAdminAuth()

  const [items, setItems] = useState(initialItems)
  const [modalOpen, setModalOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [formError, setFormError] = useState<string | null>(null)

  useEffect(() => {
    setItems(initialItems)
  }, [initialItems])

  function openCreate() {
    setEditingId(null)
    setForm(emptyForm)
    setFormError(null)
    setModalOpen(true)
  }

  function openEdit(item: AdminSocialNetwork) {
    setEditingId(item.id)
    setForm({
      url: item.url,
      icon: item.icon,
      show_header: item.show_header,
      show_footer: item.show_footer,
    })
    setFormError(null)
    setModalOpen(true)
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    if (!canMutate) return
    if (!form.show_header && !form.show_footer) {
      setFormError("Selecione pelo menos Header ou Footer.")
      return
    }

    setSubmitting(true)
    setFormError(null)
    const response =
      editingId !== null
        ? await API.put(`/admin/social_networks/${editingId}`, form)
        : await API.post("/admin/social_networks", form)
    const data = await response.json()
    setItems(data)
    await refreshAuth()
    setModalOpen(false)
    setSubmitting(false)
  }

  async function handleDelete(id: number) {
    if (!canMutate) return
    if (!window.confirm("Excluir esta rede social?")) return

    const response = await API.delete(`/admin/social_networks/${id}`)
    const data = await response.json()
    setItems(data)
    await refreshAuth()
  }

  return (
    <div>
      <PageHeader
        title="Redes sociais"
        description="Links exibidos no header e footer do site"
        icon={Share2}
        canMutate={canMutate}
        onAdd={openCreate}
      />

      <div className="space-y-4 p-6 md:p-8">
        {!canMutate && (
          <AlertBanner
            variant="info"
            message="Faça login para criar, editar ou excluir redes sociais."
          />
        )}

        {items.length === 0 ? (
          <p className="text-sm text-zinc-500">Nenhuma rede social cadastrada.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead>
                <tr className="border-b border-zinc-200 text-zinc-500 dark:border-zinc-800">
                  <th className="pb-3 pr-4 font-medium">Ícone</th>
                  <th className="pb-3 pr-4 font-medium">URL</th>
                  <th className="pb-3 pr-4 font-medium">Exibição</th>
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
                      <AppIcon name={item.icon} className="size-4" />
                    </td>
                    <td className="py-3 pr-4">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="break-all text-zinc-600 underline-offset-4 hover:underline dark:text-zinc-400"
                      >
                        {item.url}
                      </a>
                    </td>
                    <td className="py-3 pr-4">
                      <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium dark:bg-zinc-800">
                        {placementLabel(item)}
                      </span>
                    </td>
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
        title={editingId !== null ? "Editar rede social" : "Nova rede social"}
        submitting={submitting}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
      >
        {formError && <AlertBanner message={formError} />}
        <Field label="URL">
          <TextInput
            required
            type="url"
            placeholder="https://..."
            value={form.url}
            onChange={(e) => setForm((f) => ({ ...f, url: e.target.value }))}
          />
        </Field>
        <Field label="Ícone">
          <IconSelect
            required
            options={socialIconNames}
            value={form.icon}
            onChange={(icon) => setForm((f) => ({ ...f, icon }))}
          />
        </Field>
        <div className="flex flex-wrap gap-4">
          <CheckboxField
            label="Exibir no header"
            checked={form.show_header}
            onChange={(checked) => setForm((f) => ({ ...f, show_header: checked }))}
          />
          <CheckboxField
            label="Exibir no footer"
            checked={form.show_footer}
            onChange={(checked) => setForm((f) => ({ ...f, show_footer: checked }))}
          />
        </div>
      </FormModal>
    </div>
  )
}
