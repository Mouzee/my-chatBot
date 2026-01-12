import type { Metadata } from 'next'
import { AnimatedBackground } from "@/components/ui/animated-background"
import { PageNavigation } from "@/components/layout/page-navigation"
import { AboutContent } from "@/components/about/about-content"

export const metadata: Metadata = {
  title: "About | Shafeek Ali",
  description: "Learn about my experience, mission, and passion for frontend development.",
}

export default function AboutPage() {
  return (
    <>
      <AnimatedBackground />
      <main className="min-h-screen relative">
        <AboutContent />
      </main>
      <PageNavigation />
    </>
  )
}
