
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
                className="group relative rounded-xl overflow-hidden shadow-none border border-border cursor-pointer h-full flex flex-col backdrop-blur-lg w-full text-left"
                aria-label={`View details for ${title}`}
            >
                <div className="relative h-52 w-full overflow-hidden flex items-center justify-center">
                    <Image
                        src={image}
                        alt={`${title} preview`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 rounded-lg bg-linear-to-t from-black/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="p-6 flex flex-col grow z-10">
                    <h3 className="text-xl font-semibold mb-1">{title}</h3>
                    <p className="text-muted-foreground mb-3 line-clamp-2">
                        {description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-auto" role="list" aria-label="Project tags">
                        {tags.map((tag, i) => (
                            <span
                                key={`${tag}-${i}`}
                                className="text-xs py-1 rounded-lg text-muted-foreground"
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
