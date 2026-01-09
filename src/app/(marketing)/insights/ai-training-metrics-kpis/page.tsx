import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "AI Training Metrics & KPIs | How to Measure AI Training Success | ScaledNative",
    description: "The essential metrics and KPIs to measure AI training success. From completion rates to business impact, learn what to track and benchmark against. Enterprise data included.",
    keywords: ["AI training metrics", "AI training KPIs", "measure AI training success", "training ROI metrics", "learning analytics AI"],
    alternates: { canonical: "https://scalednative.com/insights/ai-training-metrics-kpis" },
};

export default function AITrainingMetricsPage() {
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
                    <div className="text-sm text-white/40 uppercase tracking-wider mb-4">Insights • Analytics</div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">AI Training Metrics & KPIs</h1>
                    <p className="text-xl text-white/60 mb-12">What to measure and how to benchmark AI training success.</p>

                    <h2 className="text-2xl font-bold mt-8 mb-6">Learning Metrics</h2>
                    <div className="grid md:grid-cols-2 gap-4 mb-12">
                        {[
                            { metric: "Completion Rate", target: ">90%", avg: "15%", desc: "Course completion percentage" },
                            { metric: "Time to Competency", target: "<30 days", avg: "90+ days", desc: "Time to demonstrate proficiency" },
                            { metric: "Assessment Scores", target: ">85%", avg: "Varies", desc: "Quiz and certification pass rates" },
                            { metric: "Lab Completion", target: ">80%", avg: "N/A", desc: "Hands-on exercise completion" },
                        ].map((m, i) => (
                            <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                                <h3 className="font-semibold">{m.metric}</h3>
                                <div className="flex gap-4 mt-2 text-sm">
                                    <span className="text-emerald-400">Target: {m.target}</span>
                                    <span className="text-white/40">Industry avg: {m.avg}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <h2 className="text-2xl font-bold mt-8 mb-6">Business Impact Metrics</h2>
                    <div className="grid md:grid-cols-2 gap-4 mb-12">
                        {[
                            { metric: "Productivity Gain", desc: "Output increase post-training" },
                            { metric: "Time Savings", desc: "Hours saved on AI-assisted tasks" },
                            { metric: "Error Reduction", desc: "Quality improvement percentage" },
                            { metric: "ROI", desc: "Return on training investment" },
                        ].map((m, i) => (
                            <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                                <h3 className="font-semibold">{m.metric}</h3>
                                <p className="text-white/50 text-sm mt-1">{m.desc}</p>
                            </div>
                        ))}
                    </div>

                    <Link href="/demo" className="inline-flex px-6 py-3 bg-white text-black rounded-full font-medium">See Analytics Demo</Link>
                </div>
            </article>
            <footer className="py-12 px-8 border-t border-white/5"><div className="mx-auto max-w-6xl flex justify-between items-center">
                <span className="font-playfair text-lg italic">ScaledNative<sup className="text-[8px]">™</sup></span>
                <div className="text-xs text-white/20">© 2025 ScaledNative™</div>
            </div></footer>
        </div>
    );
}
