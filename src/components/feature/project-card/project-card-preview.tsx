
import Image from "next/image"
import { motion } from "framer-motion"
import { forwardRef } from "react"

interface ProjectCardPreviewProps {
    title: string
    description: string
    tags: string[]
    image: string
    [key: string]: any
}

export const ProjectCardPreview = forwardRef<HTMLButtonElement, ProjectCardPreviewProps>(
    ({ title, description, tags, image, ...props }, ref) => {
        return (
            <motion.button
                ref={ref}
                {...props}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 250 }}
                className="glass-card group relative overflow-hidden cursor-pointer h-full flex flex-col w-full text-left bg-glass-bg border-glass-border shadow-lg"
                aria-label={`View details for ${title}`}
            >
                <div className="relative h-52 w-full overflow-hidden flex items-center justify-center">
                    <Image
                        src={image}
                        alt={`${title} preview`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="p-6 flex flex-col grow z-10">
                    <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">{title}</h3>
                    <p className="text-muted-foreground mb-4 line-clamp-2 text-sm leading-relaxed">
                        {description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-auto" role="list" aria-label="Project tags">
                        {tags.map((tag, i) => (
                            <span
                                key={`${tag}-${i}`}
                                className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
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
