import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "AI Training for Data Scientists | Advanced AI/ML Training | ScaledNative",
    description: "Advanced AI training for data scientists. Deep learning, MLOps, model deployment, and LLM fine-tuning. Hands-on labs with cutting-edge AI tools and frameworks.",
    keywords: ["AI for data scientists", "data science AI training", "MLOps training", "deep learning training", "LLM fine-tuning training"],
    alternates: { canonical: "https://scalednative.com/ai-training-data-scientists" },
};

export default function AITrainingDataSciencePage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
                    <Link href="/" className="font-playfair text-2xl italic">ScaledNative<sup className="text-[10px]">™</sup></Link>
                    <Link href="/signup" className="px-4 py-2 bg-white text-black rounded-full text-sm font-medium">Get Started</Link>
                </div>
            </nav>
            <section className="pt-32 pb-20 px-6"><div className="max-w-6xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/30 mb-8">
                    <span className="text-sm text-indigo-400">Advanced Track</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-bold mb-6">AI Training for<br />Data Scientists</h1>
                <p className="text-xl text-white/60 max-w-3xl mx-auto mb-8">Level up your ML skills. Deep learning, MLOps, and LLM fine-tuning.</p>
                <Link href="/signup" className="px-8 py-4 bg-indigo-600 text-white rounded-full font-semibold">Start Data Science Training</Link>
            </div></section>
            <section className="py-20 px-6 border-t border-white/5"><div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-3 gap-6">
                    {[
                        { title: "LLM Fine-Tuning", desc: "Custom model adaptation" },
                        { title: "MLOps", desc: "Production ML workflows" },
                        { title: "Deep Learning", desc: "Advanced neural architectures" },
                        { title: "Model Deployment", desc: "Scalable inference systems" },
                        { title: "RAG Systems", desc: "Retrieval-augmented generation" },
                        { title: "AI Agents", desc: "Autonomous AI systems" },
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
