import { AnimatedBackground } from "@/components/ui/animated-background"
import { PageNavigation } from "@/components/layout/page-navigation"
import { HomeContent } from "@/components/home/home-content"
import { setRequestLocale } from 'next-intl/server'

export default async function Home({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

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
