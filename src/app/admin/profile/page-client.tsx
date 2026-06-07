"use client"

import { useEffect, useState } from "react"

import { Save, User } from "lucide-react"

import { API } from "@/api/client"
import type { AdminProfile } from "@/lib/admin-types"

import { useAdminAuth } from "@/contexts/admin-auth"

import { AlertBanner } from "../components/alert-banner"
import { CheckboxField, Field, TextArea, TextInput } from "../components/form-fields"
import { PageHeader } from "../components/page-header"
import { Button } from "@/components/ui/button"

type ProfileForm = {
  name: string
  last_name: string
  summary: string
  about_me: string
  location: string
  available: boolean
}

function profileToForm(profile: AdminProfile): ProfileForm {
  return {
    name: profile.name,
    last_name: profile.last_name,
    summary: profile.summary,
    about_me: profile.about_me,
    location: profile.location,
    available: profile.available,
  }
}

export function ProfilePageClient({ initialProfile }: { initialProfile: AdminProfile | null }) {
  const { canMutate, refreshAuth } = useAdminAuth()

  const [profile, setProfile] = useState(initialProfile)
  const [submitting, setSubmitting] = useState(false)
  const [saved, setSaved] = useState(false)
  const [form, setForm] = useState<ProfileForm | null>(() =>
    initialProfile ? profileToForm(initialProfile) : null,
  )

  useEffect(() => {
    setProfile(initialProfile)
    setForm(initialProfile ? profileToForm(initialProfile) : null)
  }, [initialProfile])

  function markDirty() {
    setSaved(false)
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    if (!canMutate || !form) return

    setSubmitting(true)
    setSaved(false)

    const response = await API.put("/admin/profile", form)
    const data: AdminProfile = await response.json()
    setProfile(data)
    setForm(profileToForm(data))
    await refreshAuth()
    setSubmitting(false)
    setSaved(true)
  }

  return (
    <div>
      <PageHeader
        title="Perfil"
        description="Dados do perfil exibidos no site"
        icon={User}
        canMutate={canMutate}
      />

      <div className="space-y-4 p-6 md:p-8">
        {!canMutate && (
          <AlertBanner
            variant="info"
            message="Faça login para editar o perfil."
          />
        )}

        {!profile || !form ? (
          <div className="rounded-xl border border-dashed border-zinc-300 bg-white px-6 py-12 text-center dark:border-zinc-700 dark:bg-zinc-900">
            <p className="text-sm text-zinc-500">Nenhum perfil cadastrado no banco de dados.</p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div className="space-y-5 p-6 md:p-8">
              <Field label="Nome">
                <TextInput
                  required
                  disabled={!canMutate}
                  placeholder="Ex: Hudson"
                  value={form.name}
                  onChange={(e) => {
                    markDirty()
                    setForm({ ...form, name: e.target.value })
                  }}
                />
              </Field>

              <Field label="Sobrenome">
                <TextInput
                  disabled={!canMutate}
                  placeholder="Ex: Farias"
                  value={form.last_name}
                  onChange={(e) => {
                    markDirty()
                    setForm({ ...form, last_name: e.target.value })
                  }}
                />
              </Field>

              <Field label="Localização">
                <TextInput
                  disabled={!canMutate}
                  placeholder="Ex: Rio de Janeiro, Brasil"
                  value={form.location}
                  onChange={(e) => {
                    markDirty()
                    setForm({ ...form, location: e.target.value })
                  }}
                />
              </Field>

              <CheckboxField
                label="Disponível"
                checked={form.available}
                onChange={(checked) => {
                  markDirty()
                  setForm({ ...form, available: checked })
                }}
              />

              <Field label="Resumo">
                <TextArea
                  required
                  disabled={!canMutate}
                  placeholder="Breve apresentação profissional..."
                  value={form.summary}
                  onChange={(e) => {
                    markDirty()
                    setForm({ ...form, summary: e.target.value })
                  }}
                />
              </Field>

              <Field label="Sobre mim">
                <TextArea
                  required
                  disabled={!canMutate}
                  placeholder="Conte sua trajetória, stack e experiências..."
                  value={form.about_me}
                  onChange={(e) => {
                    markDirty()
                    setForm({ ...form, about_me: e.target.value })
                  }}
                />
              </Field>
            </div>

            {canMutate && (
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-zinc-200 bg-zinc-50 px-6 py-4 dark:border-zinc-800 dark:bg-zinc-900/50 md:px-8">
                <p className="text-sm text-zinc-500">
                  {saved ? "Alterações salvas com sucesso." : "Salve para aplicar as mudanças."}
                </p>
                <Button type="submit" className="gap-1.5" disabled={submitting}>
                  <Save className="size-4" />
                  {submitting ? "Salvando..." : "Salvar alterações"}
                </Button>
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  )
}
