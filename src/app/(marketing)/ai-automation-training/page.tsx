import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "AI Automation Training | Build AI Workflows & Automations | ScaledNative",
    description: "AI automation training for business professionals. Learn to build AI workflows with n8n, Zapier, Make, and custom automation. Connect AI to your business processes.",
    keywords: ["AI automation training", "AI workflow training", "Zapier AI training", "n8n AI training", "business automation AI"],
    alternates: { canonical: "https://scalednative.com/ai-automation-training" },
};

export default function AIAutomationTrainingPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
                    <Link href="/" className="font-playfair text-2xl italic">ScaledNative<sup className="text-[10px]">™</sup></Link>
                    <Link href="/signup" className="px-4 py-2 bg-white text-black rounded-full text-sm font-medium">Get Started</Link>
                </div>
            </nav>
            <section className="pt-32 pb-20 px-6"><div className="max-w-6xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/30 mb-8">
                    <span className="text-sm text-orange-400">Workflow Automation</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-bold mb-6">AI Automation<br />Training</h1>
                <p className="text-xl text-white/60 max-w-3xl mx-auto mb-8">Build intelligent workflows. Connect AI to your business processes.</p>
                <Link href="/signup" className="px-8 py-4 bg-orange-600 text-white rounded-full font-semibold">Start Automation Training</Link>
            </div></section>
            <section className="py-20 px-6 border-t border-white/5"><div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-3 gap-6">
                    {[
                        { title: "AI + Zapier", desc: "Integrate ChatGPT with 5,000+ apps" },
                        { title: "AI + n8n", desc: "Open-source AI workflow orchestration" },
                        { title: "AI + Make", desc: "Visual AI automation builder" },
                        { title: "Custom Workflows", desc: "Build bespoke AI pipelines" },
                        { title: "API Integrations", desc: "Connect AI to your systems" },
                        { title: "Production Ops", desc: "Monitor and maintain AI automations" },
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
