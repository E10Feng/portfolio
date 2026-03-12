import { Github, Linkedin, Mail } from "lucide-react"
import SocialLink from "@/components/ui/SocialLink"
import SectionHeading from "@/components/ui/SectionHeading"
import FadeInWhenVisible from "@/components/animations/FadeInWhenVisible"

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-xl mx-auto text-center">
        <SectionHeading
          title="contact me!"
          subtitle="i'm open to interesting conversations, collaborations, and full-time roles"
        />
        <FadeInWhenVisible delay={0.1}>
          <div className="flex flex-wrap items-center justify-center gap-8">
            <SocialLink href="https://www.linkedin.com/in/ethan-feng-604993221/" icon={Linkedin} label="linkedin" />
            <SocialLink href="mailto:ethan.burr@gmail.com" icon={Mail} label="ethan.burr@gmail.com" />
            <SocialLink href="https://github.com/E10Feng" icon={Github} label="github" />
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  )
}
