import Link from "next/link";
import { Metadata } from "next";
import { Button } from "@/components/ui";
import {
    ArrowRight,
    Award,
    BookOpen,
    Check,
    Clock,
    Users,
    Zap,
    Code,
    Brain,
    Shield,
    BarChart,
} from "lucide-react";

export const metadata: Metadata = {
    title: "Learning Tracks | ScaledNative - AI-Native Training",
    description: "Explore our 5 comprehensive learning tracks: AI-Native SDLC, Agentic AI Development, Platform Engineering, Security & Compliance, and Data Analytics.",
};

const tracks = [
    {
        id: "ai-native-sdlc",
        title: "AI-Native SDLC",
        icon: Code,
        hours: 52,
        modules: 8,
        purpose: "Transform the entire software development lifecycle with AI. From requirements to deployment, embed AI into every phase.",
        audience: ["Software Engineers", "Tech Leads", "Engineering Managers", "DevOps Engineers"],
        outcomes: [
            "Apply AI to every SDLC phase",
            "Increase development velocity by 40-60%",
            "Improve code quality with AI review",
            "Build AI-assisted team workflows",
        ],
        color: "from-blue-500/20 to-blue-600/10",
        href: "/tracks/ai-native-sdlc",
    },
    {
        id: "agentic-ai",
        title: "Agentic AI Development",
        icon: Brain,
        hours: 66,
        modules: 9,
        purpose: "Master autonomous AI agents. Build systems that plan, reason, use tools, and accomplish complex goals.",
        audience: ["Senior Engineers", "AI/ML Engineers", "Solutions Architects", "Technical Leads"],
        outcomes: [
            "Design multi-agent architectures",
            "Implement tool use and function calling",
            "Build production-ready agents",
            "Ensure agent safety and guardrails",
        ],
        color: "from-purple-500/20 to-purple-600/10",
        href: "/tracks/agentic-ai",
    },
    {
        id: "platform-engineering",
        title: "Platform Engineering for AI",
        icon: Zap,
        hours: 56,
        modules: 9,
        purpose: "Build infrastructure that enables AI at enterprise scale. LLMOps, cost optimization, and self-service platforms.",
        audience: ["Platform Engineers", "DevOps Engineers", "SRE", "Cloud Architects"],
        outcomes: [
            "Design AI platforms",
            "Implement LLMOps practices",
            "Optimize AI costs",
            "Build self-service capabilities",
        ],
        color: "from-emerald-500/20 to-emerald-600/10",
        href: "/tracks/platform-engineering",
    },
    {
        id: "security-compliance",
        title: "Security, Healthcare & Compliance",
        icon: Shield,
        hours: 62,
        modules: 9,
        purpose: "Ensure AI systems are secure, compliant, and governed. Deep HIPAA, SOX, and regulatory coverage.",
        audience: ["Security Engineers", "Compliance Officers", "Healthcare IT", "Risk Managers"],
        outcomes: [
            "Implement AI security controls",
            "Ensure HIPAA/SOX compliance",
            "Build governance frameworks",
            "Conduct AI audits",
        ],
        color: "from-red-500/20 to-red-600/10",
        href: "/tracks/security-compliance",
    },
    {
        id: "data-analytics",
        title: "AI for Data & Analytics",
        icon: BarChart,
        hours: 56,
        modules: 9,
        purpose: "Transform data workflows with AI. From SQL to visualization, natural language interfaces for data.",
        audience: ["Data Analysts", "BI Analysts", "Data Engineers", "Analytics Engineers"],
        outcomes: [
            "AI-assisted SQL and querying",
            "Automated insight discovery",
            "Natural language data interfaces",
            "AI-enhanced visualization",
        ],
        color: "from-primary/20 to-orange-600/10",
        href: "/tracks/data-analytics",
    },
];

export default function TracksPage() {
    return (
        <main className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative py-24 px-6 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-purple-500/5" />

                <div className="relative mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary text-sm font-medium mb-6">
                            <BookOpen className="h-4 w-4" />
                            Comprehensive Curriculum
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
                            Learning <span className="text-primary">Tracks</span>
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                            Five specialized tracks totaling 290+ hours of hands-on, verified learning.
                            Each track includes modules, labs, and capstone projects.
                        </p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                        {[
                            { value: "290+", label: "Hours of Content" },
                            { value: "44", label: "Modules" },
                            { value: "50+", label: "Hands-On Labs" },
                            { value: "5", label: "Capstone Projects" },
                        ].map((stat, idx) => (
                            <div key={idx} className="text-center p-6 rounded-xl bg-white/[0.02] border border-white/10">
                                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">{stat.value}</div>
                                <div className="text-sm text-muted-foreground">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tracks Grid */}
            <section className="py-16 px-6 bg-black/20">
                <div className="mx-auto max-w-6xl">
                    <div className="space-y-8">
                        {tracks.map((track) => (
                            <div
                                key={track.id}
                                className="p-8 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-primary/30 transition-all"
                            >
                                <div className="grid lg:grid-cols-3 gap-8">
                                    {/* Left Column: Overview */}
                                    <div className="lg:col-span-2">
                                        <div className="flex items-start gap-4 mb-4">
                                            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${track.color} flex items-center justify-center flex-shrink-0`}>
                                                <track.icon className="h-7 w-7 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-bold mb-1">{track.title}</h3>
                                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                    <span className="flex items-center gap-1">
                                                        <Clock className="h-4 w-4" />
                                                        {track.hours} hours
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <BookOpen className="h-4 w-4" />
                                                        {track.modules} modules
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-muted-foreground mb-4">{track.purpose}</p>
                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {track.audience.map((role, idx) => (
                                                <span key={idx} className="px-3 py-1 rounded-full bg-white/5 text-xs border border-white/10">
                                                    {role}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Right Column: Outcomes */}
                                    <div>
                                        <h4 className="text-sm font-semibold text-muted-foreground mb-3">KEY OUTCOMES</h4>
                                        <ul className="space-y-2 mb-6">
                                            {track.outcomes.map((outcome, idx) => (
                                                <li key={idx} className="flex items-start gap-2 text-sm">
                                                    <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                                    {outcome}
                                                </li>
                                            ))}
                                        </ul>
                                        <Link href={track.href}>
                                            <Button className="w-full gap-2">
                                                View Track Details
                                                <ArrowRight className="h-4 w-4" />
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Role-Based Paths */}
            <section className="py-24 px-6">
                <div className="mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Role-Based Learning Paths</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Not sure which track? We have pre-built paths for common roles.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { role: "Software Engineer", tracks: ["AI-Native SDLC", "Agentic AI"], href: "/roles/developer" },
                            { role: "Data Analyst", tracks: ["Data Analytics", "Navigate"], href: "/roles/data-analyst" },
                            { role: "Security Professional", tracks: ["Security & Compliance", "Navigate"], href: "/roles/security" },
                            { role: "Platform Engineer", tracks: ["Platform Engineering", "Agentic AI"], href: "/roles/platform" },
                            { role: "Product Manager", tracks: ["Navigate", "Transform"], href: "/roles/product" },
                            { role: "Executive Leader", tracks: ["Navigate", "Transform"], href: "/roles/executive" },
                        ].map((path, idx) => (
                            <Link key={idx} href={path.href} className="block">
                                <div className="p-6 rounded-xl bg-white/[0.02] border border-white/10 hover:border-primary/30 transition-all">
                                    <div className="flex items-center gap-3 mb-3">
                                        <Users className="h-5 w-5 text-primary" />
                                        <h3 className="font-semibold">{path.role}</h3>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        Recommended: {path.tracks.join(" + ")}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 px-6 bg-black/20">
                <div className="mx-auto max-w-4xl text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Start Learning Today
                    </h2>
                    <p className="text-lg text-muted-foreground mb-8">
                        Try a sample lesson free, or talk to our team about enterprise access.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/ai-native/sample-lesson">
                            <Button size="lg" className="gap-2">
                                Try Sample Lesson Free
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </Link>
                        <Link href="/contact">
                            <Button size="lg" variant="outline">
                                Contact Enterprise Sales
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
