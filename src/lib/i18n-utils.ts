import { useTranslation } from "react-i18next"
import type { SupportedLanguage } from "./i18n"

// Custom hook for better TypeScript support
export const useI18n = () => {
  const { t, i18n } = useTranslation()

  return {
    t,
    i18n,
    currentLanguage: i18n.language as SupportedLanguage,
    isRTL: i18n.language === "ar",
  }
}

// Server-side translation helper (for future use with Next.js App Router)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getServerTranslation = async (_locale: SupportedLanguage, _namespace = "translation") => {
  // This would be used with Next.js App Router i18n in the future
  // For now, we'll use client-side only
  return null
}

// Translation key validation helper
export const validateTranslationKey = (key: string, translations: Record<string, unknown>): boolean => {
  const keys = key.split(".")
  let current: any = translations

  for (const k of keys) {
    if (current && typeof current === "object" && k in current) {
      current = current[k]
    } else {
      return false
    }
  }

  return true
}
