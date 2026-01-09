import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "AI-Native Transformation Guide | How to Transform Your Organization | ScaledNative",
    description: "Complete guide to AI-native transformation. Learn the NATIVE framework methodology, implementation steps, common pitfalls, and how leading enterprises successfully become AI-native organizations.",
    keywords: ["AI-native transformation", "AI transformation guide", "become AI-native", "enterprise AI transformation", "AI adoption guide", "NATIVE framework"],
    alternates: { canonical: "https://scalednative.com/insights/ai-native-transformation-guide" },
};

export default function AITransformationGuidePage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
                    <Link href="/" className="font-playfair text-2xl italic">ScaledNative<sup className="text-[10px]">™</sup></Link>
                    <Link href="/signup" className="px-4 py-2 bg-white text-black rounded-full text-sm font-medium">Get Started</Link>
                </div>
            </nav>

            <article className="pt-32 pb-20 px-6">
                <div className="max-w-3xl mx-auto">
                    <div className="text-sm text-white/40 uppercase tracking-wider mb-4">Insights • Transformation</div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">The Complete Guide to AI-Native Transformation</h1>
                    <p className="text-xl text-white/60 mb-12">How leading enterprises successfully become AI-native organizations using the NATIVE framework.</p>

                    <div className="prose prose-invert prose-lg max-w-none">
                        <h2 className="text-2xl font-bold mt-12 mb-4">What is AI-Native Transformation?</h2>
                        <p className="text-white/70 mb-6">AI-native transformation is the organizational change process of embedding artificial intelligence into the core of how an enterprise operates. Unlike simply adopting AI tools, AI-native transformation fundamentally rewires workflows, decision-making, and culture around AI capabilities.</p>

                        <h2 className="text-2xl font-bold mt-12 mb-4">The NATIVE Framework™</h2>
                        <p className="text-white/70 mb-6">ScaledNative's NATIVE framework provides a structured methodology for transformation:</p>

                        <div className="grid gap-4 my-8">
                            {[
                                { letter: "N", title: "Navigate", desc: "Assess AI readiness, identify opportunities, map current state" },
                                { letter: "A", title: "Architect", desc: "Design AI integration patterns, governance, and infrastructure" },
                                { letter: "T", title: "Transform", desc: "Train workforce, deploy AI tools, implement new workflows" },
                                { letter: "I", title: "Integrate", desc: "Embed AI into decision-making, processes, and culture" },
                                { letter: "V", title: "Validate", desc: "Measure outcomes, ensure compliance, verify effectiveness" },
                                { letter: "E", title: "Evolve", desc: "Continuously improve, scale adoption, stay current" },
                            ].map((phase, i) => (
                                <div key={i} className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                                    <span className="text-2xl font-bold text-emerald-400 mr-3">{phase.letter}</span>
                                    <span className="font-semibold">{phase.title}</span>
                                    <p className="text-white/50 text-sm mt-1">{phase.desc}</p>
                                </div>
                            ))}
                        </div>

                        <h2 className="text-2xl font-bold mt-12 mb-4">Key Success Factors</h2>
                        <ul className="text-white/70 space-y-2 mb-6">
                            <li>• Executive sponsorship and vision alignment</li>
                            <li>• Workforce training before tool deployment</li>
                            <li>• Measurable outcomes and ROI tracking</li>
                            <li>• Iterative implementation with quick wins</li>
                            <li>• Change management and communication</li>
                        </ul>

                        <h2 className="text-2xl font-bold mt-12 mb-4">Ready to Transform?</h2>
                        <p className="text-white/70 mb-6">ScaledNative provides the training platform and methodology to make your AI-native transformation successful.</p>

                        <Link href="/demo" className="inline-flex px-6 py-3 bg-white text-black rounded-full font-medium">
                            Schedule Transformation Consultation
                        </Link>
                    </div>
                </div>
            </article>

            <footer className="py-12 px-8 border-t border-white/5"><div className="mx-auto max-w-6xl flex justify-between items-center">
                <span className="font-playfair text-lg italic">ScaledNative<sup className="text-[8px]">™</sup></span>
                <div className="text-xs text-white/20">© 2025 ScaledNative™</div>
            </div></footer>
        </div>
    );
}
