import type { Metadata } from 'next'
import { AnimatedBackground } from "@/components/ui/animated-background"
import { PageNavigation } from "@/components/layout/page-navigation"
import { ProjectsContent } from "@/components/projects/projects-content"

export const metadata: Metadata = {
  title: "Projects | Shafeek Ali",
  description: "Showcase of my web development, UI design, and mobile app projects.",
}

export default function ProjectsPage() {
  return (
    <>
      <AnimatedBackground />
      <main className="min-h-screen relative">
        <ProjectsContent />
      </main>
      <PageNavigation />
    </>
  )
}
