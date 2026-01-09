import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "AI Training Webinars | Free AI Learning Events | ScaledNative",
    description: "Free AI training webinars for professionals. Live and on-demand sessions covering AI tools, use cases, and best practices. Register for upcoming events.",
    keywords: ["AI training webinars", "AI webinars", "free AI training", "AI learning events", "AI workshop online"],
    alternates: { canonical: "https://scalednative.com/webinars" },
};

export default function WebinarsPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
                    <Link href="/" className="font-playfair text-2xl italic">ScaledNative<sup className="text-[10px]">™</sup></Link>
                    <Link href="/signup" className="px-4 py-2 bg-white text-black rounded-full text-sm font-medium">Get Started</Link>
                </div>
            </nav>
            <section className="pt-32 pb-20 px-6"><div className="max-w-6xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/30 mb-8">
                    <span className="text-sm text-pink-400">Free Events</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-bold mb-6">AI Training<br />Webinars</h1>
                <p className="text-xl text-white/60 max-w-3xl mx-auto mb-8">Free live and on-demand AI sessions. Learn from experts, ask questions.</p>
                <Link href="/signup" className="px-8 py-4 bg-pink-600 text-white rounded-full font-semibold">Register for Webinars</Link>
            </div></section>
            <section className="py-20 px-6 border-t border-white/5"><div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-8 text-center">Upcoming Sessions</h2>
                <div className="space-y-6">
                    {[
                        { title: "Getting Started with ChatGPT at Work", date: "Every Tuesday at 2pm ET" },
                        { title: "AI for Managers: Leading AI-Augmented Teams", date: "Every Thursday at 12pm ET" },
                        { title: "Prompt Engineering Masterclass", date: "Monthly - First Friday" },
                    ].map((webinar, i) => (
                        <div key={i} className="flex justify-between items-center p-6 rounded-xl bg-white/[0.02] border border-white/5">
                            <div>
                                <h3 className="font-semibold">{webinar.title}</h3>
                                <p className="text-white/50 text-sm">{webinar.date}</p>
                            </div>
                            <Link href="/signup" className="px-4 py-2 bg-white/10 rounded-full text-sm">Register</Link>
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
