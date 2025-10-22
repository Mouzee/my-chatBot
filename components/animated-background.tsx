"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

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

    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
    }> = []

    // Create more particles for denser effect
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.3,
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const isDark = document.documentElement.classList.contains("dark")

      // Update and draw particles with enhanced visuals
      particles.forEach((particle, i) => {
        particle.x += particle.vx
        particle.y += particle.vy

        // Smooth bounce with damping
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.vx *= -0.95
          particle.x = Math.max(0, Math.min(canvas.width, particle.x))
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.vy *= -0.95
          particle.y = Math.max(0, Math.min(canvas.height, particle.y))
        }

        // Draw particle with glow effect
        const gradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.size * 3)

        if (isDark) {
          gradient.addColorStop(0, `rgba(34, 211, 238, ${particle.opacity})`)
          gradient.addColorStop(0.5, `rgba(34, 211, 238, ${particle.opacity * 0.3})`)
          gradient.addColorStop(1, "rgba(34, 211, 238, 0)")
        } else {
          gradient.addColorStop(0, `rgba(8, 145, 178, ${particle.opacity * 0.6})`)
          gradient.addColorStop(0.5, `rgba(8, 145, 178, ${particle.opacity * 0.2})`)
          gradient.addColorStop(1, "rgba(8, 145, 178, 0)")
        }

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        // Draw connections with gradient lines
        particles.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 120) {
            const lineGradient = ctx.createLinearGradient(particle.x, particle.y, otherParticle.x, otherParticle.y)

            const opacity = (1 - distance / 120) * 0.15

            if (isDark) {
              lineGradient.addColorStop(0, `rgba(34, 211, 238, ${opacity})`)
              lineGradient.addColorStop(1, `rgba(103, 232, 249, ${opacity})`)
            } else {
              lineGradient.addColorStop(0, `rgba(8, 145, 178, ${opacity * 0.8})`)
              lineGradient.addColorStop(1, `rgba(6, 182, 212, ${opacity * 0.8})`)
            }

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

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(circle at 20% 30%, rgba(34, 211, 238, 0.08) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 70%, rgba(103, 232, 249, 0.08) 0%, transparent 50%)",
            "radial-gradient(circle at 40% 80%, rgba(6, 182, 212, 0.08) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 30%, rgba(34, 211, 238, 0.08) 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />

      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(34, 211, 238, 0.4) 0%, transparent 70%)",
        }}
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -80, 60, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 25,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-15"
        style={{
          background: "radial-gradient(circle, rgba(103, 232, 249, 0.4) 0%, transparent 70%)",
        }}
        animate={{
          x: [0, -120, 80, 0],
          y: [0, 100, -70, 0],
          scale: [1, 0.8, 1.3, 1],
        }}
        transition={{
          duration: 30,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-1/2 right-1/3 w-72 h-72 rounded-full blur-3xl opacity-10"
        style={{
          background: "radial-gradient(circle, rgba(6, 182, 212, 0.4) 0%, transparent 70%)",
        }}
        animate={{
          x: [0, 90, -60, 0],
          y: [0, -90, 50, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 28,
          repeat: Number.POSITIVE_INFINITY,
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
          repeat: Number.POSITIVE_INFINITY,
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
            repeat: Number.POSITIVE_INFINITY,
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
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>
    </div>
  )
}
