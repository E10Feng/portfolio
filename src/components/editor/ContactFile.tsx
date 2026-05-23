"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Github, Linkedin, Mail, BookOpen } from "lucide-react"
import { editorContainer, editorLine } from "./animations"

export default function ContactFile() {
  return (
    <motion.div
      key="contact"
      className="p-6 md:p-8 font-code text-sm leading-7"
      variants={editorContainer}
      initial="hidden"
      animate="show"
    >
      {/* Frontmatter */}
      <motion.p variants={editorLine} className="text-text-dim">---</motion.p>
      <motion.p variants={editorLine}>
        <span className="text-accent">type</span>
        <span className="text-text-dim">: </span>
        <span className="text-text">contact</span>
      </motion.p>
      <motion.p variants={editorLine} className="text-text-dim mb-6">---</motion.p>

      {/* Reach me */}
      <motion.p variants={editorLine} className="mb-4">
        <span className="text-text-dim"># </span>
        <span className="text-text font-bold">Reach me</span>
      </motion.p>

      <motion.div variants={editorLine} className="flex flex-col gap-3">
        <a
          href="mailto:ethan.burr@gmail.com"
          className="text-accent hover:underline flex items-center gap-2"
        >
          <Mail size={13} />
          ethan.burr@gmail.com
        </a>
        <a
          href="https://github.com/E10Feng"
          target="_blank"
          rel="noopener noreferrer"
          className="text-text-dim hover:text-accent transition-colors flex items-center gap-2"
        >
          <Github size={13} />
          github.com/E10Feng ↗
        </a>
        <a
          href="https://linkedin.com/in/ethan-feng-604993221/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-text-dim hover:text-accent transition-colors flex items-center gap-2"
        >
          <Linkedin size={13} />
          linkedin.com/in/ethan-feng-604993221 ↗
        </a>
        <Link
          href="/thoughts"
          className="text-text-dim hover:text-accent transition-colors flex items-center gap-2"
        >
          <BookOpen size={13} />
          thoughts ↗
        </Link>
      </motion.div>
    </motion.div>
  )
}
