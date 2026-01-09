import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "AI Governance Framework | Enterprise AI Policy Guide | ScaledNative",
    description: "Build an enterprise AI governance framework. Policy templates, risk management, ethics guidelines, and compliance requirements for responsible AI deployment.",
    keywords: ["AI governance framework", "enterprise AI policy", "AI risk management", "responsible AI framework", "AI compliance"],
    alternates: { canonical: "https://scalednative.com/insights/ai-governance-framework" },
};

export default function AIGovernancePage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
                    <Link href="/" className="font-playfair text-2xl italic">ScaledNative<sup className="text-[10px]">™</sup></Link>
                    <Link href="/demo" className="px-4 py-2 bg-white text-black rounded-full text-sm font-medium">Get Demo</Link>
                </div>
            </nav>
            <article className="pt-32 pb-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="text-sm text-white/40 uppercase tracking-wider mb-4">Insights • Governance</div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">AI Governance Framework</h1>
                    <p className="text-xl text-white/60 mb-12">Build responsible AI policies for your enterprise.</p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">Framework Components</h2>
                    <div className="space-y-4 mb-12">
                        {[
                            { pillar: "AI Ethics Policy", items: ["Bias prevention", "Transparency requirements", "Human oversight"] },
                            { pillar: "Data Governance", items: ["Training data quality", "Privacy compliance", "Data security"] },
                            { pillar: "Risk Management", items: ["Risk assessment process", "Incident response", "Audit trails"] },
                            { pillar: "Compliance", items: ["Regulatory alignment", "Industry standards", "Documentation"] },
                            { pillar: "Accountability", items: ["Role definitions", "Decision authority", "Review processes"] },
                        ].map((p, i) => (
                            <div key={i} className="p-6 rounded-xl bg-white/[0.02] border border-white/5">
                                <h3 className="font-semibold text-lg mb-3">{p.pillar}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {p.items.map((item, j) => (
                                        <span key={j} className="px-3 py-1 rounded-full bg-white/5 text-sm text-white/60">{item}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <h2 className="text-2xl font-bold mt-8 mb-4">Implementation Steps</h2>
                    <ol className="space-y-3 text-white/70 mb-12">
                        <li>1. Assess current AI usage and risks</li>
                        <li>2. Define governance structure and roles</li>
                        <li>3. Develop policies and guidelines</li>
                        <li>4. Train workforce on AI governance</li>
                        <li>5. Implement monitoring and compliance</li>
                        <li>6. Continuously review and update</li>
                    </ol>

                    <Link href="/demo" className="inline-flex px-6 py-3 bg-white text-black rounded-full font-medium">Get Governance Training</Link>
                </div>
            </article>
            <footer className="py-12 px-8 border-t border-white/5"><div className="mx-auto max-w-6xl flex justify-between items-center">
                <span className="font-playfair text-lg italic">ScaledNative<sup className="text-[8px]">™</sup></span>
                <div className="text-xs text-white/20">© 2025 ScaledNative™</div>
            </div></footer>
        </div>
    );
}
