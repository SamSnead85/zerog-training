import type { Metadata } from "next";
import Link from "next/link";
import { FAQSchema, BreadcrumbSchema } from "@/components/seo/StructuredData";

export const metadata: Metadata = {
    title: "AI Training for Legal Teams | Legal AI Training & Compliance | ScaledNative",
    description: "AI training for legal professionals. Learn contract analysis, legal research automation, compliance monitoring, and document review with AI. Ethical AI practices for legal.",
    keywords: ["AI training for legal", "legal AI training", "AI for lawyers", "contract AI training", "legal tech training", "law firm AI training"],
    alternates: { canonical: "https://scalednative.com/ai-training-legal" },
};

const faqs = [
    { question: "What do legal teams learn?", answer: "Legal teams learn AI contract analysis, legal research automation, document review, compliance monitoring, risk assessment, and ethical considerations for legal AI." },
    { question: "Is AI legal training ethics-focused?", answer: "Yes, our legal AI training includes extensive coverage of ethical obligations, confidentiality, privilege protection, and responsible AI use in legal practice." },
];

export default function AITrainingLegalPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <FAQSchema faqs={faqs} />
            <BreadcrumbSchema items={[{ name: "Home", url: "https://scalednative.com" }, { name: "AI Training for Legal", url: "https://scalednative.com/ai-training-legal" }]} />
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
                    <Link href="/" className="font-playfair text-2xl italic">ScaledNative<sup className="text-[10px]">™</sup></Link>
                    <Link href="/signup" className="px-4 py-2 bg-white text-black rounded-full text-sm font-medium">Get Started</Link>
                </div>
            </nav>
            <section className="pt-32 pb-20 px-6"><div className="max-w-6xl mx-auto text-center">
                <h1 className="text-5xl md:text-7xl font-bold mb-6">AI Training for<br />Legal Teams</h1>
                <p className="text-xl text-white/60 max-w-3xl mx-auto mb-8">Modernize legal practice with AI. Contract analysis, research automation, and document review.</p>
                <Link href="/signup" className="px-8 py-4 bg-slate-500 text-white rounded-full font-semibold">Start Legal AI Training</Link>
            </div></section>
            <section className="py-20 px-6 border-t border-white/5"><div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        { title: "Contract Analysis", desc: "AI-powered clause extraction and review" },
                        { title: "Legal Research", desc: "Accelerate case and statute research" },
                        { title: "Document Review", desc: "AI-assisted due diligence" },
                        { title: "Compliance Monitoring", desc: "Automated regulatory tracking" },
                        { title: "Risk Assessment", desc: "AI-driven risk identification" },
                        { title: "Ethics & Privilege", desc: "Responsible legal AI practices" },
                    ].map((topic, i) => (
                        <div key={i} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                            <h3 className="font-semibold mb-2">{topic.title}</h3>
                            <p className="text-sm text-white/50">{topic.desc}</p>
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
