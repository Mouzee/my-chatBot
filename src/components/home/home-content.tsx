"use client"

import { useEffect, useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTranslation } from "react-i18next"
import {
    Bot,
    Sparkles,
    BrainCog,
    Lightbulb,
    LayoutGrid,
    PenTool,
    Code2,
    MonitorSmartphone,
    BadgeCheck,
    type LucideIcon
} from "lucide-react"

import { ChatController } from "@/components/feature/chat-controller"
import { PageSkeleton, GlobalFooterSkeleton } from "@/components/ui/loading-skeleton"
import { STORAGE_KEYS, ANIMATION } from "@/lib/constants"

interface FeatureCard {
    icon: LucideIcon
    translationKey: string
}

export function HomeContent() {
    const { t } = useTranslation()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const currentCount = localStorage.getItem(STORAGE_KEYS.VISITOR_COUNT)
        const count = currentCount ? Number.parseInt(currentCount, 10) : 0
        const newCount = count + 1
        localStorage.setItem(STORAGE_KEYS.VISITOR_COUNT, newCount.toString())

        // Simulate initial load completion
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 800)

        return () => clearTimeout(timer)
    }, [])

    const features: FeatureCard[] = useMemo(
        () => [
            { icon: BadgeCheck, translationKey: "intro-section.hero.feature1" },
            { icon: Sparkles, translationKey: "intro-section.hero.feature2" },
            { icon: Lightbulb, translationKey: "intro-section.hero.feature3" },
            { icon: LayoutGrid, translationKey: "intro-section.hero.feature4" },
            { icon: PenTool, translationKey: "intro-section.hero.feature5" },
            { icon: Code2, translationKey: "intro-section.hero.feature6" },
            { icon: MonitorSmartphone, translationKey: "intro-section.hero.feature7" },
            { icon: BrainCog, translationKey: "intro-section.hero.feature8" },
        ],
        []
    )

    return (
        <>
            <AnimatePresence mode="wait">
                {isLoading ? (
                    <PageSkeleton key="skeleton" />
                ) : (
                    <motion.section
                        key="content"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="flex items-center px-4 h-full"
                        style={{ paddingBottom: '140px' }}
                    >
                        <div className="max-w-7xl mx-auto w-full">
                            <div className="grid lg:grid-cols-[1fr_1.5fr] gap-8 items-center">
                                {/* Hero content */}
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: ANIMATION.DURATION.NORMAL }}
                                >
                                    <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-6">
                                        <Bot className="w-4 h-4 text-primary" aria-hidden="true" />
                                        <span className="text-sm font-medium text-primary">{t("intro-section.hero.badge")}</span>
                                    </div>

                                    <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
                                        <span className="text-foreground">{t("intro-section.hero.title")} </span>
                                        <span className="text-primary">{t("intro-section.hero.titleHighlight")}</span>
                                    </h1>

                                    <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                                        {t("intro-section.hero.description")}
                                    </p>

                                    <motion.div
                                        className="flex flex-wrap items-center gap-3"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: ANIMATION.DURATION.NORMAL, delay: ANIMATION.DELAY.MEDIUM }}
                                        role="list"
                                        aria-label="Key features"
                                    >
                                        {features.map((feature) => {
                                            const Icon = feature.icon
                                            return (
                                                <motion.div
                                                    key={feature.translationKey}
                                                    whileHover={{ scale: 1.05, y: -2 }}
                                                    className="flex items-center gap-2 px-4 py-2 bg-secondary/50 backdrop-blur-sm rounded-full border border-border/50 hover:border-accent/50 hover:shadow-md transition-all duration-200"
                                                    role="listitem"
                                                >
                                                    <Icon className="w-4 h-4 text-accent" aria-hidden="true" />
                                                    <span className="text-sm text-muted-foreground">{t(feature.translationKey)}</span>
                                                </motion.div>
                                            )
                                        })}
                                    </motion.div>
                                </motion.div>

                                {/* Chat section - Managed by ChatController */}
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: ANIMATION.DURATION.NORMAL, delay: ANIMATION.DELAY.SHORT * 3 }}
                                    className="flex justify-center lg:justify-end"
                                >
                                    <ChatController />
                                </motion.div>
                            </div>
                        </div>
                    </motion.section>
                )}
            </AnimatePresence>

            {/* Global Footer Skeleton - Always reserve space */}
            {isLoading && <GlobalFooterSkeleton />}
        </>
    )
}
