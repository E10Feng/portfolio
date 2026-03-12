"use client"

import { createContext, useContext, useState, useCallback } from "react"

type Phase = "idle" | "expanding" | "fading"

export type CardSnapshot =
  | {
      kind: "resume"
      role: string
      organization: string
      location: string
      startDate: string
      endDate: string
      type: string[]
      description: string[]
      technologies?: string[]
    }
  | {
      kind: "project"
      title: string
      description: string
      year: number
      techStack: string[]
    }

interface TransitionState {
  rect: { top: number; left: number; width: number; height: number } | null
  card: CardSnapshot | null
  phase: Phase
  triggeredAt: number | null
}

interface TransitionContextValue {
  state: TransitionState
  triggerTransition: (rect: DOMRect, card: CardSnapshot) => void
  completeTransition: () => void
}

const TransitionContext = createContext<TransitionContextValue | null>(null)

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<TransitionState>({ rect: null, card: null, phase: "idle", triggeredAt: null })

  const triggerTransition = useCallback((rect: DOMRect, card: CardSnapshot) => {
    setState({
      rect: { top: rect.top, left: rect.left, width: rect.width, height: rect.height },
      card,
      phase: "expanding",
      triggeredAt: Date.now(),
    })
  }, [])

  const completeTransition = useCallback(() => {
    setState((s) => ({ ...s, phase: "fading" }))
    setTimeout(() => setState({ rect: null, card: null, phase: "idle" }), 500)
  }, [])

  return (
    <TransitionContext.Provider value={{ state, triggerTransition, completeTransition }}>
      {children}
    </TransitionContext.Provider>
  )
}

export function useCardTransition() {
  const ctx = useContext(TransitionContext)
  if (!ctx) throw new Error("useCardTransition must be used within TransitionProvider")
  return ctx
}
