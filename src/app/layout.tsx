import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import { TransitionProvider } from "@/components/animations/TransitionContext"
import ExpandOverlay from "@/components/animations/ExpandOverlay"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Portfolio — Your Name",
  description: "Python & AI engineer — projects, research, and resume.",
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
