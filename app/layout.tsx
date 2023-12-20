import type { Metadata } from "next"
import "./globals.css"
import { Toaster } from "sonner"
import { GeistMono } from "geist/font/mono"

export const metadata: Metadata = {
  title: "Exploring something",
  description: "Explore Something do 1% everyday",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={GeistMono.className}>
      <body className={"bg-black text-white"}>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  )
}
