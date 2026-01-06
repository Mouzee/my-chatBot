"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { ANIMATED_BACKGROUND } from "@/lib/constants"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
}

/**
 * Animated background with particle system and gradient effects
 * Creates an interactive canvas-based background with connecting particles
 */
export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const particles: Particle[] = []

    // Initialize particles with constants
    const { PARTICLE_COUNT, PARTICLE } = ANIMATED_BACKGROUND
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * PARTICLE.VELOCITY_RANGE,
        vy: (Math.random() - 0.5) * PARTICLE.VELOCITY_RANGE,
        size: Math.random() * (PARTICLE.MAX_SIZE - PARTICLE.MIN_SIZE) + PARTICLE.MIN_SIZE,
        opacity: Math.random() * (PARTICLE.MAX_OPACITY - PARTICLE.MIN_OPACITY) + PARTICLE.MIN_OPACITY,
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const isDark = document.documentElement.classList.contains("dark")
      const { PARTICLE, COLORS } = ANIMATED_BACKGROUND

      // Update and draw particles
      particles.forEach((particle, i) => {
        particle.x += particle.vx
        particle.y += particle.vy

        // Bounce with damping
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.vx *= -PARTICLE.BOUNCE_DAMPING
          particle.x = Math.max(0, Math.min(canvas.width, particle.x))
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.vy *= -PARTICLE.BOUNCE_DAMPING
          particle.y = Math.max(0, Math.min(canvas.height, particle.y))
        }

        // Draw particle with glow effect
        const gradient = ctx.createRadialGradient(
          particle.x, 
          particle.y, 
          0, 
          particle.x, 
          particle.y, 
          particle.size * 3
        )

        const colors = isDark ? COLORS.DARK : COLORS.LIGHT
        gradient.addColorStop(0, `${colors.PRIMARY}${particle.opacity})`)
        gradient.addColorStop(0.5, `${colors.PRIMARY}${particle.opacity * (isDark ? 0.3 : 0.6)})`)
        gradient.addColorStop(1, `${colors.PRIMARY}0)`)

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        // Draw connections between nearby particles
        particles.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < PARTICLE.CONNECTION_DISTANCE) {
            const lineGradient = ctx.createLinearGradient(
              particle.x, 
              particle.y, 
              otherParticle.x, 
              otherParticle.y
            )

            const opacity = (1 - distance / PARTICLE.CONNECTION_DISTANCE) * 0.15
            const connectionColors = isDark ? COLORS.DARK : COLORS.LIGHT

            lineGradient.addColorStop(0, `${connectionColors.PRIMARY}${opacity})`)
            lineGradient.addColorStop(1, `${connectionColors.SECONDARY}${opacity})`)

            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.strokeStyle = lineGradient
            ctx.lineWidth = 0.8
            ctx.stroke()
          }
        })
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  const { COLORS } = ANIMATED_BACKGROUND

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            `radial-gradient(circle at 20% 30%, ${COLORS.DARK.PRIMARY}0.08) 0%, transparent 50%)`,
            `radial-gradient(circle at 80% 70%, ${COLORS.DARK.SECONDARY}0.08) 0%, transparent 50%)`,
            `radial-gradient(circle at 40% 80%, ${COLORS.DARK.TERTIARY}0.08) 0%, transparent 50%)`,
            `radial-gradient(circle at 20% 30%, ${COLORS.DARK.PRIMARY}0.08) 0%, transparent 50%)`,
          ],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20"
        style={{
          background: `radial-gradient(circle, ${COLORS.DARK.PRIMARY}0.4) 0%, transparent 70%)`,
        }}
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -80, 60, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-15"
        style={{
          background: `radial-gradient(circle, ${COLORS.DARK.SECONDARY}0.4) 0%, transparent 70%)`,
        }}
        animate={{
          x: [0, -120, 80, 0],
          y: [0, 100, -70, 0],
          scale: [1, 0.8, 1.3, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-1/2 right-1/3 w-72 h-72 rounded-full blur-3xl opacity-10"
        style={{
          background: `radial-gradient(circle, ${COLORS.DARK.TERTIARY}0.4) 0%, transparent 70%)`,
        }}
        animate={{
          x: [0, 90, -60, 0],
          y: [0, -90, 50, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <canvas ref={canvasRef} className="absolute inset-0" />

      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background/90"
        animate={{
          opacity: [0.8, 0.9, 0.8],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="absolute inset-0 opacity-30">
        <motion.div
          className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-primary/20 to-transparent"
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scaleY: [1, 1.2, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-accent/20 to-transparent"
          animate={{
            opacity: [0.4, 0.7, 0.4],
            scaleY: [1, 1.3, 1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>
    </div>
  )
}
