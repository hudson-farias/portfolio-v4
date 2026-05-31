import type { Experience } from "@/lib/types"

import { RowActions } from "./row-actions"

export function ExperiencesTable({ items, canMutate, }: { items: Experience[]; canMutate: boolean }) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
                <thead>
                    <tr className="border-b border-zinc-200 text-zinc-500 dark:border-zinc-800">
                        <th className="pb-3 pr-4 font-medium">Empresa</th>
                        <th className="pb-3 pr-4 font-medium">Cargo</th>
                        <th className="pb-3 pr-4 font-medium">Período</th>
                        <th className="pb-3 pr-4 font-medium">Descrição</th>
                        {canMutate && <th className="pb-3 font-medium">Ações</th>}
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <tr key={item.id} className="border-b border-zinc-100 last:border-0 dark:border-zinc-800/80">
                            <td className="py-3 pr-4 font-medium">{item.company}</td>
                            <td className="py-3 pr-4">{item.role}</td>
                            <td className="py-3 pr-4 whitespace-nowrap text-zinc-500">{item.period}</td>
                            <td className="py-3 pr-4 text-zinc-600 dark:text-zinc-400">{item.description}</td>
                            {canMutate && (
                                <td className="py-3">
                                    <RowActions
                                        canMutate
                                        onEdit={() => console.log("edit experience", item.id)}
                                        onDelete={() => console.log("delete experience", item.id)}
                                    />
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
