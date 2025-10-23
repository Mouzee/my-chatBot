"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { Mail, Send, MapPin, Phone, Download } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useToast } from "@/components/ui/use-toast"
import { AnimatedBackground } from "@/components/animated-background"
import { PageNavigation } from "@/components/page-navigation"

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
})

export default function ContactPage() {
  const { t } = useTranslation()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      toast({
        title: t("pages.contact.form.success_title") || "Message sent!",
        description: t("pages.contact.form.success_desc") || "Thank you for your message.",
      })
      form.reset()
    } catch (error) {
      toast({
        title: t("pages.contact.form.error_title") || "Error",
        description:
          t("pages.contact.form.error_desc") || "There was a problem sending your message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <AnimatedBackground />
      <main className="relative min-h-screen">
        <section className="flex items-center px-4 py-20 min-h-screen">
          <div className="max-w-5xl mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-12"
            >
              {/* Header Section */}
              <div className="text-center space-y-4">
                <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
                  {t("pages.contact.title")}
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  {t("pages.contact.subtitle")}
                </p>

                {/* Download CV Button */}
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="pt-4">
                  <Button
                    variant="outline"
                    className="gap-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all"
                    onClick={() => {
                      const link = document.createElement("a")
                      link.href = "/files/Shafeek_Ali_CV.pdf" // ✅ Replace with your CV path
                      link.download = "Shafeek_Ali_CV.pdf"
                      link.click()
                    }}
                  >
                    <Download className="w-4 h-4" />
                    {t("pages.contact.download_cv") || "Download CV"}
                  </Button>
                </motion.div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mt-8">
                {/* Left - Contact Info */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="glass-card p-6 space-y-6"
                >
                  <h3 className="text-xl font-semibold">{t("pages.contact.info.title")}</h3>
                  <div className="space-y-4 text-muted-foreground">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-primary" />
                      <span>{t("pages.contact.info.email")}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-primary" />
                      <span>{t("pages.contact.info.phone")}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-primary" />
                      <span>{t("pages.contact.info.location")}</span>
                    </div>
                  </div>
                </motion.div>

                {/* Right - Contact Form */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="glass-card p-6"
                >
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t("pages.contact.form.name")}</FormLabel>
                              <FormControl>
                                <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                                  <Input placeholder={t("pages.contact.form.name")} {...field} />
                                </motion.div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t("pages.contact.form.email")}</FormLabel>
                              <FormControl>
                                <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                                  <Input type="email" placeholder={t("pages.contact.form.email")} {...field} />
                                </motion.div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t("pages.contact.form.subject")}</FormLabel>
                            <FormControl>
                              <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                                <Input placeholder={t("pages.contact.form.subject")} {...field} />
                              </motion.div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t("pages.contact.form.message")}</FormLabel>
                            <FormControl>
                              <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                                <Textarea rows={5} placeholder={t("pages.contact.form.message")} {...field} />
                              </motion.div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                        <Button type="submit" disabled={isSubmitting} className="w-full gap-2">
                          {isSubmitting ? (
                            <>
                              <svg
                                className="animate-spin -ml-1 mr-2 h-4 w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                              </svg>
                              {t("pages.contact.form.sending") || "Sending..."}
                            </>
                          ) : (
                            <>
                              <Send className="w-4 h-4" />
                              {t("pages.contact.form.send")}
                            </>
                          )}
                        </Button>
                      </motion.div>
                    </form>
                  </Form>
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
