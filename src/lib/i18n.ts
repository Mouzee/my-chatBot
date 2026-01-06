import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"

// Import translation files
import enTranslations from "../../public/locales/en.json"
import arTranslations from "../../public/locales/ar.json"

// Configuration
const i18nConfig = {
  resources: {
    en: {
      translation: enTranslations,
    },
    ar: {
      translation: arTranslations,
    },
  },
  fallbackLng: "en",
  debug: process.env.NODE_ENV === "development",
  interpolation: {
    escapeValue: false, // React already escapes values
  },
  detection: {
    order: ["localStorage", "navigator", "htmlTag"],
    caches: ["localStorage"],
    lookupLocalStorage: "i18nextLng",
  },
  react: {
    useSuspense: false, // Disable suspense for better compatibility
  },
}

// Initialize i18n
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init(i18nConfig)

// Export types for better TypeScript support
export type SupportedLanguage = "en" | "ar"
export type TranslationKey = keyof typeof enTranslations

// Helper functions
export const getSupportedLanguages = (): SupportedLanguage[] => ["en", "ar"]

export const isSupportedLanguage = (lang: string): lang is SupportedLanguage => {
  return ["en", "ar"].includes(lang)
}

export const getLanguageDirection = (lang: SupportedLanguage): "ltr" | "rtl" => {
  return lang === "ar" ? "rtl" : "ltr"
}

export const changeLanguage = (lang: SupportedLanguage) => {
  i18n.changeLanguage(lang)
  // Update document attributes
  document.documentElement.dir = getLanguageDirection(lang)
  document.documentElement.lang = lang
}

export default i18n