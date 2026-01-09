import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "ScaledNative vs Skillsoft | AI Training Platform Comparison | ScaledNative",
    description: "Compare ScaledNative vs Skillsoft for AI training. Feature comparison for enterprise learning platforms focused on AI skills development.",
    keywords: ["ScaledNative vs Skillsoft", "Skillsoft alternative", "AI training comparison", "enterprise learning comparison"],
    alternates: { canonical: "https://scalednative.com/compare/scalednative-vs-skillsoft" },
};

export default function VsSkillsoftPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
                    <Link href="/" className="font-playfair text-2xl italic">ScaledNative<sup className="text-[10px]">™</sup></Link>
                    <Link href="/demo" className="px-4 py-2 bg-white text-black rounded-full text-sm font-medium">Get Demo</Link>
                </div>
            </nav>
            <section className="pt-32 pb-20 px-6"><div className="max-w-5xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">ScaledNative vs Skillsoft</h1>
                <p className="text-xl text-white/60 max-w-3xl mx-auto mb-12">Purpose-built AI training vs compliance-focused libraries.</p>
            </div></section>
            <section className="py-10 px-6"><div className="max-w-5xl mx-auto">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead><tr className="border-b border-white/10">
                            <th className="py-3 px-4">Feature</th>
                            <th className="py-3 px-4 text-emerald-400">ScaledNative</th>
                            <th className="py-3 px-4 text-white/50">Skillsoft</th>
                        </tr></thead>
                        <tbody>
                            {[
                                ["Primary Focus", "AI-native transformation", "General L&D + compliance"],
                                ["AI Content", "100% AI curriculum", "Mixed content library"],
                                ["Hands-On Labs", "✓ Interactive AI sandboxes", "Limited"],
                                ["Completion Rate", "95%", "~20-30%"],
                                ["Content Freshness", "Monthly AI updates", "Varies"],
                                ["Role Paths", "12+ AI-specific tracks", "General career paths"],
                                ["Certifications", "6 AI certifications", "Various compliance certs"],
                            ].map((row, i) => (
                                <tr key={i} className="border-b border-white/5">
                                    <td className="py-3 px-4 font-medium">{row[0]}</td>
                                    <td className="py-3 px-4 text-emerald-400">{row[1]}</td>
                                    <td className="py-3 px-4 text-white/50">{row[2]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div></section>
            <section className="py-20 px-6 border-t border-white/5"><div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-4">See the Difference</h2>
                <Link href="/demo" className="inline-flex px-8 py-4 bg-white text-black rounded-full font-semibold">Request Demo</Link>
            </div></section>
            <footer className="py-12 px-8 border-t border-white/5"><div className="mx-auto max-w-6xl flex justify-between items-center">
                <span className="font-playfair text-lg italic">ScaledNative<sup className="text-[8px]">™</sup></span>
                <div className="text-xs text-white/20">© 2025 ScaledNative™</div>
            </div></footer>
        </div>
    );
}
