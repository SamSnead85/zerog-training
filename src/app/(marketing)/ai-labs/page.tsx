import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "AI Hands-On Labs | Interactive AI Training Sandboxes | ScaledNative",
    description: "Learn AI through hands-on labs, not passive video watching. ScaledNative's interactive AI sandbox environments let you practice with real AI tools: ChatGPT, Claude, Copilot, and more.",
    keywords: ["AI hands-on labs", "AI training labs", "interactive AI training", "AI sandbox", "practice AI prompting", "AI lab environment"],
    alternates: { canonical: "https://scalednative.com/ai-labs" },
};

export default function AILabsPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
                    <Link href="/" className="font-playfair text-2xl italic">ScaledNative<sup className="text-[10px]">™</sup></Link>
                    <Link href="/signup" className="px-4 py-2 bg-white text-black rounded-full text-sm font-medium">Try Labs</Link>
                </div>
            </nav>
            <section className="pt-32 pb-20 px-6"><div className="max-w-6xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 mb-8">
                    <span className="text-sm text-emerald-400">Hands-On Learning</span>
                </div>
                <h1 className="text-5xl md:text-6xl font-bold mb-6">AI Hands-On Labs</h1>
                <p className="text-xl text-white/60 max-w-3xl mx-auto mb-12">Stop watching. Start doing. Practice AI skills in real sandbox environments.</p>
            </div></section>
            <section className="py-20 px-6 border-t border-white/5"><div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold mb-12 text-center">Lab Environments</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        { name: "Prompt Engineering Lab", desc: "Practice prompting with GPT-4, Claude, and Gemini" },
                        { name: "Code Assistant Lab", desc: "AI-powered coding with Copilot-style tools" },
                        { name: "Content Creation Lab", desc: "Generate and refine marketing content" },
                        { name: "Data Analysis Lab", desc: "AI-powered data insights and visualization" },
                        { name: "Image Generation Lab", desc: "Create visuals with Midjourney/DALL-E" },
                        { name: "Business Workflow Lab", desc: "Build AI-powered automations" },
                    ].map((lab, i) => (
                        <div key={i} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-emerald-500/30 transition-colors">
                            <h3 className="font-semibold text-lg mb-2">{lab.name}</h3>
                            <p className="text-white/60 text-sm">{lab.desc}</p>
                        </div>
                    ))}
                </div>
            </div></section>
            <section className="py-20 px-6 border-t border-white/5"><div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-8 text-center">Why Hands-On Labs?</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    {[
                        { stat: "95%", label: "Completion rate (vs 15% video-only)" },
                        { stat: "3x", label: "Faster skill acquisition" },
                        { stat: "80%", label: "Better knowledge retention" },
                    ].map((item, i) => (
                        <div key={i} className="text-center p-6 rounded-xl bg-white/[0.02] border border-white/5">
                            <div className="text-3xl font-bold text-emerald-400 mb-2">{item.stat}</div>
                            <p className="text-white/60 text-sm">{item.label}</p>
                        </div>
                    ))}
                </div>
            </div></section>
            <section className="py-20 px-6 border-t border-white/5"><div className="max-w-4xl mx-auto text-center">
                <Link href="/signup" className="inline-flex px-8 py-4 bg-emerald-500 text-white rounded-full font-semibold">Start Practicing</Link>
            </div></section>
            <footer className="py-12 px-8 border-t border-white/5"><div className="mx-auto max-w-6xl flex justify-between items-center">
                <span className="font-playfair text-lg italic">ScaledNative<sup className="text-[8px]">™</sup></span>
                <div className="text-xs text-white/20">© 2025 ScaledNative™</div>
            </div></footer>
        </div>
    );
}
