"use client"

import { AnimatedBackground } from "@/components/ui/animated-background"
import { PageNavigation } from "@/components/layout/page-navigation"
import { Timeline } from "@/components/ui/timeline"
import { motion } from "framer-motion"
import { Clock } from "lucide-react"
import { useI18n } from "@/lib/i18n-utils"

export default function ExperiencePage() {
  const { t } = useI18n()

  // Get timeline items from translations
  const timelineRaw = t.raw("pages.experience.timeline")
  const timelineArray = Array.isArray(timelineRaw) ? timelineRaw : []

  const timelineItems = timelineArray.map((item: any, i: number) => ({
    title: t(`pages.experience.timeline.${i}.title`),
    company: t(`pages.experience.timeline.${i}.company`),
    period: t(`pages.experience.timeline.${i}.period`),
    description: t(`pages.experience.timeline.${i}.description`),
    achievements: Array.isArray(item.achievements)
      ? item.achievements.map((_: any, j: number) => t(`pages.experience.timeline.${i}.achievements.${j}`))
      : [],
    tags: Array.isArray(item.tags)
      ? item.tags.map((_: any, j: number) => t(`pages.experience.timeline.${i}.tags.${j}`))
      : [],
  }))

  return (
    <>
      <AnimatedBackground />
      <main className="min-h-screen relative">
        <section className="min-h-screen px-4 py-20">
          <div className="max-w-4xl mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-12"
            >
              {/* Header */}
              <div className="text-center space-y-4">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20"
                >
                  <Clock className="w-5 h-5 text-accent" />
                  <span className="text-sm font-medium text-accent">{t("pages.experience.badge")}</span>
                </motion.div>
                <h1 className="text-4xl sm:text-5xl font-bold text-foreground">{t("pages.experience.title")}</h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t("pages.experience.subtitle")}</p>
              </div>

              {/* Timeline */}
              <div className="mt-16">
                <Timeline items={timelineItems} />
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <PageNavigation />
    </>
  )
}
