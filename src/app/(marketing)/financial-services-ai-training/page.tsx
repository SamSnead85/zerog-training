import type { Metadata } from "next";
import Link from "next/link";
import { Shield } from "lucide-react";
import { FAQSchema, BreadcrumbSchema } from "@/components/seo/StructuredData";

export const metadata: Metadata = {
    title: "Financial Services AI Training | AI Training for Banking & Finance | ScaledNative",
    description: "SOC 2 compliant AI training for financial services. Train banking, insurance, and investment professionals on AI adoption. Regulatory compliance, risk management, and financial AI use cases.",
    keywords: ["financial services AI training", "banking AI training", "AI for finance", "AI training for banks", "insurance AI training", "investment AI training", "fintech AI training"],
    alternates: { canonical: "https://scalednative.com/financial-services-ai-training" },
};

const faqs = [
    { question: "Is ScaledNative's AI training SOC 2 compliant?", answer: "Yes, ScaledNative is SOC 2 Type II certified and meets the security standards required by financial institutions. We serve major banks, insurance companies, and investment firms." },
    { question: "Does the training cover financial regulations?", answer: "Yes, our financial services AI training includes modules on regulatory compliance, including AI governance, model risk management, and responsible AI practices for regulated industries." },
    { question: "What financial roles does the training cover?", answer: "We offer AI training for analysts, advisors, underwriters, traders, compliance officers, risk managers, and financial executives. Each track addresses role-specific AI applications." },
];

export default function FinancialServicesAITrainingPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <FAQSchema faqs={faqs} />
            <BreadcrumbSchema items={[{ name: "Home", url: "https://scalednative.com" }, { name: "Financial Services AI Training", url: "https://scalednative.com/financial-services-ai-training" }]} />
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
                    <Link href="/" className="font-playfair text-2xl italic">ScaledNative<sup className="text-[10px]">™</sup></Link>
                    <div className="hidden md:flex gap-10"><Link href="/native" className="text-sm text-white/40 hover:text-white">Framework</Link><Link href="/pricing" className="text-sm text-white/40 hover:text-white">Pricing</Link></div>
                    <Link href="/demo" className="px-4 py-2 bg-white text-black rounded-full text-sm font-medium">Get Demo</Link>
                </div>
            </nav>
            <section className="pt-32 pb-20 px-6"><div className="max-w-6xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 mb-8">
                    <Shield className="h-4 w-4 text-amber-400" />
                    <span className="text-sm text-amber-400">SOC 2 Type II Certified</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-bold mb-6">Financial Services<br />AI Training</h1>
                <p className="text-xl text-white/60 max-w-3xl mx-auto mb-8"><strong className="text-white">SOC 2 compliant AI training</strong> for banking, insurance, and investment professionals. Regulatory-aware curriculum.</p>
                <Link href="/demo" className="px-8 py-4 bg-amber-500 text-white rounded-full font-semibold">Request Finance Demo</Link>
            </div></section>
            <section className="py-20 px-6 border-t border-white/5"><div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold mb-12 text-center">Financial AI Training Tracks</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        { title: "AI for Analysts", desc: "Data analysis, modeling, research automation" },
                        { title: "AI for Advisors", desc: "Client communication, portfolio insights, personalization" },
                        { title: "AI for Underwriting", desc: "Risk assessment, document processing, decision support" },
                        { title: "AI for Compliance", desc: "Monitoring, reporting, regulatory AI governance" },
                        { title: "AI for Operations", desc: "Process automation, efficiency, cost reduction" },
                        { title: "AI for Executives", desc: "Strategy, investment, change management" },
                    ].map((track, i) => (
                        <div key={i} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                            <h3 className="font-semibold mb-2">{track.title}</h3>
                            <p className="text-sm text-white/50">{track.desc}</p>
                        </div>
                    ))}
                </div>
            </div></section>
            <section className="py-20 px-6 border-t border-white/5"><div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-12 text-center">Financial Services AI FAQs</h2>
                {faqs.map((faq, i) => (<details key={i} className="group p-6 rounded-2xl bg-white/[0.02] border border-white/5 mb-4"><summary className="font-semibold cursor-pointer flex justify-between">{faq.question}<span className="group-open:rotate-45">+</span></summary><p className="mt-4 text-white/60">{faq.answer}</p></details>))}
            </div></section>
            <footer className="py-12 px-8 border-t border-white/5"><div className="mx-auto max-w-6xl flex justify-between items-center">
                <span className="font-playfair text-lg italic">ScaledNative<sup className="text-[8px]">™</sup></span>
                <div className="text-xs text-white/20">© 2025 ScaledNative™</div>
            </div></footer>
        </div>
    );
}
