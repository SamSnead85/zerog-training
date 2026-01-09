import type { Metadata } from "next";
import Link from "next/link";
import { FAQSchema, BreadcrumbSchema } from "@/components/seo/StructuredData";

export const metadata: Metadata = {
    title: "AI Training Platform Features | Learning Management for AI | ScaledNative",
    description: "ScaledNative platform features: adaptive learning, hands-on AI labs, role-based paths, enterprise SSO, compliance tracking, analytics API, and dedicated success management.",
    keywords: ["AI training platform features", "AI LMS features", "enterprise learning platform", "AI training software", "learning management AI"],
    alternates: { canonical: "https://scalednative.com/platform-features" },
};

export default function PlatformFeaturesPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <BreadcrumbSchema items={[{ name: "Home", url: "https://scalednative.com" }, { name: "Platform Features", url: "https://scalednative.com/platform-features" }]} />
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
                    <Link href="/" className="font-playfair text-2xl italic">ScaledNative<sup className="text-[10px]">™</sup></Link>
                    <Link href="/demo" className="px-4 py-2 bg-white text-black rounded-full text-sm font-medium">Get Demo</Link>
                </div>
            </nav>
            <section className="pt-32 pb-20 px-6"><div className="max-w-6xl mx-auto text-center">
                <h1 className="text-5xl md:text-6xl font-bold mb-6">Platform Features</h1>
                <p className="text-xl text-white/60 max-w-3xl mx-auto mb-12">Enterprise-grade AI training platform built for scale, compliance, and results.</p>
            </div></section>
            <section className="py-20 px-6 border-t border-white/5"><div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        { category: "Learning", features: ["Adaptive AI pathways", "Hands-on labs", "Interactive assessments", "Video + text + practice", "Progress tracking"] },
                        { category: "Enterprise", features: ["SSO (SAML, Okta, Azure)", "SCIM provisioning", "Role-based access", "Multi-tenant support", "99.9% SLA"] },
                        { category: "Compliance", features: ["HIPAA ready", "SOC 2 Type II", "HITRUST certified", "GDPR compliant", "Audit logging"] },
                        { category: "Analytics", features: ["Real-time dashboards", "API data export", "ROI tracking", "Skill gap analysis", "Cohort reporting"] },
                        { category: "Content", features: ["634+ hours curriculum", "Monthly updates", "Custom content", "AI lab sandbox", "Certification exams"] },
                        { category: "Support", features: ["Dedicated success mgr", "24/7 priority support", "Implementation help", "Training workshops", "QBR reviews"] },
                    ].map((section, i) => (
                        <div key={i} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                            <h3 className="font-semibold text-lg mb-4 text-[#c9a55c]">{section.category}</h3>
                            <ul className="text-sm text-white/60 space-y-2">
                                {section.features.map((f, j) => (<li key={j}>✓ {f}</li>))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div></section>
            <section className="py-20 px-6 border-t border-white/5"><div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-4">See the Platform</h2>
                <Link href="/demo" className="inline-flex px-8 py-4 bg-white text-black rounded-full font-semibold">Request Demo</Link>
            </div></section>
            <footer className="py-12 px-8 border-t border-white/5"><div className="mx-auto max-w-6xl flex justify-between items-center">
                <span className="font-playfair text-lg italic">ScaledNative<sup className="text-[8px]">™</sup></span>
                <div className="text-xs text-white/20">© 2025 ScaledNative™</div>
            </div></footer>
        </div>
    );
}
