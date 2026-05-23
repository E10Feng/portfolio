import type { Metadata } from "next"
import { Syne, DM_Sans, Fira_Code } from "next/font/google"
import "./globals.css"
import VSCodeTabBar from "@/components/layout/VSCodeTabBar"
import Footer from "@/components/layout/Footer"
import { TransitionProvider } from "@/components/animations/TransitionContext"
import ExpandOverlay from "@/components/animations/ExpandOverlay"
import { TabProvider } from "@/context/TabContext"

const display = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display",
})

const sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
})

const mono = Fira_Code({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "E10 Feng — AI Engineering Portfolio",
  description: "Explore the portfolio of E10 Feng, an AI and Systems Engineering intern. Specializing in Python, RAG architectures, and AI-driven solutions developed at NASA and beyond.",
  openGraph: {
    title: "E10 Feng — AI Engineering Portfolio",
    description: "Explore the portfolio of E10 Feng, an AI and Systems Engineering intern. Specializing in Python, RAG architectures, and AI-driven solutions.",
    url: "https://portfolio-e10.vercel.app",
    siteName: "E10 Feng Portfolio",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "E10 Feng Portfolio Preview" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "E10 Feng — AI Engineering Portfolio",
    description: "AI and Systems Engineering intern portfolio featuring projects from NASA and RediMinds.",
    images: ["/og-image.png"],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark ${display.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        <TabProvider>
          <TransitionProvider>
            <ExpandOverlay />
            <VSCodeTabBar />
            {children}
            <Footer />
          </TransitionProvider>
        </TabProvider>
      </body>
    </html>
  )
}
