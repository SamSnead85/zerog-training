import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Measuring AI Training Success | AI Training Metrics Guide | ScaledNative",
    description: "How to measure AI training success. Key metrics, KPIs, and benchmarks for enterprise AI training programs. Prove ROI and demonstrate impact.",
    keywords: ["AI training metrics", "measuring AI training", "AI training KPIs", "AI training ROI", "AI training success metrics"],
    alternates: { canonical: "https://scalednative.com/insights/measuring-ai-training-success" },
};

export default function MeasuringAITrainingSuccessPage() {
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
                    <div className="text-sm text-white/40 uppercase tracking-wider mb-4">Insights • Measurement</div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Measuring AI Training Success</h1>
                    <p className="text-xl text-white/60 mb-12">The essential metrics and KPIs for proving AI training ROI.</p>

                    <div className="space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold mb-4">Leading Indicators</h2>
                            <div className="grid gap-4">
                                {[
                                    { metric: "Completion Rate", target: ">80%" },
                                    { metric: "Time to First Use", target: "<7 days" },
                                    { metric: "Assessment Scores", target: ">75%" },
                                    { metric: "Engagement Rate", target: ">60%" },
                                ].map((item, i) => (
                                    <div key={i} className="flex justify-between p-4 rounded-lg bg-white/[0.02] border border-white/5">
                                        <span>{item.metric}</span>
                                        <span className="text-emerald-400">{item.target}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold mb-4">Lagging Indicators</h2>
                            <div className="grid gap-4">
                                {[
                                    { metric: "Productivity Gain", target: "20-40%" },
                                    { metric: "Time Savings", target: "5-10 hrs/week" },
                                    { metric: "Quality Improvement", target: "15-25%" },
                                    { metric: "Employee Satisfaction", target: "+15 NPS" },
                                ].map((item, i) => (
                                    <div key={i} className="flex justify-between p-4 rounded-lg bg-white/[0.02] border border-white/5">
                                        <span>{item.metric}</span>
                                        <span className="text-blue-400">{item.target}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mt-12">
                        <Link href="/demo" className="inline-flex px-6 py-3 bg-white text-black rounded-full font-medium">Get Measurement Support</Link>
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
