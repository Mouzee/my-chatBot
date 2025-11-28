"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Github,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState, useEffect, useCallback, useMemo } from "react";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  title: string;
  description: string;
  tags?: string[];
  imageSrc?: string | string[];
  link?: string;
  githubLink?: string;
  delay?: number;
  autoSlide?: boolean;
  slideInterval?: number;
  details?: {
    overview?: string;
    features?: string[];
    technologies?: string[];
    challenges?: string;
    results?: string;
  };
}

export function ProjectCard({
  title,
  description,
  tags = [],
  imageSrc,
  link,
  githubLink,
  delay = 0,
  autoSlide = true,
  slideInterval = 4000,
  details,
}: ProjectCardProps) {
  // Handle imageSrc input - convert to array if not already (for robustness)
  const images = useMemo(() => {
    if (!imageSrc) return ["/placeholder.svg"];
    if (Array.isArray(imageSrc)) {
      // filter any empty or invalid strings
      return imageSrc.length > 0 ? imageSrc.filter(Boolean) : ["/placeholder.svg"];
    }
    if (typeof imageSrc === "string") {
      return [imageSrc || "/placeholder.svg"];
    }
    return ["/placeholder.svg"];
  }, [imageSrc]);

  const hasValidImages =
    images &&
    images.length > 0 &&
    images.every((img) => typeof img === "string" && img.length > 0);

  const [open, setOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  // Reset to first image when switching projects/dialog opens
  useEffect(() => {
    if (open) setCurrentImage(0);
  }, [open]);

  const handleNext = useCallback(
    () => setCurrentImage((prev) => (prev + 1) % images.length),
    [images.length]
  );
  const handlePrev = useCallback(
    () => setCurrentImage((prev) => (prev - 1 + images.length) % images.length),
    [images.length]
  );

  // Auto-slide
  useEffect(() => {
    if (!autoSlide || !open || images.length < 2) return;
    const interval = setInterval(handleNext, slideInterval);
    return () => clearInterval(interval);
  }, [handleNext, open, autoSlide, slideInterval, images.length]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay }}
      data-imagesrc={JSON.stringify(imageSrc)}
      data-images={JSON.stringify(images)}
    >
      <Drawer open={open} onOpenChange={setOpen}>
        {/* ==== Project Card ==== */}
        <DrawerTrigger asChild>
          <motion.div
            whileHover={{ y: -10, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 250 }}
            className="group relative rounded-xl overflow-hidden shadow-none border border-border cursor-pointer h-full flex flex-col backdrop-blur-lg"
            data-images-count={images.length}
            data-has-images={hasValidImages}
          >
            {/* Move thumbnail into the carousel in the drawer.
                For the card, show just a static muted background and icon (or placeholder image as before). */}
            <div className="relative h-52 w-full overflow-hidden flex items-center justify-center">
              {/* Option 1: Just a placeholder image */}
              <Image
                src={images[0] || "/placeholder.svg"}
                alt={title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                data-testid="project-card-thumbnail"
              />
              <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-black/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <div className="p-6 flex flex-col flex-grow z-10">
              <h3 className="text-xl font-semibold mb-1">{title}</h3>
              <p className="text-muted-foreground mb-3 line-clamp-2">
                {description}
              </p>
              <div className="flex flex-wrap gap-2 mt-auto">
                {tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs py-1 rounded-lg text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </DrawerTrigger>

        {/* ==== Drawer Content (Full Screen & Centered) ==== */}
        <DrawerContent
          className={cn(
            "fixed inset-0 z-50 flex items-center justify-center p-0 border-none shadow-none rounded-none",
            "animate-in fade-in-0 slide-in-from-bottom-12"
          )}
          style={{ minHeight: "100vh", height: "100vh", maxHeight: "100vh" }}
        >
          {/* Center container */}
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
              {/* Close button top right */}
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="absolute top-4 right-4 z-20 bg-black/60 text-white rounded-full p-2 hover:bg-black/80 transition"
                type="button"
              >
                <svg
                  viewBox="0 0 20 20"
                  fill="none"
                  className="w-5 h-5"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 6l8 8M6 14L14 6"
                  />
                </svg>
              </button>
              <DrawerHeader className="px-10 pt-12 pb-4 w-full flex flex-col items-center border-b border-border">
                <DrawerTitle className="text-3xl font-bold tracking-tight text-center">
                  {title}
                </DrawerTitle>
                <DrawerDescription className="text-muted-foreground text-lg text-center mt-2">
                  {description}
                </DrawerDescription>
              </DrawerHeader>
              {/* === Scrollable Main Area === */}
              <ScrollArea
                className="flex-grow px-8 py-8 w-full flex flex-col items-center"
                style={{ height: "calc(100vh - 84px)", minHeight: "0" }}
              >
                {/* === Image Carousel Section (WITH THUMBNAILS INSIDE) === */}
                <div className="w-full flex flex-col items-center justify-center mt-2" data-test="carousel-outer">
                  <div className="relative w-full max-w-3xl aspect-[16/9] rounded-xl overflow-hidden bg-muted/20 shadow-inner">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={images[currentImage]}
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -40 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0"
                        data-testid="carousel-image"
                      >
                        <Image
                          src={images[currentImage] || "/placeholder.svg"}
                          alt={`Slide ${currentImage + 1} for ${title}`}
                          fill
                          className="object-cover"
                          data-testid={`carousel-image-${currentImage}`}
                        />
                      </motion.div>
                    </AnimatePresence>
                    {images.length > 1 && (
                      <>
                        <button
                          onClick={handlePrev}
                          className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition"
                          aria-label="Previous image"
                          type="button"
                        >
                          <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                          onClick={handleNext}
                          className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition"
                          aria-label="Next image"
                          type="button"
                        >
                          <ChevronRight className="w-6 h-6" />
                        </button>
                      </>
                    )}
                    {/* ---- Thumbnails moved inside the carousel (bottom, overlay on the image) ---- */}
                    {images.length > 1 && (
                      <div
                        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-black/40 rounded-xl px-3 py-2"
                        style={{ zIndex: 12 }}
                        data-testid="carousel-thumbnails"
                      >
                        {images.map((img, i) => (
                          <button
                            key={i}
                            type="button"
                            aria-label={`Select image ${i + 1}`}
                            onClick={() => setCurrentImage(i)}
                            className={cn(
                              "relative w-14 h-9 rounded overflow-hidden border-2 transition-all duration-300",
                              currentImage === i
                                ? "border-primary shadow-lg"
                                : "border-transparent opacity-75 hover:opacity-100"
                            )}
                            data-active={currentImage === i}
                          >
                            <Image
                              src={img || "/placeholder.svg"}
                              alt={`Thumbnail ${i + 1} for ${title}`}
                              fill
                              className="object-cover"
                              data-testid={`carousel-thumbnail-${i}`}
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  {/* === Carousel Dots below carousel (leave as is) === */}
                  {images.length > 1 && (
                    <div className="flex justify-center gap-2 mt-4" data-testid="carousel-dots">
                      {images.map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          aria-label={`Go to image ${i + 1}`}
                          onClick={() => setCurrentImage(i)}
                          className={cn(
                            "w-3 h-3 rounded-full transition-all duration-300",
                            currentImage === i
                              ? "bg-primary scale-110"
                              : "bg-muted hover:bg-muted-foreground/40"
                          )}
                          data-active={currentImage === i}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* === Project Info Section === */}
                <div className="mt-8 max-w-5xl mx-auto space-y-8">
                  {/* Overview */}
                  {details?.overview && (
                    <section>
                      <h4 className="text-lg font-semibold mb-2">Overview</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {details.overview}
                      </p>
                    </section>
                  )}

                  {/* Features */}
                  {details?.features && details.features.length > 0 && (
                    <section>
                      <h4 className="text-lg font-semibold mb-2">Key Features</h4>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        {details.features.map((feature, i) => (
                          <li key={i}>{feature}</li>
                        ))}
                      </ul>
                    </section>
                  )}

                  {/* Technologies */}
                  {details?.technologies && details.technologies.length > 0 && (
                    <section>
                      <h4 className="text-lg font-semibold mb-2">Technologies Used</h4>
                      <div className="flex flex-wrap gap-2">
                        {details.technologies.map((tech, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Challenges */}
                  {details?.challenges && (
                    <section>
                      <h4 className="text-lg font-semibold mb-2">Challenges</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {details.challenges}
                      </p>
                    </section>
                  )}

                  {/* Results */}
                  {details?.results && (
                    <section>
                      <h4 className="text-lg font-semibold mb-2">Results</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {details.results}
                      </p>
                    </section>
                  )}
                </div>

                {/* === Action Buttons === */}
                <div className="max-w-5xl mx-auto mt-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-t border-border pt-6">
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                      <span
                        key={tag + index}
                        className="text-xs px-2 py-1 bg-muted rounded-full text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3 justify-center md:justify-end">
                    {link && (
                      <Button asChild variant="outline">
                        <Link
                          href={link}
                          target="_blank"
                          className="flex items-center gap-2"
                        >
                          Live Demo/Case Study <ExternalLink className="w-4 h-4" />
                        </Link>
                      </Button>
                    )}
                    {githubLink && (
                      <Button asChild variant="outline">
                        <Link
                          href={githubLink}
                          target="_blank"
                          className="flex items-center gap-2"
                        >
                          Code <Github className="w-4 h-4" />
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
    </motion.div>
  );
}
