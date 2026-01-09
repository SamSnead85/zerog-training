import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "AI Training for Revenue Teams | Sales & Rev Ops AI | ScaledNative",
    description: "AI training for revenue teams. Learn AI pipeline management, forecasting, territory planning, and revenue operations automation. RevOps AI curriculum.",
    keywords: ["revenue team AI training", "RevOps AI training", "sales AI training", "pipeline AI", "forecasting AI"],
    alternates: { canonical: "https://scalednative.com/ai-training-revenue-teams" },
};

export default function AITrainingRevenueTeamsPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
                    <Link href="/" className="font-playfair text-2xl italic">ScaledNative<sup className="text-[10px]">™</sup></Link>
                    <Link href="/signup" className="px-4 py-2 bg-white text-black rounded-full text-sm font-medium">Get Started</Link>
                </div>
            </nav>
            <section className="pt-32 pb-20 px-6"><div className="max-w-6xl mx-auto text-center">
                <h1 className="text-5xl md:text-7xl font-bold mb-6">AI Training for<br />Revenue Teams</h1>
                <p className="text-xl text-white/60 max-w-3xl mx-auto mb-8">Close with AI. Pipeline, forecasting, and revenue operations.</p>
                <Link href="/signup" className="px-8 py-4 bg-green-600 text-white rounded-full font-semibold">Start Revenue Training</Link>
            </div></section>
            <section className="py-20 px-6 border-t border-white/5"><div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-3 gap-6">
                    {[
                        { title: "Pipeline Management", desc: "AI deal prioritization" },
                        { title: "Forecasting", desc: "AI revenue prediction" },
                        { title: "Territory Planning", desc: "AI account distribution" },
                        { title: "RevOps Automation", desc: "AI workflow optimization" },
                        { title: "Engagement", desc: "AI outreach and cadences" },
                        { title: "Intelligence", desc: "AI competitive and account" },
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
