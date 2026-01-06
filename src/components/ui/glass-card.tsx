import * as React from "react"
import { cn } from "@/lib/utils"

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
    hoverEffect?: boolean
    blur?: "sm" | "md" | "lg"
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
    ({ className, hoverEffect = true, blur = "md", ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    "glass-card",
                    hoverEffect && "hover:border-glass-highlight hover:shadow-lg transition-all duration-300",
                    blur === "sm" && "backdrop-blur-sm",
                    blur === "lg" && "backdrop-blur-xl",
                    className
                )}
                {...props}
            />
        )
    }
)
GlassCard.displayName = "GlassCard"

export { GlassCard }
