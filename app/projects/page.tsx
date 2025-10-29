
import { AnimatedBackground } from "@/components/animated-background"
import { ProjectCard } from "@/components/project-card"
import { ProjectFilter } from "@/components/project-filter"
import { projects } from "@/data/projects"


import { PageNavigation } from "@/components/page-navigation"
import { motion } from "framer-motion"
import { ExternalLink, Github } from "lucide-react"
import { useTranslation } from "react-i18next"

export default function ProjectsPage() {
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

              <ProjectFilter />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects && projects.length > 0 ? (
                projects.map((project, index) => (
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
                  <p className="text-muted-foreground">No projects available at the moment.</p>
                </div>
              )}
            </div>

          </div>
        </section>
      </main>


      <PageNavigation />
    </>
  )
}



// "use client"

// import { AnimatedBackground } from "@/components/animated-background"
// import { PageNavigation } from "@/components/page-navigation"
// import { motion } from "framer-motion"
// import { ExternalLink, Github } from "lucide-react"
// import { useTranslation } from "react-i18next"

// export default function ProjectsPage() {
//   const { t } = useTranslation()

//   const projects = [
//     {
//       title: t("pages.projects.items.0.title"),
//       description: t("pages.projects.items.0.description"),
//       tags: ["Next.js", "Shadcn UI", "TypeScript"],
//     },
//     {
//       title: t("pages.projects.items.1.title"),
//       description: t("pages.projects.items.1.description"),
//       tags: ["React", "TailwindCSS", "Framer Motion"],
//     },
//     {
//       title: t("pages.projects.items.2.title"),
//       description: t("pages.projects.items.2.description"),
//       tags: ["Angular", "Bootstrap", "REST API"],
//     },
//   ]

//   return (
//     <>
//       <AnimatedBackground />
//       <main className="min-h-screen relative">
//         <section className="min-h-screen flex items-center px-4 py-20">
//           <div className="max-w-6xl mx-auto w-full">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//               className="space-y-8"
//             >
//               <div className="text-center space-y-4">
//                 <h1 className="text-4xl sm:text-5xl font-bold text-foreground">{t("pages.projects.title")}</h1>
//                 <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t("pages.projects.subtitle")}</p>
//               </div>

//               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
//                 {projects.map((project, index) => (
//                   <motion.div
//                     key={index}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.6, delay: 0.1 * index }}
//                     className="glass-card p-6 space-y-4 hover:shadow-xl transition-shadow"
//                   >
//                     <h3 className="text-xl font-semibold">{project.title}</h3>
//                     <p className="text-muted-foreground">{project.description}</p>
//                     <div className="flex flex-wrap gap-2">
//                       {project.tags.map((tag) => (
//                         <span
//                           key={tag}
//                           className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full"
//                         >
//                           {tag}
//                         </span>
//                       ))}
//                     </div>
//                     <div className="flex gap-3 pt-2">
//                       <button className="flex items-center gap-2 text-sm text-primary hover:underline">
//                         <ExternalLink className="w-4 h-4" />
//                         {t("pages.projects.viewDemo")}
//                       </button>
//                       <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
//                         <Github className="w-4 h-4" />
//                         {t("pages.projects.viewCode")}
//                       </button>
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>
//             </motion.div>
//           </div>
//         </section>
//       </main>
//       <PageNavigation />
//     </>
//   )
// }


