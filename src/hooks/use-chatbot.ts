
import { useState, useCallback, useMemo } from "react"
import { useI18n } from "@/lib/i18n-utils"
import { CHATBOT_FAQ } from "@/lib/constants"
import type { ChatStage, ChatCategoryType, ChatMessage, FAQItem } from "@/types"

export function useChatbot() {
    const { t } = useI18n()
    const [stage, setStage] = useState<ChatStage>(CHATBOT_FAQ.STAGES.NAME)
    const [nameInput, setNameInput] = useState("")
    const [selectedCategory, setSelectedCategory] = useState<ChatCategoryType | null>(null)
    const [answeredQuestions, setAnsweredQuestions] = useState<Set<string>>(new Set())
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: "1",
            content: t("welcome.greeting"),
            type: "bot",
        },
    ])
    const [nameError, setNameError] = useState("")

    const addMessage = useCallback((content: string, type: "bot" | "user") => {
        const newMessage: ChatMessage = {
            id: Date.now().toString(),
            content,
            type,
        }
        setMessages((prev) => [...prev, newMessage])
    }, [])

    const handleNameSubmit = useCallback((e: React.FormEvent) => {
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
    }, [nameInput, t, addMessage, setStage]) // Fixed dependencies in logic, though setStage is stable.

    const handleCategorySelect = useCallback((category: ChatCategoryType) => {
        setSelectedCategory(category)
        addMessage(t(`chatCategories.${category}`), "user")

        setTimeout(() => {
            addMessage(t("chatCategories.selectPrompt"), "bot")
            setStage("question-select")
        }, 800)
    }, [addMessage, t])

    const getFAQList = useCallback((category: ChatCategoryType): FAQItem[] => {
        const faqData = t.raw(`faq.${category}`)
        return Array.isArray(faqData) ? faqData as FAQItem[] : []
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

            // We need to check available questions state. 
            // But inside callback we need current state. 
            // Using functional update for setAnsweredQuestions but need value immediately?
            // Actually we calculate based on prev items?
            // Re-evaluating answered count needs the new state.
            // This logic was "allAnswered = answeredQuestions.size + 1 >= faqList.length" using the closure scope variable?
            // In original code: "const allAnswered = answeredQuestions.size + 1 >= faqList.length" inside the timeout?
            // No, `answeredQuestions` in original was from closure.
            // We should use a ref or check logical derived state if possible, or accept that we might be one step behind if not careful.
            // Best approach: Pass setAnsweredQuestions a callback, and check inside?
            // Or just check (prevAnswered.size + 1).

            setAnsweredQuestions(prev => {
                const newSet = new Set([...prev, faqId]);
                const allAnswered = newSet.size >= faqList.length;

                setTimeout(() => {
                    if (allAnswered) {
                        addMessage(t("actions.allExplored"), "bot")
                        setStage(CHATBOT_FAQ.STAGES.COMPLETE)
                    } else {
                        addMessage(t("actions.anotherQuestion"), "bot")
                        setStage(CHATBOT_FAQ.STAGES.QUESTION_SELECT)
                    }
                }, CHATBOT_FAQ.DELAYS.COMPLETE_CHECK)

                return newSet;
            });

        }, CHATBOT_FAQ.DELAYS.ANSWER_DISPLAY)
    }, [selectedCategory, getFAQList, addMessage, t])

    const handleRestart = useCallback(() => {
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

    return {
        stage,
        setStage,
        nameInput,
        setNameInput,
        selectedCategory,
        messages,
        nameError,
        addMessage,
        handleNameSubmit,
        handleCategorySelect,
        handleQuestionSelect,
        handleRestart,
        availableQuestions,
        totalQuestions,
        answeredQuestions
    }
}
