"use client"

import { motion } from "framer-motion"

// Positions are relative to viewport center using calc().
// Content column is max-w-3xl (768px), so content edges are at calc(50% ± 384px).
// Bubbles sit just outside that column with slight stagger for variety.
// Content is max-w-3xl (768px), edges at calc(50% ± 384px).
// Bubble is 120px wide + 20px gap + 10px animation buffer = 514px min offset from center.
// Slots range from 520px–590px from center to stay safely clear.
const LEFT_SLOTS = [
  { left: "calc(50% - 560px)", top: "12%" },
  { left: "calc(50% - 530px)", top: "29%" },
  { left: "calc(50% - 575px)", top: "47%" },
  { left: "calc(50% - 545px)", top: "63%" },
  { left: "calc(50% - 520px)", top: "79%" },
  { left: "calc(50% - 590px)", top: "20%" },
]

const RIGHT_SLOTS = [
  { right: "calc(50% - 555px)", top: "18%" },
  { right: "calc(50% - 525px)", top: "35%" },
  { right: "calc(50% - 570px)", top: "52%" },
  { right: "calc(50% - 540px)", top: "68%" },
  { right: "calc(50% - 520px)", top: "85%" },
  { right: "calc(50% - 585px)", top: "8%"  },
]

const FLIGHTS = [
  { y: [-14, 10], x: [-5,  4], duration: 4.4 },
  { y: [ -8, 16], x: [-3,  7], duration: 5.2 },
  { y: [-12,  8], x: [-7,  3], duration: 3.9 },
  { y: [ -6, 14], x: [-4,  8], duration: 6.1 },
  { y: [-16,  6], x: [-2,  5], duration: 4.8 },
  { y: [-10, 12], x: [-6,  2], duration: 5.6 },
  { y: [ -9, 11], x: [-8,  6], duration: 3.6 },
  { y: [-13,  7], x: [-3,  9], duration: 5.0 },
  { y: [ -7, 15], x: [-5,  4], duration: 4.2 },
  { y: [-11,  9], x: [-4,  7], duration: 6.3 },
  { y: [-15,  5], x: [-6,  3], duration: 4.6 },
  { y: [ -8, 13], x: [-2,  8], duration: 5.4 },
]

interface Props {
  tags: string[]
}

function Bubble({ tag, style, flight, delay }: {
  tag: string
  style: React.CSSProperties
  flight: typeof FLIGHTS[number]
  delay: number
}) {
  return (
    <motion.div
      className="fixed hidden xl:flex items-center justify-center pointer-events-none select-none"
      style={{
        ...style,
        zIndex: 10,
        width: 120,
        height: 120,
        borderRadius: "50%",
        background: "rgba(99,102,241,0.12)",
        border: "1px solid rgba(99,102,241,0.3)",
        backdropFilter: "blur(4px)",
      }}
      initial={{ y: 0, x: 0 }}
      animate={{ y: flight.y as number[], x: flight.x as number[] }}
      transition={{
        duration: flight.duration,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
        delay,
      }}
    >
      <span className="text-indigo-400 text-base font-medium text-center leading-tight px-3">
        {tag}
      </span>
    </motion.div>
  )
}

export default function FloatingBubbles({ tags }: Props) {
  if (!tags.length) return null

  const leftTags  = tags.filter((_, i) => i % 2 === 0).slice(0, LEFT_SLOTS.length)
  const rightTags = tags.filter((_, i) => i % 2 === 1).slice(0, RIGHT_SLOTS.length)

  return (
    <>
      {leftTags.map((tag, i) => (
        <Bubble
          key={`l-${tag}`}
          tag={tag}
          style={{ left: LEFT_SLOTS[i].left, top: LEFT_SLOTS[i].top }}
          flight={FLIGHTS[i % FLIGHTS.length]}
          delay={i * 0.4}
        />
      ))}
      {rightTags.map((tag, i) => (
        <Bubble
          key={`r-${tag}`}
          tag={tag}
          style={{ right: RIGHT_SLOTS[i].right, top: RIGHT_SLOTS[i].top }}
          flight={FLIGHTS[(i + 6) % FLIGHTS.length]}
          delay={i * 0.4 + 0.2}
        />
      ))}
    </>
  )
}
