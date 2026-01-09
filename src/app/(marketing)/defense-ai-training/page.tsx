import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "AI for Defense | Defense Industry AI Training | ScaledNative",
    description: "AI training for defense professionals. Learn AI threat analysis, logistics optimization, autonomous systems, and mission planning. FedRAMP ready.",
    keywords: ["defense AI training", "military AI training", "DoD AI training", "autonomous systems AI", "defense technology AI"],
    alternates: { canonical: "https://scalednative.com/defense-ai-training" },
};

export default function DefenseAITrainingPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
                    <Link href="/" className="font-playfair text-2xl italic">ScaledNative<sup className="text-[10px]">™</sup></Link>
                    <Link href="/demo" className="px-4 py-2 bg-white text-black rounded-full text-sm font-medium">Get Demo</Link>
                </div>
            </nav>
            <section className="pt-32 pb-20 px-6"><div className="max-w-6xl mx-auto text-center">
                <h1 className="text-5xl md:text-7xl font-bold mb-6">Defense<br />AI Training</h1>
                <p className="text-xl text-white/60 max-w-3xl mx-auto mb-8">Mission-critical AI. Threat analysis, logistics, and autonomous systems.</p>
                <Link href="/demo" className="px-8 py-4 bg-slate-700 text-white rounded-full font-semibold">Request Demo</Link>
            </div></section>
            <section className="py-20 px-6 border-t border-white/5"><div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-3 gap-6">
                    {[
                        { title: "Threat Analysis", desc: "AI intelligence synthesis" },
                        { title: "Logistics", desc: "AI supply chain optimization" },
                        { title: "Autonomous Systems", desc: "AI robotics and drones" },
                        { title: "Mission Planning", desc: "AI scenario analysis" },
                        { title: "Cybersecurity", desc: "AI defense operations" },
                        { title: "Training Simulation", desc: "AI synthetic environments" },
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
