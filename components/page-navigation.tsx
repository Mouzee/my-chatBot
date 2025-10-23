"use client"

import { ExpandableTabs } from "@/components/ui/expandable-tabs"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { LanguageSwitcher } from "@/components/language-switcher"
import { User, Briefcase, Code, Mail, Clock } from "lucide-react"
import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"

interface PageNavigationProps {
  className?: string
}

export function PageNavigation({ className = "" }: PageNavigationProps) {
  const { t } = useTranslation()

  const navigationTabs = [
    { title: t("navigation.home"), icon: User, href: "/" },
    { title: t("navigation.about"), icon: User, href: "/about" },
    { type: "separator" as const },
    { title: t("navigation.projects"), icon: Briefcase, href: "/projects" },
    { title: t("navigation.skills"), icon: Code, href: "/skills" },
    { type: "separator" as const },
    { title: t("navigation.contact"), icon: Mail, href: "/contact" },
    { title: t("navigation.experience"), icon: Clock, href: "/experience" },
  ]

  return (
    <>
      {/* Top Right Controls */}
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <ThemeSwitcher />
        <LanguageSwitcher /> 
      </div>

      {/* Bottom Navigation */}
      <motion.footer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className={`fixed bottom-0 left-0 right-0 z-40 w-full border-t border-border/30 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 ${className}`}
      >
        <div className="mx-auto w-full max-w-screen-md px-4 py-4">
          <ExpandableTabs tabs={navigationTabs} activeColor="text-primary" />
        </div>
        
      </motion.footer>
    </>
  )
}
