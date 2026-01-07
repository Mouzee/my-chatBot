"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

/**
 * Enhanced Skeleton Components - Visual placeholders during loading
 * Dark theme compatible with shimmer animation
 */

const shimmerKeyframes = `
  @keyframes shimmer-loading {
    0% {
      background-position: -1000px 0;
    }
    100% {
      background-position: 1000px 0;
    }
  }
`

interface SkeletonLoadingProps {
    className?: string
    variant?: "text" | "circle" | "rectangle" | "pill"
    width?: string
    height?: string
}

export function SkeletonLoading({ className = "", variant = "rectangle", width, height }: SkeletonLoadingProps) {
    const baseClasses = "bg-gradient-to-r from-white/[0.06] via-white/[0.12] to-white/[0.06] bg-[length:1000px_100%]"

    const variantClasses = {
        text: "h-4 rounded",
        circle: "rounded-full",
        rectangle: "rounded-lg",
        pill: "rounded-full",
    }

    const style: React.CSSProperties = {
        width: width || "100%",
        height: height || (variant === "text" ? "1rem" : "100%"),
        animation: "shimmer-loading 1.5s ease-in-out infinite",
    }

    return (
        <>
            <style>{shimmerKeyframes}</style>
            <div
                className={cn(baseClasses, variantClasses[variant], className)}
                style={style}
            />
        </>
    )
}

/**
 * Hero Section Skeleton
 */
export function HeroSkeleton() {
    return (
        <div className="space-y-6">
            {/* Badge */}
            <SkeletonLoading variant="pill" width="180px" height="36px" />

            {/* Title */}
            <div className="space-y-3">
                <SkeletonLoading variant="text" width="90%" height="48px" />
                <SkeletonLoading variant="text" width="70%" height="48px" />
            </div>

            {/* Description */}
            <div className="space-y-2">
                <SkeletonLoading variant="text" width="100%" height="20px" />
                <SkeletonLoading variant="text" width="85%" height="20px" />
            </div>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-3 pt-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <SkeletonLoading key={i} variant="pill" width="140px" height="36px" />
                ))}
            </div>
        </div>
    )
}

/**
 * Chat Window Skeleton
 */
export function ChatWindowSkeleton() {
    return (
        <div className="glass-card w-full max-w-2xl flex flex-col overflow-hidden border-glass-border shadow-2xl h-[70vh] max-h-[600px] min-h-[400px]">
            {/* Header */}
            <div className="border-b border-glass-border glass-surface bg-glass-bg/50 px-6 py-4">
                <div className="flex items-center gap-4">
                    <SkeletonLoading variant="circle" width="40px" height="40px" />
                    <div className="flex-1 space-y-2">
                        <SkeletonLoading variant="text" width="150px" height="18px" />
                        <SkeletonLoading variant="text" width="200px" height="14px" />
                    </div>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 px-6 py-4 space-y-4">
                {/* Bot message */}
                <div className="flex gap-3">
                    <SkeletonLoading variant="circle" width="32px" height="32px" className="shrink-0" />
                    <div className="flex-1 space-y-2">
                        <SkeletonLoading variant="rectangle" width="80%" height="60px" />
                    </div>
                </div>

                {/* User message */}
                <div className="flex gap-3 justify-end">
                    <div className="flex-1 flex justify-end">
                        <SkeletonLoading variant="rectangle" width="60%" height="40px" />
                    </div>
                </div>

                {/* Bot message */}
                <div className="flex gap-3">
                    <SkeletonLoading variant="circle" width="32px" height="32px" className="shrink-0" />
                    <div className="flex-1 space-y-2">
                        <SkeletonLoading variant="rectangle" width="90%" height="80px" />
                    </div>
                </div>
            </div>
        </div>
    )
}

/**
 * Global Footer Skeleton - CRITICAL for layout stability
 * Maintains exact same dimensions as real footer
 */
export function GlobalFooterSkeleton() {
    return (
        <div className="fixed bottom-0 left-0 right-0 z-40 pb-6 px-4 pointer-events-none">
            <div className="max-w-5xl mx-auto">
                <div className="glass-surface rounded-full border border-glass-border shadow-2xl backdrop-blur-xl bg-glass-bg/80 p-2">
                    <div className="flex items-center gap-2">
                        {/* Input skeleton */}
                        <div className="flex-1 px-6 h-12 flex items-center">
                            <SkeletonLoading variant="text" width="200px" height="16px" />
                        </div>
                        {/* Button skeleton */}
                        <SkeletonLoading variant="circle" width="48px" height="48px" />
                    </div>
                </div>
            </div>
        </div>
    )
}

/**
 * Full Page Skeleton - Combines all sections
 */
export function PageSkeleton() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center px-4 h-full"
            style={{ paddingBottom: '40px' }}
        >
            <div className="max-w-7xl mx-auto w-full">
                <div className="grid lg:grid-cols-[1fr_1.5fr] gap-8 items-center">
                    {/* Hero Skeleton */}
                    <div>
                        <HeroSkeleton />
                    </div>

                    {/* Chat Skeleton */}
                    <div className="flex justify-center lg:justify-end">
                        <ChatWindowSkeleton />
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
