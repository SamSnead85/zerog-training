import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "AI Training LMS Integration | Workday, SAP, Cornerstone | ScaledNative",
    description: "Integrate ScaledNative AI training with your LMS. Native integrations with Workday Learning, SAP SuccessFactors, Cornerstone, and more. SCORM/xAPI compliant.",
    keywords: ["LMS AI training integration", "Workday learning AI", "SAP SuccessFactors AI", "Cornerstone AI integration", "SCORM AI training"],
    alternates: { canonical: "https://scalednative.com/lms-integration" },
};

export default function LMSIntegrationPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
                    <Link href="/" className="font-playfair text-2xl italic">ScaledNative<sup className="text-[10px]">™</sup></Link>
                    <Link href="/demo" className="px-4 py-2 bg-white text-black rounded-full text-sm font-medium">Get Demo</Link>
                </div>
            </nav>
            <section className="pt-32 pb-20 px-6"><div className="max-w-6xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 mb-8">
                    <span className="text-sm text-blue-400">Enterprise Integration</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-bold mb-6">LMS<br />Integration</h1>
                <p className="text-xl text-white/60 max-w-3xl mx-auto mb-8">Connect AI training to your existing LMS. Workday, SAP, Cornerstone, and more.</p>
                <Link href="/demo" className="px-8 py-4 bg-blue-600 text-white rounded-full font-semibold">Request Integration Demo</Link>
            </div></section>
            <section className="py-20 px-6 border-t border-white/5"><div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold mb-12 text-center">Supported Integrations</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    {[
                        { name: "Workday Learning", desc: "Native integration with content sync" },
                        { name: "SAP SuccessFactors", desc: "Full LMS connector support" },
                        { name: "Cornerstone OnDemand", desc: "Course catalog synchronization" },
                        { name: "Degreed", desc: "Skills intelligence platform" },
                        { name: "LinkedIn Learning", desc: "Complement your library" },
                        { name: "Custom LMS", desc: "SCORM/xAPI/LTI support" },
                    ].map((lms, i) => (
                        <div key={i} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                            <h3 className="font-semibold mb-2">{lms.name}</h3>
                            <p className="text-sm text-white/50">{lms.desc}</p>
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
