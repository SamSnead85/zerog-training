import type { Metadata } from "next";
import Link from "next/link";
import { FAQSchema, BreadcrumbSchema } from "@/components/seo/StructuredData";

export const metadata: Metadata = {
    title: "AI Training for HR | HR AI Training & People Analytics | ScaledNative",
    description: "AI training for HR professionals. Learn AI-powered recruiting, talent analytics, performance management, and employee experience optimization. GDPR and privacy-aware curriculum.",
    keywords: ["AI training for HR", "HR AI training", "AI for human resources", "recruiting AI training", "talent analytics AI", "people analytics training"],
    alternates: { canonical: "https://scalednative.com/ai-training-hr" },
};

const faqs = [
    { question: "What do HR professionals learn?", answer: "HR professionals learn AI-powered recruiting, resume screening automation, candidate matching, talent analytics, performance management AI, employee experience tools, and bias-aware AI practices." },
    { question: "Does the training cover HR AI ethics?", answer: "Yes, our HR AI training covers hiring bias prevention, GDPR/privacy compliance, transparent AI decision-making, and ethical considerations for people-related AI systems." },
];

export default function AITrainingHRPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <FAQSchema faqs={faqs} />
            <BreadcrumbSchema items={[{ name: "Home", url: "https://scalednative.com" }, { name: "AI Training for HR", url: "https://scalednative.com/ai-training-hr" }]} />
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
                    <Link href="/" className="font-playfair text-2xl italic">ScaledNative<sup className="text-[10px]">™</sup></Link>
                    <Link href="/signup" className="px-4 py-2 bg-white text-black rounded-full text-sm font-medium">Get Started</Link>
                </div>
            </nav>
            <section className="pt-32 pb-20 px-6"><div className="max-w-6xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/30 mb-8">
                    <span className="text-sm text-violet-400">People & Culture Track</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-bold mb-6">AI Training<br />for HR</h1>
                <p className="text-xl text-white/60 max-w-3xl mx-auto mb-8">Transform HR with AI. <strong className="text-white">AI training for HR</strong> covers recruiting, talent analytics, and people experience.</p>
                <Link href="/signup" className="px-8 py-4 bg-violet-500 text-white rounded-full font-semibold">Start HR AI Training</Link>
            </div></section>
            <section className="py-20 px-6 border-t border-white/5"><div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold mb-12 text-center">HR AI Curriculum</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        { title: "AI Recruiting", desc: "Source, screen, and match candidates" },
                        { title: "Talent Analytics", desc: "Predict performance and retention" },
                        { title: "Performance AI", desc: "Augment reviews and feedback" },
                        { title: "Employee Experience", desc: "AI-powered engagement tools" },
                        { title: "L&D Optimization", desc: "Personalize learning with AI" },
                        { title: "Bias Prevention", desc: "Ethical, fair AI practices" },
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
