
"use client"

import { useState, useMemo } from "react"
import { AnimatedBackground } from "@/components/animated-background"
import { ProjectCard } from "@/components/project-card"
import { ProjectFilter } from "@/components/project-filter"
import { projects } from "@/data/projects"
import { PageNavigation } from "@/components/page-navigation"
import { motion, AnimatePresence } from "framer-motion"

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<string>("all")

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") {
      return projects
    }
    return projects.filter((project) => project.category === activeFilter)
  }, [activeFilter])

  return (
    <>
      <AnimatedBackground />
      <main className="min-h-screen relative">
        <section className="min-h-screen flex items-center px-4 py-20">
          <div className="max-w-6xl mx-auto w-full">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h1 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
                All <span className="text-primary">Projects</span>
              </h1>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                A comprehensive showcase of my work across various technologies and design disciplines.
              </p>
              <ProjectFilter activeFilter={activeFilter} onFilterChange={setActiveFilter} />
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFilter}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
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
                      delay={0.1 * (index + 1)}
                    />
                  ))
                ) : (
                  <div className="col-span-3 text-center py-12">
                    <p className="text-muted-foreground">
                      No projects found in this category.
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>
      </main>
      <PageNavigation />
    </>
  )
}

