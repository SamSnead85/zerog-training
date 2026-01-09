import type { Metadata } from "next";
import Link from "next/link";
import { FAQSchema, BreadcrumbSchema } from "@/components/seo/StructuredData";

export const metadata: Metadata = {
    title: "Generative AI Training | ChatGPT, Claude, GPT-4 Training | ScaledNative",
    description: "Master generative AI with ScaledNative's comprehensive training. Learn ChatGPT, Claude, GPT-4, Midjourney, and DALL-E for enterprise use. Hands-on labs with real AI tools. Industry-recognized certification.",
    keywords: ["generative AI training", "ChatGPT training", "Claude training", "GPT-4 training", "AI image generation training", "LLM training", "large language model training"],
    alternates: { canonical: "https://scalednative.com/generative-ai-training" },
};

const faqs = [
    { question: "What is generative AI training?", answer: "Generative AI training teaches professionals to effectively use AI systems that create content: text (ChatGPT, Claude), images (Midjourney, DALL-E), code (Copilot), and more. It covers prompting, enterprise applications, and responsible use." },
    { question: "Which generative AI tools are covered?", answer: "ScaledNative's generative AI training covers ChatGPT, GPT-4, Claude, Claude 3, Gemini, Copilot, Midjourney, DALL-E, and enterprise AI platforms. Hands-on labs with each tool." },
    { question: "Is this training for non-technical employees?", answer: "Yes! Our generative AI training starts with beginner-friendly foundations and progressively advances. No coding required for the core curriculum." },
];

export default function GenerativeAITrainingPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <FAQSchema faqs={faqs} />
            <BreadcrumbSchema items={[{ name: "Home", url: "https://scalednative.com" }, { name: "Generative AI Training", url: "https://scalednative.com/generative-ai-training" }]} />
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
                    <Link href="/" className="font-playfair text-2xl italic">ScaledNative<sup className="text-[10px]">™</sup></Link>
                    <div className="hidden md:flex gap-10"><Link href="/native" className="text-sm text-white/40 hover:text-white">Framework</Link><Link href="/pricing" className="text-sm text-white/40 hover:text-white">Pricing</Link></div>
                    <Link href="/signup" className="px-4 py-2 bg-white text-black rounded-full text-sm font-medium">Get Started</Link>
                </div>
            </nav>
            <section className="pt-32 pb-20 px-6"><div className="max-w-6xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/30 mb-8">
                    <span className="text-sm text-pink-400">Master the AI Revolution</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-bold mb-6">Generative AI<br />Training</h1>
                <p className="text-xl text-white/60 max-w-3xl mx-auto mb-8">Learn to harness <strong className="text-white">ChatGPT, Claude, GPT-4, and Midjourney</strong> for enterprise productivity. Hands-on training with real AI tools.</p>
                <Link href="/signup" className="px-8 py-4 bg-pink-500 text-white rounded-full font-semibold">Start Learning</Link>
            </div></section>
            <section className="py-20 px-6 border-t border-white/5"><div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-8">AI Tools You'll Master</h2>
                <div className="flex flex-wrap justify-center gap-4">
                    {["ChatGPT", "GPT-4", "Claude 3", "Gemini", "Copilot", "Midjourney", "DALL-E", "Stable Diffusion"].map((tool, i) => (
                        <span key={i} className="px-4 py-2 rounded-lg bg-white/5 border border-white/10">{tool}</span>
                    ))}
                </div>
            </div></section>
            <section className="py-20 px-6 border-t border-white/5"><div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-12 text-center">Generative AI Training FAQs</h2>
                {faqs.map((faq, i) => (<details key={i} className="group p-6 rounded-2xl bg-white/[0.02] border border-white/5 mb-4"><summary className="font-semibold cursor-pointer flex justify-between">{faq.question}<span className="group-open:rotate-45">+</span></summary><p className="mt-4 text-white/60">{faq.answer}</p></details>))}
            </div></section>
            <footer className="py-12 px-8 border-t border-white/5"><div className="mx-auto max-w-6xl flex justify-between items-center">
                <span className="font-playfair text-lg italic">ScaledNative<sup className="text-[8px]">™</sup></span>
                <div className="text-xs text-white/20">© 2025 ScaledNative™</div>
            </div></footer>
        </div>
    );
}
