
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ExternalLink, Github, ChevronLeft, ChevronRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerDescription,
} from "@/components/ui/drawer"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { PROJECT, ANIMATION } from "@/lib/constants"
import type { ProjectDetails } from "@/types"

interface ProjectDetailsViewProps {
    title: string
    description: string
    details?: ProjectDetails
    images: string[]
    currentImage: number
    setCurrentImage: (index: number) => void
    handlePrev: () => void
    handleNext: () => void
    hasMultipleImages: boolean
    link?: string
    githubLink?: string
    onClose: () => void
}

export function ProjectDetailsView({
    title,
    description,
    details,
    images,
    currentImage,
    setCurrentImage,
    handlePrev,
    handleNext,
    hasMultipleImages,
    link,
    githubLink,
    onClose,
}: ProjectDetailsViewProps) {
    return (
        <DrawerContent
            className={cn(
                "fixed inset-0 z-50 flex items-center justify-center p-0 border-none shadow-none rounded-none",
                "animate-in fade-in-0 slide-in-from-bottom-12"
            )}
            style={{ minHeight: "100vh", height: "100vh", maxHeight: "100vh" }}
        >
            <div
                className={cn(
                    "flex flex-col w-full h-full items-center justify-center",
                    "relative overflow-hidden"
                )}
            >
                <div
                    className={cn(
                        "bg-background w-full max-w-5xl h-full mx-auto flex flex-col justify-center items-center",
                        "shadow-xl rounded-xl p-0",
                        "overflow-hidden"
                    )}
                    style={{
                        maxHeight: "100vh",
                        height: "100%",
                        margin: "0 auto",
                    }}
                >
                    {/* Close button */}
                    <Button
                        onClick={onClose}
                        variant="ghost"
                        size="icon"
                        className="absolute top-4 right-4 z-20 bg-black/60 text-white rounded-full hover:bg-black/80 transition"
                        aria-label="Close project details"
                        type="button"
                    >
                        <X className="w-5 h-5" aria-hidden="true" />
                    </Button>
                    <DrawerHeader className="px-10 pt-12 pb-4 w-full flex flex-col items-center border-b border-border">
                        <DrawerTitle className="text-3xl font-bold tracking-tight text-center">
                            {title}
                        </DrawerTitle>
                        <DrawerDescription className="text-muted-foreground text-lg text-center mt-2">
                            {description}
                        </DrawerDescription>
                    </DrawerHeader>
                    {/* Scrollable main area */}
                    <ScrollArea
                        className="grow px-8 py-8 w-full flex flex-col items-center"
                        style={{ height: "calc(100vh - 84px)", minHeight: "0" }}
                    >
                        {/* Image carousel section */}
                        <div className="w-full flex flex-col items-center justify-center mt-2">
                            <div className="relative w-full max-w-3xl aspect-video rounded-xl overflow-hidden bg-muted/20 shadow-inner">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={images[currentImage]}
                                        initial={{ opacity: 0, x: 40 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -40 }}
                                        transition={{ duration: ANIMATION.DURATION.NORMAL }}
                                        className="absolute inset-0"
                                    >
                                        <Image
                                            src={images[currentImage] || PROJECT.PLACEHOLDER_IMAGE}
                                            alt={`${title} - Image ${currentImage + 1} of ${images.length}`}
                                            fill
                                            className="object-cover"
                                        />
                                    </motion.div>
                                </AnimatePresence>

                                {hasMultipleImages && (
                                    <>
                                        <Button
                                            onClick={handlePrev}
                                            variant="ghost"
                                            size="icon"
                                            className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full hover:bg-black/70 transition"
                                            aria-label="Previous image"
                                            type="button"
                                        >
                                            <ChevronLeft className="w-6 h-6" aria-hidden="true" />
                                        </Button>
                                        <Button
                                            onClick={handleNext}
                                            variant="ghost"
                                            size="icon"
                                            className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full hover:bg-black/70 transition"
                                            aria-label="Next image"
                                            type="button"
                                        >
                                            <ChevronRight className="w-6 h-6" aria-hidden="true" />
                                        </Button>
                                    </>
                                )}

                                {/* Thumbnails overlay */}
                                {hasMultipleImages && (
                                    <div
                                        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-black/40 rounded-xl px-3 py-2"
                                        style={{ zIndex: 12 }}
                                        role="tablist"
                                        aria-label="Image thumbnails"
                                    >
                                        {images.map((img, i) => (
                                            <button
                                                key={i}
                                                type="button"
                                                role="tab"
                                                aria-label={`Select image ${i + 1}`}
                                                aria-selected={currentImage === i}
                                                onClick={() => setCurrentImage(i)}
                                                className={cn(
                                                    "relative w-14 h-9 rounded overflow-hidden border-2 transition-all duration-300",
                                                    currentImage === i
                                                        ? "border-primary shadow-lg"
                                                        : "border-transparent opacity-75 hover:opacity-100"
                                                )}
                                            >
                                                <Image
                                                    src={img || PROJECT.PLACEHOLDER_IMAGE}
                                                    alt={`${title} thumbnail ${i + 1}`}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Carousel dots indicator */}
                            {hasMultipleImages && (
                                <div className="flex justify-center gap-2 mt-4" role="tablist" aria-label="Image indicators">
                                    {images.map((_, i) => (
                                        <button
                                            key={i}
                                            type="button"
                                            role="tab"
                                            aria-label={`Go to image ${i + 1}`}
                                            aria-selected={currentImage === i}
                                            onClick={() => setCurrentImage(i)}
                                            className={cn(
                                                "w-3 h-3 rounded-full transition-all duration-300",
                                                currentImage === i
                                                    ? "bg-primary scale-110"
                                                    : "bg-muted hover:bg-muted-foreground/40"
                                            )}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Project details section */}
                        <div className="mt-8 max-w-5xl mx-auto space-y-8">
                            {details?.overview && (
                                <section>
                                    <h4 className="text-lg font-semibold mb-2">Overview</h4>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {details.overview}
                                    </p>
                                </section>
                            )}

                            {details?.features && details.features.length > 0 && (
                                <section>
                                    <h4 className="text-lg font-semibold mb-2">Key Features</h4>
                                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                                        {details.features.map((feature, i) => (
                                            <li key={`feature-${i}`}>{feature}</li>
                                        ))}
                                    </ul>
                                </section>
                            )}

                            {details?.technologies && details.technologies.length > 0 && (
                                <section>
                                    <h4 className="text-lg font-semibold mb-2">Technologies Used</h4>
                                    <div className="flex flex-wrap gap-2" role="list" aria-label="Technologies">
                                        {details.technologies.map((tech, i) => (
                                            <span
                                                key={`tech-${i}`}
                                                className="px-3 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground"
                                                role="listitem"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {details?.challenges && (
                                <section>
                                    <h4 className="text-lg font-semibold mb-2">Challenges</h4>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {details.challenges}
                                    </p>
                                </section>
                            )}

                            {details?.results && (
                                <section>
                                    <h4 className="text-lg font-semibold mb-2">Results</h4>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {details.results}
                                    </p>
                                </section>
                            )}

                            {/* Action buttons */}
                            <div className="flex gap-3 justify-center md:justify-end mt-8">
                                {link && (
                                    <Button asChild variant="outline" aria-label={`View live demo of ${title}`}>
                                        <Link
                                            href={link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2"
                                        >
                                            Live Demo <ExternalLink className="w-4 h-4" aria-hidden="true" />
                                        </Link>
                                    </Button>
                                )}
                                {githubLink && (
                                    <Button asChild variant="outline" aria-label={`View source code for ${title}`}>
                                        <Link
                                            href={githubLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2"
                                        >
                                            Code <Github className="w-4 h-4" aria-hidden="true" />
                                        </Link>
                                    </Button>
                                )}
                            </div>
                        </div>
                    </ScrollArea>
                </div>
            </div>
        </DrawerContent>
    )
}
