"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "framer-motion"
import { ANIMATED_COUNTER } from "@/lib/constants"

interface AnimatedCounterProps {
  from: number
  to: number
  duration?: number
}

/**
 * Animated counter component that counts from a starting value to an end value
 * when it comes into view. Uses 60fps animation for smooth counting.
 */
export function AnimatedCounter({ 
  from, 
  to, 
  duration = ANIMATED_COUNTER.DEFAULT_DURATION 
}: AnimatedCounterProps) {
  const [count, setCount] = useState(from)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  
  const frameRate = 1000 / ANIMATED_COUNTER.FRAME_RATE
  const totalFrames = Math.round(duration * ANIMATED_COUNTER.FRAME_RATE)

  useEffect(() => {
    if (!isInView) return

    let frame = 0

    const counter = setInterval(() => {
      frame++
      const progress = frame / totalFrames
      const currentCount = Math.round(from + (to - from) * progress)

      if (frame === totalFrames) {
        clearInterval(counter)
        setCount(to)
      } else {
        setCount(currentCount)
      }
    }, frameRate)

    return () => clearInterval(counter)
  }, [from, to, totalFrames, frameRate, isInView])

  return <span ref={ref}>{count}</span>
}
