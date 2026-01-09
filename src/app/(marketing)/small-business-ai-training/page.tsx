import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "AI Training for Small Business | SMB AI Training Solutions | ScaledNative",
    description: "AI training solutions for small and medium businesses. Affordable, self-service AI training to compete with enterprise capabilities. Start with our SMB plan.",
    keywords: ["AI training small business", "SMB AI training", "small business AI", "affordable AI training", "AI training for SME"],
    alternates: { canonical: "https://scalednative.com/small-business-ai-training" },
};

export default function SmallBusinessAITrainingPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
                    <Link href="/" className="font-playfair text-2xl italic">ScaledNative<sup className="text-[10px]">™</sup></Link>
                    <Link href="/pricing" className="px-4 py-2 bg-white text-black rounded-full text-sm font-medium">View Pricing</Link>
                </div>
            </nav>
            <section className="pt-32 pb-20 px-6"><div className="max-w-6xl mx-auto text-center">
                <h1 className="text-5xl md:text-6xl font-bold mb-6">AI Training for<br />Small Business</h1>
                <p className="text-xl text-white/60 max-w-3xl mx-auto mb-8">Enterprise-grade AI training at SMB-friendly pricing. Give your team the same AI skills as Fortune 500 companies.</p>
                <Link href="/pricing" className="px-8 py-4 bg-emerald-500 text-white rounded-full font-semibold">See SMB Pricing</Link>
            </div></section>
            <section className="py-20 px-6 border-t border-white/5"><div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-8 text-center">Why SMBs Choose ScaledNative</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    {[
                        { title: "Affordable per-seat pricing", desc: "Scales with your team size, no enterprise minimums" },
                        { title: "Self-service onboarding", desc: "Start training in minutes, no implementation required" },
                        { title: "Same content as enterprises", desc: "Full curriculum, not a watered-down version" },
                        { title: "Hands-on labs included", desc: "Practical skills, not just video watching" },
                    ].map((item, i) => (
                        <div key={i} className="p-6 rounded-xl bg-white/[0.02] border border-white/5">
                            <h3 className="font-semibold mb-2">{item.title}</h3>
                            <p className="text-white/60 text-sm">{item.desc}</p>
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
