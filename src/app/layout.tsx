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
  title: "ZeroG | AI-Powered Training for Modern Teams",
  description:
    "Generate custom training tailored to your organization. Transform your workforce with AI-native learning that adapts to your tech stack, workflows, and industry.",
  keywords: [
    "AI training",
    "corporate training",
    "LMS",
    "learning management system",
    "AI curriculum generator",
    "enterprise training",
    "prompt engineering",
    "workforce development",
  ],
  authors: [{ name: "ZeroG" }],
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/logo.png",
  },
  openGraph: {
    title: "ZeroG | AI-Powered Training for Modern Teams",
    description: "Generate custom training. Transform your workforce.",
    type: "website",
    locale: "en_US",
    siteName: "ZeroG",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ZeroG - AI-Powered Training Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ZeroG | AI-Powered Training for Modern Teams",
    description: "Generate custom training. Transform your workforce.",
    images: ["/og-image.png"],
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://zerog.ai"),
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
