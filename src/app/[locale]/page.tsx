import { AnimatedBackground } from "@/components/ui/animated-background"
import { PageNavigation } from "@/components/layout/page-navigation"
import { HomeContent } from "@/components/home/home-content"

export default function Home() {
  return (
    <>
      <AnimatedBackground />
      <main className="relative h-dvh overflow-hidden">
        <HomeContent />
      </main>
      <PageNavigation />
    </>
  )
}
