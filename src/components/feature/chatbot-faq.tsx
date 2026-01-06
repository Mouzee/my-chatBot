"use client"

import type React from "react"
import { useState, useRef, useEffect, useMemo, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { ChatMessage } from "@/components/feature/chat-message"
import { ArrowRight, RotateCcw, Sparkles, HelpCircle, CheckCircle2, ExternalLink } from "lucide-react"
import { useTranslation } from "react-i18next"
import { CHATBOT_FAQ, ANIMATION } from "@/lib/constants"
import type { ChatStage, ChatCategoryType, ChatMessage as Message, FAQItem } from "@/types"



/**
 * Interactive FAQ chatbot component
 * Guides users through name entry, category selection, and FAQ exploration
 */
export function ChatbotFAQ() {
  const { t } = useTranslation()
  const [stage, setStage] = useState<ChatStage>(CHATBOT_FAQ.STAGES.NAME)
  const [nameInput, setNameInput] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<ChatCategoryType | null>(null)
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

    if (nameInput.trim().length < CHATBOT_FAQ.MIN_NAME_LENGTH) {
      setNameError(t("welcome.nameError"))
      return
    }

    setNameError("")
    const trimmedName = nameInput.trim()
    addMessage(trimmedName, "user")

    setTimeout(() => {
      addMessage(t("welcome.niceMeet", { name: trimmedName }), "bot")
      setStage(CHATBOT_FAQ.STAGES.CATEGORY)
    }, CHATBOT_FAQ.DELAYS.MESSAGE_RESPONSE)
  }

  const handleCategorySelect = (category: ChatCategoryType) => {
    setSelectedCategory(category)
    addMessage(t(`chatCategories.${category}`), "user")

    setTimeout(() => {
      addMessage(t("chatCategories.selectPrompt"), "bot")
      setStage("question-select")
    }, 800)
  }

  const handleQuestionSelect = (faqId: string) => {
    if (!selectedCategory) return

    const faqList = getFAQList(selectedCategory)
    const selectedFAQ = faqList.find((faq) => faq.id === faqId)
    if (!selectedFAQ) return

    addMessage(selectedFAQ.question, "user")
    setStage(CHATBOT_FAQ.STAGES.ANSWER)

    setTimeout(() => {
      addMessage(selectedFAQ.answer, "bot")
      setAnsweredQuestions((prev) => new Set([...prev, faqId]))

      const allAnswered = answeredQuestions.size + 1 >= faqList.length

      setTimeout(() => {
        if (allAnswered) {
          addMessage(t("actions.allExplored"), "bot")
          setStage(CHATBOT_FAQ.STAGES.COMPLETE)
        } else {
          addMessage(t("actions.anotherQuestion"), "bot")
          setStage(CHATBOT_FAQ.STAGES.QUESTION_SELECT)
        }
      }, CHATBOT_FAQ.DELAYS.COMPLETE_CHECK)
    }, CHATBOT_FAQ.DELAYS.ANSWER_DISPLAY)
  }

  const handleRestart = () => {
    setStage(CHATBOT_FAQ.STAGES.NAME)
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

  const getFAQList = useCallback((category: ChatCategoryType): FAQItem[] => {
    return (t(`faq.${category}`, { returnObjects: true }) as FAQItem[]) || []
  }, [t])

  const availableQuestions = useMemo(() => {
    if (!selectedCategory) return []
    const faqList = getFAQList(selectedCategory)
    return faqList.filter((faq) => !answeredQuestions.has(faq.id))
  }, [selectedCategory, answeredQuestions, getFAQList])

  const totalQuestions = useMemo(() => {
    if (!selectedCategory) return 0
    return getFAQList(selectedCategory).length
  }, [selectedCategory, getFAQList])

  const answeredCount = answeredQuestions.size

  return (
    <Card className="flex w-full gap-0 max-w-2xl flex-col overflow-hidden glass-card py-0 border-glass-border shadow-2xl transition-all duration-300 hover:shadow-primary/10 hover:border-glass-highlight leading-4 h-[70vh] max-h-[600px] min-h-[400px]">

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-10 border-b border-glass-border glass-surface bg-glass-bg/50 px-6 py-2"
      >
        <div className="flex items-center gap-3 py-1">
          <div className="flex items-center gap-4">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 ring-1 ring-primary/50 shadow-[0_0_15px_rgba(124,124,255,0.3)]"
            >
              <Sparkles className="h-5 w-5 text-primary" />
            </motion.div>
            <div>
              <h2 className="text-lg font-semibold text-foreground tracking-tight">{t("header.title")}</h2>
              <p className="text-xs text-muted-foreground">{t("header.subtitle")}</p>
            </div>
          </div>
          <div className="flex items-center justify-end">
            {(stage === CHATBOT_FAQ.STAGES.QUESTION_SELECT ||
              stage === CHATBOT_FAQ.STAGES.ANSWER ||
              stage === CHATBOT_FAQ.STAGES.COMPLETE) && selectedCategory && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-2 pt-2 border-t border-glass-border space-y-1"
                >
                  <p className="text-xs text-muted-foreground text-center font-medium">
                    {t("progress.explored", { count: answeredCount, total: totalQuestions })} •{" "}
                    {t(`chatCategories.${selectedCategory}`)}
                  </p>
                </motion.div>
              )}
          </div>
        </div>
      </motion.div>

      {/* --- CHAT AREA --- */}
      <ScrollArea
        className="flex-1 min-h-0 max-h-[calc(100vh-200px)] bg-transparent chat-faq-scrollarea"
        style={{ minHeight: 0 }}
      >
        <div
          className="space-y-4 px-6 py-2"
          style={{ minHeight: 0 }}
          role="log"
          aria-label="Chat messages"
        >
          <AnimatePresence mode="popLayout">
            {messages.map((message) => (
              <ChatMessage key={message.id} content={message.content} type={message.type} />
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>
        <ScrollBar orientation="vertical" />
      </ScrollArea>

      {/* --- CARD FOOTER (NO overflow/scrollbar visible; improved code) --- */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-t border-glass-border glass-surface bg-glass-bg/30 px-4 py-4 backdrop-blur-md"
        style={{ minHeight: 0, maxHeight: 230, overflow: "unset" }}
      >
        <AnimatePresence mode="wait">
          {/* Name entry */}
          {stage === CHATBOT_FAQ.STAGES.NAME && (
            <motion.form
              key="name-form"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: ANIMATION.DURATION.FAST }}
              onSubmit={handleNameSubmit}
              className="space-y-2"
            >
              <div className="flex gap-2 ">
                <Input
                  type="text"
                  placeholder={t("welcome.namePrompt")}
                  value={nameInput}
                  onChange={(e) => {
                    setNameInput(e.target.value)
                    setNameError("")
                  }}
                  className="flex-1"
                  aria-label={t("ui.chat.yourName")}
                  aria-invalid={!!nameError}
                  aria-describedby={nameError ? "name-error" : undefined}
                  autoComplete="off"
                />
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    type="submit"
                    size="icon"
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

          {/* Category selection */}
          {stage === CHATBOT_FAQ.STAGES.CATEGORY && (
            <motion.div
              key="category-selection"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: ANIMATION.DURATION.FAST }}
              className="space-y-2"
            >
              <ScrollArea className="w-full">
                <div className="flex items-center gap-3 px-2 pt-1 pb-3 w-full">
                  {CHATBOT_FAQ.CATEGORIES.map((category, idx) => (
                    <motion.div
                      key={category}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.08 }}
                      whileHover={{ scale: 1.07, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="shrink-0"
                      style={{ minWidth: 140, maxWidth: 250 }}
                    >
                      <Button
                        onClick={() => handleCategorySelect(category)}
                        variant="outline"
                        className="rounded-full px-6 py-4 bg-primary/5 border-primary/20 text-foreground whitespace-nowrap hover:bg-primary/10 hover:border-primary/40 hover:text-primary hover:shadow-lg hover:shadow-primary/10 active:scale-95 transition-all duration-200 font-medium"
                      >
                        {t(`chatCategories.${category}`)}
                      </Button>
                    </motion.div>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </motion.div>
          )}

          {/* Question selection */}
          {stage === CHATBOT_FAQ.STAGES.QUESTION_SELECT && (
            <motion.div
              key="question-selection"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-2 px-0"
            >
              <ScrollArea className="w-full">
                <div className="flex items-center gap-2 px-2 pt-1 pb-3 w-full">
                  {availableQuestions.map((faq, idx) => (
                    <motion.div
                      key={faq.id}
                      initial={{ opacity: 0, scale: 0.94 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.04 }}
                      whileHover={{ scale: 1.06, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="shrink-0"
                      style={{ width: "auto" }}
                    >
                      <Button
                        onClick={() => handleQuestionSelect(faq.id)}
                        variant="outline"
                        className="h-auto w-full rounded-xl py-3 px-4 text-left bg-secondary/5 border-secondary/20 text-foreground whitespace-nowrap overflow-hidden text-ellipsis hover:bg-secondary/10 hover:border-secondary/40 hover:text-secondary hover:shadow-lg hover:shadow-secondary/10 active:scale-95 flex items-center gap-2 group"
                        aria-label={`Select question: ${faq.question}`}
                      >
                        <HelpCircle className="h-4 w-4 shrink-0 text-secondary/70 group-hover:text-secondary transition-colors" aria-hidden="true" />
                        <span className="text-sm leading-normal text-balance flex-1 overflow-hidden text-ellipsis whitespace-nowrap">{faq.question}</span>
                      </Button>
                    </motion.div>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
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
                        setStage(CHATBOT_FAQ.STAGES.COMPLETE)
                      }, CHATBOT_FAQ.DELAYS.MESSAGE_RESPONSE)
                    }}
                    variant="outline"
                    size="sm"
                    className="w-full rounded-full bg-muted/20 border-muted-foreground/10 text-muted-foreground hover:bg-muted/40 hover:border-muted-foreground/20 hover:text-foreground hover:shadow-md active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    {t("actions.done")}
                  </Button>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Complete stage */}
          {stage === CHATBOT_FAQ.STAGES.COMPLETE && (
            <motion.div
              key="complete-actions"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: ANIMATION.DURATION.FAST }}
              className="space-y-2"
            >
              {selectedCategory && (
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    onClick={() => {
                      // TODO: Implement proper CTA handling based on category
                      console.log(`CTA clicked: ${t(`cta.${selectedCategory}`)}`)
                    }}
                    className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl hover:shadow-primary/20 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
                    size="lg"
                    aria-label={`Call to action: ${t(`cta.${selectedCategory}`)}`}
                  >
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
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
      </motion.div>
    </Card>
  )
}
