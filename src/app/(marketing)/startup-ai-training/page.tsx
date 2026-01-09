import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "AI for Startups | Startup AI Training & Bootcamp | ScaledNative",
    description: "AI training designed for startups. Fast-track your team's AI capabilities with intensive bootcamp-style training. Scale AI skills as you grow.",
    keywords: ["startup AI training", "AI for startups", "AI bootcamp", "startup AI skills", "fast-track AI training"],
    alternates: { canonical: "https://scalednative.com/startup-ai-training" },
};

export default function StartupAITrainingPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
                    <Link href="/" className="font-playfair text-2xl italic">ScaledNative<sup className="text-[10px]">™</sup></Link>
                    <Link href="/pricing" className="px-4 py-2 bg-white text-black rounded-full text-sm font-medium">See Pricing</Link>
                </div>
            </nav>
            <section className="pt-32 pb-20 px-6"><div className="max-w-6xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/30 mb-8">
                    <span className="text-sm text-violet-400">Fast-Track Program</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-bold mb-6">Startup<br />AI Training</h1>
                <p className="text-xl text-white/60 max-w-3xl mx-auto mb-8">Move fast with AI. Bootcamp-style training to ramp your team in weeks, not months.</p>
                <Link href="/pricing" className="px-8 py-4 bg-violet-600 text-white rounded-full font-semibold">View Startup Pricing</Link>
            </div></section>
            <section className="py-20 px-6 border-t border-white/5"><div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-8 text-center">Perfect for Startups</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    {[
                        { title: "Quick Ramp", desc: "2-4 week intensive programs" },
                        { title: "Flexible Pricing", desc: "Scales with your headcount" },
                        { title: "Self-Service", desc: "No implementation overhead" },
                        { title: "All Roles", desc: "Founders to engineers covered" },
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
