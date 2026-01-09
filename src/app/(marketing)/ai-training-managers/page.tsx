import type { Metadata } from "next";
import Link from "next/link";
import { FAQSchema, BreadcrumbSchema } from "@/components/seo/StructuredData";

export const metadata: Metadata = {
    title: "AI Training for Managers | Manager AI Training & Team Leadership | ScaledNative",
    description: "AI training designed for managers and team leaders. Learn to lead AI-augmented teams, implement AI workflows, and drive productivity. ScaledNative's manager track for practical AI leadership.",
    keywords: ["AI training for managers", "manager AI training", "team leader AI training", "AI for middle management", "supervise AI teams", "manage AI projects"],
    alternates: { canonical: "https://scalednative.com/ai-training-managers" },
};

const faqs = [
    { question: "What do managers learn in AI training?", answer: "Managers learn to integrate AI into team workflows, supervise AI-augmented work, measure AI productivity gains, evaluate AI tools, and lead change management for AI adoption." },
    { question: "How long is the manager AI program?", answer: "The manager track is 12 hours, typically completed over 2-3 weeks. Content is designed for busy managers with flexible scheduling." },
];

export default function AITrainingManagersPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <FAQSchema faqs={faqs} />
            <BreadcrumbSchema items={[{ name: "Home", url: "https://scalednative.com" }, { name: "AI Training for Managers", url: "https://scalednative.com/ai-training-managers" }]} />
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
                    <Link href="/" className="font-playfair text-2xl italic">ScaledNative<sup className="text-[10px]">™</sup></Link>
                    <div className="hidden md:flex gap-10"><Link href="/native" className="text-sm text-white/40 hover:text-white">Framework</Link><Link href="/pricing" className="text-sm text-white/40 hover:text-white">Pricing</Link></div>
                    <Link href="/signup" className="px-4 py-2 bg-white text-black rounded-full text-sm font-medium">Get Started</Link>
                </div>
            </nav>
            <section className="pt-32 pb-20 px-6"><div className="max-w-6xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/30 mb-8">
                    <span className="text-sm text-indigo-400">Manager Leadership Track</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-bold mb-6">AI Training<br />for Managers</h1>
                <p className="text-xl text-white/60 max-w-3xl mx-auto mb-8">Lead AI-augmented teams with confidence. <strong className="text-white">AI training for managers</strong> covers workflow integration, team productivity, and change leadership.</p>
                <Link href="/signup" className="px-8 py-4 bg-indigo-500 text-white rounded-full font-semibold">Start Manager Training</Link>
            </div></section>
            <section className="py-20 px-6 border-t border-white/5"><div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold mb-12 text-center">Manager AI Curriculum</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        { title: "AI Workflow Integration", desc: "Implement AI into team processes" },
                        { title: "Team Productivity", desc: "Measure and optimize AI-augmented output" },
                        { title: "Tool Evaluation", desc: "Select and deploy the right AI tools" },
                        { title: "Change Management", desc: "Lead team through AI adoption" },
                        { title: "Quality Assurance", desc: "Maintain standards with AI assistance" },
                        { title: "Reporting & Metrics", desc: "Track AI impact on team performance" },
                    ].map((topic, i) => (
                        <div key={i} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                            <h3 className="font-semibold mb-2">{topic.title}</h3>
                            <p className="text-sm text-white/50">{topic.desc}</p>
                        </div>
                    ))}
                </div>
            </div></section>
            <section className="py-20 px-6 border-t border-white/5"><div className="max-w-4xl mx-auto">
                {faqs.map((faq, i) => (<details key={i} className="group p-6 rounded-2xl bg-white/[0.02] border border-white/5 mb-4"><summary className="font-semibold cursor-pointer flex justify-between">{faq.question}<span className="group-open:rotate-45">+</span></summary><p className="mt-4 text-white/60">{faq.answer}</p></details>))}
            </div></section>
            <footer className="py-12 px-8 border-t border-white/5"><div className="mx-auto max-w-6xl flex justify-between items-center">
                <span className="font-playfair text-lg italic">ScaledNative<sup className="text-[8px]">™</sup></span>
                <div className="text-xs text-white/20">© 2025 ScaledNative™</div>
            </div></footer>
        </div>
    );
}
