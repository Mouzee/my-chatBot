"use client"

import { Languages } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useRouter, usePathname } from "@/i18n/routing"
import { useI18n, type SupportedLanguage } from "@/lib/i18n-utils"

export function LanguageSwitcher() {
  const { t, currentLanguage } = useI18n()
  const router = useRouter()
  const pathname = usePathname()

  const handleLanguageChange = (lng: string) => {
    router.replace(pathname, { locale: lng as SupportedLanguage })
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
      <DropdownMenuContent align="end" className="min-w-[120px] space-y-1">
        <DropdownMenuItem onClick={() => handleLanguageChange("en")} className={currentLanguage === "en" ? "bg-accent text-white" : ""}>
          {t("ui.language.english")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleLanguageChange("ar")} className={currentLanguage === "ar" ? "bg-accent text-white" : ""}>
          {t("ui.language.arabic")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
