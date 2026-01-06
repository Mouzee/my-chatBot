"use client"

import { useI18n } from "@/lib/i18n-utils"
import { changeLanguage, getSupportedLanguages } from "@/lib/i18n"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Globe, ArrowRight } from "lucide-react"

export function I18nExampleComponent() {
  const { t, currentLanguage, isRTL } = useI18n()
  const supportedLanguages = getSupportedLanguages()

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5" />
          {t("ui.language.change")}
        </CardTitle>
        <CardDescription>
          {t("hero.description")}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Language Info */}
        <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
          <div>
            <p className="font-medium">{t("navigation.home")}</p>
            <p className="text-sm text-muted-foreground">
              Current: {currentLanguage.toUpperCase()} • Direction: {isRTL ? "RTL" : "LTR"}
            </p>
          </div>
          <Badge variant={isRTL ? "destructive" : "default"}>
            {isRTL ? "RTL" : "LTR"}
          </Badge>
        </div>

        {/* Language Switcher */}
        <div className="space-y-2">
          <h4 className="font-medium">Available Languages:</h4>
          <div className="flex gap-2">
            {supportedLanguages.map((lang) => (
              <Button
                key={lang}
                variant={currentLanguage === lang ? "default" : "outline"}
                size="sm"
                onClick={() => changeLanguage(lang)}
                className="flex items-center gap-2"
              >
                {lang.toUpperCase()}
                {currentLanguage === lang && <ArrowRight className="h-3 w-3" />}
              </Button>
            ))}
          </div>
        </div>

        {/* Translation Examples */}
        <div className="space-y-2">
          <h4 className="font-medium">Translation Examples:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <div className="p-2 bg-muted rounded">
              <strong>Hero Title:</strong> {t("hero.title")}
            </div>
            <div className="p-2 bg-muted rounded">
              <strong>Navigation:</strong> {t("navigation.about")}
            </div>
            <div className="p-2 bg-muted rounded">
              <strong>Skills:</strong> {t("skills.title")}
            </div>
            <div className="p-2 bg-muted rounded">
              <strong>Contact:</strong> {t("pages.contact.title")}
            </div>
          </div>
        </div>

        {/* FAQ Example */}
        <div className="space-y-2">
          <h4 className="font-medium">FAQ Example:</h4>
          <div className="p-3 bg-muted rounded-lg">
            <p className="font-medium">{t("faq.recruiter.0.question")}</p>
            <p className="text-sm text-muted-foreground mt-1">
              {t("faq.recruiter.0.answer")}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
