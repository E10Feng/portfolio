import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import { TransitionProvider } from "@/components/animations/TransitionContext"
import ExpandOverlay from "@/components/animations/ExpandOverlay"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "E10 Feng — AI & Systems Engineering Portfolio",
  description: "Explore the portfolio of E10 Feng, an AI and Systems Engineering intern. Specializing in Python, RAG architectures, and AI-driven solutions developed at NASA and beyond.",
  openGraph: {
    title: "E10 Feng — AI & Systems Engineering Portfolio",
    description: "Explore the portfolio of E10 Feng, an AI and Systems Engineering intern. Specializing in Python, RAG architectures, and AI-driven solutions.",
    url: "https://portfolio-e10.vercel.app", // Fallback update if needed
    siteName: "E10 Feng Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "E10 Feng Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "E10 Feng — AI & Systems Engineering Portfolio",
    description: "AI and Systems Engineering intern portfolio featuring projects from NASA and RediMinds.",
    images: ["/og-image.png"],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <TransitionProvider>
          <ExpandOverlay />
          <Navbar />
          {children}
          <Footer />
        </TransitionProvider>
      </body>
    </html>
  )
}
