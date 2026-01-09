import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema } from "@/components/seo/StructuredData";

export const metadata: Metadata = {
    title: "Telecom AI Training | AI for Telecommunications | ScaledNative",
    description: "AI training for telecommunications professionals. Learn network optimization, customer churn prediction, 5G AI applications, and service automation. Telecom-specific AI curriculum.",
    keywords: ["telecom AI training", "telecommunications AI", "AI for telecom", "network AI training", "5G AI training"],
    alternates: { canonical: "https://scalednative.com/telecom-ai-training" },
};

export default function TelecomAITrainingPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <BreadcrumbSchema items={[{ name: "Home", url: "https://scalednative.com" }, { name: "Telecom AI Training", url: "https://scalednative.com/telecom-ai-training" }]} />
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
                    <Link href="/" className="font-playfair text-2xl italic">ScaledNative<sup className="text-[10px]">™</sup></Link>
                    <Link href="/demo" className="px-4 py-2 bg-white text-black rounded-full text-sm font-medium">Get Demo</Link>
                </div>
            </nav>
            <section className="pt-32 pb-20 px-6"><div className="max-w-6xl mx-auto text-center">
                <h1 className="text-5xl md:text-7xl font-bold mb-6">Telecom<br />AI Training</h1>
                <p className="text-xl text-white/60 max-w-3xl mx-auto mb-8">Power 5G innovation with AI. Network optimization, customer insights, and service automation.</p>
                <Link href="/demo" className="px-8 py-4 bg-violet-600 text-white rounded-full font-semibold">Request Demo</Link>
            </div></section>
            <section className="py-20 px-6 border-t border-white/5"><div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-3 gap-6">
                    {[
                        { title: "Network Optimization", desc: "AI-driven network performance" },
                        { title: "Churn Prediction", desc: "Proactive customer retention" },
                        { title: "5G Applications", desc: "AI for next-gen networks" },
                        { title: "Customer Service AI", desc: "Intelligent support automation" },
                        { title: "Predictive Maintenance", desc: "AI infrastructure monitoring" },
                        { title: "Revenue Assurance", desc: "AI fraud and leakage detection" },
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
