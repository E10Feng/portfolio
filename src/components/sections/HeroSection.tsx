import { Github, Linkedin, Mail, FileDown } from "lucide-react"
import SocialLink from "@/components/ui/SocialLink"
import FadeInWhenVisible from "@/components/animations/FadeInWhenVisible"

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center px-6 pt-16"
    >
      <div className="max-w-4xl w-full text-center">
        <FadeInWhenVisible>
          <p className="text-indigo-400 text-base font-medium tracking-widest uppercase mb-6">
            healthcare impact · ai agents · automations
          </p>
        </FadeInWhenVisible>
        <FadeInWhenVisible delay={0.1}>
          <h1 className="text-7xl sm:text-8xl font-bold text-zinc-50 tracking-tight mb-8">
            e10 (ethan) feng
          </h1>
        </FadeInWhenVisible>
        <FadeInWhenVisible delay={0.2}>
          <p className="text-xl sm:text-2xl text-zinc-400 leading-relaxed mb-12">
            i fool around with ai to make healthcare better
          </p>
        </FadeInWhenVisible>
        <FadeInWhenVisible delay={0.3}>
          <div className="flex flex-wrap items-center justify-center gap-8 mb-16">
            <SocialLink href="https://github.com/E10Feng" icon={Github} label="github" />
            <SocialLink href="https://linkedin.com/in/ethan-feng-604993221/" icon={Linkedin} label="linkedin" />
            <SocialLink href="mailto:ethan.burr@gmail.com" icon={Mail} label="email" />
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors"
            >
              <FileDown size={16} />
              resume pdf
            </a>
          </div>
        </FadeInWhenVisible>
        <FadeInWhenVisible delay={0.4}>
          <a
            href="#projects"
            className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            ↓ see more
          </a>
        </FadeInWhenVisible>
      </div>
    </section>
  )
}
