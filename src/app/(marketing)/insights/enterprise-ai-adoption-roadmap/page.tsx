import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Enterprise AI Adoption Roadmap | Step-by-Step Guide | ScaledNative",
    description: "Complete roadmap for enterprise AI adoption. From strategy to implementation to optimization. Learn the phases, timelines, and success factors for organizational AI transformation.",
    keywords: ["enterprise AI adoption", "AI adoption roadmap", "AI implementation roadmap", "organizational AI strategy", "AI transformation roadmap"],
    alternates: { canonical: "https://scalednative.com/insights/enterprise-ai-adoption-roadmap" },
};

export default function AIAdoptionRoadmapPage() {
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
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Enterprise AI Adoption Roadmap</h1>
                    <p className="text-xl text-white/60 mb-12">A systematic approach to AI transformation for large organizations.</p>

                    <div className="space-y-8 mb-12">
                        {[
                            { phase: "1", title: "Discovery & Assessment", duration: "4-6 weeks", tasks: ["AI readiness assessment", "Stakeholder alignment", "Use case prioritization", "Success metrics definition"] },
                            { phase: "2", title: "Strategy & Planning", duration: "4-8 weeks", tasks: ["AI governance framework", "Technology selection", "Training curriculum design", "Change management plan"] },
                            { phase: "3", title: "Foundation Training", duration: "6-8 weeks", tasks: ["Executive AI education", "Manager training rollout", "Foundational skills for all", "Early adopter program"] },
                            { phase: "4", title: "Pilot Implementation", duration: "8-12 weeks", tasks: ["Initial AI tool deployment", "Workflow integration", "Feedback collection", "Success measurement"] },
                            { phase: "5", title: "Scale & Optimize", duration: "Ongoing", tasks: ["Full workforce training", "Advanced certification", "Continuous improvement", "ROI measurement"] },
                        ].map((phase, i) => (
                            <div key={i} className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
                                <div className="flex items-center gap-4 mb-4">
                                    <span className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center">{phase.phase}</span>
                                    <div>
                                        <h3 className="font-semibold text-lg">{phase.title}</h3>
                                        <p className="text-sm text-white/40">{phase.duration}</p>
                                    </div>
                                </div>
                                <ul className="grid md:grid-cols-2 gap-2 text-sm text-white/60">
                                    {phase.tasks.map((task, j) => (<li key={j}>✓ {task}</li>))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div className="text-center">
                        <p className="text-white/60 mb-6">Ready to start your AI adoption journey?</p>
                        <Link href="/demo" className="inline-flex px-6 py-3 bg-white text-black rounded-full font-medium">Get Your Roadmap</Link>
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
