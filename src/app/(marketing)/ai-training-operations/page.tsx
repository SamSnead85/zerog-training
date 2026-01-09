import type { Metadata } from "next";
import Link from "next/link";
import { FAQSchema, BreadcrumbSchema } from "@/components/seo/StructuredData";

export const metadata: Metadata = {
    title: "AI Training for Operations | Operations AI Training & Automation | ScaledNative",
    description: "AI training for operations professionals. Learn process automation, supply chain AI, predictive maintenance, and operational efficiency optimization with AI tools.",
    keywords: ["AI training for operations", "operations AI training", "process automation AI", "supply chain AI training", "operational efficiency AI"],
    alternates: { canonical: "https://scalednative.com/ai-training-operations" },
};

const faqs = [
    { question: "What do operations teams learn?", answer: "Operations teams learn process automation, predictive analytics, supply chain optimization, resource allocation AI, quality control automation, and operational decision support." },
];

export default function AITrainingOperationsPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <FAQSchema faqs={faqs} />
            <BreadcrumbSchema items={[{ name: "Home", url: "https://scalednative.com" }, { name: "AI Training for Operations", url: "https://scalednative.com/ai-training-operations" }]} />
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
                    <Link href="/" className="font-playfair text-2xl italic">ScaledNative<sup className="text-[10px]">™</sup></Link>
                    <Link href="/signup" className="px-4 py-2 bg-white text-black rounded-full text-sm font-medium">Get Started</Link>
                </div>
            </nav>
            <section className="pt-32 pb-20 px-6"><div className="max-w-6xl mx-auto text-center">
                <h1 className="text-5xl md:text-7xl font-bold mb-6">AI Training for<br />Operations</h1>
                <p className="text-xl text-white/60 max-w-3xl mx-auto mb-8">Optimize operations with AI. Process automation, predictive analytics, and efficiency optimization.</p>
                <Link href="/signup" className="px-8 py-4 bg-orange-500 text-white rounded-full font-semibold">Start Operations AI Training</Link>
            </div></section>
            <section className="py-20 px-6 border-t border-white/5"><div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        { title: "Process Automation", desc: "Identify and automate workflows" },
                        { title: "Predictive Analytics", desc: "Forecast demand and issues" },
                        { title: "Resource Optimization", desc: "AI-driven allocation" },
                        { title: "Supply Chain AI", desc: "Optimize logistics and inventory" },
                        { title: "Quality Control", desc: "AI-powered inspection and QC" },
                        { title: "Decision Support", desc: "Data-driven operations decisions" },
                    ].map((topic, i) => (
                        <div key={i} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                            <h3 className="font-semibold mb-2">{topic.title}</h3>
                            <p className="text-sm text-white/50">{topic.desc}</p>
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
