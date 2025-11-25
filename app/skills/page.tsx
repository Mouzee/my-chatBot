"use client"

import { AnimatedBackground } from "@/components/animated-background"
import { PageNavigation } from "@/components/page-navigation"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Code, Palette, Layout, Terminal, Figma, Sparkles, CodeXml, LassoSelect, WandSparkles, type LucideIcon } from "lucide-react"
import { useTranslation } from "react-i18next"
import { SKILLS, ANIMATION } from "@/lib/constants"

interface Skill {
  icon: LucideIcon
  name: string
  experience: string
}

interface SkillCategory {
  category: string
  icon: LucideIcon
  color: string
  skills: Skill[]
}

/**
 * Calculate expertise percentage based on years of experience
 */
function calculateExpertisePercent(experience: string | number): number {
  const { YEARS_THRESHOLDS, PERCENTAGES } = SKILLS.EXPERTISE
  
  if (typeof experience === "string") {
    const yearsMatch = experience.match(/(\d+)(\+)?/)
    if (yearsMatch) {
      const years = parseInt(yearsMatch[1], 10)
      
      if (years >= YEARS_THRESHOLDS.EXPERT) {
        return PERCENTAGES.EXPERT
      } else if (years >= YEARS_THRESHOLDS.SENIOR) {
        return PERCENTAGES.SENIOR
      } else if (years >= YEARS_THRESHOLDS.INTERMEDIATE) {
        return PERCENTAGES.INTERMEDIATE
      } else if (years >= YEARS_THRESHOLDS.JUNIOR) {
        return PERCENTAGES.JUNIOR
      } else if (years >= YEARS_THRESHOLDS.BEGINNER) {
        return PERCENTAGES.BEGINNER
      } else if (years >= YEARS_THRESHOLDS.NOVICE) {
        return PERCENTAGES.NOVICE
      }
    }
  }
  
  return PERCENTAGES.DEFAULT
}

/**
 * Skills page displaying categorized skills with experience levels
 * Shows frontend, design, backend, and AI skills with progress indicators
 */
export default function SkillsPage() {
  const { t } = useTranslation()

  const skillsData: SkillCategory[] = [
    {
      category: t("skills.categories.frontend"),
      icon: Layout,
      color: "text-cyan-500",
      skills: [
        { icon: Code, name: t("skills.items.react.name"), experience: t("skills.items.react.experience") },
        { icon: Code, name: t("skills.items.typescript.name"), experience: t("skills.items.typescript.experience") },
        { icon: Palette, name: t("skills.items.tailwind.name"), experience: t("skills.items.tailwind.experience") },
        { icon: Palette, name: t("skills.items.shadcn.name"), experience: t("skills.items.shadcn.experience") },
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
        { icon: LassoSelect, name: t("skills.items.adobe.name"), experience: t("skills.items.adobe.experience") },
      ],
    },
    {
      category: t("skills.categories.backend"),
      icon: Terminal,
      color: "text-green-500",
      skills: [
        { icon: Terminal, name: t("skills.items.nodejs.name"), experience: t("skills.items.nodejs.experience") },
        { icon: Code, name: t("skills.items.git.name"), experience: t("skills.items.git.experience") },
        { icon: CodeXml, name: t("skills.items.php.name"), experience: t("skills.items.php.experience") },
        { icon: Code, name: t("skills.items.dotnet.name"), experience: t("skills.items.dotnet.experience") },
      ],
    },
    {
      category: t("skills.categories.ai"),
      icon: Sparkles,
      color: "text-amber-500",
      skills: [
        { icon: Sparkles, name: t("skills.items.prompt.name"), experience: t("skills.items.prompt.experience") },
        { icon: WandSparkles, name: t("skills.items.v0dev.name"), experience: t("skills.items.v0dev.experience") },
        { icon: Sparkles, name: t("skills.items.cursor.name"), experience: t("skills.items.cursor.experience") },
      ]
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
              transition={{ duration: ANIMATION.DURATION.NORMAL }}
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
                      transition={{ duration: ANIMATION.DURATION.NORMAL, delay: ANIMATION.DELAY.SHORT * categoryIndex }}
                      className="space-y-6"
                    >
                      <div className="flex items-center gap-3">
                        <CategoryIcon className={`w-6 h-6 ${category.color}`} aria-hidden="true" />
                        <h2 className="text-2xl font-semibold text-foreground">{category.category}</h2>
                      </div>

                      <div className="grid sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {category.skills.map((skill, skillIndex) => {
                          const SkillIcon = skill.icon

                          // Calculate expertise percentage based on years of experience
                          const expertisePercent = calculateExpertisePercent(skill.experience)

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
                                    <SkillIcon className="w-6 h-6 text-primary" aria-hidden="true" />
                                  </div>

                                  <div className="space-y-1">
                                    <h3 className="text-lg font-semibold text-foreground">{skill.name}</h3>
                                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                                      <Sparkles className="w-3 h-3 text-accent" aria-hidden="true" />
                                      {skill.experience}
                                    </p>
                                    {/* Expertise progress bar */}
                                    <div className="mt-2">
                                      <div 
                                        className="w-full bg-accent/20 rounded-full h-2 relative overflow-hidden"
                                        role="progressbar"
                                        aria-valuenow={expertisePercent}
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                        aria-label={`${skill.name} expertise: ${expertisePercent}%`}
                                      >
                                        <div
                                          className="bg-primary transition-all duration-500 h-2 rounded-full"
                                          style={{ width: `${expertisePercent}%` }}
                                        />
                                      </div>
                                      <div className="text-xs text-right mt-1 text-muted-foreground">
                                        {expertisePercent}%
                                      </div>
                                    </div>
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
