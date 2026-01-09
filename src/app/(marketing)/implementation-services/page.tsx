import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "AI Implementation Services | AI Training + Implementation | ScaledNative",
    description: "AI implementation services paired with training. Get hands-on help implementing AI in your workflows. Training + consulting for real business impact.",
    keywords: ["AI implementation services", "AI consulting training", "AI deployment services", "AI integration services", "AI implementation partner"],
    alternates: { canonical: "https://scalednative.com/implementation-services" },
};

export default function ImplementationServicesPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
                    <Link href="/" className="font-playfair text-2xl italic">ScaledNative<sup className="text-[10px]">™</sup></Link>
                    <Link href="/demo" className="px-4 py-2 bg-white text-black rounded-full text-sm font-medium">Get Demo</Link>
                </div>
            </nav>
            <section className="pt-32 pb-20 px-6"><div className="max-w-6xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/30 mb-8">
                    <span className="text-sm text-teal-400">Professional Services</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-bold mb-6">Implementation<br />Services</h1>
                <p className="text-xl text-white/60 max-w-3xl mx-auto mb-8">Training + hands-on implementation. Get AI working in your workflows.</p>
                <Link href="/demo" className="px-8 py-4 bg-teal-600 text-white rounded-full font-semibold">Explore Services</Link>
            </div></section>
            <section className="py-20 px-6 border-t border-white/5"><div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-8 text-center">Service Offerings</h2>
                <div className="space-y-6">
                    {[
                        { name: "AI Workflow Design", desc: "Map AI into your existing processes" },
                        { name: "Tool Selection", desc: "Choose the right AI tools for your needs" },
                        { name: "Pilot Implementation", desc: "Deploy AI in a controlled pilot" },
                        { name: "Training Delivery", desc: "On-site or virtual instructor-led" },
                        { name: "Ongoing Support", desc: "Post-implementation coaching" },
                    ].map((service, i) => (
                        <div key={i} className="p-6 rounded-xl bg-white/[0.02] border border-white/5">
                            <h3 className="font-semibold mb-2">{service.name}</h3>
                            <p className="text-white/60 text-sm">{service.desc}</p>
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
