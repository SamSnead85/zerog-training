import type { Metadata } from "next";
import Link from "next/link";
import { FAQSchema, BreadcrumbSchema } from "@/components/seo/StructuredData";

export const metadata: Metadata = {
    title: "ChatGPT Training for Business | Enterprise ChatGPT Training | ScaledNative",
    description: "Enterprise ChatGPT training for your workforce. Learn to use ChatGPT for business productivity, content creation, analysis, and automation. Hands-on training with real business use cases.",
    keywords: ["ChatGPT training", "ChatGPT for business", "enterprise ChatGPT training", "ChatGPT training course", "learn ChatGPT", "ChatGPT for work", "ChatGPT enterprise"],
    alternates: { canonical: "https://scalednative.com/chatgpt-training" },
};

const faqs = [
    { question: "What is ChatGPT training for business?", answer: "ChatGPT training teaches professionals to effectively use ChatGPT for business tasks: content creation, analysis, research, customer service, coding, and workflow automation." },
    { question: "Is this training for GPT-4 or free ChatGPT?", answer: "ScaledNative's ChatGPT training covers both free ChatGPT and GPT-4/ChatGPT Plus, including enterprise API usage. We teach you to maximize value from any version." },
];

export default function ChatGPTTrainingPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <FAQSchema faqs={faqs} />
            <BreadcrumbSchema items={[{ name: "Home", url: "https://scalednative.com" }, { name: "ChatGPT Training", url: "https://scalednative.com/chatgpt-training" }]} />
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
                    <Link href="/" className="font-playfair text-2xl italic">ScaledNative<sup className="text-[10px]">™</sup></Link>
                    <div className="hidden md:flex gap-10"><Link href="/native" className="text-sm text-white/40 hover:text-white">Framework</Link><Link href="/pricing" className="text-sm text-white/40 hover:text-white">Pricing</Link></div>
                    <Link href="/signup" className="px-4 py-2 bg-white text-black rounded-full text-sm font-medium">Get Started</Link>
                </div>
            </nav>
            <section className="pt-32 pb-20 px-6"><div className="max-w-6xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 mb-8">
                    <span className="text-sm text-emerald-400">Most Popular AI Tool</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-bold mb-6">ChatGPT Training<br />for Business</h1>
                <p className="text-xl text-white/60 max-w-3xl mx-auto mb-8">Master <strong className="text-white">ChatGPT for business</strong>. Learn prompting, use cases, and best practices to 10x your productivity.</p>
                <Link href="/signup" className="px-8 py-4 bg-emerald-500 text-white rounded-full font-semibold">Start ChatGPT Training</Link>
            </div></section>
            <section className="py-20 px-6 border-t border-white/5"><div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold mb-12 text-center">ChatGPT Business Use Cases</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { title: "Content Creation", desc: "Emails, reports, documentation" },
                        { title: "Data Analysis", desc: "Summarize, extract, interpret" },
                        { title: "Research", desc: "Market research, competitive intel" },
                        { title: "Customer Service", desc: "Response drafts, ticket handling" },
                        { title: "Code Assistance", desc: "Debug, explain, generate code" },
                        { title: "Strategy", desc: "Brainstorm, planning, scenarios" },
                        { title: "Training Content", desc: "Create learning materials" },
                        { title: "Automation", desc: "Workflow optimization" },
                    ].map((useCase, i) => (
                        <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                            <h3 className="font-semibold mb-1 text-sm">{useCase.title}</h3>
                            <p className="text-xs text-white/50">{useCase.desc}</p>
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
