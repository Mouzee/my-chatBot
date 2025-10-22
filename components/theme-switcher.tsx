"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const { t } = useTranslation()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="outline" size="icon" className="rounded-full bg-transparent" disabled>
        <Sun className="h-5 w-5" />
      </Button>
    )
  }

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button
        variant="outline"
        size="icon"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="rounded-full border-2 hover:shadow-lg transition-all duration-200"
        aria-label={t("ui.theme.toggle")}
      >
        {theme === "dark" ? <Sun className="h-5 w-5 text-yellow-500" /> : <Moon className="h-5 w-5 text-blue-600" />}
      </Button>
    </motion.div>
  )
}
