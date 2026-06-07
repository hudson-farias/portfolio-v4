export interface AdminSkill {
  id: number
  name: string
  icon: string
  skill_category_id: number
  skill_category_name: string
}

export interface AdminSkillCategory {
  id: number
  title: string
}

export interface AdminSkills {
  skills: AdminSkill[]
  categories: AdminSkillCategory[]
}

export interface SkillForm {
  name: string
  icon: string
  skill_category_id: number
}

export interface SkillsPageClientProps {
  initialData: AdminSkills
}
