import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import "../styles/wispr-theme.css"
import "../styles/gradient-overrides.css"
import { generateMetadata as generateSEO, generateStructuredData } from "@/lib/seo"
import { StructuredData } from "@/components/seo/structured-data"
import { ServiceWorkerProvider } from "@/components/ServiceWorkerProvider"
import { LayoutWrapper } from "@/components/LayoutWrapper"
import { FooterWrapper } from "@/components/FooterWrapper"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  ...generateSEO({
    title: "AI-Powered Resume & Portfolio Builder",
    description: "Create stunning resumes and portfolio websites in minutes with AI assistance. 50+ professional templates, instant PDF/DOC export, ATS-optimized. Start free today!",
    keywords: [
      "resume builder",
      "AI resume",
      "portfolio builder",
      "free resume maker",
      "ATS resume",
      "professional CV",
      "resume templates",
      "portfolio website",
      "career tools",
      "online resume builder",
    ],
    canonical: "/",
  }),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const organizationData = generateStructuredData('Organization')
  const websiteData = generateStructuredData('WebSite')

  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#9333ea" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        {organizationData && <StructuredData data={organizationData} />}
        {websiteData && <StructuredData data={websiteData} />}
      </head>
      <body className={inter.className}>
        <ServiceWorkerProvider>
          <LayoutWrapper>
            <FooterWrapper>
              {children}
            </FooterWrapper>
          </LayoutWrapper>
          </ServiceWorkerProvider>
          </body>
          </html>
          )
}
