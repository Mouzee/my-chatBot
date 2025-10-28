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
import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  title: string;
  description: string;
  tags?: string[];
  images: string[];
  link?: string;
  githubLink?: string;
  delay?: number;
  autoSlide?: boolean;
  slideInterval?: number;
}

export function ProjectCard({
  title,
  description,
  tags = [],
  images = [],
  link,
  githubLink,
  delay = 0,
  autoSlide = true,
  slideInterval = 4000,
}: ProjectCardProps) {
  const [open, setOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const handleNext = useCallback(
    () => setCurrentImage((prev) => (prev + 1) % images.length),
    [images.length]
  );
  const handlePrev = useCallback(
    () => setCurrentImage((prev) => (prev - 1 + images.length) % images.length),
    [images.length]
  );

  // Auto-slide effect
  useEffect(() => {
    if (!autoSlide || !open) return;
    const interval = setInterval(handleNext, slideInterval);
    return () => clearInterval(interval);
  }, [handleNext, open, autoSlide, slideInterval]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay }}
    >
      <Drawer open={open} onOpenChange={setOpen}>
        {/* ==== Project Card ==== */}
        <DrawerTrigger asChild>
          <motion.div
            whileHover={{ y: -10, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 250 }}
            className="group relative bg-gradient-to-br from-card to-muted rounded-xl overflow-hidden shadow-md border border-border cursor-pointer h-full flex flex-col backdrop-blur-md"
          >
            <div className="relative h-52 w-full overflow-hidden">
              <Image
                src={images?.[0] || "/placeholder.svg"}
                alt={title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
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
                    className="text-xs px-2 py-1 rounded-full bg-muted/80 text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </DrawerTrigger>

        {/* ==== Drawer Content ==== */}
        <DrawerContent className="max-h-[92vh] border-t border-border bg-background/95 backdrop-blur-xl shadow-2xl">
          <DrawerHeader className="px-8 pt-6">
            <DrawerTitle className="text-2xl font-bold">{title}</DrawerTitle>
            <DrawerDescription className="text-muted-foreground text-base">
              {description}
            </DrawerDescription>
          </DrawerHeader>

          {/* === Image Carousel Section === */}
          <div className="relative mt-6 px-8 w-full flex flex-col items-center">
            <div className="relative w-full max-w-5xl aspect-[16/9] rounded-xl overflow-hidden bg-muted/20 shadow-inner">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImage}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={images[currentImage]}
                    alt={`Slide ${currentImage + 1}`}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>

              {images.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>

            {/* === Dots Indicator === */}
            {images.length > 1 && (
              <div className="flex justify-center gap-2 mt-4">
                {images.map((_, i) => (
                  <button
                    key={i}
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

            {/* === Thumbnails === */}
            {images.length > 1 && (
              <div className="flex justify-center gap-3 mt-5 overflow-x-auto pb-4 scrollbar-hide">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImage(i)}
                    className={cn(
                      "relative w-28 h-20 rounded-md overflow-hidden border-2 transition-all duration-300",
                      currentImage === i
                        ? "border-primary shadow-lg"
                        : "border-transparent opacity-70 hover:opacity-100"
                    )}
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* === Footer Actions === */}
          <div className="px-8 py-6 border-t border-border mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
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

            <div className="flex gap-3">
              {link && (
                <Button asChild variant="outline">
                  <Link href={link} target="_blank" className="flex items-center gap-2">
                    Live Demo <ExternalLink className="w-4 h-4" />
                  </Link>
                </Button>
              )}
              {githubLink && (
                <Button asChild variant="outline">
                  <Link href={githubLink} target="_blank" className="flex items-center gap-2">
                    Code <Github className="w-4 h-4" />
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </motion.div>
  );
}
