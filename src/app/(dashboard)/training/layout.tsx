import { Metadata } from "next";

export const metadata: Metadata = {
    title: "AI-Native Training | ScaledNative",
    description: "Transform your workforce into AI-Native professionals. Comprehensive curriculum covering Agentic AI, RAG, MLOps, AI-Native workflows, and enterprise AI architecture. Built on frameworks from DeepLearning.AI, Google Cloud, and Microsoft.",
    keywords: ["AI training", "Agentic AI", "LLM training", "enterprise AI", "AI certification", "AI-Native", "MLOps", "RAG architecture"],
    openGraph: {
        title: "AI-Native Training | ScaledNative",
        description: "Transform your workforce into AI-Native professionals with role-specific AI training.",
        type: "website",
        siteName: "ScaledNative",
    },
    twitter: {
        card: "summary_large_image",
        title: "AI-Native Training | ScaledNative",
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
