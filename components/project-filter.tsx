"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useTranslation } from "react-i18next"

export type ProjectFilterId = "all" | "web" | "ui" | "mobile"

interface ProjectFilter {
  id: ProjectFilterId
  translationKey: string
}

export function ProjectFilter({ activeFilter, onFilterChange }: ProjectFilterProps): JSX.Element {
  const filters = [
    { id: "all", label: "All" },
    { id: "web", label: "Web Projects" },
    { id: "ui", label: "UI/UX Design" },
    { id: "mobile", label: "Mobile Apps" },
  ];

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
