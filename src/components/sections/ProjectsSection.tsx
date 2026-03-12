import { projects } from "@/data/projects"
import ProjectCard from "@/components/ui/ProjectCard"
import SectionHeading from "@/components/ui/SectionHeading"
import FadeInWhenVisible from "@/components/animations/FadeInWhenVisible"

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          title="projects"
          subtitle="a selection of AI, healthcare research and backend engineering work"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <FadeInWhenVisible key={project.id} delay={index * 0.1}>
              <ProjectCard project={project} />
            </FadeInWhenVisible>
          ))}
        </div>
      </div>
    </section>
  )
}
