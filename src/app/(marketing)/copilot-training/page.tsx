import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema } from "@/components/seo/StructuredData";

export const metadata: Metadata = {
    title: "Copilot Training for Developers | GitHub Copilot Training | ScaledNative",
    description: "GitHub Copilot training for development teams. Learn AI-assisted coding, code review automation, and developer productivity optimization. Hands-on labs with Copilot.",
    keywords: ["Copilot training", "GitHub Copilot training", "AI coding training", "developer AI training", "code automation training"],
    alternates: { canonical: "https://scalednative.com/copilot-training" },
};

export default function CopilotTrainingPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <BreadcrumbSchema items={[{ name: "Home", url: "https://scalednative.com" }, { name: "Copilot Training", url: "https://scalednative.com/copilot-training" }]} />
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
                    <Link href="/" className="font-playfair text-2xl italic">ScaledNative<sup className="text-[10px]">™</sup></Link>
                    <Link href="/signup" className="px-4 py-2 bg-white text-black rounded-full text-sm font-medium">Get Started</Link>
                </div>
            </nav>
            <section className="pt-32 pb-20 px-6"><div className="max-w-6xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 mb-8">
                    <span className="text-sm text-blue-400">Developer Productivity</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-bold mb-6">Copilot Training<br />for Developers</h1>
                <p className="text-xl text-white/60 max-w-3xl mx-auto mb-8">Maximize GitHub Copilot productivity. AI-assisted coding, review, and automation.</p>
                <Link href="/signup" className="px-8 py-4 bg-blue-500 text-white rounded-full font-semibold">Start Copilot Training</Link>
            </div></section>
            <section className="py-20 px-6 border-t border-white/5"><div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-3 gap-6">
                    {[
                        { title: "Code Completion", desc: "Effective prompts for suggestions" },
                        { title: "Code Generation", desc: "Create functions and classes with AI" },
                        { title: "Test Generation", desc: "AI-assisted test writing" },
                        { title: "Code Review", desc: "AI-powered review workflows" },
                        { title: "Refactoring", desc: "Improve code with Copilot" },
                        { title: "Documentation", desc: "Auto-generate docs and comments" },
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
