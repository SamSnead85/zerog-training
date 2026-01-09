import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "ScaledNative vs LinkedIn Learning | AI Training Comparison | ScaledNative",
    description: "ScaledNative vs LinkedIn Learning comparison. Enterprise AI training with hands-on labs vs generic video content.",
    keywords: ["ScaledNative vs LinkedIn Learning", "LinkedIn Learning comparison", "AI training comparison"],
    alternates: { canonical: "https://scalednative.com/compare/scalednative-vs-linkedin-learning" },
};

export default function CompareLinkedIn() {
    return (
        <div className="min-h-screen bg-black text-white">
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
                    <Link href="/" className="font-playfair text-2xl italic">ScaledNative<sup className="text-[10px]">™</sup></Link>
                    <Link href="/demo" className="px-4 py-2 bg-white text-black rounded-full text-sm font-medium">Get Demo</Link>
                </div>
            </nav>
            <section className="pt-32 pb-20 px-6"><div className="max-w-6xl mx-auto">
                <h1 className="text-5xl md:text-6xl font-bold mb-6 text-center">ScaledNative vs LinkedIn Learning</h1>
                <div className="overflow-x-auto mt-12">
                    <table className="w-full text-left">
                        <thead><tr className="border-b border-white/10">
                            <th className="py-4 px-4">Category</th>
                            <th className="py-4 px-4 text-emerald-400">ScaledNative</th>
                            <th className="py-4 px-4 text-white/40">LinkedIn Learning</th>
                        </tr></thead>
                        <tbody className="text-sm">
                            {[
                                ["Focus", "Purpose-built AI training", "Generic professional development"],
                                ["Completion Rate", "95%", "~20%"],
                                ["Learning Format", "Hands-on labs + video", "Video only"],
                                ["AI Content Depth", "634+ hours specialized", "Limited AI content"],
                                ["Enterprise SSO", "✓ Full SAML/SCIM", "✓"],
                                ["HIPAA Compliant", "✓", "❌"],
                                ["Dedicated Support", "✓ Success manager", "❌"],
                                ["Custom Learning Paths", "✓ Role-based AI paths", "Limited"],
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
