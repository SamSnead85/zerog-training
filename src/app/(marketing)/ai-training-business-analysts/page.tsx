import type { Metadata } from "next";
import Link from "next/link";
import { FAQSchema, BreadcrumbSchema } from "@/components/seo/StructuredData";

export const metadata: Metadata = {
    title: "AI for Business Analysts | BA AI Training & Analytics | ScaledNative",
    description: "AI training for business analysts. Learn AI-powered data analysis, requirements gathering with AI, process automation, and predictive analytics. Transform BA work with AI tools.",
    keywords: ["AI for business analysts", "business analyst AI training", "BA AI training", "AI analytics training", "requirements AI"],
    alternates: { canonical: "https://scalednative.com/ai-training-business-analysts" },
};

const faqs = [
    { question: "What do business analysts learn?", answer: "BAs learn AI-powered data analysis, requirements automation, process mining, stakeholder communication with AI, and predictive modeling for business decisions." },
];

export default function AITrainingBAPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <FAQSchema faqs={faqs} />
            <BreadcrumbSchema items={[{ name: "Home", url: "https://scalednative.com" }, { name: "AI Training for BAs", url: "https://scalednative.com/ai-training-business-analysts" }]} />
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
                    <Link href="/" className="font-playfair text-2xl italic">ScaledNative<sup className="text-[10px]">™</sup></Link>
                    <Link href="/signup" className="px-4 py-2 bg-white text-black rounded-full text-sm font-medium">Get Started</Link>
                </div>
            </nav>
            <section className="pt-32 pb-20 px-6"><div className="max-w-6xl mx-auto text-center">
                <h1 className="text-5xl md:text-7xl font-bold mb-6">AI Training for<br />Business Analysts</h1>
                <p className="text-xl text-white/60 max-w-3xl mx-auto mb-8">Transform BA workflows with AI. Data analysis, requirements, and process optimization.</p>
                <Link href="/signup" className="px-8 py-4 bg-cyan-500 text-white rounded-full font-semibold">Start BA Training</Link>
            </div></section>
            <section className="py-20 px-6 border-t border-white/5"><div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-3 gap-6">
                    {[
                        { title: "Data Analysis", desc: "AI-powered insights and visualization" },
                        { title: "Requirements", desc: "Automate gathering and documentation" },
                        { title: "Process Mining", desc: "AI discovery of business processes" },
                        { title: "Predictive Analytics", desc: "Forecast trends and outcomes" },
                        { title: "Stakeholder Comms", desc: "AI-assisted presentations and reports" },
                        { title: "Decision Support", desc: "AI-driven recommendations" },
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
