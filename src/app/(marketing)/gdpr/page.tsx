import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "GDPR Compliant AI Training | EU Data Protection | ScaledNative",
    description: "GDPR-compliant AI training platform. EU data residency options, data portability, and comprehensive privacy controls. Train European workforces with confidence.",
    keywords: ["GDPR AI training", "EU data protection training", "GDPR compliant learning", "European AI training", "privacy compliant training"],
    alternates: { canonical: "https://scalednative.com/gdpr" },
};

export default function GDPRPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
                    <Link href="/" className="font-playfair text-2xl italic">ScaledNative<sup className="text-[10px]">™</sup></Link>
                    <Link href="/security" className="px-4 py-2 bg-white text-black rounded-full text-sm font-medium">Security</Link>
                </div>
            </nav>
            <section className="pt-32 pb-20 px-6"><div className="max-w-6xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 mb-8">
                    <span className="text-sm text-blue-400">GDPR Compliant</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-bold mb-6">GDPR<br />Compliance</h1>
                <p className="text-xl text-white/60 max-w-3xl mx-auto mb-8">Full EU data protection compliance. EU data centres, privacy controls, and data portability.</p>
                <Link href="/security" className="px-8 py-4 bg-blue-600 text-white rounded-full font-semibold">View Privacy Details</Link>
            </div></section>
            <section className="py-20 px-6 border-t border-white/5"><div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-8 text-center">GDPR Features</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    {[
                        { name: "EU Data Residency", desc: "Data stored in EU data centres" },
                        { name: "Data Portability", desc: "Export all user data on request" },
                        { name: "Right to Erasure", desc: "Complete data deletion support" },
                        { name: "Consent Management", desc: "Granular privacy preferences" },
                        { name: "DPA Available", desc: "Standard Data Processing Agreement" },
                        { name: "Privacy by Design", desc: "Built-in data minimization" },
                    ].map((feature, i) => (
                        <div key={i} className="p-6 rounded-xl bg-white/[0.02] border border-white/5">
                            <h3 className="font-semibold mb-2">{feature.name}</h3>
                            <p className="text-white/60 text-sm">{feature.desc}</p>
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
