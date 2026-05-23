"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { projects } from "@/data/projects"
import { editorContainer, editorLine } from "./animations"

export default function ProjectsFile() {
  return (
    <motion.div
      key="projects"
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
        <span className="text-text">portfolio</span>
      </motion.p>
      <motion.p variants={editorLine} className="text-text-dim mb-6">---</motion.p>

      {/* Projects list */}
      <motion.p variants={editorLine} className="mb-4">
        <span className="text-text-dim"># </span>
        <span className="text-text font-bold">Projects</span>
      </motion.p>

      {projects.map((project) => (
        <motion.p key={project.id} variants={editorLine} className="text-text-dim mb-2">
          <span className="text-text-dim">- </span>
          <Link
            href={`/projects/${project.id}`}
            className="text-accent hover:underline"
          >
            {project.title}
          </Link>
          <span className="text-text-dim"> — {project.description}</span>
        </motion.p>
      ))}
    </motion.div>
  )
}
