"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface ProjectFilterProps {
  activeFilter: string;
  onFilterChange: (filterId: string) => void;
}

export function ProjectFilter({ activeFilter, onFilterChange }: ProjectFilterProps): JSX.Element {
  const filters = [
    { id: "all", label: "All" },
    { id: "web", label: "Web Projects" },
    { id: "ui", label: "UI/UX Design" },
    { id: "mobile", label: "Mobile Apps" },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-2 mb-8">
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
          >
            {filter.label}
          </Button>
        </motion.div>
      ))}
    </div>
  );
}
