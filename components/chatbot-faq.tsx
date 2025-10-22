"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChatMessage } from "@/components/chat-message"
import { ArrowRight, RotateCcw, Sparkles, HelpCircle, CheckCircle2, ExternalLink } from "lucide-react"
import { useTranslation } from "react-i18next"

type Stage = "name" | "category" | "question-select" | "answer" | "complete"
type CategoryType = "recruiter" | "client" | "collaborator"

interface Message {
  id: string
  content: string
  type: "bot" | "user"
}

export function ChatbotFAQ() {
  const { t } = useTranslation()
  const [stage, setStage] = useState<Stage>("name")
  const [userName, setUserName] = useState("")
  const [nameInput, setNameInput] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(null)
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<string>>(new Set())
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: t("welcome.greeting"),
      type: "bot",
    },
  ])
  const [nameError, setNameError] = useState("")

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const addMessage = (content: string, type: "bot" | "user") => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      type,
    }
    setMessages((prev) => [...prev, newMessage])
  }

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (nameInput.trim().length < 2) {
      setNameError(t("welcome.nameError"))
      return
    }

    setNameError("")
    setUserName(nameInput.trim())
    addMessage(nameInput.trim(), "user")

    setTimeout(() => {
      addMessage(t("welcome.niceMeet", { name: nameInput.trim() }), "bot")
      setStage("category")
    }, 800)
  }

  const handleCategorySelect = (category: CategoryType) => {
    setSelectedCategory(category)
    addMessage(t(`categories.${category}`), "user")

    setTimeout(() => {
      addMessage(t("categories.selectPrompt"), "bot")
      setStage("question-select")
    }, 800)
  }

  const handleQuestionSelect = (faqId: string) => {
    if (!selectedCategory) return

    const faqList = t(`faq.${selectedCategory}`, { returnObjects: true }) as Array<{
      id: string
      question: string
      answer: string
    }>
    const selectedFAQ = faqList.find((faq) => faq.id === faqId)
    if (!selectedFAQ) return

    addMessage(selectedFAQ.question, "user")
    setStage("answer")

    setTimeout(() => {
      addMessage(selectedFAQ.answer, "bot")

      setAnsweredQuestions((prev) => new Set([...prev, faqId]))

      const allAnswered = answeredQuestions.size + 1 >= faqList.length

      setTimeout(() => {
        if (allAnswered) {
          addMessage(t("actions.allExplored"), "bot")
          setStage("complete")
        } else {
          addMessage(t("actions.anotherQuestion"), "bot")
          setStage("question-select")
        }
      }, 1000)
    }, 1200)
  }

  const handleRestart = () => {
    setStage("name")
    setUserName("")
    setNameInput("")
    setSelectedCategory(null)
    setAnsweredQuestions(new Set())
    setMessages([
      {
        id: Date.now().toString(),
        content: t("welcome.greeting"),
        type: "bot",
      },
    ])
  }

  const getAvailableQuestions = () => {
    if (!selectedCategory) return []
    const faqList = t(`faq.${selectedCategory}`, { returnObjects: true }) as Array<{
      id: string
      question: string
      answer: string
    }>
    return faqList.filter((faq) => !answeredQuestions.has(faq.id))
  }

  const totalQuestions = selectedCategory
    ? (
        t(`faq.${selectedCategory}`, { returnObjects: true }) as Array<{
          id: string
          question: string
          answer: string
        }>
      ).length
    : 0
  const answeredCount = answeredQuestions.size

  return (
    <Card className="flex w-full max-w-2xl flex-col overflow-hidden backdrop-blur-xl bg-surface/70 border-2 border-border/60 shadow-xl transition-all duration-300 hover:shadow-2xl hover:border-primary/30 leading-4 h-[800px]">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-b border-border/50 backdrop-blur-md bg-card/80 px-6 py-2"
      >
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 ring-2 ring-primary/20"
          >
            <Sparkles className="h-5 w-5 text-primary" />
          </motion.div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">{t("header.title")}</h2>
            <p className="text-xs text-muted-foreground">{t("header.subtitle")}</p>
          </div>
        </div>
      </motion.div>

      <ScrollArea className="flex-1 backdrop-blur-sm bg-background/30">
        <div ref={chatContainerRef} className="space-y-4 px-6 py-2" role="log" aria-label="Chat messages">
          <AnimatePresence mode="popLayout">
            {messages.map((message) => (
              <ChatMessage key={message.id} content={message.content} type={message.type} />
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-t border-border/50 backdrop-blur-md bg-card/80 px-6 py-4"
      >
        <AnimatePresence mode="wait">
          {stage === "name" && (
            <motion.form
              key="name-form"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleNameSubmit}
              className="space-y-2"
            >
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder={t("welcome.namePrompt")}
                  value={nameInput}
                  onChange={(e) => {
                    setNameInput(e.target.value)
                    setNameError("")
                  }}
                  className="flex-1 rounded-full border-border/50 bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                  aria-label={t("ui.chat.yourName")}
                  aria-invalid={!!nameError}
                  aria-describedby={nameError ? "name-error" : undefined}
                />
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    type="submit"
                    size="icon"
                    className="rounded-full shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200"
                    aria-label={t("actions.submit")}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </motion.div>
              </div>
              <AnimatePresence>
                {nameError && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    id="name-error"
                    className="text-sm text-destructive flex items-center gap-1"
                    role="alert"
                  >
                    <span className="h-1 w-1 rounded-full bg-destructive" />
                    {nameError}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.form>
          )}

          {stage === "category" && (
            <motion.div
              key="category-selection"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-2"
            >
              <div className="grid gap-2 sm:grid-cols-3">
                {(["recruiter", "client", "collaborator"] as const).map((category, index) => (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      onClick={() => handleCategorySelect(category)}
                      variant="outline"
                      className="h-auto w-full rounded-full py-4 bg-primary/5 border-2 border-primary/20 text-foreground hover:bg-primary/10 hover:border-primary/40 hover:text-primary hover:shadow-lg hover:shadow-primary/10 active:scale-95 transition-all duration-200 font-medium"
                    >
                      {t(`categories.${category}`)}
                    </Button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {stage === "question-select" && (
            <motion.div
              key="question-selection"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-2"
            >
              <div className="grid gap-2 sm:grid-cols-2">
                {getAvailableQuestions()
                  .slice(0, 4)
                  .map((faq, index) => (
                    <motion.div
                      key={faq.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.08 }}
                      whileHover={{ scale: 1.03, y: -4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        onClick={() => handleQuestionSelect(faq.id)}
                        variant="outline"
                        className="h-auto w-full rounded-full py-3 px-4 text-left bg-secondary/5 border-2 border-secondary/20 text-foreground hover:bg-secondary/10 hover:border-secondary/40 hover:text-secondary hover:shadow-lg hover:shadow-secondary/10 active:scale-95 transition-all duration-200 flex items-start gap-2 group whitespace-normal"
                      >
                        <HelpCircle className="h-4 w-4 mt-0.5 flex-shrink-0 text-secondary/70 group-hover:text-secondary transition-colors" />
                        <span className="text-sm leading-relaxed text-balance break-words flex-1">{faq.question}</span>
                      </Button>
                    </motion.div>
                  ))}
              </div>
              {answeredCount > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ delay: 0.3 }}
                  className="pt-2"
                >
                  <Button
                    onClick={() => {
                      addMessage(t("actions.doneMessage"), "user")
                      setTimeout(() => {
                        addMessage(t("actions.thanksMessage"), "bot")
                        setStage("complete")
                      }, 800)
                    }}
                    variant="outline"
                    size="sm"
                    className="w-full rounded-full bg-muted/20 border-2 border-muted-foreground/10 text-muted-foreground hover:bg-muted/40 hover:border-muted-foreground/20 hover:text-foreground hover:shadow-md active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    {t("actions.done")}
                  </Button>
                </motion.div>
              )}
            </motion.div>
          )}

          {stage === "complete" && (
            <motion.div
              key="complete-actions"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="space-y-2"
            >
              {selectedCategory && (
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    onClick={() => console.log(`[v0] CTA clicked: ${t(`cta.${selectedCategory}`)}`)}
                    className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl hover:shadow-primary/20 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
                    size="lg"
                  >
                    <ExternalLink className="h-4 w-4" />
                    {t(`cta.${selectedCategory}`)}
                  </Button>
                </motion.div>
              )}
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  onClick={handleRestart}
                  variant="outline"
                  className="w-full rounded-full border-2 text-foreground hover:bg-muted/40 shadow-md hover:shadow-lg active:scale-95 transition-all duration-200 bg-transparent"
                  size="lg"
                >
                  <motion.div
                    animate={{ rotate: [0, -360] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  >
                    <RotateCcw className="mr-2 h-4 w-4" />
                  </motion.div>
                  {t("actions.restart")}
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {(stage === "question-select" || stage === "answer" || stage === "complete") && selectedCategory && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-2 pt-2 border-t border-border/30 space-y-1"
          >
            <p className="text-xs text-muted-foreground text-center font-medium">
              {t("progress.explored", { count: answeredCount, total: totalQuestions })} •{" "}
              {t(`categories.${selectedCategory}`)}
            </p>
            <div className="h-2 w-full overflow-hidden rounded-full bg-secondary/10 ring-1 ring-secondary/20">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="h-full bg-primary rounded-full shadow-sm"
              />
            </div>
          </motion.div>
        )}
      </motion.div>
    </Card>
  )
}
