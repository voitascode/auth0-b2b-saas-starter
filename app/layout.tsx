import type { Metadata } from "next"

import "./globals.css"

import { Inter } from "next/font/google"
import Script from "next/script"

import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Clickscape",
  description:
    "Unlock Their Ads Secrets. Stay Ahead.",
  metadataBase: new URL("https://clickscape.io"),
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster position="bottom-right" richColors />
        </ThemeProvider>

        <Script id="heap">
          {`// Heap tracking script...`}
        </Script>
      </body>
    </html>
  )
}
