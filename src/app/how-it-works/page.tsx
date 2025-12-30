import Link from "next/link";
import { Metadata } from "next";
import { Button } from "@/components/ui";
import {
    ArrowRight,
    Brain,
    Check,
    X,
    Zap,
    Target,
    Users,
    Play,
    Building2,
    Sparkles,
    MessageSquare,
    Code,
    BarChart3,
} from "lucide-react";

export const metadata: Metadata = {
    title: "How It Works | ScaledNative - AI-Powered Adaptive Learning",
    description: "Stop watching. Start doing. See how ScaledNative's AI-powered adaptive learning engine delivers real training with real results.",
};

const comparison = [
    { feature: "Delivery", traditional: "Static video playlists", scalednative: "Dynamic, adaptive learning paths" },
    { feature: "Learning", traditional: "Passive consumption", scalednative: "Active, hands-on doing" },
    { feature: "Assessment", traditional: "Multiple-choice (tests memory)", scalednative: "Performance-based (tests skill)" },
    { feature: "Personalization", traditional: "None", scalednative: "AI-powered (role, performance, context)" },
    { feature: "Relevance", traditional: "Generic examples", scalednative: "Your company's context" },
    { feature: "Tutoring", traditional: "None", scalednative: "24/7 AI tutor" },
    { feature: "Results", traditional: "Certificate of completion", scalednative: "Portfolio of verified skills" },
    { feature: "Outcome", traditional: "You KNOW about it", scalednative: "You can DO it" },
];

export default function HowItWorksPage() {
    return (
        <main className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative py-24 px-6 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-purple-500/5" />

                <div className="relative mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary text-sm font-medium mb-6">
                            <Zap className="h-4 w-4" />
                            AI-Powered Learning
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
                            Stop Watching. <span className="text-primary">Start Doing.</span>
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                            Traditional online training is broken. It's passive, one-size-fits-all, and it doesn't work.
                            ScaledNative is different. We use AI to create a dynamic learning experience that adapts to you.
                        </p>
                    </div>
                </div>
            </section>

            {/* The Problem Section */}
            <section className="py-24 px-6 bg-black/40">
                <div className="mx-auto max-w-6xl">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Problem Visual */}
                        <div className="p-8 rounded-2xl bg-gray-900/50 border border-gray-700">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-3 h-3 rounded-full bg-red-500" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                <div className="w-3 h-3 rounded-full bg-green-500" />
                            </div>
                            <div className="space-y-4">
                                <div className="h-4 bg-gray-700 rounded w-3/4" />
                                <div className="aspect-video bg-gray-800 rounded flex items-center justify-center">
                                    <Play className="h-12 w-12 text-gray-600" />
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="h-2 bg-gray-700 rounded flex-1">
                                        <div className="h-2 bg-red-500/50 rounded w-[15%]" />
                                    </div>
                                    <span className="text-xs text-gray-500">15%</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-500 text-sm">
                                    <Users className="h-4 w-4" />
                                    <span>Student looks bored...</span>
                                </div>
                            </div>
                        </div>

                        {/* Problem Text */}
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">
                                The Illusion of Learning
                            </h2>
                            <p className="text-muted-foreground mb-6">
                                For too long, enterprise training has been a numbers game focused on "completion rates"
                                for passive video courses. This is the illusion of learning. Your employees click through
                                videos, get a certificate, but can they actually <strong className="text-white">do the job</strong>?
                            </p>

                            <div className="space-y-4">
                                {[
                                    { title: "Every learner is different", desc: "A PM and an Engineer don't learn the same way" },
                                    { title: "Knowledge isn't skill", desc: "Watching a video doesn't make you competent" },
                                    { title: "Generic content is irrelevant", desc: "Abstract examples don't transfer to real work" },
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-start gap-3">
                                        <X className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <div className="font-medium">{item.title}</div>
                                            <div className="text-sm text-muted-foreground">{item.desc}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                                <p className="text-sm text-red-300">
                                    <strong>The result?</strong> Wasted time, wasted money, and a workforce that isn't actually prepared for the future.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* The Solution Section */}
            <section className="py-24 px-6">
                <div className="mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Real Training. Real Results. <span className="text-primary">Powered by AI.</span>
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            ScaledNative uses Google's Gemini AI to create a learning experience as unique as you are.
                        </p>
                    </div>

                    {/* 4 Steps */}
                    <div className="space-y-16">
                        {/* Step 1 */}
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium mb-4">
                                    Step 1
                                </div>
                                <h3 className="text-2xl font-bold mb-4">It Learns About You</h3>
                                <p className="text-muted-foreground mb-4">
                                    Your journey starts by telling us who you are and what you want to achieve.
                                    The AI instantly personalizes the entire curriculum to your specific context.
                                </p>
                                <ul className="space-y-2">
                                    {["Role-specific examples", "Industry-relevant scenarios", "Appropriate depth based on experience"].map((item, idx) => (
                                        <li key={idx} className="flex items-center gap-2 text-sm">
                                            <Check className="h-4 w-4 text-primary" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                        <Users className="h-5 w-5 text-primary" />
                                        <span className="font-medium">User Profile</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {["Role: Product Manager", "Industry: Healthcare", "Goal: AI-Native Leader", "Experience: 5+ years"].map((tag, idx) => (
                                            <span key={idx} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm border border-primary/20">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div className="order-2 lg:order-1 p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                                <div className="space-y-4">
                                    <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                                        <div className="text-sm text-red-300 mb-2">Question answered incorrectly</div>
                                        <div className="text-sm">Context windows in LLMs...</div>
                                    </div>
                                    <div className="flex items-center gap-2 text-primary">
                                        <Brain className="h-5 w-5 animate-pulse" />
                                        <span className="text-sm">AI generating focused micro-lesson...</span>
                                    </div>
                                    <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                                        <div className="text-sm text-primary mb-2">New targeted content</div>
                                        <div className="text-sm text-muted-foreground">Understanding context windows: A deeper look...</div>
                                    </div>
                                </div>
                            </div>
                            <div className="order-1 lg:order-2">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium mb-4">
                                    Step 2
                                </div>
                                <h3 className="text-2xl font-bold mb-4">It Adapts to You</h3>
                                <p className="text-muted-foreground mb-4">
                                    As you learn, the AI analyzes your performance in real-time. Struggling with a concept?
                                    The platform doubles down. Mastering a topic? It accelerates you forward.
                                </p>
                                <ul className="space-y-2">
                                    {["Dynamic difficulty adjustment", "Immediate remediation when you struggle", "Acceleration when you're ready"].map((item, idx) => (
                                        <li key={idx} className="flex items-center gap-2 text-sm">
                                            <Check className="h-4 w-4 text-primary" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium mb-4">
                                    Step 3
                                </div>
                                <h3 className="text-2xl font-bold mb-4">You Learn by Doing</h3>
                                <p className="text-muted-foreground mb-4">
                                    Forget passive videos. You'll spend your time in hands-on labs, code sandboxes,
                                    and real-world simulations. You can't just click "Next." You have to prove your competency.
                                </p>
                                <ul className="space-y-2">
                                    {["Interactive coding environments", "AI simulation sandboxes", "Automated skill verification", "Portfolio of demonstrated work"].map((item, idx) => (
                                        <li key={idx} className="flex items-center gap-2 text-sm">
                                            <Check className="h-4 w-4 text-primary" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 rounded-lg bg-black/20">
                                        <Code className="h-5 w-5 text-primary mb-2" />
                                        <div className="text-sm font-medium mb-2">Code Sandbox</div>
                                        <div className="text-xs text-muted-foreground font-mono">
                                            prompt = "Summarize..."
                                        </div>
                                    </div>
                                    <div className="p-4 rounded-lg bg-black/20">
                                        <div className="text-sm font-medium mb-3">Verification</div>
                                        <div className="space-y-2">
                                            {["Prompt structure", "Context provided", "Output validated"].map((item, idx) => (
                                                <div key={idx} className="flex items-center gap-2 text-xs">
                                                    <Check className="h-3 w-3 text-green-400" />
                                                    {item}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Step 4 */}
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div className="order-2 lg:order-1 p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                                <div className="space-y-4">
                                    <div className="p-3 rounded-lg bg-gray-800/50 text-sm text-muted-foreground">
                                        <span className="text-gray-500">Generic:</span> "Write a prompt to summarize an article"
                                    </div>
                                    <div className="flex items-center justify-center">
                                        <ArrowRight className="h-6 w-6 text-primary" />
                                    </div>
                                    <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 text-sm">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Building2 className="h-4 w-4 text-primary" />
                                            <span className="text-primary font-medium">Your Company</span>
                                        </div>
                                        "Write a prompt to summarize this patient intake form per HIPAA guidelines"
                                    </div>
                                </div>
                            </div>
                            <div className="order-1 lg:order-2">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium mb-4">
                                    Step 4
                                </div>
                                <h3 className="text-2xl font-bold mb-4">It Speaks Your Language</h3>
                                <p className="text-muted-foreground mb-4">
                                    ScaledNative integrates with your company's documents, policies, and workflows.
                                    The AI generates examples directly relevant to your daily work.
                                </p>
                                <ul className="space-y-2">
                                    {["Training with your actual tools", "Industry-specific scenarios", "Compliance using your policies", "Knowledge that transfers to work"].map((item, idx) => (
                                        <li key={idx} className="flex items-center gap-2 text-sm">
                                            <Check className="h-4 w-4 text-primary" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Comparison Section */}
            <section className="py-24 px-6 bg-black/20">
                <div className="mx-auto max-w-4xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">The Choice is Clear</h2>
                    </div>

                    <div className="rounded-2xl border border-white/10 overflow-hidden">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-white/5">
                                    <th className="text-left p-4 font-semibold">Feature</th>
                                    <th className="text-left p-4 font-semibold text-gray-400">Traditional</th>
                                    <th className="text-left p-4 font-semibold text-primary">ScaledNative</th>
                                </tr>
                            </thead>
                            <tbody>
                                {comparison.map((row, idx) => (
                                    <tr key={idx} className="border-t border-white/5">
                                        <td className="p-4 font-medium">{row.feature}</td>
                                        <td className="p-4 text-gray-400">{row.traditional}</td>
                                        <td className="p-4 text-primary">{row.scalednative}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-24 px-6">
                <div className="mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Real Numbers. Real Results.</h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                        {[
                            { value: "60%", label: "Faster Time-to-Competency" },
                            { value: "95%", label: "Completion Rate" },
                            { value: "4.9/5", label: "Average Rating" },
                            { value: "40%+", label: "Productivity Improvement" },
                        ].map((stat, idx) => (
                            <div key={idx} className="text-center p-6 rounded-xl bg-white/[0.02] border border-white/10">
                                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">{stat.value}</div>
                                <div className="text-sm text-muted-foreground">{stat.label}</div>
                            </div>
                        ))}
                    </div>

                    <div className="p-6 rounded-xl bg-white/[0.02] border border-white/10 max-w-3xl mx-auto">
                        <blockquote className="text-lg italic mb-4">
                            "We tried Udemy, Coursera, and LinkedIn Learning. Completion was high, but nothing changed.
                            With ScaledNative, our developers actually use AI effectively. The difference is they had to
                            prove they could do it, not just watch someone else do it."
                        </blockquote>
                        <div className="text-sm text-muted-foreground">
                            <strong className="text-white">Director of Engineering</strong>, Enterprise Software Company
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 px-6 bg-gradient-to-br from-primary/10 via-background to-purple-500/5">
                <div className="mx-auto max-w-4xl text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Don't Just Train. Transform.
                    </h2>
                    <p className="text-lg text-muted-foreground mb-8">
                        Ready to move beyond the illusion of learning and start building real skills?
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/contact">
                            <Button size="lg" className="gap-2">
                                See Real Results - Schedule a Demo
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </Link>
                        <Link href="/training/module-1">
                            <Button size="lg" variant="outline">
                                Try Sample Lesson Free
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
