import type { Metadata } from "next";
import Link from "next/link";
import { FAQSchema, BreadcrumbSchema } from "@/components/seo/StructuredData";

export const metadata: Metadata = {
    title: "AI Training for Developers | Developer AI Training & Coding with AI | ScaledNative",
    description: "AI training for software developers. Master AI coding assistants, prompt engineering for code, AI integration patterns, and building AI-powered applications. Hands-on labs with Copilot, ChatGPT, and Claude.",
    keywords: ["AI training for developers", "developer AI training", "AI coding training", "Copilot training", "AI for programmers", "AI development training", "code with AI"],
    alternates: { canonical: "https://scalednative.com/ai-training-developers" },
};

const faqs = [
    { question: "What do developers learn in AI training?", answer: "Developers learn AI-assisted coding, prompt engineering for code generation, AI debugging, building AI-powered features, API integration with LLMs, and responsible AI development practices." },
    { question: "Which AI coding tools are covered?", answer: "ScaledNative covers GitHub Copilot, ChatGPT, Claude, GPT-4, Cursor, and API integration with OpenAI, Anthropic, and open-source models." },
];

export default function AITrainingDevelopersPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <FAQSchema faqs={faqs} />
            <BreadcrumbSchema items={[{ name: "Home", url: "https://scalednative.com" }, { name: "AI Training for Developers", url: "https://scalednative.com/ai-training-developers" }]} />
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
                    <Link href="/" className="font-playfair text-2xl italic">ScaledNative<sup className="text-[10px]">™</sup></Link>
                    <div className="hidden md:flex gap-10"><Link href="/native" className="text-sm text-white/40 hover:text-white">Framework</Link><Link href="/pricing" className="text-sm text-white/40 hover:text-white">Pricing</Link></div>
                    <Link href="/signup" className="px-4 py-2 bg-white text-black rounded-full text-sm font-medium">Get Started</Link>
                </div>
            </nav>
            <section className="pt-32 pb-20 px-6"><div className="max-w-6xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30 mb-8">
                    <span className="text-sm text-green-400">Developer Technical Track</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-bold mb-6">AI Training<br />for Developers</h1>
                <p className="text-xl text-white/60 max-w-3xl mx-auto mb-8">Code faster with AI. <strong className="text-white">AI training for developers</strong> covers Copilot, ChatGPT, API integration, and building AI-powered applications.</p>
                <Link href="/signup" className="px-8 py-4 bg-green-500 text-white rounded-full font-semibold">Start Developer Training</Link>
            </div></section>
            <section className="py-20 px-6 border-t border-white/5"><div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-8">AI Tools for Developers</h2>
                <div className="flex flex-wrap justify-center gap-4">
                    {["GitHub Copilot", "ChatGPT", "Claude", "Cursor", "OpenAI API", "Anthropic API", "Llama", "Ollama"].map((tool, i) => (
                        <span key={i} className="px-4 py-2 rounded-lg bg-white/5 border border-white/10">{tool}</span>
                    ))}
                </div>
            </div></section>
            <section className="py-20 px-6 border-t border-white/5"><div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold mb-12 text-center">Developer AI Curriculum</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        { title: "AI-Assisted Coding", desc: "Master Copilot and AI code completion" },
                        { title: "Prompt Engineering for Code", desc: "Generate, refactor, and debug code with prompts" },
                        { title: "LLM API Integration", desc: "Build with OpenAI, Anthropic, and open-source APIs" },
                        { title: "AI-Powered Features", desc: "Add AI to your applications" },
                        { title: "Testing & QA with AI", desc: "Automated testing and code review" },
                        { title: "Responsible AI Dev", desc: "Security, ethics, and best practices" },
                    ].map((topic, i) => (
                        <div key={i} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                            <h3 className="font-semibold mb-2">{topic.title}</h3>
                            <p className="text-sm text-white/50">{topic.desc}</p>
                        </div>
                    ))}
                </div>
            </div></section>
            <section className="py-20 px-6 border-t border-white/5"><div className="max-w-4xl mx-auto">
                {faqs.map((faq, i) => (<details key={i} className="group p-6 rounded-2xl bg-white/[0.02] border border-white/5 mb-4"><summary className="font-semibold cursor-pointer flex justify-between">{faq.question}<span className="group-open:rotate-45">+</span></summary><p className="mt-4 text-white/60">{faq.answer}</p></details>))}
            </div></section>
            <footer className="py-12 px-8 border-t border-white/5"><div className="mx-auto max-w-6xl flex justify-between items-center">
                <span className="font-playfair text-lg italic">ScaledNative<sup className="text-[8px]">™</sup></span>
                <div className="text-xs text-white/20">© 2025 ScaledNative™</div>
            </div></footer>
        </div>
    );
}
