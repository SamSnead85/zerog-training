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
    Briefcase,
    Shield,
    CheckCircle,
} from "lucide-react";

export const metadata: Metadata = {
    title: "Certifications | ScaledNative - NATIVE Certification Program",
    description: "Earn NATIVE certifications that verify real AI capability through hands-on labs. Foundation, Professional, Advanced, and Expert levels available.",
};

const certifications = [
    {
        level: 1,
        name: "NATIVE Foundation Certified",
        badge: "NFC",
        duration: "15-20 hours",
        prerequisites: "None",
        description: "Universal AI literacy for every employee. Understand AI, use it responsibly, and apply it to daily work.",
        includes: [
            "Navigate track completion",
            "4 hands-on verification labs",
            "Final assessment",
        ],
        outcomes: [
            "Understand enterprise AI landscape",
            "Apply AI responsibly within policies",
            "Use AI tools effectively",
            "Recognize AI limitations",
        ],
        color: "from-blue-500 to-blue-600",
    },
    {
        level: 2,
        name: "NATIVE Professional Certified",
        badge: "NPC",
        duration: "40-60 hours",
        prerequisites: "Foundation Certified",
        description: "Role-specific mastery with specialized tracks. Choose Architecture, Engineering, Leadership, or Governance.",
        includes: [
            "Foundation + one specialized track",
            "8+ hands-on verification labs",
            "Capstone project",
        ],
        specializations: ["Architecture", "Engineering", "Leadership", "Governance"],
        outcomes: [
            "Deep role-specific competency",
            "Production-ready AI skills",
            "Verified through hands-on work",
            "Portfolio of demonstrated capability",
        ],
        color: "from-purple-500 to-purple-600",
    },
    {
        level: 3,
        name: "NATIVE Advanced Certified",
        badge: "NAC",
        duration: "80-100 hours",
        prerequisites: "Professional Certified",
        description: "Cross-functional expertise for those leading AI initiatives across teams and departments.",
        includes: [
            "Professional + Evolve track",
            "Advanced labs and simulations",
            "Cross-functional capstone",
        ],
        outcomes: [
            "Cross-functional AI leadership",
            "Emerging technology expertise",
            "Enterprise transformation capability",
            "Continuous improvement practices",
        ],
        color: "from-primary to-orange-600",
    },
    {
        level: 4,
        name: "NATIVE Expert Certified",
        badge: "NEC",
        duration: "120+ hours",
        prerequisites: "Advanced Certified",
        description: "Elite certification for enterprise transformation leaders. Peer-reviewed capstone and expert panel evaluation.",
        includes: [
            "Advanced + expert capstone",
            "Peer review process",
            "Expert panel evaluation",
            "Contribution requirement",
        ],
        outcomes: [
            "Enterprise transformation leadership",
            "AI strategy and governance mastery",
            "Industry recognition",
            "Expert community membership",
        ],
        color: "from-amber-500 to-amber-600",
    },
];

export default function CertificationsPage() {
    return (
        <main className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative py-24 px-6 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-purple-500/5" />

                <div className="relative mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary text-sm font-medium mb-6">
                            <Award className="h-4 w-4" />
                            Industry-Recognized Credentials
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
                            NATIVE <span className="text-primary">Certifications</span>
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                            Verify real AI capability through hands-on demonstration.
                            No shortcuts. No completion-only badges. Proven competency.
                        </p>
                    </div>

                    {/* Certification Path Visual */}
                    <div className="flex flex-wrap justify-center gap-4 mb-16">
                        {certifications.map((cert, idx) => (
                            <div key={cert.level} className="flex items-center">
                                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${cert.color} flex items-center justify-center text-white font-bold text-lg`}>
                                    L{cert.level}
                                </div>
                                {idx < certifications.length - 1 && (
                                    <ArrowRight className="h-6 w-6 text-muted-foreground mx-2 hidden md:block" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Certification Cards */}
            <section className="py-16 px-6 bg-black/20">
                <div className="mx-auto max-w-6xl">
                    <div className="space-y-8">
                        {certifications.map((cert) => (
                            <div
                                key={cert.level}
                                className="p-8 rounded-2xl bg-white/[0.02] border border-white/10"
                            >
                                <div className="grid lg:grid-cols-3 gap-8">
                                    {/* Left Column */}
                                    <div className="lg:col-span-2">
                                        <div className="flex items-start gap-4 mb-4">
                                            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${cert.color} flex items-center justify-center text-white font-bold text-xl flex-shrink-0`}>
                                                {cert.level}
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-bold mb-1">{cert.name}</h3>
                                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                    <span className="flex items-center gap-1">
                                                        <Clock className="h-4 w-4" />
                                                        {cert.duration}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Briefcase className="h-4 w-4" />
                                                        {cert.prerequisites}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-muted-foreground mb-4">{cert.description}</p>

                                        {cert.specializations && (
                                            <div className="mb-4">
                                                <span className="text-sm font-semibold text-muted-foreground">Specializations: </span>
                                                {cert.specializations.map((spec, idx) => (
                                                    <span key={idx} className="inline-block px-3 py-1 rounded-full bg-white/5 text-xs border border-white/10 mr-2 mb-2">
                                                        {spec}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        <div className="mb-4">
                                            <span className="text-sm font-semibold text-muted-foreground block mb-2">Includes:</span>
                                            <ul className="space-y-1">
                                                {cert.includes.map((item, idx) => (
                                                    <li key={idx} className="flex items-center gap-2 text-sm">
                                                        <CheckCircle className="h-4 w-4 text-primary" />
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Right Column: Outcomes */}
                                    <div>
                                        <h4 className="text-sm font-semibold text-muted-foreground mb-3">YOU WILL DEMONSTRATE</h4>
                                        <ul className="space-y-2 mb-6">
                                            {cert.outcomes.map((outcome, idx) => (
                                                <li key={idx} className="flex items-start gap-2 text-sm">
                                                    <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                                    {outcome}
                                                </li>
                                            ))}
                                        </ul>
                                        <Button className="w-full gap-2">
                                            Start This Certification
                                            <ArrowRight className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why NATIVE Certification */}
            <section className="py-24 px-6">
                <div className="mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Why NATIVE Certification?</h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "For Individuals",
                                items: [
                                    "Career advancement with recognized credentials",
                                    "Verified skills that employers trust",
                                    "Global practitioner community",
                                    "Continuous growth with renewal",
                                ],
                            },
                            {
                                title: "For Organizations",
                                items: [
                                    "Standardized capability across teams",
                                    "Reduced risk with certified practitioners",
                                    "Faster AI adoption with common language",
                                    "Measurable progress through certification rates",
                                ],
                            },
                            {
                                title: "For the Industry",
                                items: [
                                    "Shared language and standards",
                                    "Best practices captured in framework",
                                    "Benchmarking across organizations",
                                    "Talent mobility and recognition",
                                ],
                            },
                        ].map((col, idx) => (
                            <div key={idx} className="p-6 rounded-xl bg-white/[0.02] border border-white/10">
                                <h3 className="text-xl font-semibold mb-4 text-primary">{col.title}</h3>
                                <ul className="space-y-3">
                                    {col.items.map((item, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm">
                                            <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Certification Renewal */}
            <section className="py-16 px-6 bg-black/20">
                <div className="mx-auto max-w-4xl text-center">
                    <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h2 className="text-2xl font-bold mb-4">Certification Renewal</h2>
                    <p className="text-muted-foreground mb-6">
                        All NATIVE certifications require renewal every 2 years to ensure practitioners stay current.
                        AI moves fast. Your certification should too.
                    </p>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 px-6">
                <div className="mx-auto max-w-4xl text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Start Your Certification Journey
                    </h2>
                    <p className="text-lg text-muted-foreground mb-8">
                        Begin with Foundation or talk to our team about enterprise certification programs.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/training/module-1">
                            <Button size="lg" className="gap-2">
                                Try Sample Lesson Free
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </Link>
                        <Link href="/contact">
                            <Button size="lg" variant="outline">
                                Enterprise Certification Program
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
