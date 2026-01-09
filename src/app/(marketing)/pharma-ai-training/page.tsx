import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "AI for Pharma | Pharmaceutical AI Training | ScaledNative",
    description: "AI training for pharmaceutical professionals. Learn drug discovery AI, clinical trial optimization, regulatory compliance, and pharma research automation. Industry-specific curriculum.",
    keywords: ["pharma AI training", "pharmaceutical AI", "drug discovery AI training", "clinical trial AI", "pharma automation AI"],
    alternates: { canonical: "https://scalednative.com/pharma-ai-training" },
};

export default function PharmaAITrainingPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
                    <Link href="/" className="font-playfair text-2xl italic">ScaledNative<sup className="text-[10px]">™</sup></Link>
                    <Link href="/demo" className="px-4 py-2 bg-white text-black rounded-full text-sm font-medium">Get Demo</Link>
                </div>
            </nav>
            <section className="pt-32 pb-20 px-6"><div className="max-w-6xl mx-auto text-center">
                <h1 className="text-5xl md:text-7xl font-bold mb-6">Pharmaceutical<br />AI Training</h1>
                <p className="text-xl text-white/60 max-w-3xl mx-auto mb-8">Accelerate drug development with AI. Discovery, trials, and regulatory compliance.</p>
                <Link href="/demo" className="px-8 py-4 bg-teal-600 text-white rounded-full font-semibold">Request Pharma Demo</Link>
            </div></section>
            <section className="py-20 px-6 border-t border-white/5"><div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-3 gap-6">
                    {[
                        { title: "Drug Discovery", desc: "AI molecular research and target ID" },
                        { title: "Clinical Trials", desc: "Patient recruitment and protocol optimization" },
                        { title: "Regulatory AI", desc: "FDA/EMA submission acceleration" },
                        { title: "Research Automation", desc: "Lab and literature analysis" },
                        { title: "Safety & Pharmacovigilance", desc: "AI adverse event monitoring" },
                        { title: "Manufacturing QC", desc: "AI quality and batch analysis" },
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
