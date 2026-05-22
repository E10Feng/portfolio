import { projects } from "@/data/projects"
import ProjectCard from "@/components/ui/ProjectCard"
import SectionHeading from "@/components/ui/SectionHeading"
import FadeInWhenVisible from "@/components/animations/FadeInWhenVisible"

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-24 px-6 bg-canvas">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          number="02"
          title="projects"
          subtitle="AI, healthcare research, and backend engineering work"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...projects].sort((a, b) => {
            const aVal = a.date ?? `${a.year ?? 0}-01-01`
            const bVal = b.date ?? `${b.year ?? 0}-01-01`
            return bVal.localeCompare(aVal)
          }).map((project, index) => (
            <FadeInWhenVisible key={project.id} delay={index * 0.05}>
              <ProjectCard project={project} />
            </FadeInWhenVisible>
          ))}
        </div>
      </div>
    </section>
  )
}
