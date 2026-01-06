"use client"

import { Languages } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { changeLanguage, type SupportedLanguage } from "@/lib/i18n"
import { useI18n } from "@/lib/i18n-utils"

export function LanguageSwitcher() {
  const { t, currentLanguage } = useI18n()

  const handleLanguageChange = (lng: SupportedLanguage) => {
    changeLanguage(lng)
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
        <DropdownMenuItem onClick={() => handleLanguageChange("en")} className={currentLanguage === "en" ? "bg-accent" : ""}>
          {t("ui.language.english")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleLanguageChange("ar")} className={currentLanguage === "ar" ? "bg-accent" : ""}>
          {t("ui.language.arabic")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
