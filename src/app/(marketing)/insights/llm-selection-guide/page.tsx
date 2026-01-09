import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "LLM Selection Guide for Enterprise | Choosing the Right AI Model | ScaledNative",
    description: "Guide to selecting LLMs for enterprise. Compare GPT-4, Claude, Gemini, and open-source models. Factors: cost, performance, security, and use case fit.",
    keywords: ["LLM selection guide", "enterprise LLM comparison", "choose AI model", "GPT vs Claude enterprise", "LLM for business"],
    alternates: { canonical: "https://scalednative.com/insights/llm-selection-guide" },
};

export default function LLMSelectionGuidePage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
                    <Link href="/" className="font-playfair text-2xl italic">ScaledNative<sup className="text-[10px]">™</sup></Link>
                    <Link href="/demo" className="px-4 py-2 bg-white text-black rounded-full text-sm font-medium">Get Demo</Link>
                </div>
            </nav>
            <article className="pt-32 pb-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="text-sm text-white/40 uppercase tracking-wider mb-4">Insights • AI Strategy</div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">LLM Selection Guide for Enterprise</h1>
                    <p className="text-xl text-white/60 mb-12">Choose the right AI model for your business needs.</p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">Key Selection Criteria</h2>
                    <div className="space-y-4 mb-12">
                        {[
                            { factor: "Performance", desc: "Accuracy, reasoning, and task-specific capabilities" },
                            { factor: "Cost", desc: "Token pricing by volume and negotiated enterprise contracts" },
                            { factor: "Security", desc: "Data residency, privacy, and compliance certifications" },
                            { factor: "Context Length", desc: "How much data can be processed in a single request" },
                            { factor: "Latency", desc: "Response time for interactive and batch applications" },
                            { factor: "Customization", desc: "Fine-tuning and private model options" },
                        ].map((item, i) => (
                            <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                                <h3 className="font-semibold">{item.factor}</h3>
                                <p className="text-white/50 text-sm">{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    <h2 className="text-2xl font-bold mt-8 mb-4">Model Comparison Overview</h2>
                    <div className="overflow-x-auto mb-12">
                        <table className="w-full text-left text-sm">
                            <thead><tr className="border-b border-white/10">
                                <th className="py-3 px-4">Model</th>
                                <th className="py-3 px-4">Best For</th>
                                <th className="py-3 px-4">Context</th>
                            </tr></thead>
                            <tbody>
                                {[
                                    ["GPT-4 Turbo", "General enterprise use", "128K"],
                                    ["Claude 3", "Long documents, safety", "200K"],
                                    ["Gemini Pro", "Google ecosystem", "1M+"],
                                    ["Llama 3", "On-premise, privacy", "Varies"],
                                ].map((row, i) => (
                                    <tr key={i} className="border-b border-white/5">
                                        <td className="py-3 px-4 font-medium">{row[0]}</td>
                                        <td className="py-3 px-4 text-white/60">{row[1]}</td>
                                        <td className="py-3 px-4 text-white/60">{row[2]}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <Link href="/demo" className="inline-flex px-6 py-3 bg-white text-black rounded-full font-medium">Get Expert Guidance</Link>
                </div>
            </article>
            <footer className="py-12 px-8 border-t border-white/5"><div className="mx-auto max-w-6xl flex justify-between items-center">
                <span className="font-playfair text-lg italic">ScaledNative<sup className="text-[8px]">™</sup></span>
                <div className="text-xs text-white/20">© 2025 ScaledNative™</div>
            </div></footer>
        </div>
    );
}
