import type { Metadata } from "next";

// SEO metadata for the individual learner module
export const metadata: Metadata = {
    title: "AI-Native Training Courses | Learn & Get Certified | ScaledNative",
    description: "Master AI-native software development with industry-recognized certifications. Courses from $99. Learn prompt engineering, human-AI collaboration, and the NATIVE framework. 50,000+ learners, 4.9 rating.",
    keywords: [
        "AI training courses",
        "AI certification online",
        "prompt engineering course",
        "AI-native training",
        "NATIVE framework certification",
        "learn AI development",
        "AI courses for individuals",
        "online AI training",
        "AI upskilling",
        "AI career development",
        "human-AI collaboration training",
        "agentic AI course",
        "AI professional certification",
        "learn prompt engineering",
        "AI skills training",
    ],
    openGraph: {
        title: "AI-Native Training Courses | ScaledNative",
        description: "Master AI-native software development. Courses from $99. Industry-recognized certifications.",
        type: "website",
        url: "https://scalednative.com/learn",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "ScaledNative AI-Native Training Courses",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "AI-Native Training Courses | ScaledNative",
        description: "Master AI-native development. Courses from $99. Get certified.",
        images: ["/og-image.png"],
    },
    alternates: {
        canonical: "https://scalednative.com/learn",
    },
};

export { metadata as learnMetadata };
