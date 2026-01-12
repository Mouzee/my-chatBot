"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Bot, User } from "lucide-react"
import { useState, useMemo } from "react"
import { CHAT_MESSAGE, ANIMATION } from "@/lib/constants"

interface ChatMessageProps {
  content: string
  type: "bot" | "user"
  className?: string
}

/**
 * Chat message component with typing animation and link detection
 * Supports bot and user message types with appropriate styling
 */
export function ChatMessage({ content, type, className }: ChatMessageProps) {
  const [isTyping, setIsTyping] = useState(type === "bot")

  // Create regex pattern from constants
  const linkRegex = useMemo(
    () => new RegExp(`(${CHAT_MESSAGE.LINK_PATTERNS.join("|")})`, "gi"),
    []
  )

  const renderContent = (text: string) => {
    const parts = text.split(linkRegex)

    return parts.map((part, index) => {
      if (linkRegex.test(part)) {
        return (
          <a
            key={index}
            href="#"
            className="underline underline-offset-2 hover:text-primary-foreground/80 transition-colors font-medium"
            onClick={(e) => {
              e.preventDefault()
              // TODO: Implement proper link handling based on link type
              console.log(`Link clicked: ${part}`)
            }}
            aria-label={`${part} link`}
          >
            {part}
          </a>
        )
      }
      return <span key={index}>{part}</span>
    })
  }

  const messageAlignment = type === "bot" ? "justify-start" : "justify-end"
  const messageStyles = type === "bot"
    ? "backdrop-blur-md bg-surface/80 text-card-foreground border border-border/50 hover:shadow-lg hover:border-border/70 hover:bg-surface/90"
    : "backdrop-blur-md bg-primary/10 text-primary-contrast shadow-none hover:shadow-lg hover:shadow-primary/10 hover:bg-primary/20"

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: ANIMATION.DURATION.FAST,
        ease: ANIMATION.EASING.SMOOTH,
      }}
      className={cn("flex w-full gap-3", messageAlignment, className)}
      role="log"
      aria-live="polite"
      aria-label={`${type === "bot" ? "Bot" : "User"} message`}
    >
      {type === "bot" && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: ANIMATION.DELAY.SHORT, type: "spring", stiffness: 200 }}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full backdrop-blur-md text-primary-contrast shadow-md shadow-primary/20 ring-2 ring-primary/20"
          aria-hidden="true"
        >
          <Bot className="h-4 w-4" aria-hidden="true" />
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: ANIMATION.DELAY.SHORT, duration: ANIMATION.DURATION.FAST }}
        onAnimationComplete={() => setIsTyping(false)}
        className={cn(
          "group relative max-w-[85%] rounded-2xl px-4 py-3 shadow-md transition-all duration-200",
          messageStyles
        )}
      >
        {isTyping && type === "bot" ? (
          <div className="flex items-center gap-1" aria-label="Bot is typing">
            {CHAT_MESSAGE.TYPING_DOT_DELAYS.map((delay, index) => (
              <motion.span
                key={index}
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{
                  duration: CHAT_MESSAGE.TYPING_ANIMATION_DURATION,
                  repeat: Infinity,
                  delay,
                }}
                className="h-2 w-2 rounded-full bg-current"
                aria-hidden="true"
              />
            ))}
          </div>
        ) : (
          <p className="text-sm leading-relaxed text-balance">{renderContent(content)}</p>
        )}
      </motion.div>

      {type === "user" && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: ANIMATION.DELAY.SHORT, type: "spring", stiffness: 200 }}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full backdrop-blur-md bg-primary/10 text-secondary-foreground shadow-md ring-2 ring-primary/20"
          aria-hidden="true"
        >
          <User className="h-4 w-4" aria-hidden="true" />
        </motion.div>
      )}
    </motion.div>
  )
}
