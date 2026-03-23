import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  adjustFontFallback: true
});

export const metadata: Metadata = {
  title: "ResumeLens — AI-Powered CV Matching",
  description: "Upload your CV and instantly see how well it matches any job description. Get AI-powered improvement tips, keyword suggestions, and compare multiple roles.",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "ResumeLens — AI-Powered CV Matching",
    description: "Upload your CV and instantly see how well it matches any job description. Get AI-powered improvement tips, keyword suggestions, and compare multiple roles.",
    type: "website",
    locale: "en_GB",
    siteName: "ResumeLens",
    url: "https://resumelens.ai",
    images: [
      {
        url: "https://resumelens.ai/og-image.png",
        width: 1200,
        height: 630,
        alt: "ResumeLens — AI-Powered CV Matching",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ResumeLens — AI-Powered CV Matching",
    description: "Upload your CV and instantly see how well it matches any job description. Get AI-powered improvement tips, keyword suggestions, and compare multiple roles.",
    images: ["https://resumelens.ai/og-image.png"],
  },
  alternates: {
    canonical: "https://resumelens.ai",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ResumeLens",
  url: "https://resumelens.ai",
  logo: "https://resumelens.ai/favicon.ico",
  description: "AI-powered CV matching platform that helps job seekers match their resume to job descriptions and get actionable improvement tips.",
  contactPoint: {
    "@type": "ContactPoint",
    email: "hello@resumelens.ai",
    contactType: "customer support",
  },
  sameAs: [],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
