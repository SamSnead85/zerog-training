import Link from "next/link";
import { Metadata } from "next";
import { Button } from "@/components/ui";
import {
    ArrowRight,
    ClipboardCheck,
    BarChart3,
    Target,
    Users,
    Building2,
    Zap,
    Clock,
} from "lucide-react";

export const metadata: Metadata = {
    title: "NATIVE Maturity Assessment | ScaledNative",
    description: "Take the free 10-minute NATIVE Maturity Assessment to understand where your organization stands on the AI-Native journey.",
};

const dimensions = [
    {
        icon: Users,
        title: "Individual AI Adoption",
        questions: [
            "What percentage of employees actively use AI?",
            "Is usage compliant and governed?",
            "Are skills verified or self-reported?",
        ],
    },
    {
        icon: Target,
        title: "Team AI Workflows",
        questions: [
            "Do teams have documented AI workflows?",
            "Are there team-level AI standards?",
            "Do teams measure AI productivity?",
        ],
    },
    {
        icon: Building2,
        title: "Organizational Standards",
        questions: [
            "Is there formal AI governance?",
            "Are there cross-department standards?",
            "Is AI usage tracked organization-wide?",
        ],
    },
    {
        icon: Zap,
        title: "Executive Ownership",
        questions: [
            "Is there executive sponsorship?",
            "Is AI part of strategic planning?",
            "Are investments coordinated?",
        ],
    },
];

const levels = [
    { level: 1, name: "Foundations", desc: "Individual AI literacy focus", color: "from-blue-500 to-blue-600" },
    { level: 2, name: "Teams", desc: "Team-level AI workflows", color: "from-purple-500 to-purple-600" },
    { level: 3, name: "Organization", desc: "Enterprise-wide standards", color: "from-primary to-orange-600" },
    { level: 4, name: "Operating Model", desc: "AI-Native operations", color: "from-amber-500 to-amber-600" },
];

export default function AssessmentPage() {
    return (
        <main className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative py-24 px-6 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-purple-500/5" />

                <div className="relative mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary text-sm font-medium mb-6">
                            <ClipboardCheck className="h-4 w-4" />
                            Free Assessment
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
                            Where is Your Organization on the{" "}
                            <span className="text-primary">AI-Native</span> Journey?
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                            Take the free 10-minute NATIVE Maturity Assessment to understand your current state
                            and get a customized report with recommendations.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Button size="lg" className="gap-2">
                                Begin Assessment
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </div>
                        <p className="mt-4 text-sm text-muted-foreground">
                            No signup required to start. Results delivered immediately.
                        </p>
                    </div>

                    {/* What You Get */}
                    <div className="grid md:grid-cols-3 gap-6 mb-16">
                        {[
                            { icon: BarChart3, title: "Your Maturity Level", desc: "Clear understanding of your current state (Level 1-4)" },
                            { icon: Target, title: "Gap Analysis", desc: "Strengths and gaps across all four dimensions" },
                            { icon: Clock, title: "Roadmap", desc: "Specific next steps and estimated timeline" },
                        ].map((item, idx) => (
                            <div key={idx} className="p-6 rounded-xl bg-white/[0.02] border border-white/10 text-center">
                                <item.icon className="h-10 w-10 text-primary mx-auto mb-3" />
                                <h3 className="font-semibold mb-1">{item.title}</h3>
                                <p className="text-sm text-muted-foreground">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Assessment Dimensions */}
            <section className="py-24 px-6 bg-black/20">
                <div className="mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">What We Evaluate</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            The assessment covers four key dimensions of AI-Native capability
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {dimensions.map((dim, idx) => (
                            <div key={idx} className="p-6 rounded-xl bg-white/[0.02] border border-white/10">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                                        <dim.icon className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold mb-3">{dim.title}</h3>
                                        <ul className="space-y-2">
                                            {dim.questions.map((q, i) => (
                                                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                                    <span className="text-primary">•</span>
                                                    {q}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Maturity Levels */}
            <section className="py-24 px-6">
                <div className="mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">The Four NATIVE Maturity Levels</h2>
                    </div>

                    <div className="grid md:grid-cols-4 gap-6">
                        {levels.map((level) => (
                            <div key={level.level} className="p-6 rounded-xl bg-white/[0.02] border border-white/10 text-center">
                                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${level.color} flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4`}>
                                    {level.level}
                                </div>
                                <h3 className="font-semibold mb-1">{level.name}</h3>
                                <p className="text-sm text-muted-foreground">{level.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-24 px-6 bg-black/20">
                <div className="mx-auto max-w-4xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
                    </div>

                    <div className="space-y-8">
                        {[
                            { step: 1, title: "Answer 25 Questions", time: "10 minutes", desc: "Honest questions about your organization's AI practices. No trick questions." },
                            { step: 2, title: "Receive Instant Results", time: "Immediate", desc: "Your NATIVE Maturity Score appears immediately. No waiting." },
                            { step: 3, title: "Download Your Report", time: "PDF", desc: "Detailed findings, recommendations, and next steps. Share with your team." },
                            { step: 4, title: "Book a Strategy Session", time: "Optional", desc: "Discuss results with a NATIVE expert. Free 30-minute consultation." },
                        ].map((item) => (
                            <div key={item.step} className="flex gap-6 items-start">
                                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xl flex-shrink-0">
                                    {item.step}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-1">
                                        <h3 className="font-semibold">{item.title}</h3>
                                        <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-muted-foreground">{item.time}</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 px-6">
                <div className="mx-auto max-w-4xl text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Start Your Assessment
                    </h2>
                    <p className="text-lg text-muted-foreground mb-8">
                        10 minutes. Instant results. Actionable recommendations.
                    </p>
                    <Button size="lg" className="gap-2">
                        Begin Assessment
                        <ArrowRight className="h-4 w-4" />
                    </Button>
                    <p className="mt-4 text-sm text-muted-foreground">
                        No signup required to start
                    </p>
                </div>
            </section>
        </main>
    );
}
