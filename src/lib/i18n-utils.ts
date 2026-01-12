import { useTranslations, useLocale } from "next-intl"

export type SupportedLanguage = "en" | "ar"

// Custom hook for better TypeScript support
export const useI18n = () => {
  const t = useTranslations()
  const locale = useLocale()

  return {
    t,
    currentLanguage: locale as SupportedLanguage,
    isRTL: locale === "ar",
  }
}

// Server-side translation helper
export const getServerTranslation = async (locale: SupportedLanguage) => {
  return {
    locale,
    isRTL: locale === "ar",
  }
}

// Translation key validation helper
export const validateTranslationKey = (key: string, translations: Record<string, unknown>): boolean => {
  const keys = key.split(".")
  let current: unknown = translations

  for (const k of keys) {
    if (current && typeof current === "object" && k in (current as Record<string, unknown>)) {
      current = (current as Record<string, unknown>)[k]
    } else {
      return false
    }
  }

  return true
}
