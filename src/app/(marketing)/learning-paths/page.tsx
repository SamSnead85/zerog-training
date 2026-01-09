import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "AI Learning Paths | Role-Based AI Training Tracks | ScaledNative",
    description: "Browse AI learning paths designed for every role. From AI Foundations for all employees to advanced AI Architect certification. Role-based tracks ensure relevant, practical AI training.",
    keywords: ["AI learning paths", "AI training tracks", "role-based AI training", "AI curriculum paths", "AI career development"],
    alternates: { canonical: "https://scalednative.com/learning-paths" },
};

export default function LearningPathsPage() {
    const paths = [
        { name: "AI Foundations", hours: "8h", roles: "All Employees", desc: "Essential AI literacy for everyone", color: "bg-blue-500/20 border-blue-500/30" },
        { name: "AI for Executives", hours: "20h", roles: "C-Suite, VPs", desc: "Strategy, governance, transformation leadership", color: "bg-amber-500/20 border-amber-500/30" },
        { name: "AI for Managers", hours: "12h", roles: "Team Leads, Directors", desc: "Team AI integration and productivity", color: "bg-indigo-500/20 border-indigo-500/30" },
        { name: "Prompt Engineering", hours: "16h", roles: "Knowledge Workers", desc: "Master ChatGPT, Claude, GPT-4", color: "bg-purple-500/20 border-purple-500/30" },
        { name: "AI for Developers", hours: "20h", roles: "Engineers, Architects", desc: "AI-assisted coding and integration", color: "bg-green-500/20 border-green-500/30" },
        { name: "AI for Sales", hours: "10h", roles: "Sales Teams", desc: "Prospecting, personalization, closing", color: "bg-rose-500/20 border-rose-500/30" },
        { name: "AI for Marketing", hours: "10h", roles: "Marketing Teams", desc: "Content, campaigns, analytics", color: "bg-fuchsia-500/20 border-fuchsia-500/30" },
        { name: "AI for HR", hours: "10h", roles: "People Teams", desc: "Recruiting, talent, experience", color: "bg-violet-500/20 border-violet-500/30" },
        { name: "AI for Customer Service", hours: "10h", roles: "Support Teams", desc: "Automation, chatbots, quality", color: "bg-sky-500/20 border-sky-500/30" },
        { name: "AI Data Strategist", hours: "20h", roles: "Data Teams", desc: "Data strategy for AI success", color: "bg-teal-500/20 border-teal-500/30" },
        { name: "AI Transformation Leader", hours: "24h", roles: "Change Leaders", desc: "Lead organizational AI change", color: "bg-orange-500/20 border-orange-500/30" },
        { name: "Enterprise AI Architect", hours: "30h", roles: "Technical Leaders", desc: "Enterprise-scale AI systems", color: "bg-cyan-500/20 border-cyan-500/30" },
    ];

    return (
        <div className="min-h-screen bg-black text-white">
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
                    <Link href="/" className="font-playfair text-2xl italic">ScaledNative<sup className="text-[10px]">™</sup></Link>
                    <Link href="/signup" className="px-4 py-2 bg-white text-black rounded-full text-sm font-medium">Get Started</Link>
                </div>
            </nav>
            <section className="pt-32 pb-20 px-6"><div className="max-w-6xl mx-auto text-center">
                <h1 className="text-5xl md:text-6xl font-bold mb-6">AI Learning Paths</h1>
                <p className="text-xl text-white/60 max-w-3xl mx-auto mb-12">Role-based training tracks for every level. Find your path to AI proficiency.</p>
            </div></section>
            <section className="py-10 px-6"><div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {paths.map((path, i) => (
                        <div key={i} className={`p-6 rounded-2xl border ${path.color}`}>
                            <div className="text-xs text-white/40 mb-2">{path.hours} • {path.roles}</div>
                            <h3 className="font-semibold text-lg mb-2">{path.name}</h3>
                            <p className="text-white/60 text-sm">{path.desc}</p>
                        </div>
                    ))}
                </div>
            </div></section>
            <section className="py-20 px-6 border-t border-white/5"><div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-4">Start Your Learning Path</h2>
                <Link href="/signup" className="inline-flex px-8 py-4 bg-white text-black rounded-full font-semibold">Begin Training</Link>
            </div></section>
            <footer className="py-12 px-8 border-t border-white/5"><div className="mx-auto max-w-6xl flex justify-between items-center">
                <span className="font-playfair text-lg italic">ScaledNative<sup className="text-[8px]">™</sup></span>
                <div className="text-xs text-white/20">© 2025 ScaledNative™</div>
            </div></footer>
        </div>
    );
}
