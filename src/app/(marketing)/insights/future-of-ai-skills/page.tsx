import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Future of AI Skills | AI Skills 2025-2030 | ScaledNative",
    description: "The future of AI skills and competencies. Explore what AI skills will be most valuable from 2025-2030. Prepare your workforce for tomorrow.",
    keywords: ["future AI skills", "AI skills 2025", "AI skills 2030", "future of work AI", "AI competencies future"],
    alternates: { canonical: "https://scalednative.com/insights/future-of-ai-skills" },
};

export default function FutureOfAISkillsPage() {
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
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">The Future of AI Skills: 2025-2030</h1>
                    <p className="text-xl text-white/60 mb-12">What skills will define the AI-native workforce of tomorrow?</p>

                    <div className="space-y-8">
                        {[
                            { year: "2025", skill: "Prompt Engineering", desc: "Advanced prompting and LLM orchestration becomes table stakes" },
                            { year: "2026", skill: "AI Workflow Design", desc: "Building multi-step AI processes and agent systems" },
                            { year: "2027", skill: "AI Governance", desc: "Managing AI ethics, compliance, and risk at scale" },
                            { year: "2028", skill: "Human-AI Collaboration", desc: "Optimizing human-AI teaming for maximum productivity" },
                            { year: "2029", skill: "AI Strategy", desc: "Driving organizational AI transformation" },
                            { year: "2030", skill: "AI Leadership", desc: "Leading AI-native organizations and industries" },
                        ].map((item, i) => (
                            <div key={i} className="p-6 rounded-xl bg-white/[0.02] border border-white/5">
                                <span className="text-blue-400 font-bold">{item.year}</span>
                                <h3 className="text-lg font-bold mt-2">{item.skill}</h3>
                                <p className="text-white/60 text-sm mt-1">{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12">
                        <Link href="/demo" className="inline-flex px-6 py-3 bg-white text-black rounded-full font-medium">Prepare Your Team</Link>
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
