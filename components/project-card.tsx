"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ExternalLink, Github, ChevronLeft, ChevronRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useState, useEffect, useCallback, useMemo } from "react"
import { cn } from "@/lib/utils"
import { PROJECT, ANIMATION } from "@/lib/constants"

interface ProjectDetails {
  overview?: string
  features?: string[]
  technologies?: string[]
  challenges?: string
  results?: string
}

interface ProjectCardProps {
  title: string
  description: string
  tags?: string[]
  imageSrc?: string | string[]
  link?: string
  githubLink?: string
  delay?: number
  autoSlide?: boolean
  slideInterval?: number
  details?: ProjectDetails
}

/**
 * Project card component with image carousel and detailed drawer view
 * Displays project information with support for multiple images and project details
 */
export function ProjectCard({
  title,
  description,
  tags = [],
  imageSrc,
  link,
  githubLink,
  delay = 0,
  autoSlide = true,
  slideInterval = PROJECT.DEFAULT_SLIDE_INTERVAL,
  details,
}: ProjectCardProps) {
  // Normalize image sources to array format
  const images = useMemo(() => {
    if (!imageSrc) return [PROJECT.PLACEHOLDER_IMAGE]
    if (Array.isArray(imageSrc)) {
      return imageSrc.length > 0 ? imageSrc.filter(Boolean) : [PROJECT.PLACEHOLDER_IMAGE]
    }
    if (typeof imageSrc === "string") {
      return [imageSrc || PROJECT.PLACEHOLDER_IMAGE]
    }
    return [PROJECT.PLACEHOLDER_IMAGE]
  }, [imageSrc])

  const hasMultipleImages = images.length >= PROJECT.MIN_IMAGES_FOR_CAROUSEL
  const [open, setOpen] = useState(false)
  const [currentImage, setCurrentImage] = useState(0)

  // Reset to first image when drawer opens
  useEffect(() => {
    if (open) setCurrentImage(0)
  }, [open])

  const handleNext = useCallback(
    () => setCurrentImage((prev) => (prev + 1) % images.length),
    [images.length]
  )
  
  const handlePrev = useCallback(
    () => setCurrentImage((prev) => (prev - 1 + images.length) % images.length),
    [images.length]
  )

  // Auto-slide functionality
  useEffect(() => {
    if (!autoSlide || !open || !hasMultipleImages) return
    const interval = setInterval(handleNext, slideInterval)
    return () => clearInterval(interval)
  }, [handleNext, open, autoSlide, slideInterval, hasMultipleImages])

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: ANIMATION.DURATION.NORMAL, delay }}
    >
      <Drawer open={open} onOpenChange={setOpen}>
        {/* Project card preview */}
        <DrawerTrigger asChild>
          <motion.button
            whileHover={{ y: -10, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 250 }}
            className="group relative rounded-xl overflow-hidden shadow-none border border-border cursor-pointer h-full flex flex-col backdrop-blur-lg w-full text-left"
            aria-label={`View details for ${title}`}
          >
            <div className="relative h-52 w-full overflow-hidden flex items-center justify-center">
              <Image
                src={images[0] || PROJECT.PLACEHOLDER_IMAGE}
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
        </DrawerTrigger>

        {/* Drawer content - full screen project details */}
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
                onClick={() => setOpen(false)}
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
    </Drawer>
    </motion.article>
  )
}
