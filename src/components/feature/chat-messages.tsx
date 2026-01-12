"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { ChatMessage } from "@/components/feature/chat-message"
import { Sparkles } from "lucide-react"
import { useI18n } from "@/lib/i18n-utils"
import type { ChatMessage as Message } from "@/types"
import { useRef, useEffect } from "react"

interface ChatMessagesProps {
    messages: Message[]
}

/**
 * ChatMessages - Pure display component for chat messages
 * NO inputs, NO buttons, NO footer - DISPLAY ONLY
 */
export function ChatMessages({ messages }: ChatMessagesProps) {
    const { t } = useI18n()
    const messagesEndRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }, [messages])

    return (
        <Card className="flex w-full gap-0 max-w-2xl flex-col overflow-hidden glass-card py-0 border-glass-border shadow-2xl transition-all duration-300 hover:shadow-primary/10 hover:border-glass-highlight leading-4 h-[70vh] max-h-[600px] min-h-[400px]">

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="sticky top-0 z-10 border-b border-glass-border glass-surface bg-glass-bg/50 px-6 py-4"
            >
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
            </motion.div>

            {/* Messages Area - DISPLAY ONLY */}
            <ScrollArea className="flex-1 min-h-0 bg-transparent">
                <div
                    className="space-y-4 px-6 py-4"
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
        </Card>
    )
}
