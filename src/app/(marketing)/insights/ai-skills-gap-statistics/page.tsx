import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "AI Skills Gap Statistics 2025 | Enterprise Research | ScaledNative",
    description: "Latest AI skills gap research and statistics for 2025. 87% of organizations report AI talent shortages. Learn the numbers behind the AI skills crisis and how to solve it.",
    keywords: ["AI skills gap", "AI skills gap statistics", "AI talent shortage", "AI workforce statistics", "enterprise AI skills research"],
    alternates: { canonical: "https://scalednative.com/insights/ai-skills-gap-statistics" },
};

export default function AISkillsGapPage() {
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
                    <div className="text-sm text-white/40 uppercase tracking-wider mb-4">Insights • Research</div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">AI Skills Gap Statistics 2025</h1>
                    <p className="text-xl text-white/60 mb-12">The numbers behind the AI talent crisis — and what enterprises are doing about it.</p>

                    <div className="grid md:grid-cols-2 gap-6 mb-12">
                        {[
                            { stat: "87%", label: "of organizations report AI skills gaps" },
                            { stat: "70%", label: "of AI projects fail due to skill shortage" },
                            { stat: "$500B", label: "estimated global AI skills gap cost" },
                            { stat: "2.5M", label: "AI jobs unfilled globally" },
                            { stat: "15%", label: "average completion rate, traditional training" },
                            { stat: "95%", label: "completion rate with hands-on training" },
                        ].map((item, i) => (
                            <div key={i} className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
                                <div className="text-4xl font-bold text-emerald-400 mb-2">{item.stat}</div>
                                <p className="text-white/60 text-sm">{item.label}</p>
                            </div>
                        ))}
                    </div>

                    <div className="prose prose-invert prose-lg max-w-none">
                        <h2 className="text-2xl font-bold mt-12 mb-4">Key Findings</h2>
                        <ul className="text-white/70 space-y-3 mb-8">
                            <li><strong>Executives understand the problem:</strong> 87% report AI skills gaps, but most don't have a systematic training plan.</li>
                            <li><strong>Traditional training fails:</strong> Video-based platforms show 15% completion. Knowledge doesn't transfer.</li>
                            <li><strong>Hiring isn't the answer:</strong> AI talent commands premium salaries. Upskilling is 5x more cost-effective.</li>
                            <li><strong>Hands-on is the solution:</strong> Interactive labs and practical training achieve 95% completion and real skill transfer.</li>
                        </ul>

                        <h2 className="text-2xl font-bold mt-12 mb-4">The Solution: Systematic AI Training</h2>
                        <p className="text-white/70 mb-6">Organizations successfully closing the AI skills gap share common traits: executive sponsorship, structured methodology (like NATIVE), hands-on learning, and measurable outcomes.</p>

                        <Link href="/demo" className="inline-flex px-6 py-3 bg-white text-black rounded-full font-medium">Close Your AI Skills Gap</Link>
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
