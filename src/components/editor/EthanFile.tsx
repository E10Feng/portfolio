"use client"

import { motion } from "motion/react"
import { FileDown, Github, Linkedin, Mail } from "lucide-react"
import { editorContainer, editorLine } from "./animations"

export default function EthanFile() {
  return (
    <motion.div
      key="ethan"
      className="p-6 md:p-8 font-code text-sm leading-7"
      variants={editorContainer}
      initial="hidden"
      animate="show"
    >
      {/* Frontmatter */}
      <motion.p variants={editorLine} className="text-text-dim">---</motion.p>
      <motion.p variants={editorLine}>
        <span className="text-accent">name</span>
        <span className="text-text-dim">: </span>
        <span className="text-text">Ethan Feng</span>
      </motion.p>
      <motion.p variants={editorLine}>
        <span className="text-accent">role</span>
        <span className="text-text-dim">: </span>
        <span className="text-text">AI Engineer · Biologist · NCAA DIII Swammer</span>
      </motion.p>
      <motion.p variants={editorLine}>
        <span className="text-accent">location</span>
        <span className="text-text-dim">: </span>
        <span className="text-text">Remote / Detroit, MI</span>
      </motion.p>
      <motion.p variants={editorLine}>
        <span className="text-accent">status</span>
        <span className="text-text-dim">: </span>
        <span className="text-text">open to full-time roles</span>
      </motion.p>
      <motion.p variants={editorLine} className="text-text-dim mb-6">---</motion.p>

      {/* About */}
      <motion.p variants={editorLine} className="mb-1">
        <span className="text-text-dim"># </span>
        <span className="text-text font-bold">About</span>
      </motion.p>
      <motion.p variants={editorLine} className="text-text-dim">Building AI-powered tools and software, particularly in healthcare domains.</motion.p>
      <motion.p variants={editorLine} className="text-text-dim">Currently at RediMinds — previously NASA.</motion.p>
      <motion.p variants={editorLine} className="text-text-dim">WashU grad, Computational Biology, 3.9 GPA.</motion.p>
      <motion.p variants={editorLine} className="text-text-dim mb-6">7x NCAA All-American swimmer.</motion.p>

      {/* Stack */}
      <motion.p variants={editorLine} className="mb-1">
        <span className="text-text-dim"># </span>
        <span className="text-text font-bold">Stack</span>
      </motion.p>
      <motion.p variants={editorLine} className="text-text-dim mb-6">
        Python · LangGraph · FastAPI · Next.js · RAG · PostgreSQL
      </motion.p>

      {/* Currently working on */}
      <motion.p variants={editorLine} className="mb-1">
        <span className="text-text-dim"># </span>
        <span className="text-text font-bold">Currently working on</span>
      </motion.p>
      <motion.p variants={editorLine} className="text-text-dim">
        <span className="text-text-dim">- </span>
        Automated medical necessity review system (RediMinds)
      </motion.p>
      <motion.p variants={editorLine} className="text-text-dim">
        <span className="text-text-dim">- </span>
        BalanceWell — fall prevention app for older adults
      </motion.p>
      <motion.p variants={editorLine} className="text-text-dim mb-6">
        <span className="text-text-dim">- </span>
        western blot mcp — AI-powered western blot image analyzer
      </motion.p>

      {/* Links */}
      <motion.p variants={editorLine} className="mb-2">
        <span className="text-text-dim"># </span>
        <span className="text-text font-bold">Links</span>
      </motion.p>
      <motion.div variants={editorLine} className="flex flex-wrap gap-x-6 gap-y-2">
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
  )
}
