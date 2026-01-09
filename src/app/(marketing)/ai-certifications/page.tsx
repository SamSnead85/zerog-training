import type { Metadata } from "next";
import Link from "next/link";
import { FAQSchema, BreadcrumbSchema } from "@/components/seo/StructuredData";

export const metadata: Metadata = {
    title: "AI Certification Programs | Enterprise AI Certifications | ScaledNative",
    description: "Industry-recognized AI certifications for professionals. 6 certification tracks: AI-Native Foundations, Implementation Specialist, Prompt Engineering, Transformation Leader, Data Strategist, Enterprise Architect.",
    keywords: ["AI certification", "AI certification programs", "AI professional certification", "enterprise AI certification", "AI-native certification", "prompt engineering certification"],
    alternates: { canonical: "https://scalednative.com/ai-certifications" },
};

const faqs = [
    { question: "What AI certifications does ScaledNative offer?", answer: "ScaledNative offers 6 certifications: AI-Native Foundations, AI-Native Implementation Specialist, Prompt Engineering Professional, AI Transformation Leader, AI Data Strategist, and Enterprise AI Architect." },
    { question: "Are these certifications industry-recognized?", answer: "Yes, ScaledNative certifications are recognized by leading enterprises. Certification holders work at Fortune 500 companies across healthcare, finance, technology, and more." },
    { question: "How do I prepare for AI certification?", answer: "Complete ScaledNative's training track for your desired certification. Each track includes video lessons, hands-on labs, practice assessments, and the final certification exam." },
];

export default function AICertificationsPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <FAQSchema faqs={faqs} />
            <BreadcrumbSchema items={[{ name: "Home", url: "https://scalednative.com" }, { name: "AI Certifications", url: "https://scalednative.com/ai-certifications" }]} />
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
                    <Link href="/" className="font-playfair text-2xl italic">ScaledNative<sup className="text-[10px]">™</sup></Link>
                    <Link href="/signup" className="px-4 py-2 bg-white text-black rounded-full text-sm font-medium">Get Certified</Link>
                </div>
            </nav>
            <section className="pt-32 pb-20 px-6"><div className="max-w-6xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#c9a55c]/10 border border-[#c9a55c]/30 mb-8">
                    <span className="text-sm text-[#c9a55c]">Industry-Recognized Credentials</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-bold mb-6">AI Certification<br />Programs</h1>
                <p className="text-xl text-white/60 max-w-3xl mx-auto mb-12">Validate your AI skills with industry-recognized <strong className="text-white">AI certifications</strong>. 6 tracks from foundations to enterprise architecture.</p>
            </div></section>
            <section className="py-20 px-6 border-t border-white/5"><div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold mb-12 text-center">Certification Tracks</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        { name: "AI-Native Foundations", level: "Beginner", hours: "8 hours", desc: "Essential AI literacy for all professionals" },
                        { name: "AI-Native Implementation", level: "Intermediate", hours: "20 hours", desc: "Deploy AI solutions in enterprise environments" },
                        { name: "Prompt Engineering Pro", level: "Intermediate", hours: "16 hours", desc: "Master prompting for ChatGPT, Claude, GPT-4" },
                        { name: "AI Transformation Leader", level: "Advanced", hours: "24 hours", desc: "Lead organizational AI transformation" },
                        { name: "AI Data Strategist", level: "Advanced", hours: "20 hours", desc: "Data strategy for AI-powered organizations" },
                        { name: "Enterprise AI Architect", level: "Expert", hours: "30 hours", desc: "Design enterprise-scale AI systems" },
                    ].map((cert, i) => (
                        <div key={i} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[#c9a55c]/30 transition-colors">
                            <div className="text-xs text-[#c9a55c] uppercase tracking-wider mb-2">{cert.level} • {cert.hours}</div>
                            <h3 className="font-semibold text-lg mb-2">{cert.name}</h3>
                            <p className="text-sm text-white/50">{cert.desc}</p>
                        </div>
                    ))}
                </div>
            </div></section>
            <section className="py-20 px-6 border-t border-white/5"><div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-12 text-center">AI Certification FAQs</h2>
                {faqs.map((faq, i) => (<details key={i} className="group p-6 rounded-2xl bg-white/[0.02] border border-white/5 mb-4"><summary className="font-semibold cursor-pointer flex justify-between">{faq.question}<span className="group-open:rotate-45">+</span></summary><p className="mt-4 text-white/60">{faq.answer}</p></details>))}
            </div></section>
            <section className="py-20 px-6 border-t border-white/5"><div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-4">Start Your Certification Journey</h2>
                <Link href="/signup" className="inline-flex px-8 py-4 bg-[#c9a55c] text-black rounded-full font-semibold">Get Certified Today</Link>
            </div></section>
            <footer className="py-12 px-8 border-t border-white/5"><div className="mx-auto max-w-6xl flex justify-between items-center">
                <span className="font-playfair text-lg italic">ScaledNative<sup className="text-[8px]">™</sup></span>
                <div className="text-xs text-white/20">© 2025 ScaledNative™</div>
            </div></footer>
        </div>
    );
}
