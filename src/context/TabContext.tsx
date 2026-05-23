"use client"

import { createContext, useContext, useState } from "react"
import type { ReactNode } from "react"

export type Tab = "ethan" | "projects" | "resume" | "contact"

interface TabContextType {
  activeTab: Tab
  setActiveTab: (tab: Tab) => void
}

const TabContext = createContext<TabContextType | null>(null)

export function TabProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState<Tab>("ethan")
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
