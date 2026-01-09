import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "ChatGPT vs Claude | AI Comparison for Enterprise | ScaledNative",
    description: "Detailed comparison of ChatGPT vs Claude for enterprise use. Features, pricing, security, and use case recommendations. Which AI is right for your organization?",
    keywords: ["ChatGPT vs Claude", "Claude vs ChatGPT", "GPT-4 vs Claude", "enterprise AI comparison", "best AI for business"],
    alternates: { canonical: "https://scalednative.com/insights/chatgpt-vs-claude" },
};

export default function ChatGPTVsClaudePage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
                    <Link href="/" className="font-playfair text-2xl italic">ScaledNative<sup className="text-[10px]">™</sup></Link>
                    <Link href="/signup" className="px-4 py-2 bg-white text-black rounded-full text-sm font-medium">Get Started</Link>
                </div>
            </nav>

            <article className="pt-32 pb-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="text-sm text-white/40 uppercase tracking-wider mb-4">Insights • Comparison</div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">ChatGPT vs Claude: Enterprise AI Comparison</h1>
                    <p className="text-xl text-white/60 mb-12">Which AI assistant is best for your enterprise? A detailed comparison.</p>

                    <div className="overflow-x-auto mb-12">
                        <table className="w-full text-left text-sm">
                            <thead><tr className="border-b border-white/10">
                                <th className="py-3 px-4">Feature</th>
                                <th className="py-3 px-4 text-green-400">ChatGPT/GPT-4</th>
                                <th className="py-3 px-4 text-orange-400">Claude 3</th>
                            </tr></thead>
                            <tbody>
                                {[
                                    ["Context Window", "128K tokens (GPT-4 Turbo)", "200K tokens"],
                                    ["Strengths", "Coding, plugins, ecosystem", "Long documents, reasoning, safety"],
                                    ["Enterprise API", "OpenAI API", "Anthropic API"],
                                    ["Multimodal", "✓ Vision + text", "✓ Vision + text"],
                                    ["Best For", "Code, general tasks", "Analysis, writing, safety-critical"],
                                    ["Enterprise Security", "SOC 2, Data privacy", "SOC 2, Constitutional AI"],
                                ].map((row, i) => (
                                    <tr key={i} className="border-b border-white/5">
                                        <td className="py-3 px-4 font-medium">{row[0]}</td>
                                        <td className="py-3 px-4 text-white/70">{row[1]}</td>
                                        <td className="py-3 px-4 text-white/70">{row[2]}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="prose prose-invert prose-lg max-w-none">
                        <h2 className="text-2xl font-bold mt-12 mb-4">Recommendation</h2>
                        <p className="text-white/70 mb-6">Most enterprises benefit from training employees on multiple AI tools. ScaledNative's curriculum covers both ChatGPT and Claude, ensuring your workforce can leverage the best AI for each task.</p>

                        <Link href="/generative-ai-training" className="inline-flex px-6 py-3 bg-white text-black rounded-full font-medium">Learn Both with ScaledNative</Link>
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
