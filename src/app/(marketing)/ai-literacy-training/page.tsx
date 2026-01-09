import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "AI Literacy Training | Essential AI Skills for All Employees | ScaledNative",
    description: "AI literacy training for your entire workforce. Ensure every employee understands AI fundamentals, responsible use, and practical applications. The foundation of AI transformation.",
    keywords: ["AI literacy training", "AI literacy for employees", "basic AI training", "AI awareness training", "AI fundamentals training"],
    alternates: { canonical: "https://scalednative.com/ai-literacy-training" },
};

export default function AILiteracyTrainingPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
                    <Link href="/" className="font-playfair text-2xl italic">ScaledNative<sup className="text-[10px]">™</sup></Link>
                    <Link href="/signup" className="px-4 py-2 bg-white text-black rounded-full text-sm font-medium">Get Started</Link>
                </div>
            </nav>
            <section className="pt-32 pb-20 px-6"><div className="max-w-6xl mx-auto text-center">
                <h1 className="text-5xl md:text-6xl font-bold mb-6">AI Literacy<br />Training</h1>
                <p className="text-xl text-white/60 max-w-3xl mx-auto mb-8">The foundation of AI transformation. Ensure every employee has essential AI understanding.</p>
                <Link href="/signup" className="px-8 py-4 bg-blue-500 text-white rounded-full font-semibold">Start Literacy Training</Link>
            </div></section>
            <section className="py-20 px-6 border-t border-white/5"><div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-8 text-center">AI Literacy Curriculum</h2>
                <div className="space-y-4">
                    {[
                        { module: "1", title: "What is AI?", topics: "Machine learning, neural networks, generative AI basics" },
                        { module: "2", title: "AI in the Workplace", topics: "How AI transforms work, common use cases, opportunities" },
                        { module: "3", title: "Working with AI Tools", topics: "ChatGPT, Claude, Copilot, practical application" },
                        { module: "4", title: "Responsible AI Use", topics: "Ethics, bias, privacy, data security" },
                        { module: "5", title: "AI and Your Role", topics: "Role-specific applications, efficiency gains" },
                        { module: "6", title: "The AI-Native Future", topics: "Industry trends, continuous learning" },
                    ].map((mod, i) => (
                        <div key={i} className="flex gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                            <span className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">{mod.module}</span>
                            <div>
                                <h3 className="font-semibold">{mod.title}</h3>
                                <p className="text-white/50 text-sm">{mod.topics}</p>
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
