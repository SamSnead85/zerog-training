import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "ScaledNative vs Udemy | AI Training Platform Comparison | ScaledNative",
    description: "Detailed comparison of ScaledNative vs Udemy for Business. See why enterprises choose ScaledNative for AI training: 95% vs 15% completion, hands-on labs, enterprise compliance, and dedicated support.",
    keywords: ["ScaledNative vs Udemy", "Udemy comparison", "AI training comparison", "enterprise training comparison", "Udemy for business vs ScaledNative"],
    alternates: { canonical: "https://scalednative.com/compare/scalednative-vs-udemy" },
};

export default function CompareUdemyPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
                    <Link href="/" className="font-playfair text-2xl italic">ScaledNative<sup className="text-[10px]">™</sup></Link>
                    <Link href="/demo" className="px-4 py-2 bg-white text-black rounded-full text-sm font-medium">Get Demo</Link>
                </div>
            </nav>
            <section className="pt-32 pb-20 px-6"><div className="max-w-6xl mx-auto">
                <h1 className="text-5xl md:text-6xl font-bold mb-6 text-center">ScaledNative vs Udemy<br /><span className="text-white/50">for Business</span></h1>
                <p className="text-xl text-white/60 max-w-3xl mx-auto mb-12 text-center">See how ScaledNative compares to Udemy for Business for enterprise AI training.</p>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead><tr className="border-b border-white/10">
                            <th className="py-4 px-4 text-lg">Category</th>
                            <th className="py-4 px-4 text-lg text-emerald-400">ScaledNative</th>
                            <th className="py-4 px-4 text-lg text-white/40">Udemy for Business</th>
                        </tr></thead>
                        <tbody className="text-sm">
                            {[
                                ["Focus", "Purpose-built AI training", "Generic content marketplace"],
                                ["Completion Rate", "95%", "15%"],
                                ["Learning Format", "Hands-on labs + video + quizzes", "Video only"],
                                ["AI Content Hours", "634+ hours curated", "Variable quality"],
                                ["Content Quality", "Enterprise-certified", "User-generated"],
                                ["Methodology", "NATIVE Framework™", "None"],
                                ["SSO/SCIM", "✓ Full enterprise (SAML, Okta, Azure AD)", "Limited"],
                                ["HIPAA Compliant", "✓", "❌"],
                                ["SOC 2 Type II", "✓", "❌"],
                                ["HITRUST Certified", "✓", "❌"],
                                ["Dedicated Success Manager", "✓ Included", "Not available"],
                                ["Custom Learning Paths", "✓ Role-based", "Limited"],
                                ["Analytics", "Advanced + API export", "Basic"],
                                ["Certifications", "6 industry-recognized", "Inconsistent"],
                                ["Support", "24/7 priority", "Standard"],
                                ["Pricing Model", "Per-seat enterprise", "Per-seat"],
                                ["ROI Tracking", "✓ Built-in", "❌"],
                            ].map((row, i) => (
                                <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02]">
                                    <td className="py-3 px-4 font-medium">{row[0]}</td>
                                    <td className="py-3 px-4 text-emerald-400">{row[1]}</td>
                                    <td className="py-3 px-4 text-white/40">{row[2]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-16 text-center">
                    <h2 className="text-2xl font-bold mb-4">Ready to Switch?</h2>
                    <p className="text-white/60 mb-8">Join enterprises that upgraded from Udemy to ScaledNative.</p>
                    <Link href="/demo" className="px-8 py-4 bg-white text-black rounded-full font-semibold">Request Demo</Link>
                </div>
            </div></section>
            <footer className="py-12 px-8 border-t border-white/5"><div className="mx-auto max-w-6xl flex justify-between items-center">
                <span className="font-playfair text-lg italic">ScaledNative<sup className="text-[8px]">™</sup></span>
                <div className="text-xs text-white/20">© 2025 ScaledNative™</div>
            </div></footer>
        </div>
    );
}
