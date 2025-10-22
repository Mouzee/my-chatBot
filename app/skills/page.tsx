"use client"

import { AnimatedBackground } from "@/components/animated-background"
import { PageNavigation } from "@/components/page-navigation"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Code, Palette, Layout, Terminal, Figma, Sparkles } from "lucide-react"
import { useTranslation } from "react-i18next"

export default function SkillsPage() {
  const { t } = useTranslation()

  const skillsData = [
    {
      category: t("skills.categories.frontend"),
      icon: Layout,
      color: "text-cyan-500",
      skills: [
        { icon: Code, name: t("skills.items.react.name"), experience: t("skills.items.react.experience") },
        { icon: Code, name: t("skills.items.typescript.name"), experience: t("skills.items.typescript.experience") },
        { icon: Palette, name: t("skills.items.tailwind.name"), experience: t("skills.items.tailwind.experience") },
        { icon: Sparkles, name: t("skills.items.shadcn.name"), experience: t("skills.items.shadcn.experience") },
        { icon: Code, name: t("skills.items.angular.name"), experience: t("skills.items.angular.experience") },
        { icon: Sparkles, name: t("skills.items.framer.name"), experience: t("skills.items.framer.experience") },
      ],
    },
    {
      category: t("skills.categories.design"),
      icon: Figma,
      color: "text-purple-500",
      skills: [
        { icon: Figma, name: t("skills.items.figma.name"), experience: t("skills.items.figma.experience") },
        { icon: Palette, name: t("skills.items.sketch.name"), experience: t("skills.items.sketch.experience") },
        { icon: Sparkles, name: t("skills.items.adobe.name"), experience: t("skills.items.adobe.experience") },
      ],
    },
    {
      category: t("skills.categories.backend"),
      icon: Terminal,
      color: "text-green-500",
      skills: [
        { icon: Terminal, name: t("skills.items.nodejs.name"), experience: t("skills.items.nodejs.experience") },
        { icon: Code, name: t("skills.items.git.name"), experience: t("skills.items.git.experience") },
        { icon: Sparkles, name: t("skills.items.vite.name"), experience: t("skills.items.vite.experience") },
      ],
    },
  ]

  return (
    <>
      <AnimatedBackground />
      <main className="min-h-screen relative">
        <section className="min-h-screen flex items-center px-4 py-20">
          <div className="max-w-7xl mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-12"
            >
              <div className="text-center space-y-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-4"
                >
                  <Code className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-primary">{t("skills.categories.frontend")}</span>
                </motion.div>
                <h1 className="text-4xl sm:text-5xl font-bold text-foreground">{t("skills.title")}</h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t("skills.subtitle")}</p>
              </div>

              <div className="space-y-12">
                {skillsData.map((category, categoryIndex) => {
                  const CategoryIcon = category.icon
                  return (
                    <motion.div
                      key={categoryIndex}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.1 * categoryIndex }}
                      className="space-y-6"
                    >
                      <div className="flex items-center gap-3">
                        <CategoryIcon className={`w-6 h-6 ${category.color}`} />
                        <h2 className="text-2xl font-semibold text-foreground">{category.category}</h2>
                      </div>

                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {category.skills.map((skill, skillIndex) => {
                          const SkillIcon = skill.icon
                          return (
                            <motion.div
                              key={skillIndex}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.4, delay: 0.05 * skillIndex }}
                              whileHover={{ scale: 1.02, y: -4 }}
                            >
                              <Card className="glass-card border-border/50 hover:border-primary/30 transition-all duration-300">
                                <CardContent className="p-6 space-y-4">
                                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 border border-primary/20">
                                    <SkillIcon className="w-6 h-6 text-primary" />
                                  </div>

                                  <div className="space-y-1">
                                    <h3 className="text-lg font-semibold text-foreground">{skill.name}</h3>
                                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                                      <Sparkles className="w-3 h-3 text-accent" />
                                      {skill.experience}
                                    </p>
                                  </div>
                                </CardContent>
                              </Card>
                            </motion.div>
                          )
                        })}
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <PageNavigation />
    </>
  )
}
