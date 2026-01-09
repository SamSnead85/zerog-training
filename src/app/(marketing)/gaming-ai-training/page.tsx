import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "AI for Gaming | Gaming Industry AI Training | ScaledNative",
    description: "AI training for gaming industry professionals. Learn AI game design, procedural generation, player analytics, and live ops automation.",
    keywords: ["gaming AI training", "AI for gaming", "game design AI", "procedural generation AI", "player analytics AI"],
    alternates: { canonical: "https://scalednative.com/gaming-ai-training" },
};

export default function GamingAITrainingPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
                    <Link href="/" className="font-playfair text-2xl italic">ScaledNative<sup className="text-[10px]">™</sup></Link>
                    <Link href="/demo" className="px-4 py-2 bg-white text-black rounded-full text-sm font-medium">Get Demo</Link>
                </div>
            </nav>
            <section className="pt-32 pb-20 px-6"><div className="max-w-6xl mx-auto text-center">
                <h1 className="text-5xl md:text-7xl font-bold mb-6">Gaming<br />AI Training</h1>
                <p className="text-xl text-white/60 max-w-3xl mx-auto mb-8">Level up with AI. Design, generation, and player insights.</p>
                <Link href="/demo" className="px-8 py-4 bg-violet-600 text-white rounded-full font-semibold">Request Demo</Link>
            </div></section>
            <section className="py-20 px-6 border-t border-white/5"><div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-3 gap-6">
                    {[
                        { title: "Game Design", desc: "AI-assisted level and mechanics" },
                        { title: "Procedural Gen", desc: "AI content creation" },
                        { title: "Player Analytics", desc: "AI engagement optimization" },
                        { title: "Live Ops", desc: "AI event and content management" },
                        { title: "Monetization", desc: "AI pricing and offers" },
                        { title: "QA Testing", desc: "AI bug detection" },
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
