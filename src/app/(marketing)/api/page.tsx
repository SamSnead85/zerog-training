import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "AI Training API | Integrate AI Training Into Your Apps | ScaledNative",
    description: "ScaledNative API for AI training integration. Embed courses, track progress, pull analytics, and customize the learning experience in your own applications.",
    keywords: ["AI training API", "learning API integration", "embed AI training", "training API", "LMS API"],
    alternates: { canonical: "https://scalednative.com/api" },
};

export default function APIPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
                    <Link href="/" className="font-playfair text-2xl italic">ScaledNative<sup className="text-[10px]">™</sup></Link>
                    <Link href="/demo" className="px-4 py-2 bg-white text-black rounded-full text-sm font-medium">Get Demo</Link>
                </div>
            </nav>
            <section className="pt-32 pb-20 px-6"><div className="max-w-6xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 mb-8">
                    <span className="text-sm text-purple-400">Developer API</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-bold mb-6">Training<br />API</h1>
                <p className="text-xl text-white/60 max-w-3xl mx-auto mb-8">Build AI training into your products. REST API for course delivery, progress, and analytics.</p>
                <Link href="/demo" className="px-8 py-4 bg-purple-600 text-white rounded-full font-semibold">Request API Access</Link>
            </div></section>
            <section className="py-20 px-6 border-t border-white/5"><div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold mb-12 text-center">API Capabilities</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    {[
                        { name: "Course Catalog", desc: "Browse and search all content" },
                        { name: "User Management", desc: "Enroll and manage learners" },
                        { name: "Progress Tracking", desc: "Real-time completion data" },
                        { name: "Analytics", desc: "Engagement and performance metrics" },
                        { name: "Webhooks", desc: "Event-driven notifications" },
                        { name: "Embedded Player", desc: "White-label course embedding" },
                    ].map((cap, i) => (
                        <div key={i} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                            <h3 className="font-semibold mb-2">{cap.name}</h3>
                            <p className="text-sm text-white/50">{cap.desc}</p>
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
