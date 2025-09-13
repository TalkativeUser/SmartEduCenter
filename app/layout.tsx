import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import { ReduxProvider } from "../providers/redux-provider"
import { ThemeProvider } from "../components/theme-provider"
import { Toaster } from "react-hot-toast"

export const metadata: Metadata = {
  title: "School Smart System",
  description: "Comprehensive school management system",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {


  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body className="min-h-screen bg-background font-sans antialiased" style={{ fontFamily: 'Cairo, sans-serif' }}  >
        <ReduxProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange={false}>
            {children}
          </ThemeProvider>
        </ReduxProvider>
        <Toaster />

      </body>
    </html>
  )
}
