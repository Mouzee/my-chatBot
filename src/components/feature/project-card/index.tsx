"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Drawer,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { ANIMATION } from "@/lib/constants"
import type { ProjectCardProps } from "@/types"
import { useProjectCarousel } from "@/hooks/use-project-carousel"
import { ProjectCardPreview } from "./project-card-preview"
import { ProjectDetailsView } from "./project-details-view"

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
  slideInterval,
  details,
  isComingSoon = false,
}: ProjectCardProps) {

  const [open, setOpen] = useState(false)

  const carousel = useProjectCarousel({
    imageSrc,
    autoSlide,
    slideInterval,
    open
  })

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: ANIMATION.DURATION.NORMAL, delay }}
    >
      <Drawer open={open} onOpenChange={isComingSoon ? undefined : setOpen}>
        <DrawerTrigger asChild>
          <ProjectCardPreview
            title={title}
            description={description}
            tags={tags}
            image={carousel.images[0]}
            isComingSoon={isComingSoon}
          />
        </DrawerTrigger>

        {!isComingSoon && (
          <ProjectDetailsView
            title={title}
            description={description}
            details={details}
            link={link}
            githubLink={githubLink}
            images={carousel.images}
            currentImage={carousel.currentImage}
            setCurrentImage={carousel.setCurrentImage}
            handlePrev={carousel.handlePrev}
            handleNext={carousel.handleNext}
            hasMultipleImages={carousel.hasMultipleImages}
            onClose={() => setOpen(false)}
          />
        )}
      </Drawer>
    </motion.article>
  )
}
