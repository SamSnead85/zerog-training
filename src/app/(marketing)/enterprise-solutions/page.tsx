import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Enterprise AI Training Solutions | Large-Scale AI Training | ScaledNative",
    description: "Enterprise AI training for 1,000+ employees. Dedicated success management, custom content, SSO integration, and 99.9% SLA. Trusted by Fortune 500 companies.",
    keywords: ["enterprise AI training", "large-scale AI training", "Fortune 500 AI training", "corporate AI training", "enterprise learning platform"],
    alternates: { canonical: "https://scalednative.com/enterprise" },
};

export default function EnterpriseLandingPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
                    <Link href="/" className="font-playfair text-2xl italic">ScaledNative<sup className="text-[10px]">™</sup></Link>
                    <Link href="/demo" className="px-4 py-2 bg-white text-black rounded-full text-sm font-medium">Get Demo</Link>
                </div>
            </nav>
            <section className="pt-32 pb-20 px-6"><div className="max-w-6xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#c9a55c]/10 border border-[#c9a55c]/30 mb-8">
                    <span className="text-sm text-[#c9a55c]">Enterprise Grade</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-bold mb-6">Enterprise<br />AI Training</h1>
                <p className="text-xl text-white/60 max-w-3xl mx-auto mb-8">Train 1,000+ employees with dedicated support, custom content, and enterprise integrations.</p>
                <Link href="/demo" className="px-8 py-4 bg-[#c9a55c] text-black rounded-full font-semibold">Request Enterprise Demo</Link>
            </div></section>
            <section className="py-20 px-6 border-t border-white/5"><div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold mb-12 text-center">Enterprise Features</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        "Dedicated Success Manager",
                        "Custom Content Development",
                        "SSO (SAML, Okta, Azure AD)",
                        "SCIM User Provisioning",
                        "99.9% Uptime SLA",
                        "Advanced Analytics API",
                        "Multi-Tenant Architecture",
                        "Priority Support",
                        "Executive Briefings",
                        "Quarterly Business Reviews",
                        "Custom Integrations",
                        "On-Premise Option",
                    ].map((feature, i) => (
                        <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-center">
                            <span className="text-sm">{feature}</span>
                        </div>
                    ))}
                </div>
            </div></section>
            <section className="py-20 px-6 border-t border-white/5"><div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-4">Ready for Enterprise?</h2>
                <Link href="/demo" className="inline-flex px-8 py-4 bg-white text-black rounded-full font-semibold">Schedule Demo</Link>
            </div></section>
            <footer className="py-12 px-8 border-t border-white/5"><div className="mx-auto max-w-6xl flex justify-between items-center">
                <span className="font-playfair text-lg italic">ScaledNative<sup className="text-[8px]">™</sup></span>
                <div className="text-xs text-white/20">© 2025 ScaledNative™</div>
            </div></footer>
        </div>
    );
}
