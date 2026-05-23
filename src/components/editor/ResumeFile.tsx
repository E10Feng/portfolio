"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { resumeItems } from "@/data/resume"
import { editorContainer, editorLine } from "./animations"

export default function ResumeFile() {
  return (
    <motion.div
      key="resume"
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
        <span className="text-text">work-history</span>
      </motion.p>
      <motion.p variants={editorLine} className="text-text-dim mb-6">---</motion.p>

      {resumeItems.map((item) => (
        <motion.div key={item.id} variants={editorLine} className="mb-6">
          {/* Section heading */}
          <p className="mb-1">
            <span className="text-text-dim"># </span>
            <Link
              href={`/resume/${item.id}`}
              className="text-text font-bold hover:text-accent transition-colors"
            >
              {item.organization}
            </Link>
          </p>
          {/* Role + dates */}
          <p className="text-text-dim mb-1">
            <span className="text-accent">{item.role}</span>
            <span className="text-text-dim"> · {item.startDate} – {item.endDate}</span>
          </p>
          {/* Bullets */}
          {item.description.map((bullet, i) => (
            <p key={i} className="text-text-dim">
              <span className="text-text-dim">- </span>
              {bullet}
            </p>
          ))}
        </motion.div>
      ))}
    </motion.div>
  )
}
