import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Top 10 AI Skills for 2025 | Essential Skills for AI-Native Workforce | ScaledNative",
    description: "The top 10 AI skills every professional needs in 2025. From prompt engineering to AI ethics, learn which skills drive career success in the AI era. Research-backed insights.",
    keywords: ["top AI skills 2025", "AI skills for professionals", "essential AI skills", "AI career skills", "most important AI skills"],
    alternates: { canonical: "https://scalednative.com/insights/top-ai-skills-2025" },
};

export default function TopAISkillsPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
                    <Link href="/" className="font-playfair text-2xl italic">ScaledNative<sup className="text-[10px]">™</sup></Link>
                    <Link href="/signup" className="px-4 py-2 bg-white text-black rounded-full text-sm font-medium">Get Started</Link>
                </div>
            </nav>
            <article className="pt-32 pb-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="text-sm text-white/40 uppercase tracking-wider mb-4">Insights • Career</div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Top 10 AI Skills for 2025</h1>
                    <p className="text-xl text-white/60 mb-12">The essential skills every professional needs to thrive in the AI era.</p>
                    <div className="space-y-6">
                        {[
                            { rank: 1, skill: "Prompt Engineering", desc: "Craft effective prompts for ChatGPT, Claude, and other LLMs" },
                            { rank: 2, skill: "AI Tool Selection", desc: "Evaluate and choose the right AI tools for specific tasks" },
                            { rank: 3, skill: "AI-Augmented Workflow Design", desc: "Redesign work processes to leverage AI capabilities" },
                            { rank: 4, skill: "Data Literacy for AI", desc: "Understand data quality, bias, and AI inputs/outputs" },
                            { rank: 5, skill: "AI Output Validation", desc: "Critically evaluate and verify AI-generated content" },
                            { rank: 6, skill: "AI Ethics & Responsible Use", desc: "Apply ethical frameworks to AI decisions" },
                            { rank: 7, skill: "Human-AI Collaboration", desc: "Work effectively alongside AI systems" },
                            { rank: 8, skill: "AI-Powered Communication", desc: "Use AI for writing, presentations, and collaboration" },
                            { rank: 9, skill: "Continuous AI Learning", desc: "Stay current with rapidly evolving AI capabilities" },
                            { rank: 10, skill: "AI Strategy & Leadership", desc: "Guide teams and organizations in AI adoption" },
                        ].map((item) => (
                            <div key={item.rank} className="flex gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                                <span className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold flex-shrink-0">{item.rank}</span>
                                <div>
                                    <h3 className="font-semibold">{item.skill}</h3>
                                    <p className="text-white/50 text-sm">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-12 text-center">
                        <Link href="/signup" className="inline-flex px-6 py-3 bg-emerald-500 text-white rounded-full font-medium">Develop These Skills</Link>
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
