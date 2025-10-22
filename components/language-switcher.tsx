"use client"

import { Languages } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation()

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
    // Update document direction for RTL support
    document.documentElement.dir = lng === "ar" ? "rtl" : "ltr"
    document.documentElement.lang = lng
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full border-2 hover:shadow-lg transition-all duration-200 bg-transparent"
            aria-label={t("ui.language.change")}
          >
            <Languages className="h-5 w-5" />
          </Button>
        </motion.div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[120px]">
        <DropdownMenuItem onClick={() => changeLanguage("en")} className={i18n.language === "en" ? "bg-accent" : ""}>
          {t("ui.language.english")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage("ar")} className={i18n.language === "ar" ? "bg-accent" : ""}>
          {t("ui.language.arabic")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
