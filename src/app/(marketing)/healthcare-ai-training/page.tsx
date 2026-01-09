import type { Metadata } from "next";
import Link from "next/link";
import { Shield } from "lucide-react";
import { FAQSchema, BreadcrumbSchema } from "@/components/seo/StructuredData";

export const metadata: Metadata = {
    title: "Healthcare AI Training | HIPAA Compliant AI Training for Healthcare | ScaledNative",
    description: "HIPAA-compliant AI training designed specifically for healthcare organizations. Train nurses, physicians, administrators, and staff on AI adoption. Clinical AI workflows, patient data privacy, and healthcare-specific use cases.",
    keywords: ["healthcare AI training", "HIPAA AI training", "clinical AI training", "AI for healthcare", "hospital AI training", "physician AI training", "nursing AI training"],
    alternates: { canonical: "https://scalednative.com/healthcare-ai-training" },
};

const faqs = [
    { question: "Is ScaledNative's healthcare AI training HIPAA compliant?", answer: "Yes, ScaledNative is fully HIPAA compliant and HITRUST certified. We sign BAA agreements with all healthcare clients. Our platform is designed for the strictest healthcare security requirements." },
    { question: "What healthcare roles does the training cover?", answer: "We offer role-specific AI training for physicians, nurses, administrators, billing staff, IT teams, and healthcare executives. Each track addresses role-specific AI use cases and workflows." },
    { question: "Does the training cover clinical AI applications?", answer: "Yes, our healthcare AI training covers clinical decision support, documentation automation, patient communication, diagnostic assistance (with appropriate disclaimers), and administrative AI workflows." },
];

export default function HealthcareAITrainingPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <FAQSchema faqs={faqs} />
            <BreadcrumbSchema items={[{ name: "Home", url: "https://scalednative.com" }, { name: "Healthcare AI Training", url: "https://scalednative.com/healthcare-ai-training" }]} />
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
                    <Link href="/" className="font-playfair text-2xl italic">ScaledNative<sup className="text-[10px]">™</sup></Link>
                    <div className="hidden md:flex gap-10"><Link href="/native" className="text-sm text-white/40 hover:text-white">Framework</Link><Link href="/pricing" className="text-sm text-white/40 hover:text-white">Pricing</Link></div>
                    <Link href="/demo" className="px-4 py-2 bg-white text-black rounded-full text-sm font-medium">Get Demo</Link>
                </div>
            </nav>
            <section className="pt-32 pb-20 px-6"><div className="max-w-6xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/30 mb-8">
                    <Shield className="h-4 w-4 text-teal-400" />
                    <span className="text-sm text-teal-400">HIPAA Compliant • HITRUST Certified</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-bold mb-6">Healthcare<br />AI Training</h1>
                <p className="text-xl text-white/60 max-w-3xl mx-auto mb-8"><strong className="text-white">HIPAA-compliant AI training</strong> designed specifically for healthcare organizations. Train your clinical and administrative staff on responsible AI adoption.</p>
                <Link href="/demo" className="px-8 py-4 bg-teal-500 text-white rounded-full font-semibold">Request Healthcare Demo</Link>
            </div></section>
            <section className="py-20 px-6 border-t border-white/5"><div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold mb-12 text-center">Healthcare AI Training Tracks</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        { title: "AI for Physicians", desc: "Clinical decision support, documentation, patient communication" },
                        { title: "AI for Nursing", desc: "Workflow optimization, patient monitoring, care coordination" },
                        { title: "AI for HIM/Coding", desc: "AI-assisted coding, documentation improvement, compliance" },
                        { title: "AI for Administration", desc: "Scheduling, resource allocation, operational efficiency" },
                        { title: "AI for Healthcare IT", desc: "Integration patterns, security, system deployment" },
                        { title: "AI for Executives", desc: "Strategy, ROI measurement, change management" },
                    ].map((track, i) => (
                        <div key={i} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                            <h3 className="font-semibold mb-2">{track.title}</h3>
                            <p className="text-sm text-white/50">{track.desc}</p>
                        </div>
                    ))}
                </div>
            </div></section>
            <section className="py-20 px-6 border-t border-white/5"><div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-12 text-center">Healthcare AI Training FAQs</h2>
                {faqs.map((faq, i) => (<details key={i} className="group p-6 rounded-2xl bg-white/[0.02] border border-white/5 mb-4"><summary className="font-semibold cursor-pointer flex justify-between">{faq.question}<span className="group-open:rotate-45">+</span></summary><p className="mt-4 text-white/60">{faq.answer}</p></details>))}
            </div></section>
            <footer className="py-12 px-8 border-t border-white/5"><div className="mx-auto max-w-6xl flex justify-between items-center">
                <span className="font-playfair text-lg italic">ScaledNative<sup className="text-[8px]">™</sup></span>
                <div className="text-xs text-white/20">© 2025 ScaledNative™</div>
            </div></footer>
        </div>
    );
}
