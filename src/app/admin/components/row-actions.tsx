import { Pencil, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"

export function RowActions({ canMutate, onEdit, onDelete }: { canMutate: boolean; onEdit: () => void; onDelete: () => void }) {
    if (!canMutate) return null

    return (
        <div className="flex shrink-0 gap-1">
            <Button size="icon-xs" variant="ghost" aria-label="Editar" onClick={onEdit}>
                <Pencil className="size-3.5" />
            </Button>
            <Button size="icon-xs" variant="ghost" aria-label="Excluir" onClick={onDelete}>
                <Trash2 className="size-3.5" />
            </Button>
        </div>
    )
}
