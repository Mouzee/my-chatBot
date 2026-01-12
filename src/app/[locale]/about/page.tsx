import type { Metadata } from 'next'
import { AnimatedBackground } from "@/components/ui/animated-background"
import { PageNavigation } from "@/components/layout/page-navigation"
import { AboutContent } from "@/components/about/about-content"
import { setRequestLocale } from 'next-intl/server'

export const metadata: Metadata = {
  title: "About | Shafeek Ali",
  description: "Learn about my experience, mission, and passion for frontend development.",
}

export default async function AboutPage({
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
        <AboutContent />
      </main>
      <PageNavigation />
    </>
  )
}
