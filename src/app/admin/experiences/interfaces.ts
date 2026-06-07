import type { ContractType } from "@/types"

import type { AdminRole } from "../roles/interfaces"

export interface AdminExperience {
  id: number
  company: string
  period: string
  role_id: number | null
  role_title: string | null
  contract_type: ContractType | null
  description: string
  hidden?: boolean
}

export type { ContractType }

export interface ExperienceForm {
  company: string
  period: string
  role_id: string
  contract_type: string
  description: string
  hidden: boolean
}

export interface ExperiencesPageClientProps {
  initialItems: AdminExperience[]
  roles: AdminRole[]
}

export interface ContractTypeOption {
  value: ContractType
  label: string
}
