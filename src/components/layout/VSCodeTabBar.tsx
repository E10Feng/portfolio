"use client"

import { useTab } from "@/context/TabContext"
import type { Tab } from "@/context/TabContext"

const TABS: { id: Tab; label: string }[] = [
  { id: "ethan",    label: "ETHAN.md" },
  { id: "projects", label: "PROJECTS.md" },
  { id: "resume",   label: "RESUME.md" },
  { id: "contact",  label: "CONTACT.md" },
]

export default function VSCodeTabBar() {
  const { activeTab, setActiveTab } = useTab()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-canvas/90 backdrop-blur-md border-b border-border">
      <div className="flex items-end h-14 px-2">
        {TABS.map(({ id, label }) => {
          const isActive = activeTab === id
          return (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={[
                "flex items-center gap-2 px-4 py-2 font-display border border-border transition-all duration-150 cursor-pointer",
                isActive
                  ? "text-text text-lg bg-canvas border-b-canvas -mb-px rounded-t-sm"
                  : "text-text-dim text-sm bg-surface hover:text-text rounded-t-sm",
              ].join(" ")}
            >
              {label}
              {isActive && <span className="w-2 h-2 rounded-full bg-accent" />}
            </button>
          )
        })}
      </div>
    </header>
  )
}
