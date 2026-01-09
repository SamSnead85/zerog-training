import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "AI Onboarding Training | New Hire AI Training | ScaledNative",
    description: "AI onboarding training for new employees. Integrate AI training into your onboarding process to ensure every new hire starts AI-native from day one.",
    keywords: ["AI onboarding", "new hire AI training", "employee onboarding AI", "AI new employee training", "day one AI training"],
    alternates: { canonical: "https://scalednative.com/ai-onboarding-training" },
};

export default function AIOnboardingPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
                    <Link href="/" className="font-playfair text-2xl italic">ScaledNative<sup className="text-[10px]">™</sup></Link>
                    <Link href="/demo" className="px-4 py-2 bg-white text-black rounded-full text-sm font-medium">Get Demo</Link>
                </div>
            </nav>
            <section className="pt-32 pb-20 px-6"><div className="max-w-6xl mx-auto text-center">
                <h1 className="text-5xl md:text-7xl font-bold mb-6">AI Onboarding<br />Training</h1>
                <p className="text-xl text-white/60 max-w-3xl mx-auto mb-8">Every new hire starts AI-native. Integrate AI training into your onboarding from day one.</p>
                <Link href="/demo" className="px-8 py-4 bg-teal-600 text-white rounded-full font-semibold">Request Demo</Link>
            </div></section>
            <section className="py-20 px-6 border-t border-white/5"><div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-8 text-center">Onboarding Integration</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    {[
                        { title: "Day 1 Ready", desc: "Pre-configured for immediate access" },
                        { title: "HRIS Integration", desc: "Auto-enroll from Workday, BambooHR, etc." },
                        { title: "Role-Based Paths", desc: "Right content for each new hire role" },
                        { title: "Welcome Week", desc: "Structured first-week AI curriculum" },
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
