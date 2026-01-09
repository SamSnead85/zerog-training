import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Enterprise AI Training Case Studies | Customer Success Stories | ScaledNative",
    description: "Real-world case studies from enterprise AI training deployments. See how Fortune 500 companies achieved 736% ROI, 95% completion rates, and measurable productivity gains with ScaledNative.",
    keywords: ["AI training case studies", "enterprise AI training success", "AI training ROI case study", "corporate AI training results"],
    alternates: { canonical: "https://scalednative.com/case-studies" },
};

export default function CaseStudiesPage() {
    const caseStudies = [
        { company: "Fortune 100 Financial Services", industry: "Banking", employees: "65,000+", result: "847% ROI", desc: "Global bank trained 65,000 employees on AI in 6 weeks with 97% completion." },
        { company: "Top 10 Healthcare System", industry: "Healthcare", employees: "45,000+", result: "40% Faster", desc: "HIPAA-compliant AI training for clinical and administrative staff." },
        { company: "Global Technology Company", industry: "Technology", employees: "25,000+", result: "52% Productivity", desc: "Enterprise-wide prompt engineering certification program." },
        { company: "Manufacturing Leader", industry: "Manufacturing", employees: "15,000+", result: "3x ROI", desc: "Industry 4.0 AI training for factory and operations teams." },
    ];

    return (
        <div className="min-h-screen bg-black text-white">
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
                    <Link href="/" className="font-playfair text-2xl italic">ScaledNative<sup className="text-[10px]">™</sup></Link>
                    <Link href="/demo" className="px-4 py-2 bg-white text-black rounded-full text-sm font-medium">Get Demo</Link>
                </div>
            </nav>
            <section className="pt-32 pb-20 px-6"><div className="max-w-6xl mx-auto text-center">
                <h1 className="text-5xl md:text-6xl font-bold mb-6">Case Studies</h1>
                <p className="text-xl text-white/60 max-w-3xl mx-auto mb-12">Real results from enterprise AI training deployments.</p>
            </div></section>
            <section className="py-20 px-6 border-t border-white/5"><div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-2 gap-8">
                    {caseStudies.map((study, i) => (
                        <div key={i} className="p-8 rounded-2xl bg-white/[0.02] border border-white/5">
                            <div className="text-xs text-white/40 uppercase tracking-wider mb-2">{study.industry} • {study.employees} trained</div>
                            <h3 className="font-semibold text-xl mb-2">{study.company}</h3>
                            <div className="text-3xl font-bold text-emerald-400 mb-4">{study.result}</div>
                            <p className="text-white/60 text-sm">{study.desc}</p>
                        </div>
                    ))}
                </div>
            </div></section>
            <section className="py-20 px-6 border-t border-white/5"><div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-4">Be the Next Success Story</h2>
                <Link href="/demo" className="inline-flex px-8 py-4 bg-white text-black rounded-full font-semibold">Request Demo</Link>
            </div></section>
            <footer className="py-12 px-8 border-t border-white/5"><div className="mx-auto max-w-6xl flex justify-between items-center">
                <span className="font-playfair text-lg italic">ScaledNative<sup className="text-[8px]">™</sup></span>
                <div className="text-xs text-white/20">© 2025 ScaledNative™</div>
            </div></footer>
        </div>
    );
}
