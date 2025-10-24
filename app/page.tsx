"use client"

import { ChatbotFAQ } from "@/components/chatbot-faq"
import { AnimatedBackground } from "@/components/animated-background"
import { PageNavigation } from "@/components/page-navigation"
import { motion } from "framer-motion"
import { Bot, Sparkles, MessageCircle, Eye, Zap, Target, Award, Heart, BrainCog, Lightbulb, LayoutGrid, PenTool, Code2, MonitorSmartphone, BadgeCheck } from "lucide-react"
import { useTranslation } from "react-i18next"
import { useState, useEffect } from "react"

export default function Home() {
  const { t } = useTranslation()
  const [visitorCount, setVisitorCount] = useState<number>(0)

  useEffect(() => {
    // Get current count from localStorage
    const currentCount = localStorage.getItem("visitorCount")
    const count = currentCount ? Number.parseInt(currentCount, 10) : 0

    // Increment count
    const newCount = count + 1

    // Save to localStorage
    localStorage.setItem("visitorCount", newCount.toString())

    // Update state
    setVisitorCount(newCount)
  }, [])

  return (
    <>
      <AnimatedBackground />
      
      <main className="relative h-[100dvh] overflow-hidden">
        <section className="flex items-center px-4 h-full pb-20">
          <div className="max-w-7xl mx-auto w-full">
            <div className="grid lg:grid-cols-[1fr_1.5fr] gap-8 items-center">
              {/* Left Column - Hero Content */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-6">
                  <Bot className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-primary">{t("hero.badge")}</span>
                </div>

                <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
                  <span className="text-foreground">{t("hero.title")} </span>
                  <span className="text-primary">{t("hero.titleHighlight")}</span>
                </h1>

                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">{t("hero.description")}</p>

                <motion.div
                  className="flex flex-wrap items-center gap-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="flex items-center gap-2 px-4 py-2 bg-secondary/50 rounded-full border border-border/50 hover:border-accent/50 hover:shadow-md transition-all duration-200"
                  >
                    <BadgeCheck className="w-4 h-4 text-accent" />
                    <span className="text-sm text-muted-foreground">{t("hero.feature1")}</span>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="flex items-center gap-2 px-4 py-2 bg-secondary/50 rounded-full border border-border/50 hover:border-accent/50 hover:shadow-md transition-all duration-200"
                  >
                    <Sparkles className="w-4 h-4 text-accent" />
                    <span className="text-sm text-muted-foreground">{t("hero.feature2")}</span>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="flex items-center gap-2 px-4 py-2 bg-secondary/50 rounded-full border border-border/50 hover:border-accent/50 hover:shadow-md transition-all duration-200"
                  >
                    <Lightbulb className="w-4 h-4 text-accent" />
                    <span className="text-sm text-muted-foreground">{t("hero.feature3")}</span>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="flex items-center gap-2 px-4 py-2 bg-secondary/50 rounded-full border border-border/50 hover:border-accent/50 hover:shadow-md transition-all duration-200"
                  >
                    <LayoutGrid className="w-4 h-4 text-accent" />
                    <span className="text-sm text-muted-foreground">{t("hero.feature4")}</span>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="flex items-center gap-2 px-4 py-2 bg-secondary/50 rounded-full border border-border/50 hover:border-accent/50 hover:shadow-md transition-all duration-200"
                  >
                    <PenTool className="w-4 h-4 text-accent" />
                    <span className="text-sm text-muted-foreground">{t("hero.feature5")}</span>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="flex items-center gap-2 px-4 py-2 bg-secondary/50 rounded-full border border-border/50 hover:border-accent/50 hover:shadow-md transition-all duration-200"
                  >
                    <Code2 className="w-4 h-4 text-accent" />
                    <span className="text-sm text-muted-foreground">{t("hero.feature6")}</span>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="flex items-center gap-2 px-4 py-2 bg-secondary/50 rounded-full border border-border/50 hover:border-accent/50 hover:shadow-md transition-all duration-200"
                  >
                    <MonitorSmartphone className="w-4 h-4 text-accent" />
                    <span className="text-sm text-muted-foreground">{t("hero.feature7")}</span>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="flex items-center gap-2 px-4 py-2 bg-secondary/50 rounded-full border border-border/50 hover:border-accent/50 hover:shadow-md transition-all duration-200"
                  >
                    <BrainCog  className="w-4 h-4 text-accent" />
                    <span className="text-sm text-muted-foreground">{t("hero.feature8")}</span>
                  </motion.div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="mt-8 flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <Eye className="w-4 h-4 text-accent" />
                  <span>
                    {t("footer.visitors")}:{" "}
                    <span className="font-semibold text-foreground">{visitorCount.toLocaleString()}</span>
                  </span>
                </motion.div>
              </motion.div>

              {/* Right Column - Chatbot */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
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
