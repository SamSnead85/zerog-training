import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

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
  title: "ZeroG AI Training | Context-Aware Training That Elevates Your Organization",
  description:
    "Revolutionary AI-powered training platform that deeply understands your organization. Upload your content, and we'll create customized training that references your actual tools, workflows, and policies.",
  keywords: [
    "AI training",
    "corporate training",
    "LMS",
    "learning management system",
    "interactive simulations",
    "HIPAA training",
    "compliance training",
    "enterprise training",
  ],
  authors: [{ name: "ZeroG AI" }],
  openGraph: {
    title: "ZeroG AI Training",
    description: "Context-Aware Training That Elevates Your Organization",
    type: "website",
    locale: "en_US",
    siteName: "ZeroG AI Training",
  },
  twitter: {
    card: "summary_large_image",
    title: "ZeroG AI Training",
    description: "Context-Aware Training That Elevates Your Organization",
  },
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
      </body>
    </html>
  );
}
