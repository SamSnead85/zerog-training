import Link from "next/link";
import { Metadata } from "next";
import { Button } from "@/components/ui";
import {
    ArrowRight,
    Building2,
    Check,
    Shield,
    Users,
    BarChart3,
    Settings,
    Zap,
    Clock,
    Target,
    Award,
} from "lucide-react";

export const metadata: Metadata = {
    title: "For Enterprise | ScaledNative - AI-Native Transformation at Scale",
    description: "Transform your organization to AI-Native with the NATIVE framework, certification program, and enterprise platform. Built for CIOs, CHROs, and transformation leaders.",
};

const stats = [
    { value: "634+", label: "Hours of Curriculum" },
    { value: "60%", label: "Faster Time-to-Competency" },
    { value: "95%", label: "Completion Rate" },
    { value: "736%", label: "Average ROI" },
];

const pillars = [
    {
        icon: Target,
        title: "Shared Language",
        problem: "When your CEO, CIO, and frontline employees talk about AI, they mean different things.",
        solution: "NATIVE provides common vocabulary. 'NATIVE Practitioner' means something specific. 'Level 2 maturity' has a clear definition.",
    },
    {
        icon: Shield,
        title: "Clear Standards",
        problem: "Without standards, every team invents their own AI governance. Chaos ensues.",
        solution: "NATIVE provides governance standards that enable speed, not bureaucracy. Clear guardrails. Clear escalation paths.",
    },
    {
        icon: Users,
        title: "Role-Based Paths",
        problem: "Generic AI training teaches everyone the same thing, regardless of role.",
        solution: "Customized training paths for every role: developers, product managers, analysts, leaders, and everyone else.",
    },
    {
        icon: BarChart3,
        title: "Measurable Outcomes",
        problem: "How do you know if AI transformation is working?",
        solution: "Clear maturity levels, certification rates, and Kirkpatrick Model evaluation provide board-ready reporting.",
    },
];

const timeline = [
    { phase: "Months 1-3", title: "Foundation", activities: ["NATIVE Maturity Assessment", "Executive certification", "Pilot cohort launch", "Success metrics definition"] },
    { phase: "Months 4-6", title: "Acceleration", activities: ["Department rollout", "AI standards development", "Team champion certification", "Governance framework"] },
    { phase: "Months 7-9", title: "Scale", activities: ["Organization-wide deployment", "Advanced certifications", "Cross-functional coordination", "ROI measurement"] },
    { phase: "Months 10-12", title: "Optimize", activities: ["Operating model refinement", "Continuous improvement", "Advanced use cases", "Next-year planning"] },
];

export default function EnterprisePage() {
    return (
        <main className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative py-24 px-6 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-blue-500/5" />

                <div className="relative mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary text-sm font-medium mb-6">
                            <Building2 className="h-4 w-4" />
                            Enterprise AI Transformation
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
                            Transform Your Organization to{" "}
                            <span className="text-primary">AI-Native</span>
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                            The framework, platform, and certification program for enterprise AI transformation.
                            We don't sell training. We deliver transformation.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/contact">
                                <Button size="lg" className="gap-2">
                                    Book Strategy Session
                                    <ArrowRight className="h-4 w-4" />
                                </Button>
                            </Link>
                            <Link href="/assessment">
                                <Button size="lg" variant="outline">
                                    Take Maturity Assessment
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {stats.map((stat, idx) => (
                            <div key={idx} className="text-center p-6 rounded-xl bg-white/[0.02] border border-white/10">
                                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">{stat.value}</div>
                                <div className="text-sm text-muted-foreground">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* The Business Case */}
            <section className="py-24 px-6 bg-black/20">
                <div className="mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Why AI-Native Transformation Matters Now</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            The organizations that become AI-Native will dominate their industries.
                            The window for leadership is closing.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 mb-12">
                        <div className="p-6 rounded-xl bg-red-500/5 border border-red-500/20">
                            <h3 className="text-xl font-semibold mb-4 text-red-400">The Cost of Inaction</h3>
                            <ul className="space-y-3">
                                {[
                                    "Pilots that never scale, tools that sit unused",
                                    "Top performers leaving for AI-Native organizations",
                                    "Slower, more expensive operations than competitors",
                                    "Uncoordinated AI use creating compliance exposure",
                                ].map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-sm">
                                        <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="p-6 rounded-xl bg-primary/5 border border-primary/20">
                            <h3 className="text-xl font-semibold mb-4 text-primary">The ScaledNative Advantage</h3>
                            <ul className="space-y-3">
                                {[
                                    "Unified platform replacing 12+ fragmented solutions",
                                    "AI-powered personalization for every role",
                                    "Verified skills, not completion certificates",
                                    "Board-ready ROI reporting",
                                ].map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-sm">
                                        <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Four Pillars */}
            <section className="py-24 px-6">
                <div className="mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">The NATIVE Framework for Enterprises</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {pillars.map((pillar, idx) => (
                            <div key={idx} className="p-6 rounded-xl bg-white/[0.02] border border-white/10">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                                        <pillar.icon className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold mb-2">{pillar.title}</h3>
                                        <p className="text-sm text-muted-foreground mb-2">
                                            <strong>The Problem:</strong> {pillar.problem}
                                        </p>
                                        <p className="text-sm">
                                            <strong className="text-primary">The Solution:</strong> {pillar.solution}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Platform Features */}
            <section className="py-24 px-6 bg-black/20">
                <div className="mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Enterprise-Grade Platform</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Built for enterprise scale, security, and integration
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { icon: Settings, title: "HRIS Integration", desc: "Sync with Workday, SAP, BambooHR. Auto-assign by role." },
                            { icon: Shield, title: "SOC 2 & GDPR", desc: "Enterprise security. Data residency options." },
                            { icon: BarChart3, title: "Analytics Dashboard", desc: "Track capability by role, department, skill level." },
                            { icon: Users, title: "SSO Integration", desc: "SAML, OIDC. Connect to Okta, Azure AD, Ping." },
                            { icon: Zap, title: "AI-Powered Delivery", desc: "Gemini AI personalizes every learning experience." },
                            { icon: Award, title: "Certification Program", desc: "Four levels from Foundation to Expert." },
                        ].map((feature, idx) => (
                            <div key={idx} className="p-6 rounded-xl bg-white/[0.02] border border-white/10">
                                <feature.icon className="h-8 w-8 text-primary mb-3" />
                                <h3 className="font-semibold mb-1">{feature.title}</h3>
                                <p className="text-sm text-muted-foreground">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Implementation Timeline */}
            <section className="py-24 px-6">
                <div className="mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Your 12-Month Transformation Roadmap</h2>
                    </div>

                    <div className="grid md:grid-cols-4 gap-6">
                        {timeline.map((phase, idx) => (
                            <div key={idx} className="p-6 rounded-xl bg-white/[0.02] border border-white/10">
                                <div className="text-sm text-primary font-medium mb-1">{phase.phase}</div>
                                <h3 className="text-xl font-semibold mb-4">{phase.title}</h3>
                                <ul className="space-y-2">
                                    {phase.activities.map((activity, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                            <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                            {activity}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 px-6 bg-gradient-to-br from-primary/10 via-background to-purple-500/5">
                <div className="mx-auto max-w-4xl text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Ready to Transform?
                    </h2>
                    <p className="text-lg text-muted-foreground mb-8">
                        Book a strategy session to discuss your AI transformation with a NATIVE expert.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/contact">
                            <Button size="lg" className="gap-2">
                                Book Strategy Session
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </Link>
                        <Link href="/assessment">
                            <Button size="lg" variant="outline">
                                Take Maturity Assessment
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
