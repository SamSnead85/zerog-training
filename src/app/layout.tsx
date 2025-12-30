import type { Metadata } from "next";
import { Inter, Playfair_Display, Montserrat, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { AITrainingAssistant } from "@/components/assistant/AITrainingAssistant";
import {
  OrganizationSchema,
  WebsiteSchema,
  EducationalOrganizationSchema,
  PlatformProductSchema,
  CompetitorComparisonSchema
} from "@/components/seo/StructuredData";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  // Primary SEO
  title: {
    default: "ScaledNative | #1 AI-Native Training Platform for Enterprise Transformation",
    template: "%s | ScaledNative - AI Training Platform"
  },
  description: "ScaledNative is the leading AI-Native training platform for enterprise transformation. Better than Udemy, Coursera & Scaled Agile for corporate AI training. NATIVE framework, hands-on labs, AI certifications, HIPAA/SOC2 compliant. 95% completion rate, 736% ROI.",

  // Massive Keyword Expansion - 50+ targeted terms
  keywords: [
    // Primary AI Training Keywords
    "AI native training",
    "AI-Native transformation",
    "AI training platform",
    "enterprise AI training",
    "corporate AI training",
    "AI workforce development",
    "AI upskilling platform",
    "AI literacy training",
    "AI adoption training",

    // Framework & Methodology
    "NATIVE framework",
    "AI transformation methodology",
    "AI implementation framework",
    "AI readiness assessment",
    "AI maturity model",

    // Certifications
    "AI certification programs",
    "AI professional certification",
    "prompt engineering certification",
    "AI-Native certification",
    "enterprise AI certification",

    // Role-Based Training
    "AI training for executives",
    "AI training for managers",
    "AI training for developers",
    "AI training for business analysts",
    "AI training for project managers",
    "AI training for product managers",

    // Competitor Keywords
    "Udemy alternative",
    "Udemy for business alternative",
    "Coursera alternative",
    "Coursera for business alternative",
    "LinkedIn Learning alternative",
    "Scaled Agile alternative",
    "SAFe training alternative",
    "better than Udemy",
    "better than Coursera",
    "enterprise training platform",

    // LMS & Platform
    "AI-powered LMS",
    "enterprise LMS",
    "corporate learning management system",
    "adaptive learning platform",
    "hands-on AI training",
    "AI training labs",

    // Compliance
    "HIPAA compliant training",
    "SOC 2 training platform",
    "HITRUST certified training",
    "compliance training platform",
    "healthcare AI training",

    // Technology
    "prompt engineering training",
    "ChatGPT training",
    "generative AI training",
    "LLM training courses",
    "AI integration training",

    // Business Outcomes
    "AI ROI training",
    "digital transformation training",
    "workforce AI readiness",
    "AI skills gap training",
    "AI talent development"
  ],

  authors: [
    { name: "ScaledNative" },
    { name: "Sam Sweilem" }
  ],
  creator: "ScaledNative",
  publisher: "ScaledNative",

  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/logo.png",
  },

  // Enhanced OpenGraph
  openGraph: {
    title: "ScaledNative | #1 AI-Native Training Platform",
    description: "Transform your workforce with AI-Native training. 634+ hours of curriculum, 95% completion rate, 736% ROI. Better than Udemy & Coursera for enterprise AI training.",
    type: "website",
    locale: "en_US",
    siteName: "ScaledNative",
    url: "https://zerogtraining.com",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ScaledNative - AI-Native Training Platform for Enterprise Transformation",
        type: "image/png",
      },
    ],
  },

  // Enhanced Twitter/X
  twitter: {
    card: "summary_large_image",
    title: "ScaledNative | #1 AI-Native Training Platform",
    description: "Transform your workforce with AI-Native training. NATIVE framework, hands-on labs, certifications. Better than Udemy for enterprise AI training.",
    images: ["/og-image.png"],
    creator: "@scalednative",
    site: "@scalednative",
  },

  // Technical SEO
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://zerogtraining.com"),
  alternates: {
    canonical: "https://zerogtraining.com",
  },

  // Robots directives
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Verification (add your actual codes)
  verification: {
    google: "your-google-verification-code",
  },

  // App metadata
  applicationName: "ScaledNative",
  category: "Education",
  classification: "Enterprise Training Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* JSON-LD Structured Data for Rich Snippets */}
        <OrganizationSchema />
        <WebsiteSchema />
        <EducationalOrganizationSchema />
        <PlatformProductSchema />
        <CompetitorComparisonSchema />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} ${montserrat.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        {children}
        <AITrainingAssistant />
      </body>
    </html>
  );
}
