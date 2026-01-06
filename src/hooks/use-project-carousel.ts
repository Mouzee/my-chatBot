
import { useState, useEffect, useCallback, useMemo } from "react"
import { PROJECT } from "@/lib/constants"

interface UseProjectCarouselProps {
    imageSrc?: string | string[]
    autoSlide?: boolean
    slideInterval?: number
    open?: boolean
}

export function useProjectCarousel({
    imageSrc,
    autoSlide = true,
    slideInterval = PROJECT.DEFAULT_SLIDE_INTERVAL,
    open = false,
}: UseProjectCarouselProps) {

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

    return {
        images,
        currentImage,
        setCurrentImage,
        handleNext,
        handlePrev,
        hasMultipleImages
    }
}
