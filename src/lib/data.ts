import { mockPortfolioData } from "@/lib/mock/data"
import type { PortfolioData } from "@/app/(home)/interfaces"

export async function getPortfolioData(): Promise<PortfolioData> {
  // TODO: trocar por fetch da API pública quando estiver pronta
  return mockPortfolioData
}
