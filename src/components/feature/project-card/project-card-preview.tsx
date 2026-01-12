
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
                whileHover={isComingSoon ? { y: -5 } : { y: -12, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={cn(
                    "project-card-transparent group relative overflow-hidden h-full flex flex-col w-full text-left rounded-2xl transition-all duration-500 ease-in-out",
                    isComingSoon ? "cursor-default opacity-80" : "cursor-pointer hover:shadow-2xl hover:shadow-primary/20 hover:border-primary/30"
                )}
                aria-label={isComingSoon ? `Coming soon: ${title}` : `View details for ${title}`}
                disabled={isComingSoon}
            >
                <div className="relative h-60 w-full overflow-hidden flex items-center justify-center rounded-t-2xl">
                    <Image
                        src={image}
                        alt={`${title} preview`}
                        fill
                        className={cn(
                            "object-cover transition-transform duration-1000 ease-in-out",
                            !isComingSoon && "group-hover:scale-110",
                            isComingSoon && "blur-[2px] grayscale-[0.5]"
                        )}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                    {isComingSoon && (
                        <div className="absolute inset-0 flex items-center justify-center z-20">
                            <span className="px-5 py-2.5 rounded-full bg-primary/20 backdrop-blur-xl border border-primary/30 text-primary text-xs font-bold tracking-[0.2em] uppercase shadow-lg">
                                Coming Soon
                            </span>
                        </div>
                    )}
                </div>
                <div className="py-7 px-6 flex flex-col grow z-10 transition-all duration-500">
                    <h3 className={cn(
                        "text-xl font-bold mb-2.5 transition-all duration-500 group-hover:translate-x-1.5",
                        isComingSoon ? "text-foreground/70" : "text-foreground group-hover:text-primary tracking-tight"
                    )}>
                        {title}
                    </h3>
                    <p className="text-muted-foreground mb-5 line-clamp-2 text-sm leading-relaxed transition-all duration-500 group-hover:translate-x-1.5 group-hover:text-foreground/90">
                        {description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-auto transition-all duration-500 group-hover:translate-x-1.5" role="list" aria-label="Project tags">
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
