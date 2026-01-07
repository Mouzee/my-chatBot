"use client"

import { useState, useCallback, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, HelpCircle, CheckCircle2, ExternalLink, RotateCcw } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { useTranslation } from "react-i18next"
import { CHATBOT_FAQ, ANIMATION } from "@/lib/constants"
import type { ChatStage, ChatCategoryType, FAQItem } from "@/types"

interface GlobalChatFooterProps {
    stage: ChatStage
    selectedCategory: ChatCategoryType | null
    availableQuestions: FAQItem[]
    answeredCount: number
    onNameSubmit: (name: string) => void
    onCategorySelect: (category: ChatCategoryType) => void
    onQuestionSelect: (faqId: string) => void
    onDone: () => void
    onRestart: () => void
    onCTAClick: () => void
}

/**
 * GlobalChatFooter - SINGLE SOURCE OF ALL CHAT INTERACTIONS
 * Handles ALL stages: name entry, category selection, questions, completion
 * Fixed at bottom of screen - NO duplicates anywhere else
 */
export function GlobalChatFooter({
    stage,
    selectedCategory,
    availableQuestions,
    answeredCount,
    onNameSubmit,
    onCategorySelect,
    onQuestionSelect,
    onDone,
    onRestart,
    onCTAClick,
}: GlobalChatFooterProps) {
    const { t } = useTranslation()
    const [nameInput, setNameInput] = useState("")
    const [nameError, setNameError] = useState("")
    const [isReady, setIsReady] = useState(false)

    // Mark as ready after mount to prevent hydration mismatch
    useEffect(() => {
        setIsReady(true)
    }, [])

    const handleNameSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault()
        const trimmedValue = nameInput.trim()

        if (trimmedValue.length < 2) {
            setNameError(t("welcome.nameError"))
            return
        }

        setNameError("")
        onNameSubmit(trimmedValue)
        setNameInput("")
    }, [nameInput, onNameSubmit, t])

    return (
        <div
            className="fixed bottom-0 left-0 right-0 z-40 pb-6 px-4"
            style={{
                opacity: isReady ? 1 : 0,
                pointerEvents: isReady ? 'auto' : 'none',
                transition: 'opacity 0.4s ease-out'
            }}
        >
            <div className="max-w-5xl mx-auto">
                <AnimatePresence mode="wait">
                    {/* NAME ENTRY STAGE */}
                    {stage === CHATBOT_FAQ.STAGES.NAME && (
                        <motion.form
                            key="name-input"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            onSubmit={handleNameSubmit}
                            className="relative"
                        >
                            <div className="glass-surface rounded-full border border-glass-border shadow-2xl shadow-primary/5 backdrop-blur-xl bg-glass-bg/80 p-2 transition-all duration-300 hover:shadow-primary/10 hover:border-glass-highlight">
                                <div className="flex items-center gap-2">
                                    <Input
                                        type="text"
                                        value={nameInput}
                                        onChange={(e) => {
                                            setNameInput(e.target.value)
                                            setNameError("")
                                        }}
                                        placeholder={t("welcome.namePrompt")}
                                        className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-foreground placeholder:text-muted-foreground/60 px-6 h-12 text-base rounded-full"
                                        aria-label={t("ui.chat.yourName")}
                                        aria-invalid={!!nameError}
                                        autoComplete="off"
                                        autoFocus
                                    />
                                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                        <Button
                                            type="submit"
                                            size="icon"
                                            className="h-12 w-12 rounded-full bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl hover:shadow-primary/30 transition-all duration-200"
                                            aria-label={t("actions.submit")}
                                        >
                                            <ArrowRight className="h-5 w-5" />
                                        </Button>
                                    </motion.div>
                                </div>
                            </div>
                            {nameError && (
                                <motion.p
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="absolute -top-10 left-6 text-sm text-destructive flex items-center gap-2 bg-background/90 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-destructive/20"
                                    role="alert"
                                >
                                    <span className="h-2 w-2 rounded-full bg-destructive animate-pulse" />
                                    {nameError}
                                </motion.p>
                            )}
                        </motion.form>
                    )}

                    {/* CATEGORY SELECTION STAGE */}
                    {stage === CHATBOT_FAQ.STAGES.CATEGORY && (
                        <motion.div
                            key="category-selection"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className="glass-surface rounded-2xl border border-glass-border shadow-2xl backdrop-blur-xl bg-glass-bg/80 p-4"
                        >
                            <ScrollArea className="w-full">
                                <div className="flex items-center gap-3 px-2 py-2">
                                    {CHATBOT_FAQ.CATEGORIES.map((category, idx) => (
                                        <motion.div
                                            key={category}
                                            initial={{ opacity: 0, x: 30 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.08 }}
                                            whileHover={{ scale: 1.07, y: -2 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="shrink-0"
                                        >
                                            <Button
                                                onClick={() => onCategorySelect(category)}
                                                variant="outline"
                                                className="rounded-full px-6 py-5 bg-primary/5 border-primary/20 text-foreground whitespace-nowrap hover:bg-primary/10 hover:border-primary/40 hover:text-primary hover:shadow-lg hover:shadow-primary/10 transition-all duration-200 font-medium"
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

                    {/* QUESTION SELECTION STAGE */}
                    {stage === CHATBOT_FAQ.STAGES.QUESTION_SELECT && (
                        <motion.div
                            key="question-selection"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className="glass-surface rounded-2xl border border-glass-border shadow-2xl backdrop-blur-xl bg-glass-bg/80 p-4 space-y-3"
                        >
                            <ScrollArea className="w-full">
                                <div className="flex items-center gap-2 px-2 py-2">
                                    {availableQuestions.map((faq, idx) => (
                                        <motion.div
                                            key={faq.id}
                                            initial={{ opacity: 0, scale: 0.94 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: idx * 0.04 }}
                                            whileHover={{ scale: 1.06, y: -2 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="shrink-0"
                                        >
                                            <Button
                                                onClick={() => onQuestionSelect(faq.id)}
                                                variant="outline"
                                                className="h-auto rounded-xl py-3 px-4 bg-secondary/5 border-secondary/20 text-foreground whitespace-nowrap hover:bg-secondary/10 hover:border-secondary/40 hover:text-secondary hover:shadow-lg transition-all flex items-center gap-2 group"
                                            >
                                                <HelpCircle className="h-4 w-4 shrink-0 text-secondary/70 group-hover:text-secondary transition-colors" />
                                                <span className="text-sm">{faq.question}</span>
                                            </Button>
                                        </motion.div>
                                    ))}
                                </div>
                                <ScrollBar orientation="horizontal" />
                            </ScrollArea>
                            {answeredCount > 0 && (
                                <Button
                                    onClick={onDone}
                                    variant="outline"
                                    size="sm"
                                    className="w-full rounded-full bg-muted/20 border-muted-foreground/10 text-muted-foreground hover:bg-muted/40 hover:border-muted-foreground/20 hover:text-foreground transition-all flex items-center justify-center gap-2"
                                >
                                    <CheckCircle2 className="h-4 w-4" />
                                    {t("actions.done")}
                                </Button>
                            )}
                        </motion.div>
                    )}

                    {/* ANSWER STAGE - Show minimal UI */}
                    {stage === CHATBOT_FAQ.STAGES.ANSWER && (
                        <motion.div
                            key="answer-waiting"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="glass-surface rounded-2xl border border-glass-border shadow-2xl backdrop-blur-xl bg-glass-bg/80 p-4 text-center"
                        >
                            <p className="text-sm text-muted-foreground">{t("header.subtitle")}</p>
                        </motion.div>
                    )}

                    {/* COMPLETE STAGE */}
                    {stage === CHATBOT_FAQ.STAGES.COMPLETE && (
                        <motion.div
                            key="complete-actions"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className="glass-surface rounded-2xl border border-glass-border shadow-2xl backdrop-blur-xl bg-glass-bg/80 p-4 space-y-3"
                        >
                            {selectedCategory && (
                                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                    <Button
                                        onClick={onCTAClick}
                                        className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl hover:shadow-primary/20 transition-all flex items-center justify-center gap-2"
                                        size="lg"
                                    >
                                        <ExternalLink className="h-4 w-4" />
                                        {t(`cta.${selectedCategory}`)}
                                    </Button>
                                </motion.div>
                            )}
                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                <Button
                                    onClick={onRestart}
                                    variant="outline"
                                    className="w-full rounded-full border-2 text-foreground hover:bg-muted/40 shadow-md hover:shadow-lg transition-all bg-transparent"
                                    size="lg"
                                >
                                    <RotateCcw className="mr-2 h-4 w-4" />
                                    {t("actions.restart")}
                                </Button>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
