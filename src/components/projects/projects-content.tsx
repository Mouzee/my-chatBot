"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTranslation } from "react-i18next"

import { ProjectCard } from "@/components/feature/project-card"
import { ProjectFilter, type ProjectFilterId } from "@/components/feature/project-filter"
import { projects } from "@/data/projects"
import { ANIMATION } from "@/lib/constants"

export function ProjectsContent() {
    const { t } = useTranslation()
    const [activeFilter, setActiveFilter] = useState<ProjectFilterId>("all")

    const filteredProjects = useMemo(() => {
        if (activeFilter === "all") {
            return projects
        }
        return projects.filter((project) => project.category === activeFilter)
    }, [activeFilter])

    return (
        <section className="min-h-screen flex items-center px-4 py-20">
            <div className="max-w-6xl mx-auto w-full">
                <header className="max-w-3xl mx-auto text-center mb-16">
                    <h1 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
                        {t("projects.title") || "All "}
                        <span className="text-primary">{t("projects.titleHighlight") || "Projects"}</span>
                    </h1>
                    <p className="text-muted-foreground mb-8 leading-relaxed">
                        {t("projects.subtitle") || "A comprehensive showcase of my work across various technologies and design disciplines."}
                    </p>
                    <ProjectFilter activeFilter={activeFilter} onFilterChange={setActiveFilter} />
                </header>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeFilter}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: ANIMATION.DURATION.FAST }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        role="list"
                        aria-label="Projects"
                    >
                        {filteredProjects && filteredProjects.length > 0 ? (
                            filteredProjects.map((project, index) => (
                                <ProjectCard
                                    key={project.id}
                                    title={project.title}
                                    description={project.description}
                                    tags={project.tags}
                                    imageSrc={project.imageSrc}
                                    link={project.link}
                                    githubLink={project.githubLink}
                                    delay={ANIMATION.DELAY.SHORT * (index + 1)}
                                />
                            ))
                        ) : (
                            <div className="col-span-3 text-center py-12" role="status" aria-live="polite">
                                <p className="text-muted-foreground">
                                    {t("projects.noResults") || "No projects found in this category."}
                                </p>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    )
}
