"use client"

import { AnimatedBackground } from "@/components/animated-background"
import { PageNavigation } from "@/components/page-navigation"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Code, Palette, Layout, Terminal, Figma, Sparkles, CodeXml, LassoSelect, WandSparkles } from "lucide-react"
import { useTranslation } from "react-i18next"

export default function SkillsPage() {
  const { t } = useTranslation()

  // Skills data now pulls all labels and experience via t(), using fallback for missing keys
  const skillsData = [
    {
      category: t("skills.categories.design"),
      icon: Figma,
      color: "text-purple-500",
      description: t("skills.descriptions.design"),
      skills: [
        { icon: Figma, name: t("skills.items.figma.name", "Figma"), experience: t("skills.items.figma.experience", "") },
        { icon: Palette, name: t("skills.items.sketch.name", "Sketch"), experience: t("skills.items.sketch.experience", "") },
        { icon: LassoSelect, name: t("skills.items.adobe.name", "Adobe Creative Suite"), experience: t("skills.items.adobe.experience", "") },
        { icon: LassoSelect, name: t("skills.items.miro.name", "Miro"), experience: t("skills.items.miro.experience", "") },
      ],
    },
    {
      category: t("skills.categories.creative"),
      icon: Sparkles,
      color: "text-amber-500",
      description: t("skills.descriptions.creative"),
      skills: [
        { icon: Sparkles, name: t("skills.items.framer.name", "Framer Motion"), experience: t("skills.items.framer.experience", "") },
        { icon: Sparkles, name: t("skills.items.gsap.name", "GSAP"), experience: t("skills.items.gsap.experience", "") },
      ]
    },
    {
      category: t("skills.categories.frontend"),
      icon: Layout,
      color: "text-cyan-500",
      description: t("skills.descriptions.frontend"),
      skills: [
        { icon: Code, name: t("skills.items.uiux.name", "UI/UX Design"), experience: t("skills.items.uiux.experience", "") },
        { icon: Code, name: t("skills.items.frontend.name", "Frontend Development"), experience: t("skills.items.frontend.experience", "") },
        { icon: Palette, name: t("skills.items.bootstrap.name", "Bootstrap"), experience: t("skills.items.bootstrap.experience", "") },
        { icon: Code, name: t("skills.items.react.name", "React.js"), experience: t("skills.items.react.experience", "") },
        { icon: Code, name: t("skills.items.typescript.name", "TypeScript"), experience: t("skills.items.typescript.experience", "") },
        { icon: Palette, name: t("skills.items.tailwind.name", "Tailwind CSS"), experience: t("skills.items.tailwind.experience", "") },
        { icon: Palette, name: t("skills.items.shadcn.name", "Shadcn UI"), experience: t("skills.items.shadcn.experience", "") },
        { icon: Code, name: t("skills.items.angular.name", "Angular"), experience: t("skills.items.angular.experience", "") },
        { icon: Code, name: t("skills.items.vuejs.name", "Vue.js"), experience: t("skills.items.vuejs.experience", "") },
        { icon: Code, name: t("skills.items.redux.name", "Redux"), experience: t("skills.items.redux.experience", "") },
        { icon: Code, name: t("skills.items.zustand.name", "Zustand"), experience: t("skills.items.zustand.experience", "") },
        { icon: Code, name: t("skills.items.sass.name", "SASS"), experience: t("skills.items.sass.experience", "") },
        { icon: Code, name: t("skills.items.htmlcss.name", "HTML & CSS"), experience: t("skills.items.htmlcss.experience", "") },
        { icon: Sparkles, name: t("skills.items.motion.name", "Framer Motion"), experience: t("skills.items.motion.experience", "") },
        { icon: Sparkles, name: t("skills.items.responsive.name", "Responsive Design"), experience: t("skills.items.responsive.experience", "") },
        { icon: Sparkles, name: t("skills.items.prototyping.name", "Prototyping"), experience: t("skills.items.prototyping.experience", "") },
      ],
    },
    {
      category: t("skills.categories.backend"),
      icon: Terminal,
      color: "text-green-500",
      description: t("skills.descriptions.backend"),
      skills: [
        { icon: Terminal, name: t("skills.items.nodejs.name", "Node.js"), experience: t("skills.items.nodejs.experience", "") },
        { icon: Code, name: t("skills.items.php.name", "PHP"), experience: t("skills.items.php.experience", "") },
        { icon: Code, name: t("skills.items.dotnet.name", ".NET"), experience: t("skills.items.dotnet.experience", "") },
        { icon: Code, name: t("skills.items.restapi.name", "REST API"), experience: t("skills.items.restapi.experience", "") },
        { icon: Code, name: t("skills.items.vite.name", "Vite"), experience: t("skills.items.vite.experience", "") },
        { icon: Code, name: t("skills.items.storybook.name", "Storybook"), experience: t("skills.items.storybook.experience", "") },
        { icon: Code, name: t("skills.items.jest.name", "Jest"), experience: t("skills.items.jest.experience", "") },
      ],
    },
    {
      category: t("skills.categories.ai"),
      icon: WandSparkles,
      color: "text-yellow-500",
      description: t("skills.descriptions.ai"),
      skills: [
        { icon: Sparkles, name: t("skills.items.prompt.name", "Prompt Engineering"), experience: t("skills.items.prompt.experience", "") },
        { icon: WandSparkles, name: t("skills.items.ai.name", "AI Tools (ChatGPT, Midjourney)"), experience: t("skills.items.ai.experience", "") },
        { icon: WandSparkles, name: t("skills.items.v0dev.name", "v0.dev"), experience: t("skills.items.v0dev.experience", "") },
        { icon: Sparkles, name: t("skills.items.cursor.name", "Cursor"), experience: t("skills.items.cursor.experience", "") },
      ]
    },
    {
      category: t("skills.categories.devops"),
      icon: CodeXml,
      color: "text-pink-500",
      description: t("skills.descriptions.devops"),
      skills: [
        { icon: Code, name: t("skills.items.git.name", "Git"), experience: t("skills.items.git.experience", "") },
        { icon: Code, name: t("skills.items.jira.name", "Jira"), experience: t("skills.items.jira.experience", "") },
        { icon: Code, name: t("skills.items.firebase.name", "Firebase"), experience: t("skills.items.firebase.experience", "") },
      ]
    },
    {
      category: t("skills.categories.accessibility"),
      icon: Sparkles,
      color: "text-blue-500",
      description: t("skills.descriptions.accessibility"),
      skills: [
        { icon: Sparkles, name: t("skills.items.accessibility.name", "Accessibility (WCAG)"), experience: t("skills.items.accessibility.experience", "") },
      ],
    },
  ]

  return (
    <>
      <AnimatedBackground />
      <main className="min-h-screen relative">
        <section className="min-h-screen flex items-center px-4 py-20">
          <div className="max-w-5xl mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="text-center space-y-3">
                <h1 className="text-4xl sm:text-5xl font-bold text-foreground">{t("skills.title")}</h1>
                <p className="text-base text-muted-foreground max-w-xl mx-auto">{t("skills.subtitle")}</p>
              </div>
              <div className="space-y-6 sm:space-y-8">
                {skillsData.map((category, categoryIndex) => {
                  const CategoryIcon = category.icon
                  return (
                    <motion.div
                      key={categoryIndex}
                      initial={{ opacity: 0, y: 32, scale: 0.96 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, delay: 0.18 * categoryIndex, type: "spring", stiffness: 100 }}
                      className="sm:flex sm:items-start gap-4"
                    >
                      {/* Card container */}
                      <div className="w-full bg-background/80 border border-border/60 rounded-2xl p-5 shadow-sm mb-2">
                        <div className="flex items-center gap-2 mb-4">
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full shadow-sm" style={{ background: 'rgba(0,0,0,0.06)' }}>
                            <CategoryIcon className={`w-5 h-5 ${category.color} opacity-80`} />
                          </span>
                          <h2 className="text-lg font-medium text-foreground tracking-tight">{category.category}</h2>
                          <span
                            className="grow h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent ml-2"
                            style={{ minWidth: 24 }}
                          />
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">
                          {category.description || ""}
                        </p>
                        {/* Skill item badges */}
                        <div className="flex flex-wrap gap-2">
                          {category.skills.map((skill, skillIndex) => {
                            const SkillIcon = skill.icon

                            let badgeColor = "bg-primary/10 text-primary border border-primary/30";

                            return (
                              <motion.div
                                key={skillIndex}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.32, delay: 0.03 * (skillIndex + 1), type: "spring", stiffness: 90 }}
                              >
                                <span
                                  className={
                                    `inline-flex items-center px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap shadow-sm ` +
                                    badgeColor +
                                    ` hover:shadow-md transition-shadow duration-200`
                                  }
                                >
                                  <SkillIcon className="w-4 h-4 mr-1.5 opacity-80" />
                                  {skill.name}
                                  <span className="ml-2 text-xs font-normal text-muted-foreground">
                                    {skill.experience}
                                  </span>
                                </span>
                              </motion.div>
                            )
                          })}
                        </div>
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
