"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useI18n } from "@/lib/i18n-utils"

export type ProjectFilterId = "all" | "web" | "ui" | "mobile" | "branding"

interface ProjectFilterProps {
  activeFilter: ProjectFilterId
  onFilterChange: (filter: ProjectFilterId) => void
}

interface ProjectFilter {
  id: ProjectFilterId
  translationKey: string
}

export function ProjectFilter({ activeFilter, onFilterChange }: ProjectFilterProps) {
  const { t } = useI18n()

  const filters: ProjectFilter[] = [
    { id: "all", translationKey: "pages.projects.filters.all" },
    { id: "web", translationKey: "pages.projects.filters.web" },
    { id: "ui", translationKey: "pages.projects.filters.ui" },
    { id: "mobile", translationKey: "pages.projects.filters.mobile" },
    { id: "branding", translationKey: "pages.projects.filters.branding" },
  ]

  return (
    <nav
      className="flex flex-wrap justify-center gap-2 mb-8"
      aria-label="Project category filters"
    >
      {filters.map((filter) => (
        <motion.div
          key={filter.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant={activeFilter === filter.id ? "default" : "outline"}
            size="sm"
            onClick={() => onFilterChange(filter.id)}
            className="rounded-full"
            type="button"
            aria-pressed={activeFilter === filter.id}
            aria-label={`Filter by ${t(filter.translationKey)}`}
          >
            {t(filter.translationKey)}
          </Button>
        </motion.div>
      ))}
    </nav>
  )
}
