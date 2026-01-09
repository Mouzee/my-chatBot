"use client"

import { useState, useMemo, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTranslation } from "react-i18next"

import { ProjectCard } from "@/components/feature/project-card"
import { ProjectFilter, type ProjectFilterId } from "@/components/feature/project-filter"
import { ProjectsSkeleton } from "@/components/ui/loading-skeleton"
import { projects } from "@/data/projects"
import { ANIMATION } from "@/lib/constants"

export function ProjectsContent() {
    const { t } = useTranslation()
    const [activeFilter, setActiveFilter] = useState<ProjectFilterId>("all")
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Simulate initial load completion
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 800)

        return () => clearTimeout(timer)
    }, [])

    const filteredProjects = useMemo(() => {
        if (activeFilter === "all") {
            return projects
        }
        return projects.filter((project) => project.category === activeFilter)
    }, [activeFilter])

    return (
        <section className="min-h-screen flex items-center px-4 py-20 overflow-hidden">
            <div className="max-w-6xl mx-auto w-full">
                <AnimatePresence mode="wait">
                    {isLoading ? (
                        <div key="skeleton" className="w-full">
                            <ProjectsSkeleton />
                        </div>
                    ) : (
                        <motion.div
                            key="content"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                            className="w-full"
                        >
                            <header className="max-w-3xl mx-auto text-center mb-16 px-4">
                                <motion.h1
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-3xl md:text-4xl font-bold mb-6 tracking-tight"
                                >
                                    {t("pages.projects.title")}
                                    <span className="text-primary"> {t("pages.projects.titleHighlight")}</span>
                                </motion.h1>
                                <motion.p
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="text-muted-foreground mb-8 leading-relaxed"
                                >
                                    {t("pages.projects.subtitle")}
                                </motion.p>
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <ProjectFilter activeFilter={activeFilter} onFilterChange={setActiveFilter} />
                                </motion.div>
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
                                                isComingSoon={project.isComingSoon}
                                                delay={ANIMATION.DELAY.SHORT * (index % 6 + 1)}
                                            />
                                        ))
                                    ) : (
                                        <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-12" role="status" aria-live="polite">
                                            <p className="text-muted-foreground">
                                                {t("pages.projects.noResults")}
                                            </p>
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    )
}
