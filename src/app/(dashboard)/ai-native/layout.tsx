import { Metadata } from "next";

export const metadata: Metadata = {
    title: "AI-Native Training | ZeroG Training",
    description: "Transform your workforce into AI-Native professionals. Comprehensive curriculum covering Agentic AI, RAG, MLOps, SAFe AI integration, and enterprise AI architecture. Built on frameworks from DeepLearning.AI, SAFe 6.0, Google Cloud, and Microsoft.",
    keywords: ["AI training", "Agentic AI", "LLM training", "enterprise AI", "AI certification", "SAFe AI", "MLOps", "RAG architecture"],
    openGraph: {
        title: "AI-Native Training | ZeroG Training",
        description: "Transform your workforce into AI-Native professionals with role-specific AI training.",
        type: "website",
        siteName: "ZeroG Training",
    },
    twitter: {
        card: "summary_large_image",
        title: "AI-Native Training | ZeroG Training",
        description: "Transform your workforce into AI-Native professionals with role-specific AI training.",
    },
};

export default function AINativeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
