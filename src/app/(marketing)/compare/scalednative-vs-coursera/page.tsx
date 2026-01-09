import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "ScaledNative vs Coursera | AI Training Platform Comparison | ScaledNative",
    description: "Detailed comparison of ScaledNative vs Coursera for Business. Enterprise AI training vs academic courses. Purpose-built vs adapted content.",
    keywords: ["ScaledNative vs Coursera", "Coursera comparison", "AI training comparison", "enterprise vs academic training"],
    alternates: { canonical: "https://scalednative.com/compare/scalednative-vs-coursera" },
};

export default function CompareCoursera() {
    return (
        <div className="min-h-screen bg-black text-white">
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
                    <Link href="/" className="font-playfair text-2xl italic">ScaledNative<sup className="text-[10px]">™</sup></Link>
                    <Link href="/demo" className="px-4 py-2 bg-white text-black rounded-full text-sm font-medium">Get Demo</Link>
                </div>
            </nav>
            <section className="pt-32 pb-20 px-6"><div className="max-w-6xl mx-auto">
                <h1 className="text-5xl md:text-6xl font-bold mb-6 text-center">ScaledNative vs Coursera<br /><span className="text-white/50">for Enterprise</span></h1>
                <p className="text-xl text-white/60 max-w-3xl mx-auto mb-12 text-center">Purpose-built enterprise training vs academic university courses.</p>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead><tr className="border-b border-white/10">
                            <th className="py-4 px-4">Category</th>
                            <th className="py-4 px-4 text-emerald-400">ScaledNative</th>
                            <th className="py-4 px-4 text-white/40">Coursera for Business</th>
                        </tr></thead>
                        <tbody className="text-sm">
                            {[
                                ["Approach", "Enterprise-first practical training", "Academic university courses"],
                                ["Completion Rate", "95%", "20%"],
                                ["Learning Style", "Hands-on labs, adaptive", "Lecture-based, structured"],
                                ["Time to Competency", "Days to weeks", "Weeks to months"],
                                ["Content Type", "Purpose-built for AI work", "University curriculum adapted"],
                                ["Certifications", "Industry-recognized AI certs", "University credentials"],
                                ["Enterprise Compliance", "HIPAA, SOC 2, HITRUST", "Limited"],
                                ["Success Manager", "✓ Included", "Extra cost"],
                                ["Custom Content", "✓ Full customization", "Limited"],
                                ["ROI Measurement", "✓ Built-in analytics", "Basic"],
                            ].map((row, i) => (
                                <tr key={i} className="border-b border-white/5">
                                    <td className="py-3 px-4 font-medium">{row[0]}</td>
                                    <td className="py-3 px-4 text-emerald-400">{row[1]}</td>
                                    <td className="py-3 px-4 text-white/40">{row[2]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-16 text-center">
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
