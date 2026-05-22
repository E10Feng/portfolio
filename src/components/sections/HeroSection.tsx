"use client"

import { motion } from "framer-motion"
import { FileDown, Github, Linkedin, Mail } from "lucide-react"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0.1 },
  },
}

const line = {
  hidden: { opacity: 0, x: -8 },
  show: { opacity: 1, x: 0, transition: { duration: 0.35, ease: "easeOut" as const } },
}

export default function HeroSection() {
  return (
    <section id="hero" className="min-h-screen bg-canvas flex flex-col justify-center px-6 md:px-16 pt-14 pb-12">
      <div className="w-full max-w-3xl mx-auto">

        {/* Editor chrome */}
        <motion.div
          className="border border-border rounded-sm overflow-hidden"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Tab bar */}
          <div className="flex items-center border-b border-border bg-surface px-4 h-16">
            <div className="flex items-center gap-3 bg-canvas px-4 py-2 border border-border border-b-canvas -mb-px rounded-t-sm">
              <span className="font-display font-bold text-3xl text-text">ETHAN.md</span>
              <span className="w-2 h-2 rounded-full bg-accent" title="unsaved" />
            </div>
          </div>

          {/* File content */}
          <motion.div
            className="p-6 md:p-8 font-code text-sm leading-7"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {/* Frontmatter */}
            <motion.p variants={line} className="text-text-dim">---</motion.p>
            <motion.p variants={line}>
              <span className="text-accent">name</span>
              <span className="text-text-dim">: </span>
              <span className="text-text">Ethan Feng</span>
            </motion.p>
            <motion.p variants={line}>
              <span className="text-accent">role</span>
              <span className="text-text-dim">: </span>
              <span className="text-text">AI Engineer · Builder · D3 Swammer</span>
            </motion.p>
            <motion.p variants={line}>
              <span className="text-accent">location</span>
              <span className="text-text-dim">: </span>
              <span className="text-text">Remote / Detroit, MI</span>
            </motion.p>
            <motion.p variants={line}>
              <span className="text-accent">status</span>
              <span className="text-text-dim">: </span>
              <span className="text-text">open to full-time roles</span>
            </motion.p>
            <motion.p variants={line} className="text-text-dim mb-6">---</motion.p>

            {/* About */}
            <motion.p variants={line} className="mb-1">
              <span className="text-text-dim"># </span>
              <span className="text-text font-bold">About</span>
            </motion.p>
            <motion.p variants={line} className="text-text-dim">Building AI-powered tools and software, particularly in healthcare domains.</motion.p>
            <motion.p variants={line} className="text-text-dim">Currently at RediMinds — previously NASA.</motion.p>
            <motion.p variants={line} className="text-text-dim">WashU grad, Computational Biology, 3.9 GPA.</motion.p>
            <motion.p variants={line} className="text-text-dim mb-6">7x NCAA All-American swimmer.</motion.p>

            {/* Stack */}
            <motion.p variants={line} className="mb-1">
              <span className="text-text-dim"># </span>
              <span className="text-text font-bold">Stack</span>
            </motion.p>
            <motion.p variants={line} className="text-text-dim mb-6">
              Python · LangGraph · FastAPI · Next.js · RAG · PostgreSQL
            </motion.p>

            {/* Currently working on */}
            <motion.p variants={line} className="mb-1">
              <span className="text-text-dim"># </span>
              <span className="text-text font-bold">Currently working on</span>
            </motion.p>
            <motion.p variants={line} className="text-text-dim">
              <span className="text-text-dim">- </span>
              Automated medical necessity review system (RediMinds)
            </motion.p>
            <motion.p variants={line} className="text-text-dim mb-6">
              <span className="text-text-dim">- </span>
              BalanceWell — fall prevention app for older adults
            </motion.p>

            {/* Links */}
            <motion.p variants={line} className="mb-2">
              <span className="text-text-dim"># </span>
              <span className="text-text font-bold">Links</span>
            </motion.p>
            <motion.div variants={line} className="flex flex-wrap gap-x-6 gap-y-2">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline flex items-center gap-1.5"
              >
                <FileDown size={13} />
                Resume ↗
              </a>
              <a
                href="https://github.com/E10Feng"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-dim hover:text-accent transition-colors flex items-center gap-1.5"
              >
                <Github size={13} />
                GitHub ↗
              </a>
              <a
                href="https://linkedin.com/in/ethan-feng-604993221/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-dim hover:text-accent transition-colors flex items-center gap-1.5"
              >
                <Linkedin size={13} />
                LinkedIn ↗
              </a>
              <a
                href="mailto:ethan.burr@gmail.com"
                className="text-text-dim hover:text-accent transition-colors flex items-center gap-1.5"
              >
                <Mail size={13} />
                ethan.burr@gmail.com ↗
              </a>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.4 }}
        >
          <a href="#featured" className="font-code text-xs text-text-dim hover:text-accent transition-colors tracking-widest">
            ↓ scroll
          </a>
        </motion.div>

      </div>
    </section>
  )
}
