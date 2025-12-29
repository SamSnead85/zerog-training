import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { AITrainingAssistant } from "@/components/assistant/AITrainingAssistant";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "ScaledNative | AI-Powered Training for AI-Native Transformation",
  description:
    "The enterprise platform for AI-Native transformation. AI-powered training that adapts to you with hands-on labs, skill verification, and the NATIVE framework.",
  keywords: [
    "AI training",
    "AI-Native transformation",
    "NATIVE framework",
    "enterprise training",
    "LMS",
    "adaptive learning",
    "prompt engineering",
    "workforce development",
  ],
  authors: [{ name: "ScaledNative" }],
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/logo.png",
  },
  openGraph: {
    title: "ScaledNative | AI-Powered Training for AI-Native Transformation",
    description: "Stop watching. Start doing. Real training. Real results.",
    type: "website",
    locale: "en_US",
    siteName: "ScaledNative",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ScaledNative - AI-Powered Training Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ScaledNative | AI-Powered Training for AI-Native Transformation",
    description: "Stop watching. Start doing. Real training. Real results.",
    images: ["/og-image.png"],
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://scalednative.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        {children}
        <AITrainingAssistant />
      </body>
    </html>
  );
}
