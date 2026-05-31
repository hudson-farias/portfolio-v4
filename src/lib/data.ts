import { mockPortfolioData } from "@/lib/mock/data"
import type { PortfolioData } from "@/lib/types"

export async function getPortfolioData(): Promise<PortfolioData> {
  // TODO: trocar por fetch da API pública quando estiver pronta
  return mockPortfolioData
}

export async function getAdminPortfolioData(isAuthenticated: boolean): Promise<PortfolioData> {
  const data = await getPortfolioData()

  if (isAuthenticated) return data

  return {
    ...data,
    profile: {
      ...data.profile,
      phone: "",
    },
    projects: data.projects.filter((project) => project.isPublic !== false),
  }
}
