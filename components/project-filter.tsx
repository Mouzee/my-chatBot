"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useTranslation } from "react-i18next"

export type ProjectFilterId = "all" | "web" | "ui" | "mobile"

interface ProjectFilterProps {
  activeFilter: ProjectFilterId
  onFilterChange: (filter: ProjectFilterId) => void
}

interface ProjectFilter {
  id: ProjectFilterId
  translationKey: string
}

export function ProjectFilter({ activeFilter, onFilterChange }: ProjectFilterProps): JSX.Element {
  const { t } = useTranslation()
  
  const filters: ProjectFilter[] = [
    { id: "all", translationKey: "projects.filters.all" },
    { id: "web", translationKey: "projects.filters.web" },
    { id: "ui", translationKey: "projects.filters.ui" },
    { id: "mobile", translationKey: "projects.filters.mobile" },
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
