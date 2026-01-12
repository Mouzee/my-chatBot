"use client"

import type React from "react"

import { ThemeProvider } from "@/components/common/theme-provider"
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
      {children}
    </ThemeProvider>
  )
}
