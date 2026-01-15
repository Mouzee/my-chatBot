"use client"

import { AnimatedBackground } from "@/components/ui/animated-background"
import { PageNavigation } from "@/components/layout/page-navigation"
import { ExpandableTabs } from "@/components/ui/expandable-tabs"
import { motion } from "framer-motion"
import { User, Briefcase, Code, Mail, BookOpen, Calendar, Clock } from "lucide-react"
import { useI18n } from "@/lib/i18n-utils"

export default function BlogPage() {
  const { t } = useI18n()

  const navigationTabs = [
    { title: t("navigation.home"), icon: User, href: "/" },
    { title: t("navigation.about"), icon: User, href: "/about" },
    { type: "separator" as const },
    { title: t("navigation.projects"), icon: Briefcase, href: "/projects" },
    { title: t("navigation.skills"), icon: Code, href: "/skills" },
    { type: "separator" as const },
    { title: t("navigation.contact"), icon: Mail, href: "/contact" },
    { title: t("navigation.blog"), icon: BookOpen, href: "/blog" },
  ]

  const blogsRaw = t.raw("pages.blog.items")
  const blogsArray = Array.isArray(blogsRaw) ? blogsRaw : []

  const blogPosts = blogsArray.map((item: any, i: number) => ({
    title: t(`pages.blog.items.${i}.title`),
    excerpt: t(`pages.blog.items.${i}.excerpt`),
    date: t(`pages.blog.items.${i}.date`),
    readTime: t("pages.blog.readTime", { minutes: item.readTime }),
  }))

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
                <h1 className="text-4xl sm:text-5xl font-bold text-foreground">{t("pages.blog.title")}</h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t("pages.blog.subtitle")}</p>
              </div>

              <div className="space-y-6 mt-12">
                {blogPosts.map((post, index) => (
                  <motion.article
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                    className="glass-card p-6 space-y-3 hover:shadow-xl transition-shadow cursor-pointer"
                  >
                    <h2 className="text-2xl font-semibold text-foreground">{post.title}</h2>
                    <p className="text-muted-foreground">{post.excerpt}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>

              <motion.footer
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-12 pt-6 border-t border-border/30"
              >
                <ExpandableTabs tabs={navigationTabs} activeColor="text-primary" />
              </motion.footer>
            </motion.div>
          </div>
        </section>
      </main>
      <PageNavigation />
    </>
  )
}
