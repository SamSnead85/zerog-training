import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "AI Team Training | Train Your Team on AI | ScaledNative",
    description: "Team AI training programs for groups of all sizes. Cohort-based learning, team competitions, and collaborative AI projects. Build AI-native teams together.",
    keywords: ["team AI training", "AI training for teams", "group AI training", "cohort AI training", "corporate team AI"],
    alternates: { canonical: "https://scalednative.com/team-ai-training" },
};

export default function TeamAITrainingPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
                    <Link href="/" className="font-playfair text-2xl italic">ScaledNative<sup className="text-[10px]">™</sup></Link>
                    <Link href="/demo" className="px-4 py-2 bg-white text-black rounded-full text-sm font-medium">Get Demo</Link>
                </div>
            </nav>
            <section className="pt-32 pb-20 px-6"><div className="max-w-6xl mx-auto text-center">
                <h1 className="text-5xl md:text-7xl font-bold mb-6">Team<br />AI Training</h1>
                <p className="text-xl text-white/60 max-w-3xl mx-auto mb-8">Train together, transform together. Cohort-based AI learning for teams.</p>
                <Link href="/demo" className="px-8 py-4 bg-blue-600 text-white rounded-full font-semibold">Request Team Demo</Link>
            </div></section>
            <section className="py-20 px-6 border-t border-white/5"><div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-8 text-center">Team Learning Features</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    {[
                        { title: "Cohort Learning", desc: "Teams learn together on synchronized schedules" },
                        { title: "Team Competitions", desc: "Gamified challenges and leaderboards" },
                        { title: "Group Projects", desc: "Apply AI to real team problems" },
                        { title: "Team Analytics", desc: "Track collective progress and gaps" },
                        { title: "Discussion Forums", desc: "Team-only collaboration spaces" },
                        { title: "Team Certifications", desc: "Earn team achievement badges" },
                    ].map((item, i) => (
                        <div key={i} className="p-6 rounded-xl bg-white/[0.02] border border-white/5">
                            <h3 className="font-semibold mb-2">{item.title}</h3>
                            <p className="text-white/60 text-sm">{item.desc}</p>
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
