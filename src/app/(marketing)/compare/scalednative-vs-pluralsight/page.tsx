import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "ScaledNative vs Pluralsight | AI Training Platform Comparison | ScaledNative",
    description: "Compare ScaledNative vs Pluralsight for AI training. See feature differences, pricing, and which platform is right for enterprise AI skills development.",
    keywords: ["ScaledNative vs Pluralsight", "Pluralsight alternative", "AI training comparison", "enterprise learning platform comparison"],
    alternates: { canonical: "https://scalednative.com/compare/scalednative-vs-pluralsight" },
};

export default function VsPluralsightPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
                    <Link href="/" className="font-playfair text-2xl italic">ScaledNative<sup className="text-[10px]">™</sup></Link>
                    <Link href="/demo" className="px-4 py-2 bg-white text-black rounded-full text-sm font-medium">Get Demo</Link>
                </div>
            </nav>
            <section className="pt-32 pb-20 px-6"><div className="max-w-5xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">ScaledNative vs Pluralsight</h1>
                <p className="text-xl text-white/60 max-w-3xl mx-auto mb-12">Purpose-built AI training vs general tech libraries.</p>
            </div></section>
            <section className="py-10 px-6"><div className="max-w-5xl mx-auto">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead><tr className="border-b border-white/10">
                            <th className="py-3 px-4">Feature</th>
                            <th className="py-3 px-4 text-emerald-400">ScaledNative</th>
                            <th className="py-3 px-4 text-white/50">Pluralsight</th>
                        </tr></thead>
                        <tbody>
                            {[
                                ["AI Focus", "AI-native, 100% AI content", "General tech + some AI"],
                                ["Hands-On Labs", "✓ Integrated AI sandboxes", "Limited Skill IQ labs"],
                                ["Completion Rate", "95%", "~25-35%"],
                                ["Content Updates", "Monthly AI updates", "Periodic updates"],
                                ["Enterprise SSO", "✓ SAML, Okta, Azure AD", "✓ Enterprise SSO"],
                                ["Role-Based Paths", "✓ 12+ AI-specific tracks", "General tech paths"],
                                ["Certifications", "6 AI-native certifications", "Skill assessments"],
                                ["Dedicated Success", "✓ Named manager", "Varies by plan"],
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
                <h2 className="text-3xl font-bold mb-4">Ready for AI-Native Training?</h2>
                <Link href="/demo" className="inline-flex px-8 py-4 bg-white text-black rounded-full font-semibold">Request Demo</Link>
            </div></section>
            <footer className="py-12 px-8 border-t border-white/5"><div className="mx-auto max-w-6xl flex justify-between items-center">
                <span className="font-playfair text-lg italic">ScaledNative<sup className="text-[8px]">™</sup></span>
                <div className="text-xs text-white/20">© 2025 ScaledNative™</div>
            </div></footer>
        </div>
    );
}
