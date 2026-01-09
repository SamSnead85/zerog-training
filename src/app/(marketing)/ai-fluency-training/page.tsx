import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "AI Fluency Training | Build AI Fluency Across Your Org | ScaledNative",
    description: "AI fluency training for all employees. Build foundational AI understanding across your organization. From AI literacy to practical application.",
    keywords: ["AI fluency training", "AI literacy training", "AI fluency program", "organization AI training", "employee AI fluency"],
    alternates: { canonical: "https://scalednative.com/ai-fluency-training" },
};

export default function AIFluencyTrainingPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
                    <Link href="/" className="font-playfair text-2xl italic">ScaledNative<sup className="text-[10px]">™</sup></Link>
                    <Link href="/demo" className="px-4 py-2 bg-white text-black rounded-full text-sm font-medium">Get Demo</Link>
                </div>
            </nav>
            <section className="pt-32 pb-20 px-6"><div className="max-w-6xl mx-auto text-center">
                <h1 className="text-5xl md:text-7xl font-bold mb-6">AI Fluency<br />Training</h1>
                <p className="text-xl text-white/60 max-w-3xl mx-auto mb-8">Build AI fluency across your entire organization. From literacy to application.</p>
                <Link href="/demo" className="px-8 py-4 bg-teal-600 text-white rounded-full font-semibold">Request Demo</Link>
            </div></section>
            <section className="py-20 px-6 border-t border-white/5"><div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-8 text-center">Fluency Levels</h2>
                <div className="space-y-6">
                    {[
                        { level: "Level 1: Awareness", desc: "What is AI, how it works, where it's used" },
                        { level: "Level 2: Literacy", desc: "AI concepts, terminology, capabilities and limits" },
                        { level: "Level 3: Application", desc: "Using AI tools in daily work" },
                        { level: "Level 4: Fluency", desc: "Advanced prompting, multi-tool workflows" },
                        { level: "Level 5: Mastery", desc: "Building AI-native processes and teaching others" },
                    ].map((item, i) => (
                        <div key={i} className="p-6 rounded-xl bg-white/[0.02] border border-white/5">
                            <h3 className="font-semibold text-teal-400">{item.level}</h3>
                            <p className="text-white/60 text-sm mt-1">{item.desc}</p>
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
