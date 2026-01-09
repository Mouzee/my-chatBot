
import Image from "next/image"
import { motion } from "framer-motion"
import type { HTMLMotionProps } from "framer-motion"
import { forwardRef } from "react"
import { cn } from "@/lib/utils"

interface ProjectCardPreviewProps extends HTMLMotionProps<"button"> {
    title: string
    description: string
    tags: string[]
    image: string
    isComingSoon?: boolean
}

export const ProjectCardPreview = forwardRef<HTMLButtonElement, ProjectCardPreviewProps>(
    ({ title, description, tags, image, isComingSoon, ...props }, ref) => {
        return (
            <motion.button
                ref={ref}
                {...props}
                whileHover={isComingSoon ? { y: -5 } : { y: -10, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 250 }}
                className={cn(
                    "project-card-transparent group relative overflow-hidden h-full flex flex-col w-full text-left rounded-lg transition-all duration-300",
                    isComingSoon ? "cursor-default opacity-80" : "cursor-pointer"
                )}
                aria-label={isComingSoon ? `Coming soon: ${title}` : `View details for ${title}`}
                disabled={isComingSoon}
            >
                <div className="relative h-52 w-full overflow-hidden flex items-center justify-center rounded-t-lg">
                    <Image
                        src={image}
                        alt={`${title} preview`}
                        fill
                        className={cn(
                            "object-cover transition-transform duration-700",
                            !isComingSoon && "group-hover:scale-110",
                            isComingSoon && "blur-[2px] grayscale-[0.5]"
                        )}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-80 transition-opacity duration-500" />

                    {isComingSoon && (
                        <div className="absolute inset-0 flex items-center justify-center z-20">
                            <span className="px-4 py-2 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 text-primary text-sm font-bold tracking-widest uppercase">
                                Coming Soon
                            </span>
                        </div>
                    )}
                </div>
                <div className="p-6 flex flex-col grow z-10">
                    <h3 className={cn(
                        "text-xl font-bold mb-2 transition-colors",
                        isComingSoon ? "text-foreground/70" : "text-foreground group-hover:text-primary"
                    )}>
                        {title}
                    </h3>
                    <p className="text-muted-foreground mb-4 line-clamp-2 text-sm leading-relaxed">
                        {description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-auto" role="list" aria-label="Project tags">
                        {tags.map((tag: string, i: number) => (
                            <span
                                key={`${tag}-${i}`}
                                className={cn(
                                    "text-xs px-2 py-1 rounded-full border transition-colors",
                                    isComingSoon
                                        ? "bg-muted/10 text-muted-foreground border-muted/20"
                                        : "bg-primary/10 text-primary border-primary/20"
                                )}
                                role="listitem"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </motion.button>
        )
    }
)
ProjectCardPreview.displayName = "ProjectCardPreview"
