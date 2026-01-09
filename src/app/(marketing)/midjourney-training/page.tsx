import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema } from "@/components/seo/StructuredData";

export const metadata: Metadata = {
    title: "Midjourney Training for Business | AI Image Generation Training | ScaledNative",
    description: "Midjourney training for marketing and creative teams. Learn AI image generation, brand-consistent visuals, and creative workflow optimization. Hands-on labs with Midjourney.",
    keywords: ["Midjourney training", "AI image training", "AI art training", "image generation training", "creative AI training"],
    alternates: { canonical: "https://scalednative.com/midjourney-training" },
};

export default function MidjourneyTrainingPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <BreadcrumbSchema items={[{ name: "Home", url: "https://scalednative.com" }, { name: "Midjourney Training", url: "https://scalednative.com/midjourney-training" }]} />
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
                    <Link href="/" className="font-playfair text-2xl italic">ScaledNative<sup className="text-[10px]">™</sup></Link>
                    <Link href="/signup" className="px-4 py-2 bg-white text-black rounded-full text-sm font-medium">Get Started</Link>
                </div>
            </nav>
            <section className="pt-32 pb-20 px-6"><div className="max-w-6xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 mb-8">
                    <span className="text-sm text-purple-400">Visual AI Creation</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-bold mb-6">Midjourney Training<br />for Business</h1>
                <p className="text-xl text-white/60 max-w-3xl mx-auto mb-8">Create stunning visuals with AI. Brand imagery, marketing assets, and creative workflows.</p>
                <Link href="/signup" className="px-8 py-4 bg-purple-500 text-white rounded-full font-semibold">Start Midjourney Training</Link>
            </div></section>
            <section className="py-20 px-6 border-t border-white/5"><div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-3 gap-6">
                    {[
                        { title: "Prompt Mastery", desc: "Craft effective image prompts" },
                        { title: "Brand Consistency", desc: "Maintain visual identity with AI" },
                        { title: "Marketing Assets", desc: "Social, ads, and campaigns" },
                        { title: "Photo Editing", desc: "AI enhancement and manipulation" },
                        { title: "Concept Art", desc: "Rapid visual prototyping" },
                        { title: "Workflow Integration", desc: "Fit Midjourney into production" },
                    ].map((t, i) => (
                        <div key={i} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                            <h3 className="font-semibold mb-2">{t.title}</h3>
                            <p className="text-sm text-white/50">{t.desc}</p>
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
