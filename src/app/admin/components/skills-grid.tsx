import { Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AppIcon } from "@/components/icons/app-icon"
import type { SkillCategory } from "@/lib/types"

export const SkillsGrid = ({ categories, canMutate }: { categories: SkillCategory[]; canMutate: boolean }) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {categories.map((category) => (
        <article
          key={category.title}
          className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800"
        >
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-sm font-medium">{category.title}</h3>
            {canMutate && (
              <Button size="icon-xs" variant="ghost" aria-label={`Editar ${category.title}`}>
                <Pencil className="size-3.5" />
              </Button>
            )}
          </div>
          <ul className="mt-3 space-y-1.5">
            {category.skills.map((skill) => (
              <li
                key={skill.id}
                className="flex items-center justify-between gap-2 text-sm text-zinc-600 dark:text-zinc-400"
              >
                <span>{skill.name}</span>
                <span
                  className="inline-flex items-center gap-1.5 rounded bg-zinc-100 px-1.5 py-0.5 text-xs text-zinc-500 dark:bg-zinc-800"
                  title={skill.icon}
                >
                  <AppIcon name={skill.icon} className="size-3.5" />
                  <span className="font-mono">{skill.icon}</span>
                </span>
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  )
}
