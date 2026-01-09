import type { Metadata } from "next";
import Link from "next/link";
import { FAQSchema, BreadcrumbSchema } from "@/components/seo/StructuredData";

export const metadata: Metadata = {
    title: "AI Training for Retail | Retail AI Training & Personalization | ScaledNative",
    description: "AI training for retail professionals. Learn customer personalization, demand forecasting, inventory optimization, and visual merchandising AI. E-commerce and brick-and-mortar applications.",
    keywords: ["retail AI training", "AI for retail", "e-commerce AI training", "retail personalization AI", "demand forecasting training"],
    alternates: { canonical: "https://scalednative.com/retail-ai-training" },
};

export default function RetailAITrainingPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <BreadcrumbSchema items={[{ name: "Home", url: "https://scalednative.com" }, { name: "Retail AI Training", url: "https://scalednative.com/retail-ai-training" }]} />
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
                    <Link href="/" className="font-playfair text-2xl italic">ScaledNative<sup className="text-[10px]">™</sup></Link>
                    <Link href="/demo" className="px-4 py-2 bg-white text-black rounded-full text-sm font-medium">Get Demo</Link>
                </div>
            </nav>
            <section className="pt-32 pb-20 px-6"><div className="max-w-6xl mx-auto text-center">
                <h1 className="text-5xl md:text-7xl font-bold mb-6">Retail<br />AI Training</h1>
                <p className="text-xl text-white/60 max-w-3xl mx-auto mb-8">Transform retail with AI. Personalization, demand forecasting, and inventory optimization.</p>
                <Link href="/demo" className="px-8 py-4 bg-pink-600 text-white rounded-full font-semibold">Request Retail Demo</Link>
            </div></section>
            <section className="py-20 px-6 border-t border-white/5"><div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        { title: "Customer Personalization", desc: "AI-powered recommendations" },
                        { title: "Demand Forecasting", desc: "Predict trends and seasonality" },
                        { title: "Inventory Optimization", desc: "Smart stock management" },
                        { title: "Dynamic Pricing", desc: "AI-driven price optimization" },
                        { title: "Visual Merchandising", desc: "AI store layout optimization" },
                        { title: "Customer Analytics", desc: "Behavior insights and segmentation" },
                    ].map((topic, i) => (
                        <div key={i} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                            <h3 className="font-semibold mb-2">{topic.title}</h3>
                            <p className="text-sm text-white/50">{topic.desc}</p>
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
