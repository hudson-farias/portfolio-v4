import { Header } from "./components/layout/header"
import { Footer } from "./components/layout/footer"

export default function HomeLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex w-full flex-col">
      <Header />

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-20 px-6 py-14 md:px-10 min-h-screen">
        {children}
      </main>

      <Footer />
    </div>
  )
}
