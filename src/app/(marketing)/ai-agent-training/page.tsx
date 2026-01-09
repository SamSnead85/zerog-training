import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "AI Agent Training | Build AI Agents & Automation | ScaledNative",
    description: "Training on building AI agents and autonomous systems. Learn agent architecture, multi-agent workflows, tool use, and production deployment. Advanced AI practitioner track.",
    keywords: ["AI agent training", "build AI agents", "autonomous AI training", "multi-agent systems", "AI automation training"],
    alternates: { canonical: "https://scalednative.com/ai-agent-training" },
};

export default function AIAgentTrainingPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
                    <Link href="/" className="font-playfair text-2xl italic">ScaledNative<sup className="text-[10px]">™</sup></Link>
                    <Link href="/signup" className="px-4 py-2 bg-white text-black rounded-full text-sm font-medium">Get Started</Link>
                </div>
            </nav>
            <section className="pt-32 pb-20 px-6"><div className="max-w-6xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 mb-8">
                    <span className="text-sm text-amber-400">Advanced Track</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-bold mb-6">AI Agent<br />Training</h1>
                <p className="text-xl text-white/60 max-w-3xl mx-auto mb-8">Build autonomous AI systems. Agent architecture, tool use, and production deployment.</p>
                <Link href="/signup" className="px-8 py-4 bg-amber-600 text-white rounded-full font-semibold">Start Agent Training</Link>
            </div></section>
            <section className="py-20 px-6 border-t border-white/5"><div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-3 gap-6">
                    {[
                        { title: "Agent Architecture", desc: "Design autonomous AI systems" },
                        { title: "Tool Use", desc: "Connect agents to APIs and tools" },
                        { title: "Multi-Agent Systems", desc: "Orchestrate agent collaboration" },
                        { title: "Memory & Context", desc: "Build stateful AI workflows" },
                        { title: "Production Deploy", desc: "Scale agents reliably" },
                        { title: "Safety & Guardrails", desc: "Responsible agent development" },
                    ].map((t, i) => (
                        <div key={i} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                            <h3 className="font-semibold mb-2">{t.title}</h3>
                            <p className="text-sm text-white/50">{t.desc}</p>
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
