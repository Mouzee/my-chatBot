"use client"

import { AnimatedBackground } from "@/components/animated-background"
import { PageNavigation } from "@/components/page-navigation"
import { motion } from "framer-motion"
import { Award, Target, Heart } from "lucide-react"
import { useTranslation } from "react-i18next"

export default function AboutPage() {
  const { t } = useTranslation()

  return (
    <>
      <AnimatedBackground />
      <main className="min-h-screen relative">
        <section className="min-h-screen flex items-center px-4 py-20">
          <div className="max-w-4xl mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="text-center space-y-4">
                <h1 className="text-4xl sm:text-5xl font-bold text-foreground">{t("pages.about.title")}</h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t("pages.about.subtitle")}</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mt-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="glass-card p-6 space-y-3"
                >
                  <Award className="w-8 h-8 text-primary" />
                  <h3 className="text-xl font-semibold">{t("pages.about.experience.title")}</h3>
                  <p className="text-muted-foreground">{t("pages.about.experience.description")}</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="glass-card p-6 space-y-3"
                >
                  <Target className="w-8 h-8 text-primary" />
                  <h3 className="text-xl font-semibold">{t("pages.about.mission.title")}</h3>
                  <p className="text-muted-foreground">{t("pages.about.mission.description")}</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="glass-card p-6 space-y-3"
                >
                  <Heart className="w-8 h-8 text-primary" />
                  <h3 className="text-xl font-semibold">{t("pages.about.passion.title")}</h3>
                  <p className="text-muted-foreground">{t("pages.about.passion.description")}</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <PageNavigation />
    </>
  )
}
