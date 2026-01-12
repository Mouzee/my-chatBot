"use client"

import * as React from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useOnClickOutside } from "usehooks-ts"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface Tab {
  title: string
  icon: LucideIcon
  href: string
  type?: never
}

interface Separator {
  type: "separator"
  title?: never
  icon?: never
  href?: never
}

type TabItem = Tab | Separator

interface ExpandableTabsProps {
  tabs: TabItem[]
  className?: string
  activeColor?: string
}

const buttonVariants = {
  initial: {
    gap: 0,
    paddingLeft: ".5rem",
    paddingRight: ".5rem",
  },
  animate: (isSelected: boolean) => ({
    gap: isSelected ? ".5rem" : 0,
    paddingLeft: isSelected ? "1rem" : ".5rem",
    paddingRight: isSelected ? "1rem" : ".5rem",
  }),
}

const spanVariants = {
  initial: { width: 0, opacity: 0 },
  animate: { width: "auto", opacity: 1 },
  exit: { width: 0, opacity: 0 },
}

const transition = { delay: 0.1, type: "spring", bounce: 0, duration: 0.6 } as const

export function ExpandableTabs({
  tabs,
  className,
  activeColor = "text-primary",
}: ExpandableTabsProps) {
  const pathname = usePathname()
  const [selected, setSelected] = React.useState<number | null>(null)
  const outsideClickRef = React.useRef<HTMLDivElement>(null)

  useOnClickOutside(outsideClickRef as React.RefObject<HTMLElement>, () => {
    setSelected(null)
  })

  const handleSelect = (index: number) => {
    setSelected(index)
  }

  const Separator = () => (
    <div
      className="mx-1 h-[24px] w-[1.2px] bg-border"
      aria-hidden="true"
    />
  )

  return (
    <TooltipProvider delayDuration={150}>
      <div
        ref={outsideClickRef}
        className={cn(
          "flex flex-wrap items-center gap-2 rounded-2xl border bg-white/40 dark:bg-white/10 backdrop-blur-xl p-1 shadow-xl border-white/30 dark:border-white/10",
          className
        )}
      >
        {tabs.map((tab, index) => {
          if (tab.type === "separator") {
            return <Separator key={`separator-${index}`} />
          }

          const Icon = tab.icon
          const isActive = pathname === tab.href

          return (
            <Tooltip key={tab.title}>
              <TooltipTrigger asChild>
                <Link href={tab.href}>
                  <motion.button
                    variants={buttonVariants}
                    initial={false}
                    animate="animate"
                    custom={selected === index || isActive}
                    onClick={() => handleSelect(index)}
                    transition={transition}
                    className={cn(
                      "relative flex items-center rounded-xl px-4 py-2 text-sm font-medium transition-colors duration-300",
                      selected === index || isActive
                        ? cn("bg-primary/10", activeColor)
                        : "text-muted-foreground hover:bg-white/40 hover:text-foreground"
                    )}
                  >
                    <Icon size={20} />
                    <AnimatePresence initial={false}>
                      {(selected === index || isActive) && (
                        <motion.span
                          variants={spanVariants}
                          initial="initial"
                          animate="animate"
                          exit="exit"
                          transition={transition}
                          className="overflow-hidden"
                        >
                          {tab.title}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </Link>
              </TooltipTrigger>

              {/* Tooltip Text */}
              <TooltipContent side="top" className="text-xs font-medium">
                {tab.title}
              </TooltipContent>
            </Tooltip>
          )
        })}
      </div>
    </TooltipProvider>
  )
}
