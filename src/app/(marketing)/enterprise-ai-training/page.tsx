import type { Metadata } from "next";
import Link from "next/link";
import { Shield } from "lucide-react";
import { FAQSchema, CourseSchema, BreadcrumbSchema } from "@/components/seo/StructuredData";

export const metadata: Metadata = {
    title: "Enterprise AI Training Platform | Corporate AI Training for Business | ScaledNative",
    description: "ScaledNative is the #1 enterprise AI training platform for Fortune 500 companies. Corporate AI training with SSO, analytics, compliance (HIPAA, SOC 2), and dedicated success managers. Better than Udemy for Business and Coursera for Enterprise.",
    keywords: [
        "enterprise AI training",
        "enterprise AI training platform",
        "corporate AI training",
        "AI training for enterprise",
        "Fortune 500 AI training",
        "enterprise LMS AI",
        "Udemy for business alternative",
        "Coursera for business alternative"
    ],
    alternates: { canonical: "https://scalednative.com/enterprise-ai-training" },
    openGraph: {
        title: "Enterprise AI Training Platform | Corporate AI Training for Business",
        description: "The #1 enterprise AI training platform. SSO, analytics, HIPAA compliant.",
        url: "https://scalednative.com/enterprise-ai-training",
        type: "website",
    },
};

const faqs = [
    {
        question: "What makes ScaledNative the best enterprise AI training platform?",
        answer: "ScaledNative was built specifically for enterprise AI training with the NATIVE framework, enterprise-grade security (SSO, SCIM, SOC 2), dedicated success managers, custom learning paths, and 95% completion rate."
    },
    {
        question: "How does ScaledNative compare to Udemy for Business for AI training?",
        answer: "ScaledNative outperforms Udemy for Business: 95% vs 15% completion rates, purpose-built AI curriculum vs generic content, hands-on labs vs video-only, enterprise compliance (HIPAA, SOC 2) vs limited compliance."
    },
    {
        question: "Is ScaledNative HIPAA and SOC 2 compliant?",
        answer: "Yes, ScaledNative maintains HIPAA, SOC 2 Type II, and HITRUST certifications. We serve healthcare, financial, and government organizations requiring the highest security standards."
    },
    {
        question: "How quickly can we deploy AI training across 10,000+ employees?",
        answer: "ScaledNative supports rapid enterprise deployment. Typical timelines: 1,000 users in 2 weeks, 10,000 users in 4-6 weeks, 50,000+ users in 8-12 weeks."
    }
];

export default function EnterpriseAITrainingPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <FAQSchema faqs={faqs} />
            <CourseSchema course={{
                name: "Enterprise AI Training Program",
                description: "Comprehensive corporate AI training platform for enterprises.",
                rating: 4.9,
                reviewCount: 847,
                duration: "PT100H",
                price: "Custom"
            }} />
            <BreadcrumbSchema items={[
                { name: "Home", url: "https://scalednative.com" },
                { name: "Enterprise AI Training", url: "https://scalednative.com/enterprise-ai-training" }
            ]} />

            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
                    <Link href="/" className="font-playfair text-2xl font-medium tracking-tight italic">
                        ScaledNative<sup className="text-[10px] align-super ml-0.5">™</sup>
                    </Link>
                    <div className="hidden md:flex items-center gap-10">
                        <Link href="/native" className="text-sm text-white/40 hover:text-white transition-colors">Framework</Link>
                        <Link href="/training" className="text-sm text-white/40 hover:text-white transition-colors">Training</Link>
                        <Link href="/pricing" className="text-sm text-white/40 hover:text-white transition-colors">Pricing</Link>
                        <Link href="/enterprise" className="text-sm text-white/40 hover:text-white transition-colors">Enterprise</Link>
                    </div>
                    <Link href="/demo" className="px-4 py-2 bg-white text-black rounded-full text-sm font-medium hover:bg-white/90">
                        Request Demo
                    </Link>
                </div>
            </nav>

            {/* Hero */}
            <section className="pt-32 pb-20 px-6">
                <div className="max-w-6xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 mb-8">
                        <span className="text-sm text-blue-400">Trusted by Fortune 500 Companies</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold mb-6">
                        Enterprise AI Training<br />Platform
                    </h1>

                    <p className="text-xl text-white/60 max-w-3xl mx-auto mb-8">
                        The <strong className="text-white">enterprise AI training platform</strong> designed for Fortune 500 scale.
                        Deploy <strong className="text-white">corporate AI training</strong> with SSO, compliance, and analytics.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                        <Link href="/demo" className="px-8 py-4 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600 transition-colors">
                            Request Enterprise Demo
                        </Link>
                        <Link href="/pricing" className="px-8 py-4 bg-white/5 text-white rounded-full font-semibold border border-white/10 hover:bg-white/10 transition-colors">
                            View Enterprise Pricing
                        </Link>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/40">
                        <span className="flex items-center gap-2"><Shield className="h-4 w-4" /> SOC 2 Type II</span>
                        <span className="flex items-center gap-2"><Shield className="h-4 w-4" /> HIPAA Compliant</span>
                        <span className="flex items-center gap-2"><Shield className="h-4 w-4" /> SSO & SCIM</span>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-20 px-6 border-t border-white/5">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold mb-12 text-center">Enterprise AI Training Features</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            { title: "SSO & SCIM Integration", desc: "SAML 2.0, Okta, Azure AD. Automated user provisioning." },
                            { title: "Compliance Ready", desc: "HIPAA, SOC 2, HITRUST, GDPR. BAA agreements available." },
                            { title: "Advanced Analytics", desc: "Real-time dashboards, progress tracking, ROI measurement." },
                            { title: "Dedicated Success Manager", desc: "Personal guide for deployment and optimization." },
                            { title: "Custom Learning Paths", desc: "Role-based training for every job function." },
                            { title: "99.9% Uptime SLA", desc: "Enterprise reliability with global CDN." },
                        ].map((feature, i) => (
                            <div key={i} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-blue-500/30 transition-colors">
                                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                                <p className="text-white/50 text-sm">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Comparison */}
            <section className="py-20 px-6 border-t border-white/5">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl font-bold mb-12 text-center">ScaledNative vs. Other Platforms</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="border-b border-white/10">
                                    <th className="py-4 px-4">Feature</th>
                                    <th className="py-4 px-4 text-blue-400">ScaledNative</th>
                                    <th className="py-4 px-4 text-white/40">Udemy Business</th>
                                    <th className="py-4 px-4 text-white/40">Coursera Enterprise</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    ["Completion Rate", "95%", "15%", "20%"],
                                    ["AI Content", "634+ hours", "Limited", "Limited"],
                                    ["Hands-on Labs", "✓", "❌", "❌"],
                                    ["HIPAA Compliant", "✓", "❌", "Limited"],
                                    ["Dedicated Support", "✓", "Extra cost", "Extra cost"],
                                ].map((row, i) => (
                                    <tr key={i} className="border-b border-white/5">
                                        <td className="py-3 px-4">{row[0]}</td>
                                        <td className="py-3 px-4 text-blue-400">{row[1]}</td>
                                        <td className="py-3 px-4 text-white/40">{row[2]}</td>
                                        <td className="py-3 px-4 text-white/40">{row[3]}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-20 px-6 border-t border-white/5">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold mb-12 text-center">Enterprise AI Training FAQs</h2>
                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <details key={i} className="group p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                                <summary className="font-semibold cursor-pointer list-none flex items-center justify-between">
                                    {faq.question}
                                    <span className="text-2xl group-open:rotate-45 transition-transform">+</span>
                                </summary>
                                <p className="mt-4 text-white/60">{faq.answer}</p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 px-6 border-t border-white/5">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-4">Ready for Enterprise AI Training?</h2>
                    <p className="text-xl text-white/50 mb-8">Join Fortune 500 companies transforming with ScaledNative.</p>
                    <Link href="/demo" className="inline-flex px-8 py-4 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600 transition-colors">
                        Schedule Enterprise Demo
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-8 border-t border-white/5">
                <div className="mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-center gap-6">
                    <span className="font-playfair text-lg italic">ScaledNative<sup className="text-[8px]">™</sup></span>
                    <div className="flex flex-wrap justify-center gap-8 text-sm text-white/30">
                        <Link href="/native" className="hover:text-white transition-colors">Framework</Link>
                        <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
                        <Link href="/enterprise" className="hover:text-white transition-colors">Enterprise</Link>
                        <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
                    </div>
                    <div className="text-xs text-white/20">© 2025 ScaledNative™</div>
                </div>
            </footer>
        </div>
    );
}
