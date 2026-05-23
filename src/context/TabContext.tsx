"use client"

import { createContext, useContext, useState, useEffect } from "react"
import type { ReactNode } from "react"

export type Tab = "ethan" | "projects" | "resume" | "contact"
const VALID_TABS: Tab[] = ["ethan", "projects", "resume", "contact"]

interface TabContextType {
  activeTab: Tab
  setActiveTab: (tab: Tab) => void
}

const TabContext = createContext<TabContextType | null>(null)

export function TabProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState<Tab>("ethan")

  // On mount, read ?tab= from URL so back-links like /?tab=projects restore state
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const tab = params.get("tab") as Tab
    if (tab && VALID_TABS.includes(tab)) setActiveTab(tab)
  }, [])

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabContext.Provider>
  )
}

export function useTab(): TabContextType {
  const ctx = useContext(TabContext)
  if (!ctx) throw new Error("useTab must be used within <TabProvider>")
  return ctx
}
