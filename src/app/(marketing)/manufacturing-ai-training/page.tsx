import type { Metadata } from "next";
import Link from "next/link";
import { FAQSchema, BreadcrumbSchema } from "@/components/seo/StructuredData";

export const metadata: Metadata = {
    title: "Manufacturing AI Training | Industry 4.0 AI Training | ScaledNative",
    description: "AI training for manufacturing professionals. Learn predictive maintenance, quality control automation, supply chain AI, and Industry 4.0 transformation. Hands-on labs with manufacturing AI tools.",
    keywords: ["manufacturing AI training", "Industry 4.0 training", "predictive maintenance training", "manufacturing automation AI", "factory AI training"],
    alternates: { canonical: "https://scalednative.com/manufacturing-ai-training" },
};

const faqs = [
    { question: "What do manufacturing teams learn?", answer: "Manufacturing teams learn predictive maintenance AI, quality control automation, production optimization, supply chain AI, robotics integration, and IoT data analytics." },
];

export default function ManufacturingAITrainingPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <FAQSchema faqs={faqs} />
            <BreadcrumbSchema items={[{ name: "Home", url: "https://scalednative.com" }, { name: "Manufacturing AI Training", url: "https://scalednative.com/manufacturing-ai-training" }]} />
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
                    <Link href="/" className="font-playfair text-2xl italic">ScaledNative<sup className="text-[10px]">™</sup></Link>
                    <Link href="/demo" className="px-4 py-2 bg-white text-black rounded-full text-sm font-medium">Get Demo</Link>
                </div>
            </nav>
            <section className="pt-32 pb-20 px-6"><div className="max-w-6xl mx-auto text-center">
                <h1 className="text-5xl md:text-7xl font-bold mb-6">Manufacturing<br />AI Training</h1>
                <p className="text-xl text-white/60 max-w-3xl mx-auto mb-8">Drive Industry 4.0 transformation. Predictive maintenance, quality automation, and smart factory AI.</p>
                <Link href="/demo" className="px-8 py-4 bg-orange-600 text-white rounded-full font-semibold">Request Manufacturing Demo</Link>
            </div></section>
            <section className="py-20 px-6 border-t border-white/5"><div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        { title: "Predictive Maintenance", desc: "Prevent failures before they happen" },
                        { title: "Quality Control", desc: "AI-powered inspection and QC" },
                        { title: "Production Optimization", desc: "Maximize throughput with AI" },
                        { title: "Supply Chain AI", desc: "Smart inventory and logistics" },
                        { title: "Robotics Integration", desc: "AI for collaborative robots" },
                        { title: "IoT Analytics", desc: "Sensor data intelligence" },
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
