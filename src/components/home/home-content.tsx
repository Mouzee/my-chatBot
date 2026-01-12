"use client"

import { useEffect, useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useI18n } from "@/lib/i18n-utils"
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
    const { t } = useI18n()
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
            { icon: BadgeCheck, translationKey: "hero.feature1" },
            { icon: Sparkles, translationKey: "hero.feature2" },
            { icon: Lightbulb, translationKey: "hero.feature3" },
            { icon: LayoutGrid, translationKey: "hero.feature4" },
            { icon: PenTool, translationKey: "hero.feature5" },
            { icon: Code2, translationKey: "hero.feature6" },
            { icon: MonitorSmartphone, translationKey: "hero.feature7" },
            { icon: BrainCog, translationKey: "hero.feature8" },
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
                        className="flex items-center px-4 pb-0 lg:h-[calc(100vh-0rem)] "
                        // style={{ paddingBottom: '40px'  }}
                    >
                        <div className="max-w-7xl mx-auto w-full">
                            <div className="grid lg:grid-cols-[1fr_1.5fr] mt-20 lg:mt-0 gap-4 sm:gap-8 items-center">
                                {/* Hero content */}
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: ANIMATION.DURATION.NORMAL }}
                                >
                                    <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary/10 dark:bg-white/5 rounded-full border border-primary/20 dark:border-white/10 mb-2 sm:mb-6 backdrop-blur-md">
                                        <Bot className="w-4 h-4 text-primary dark:text-primary-foreground" aria-hidden="true" />
                                        <span className="text-sm font-medium text-primary dark:text-primary-foreground">{t("hero.badge")}</span>
                                    </div>

                                    <h1 className="text-3xl sm:text-5xl font-bold mb-2 sm:mb-6 leading-tight">
                                        <span className="text-foreground">{t("hero.title")} </span>
                                        <span className="text-accent">{t("hero.titleHighlight")}</span>
                                    </h1>

                                    <p className="text-lg text-muted-foreground mb-8 leading-relaxed hidden lg:block">
                                        {t("hero.description")}
                                    </p>

                                    <motion.div
                                        className="flex flex-wrap items-center gap-3 hidden lg:flex"
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
                                                    className="flex items-center gap-2 px-4 py-2 bg-white/40 dark:bg-white/5 backdrop-blur-md rounded-full border border-white/30 dark:border-white/10 hover:bg-white/60 dark:hover:bg-white/10 hover:border-white/50 hover:shadow-lg transition-all duration-300"
                                                    role="listitem"
                                                >
                                                    <Icon className="w-4 h-4 text-primary dark:text-primary-foreground" aria-hidden="true" />
                                                    <span className="text-sm text-primary dark:text-primary-foreground font-medium">{t(feature.translationKey)}</span>
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
