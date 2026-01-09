import type { Metadata } from "next";
import Link from "next/link";
import { FAQSchema, BreadcrumbSchema } from "@/components/seo/StructuredData";

export const metadata: Metadata = {
    title: "AI Upskilling Programs | AI Workforce Training & Reskilling | ScaledNative",
    description: "Comprehensive AI upskilling programs for your workforce. Close the AI skills gap with ScaledNative's enterprise training. Role-based learning paths, hands-on labs, and measurable outcomes. 95% completion rate.",
    keywords: ["AI upskilling", "AI reskilling", "AI workforce training", "AI skills gap", "employee AI training", "workforce AI transformation", "upskill employees AI"],
    alternates: { canonical: "https://scalednative.com/ai-upskilling" },
};

const faqs = [
    { question: "What is AI upskilling?", answer: "AI upskilling is the process of training existing employees to work effectively with AI technologies. It closes the AI skills gap that 87% of organizations report and prepares your workforce for AI-augmented work." },
    { question: "How long does AI upskilling take?", answer: "ScaledNative's AI upskilling programs range from 8-hour foundations to comprehensive 40+ hour certification tracks. Most employees complete foundational training in 1-2 weeks at 30 minutes/day." },
    { question: "What's the ROI of AI upskilling?", answer: "Organizations report 736% ROI from AI upskilling investments, with 40% productivity gains within 90 days. The cost per successful learner is significantly lower than hiring AI-skilled talent externally." },
];

export default function AIUpskillingPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <FAQSchema faqs={faqs} />
            <BreadcrumbSchema items={[{ name: "Home", url: "https://scalednative.com" }, { name: "AI Upskilling", url: "https://scalednative.com/ai-upskilling" }]} />
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
                    <Link href="/" className="font-playfair text-2xl italic">ScaledNative<sup className="text-[10px]">™</sup></Link>
                    <div className="hidden md:flex gap-10"><Link href="/native" className="text-sm text-white/40 hover:text-white">Framework</Link><Link href="/pricing" className="text-sm text-white/40 hover:text-white">Pricing</Link></div>
                    <Link href="/signup" className="px-4 py-2 bg-white text-black rounded-full text-sm font-medium">Get Started</Link>
                </div>
            </nav>
            <section className="pt-32 pb-20 px-6"><div className="max-w-6xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 mb-8">
                    <span className="text-sm text-cyan-400">Close the AI Skills Gap</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-bold mb-6">AI Upskilling<br />for Your Workforce</h1>
                <p className="text-xl text-white/60 max-w-3xl mx-auto mb-8">Transform your existing workforce with comprehensive <strong className="text-white">AI upskilling programs</strong>. 87% of organizations report an AI skills gap. We help you close it.</p>
                <Link href="/signup" className="px-8 py-4 bg-cyan-500 text-white rounded-full font-semibold">Start AI Upskilling</Link>
            </div></section>
            <section className="py-20 px-6 border-t border-white/5"><div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold mb-12 text-center">AI Upskilling Tracks</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    {[
                        { title: "AI Foundations", hours: "8 hours", audience: "All employees" },
                        { title: "Prompt Engineering", hours: "16 hours", audience: "Knowledge workers" },
                        { title: "AI for Managers", hours: "12 hours", audience: "Team leads" },
                        { title: "AI Data Literacy", hours: "15 hours", audience: "Analysts" },
                        { title: "AI Integration", hours: "20 hours", audience: "Technical roles" },
                        { title: "AI Leadership", hours: "20 hours", audience: "Executives" },
                    ].map((track, i) => (
                        <div key={i} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                            <h3 className="font-semibold mb-2">{track.title}</h3>
                            <p className="text-sm text-white/50">{track.hours} • {track.audience}</p>
                        </div>
                    ))}
                </div>
            </div></section>
            <section className="py-20 px-6 border-t border-white/5"><div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-12 text-center">AI Upskilling FAQs</h2>
                {faqs.map((faq, i) => (<details key={i} className="group p-6 rounded-2xl bg-white/[0.02] border border-white/5 mb-4"><summary className="font-semibold cursor-pointer flex justify-between">{faq.question}<span className="group-open:rotate-45">+</span></summary><p className="mt-4 text-white/60">{faq.answer}</p></details>))}
            </div></section>
            <footer className="py-12 px-8 border-t border-white/5"><div className="mx-auto max-w-6xl flex justify-between items-center">
                <span className="font-playfair text-lg italic">ScaledNative<sup className="text-[8px]">™</sup></span>
                <div className="text-xs text-white/20">© 2025 ScaledNative™</div>
            </div></footer>
        </div>
    );
}
