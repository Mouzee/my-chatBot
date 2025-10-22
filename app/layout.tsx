import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Providers } from "@/components/providers"
import "./globals.css"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Interactive Portfolio",
  description: "Explore my work and skills through an interactive chatbot experience",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>
          <Providers>{children}</Providers>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
