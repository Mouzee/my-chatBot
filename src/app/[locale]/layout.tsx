import type React from "react"
import type { Metadata, Viewport } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Providers } from "@/components/common/providers"
import "../globals.css"
import { Suspense } from "react"
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Script from "next/script"

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  width: "device-width",
  initialScale: 1,
}

export const metadata: Metadata = {
  title: {
    default: "Shafeek Ali UI/UX Designer, Frontend Developer",
    template: "%s | Shafeek Ali"
  },
  description: "Explore my work and skills through an interactive chatbot experience",
  applicationName: "Shafeek Ali Portfolio",
  authors: [{ name: "Shafeek Ali", url: "https://mouzee.tech" }],
  generator: "mouzee.tech",
  keywords: ["Shafeek Ali", "Portfolio", "Frontend Developer", "UI/UX", "React", "Next.js", "Chatbot", "Software Engineer"],
  creator: "Shafeek Ali",
  publisher: "Shafeek Ali",
  metadataBase: new URL('https://mouzee.tech'),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mouzee.tech",
    title: "Shafeek Ali Portfolio",
    description: "Explore my work and skills through an interactive chatbot experience",
    siteName: "Shafeek Ali Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Shafeek Ali Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shafeek Ali Portfolio",
    description: "Explore my work and skills through an interactive chatbot experience",
    creator: "@shafeekali",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as "en" | "ar")) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
  const direction = locale === 'ar' ? 'rtl' : 'ltr';
  const gaId = process.env.NEXT_PUBLIC_GA_ID || '';

  return (
    <html lang={locale} dir={direction} suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <Suspense fallback={null}>
            <Providers>{children}</Providers>
          </Suspense>
        </NextIntlClientProvider>
        <Analytics />
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  )
}
