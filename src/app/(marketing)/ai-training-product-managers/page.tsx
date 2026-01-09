import type { Metadata } from "next";
import Link from "next/link";
import { FAQSchema, BreadcrumbSchema } from "@/components/seo/StructuredData";

export const metadata: Metadata = {
    title: "AI for Product Managers | Product AI Training & Strategy | ScaledNative",
    description: "AI training for product managers. Learn AI product strategy, feature prioritization, user research automation, and competitive analysis with AI. Transform product development.",
    keywords: ["AI for product managers", "product manager AI training", "AI product strategy", "product management AI", "AI for PMs"],
    alternates: { canonical: "https://scalednative.com/ai-training-product-managers" },
};

const faqs = [
    { question: "What do product managers learn?", answer: "Product managers learn AI-powered user research, feature prioritization, market analysis, competitive intelligence, roadmap planning, and AI-driven product decisions." },
];

export default function AITrainingProductPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <FAQSchema faqs={faqs} />
            <BreadcrumbSchema items={[{ name: "Home", url: "https://scalednative.com" }, { name: "AI Training for Product", url: "https://scalednative.com/ai-training-product-managers" }]} />
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
                    <Link href="/" className="font-playfair text-2xl italic">ScaledNative<sup className="text-[10px]">™</sup></Link>
                    <Link href="/signup" className="px-4 py-2 bg-white text-black rounded-full text-sm font-medium">Get Started</Link>
                </div>
            </nav>
            <section className="pt-32 pb-20 px-6"><div className="max-w-6xl mx-auto text-center">
                <h1 className="text-5xl md:text-7xl font-bold mb-6">AI Training for<br />Product Managers</h1>
                <p className="text-xl text-white/60 max-w-3xl mx-auto mb-8">Build better products with AI. Strategy, research, and competitive intelligence.</p>
                <Link href="/signup" className="px-8 py-4 bg-purple-500 text-white rounded-full font-semibold">Start Product Training</Link>
            </div></section>
            <section className="py-20 px-6 border-t border-white/5"><div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-3 gap-6">
                    {[
                        { title: "User Research", desc: "AI-powered customer insights" },
                        { title: "Feature Prioritization", desc: "Data-driven decision making" },
                        { title: "Competitive Intel", desc: "AI market analysis" },
                        { title: "Roadmap Planning", desc: "Intelligent release planning" },
                        { title: "PRD Automation", desc: "AI-assisted documentation" },
                        { title: "Metrics & Analytics", desc: "AI product performance tracking" },
                    ].map((t, i) => (
                        <div key={i} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                            <h3 className="font-semibold mb-2">{t.title}</h3>
                            <p className="text-sm text-white/50">{t.desc}</p>
                        </div>
                    ))}
                </div>
            </div></section>
            <footer className="py-12 px-8 border-t border-white/5"><div className="mx-auto max-w-6xl flex justify-between items-center">
                <span className="font-playfair text-lg italic">ScaledNative<sup className="text-[8px]">™</sup></span>
                <div className="text-xs text-white/20">© 2025 ScaledNative™</div>
            </div></footer>
        </div>
    );
}
