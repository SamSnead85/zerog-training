import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Build vs Buy AI Training | Enterprise Decision Guide | ScaledNative",
    description: "Should your enterprise build or buy AI training? Analysis of costs, time-to-value, maintenance, and expertise requirements. Data-driven framework for decision-making.",
    keywords: ["build vs buy AI training", "make or buy training", "AI training platform decision", "enterprise training build buy"],
    alternates: { canonical: "https://scalednative.com/insights/build-vs-buy-ai-training" },
};

export default function BuildVsBuyPage() {
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
                    <div className="text-sm text-white/40 uppercase tracking-wider mb-4">Insights • Decision Framework</div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Build vs Buy AI Training</h1>
                    <p className="text-xl text-white/60 mb-12">A framework for the enterprise AI training decision.</p>

                    <div className="overflow-x-auto mb-12">
                        <table className="w-full text-left text-sm">
                            <thead><tr className="border-b border-white/10">
                                <th className="py-3 px-4">Factor</th>
                                <th className="py-3 px-4">Build In-House</th>
                                <th className="py-3 px-4">Buy Platform</th>
                            </tr></thead>
                            <tbody>
                                {[
                                    ["Time to Launch", "6-12 months", "Weeks"],
                                    ["Initial Cost", "$500K-2M+", "$50-200K/year"],
                                    ["Ongoing Updates", "Continuous internal effort", "Included"],
                                    ["Content Quality", "Varies with internal expertise", "Expert-curated"],
                                    ["Scalability", "Need to build infrastructure", "Built-in"],
                                    ["Total 3-Year Cost", "$1.5-5M+", "$150-600K"],
                                ].map((row, i) => (
                                    <tr key={i} className="border-b border-white/5">
                                        <td className="py-3 px-4 font-medium">{row[0]}</td>
                                        <td className="py-3 px-4 text-white/60">{row[1]}</td>
                                        <td className="py-3 px-4 text-emerald-400">{row[2]}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <h2 className="text-2xl font-bold mt-8 mb-4">When to Build</h2>
                    <ul className="text-white/70 space-y-2 mb-8">
                        <li>• Highly proprietary processes that can't be taught generically</li>
                        <li>• Existing L&D team with AI curriculum expertise</li>
                        <li>• Regulatory requirements for full content control</li>
                    </ul>

                    <h2 className="text-2xl font-bold mt-8 mb-4">When to Buy</h2>
                    <ul className="text-white/70 space-y-2 mb-8">
                        <li>• Need fast time-to-value (weeks not months)</li>
                        <li>• AI is evolving too fast for internal teams to keep up</li>
                        <li>• Want proven completion rates and outcomes</li>
                        <li>• Most organizations choose: Buy + Supplement</li>
                    </ul>

                    <Link href="/demo" className="inline-flex px-6 py-3 bg-white text-black rounded-full font-medium">Get Platform Demo</Link>
                </div>
            </article>
            <footer className="py-12 px-8 border-t border-white/5"><div className="mx-auto max-w-6xl flex justify-between items-center">
                <span className="font-playfair text-lg italic">ScaledNative<sup className="text-[8px]">™</sup></span>
                <div className="text-xs text-white/20">© 2025 ScaledNative™</div>
            </div></footer>
        </div>
    );
}
