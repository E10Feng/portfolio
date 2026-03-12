import HeroSection from "@/components/sections/HeroSection"
import ProjectsSection from "@/components/sections/ProjectsSection"
import ResumeSection from "@/components/sections/ResumeSection"
import ContactSection from "@/components/sections/ContactSection"

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ProjectsSection />
      <ResumeSection />
      <ContactSection />
    </main>
  )
}
