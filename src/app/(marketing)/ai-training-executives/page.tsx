import type { Metadata } from "next";
import Link from "next/link";
import { FAQSchema, BreadcrumbSchema } from "@/components/seo/StructuredData";

export const metadata: Metadata = {
    title: "AI Training for Executives | Executive AI Training & Leadership | ScaledNative",
    description: "Executive AI training for C-suite leaders and senior management. Learn AI strategy, governance, and transformation leadership. ScaledNative's executive track prepares leaders to drive AI initiatives.",
    keywords: ["AI training for executives", "executive AI training", "C-suite AI training", "AI for leaders", "AI leadership training", "CEO AI training", "CIO AI training"],
    alternates: { canonical: "https://scalednative.com/ai-training-executives" },
};

const faqs = [
    { question: "What do executives learn in AI training?", answer: "ScaledNative's executive AI training covers AI strategy, governance, ROI measurement, vendor evaluation, talent development, risk management, and leading AI transformation." },
    { question: "How long is the executive AI program?", answer: "The executive track is 20 hours, typically completed over 4-6 weeks at executive-friendly pace. Sessions are designed for busy schedules with flexible learning." },
];

export default function AITrainingExecutivesPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <FAQSchema faqs={faqs} />
            <BreadcrumbSchema items={[{ name: "Home", url: "https://scalednative.com" }, { name: "AI Training for Executives", url: "https://scalednative.com/ai-training-executives" }]} />
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
                    <Link href="/" className="font-playfair text-2xl italic">ScaledNative<sup className="text-[10px]">™</sup></Link>
                    <div className="hidden md:flex gap-10"><Link href="/native" className="text-sm text-white/40 hover:text-white">Framework</Link><Link href="/pricing" className="text-sm text-white/40 hover:text-white">Pricing</Link></div>
                    <Link href="/demo" className="px-4 py-2 bg-white text-black rounded-full text-sm font-medium">Get Demo</Link>
                </div>
            </nav>
            <section className="pt-32 pb-20 px-6"><div className="max-w-6xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#c9a55c]/10 border border-[#c9a55c]/30 mb-8">
                    <span className="text-sm text-[#c9a55c]">Executive Leadership Track</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-bold mb-6">AI Training<br />for Executives</h1>
                <p className="text-xl text-white/60 max-w-3xl mx-auto mb-8">Transform your leadership with <strong className="text-white">executive AI training</strong>. Strategy, governance, and transformation leadership for C-suite and senior management.</p>
                <Link href="/demo" className="px-8 py-4 bg-[#c9a55c] text-black rounded-full font-semibold">Request Executive Demo</Link>
            </div></section>
            <section className="py-20 px-6 border-t border-white/5"><div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold mb-12 text-center">Executive AI Curriculum</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        { title: "AI Strategy", desc: "Develop enterprise AI vision and roadmap" },
                        { title: "AI Governance", desc: "Risk, ethics, and responsible AI frameworks" },
                        { title: "ROI Measurement", desc: "Build business cases, measure outcomes" },
                        { title: "Vendor Evaluation", desc: "Assess AI vendors and build partnerships" },
                        { title: "Talent Strategy", desc: "Build AI-ready workforce and culture" },
                        { title: "Change Leadership", desc: "Lead organizational AI transformation" },
                    ].map((topic, i) => (
                        <div key={i} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                            <h3 className="font-semibold mb-2">{topic.title}</h3>
                            <p className="text-sm text-white/50">{topic.desc}</p>
                        </div>
                    ))}
                </div>
            </div></section>
            <section className="py-20 px-6 border-t border-white/5"><div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-12 text-center">Executive AI FAQs</h2>
                {faqs.map((faq, i) => (<details key={i} className="group p-6 rounded-2xl bg-white/[0.02] border border-white/5 mb-4"><summary className="font-semibold cursor-pointer flex justify-between">{faq.question}<span className="group-open:rotate-45">+</span></summary><p className="mt-4 text-white/60">{faq.answer}</p></details>))}
            </div></section>
            <footer className="py-12 px-8 border-t border-white/5"><div className="mx-auto max-w-6xl flex justify-between items-center">
                <span className="font-playfair text-lg italic">ScaledNative<sup className="text-[8px]">™</sup></span>
                <div className="text-xs text-white/20">© 2025 ScaledNative™</div>
            </div></footer>
        </div>
    );
}
