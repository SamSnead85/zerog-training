import Link from "next/link";
import { Metadata } from "next";
import { Button } from "@/components/ui";
import {
    ArrowRight,
    Brain,
    Sparkles,
    Zap,
    Target,
    Shield,
    BarChart3,
    Users,
    Laptop,
    MessageSquare,
    Layers,
    Settings,
    BookOpen,
    Check,
} from "lucide-react";

export const metadata: Metadata = {
    title: "Platform Features | ScaledNative - AI-Powered Training Delivery",
    description: "Experience AI-powered training delivery with personalization, hands-on verification, organizational context integration, and 24/7 AI tutoring.",
};

const features = [
    {
        icon: Sparkles,
        title: "AI-Powered Personalization",
        description: "Gemini AI adapts content to each learner's role, industry, skill level, and performance in real-time.",
        details: [
            "Role-based content delivery",
            "Skill-level adaptation",
            "Performance-driven pacing",
            "Industry-specific examples",
        ],
    },
    {
        icon: Building,
        title: "Organizational Context Integration",
        description: "Upload your policies, tools, and workflows. Training becomes immediately applicable to your environment.",
        details: [
            "Policy integration",
            "Custom use cases",
            "Industry examples",
            "Tool-specific training",
        ],
    },
    {
        icon: Target,
        title: "Adaptive Assessment Engine",
        description: "Quizzes adapt to performance, identifying weak areas and adjusting difficulty in real-time.",
        details: [
            "Dynamic difficulty",
            "Gap identification",
            "Remediation paths",
            "Continuous tracking",
        ],
    },
    {
        icon: Laptop,
        title: "Hands-On Skill Verification",
        description: "Interactive labs with automated checking prove learners can do the work, not just recall information.",
        details: [
            "Code sandboxes",
            "AI simulation environments",
            "Real-world scenarios",
            "Portfolio building",
        ],
    },
    {
        icon: MessageSquare,
        title: "24/7 AI Tutor",
        description: "A Socratic AI tutor provides guidance without giving answers, available whenever learners need help.",
        details: [
            "Guided discovery",
            "Context-aware help",
            "Always available",
            "Human escalation",
        ],
    },
    {
        icon: Layers,
        title: "Multi-Modal Content",
        description: "AI generates audio summaries, visual diagrams, and alternative explanations on demand.",
        details: [
            "Audio versions",
            "Auto-generated diagrams",
            "Slide decks",
            "Alternative explanations",
        ],
    },
];

const comparison = [
    { feature: "Personalization", traditional: "Static paths", scalednative: "AI-adaptive, role-based" },
    { feature: "Content Delivery", traditional: "Pre-recorded videos", scalednative: "AI-enhanced, context-aware" },
    { feature: "Assessments", traditional: "Fixed multiple choice", scalednative: "Adaptive, skills-focused" },
    { feature: "Skill Verification", traditional: "Completion certificates", scalednative: "Hands-on labs" },
    { feature: "Tutoring", traditional: "None", scalednative: "24/7 AI tutor" },
    { feature: "Org Context", traditional: "None", scalednative: "Fully integrated" },
    { feature: "Analytics", traditional: "Completion rates", scalednative: "Kirkpatrick Model, skills maps" },
    { feature: "Time to Competency", traditional: "Weeks to months", scalednative: "Days to weeks" },
];

function Building(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
            <path d="M9 22v-4h6v4" />
            <path d="M8 6h.01" />
            <path d="M16 6h.01" />
            <path d="M12 6h.01" />
            <path d="M12 10h.01" />
            <path d="M12 14h.01" />
            <path d="M16 10h.01" />
            <path d="M16 14h.01" />
            <path d="M8 10h.01" />
            <path d="M8 14h.01" />
        </svg>
    );
}

export default function PlatformPage() {
    return (
        <main className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative py-24 px-6 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-background to-primary/5" />

                <div className="relative mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary text-sm font-medium mb-6">
                            <Zap className="h-4 w-4" />
                            AI-Powered Delivery
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
                            It's Not What We Teach.
                            <br />
                            <span className="text-primary">It's How We Teach It.</span>
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                            Traditional platforms deliver static content. ScaledNative uses AI to create
                            adaptive, personalized learning experiences that evolve with each learner.
                        </p>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-24 px-6 bg-black/20">
                <div className="mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Platform Capabilities</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Six key features that make ScaledNative fundamentally different from traditional training
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, idx) => (
                            <div
                                key={idx}
                                className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-primary/30 transition-all"
                            >
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                                    <feature.icon className="h-6 w-6 text-primary" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                <p className="text-sm text-muted-foreground mb-4">{feature.description}</p>
                                <ul className="space-y-2">
                                    {feature.details.map((detail, i) => (
                                        <li key={i} className="flex items-center gap-2 text-sm">
                                            <Check className="h-4 w-4 text-primary" />
                                            {detail}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Comparison Table */}
            <section className="py-24 px-6">
                <div className="mx-auto max-w-4xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">ScaledNative vs. Traditional LMS</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            See how AI-powered delivery transforms the learning experience
                        </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 overflow-hidden">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-white/5">
                                    <th className="text-left p-4 font-semibold">Capability</th>
                                    <th className="text-left p-4 font-semibold text-muted-foreground">Traditional LMS</th>
                                    <th className="text-left p-4 font-semibold text-primary">ScaledNative</th>
                                </tr>
                            </thead>
                            <tbody>
                                {comparison.map((row, idx) => (
                                    <tr key={idx} className="border-t border-white/5">
                                        <td className="p-4 font-medium">{row.feature}</td>
                                        <td className="p-4 text-muted-foreground">{row.traditional}</td>
                                        <td className="p-4 text-primary">{row.scalednative}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Enterprise Integration */}
            <section className="py-24 px-6 bg-black/20">
                <div className="mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Enterprise Integration</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Seamlessly connects with your existing technology ecosystem
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { title: "SSO Integration", desc: "SAML 2.0, OIDC, Okta, Azure AD" },
                            { title: "HRIS Integration", desc: "Workday, SAP, BambooHR" },
                            { title: "LMS Compatibility", desc: "SCORM, xAPI, bi-directional sync" },
                            { title: "API Access", desc: "REST API, webhooks, custom workflows" },
                        ].map((item, idx) => (
                            <div key={idx} className="p-6 rounded-xl bg-white/[0.02] border border-white/10 text-center">
                                <Settings className="h-8 w-8 text-primary mx-auto mb-3" />
                                <h3 className="font-semibold mb-1">{item.title}</h3>
                                <p className="text-sm text-muted-foreground">{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 flex flex-wrap justify-center gap-6">
                        {[
                            { icon: Shield, label: "SOC 2 Type II" },
                            { icon: Shield, label: "GDPR Compliant" },
                            { icon: Shield, label: "HIPAA Ready" },
                        ].map((badge, idx) => (
                            <div key={idx} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                                <badge.icon className="h-4 w-4 text-primary" />
                                <span className="text-sm font-medium">{badge.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 px-6">
                <div className="mx-auto max-w-4xl text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        See AI-Powered Learning in Action
                    </h2>
                    <p className="text-lg text-muted-foreground mb-8">
                        Schedule a demo to experience personalization, hands-on verification,
                        and the AI tutor firsthand.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/contact">
                            <Button size="lg" className="gap-2">
                                Schedule a Demo
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </Link>
                        <Link href="/training/module-1">
                            <Button size="lg" variant="outline" className="gap-2">
                                Try Sample Lesson
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
