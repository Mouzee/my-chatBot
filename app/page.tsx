"use client"

import { ChatbotFAQ } from "@/components/chatbot-faq"
import { AnimatedBackground } from "@/components/animated-background"
import { PageNavigation } from "@/components/page-navigation"
import { motion } from "framer-motion"
import { Bot, Sparkles, BrainCog, Lightbulb, LayoutGrid, PenTool, Code2, MonitorSmartphone, BadgeCheck, type LucideIcon } from "lucide-react"
import { useTranslation } from "react-i18next"
import { useEffect, useMemo } from "react"
import { STORAGE_KEYS, ANIMATION } from "@/lib/constants"

interface FeatureCard {
  icon: LucideIcon
  translationKey: string
}

/**
 * Home page with hero section, feature highlights, and interactive chatbot
 */
export default function Home() {
  const { t } = useTranslation()

  useEffect(() => {
    const currentCount = localStorage.getItem(STORAGE_KEYS.VISITOR_COUNT)
    const count = currentCount ? Number.parseInt(currentCount, 10) : 0
    const newCount = count + 1
    localStorage.setItem(STORAGE_KEYS.VISITOR_COUNT, newCount.toString())
  }, [])

  const features: FeatureCard[] = useMemo(
    () => [
      { icon: BadgeCheck, translationKey: "intro-section.hero.feature1" },
      { icon: Sparkles, translationKey: "intro-section.hero.feature2" },
      { icon: Lightbulb, translationKey: "intro-section.hero.feature3" },
      { icon: LayoutGrid, translationKey: "intro-section.hero.feature4" },
      { icon: PenTool, translationKey: "intro-section.hero.feature5" },
      { icon: Code2, translationKey: "intro-section.hero.feature6" },
      { icon: MonitorSmartphone, translationKey: "intro-section.hero.feature7" },
      { icon: BrainCog, translationKey: "intro-section.hero.feature8" },
    ],
    []
  )

  return (
    <>
      <AnimatedBackground />
      
      <main className="relative h-dvh overflow-hidden">
        <section className="flex items-center px-4 h-full pb-20">
          <div className="max-w-7xl mx-auto w-full">
            <div className="grid lg:grid-cols-[1fr_1.5fr] gap-8 items-center">
              {/* Hero content */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: ANIMATION.DURATION.NORMAL }}
              >
                <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-6">
                  <Bot className="w-4 h-4 text-primary" aria-hidden="true" />
                  <span className="text-sm font-medium text-primary">{t("intro-section.hero.badge")}</span>
                </div>

                <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
                  <span className="text-foreground">{t("intro-section.hero.title")} </span>
                  <span className="text-primary">{t("intro-section.hero.titleHighlight")}</span>
                </h1>

                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  {t("intro-section.hero.description")}
                </p>

                <motion.div
                  className="flex flex-wrap items-center gap-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: ANIMATION.DURATION.NORMAL, delay: ANIMATION.DELAY.MEDIUM }}
                  role="list"
                  aria-label="Key features"
                >
                  {features.map((feature) => {
                    const Icon = feature.icon
                    return (
                      <motion.div
                        key={feature.translationKey}
                        whileHover={{ scale: 1.05, y: -2 }}
                        className="flex items-center gap-2 px-4 py-2 bg-secondary/50 rounded-full border border-border/50 hover:border-accent/50 hover:shadow-md transition-all duration-200"
                        role="listitem"
                      >
                        <Icon className="w-4 h-4 text-accent" aria-hidden="true" />
                        <span className="text-sm text-muted-foreground">{t(feature.translationKey)}</span>
                      </motion.div>
                    )
                  })}
                </motion.div>

                {/* <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: ANIMATION.DURATION.NORMAL, delay: ANIMATION.DELAY.LONG }}
                  className="mt-8 flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <Eye className="w-4 h-4 text-accent" aria-hidden="true" />
                  <span>
                    {t("intro-section.footer.visitors")}:{" "}
                    <span className="font-semibold text-foreground" aria-label={`${visitorCount.toLocaleString()} visitors`}>
                      {visitorCount.toLocaleString()}
                    </span>
                  </span>
                </motion.div> */}
              </motion.div>

              {/* Chatbot section */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: ANIMATION.DURATION.NORMAL, delay: ANIMATION.DELAY.SHORT * 3 }}
                className="flex justify-center lg:justify-end"
              >
                <ChatbotFAQ />
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      
      <PageNavigation />
    </>
  )
}
