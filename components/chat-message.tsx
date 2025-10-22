"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Bot, User } from "lucide-react"
import { useState } from "react"

interface ChatMessageProps {
  content: string
  type: "bot" | "user"
  className?: string
}

export function ChatMessage({ content, type, className }: ChatMessageProps) {
  const [isTyping, setIsTyping] = useState(type === "bot")

  const renderContent = (text: string) => {
    const linkRegex = /(Portfolio Website|LinkedIn|Email|WhatsApp|GitHub|Download my CV|CV)/gi
    const parts = text.split(linkRegex)

    return parts.map((part, index) => {
      if (part.match(linkRegex)) {
        return (
          <a
            key={index}
            href="#"
            className="underline underline-offset-2 hover:text-primary-foreground/80 transition-colors font-medium"
            onClick={(e) => {
              e.preventDefault()
              console.log(`[v0] Link clicked: ${part}`)
            }}
          >
            {part}
          </a>
        )
      }
      return part
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={cn("flex w-full gap-3", type === "bot" ? "justify-start" : "justify-end", className)}
      role="log"
      aria-live="polite"
    >
      {type === "bot" && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full backdrop-blur-md bg-primary/90 text-primary-contrast shadow-md shadow-primary/20 ring-2 ring-primary/20"
        >
          <Bot className="h-4 w-4" />
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        onAnimationComplete={() => setIsTyping(false)}
        className={cn(
          "group relative max-w-[85%] rounded-2xl px-4 py-3 shadow-md transition-all duration-200",
          type === "bot"
            ? "backdrop-blur-md bg-surface/80 text-card-foreground border border-border/50 hover:shadow-lg hover:border-border/70 hover:bg-surface/90"
            : "backdrop-blur-md bg-primary/90 text-primary-contrast shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 hover:bg-primary/95",
        )}
      >
        {isTyping && type === "bot" ? (
          <div className="flex items-center gap-1">
            <motion.span
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: 0 }}
              className="h-2 w-2 rounded-full bg-current"
            />
            <motion.span
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: 0.2 }}
              className="h-2 w-2 rounded-full bg-current"
            />
            <motion.span
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: 0.4 }}
              className="h-2 w-2 rounded-full bg-current"
            />
          </div>
        ) : (
          <p className="text-sm leading-relaxed text-balance">{renderContent(content)}</p>
        )}
      </motion.div>

      {type === "user" && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full backdrop-blur-md bg-secondary/80 text-secondary-foreground shadow-md ring-2 ring-secondary/20"
        >
          <User className="h-4 w-4" />
        </motion.div>
      )}
    </motion.div>
  )
}
