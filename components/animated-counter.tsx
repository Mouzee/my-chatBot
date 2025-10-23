"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "framer-motion"

interface AnimatedCounterProps {
  from: number
  to: number
  duration?: number
}

export function AnimatedCounter({ from, to, duration = 2 }: AnimatedCounterProps) {
  const [count, setCount] = useState(from)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const frameRate = 1000 / 60
  const totalFrames = Math.round(duration * 60)

  useEffect(() => {
    if (isInView) {
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
    }
  }, [from, to, totalFrames, frameRate, isInView])

  return <span ref={ref}>{count}</span>
}
