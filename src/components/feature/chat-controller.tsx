"use client"

import { useState, useCallback, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { ChatMessages } from "@/components/feature/chat-messages"
import { GlobalChatFooter } from "@/components/feature/global-chat-footer"
import { CHATBOT_FAQ } from "@/lib/constants"
import type { ChatStage, ChatCategoryType, ChatMessage, FAQItem } from "@/types"

/**
 * ChatController - Manages chat state and connects display to footer
 * NO UI - pure logic component
 */
export function ChatController() {
    const { t } = useTranslation()
    const [stage, setStage] = useState<ChatStage>(CHATBOT_FAQ.STAGES.NAME)
    const [selectedCategory, setSelectedCategory] = useState<ChatCategoryType | null>(null)
    const [answeredQuestions, setAnsweredQuestions] = useState<Set<string>>(new Set())
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: "1",
            content: t("welcome.greeting"),
            type: "bot",
        },
    ])

    const addMessage = useCallback((content: string, type: "bot" | "user") => {
        const newMessage: ChatMessage = {
            id: Date.now().toString(),
            content,
            type,
        }
        setMessages((prev) => [...prev, newMessage])
    }, [])

    const handleNameSubmit = useCallback((name: string) => {
        addMessage(name, "user")
        setTimeout(() => {
            addMessage(t("welcome.niceMeet", { name }), "bot")
            setStage(CHATBOT_FAQ.STAGES.CATEGORY)
        }, CHATBOT_FAQ.DELAYS.MESSAGE_RESPONSE)
    }, [addMessage, t])

    const handleCategorySelect = useCallback((category: ChatCategoryType) => {
        setSelectedCategory(category)
        addMessage(t(`chatCategories.${category}`), "user")
        setTimeout(() => {
            addMessage(t("chatCategories.selectPrompt"), "bot")
            setStage(CHATBOT_FAQ.STAGES.QUESTION_SELECT)
        }, 800)
    }, [addMessage, t])

    const getFAQList = useCallback((category: ChatCategoryType): FAQItem[] => {
        return (t(`faq.${category}`, { returnObjects: true }) as FAQItem[]) || []
    }, [t])

    const handleQuestionSelect = useCallback((faqId: string) => {
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
    }, [selectedCategory, answeredQuestions, addMessage, getFAQList, t])

    const handleDone = useCallback(() => {
        addMessage(t("actions.doneMessage"), "user")
        setTimeout(() => {
            addMessage(t("actions.thanksMessage"), "bot")
            setStage(CHATBOT_FAQ.STAGES.COMPLETE)
        }, CHATBOT_FAQ.DELAYS.MESSAGE_RESPONSE)
    }, [addMessage, t])

    const handleRestart = useCallback(() => {
        setStage(CHATBOT_FAQ.STAGES.NAME)
        setSelectedCategory(null)
        setAnsweredQuestions(new Set())
        setMessages([
            {
                id: Date.now().toString(),
                content: t("welcome.greeting"),
                type: "bot",
            },
        ])
    }, [t])

    const handleCTAClick = useCallback(() => {
        console.log(`CTA clicked: ${selectedCategory}`)
    }, [selectedCategory])

    const availableQuestions = useMemo(() => {
        if (!selectedCategory) return []
        const faqList = getFAQList(selectedCategory)
        return faqList.filter((faq) => !answeredQuestions.has(faq.id))
    }, [selectedCategory, answeredQuestions, getFAQList])

    return (
        <>
            {/* Chat Display - NO INPUTS */}
            <ChatMessages messages={messages} />

            {/* Global Footer - ALL INTERACTIONS */}
            <GlobalChatFooter
                stage={stage}
                selectedCategory={selectedCategory}
                availableQuestions={availableQuestions}
                answeredCount={answeredQuestions.size}
                onNameSubmit={handleNameSubmit}
                onCategorySelect={handleCategorySelect}
                onQuestionSelect={handleQuestionSelect}
                onDone={handleDone}
                onRestart={handleRestart}
                onCTAClick={handleCTAClick}
            />
        </>
    )
}
