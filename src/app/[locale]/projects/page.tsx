import type { Metadata } from 'next'
import { AnimatedBackground } from "@/components/ui/animated-background"
import { PageNavigation } from "@/components/layout/page-navigation"
import { ProjectsContent } from "@/components/projects/projects-content"
import { setRequestLocale } from 'next-intl/server'

export const metadata: Metadata = {
  title: "Projects | Shafeek Ali",
  description: "Showcase of my web development, UI design, and mobile app projects.",
}

export default async function ProjectsPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

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
