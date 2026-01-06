"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

interface TimelineItem {
  title: string
  company?: string
  period: string
  description: string
  achievements?: string[]
  tags?: string[]
}

interface TimelineProps {
  items: TimelineItem[]
}

export function Timeline({ items }: TimelineProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  })

  return (
    <div ref={ref} className="relative">
      {/* Vertical line */}
      <div className="absolute left-8 top-0 bottom-0 w-[2px] bg-border/30" />

      {/* Animated progress line */}
      <motion.div
        className="absolute left-8 top-0 w-[2px] bg-gradient-to-b from-primary via-primary/80 to-primary/60"
        style={{
          height: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]),
        }}
      />

      <div className="space-y-12">
        {items.map((item, index) => (
          <TimelineItem key={index} item={item} index={index} />
        ))}
      </div>
    </div>
  )
}

function TimelineItem({ item, index }: { item: TimelineItem; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative pl-20"
    >
      {/* Animated dot */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
        className="absolute left-[26px] top-2 w-4 h-4 rounded-full bg-primary shadow-lg shadow-primary/50 border-4 border-background"
      />

      {/* Content card */}
      <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }} className="glass-card p-6 space-y-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
              {item.company && <p className="text-primary font-medium mt-1">{item.company}</p>}
            </div>
            <span className="text-sm text-muted-foreground bg-muted/50 px-3 py-1 rounded-full">{item.period}</span>
          </div>
          <p className="text-muted-foreground leading-relaxed">{item.description}</p>
        </div>

        {item.achievements && item.achievements.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-foreground">Key Achievements:</h4>
            <ul className="space-y-1">
              {item.achievements.map((achievement, i) => (
                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {item.tags.map((tag, i) => (
              <span
                key={i}
                className="text-xs px-2 py-1 rounded-md bg-primary/10 text-primary border border-primary/20"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}
