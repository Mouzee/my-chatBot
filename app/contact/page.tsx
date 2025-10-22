"use client"

import { AnimatedBackground } from "@/components/animated-background"
import { PageNavigation } from "@/components/page-navigation"
import { motion } from "framer-motion"
import { Mail, Send, MapPin, Phone } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function ContactPage() {
  const { t } = useTranslation()

  return (
    <>
      <AnimatedBackground />
      <main className="min-h-screen relative">
        <section className="min-h-screen flex items-center px-4 py-20">
          <div className="max-w-4xl mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="text-center space-y-4">
                <h1 className="text-4xl sm:text-5xl font-bold text-foreground">{t("pages.contact.title")}</h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t("pages.contact.subtitle")}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mt-12">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="space-y-6"
                >
                  <div className="glass-card p-6 space-y-4">
                    <h3 className="text-xl font-semibold">{t("pages.contact.info.title")}</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <Mail className="w-5 h-5 text-primary" />
                        <span>{t("pages.contact.info.email")}</span>
                      </div>
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <Phone className="w-5 h-5 text-primary" />
                        <span>{t("pages.contact.info.phone")}</span>
                      </div>
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <MapPin className="w-5 h-5 text-primary" />
                        <span>{t("pages.contact.info.location")}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="glass-card p-6"
                >
                  <form className="space-y-4">
                    <div>
                      <Input placeholder={t("pages.contact.form.name")} className="bg-background/50" />
                    </div>
                    <div>
                      <Input type="email" placeholder={t("pages.contact.form.email")} className="bg-background/50" />
                    </div>
                    <div>
                      <Textarea placeholder={t("pages.contact.form.message")} rows={5} className="bg-background/50" />
                    </div>
                    <Button className="w-full">
                      <Send className="w-4 h-4 mr-2" />
                      {t("pages.contact.form.send")}
                    </Button>
                  </form>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <PageNavigation />
    </>
  )
}
