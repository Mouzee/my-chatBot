"use client"

import { ExpandableTabs } from "@/components/ui/expandable-tabs"
import { ThemeSwitcher } from "@/components/layout/theme-switcher"
import { LanguageSwitcher } from "@/components/layout/language-switcher"
import { motion } from "framer-motion"
import { User, Briefcase, Code, Mail, Clock, Home, Menu } from "lucide-react"
import { Link } from "@/i18n/routing"
import { useI18n } from "@/lib/i18n-utils"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { usePathname } from "@/i18n/routing"
import { cn } from "@/lib/utils"
import Image from "next/image"


interface PageNavigationProps {
  className?: string
}

export function PageNavigation({ className = "" }: PageNavigationProps) {
  const { t } = useI18n()
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  // Handle scroll effect for glass intensity
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navigationTabs = [
    { title: t("navigation.home"), icon: Home, href: "/" },
    { title: t("navigation.about"), icon: User, href: "/about" },
    { type: "separator" as const },
    { title: t("navigation.projects"), icon: Briefcase, href: "/projects" },
    { title: t("navigation.skills"), icon: Code, href: "/skills" },
    { type: "separator" as const },
    { title: t("navigation.experience"), icon: Clock, href: "/experience" },
    { title: t("navigation.contact"), icon: Mail, href: "/contact" },
  ]

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b",
        scrolled
          ? "glass-surface backdrop-blur-lg border-glass-border py-2"
          : "bg-transparent border-transparent py-4",
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-14">
        {/* Logo / Name */}
        <div className="flex-shrink-0">
          <Link href="/" className="text-lg font-bold tracking-tight hover:text-primary transition-colors">
            <div className="flex items-center gap-2">
              <Image src="/me.svg" alt="Logo" width={40} height={40} className="w-12 h-12 rounded-full lg:w-16 lg:h-16" />
              {/* <span className="text-primary">SAli</span>  */}
            </div>
          </Link>
        </div>

        {/* Desktop Navigation (Centered) */}
        <div className="hidden md:flex items-center justify-center flex-1">
          <ExpandableTabs
            tabs={navigationTabs}
            activeColor="text-primary"
            className="border-none bg-transparent shadow-none p-0 backdrop-blur-none"
          />
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <ThemeSwitcher />
          <LanguageSwitcher />

          {/* Mobile Menu Trigger */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="glass-button w-10 h-10 p-0 border-0 bg-secondary/20 hover:bg-secondary/40">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="glass-surface w-[80%] sm:w-[300px] border-l border-glass-border">
                <nav className="flex flex-col gap-4 mt-8">
                  {navigationTabs.map((item, i) => {
                    if (item.type === "separator") return <div key={i} className="h-px bg-border/50 my-2" />
                    const Icon = item.icon
                    const isActive = pathname === item.href
                    return (
                      <Link
                        key={item.title}
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 px-4 py-3 rounded-xl transition-colors",
                          isActive ? "bg-primary/10 text-primary" : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                        )}
                      >
                        <Icon size={18} />
                        <span className="font-medium">{item.title}</span>
                      </Link>
                    )
                  })}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
