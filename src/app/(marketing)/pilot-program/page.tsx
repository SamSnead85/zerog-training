import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "AI Training Pilot Program | Start Small, Scale Fast | ScaledNative",
    description: "Launch an AI training pilot program. Start with 50-100 employees, measure results, then scale organization-wide. Low-risk approach to AI upskilling.",
    keywords: ["AI training pilot", "pilot AI training program", "AI training trial", "start AI training", "AI training proof of concept"],
    alternates: { canonical: "https://scalednative.com/pilot-program" },
};

export default function PilotProgramPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
                    <Link href="/" className="font-playfair text-2xl italic">ScaledNative<sup className="text-[10px]">™</sup></Link>
                    <Link href="/demo" className="px-4 py-2 bg-white text-black rounded-full text-sm font-medium">Get Demo</Link>
                </div>
            </nav>
            <section className="pt-32 pb-20 px-6"><div className="max-w-6xl mx-auto text-center">
                <h1 className="text-5xl md:text-7xl font-bold mb-6">Pilot<br />Program</h1>
                <p className="text-xl text-white/60 max-w-3xl mx-auto mb-8">Start small, scale fast. Prove ROI with 50-100 employees before rolling out.</p>
                <Link href="/demo" className="px-8 py-4 bg-blue-600 text-white rounded-full font-semibold">Start Pilot Discussion</Link>
            </div></section>
            <section className="py-20 px-6 border-t border-white/5"><div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-8 text-center">Pilot Timeline</h2>
                <div className="space-y-6">
                    {[
                        { week: "Week 1", title: "Setup", desc: "SSO, enrollment, kickoff" },
                        { week: "Weeks 2-8", title: "Training", desc: "Role-based AI curriculum" },
                        { week: "Week 9-10", title: "Assessment", desc: "Skills measurement" },
                        { week: "Week 11-12", title: "Review", desc: "ROI analysis, scale decision" },
                    ].map((phase, i) => (
                        <div key={i} className="flex gap-6 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                            <span className="text-blue-400 font-bold w-24 flex-shrink-0">{phase.week}</span>
                            <div>
                                <h3 className="font-semibold">{phase.title}</h3>
                                <p className="text-white/50 text-sm">{phase.desc}</p>
                            </div>
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
