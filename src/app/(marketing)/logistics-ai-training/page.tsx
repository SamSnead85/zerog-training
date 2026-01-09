import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema } from "@/components/seo/StructuredData";

export const metadata: Metadata = {
    title: "Logistics AI Training | AI for Supply Chain & Logistics | ScaledNative",
    description: "AI training for logistics and supply chain professionals. Learn route optimization, warehouse AI, demand planning, and transportation automation. End-to-end logistics AI.",
    keywords: ["logistics AI training", "supply chain AI training", "AI for logistics", "warehouse AI", "transportation AI training"],
    alternates: { canonical: "https://scalednative.com/logistics-ai-training" },
};

export default function LogisticsAITrainingPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <BreadcrumbSchema items={[{ name: "Home", url: "https://scalednative.com" }, { name: "Logistics AI Training", url: "https://scalednative.com/logistics-ai-training" }]} />
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
                    <Link href="/" className="font-playfair text-2xl italic">ScaledNative<sup className="text-[10px]">™</sup></Link>
                    <Link href="/demo" className="px-4 py-2 bg-white text-black rounded-full text-sm font-medium">Get Demo</Link>
                </div>
            </nav>
            <section className="pt-32 pb-20 px-6"><div className="max-w-6xl mx-auto text-center">
                <h1 className="text-5xl md:text-7xl font-bold mb-6">Logistics<br />AI Training</h1>
                <p className="text-xl text-white/60 max-w-3xl mx-auto mb-8">Optimize supply chains with AI. Route planning, warehousing, and demand forecasting.</p>
                <Link href="/demo" className="px-8 py-4 bg-orange-600 text-white rounded-full font-semibold">Request Demo</Link>
            </div></section>
            <section className="py-20 px-6 border-t border-white/5"><div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-3 gap-6">
                    {[
                        { title: "Route Optimization", desc: "AI-powered logistics planning" },
                        { title: "Warehouse AI", desc: "Inventory and picking optimization" },
                        { title: "Demand Planning", desc: "Predictive inventory management" },
                        { title: "Fleet Management", desc: "AI vehicle optimization" },
                        { title: "Last Mile", desc: "Delivery route and timing AI" },
                        { title: "Visibility AI", desc: "Real-time tracking intelligence" },
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
