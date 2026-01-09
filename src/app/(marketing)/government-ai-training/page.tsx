import type { Metadata } from "next";
import Link from "next/link";
import { Shield } from "lucide-react";
import { FAQSchema, BreadcrumbSchema } from "@/components/seo/StructuredData";

export const metadata: Metadata = {
    title: "Government AI Training | FedRAMP Ready AI Training for Government | ScaledNative",
    description: "Secure AI training for government agencies. FedRAMP-ready platform with compliance for federal, state, and local government workforce development. Secure cloud deployment options.",
    keywords: ["government AI training", "federal AI training", "public sector AI training", "FedRAMP AI training", "government workforce AI", "state government AI"],
    alternates: { canonical: "https://scalednative.com/government-ai-training" },
};

const faqs = [
    { question: "Is ScaledNative FedRAMP ready?", answer: "Yes, ScaledNative meets FedRAMP requirements and can be deployed in government-approved cloud environments. We support AWS GovCloud and Azure Government deployments." },
    { question: "What security certifications do you have?", answer: "ScaledNative maintains SOC 2 Type II, is HIPAA compliant, and meets federal security requirements. We support CAC/PIV authentication for mil/gov users." },
];

export default function GovernmentAITrainingPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <FAQSchema faqs={faqs} />
            <BreadcrumbSchema items={[{ name: "Home", url: "https://scalednative.com" }, { name: "Government AI Training", url: "https://scalednative.com/government-ai-training" }]} />
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
                    <Link href="/" className="font-playfair text-2xl italic">ScaledNative<sup className="text-[10px]">™</sup></Link>
                    <Link href="/demo" className="px-4 py-2 bg-white text-black rounded-full text-sm font-medium">Get Demo</Link>
                </div>
            </nav>
            <section className="pt-32 pb-20 px-6"><div className="max-w-6xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 mb-8">
                    <Shield className="h-4 w-4 text-blue-400" />
                    <span className="text-sm text-blue-400">FedRAMP Ready • GovCloud</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-bold mb-6">Government<br />AI Training</h1>
                <p className="text-xl text-white/60 max-w-3xl mx-auto mb-8">Secure <strong className="text-white">AI training for government</strong> agencies. Federal, state, and local workforce development with compliance built-in.</p>
                <Link href="/demo" className="px-8 py-4 bg-blue-600 text-white rounded-full font-semibold">Request Government Demo</Link>
            </div></section>
            <section className="py-20 px-6 border-t border-white/5"><div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold mb-12 text-center">Government AI Training Features</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        { title: "Secure Cloud", desc: "AWS GovCloud, Azure Government ready" },
                        { title: "CAC/PIV Auth", desc: "Military and government authentication" },
                        { title: "SCORM/LTI", desc: "LMS integration for government systems" },
                        { title: "Role-Based Training", desc: "Paths for all GS levels" },
                        { title: "Compliance Tracking", desc: "Audit-ready training records" },
                        { title: "Custom Content", desc: "Agency-specific curriculum" },
                    ].map((feature, i) => (
                        <div key={i} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                            <h3 className="font-semibold mb-2">{feature.title}</h3>
                            <p className="text-sm text-white/50">{feature.desc}</p>
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
