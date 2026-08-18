"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { useTab } from "@/context/TabContext"
import EthanFile from "@/components/editor/EthanFile"
import ProjectsFile from "@/components/editor/ProjectsFile"
import ResumeFile from "@/components/editor/ResumeFile"
import ContactFile from "@/components/editor/ContactFile"
import BootSequence from "@/components/animations/BootSequence"
import ParticleField from "@/components/kokonut/ParticleField"
import { hasBootPlayed, markBootPlayed } from "@/lib/bootSession"

function ActiveFile({ tab }: { tab: string }) {
  switch (tab) {
    case "projects": return <ProjectsFile />
    case "resume":   return <ResumeFile />
    case "contact":  return <ContactFile />
    default:         return <EthanFile />
  }
}

export default function HeroSection() {
  const { activeTab } = useTab()
  const [booting, setBooting] = useState(false)

  useEffect(() => {
    setBooting(!hasBootPlayed())
  }, [])

  const handleBootComplete = () => {
    markBootPlayed()
    setBooting(false)
  }

  return (
    <section id="hero" className="relative min-h-screen bg-canvas flex flex-col justify-center px-6 md:px-16 pt-14 pb-12">
      <ParticleField />
      <div className="w-full max-w-3xl mx-auto">

        {/* Editor chrome — no internal tab bar; VSCodeTabBar handles that */}
        <motion.div
          className="border border-border rounded-sm overflow-hidden bg-canvas"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <AnimatePresence mode="wait">
            {booting ? (
              <BootSequence key="boot" onComplete={handleBootComplete} />
            ) : (
              <ActiveFile key={activeTab} tab={activeTab} />
            )}
          </AnimatePresence>
        </motion.div>

        {/* Scroll hint — only shown on ETHAN.md, once boot has resolved */}
        {!booting && activeTab === "ethan" && (
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
        )}

      </div>
    </section>
  )
}
