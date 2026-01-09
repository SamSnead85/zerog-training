import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "AI for AgTech | Agriculture Technology AI Training | ScaledNative",
    description: "AI training for agriculture technology professionals. Learn AI precision farming, crop analytics, livestock management, and agricultural automation.",
    keywords: ["AgTech AI training", "AI for agriculture technology", "precision farming AI", "crop analytics AI", "farm automation AI"],
    alternates: { canonical: "https://scalednative.com/agtech-ai-training" },
};

export default function AgTechAITrainingPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
                    <Link href="/" className="font-playfair text-2xl italic">ScaledNative<sup className="text-[10px]">™</sup></Link>
                    <Link href="/demo" className="px-4 py-2 bg-white text-black rounded-full text-sm font-medium">Get Demo</Link>
                </div>
            </nav>
            <section className="pt-32 pb-20 px-6"><div className="max-w-6xl mx-auto text-center">
                <h1 className="text-5xl md:text-7xl font-bold mb-6">AgTech<br />AI Training</h1>
                <p className="text-xl text-white/60 max-w-3xl mx-auto mb-8">Farm smarter with AI. Precision, analytics, and automation.</p>
                <Link href="/demo" className="px-8 py-4 bg-green-600 text-white rounded-full font-semibold">Request Demo</Link>
            </div></section>
            <section className="py-20 px-6 border-t border-white/5"><div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-3 gap-6">
                    {[
                        { title: "Precision Farming", desc: "AI field optimization" },
                        { title: "Crop Analytics", desc: "AI yield prediction" },
                        { title: "Livestock", desc: "AI herd management" },
                        { title: "Automation", desc: "AI equipment control" },
                        { title: "Weather", desc: "AI climate adaptation" },
                        { title: "Supply Chain", desc: "AI farm-to-table" },
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
