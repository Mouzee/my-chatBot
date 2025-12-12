"use client"

import { ExpandableTabs } from "@/components/ui/expandable-tabs"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { LanguageSwitcher } from "@/components/language-switcher"
import { motion } from "framer-motion"
import { User, Briefcase, Code, Mail, Clock, Home } from "lucide-react"
import { useTranslation } from "react-i18next"

interface PageNavigationProps {
  className?: string
}

export function PageNavigation({ className = "" }: PageNavigationProps) {
  const { t } = useTranslation()

  // ✅ Using original translation keys (navigation.*)
  const navigationTabs = [
    { title: t("navigation.home"), icon: Home, href: "/" },
    { title: t("navigation.about"), icon: User, href: "/about" },
    { type: "separator" as const },
    { title: t("navigation.projects"), icon: Briefcase, href: "/projects" },
    { title: t("navigation.skills"), icon: Code, href: "/skills" },
    { type: "separator" as const },
    { title: t("navigation.experience"), icon: Clock, href: "/experience" },
    { title: t("navigation.contact"), icon: Mail, href: "/contact" },
  ]

  return (
    <>
      {/* 🌙 Top Right Controls (Theme + Language Switchers) */}
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <ThemeSwitcher />
        <LanguageSwitcher />
      </div>

      {/* 🚀 Floating Bottom Navigation (Modern, Centered, Animated) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-50 ${className}`}
      >
        <ExpandableTabs
          tabs={navigationTabs}
          activeColor="text-primary"
          className="glass-surface shadow-2xl border border-border/30 bg-background/80 backdrop-blur-md supports-backdrop-filter:bg-background/60"
        />
      </motion.div>
    </>
  )
}
