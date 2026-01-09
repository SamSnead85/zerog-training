import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "AI for PropTech | Real Estate Tech AI Training | ScaledNative",
    description: "AI training for property technology professionals. Learn AI property valuation, tenant screening, portfolio analytics, and building automation.",
    keywords: ["PropTech AI training", "AI for real estate tech", "property valuation AI", "real estate analytics AI", "smart building AI"],
    alternates: { canonical: "https://scalednative.com/proptech-ai-training" },
};

export default function PropTechAITrainingPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
                    <Link href="/" className="font-playfair text-2xl italic">ScaledNative<sup className="text-[10px]">™</sup></Link>
                    <Link href="/demo" className="px-4 py-2 bg-white text-black rounded-full text-sm font-medium">Get Demo</Link>
                </div>
            </nav>
            <section className="pt-32 pb-20 px-6"><div className="max-w-6xl mx-auto text-center">
                <h1 className="text-5xl md:text-7xl font-bold mb-6">PropTech<br />AI Training</h1>
                <p className="text-xl text-white/60 max-w-3xl mx-auto mb-8">Transform real estate with AI. Valuation, analytics, and automation.</p>
                <Link href="/demo" className="px-8 py-4 bg-amber-600 text-white rounded-full font-semibold">Request Demo</Link>
            </div></section>
            <section className="py-20 px-6 border-t border-white/5"><div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-3 gap-6">
                    {[
                        { title: "Property Valuation", desc: "AI pricing models" },
                        { title: "Tenant Screening", desc: "AI risk assessment" },
                        { title: "Portfolio Analytics", desc: "AI investment insights" },
                        { title: "Building Automation", desc: "AI smart controls" },
                        { title: "Lease Analysis", desc: "AI document extraction" },
                        { title: "Market Intelligence", desc: "AI trend prediction" },
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
