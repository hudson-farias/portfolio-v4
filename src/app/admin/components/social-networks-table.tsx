import { AppIcon } from "@/components/icons/app-icon"
import { formatLandpageSections } from "@/app/admin/lib/landpage-sections"
import { RowActions } from "./row-actions"
import type { AdminSocialNetwork } from "../social-networks/interfaces"

export const SocialNetworksTable = ({ items, canMutate, }: { items: AdminSocialNetwork[]; canMutate: boolean }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[560px] text-left text-sm">
        <thead>
          <tr className="border-b border-zinc-200 text-zinc-500 dark:border-zinc-800">
            <th className="pb-3 pr-4 font-medium">Ícone</th>
            <th className="pb-3 pr-4 font-medium">URL</th>
            <th className="pb-3 pr-4 font-medium">Seções</th>
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
                <span className="inline-flex items-center gap-2">
                  <AppIcon name={item.icon} className="size-4" />
                  <span className="font-mono text-xs">{item.icon}</span>
                </span>
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
                  {formatLandpageSections(item.positions)}
                </span>
              </td>
              {canMutate && (
                <td className="py-3">
                  <RowActions
                    canMutate
                    onEdit={() => console.log("edit social", item.id)}
                    onDelete={() => console.log("delete social", item.id)}
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
