import HeroSection from "@/components/sections/HeroSection"
import FeaturedSection from "@/components/sections/FeaturedSection"
import ProjectsSection from "@/components/sections/ProjectsSection"
import ResumeSection from "@/components/sections/ResumeSection"
import ContactSection from "@/components/sections/ContactSection"

export default function Home() {
  return (
    <main>
      <HeroSection />
      <FeaturedSection />
      <ProjectsSection />
      <ResumeSection />
      <ContactSection />
    </main>
  )
}
