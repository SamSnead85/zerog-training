import type { Metadata } from "next";
import Link from "next/link";
import { Shield } from "lucide-react";
import { BreadcrumbSchema } from "@/components/seo/StructuredData";

export const metadata: Metadata = {
    title: "Insurance AI Training | AI for Insurance Professionals | ScaledNative",
    description: "AI training for insurance professionals. Learn underwriting automation, claims processing AI, fraud detection, and customer experience optimization. Industry-compliant training.",
    keywords: ["insurance AI training", "AI for insurance", "underwriting AI", "claims AI training", "insurance automation AI"],
    alternates: { canonical: "https://scalednative.com/insurance-ai-training" },
};

export default function InsuranceAITrainingPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <BreadcrumbSchema items={[{ name: "Home", url: "https://scalednative.com" }, { name: "Insurance AI Training", url: "https://scalednative.com/insurance-ai-training" }]} />
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
                    <Link href="/" className="font-playfair text-2xl italic">ScaledNative<sup className="text-[10px]">™</sup></Link>
                    <Link href="/demo" className="px-4 py-2 bg-white text-black rounded-full text-sm font-medium">Get Demo</Link>
                </div>
            </nav>
            <section className="pt-32 pb-20 px-6"><div className="max-w-6xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 mb-8">
                    <Shield className="h-4 w-4 text-blue-400" />
                    <span className="text-sm text-blue-400">SOC 2 Compliant</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-bold mb-6">Insurance<br />AI Training</h1>
                <p className="text-xl text-white/60 max-w-3xl mx-auto mb-8">Transform insurance operations with AI. Underwriting, claims, and customer experience.</p>
                <Link href="/demo" className="px-8 py-4 bg-blue-600 text-white rounded-full font-semibold">Request Demo</Link>
            </div></section>
            <section className="py-20 px-6 border-t border-white/5"><div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-3 gap-6">
                    {[
                        { title: "Underwriting AI", desc: "Automated risk assessment" },
                        { title: "Claims Processing", desc: "AI-accelerated claims handling" },
                        { title: "Fraud Detection", desc: "ML-powered fraud identification" },
                        { title: "Customer Experience", desc: "AI chatbots and personalization" },
                        { title: "Policy Analysis", desc: "AI document processing" },
                        { title: "Actuarial AI", desc: "Advanced risk modeling" },
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
