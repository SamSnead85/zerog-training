import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "AI Adoption Barriers & Solutions | Enterprise AI | ScaledNative",
    description: "Common enterprise AI adoption barriers and how to overcome them. Cultural resistance, skills gaps, data readiness, and executive buy-in solutions.",
    keywords: ["AI adoption barriers", "enterprise AI challenges", "AI transformation obstacles", "AI adoption solutions", "AI change management"],
    alternates: { canonical: "https://scalednative.com/insights/ai-adoption-barriers" },
};

export default function AIAdoptionBarriersPage() {
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
                    <div className="text-sm text-white/40 uppercase tracking-wider mb-4">Insights • Strategy</div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">AI Adoption Barriers & Solutions</h1>
                    <p className="text-xl text-white/60 mb-12">Why AI initiatives fail and how to ensure success.</p>

                    <div className="space-y-8">
                        {[
                            { barrier: "Cultural Resistance", solution: "Start with quick wins that demonstrate value. Make AI adoption optional at first, mandatory once proven.", pct: "45%" },
                            { barrier: "Skills Gaps", solution: "Role-based training that meets people where they are. Focus on practical application, not AI theory.", pct: "38%" },
                            { barrier: "Data Readiness", solution: "Start with existing, clean data sources. Build data hygiene into AI workflows.", pct: "32%" },
                            { barrier: "Executive Buy-in", solution: "Present AI as business transformation, not IT project. Tie to revenue and efficiency metrics.", pct: "28%" },
                            { barrier: "Tool Sprawl", solution: "Standardize on enterprise AI tools. Create clear usage guidelines and governance.", pct: "25%" },
                        ].map((item, i) => (
                            <div key={i} className="p-6 rounded-xl bg-white/[0.02] border border-white/5">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="text-lg font-bold text-red-400">{item.barrier}</h3>
                                    <span className="text-white/40 text-sm">{item.pct} cite this</span>
                                </div>
                                <p className="text-white/60"><span className="text-emerald-400 font-medium">Solution:</span> {item.solution}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12">
                        <Link href="/demo" className="inline-flex px-6 py-3 bg-white text-black rounded-full font-medium">Get Adoption Help</Link>
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
