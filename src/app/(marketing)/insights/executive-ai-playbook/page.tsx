import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Executive AI Training Playbook | AI for Executives | ScaledNative",
    description: "The complete executive playbook for AI training. Strategy, governance, investment, and measurement for C-suite leaders driving AI transformation.",
    keywords: ["executive AI training", "AI for executives", "C-suite AI training", "AI leadership", "AI transformation playbook"],
    alternates: { canonical: "https://scalednative.com/insights/executive-ai-playbook" },
};

export default function ExecutiveAIPlaybookPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
                    <Link href="/" className="font-playfair text-2xl italic">ScaledNative<sup className="text-[10px]">™</sup></Link>
                    <Link href="/demo" className="px-4 py-2 bg-white text-black rounded-full text-sm font-medium">Get Demo</Link>
                </div>
            </nav>
            <article className="pt-32 pb-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="text-sm text-white/40 uppercase tracking-wider mb-4">Insights • Executive</div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">The Executive AI Training Playbook</h1>
                    <p className="text-xl text-white/60 mb-12">A strategic guide for C-suite leaders driving AI transformation.</p>

                    <div className="space-y-8">
                        {[
                            { phase: "1. Vision & Strategy", items: ["Define AI-native vision", "Identify priority use cases", "Build business case"] },
                            { phase: "2. Governance & Risk", items: ["Establish AI policies", "Define ethical guidelines", "Create compliance framework"] },
                            { phase: "3. Investment & Resources", items: ["Allocate training budget", "Select technology partners", "Build internal champions"] },
                            { phase: "4. Execution & Scale", items: ["Launch pilot programs", "Measure and iterate", "Scale successful initiatives"] },
                            { phase: "5. Culture & Change", items: ["Lead by example", "Celebrate early wins", "Embed AI mindset"] },
                        ].map((item, i) => (
                            <div key={i} className="p-6 rounded-xl bg-white/[0.02] border border-white/5">
                                <h3 className="text-lg font-bold text-blue-400 mb-3">{item.phase}</h3>
                                <ul className="space-y-2">
                                    {item.items.map((subitem, j) => (
                                        <li key={j} className="text-white/60 text-sm flex items-center gap-2">
                                            <span className="text-emerald-400">✓</span> {subitem}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12">
                        <Link href="/demo" className="inline-flex px-6 py-3 bg-white text-black rounded-full font-medium">Get Executive Briefing</Link>
                    </div>
                </div>
            </article>
            <footer className="py-12 px-8 border-t border-white/5"><div className="mx-auto max-w-6xl flex justify-between items-center">
                <span className="font-playfair text-lg italic">ScaledNative<sup className="text-[8px]">™</sup></span>
                <div className="text-xs text-white/20">© 2025 ScaledNative™</div>
            </div></footer>
        </div>
    );
}
