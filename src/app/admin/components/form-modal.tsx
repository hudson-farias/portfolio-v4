"use client"

import { X } from "lucide-react"

import { Button } from "@/components/ui/button"

export function FormModal({
  open,
  title,
  children,
  submitting,
  submitLabel = "Salvar",
  onClose,
  onSubmit,
}: {
  open: boolean
  title: string
  children: React.ReactNode
  submitting?: boolean
  submitLabel?: string
  onClose: () => void
  onSubmit: (event: React.FormEvent) => void
}) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="form-modal-title"
        className="w-full max-w-lg rounded-xl border border-zinc-200 bg-white shadow-xl dark:border-zinc-800 dark:bg-zinc-900"
      >
        <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-4 dark:border-zinc-800">
          <h2 id="form-modal-title" className="font-semibold">
            {title}
          </h2>
          <Button type="button" size="icon-xs" variant="ghost" aria-label="Fechar" onClick={onClose}>
            <X className="size-4" />
          </Button>
        </div>

        <form onSubmit={onSubmit}>
          <div className="space-y-4 p-5">{children}</div>
          <div className="flex justify-end gap-2 border-t border-zinc-200 px-5 py-4 dark:border-zinc-800">
            <Button type="button" variant="outline" onClick={onClose} disabled={submitting}>
              Cancelar
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? "Salvando..." : submitLabel}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
