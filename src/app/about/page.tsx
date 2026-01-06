"use client"

import { AnimatedBackground } from "@/components/ui/animated-background"
import { PageNavigation } from "@/components/layout/page-navigation"
import { motion } from "framer-motion"
import { Award, Target, Heart } from "lucide-react"
import { useTranslation } from "react-i18next"
import { AnimatedCounter } from "@/components/animated-counter"

export default function AboutPage() {
  const { t } = useTranslation()

  return (
    <>
      <AnimatedBackground />
      <main className="min-h-screen relative">
        <section className="min-h-screen flex items-center px-4 py-20">
          <div className="max-w-5xl mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* Header */}
              <div className="text-center space-y-4">
                <h1 className="text-4xl sm:text-5xl font-bold text-foreground">{t("pages.about.title")}</h1>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  {t("pages.about.subtitle")}
                </p>
              </div>

              {/* Info Cards */}
              <div className="grid md:grid-cols-3 gap-6 mt-12">
                <AboutCard
                  icon={<Award className="w-8 h-8 text-primary" />}
                  title={t("pages.about.experience.title")}
                  description={t("pages.about.experience.description")}
                  delay={0.1}
                />
                <AboutCard
                  icon={<Target className="w-8 h-8 text-primary" />}
                  title={t("pages.about.mission.title")}
                  description={t("pages.about.mission.description")}
                  delay={0.2}
                />
                <AboutCard
                  icon={<Heart className="w-8 h-8 text-primary" />}
                  title={t("pages.about.passion.title")}
                  description={t("pages.about.passion.description")}
                  delay={0.3}
                />
              </div>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="text-center mt-12 space-y-6"
            >
              <p className="text-muted-foreground leading-relaxed">
                {t("pages.about.longDescription1")}
              </p>

              <div className="grid grid-cols-3 gap-6 text-left ">
                <p className="text-muted-foreground leading-relaxed justify-center">
                  {t("pages.about.longDescription2")}
                </p>
                <p className="text-muted-foreground leading-relaxed justify-center">
                  {t("pages.about.longDescription3")}
                </p>
                <p className="text-muted-foreground leading-relaxed justify-left">
                  {t("pages.about.longDescription4")}
                </p>
              </div>

            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-12">
              <Stat label={t("pages.about.stats.experience")} value={12} suffix="+" />
              <Stat label={t("pages.about.stats.projects")} value={50} suffix="+" />
              <Stat label={t("pages.about.stats.startupProjects")} value={10} suffix="+" />
              <Stat label={t("pages.about.stats.clients")} value={30} suffix="+" />
            </div>
          </div>
        </section>
      </main>
      <PageNavigation />
    </>
  )
}

function AboutCard({
  icon,
  title,
  description,
  delay,
}: {
  icon: React.ReactNode
  title: string
  description: string
  delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="glass-card p-6 space-y-3"
    >
      {icon}
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  )
}

function Stat({ label, value, suffix }: { label: string; value: number; suffix?: string }) {
  return (
    <div className="text-center">
      <h4 className="text-3xl font-bold text-primary mb-2">
        <AnimatedCounter from={0} to={value} duration={2} />
        {suffix}
      </h4>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  )
}
