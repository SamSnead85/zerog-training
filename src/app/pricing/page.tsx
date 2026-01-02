import Link from "next/link";
import { Card, Badge, Button } from "@/components/ui";
import {
    Check,
    Sparkles,
    Users,
    Building2,
    GraduationCap,
    Video,
    MessageSquare,
    Headphones,
    Star,
    ArrowRight,
    BookOpen,
    Award,
    Zap,
    Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const metadata = {
    title: "Pricing | ScaledNative AI-Native Training",
    description: "Premium AI-Native training with tiered access. From foundations to expert-level with live trainer sessions.",
};

const individualPlans = [
    {
        id: "demo",
        name: "Demo",
        price: "Free",
        period: "",
        description: "Experience our quality before you commit",
        highlight: false,
        features: [
            "30-minute AI-Native Showcase module",
            "3 interactive prompt lab executions",
            "Sample quiz (5 questions)",
            "Preview of all modules",
        ],
        cta: "Try Demo",
        href: "/preview",
    },
    {
        id: "essentials",
        name: "Essentials",
        price: "$299",
        period: "lifetime access",
        description: "Foundation knowledge for AI-Native development",
        highlight: false,
        features: [
            "Modules 1-4 (Foundations)",
            "20+ hours of content",
            "Interactive prompt labs",
            "Foundation certificate",
            "Community access",
            "Lifetime access to purchased content",
        ],
        cta: "Get Started",
        href: "/learn/checkout?plan=essentials",
    },
    {
        id: "professional",
        name: "Professional",
        price: "$799",
        period: "lifetime access",
        description: "Complete curriculum with full certification",
        highlight: true,
        badge: "Most Popular",
        features: [
            "All 11 modules (100+ hours)",
            "15 interactive AI labs",
            "NATIVE Practitioner Certification",
            "AI-Native Product Management track",
            "Code generation mastery",
            "Context engineering deep dive",
            "Priority community support",
            "Lifetime access + updates",
        ],
        cta: "Enroll Now",
        href: "/learn/checkout?plan=professional",
    },
    {
        id: "expert",
        name: "Expert + Live",
        price: "$1,499",
        period: "lifetime access",
        description: "Premium access with personal trainer guidance",
        highlight: false,
        badge: "Best Value",
        features: [
            "Everything in Professional",
            "2-hour 1:1 live session with trainer",
            "Review of your actual projects",
            "Custom implementation guidance",
            "30-day priority support",
            "Career guidance call",
            "LinkedIn recommendation",
        ],
        cta: "Go Expert",
        href: "/learn/checkout?plan=expert",
    },
];

const enterprisePlans = [
    {
        id: "team",
        name: "Team",
        seats: "5-10 seats",
        price: "$599",
        period: "per seat",
        features: [
            "All Professional features",
            "Team admin dashboard",
            "Progress tracking",
            "Group completion certificates",
            "Slack/Teams integration",
        ],
    },
    {
        id: "department",
        name: "Department",
        seats: "11-50 seats",
        price: "$499",
        period: "per seat",
        features: [
            "All Team features",
            "LMS integration (SCORM)",
            "Custom branding",
            "Dedicated success manager",
            "Quarterly business reviews",
        ],
    },
    {
        id: "enterprise",
        name: "Enterprise",
        seats: "50+ seats",
        price: "Custom",
        period: "",
        features: [
            "All Department features",
            "On-site training workshops",
            "Live trainer sessions",
            "Custom content development",
            "Executive briefings",
            "SLA & priority support",
        ],
    },
];

export default function PricingPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            {/* Navigation Header */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl border-b border-white/5">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
                    {/* Hide brand on mobile since hero shows it immediately below */}
                    <Link href="/" className="hidden md:flex items-center gap-3 group">
                        <span className="font-playfair text-2xl font-medium tracking-tight italic">
                            ScaledNative<sup className="text-[10px] align-super ml-0.5">™</sup>
                        </span>
                    </Link>
                    {/* Mobile: just show hamburger space */}
                    <div className="md:hidden w-8" />

                    <div className="hidden md:flex items-center gap-10">
                        <Link href="/native" className="text-sm text-white/40 hover:text-white transition-colors">
                            Framework
                        </Link>
                        <Link href="/pricing" className="text-sm text-white font-medium">
                            Pricing
                        </Link>
                        <Link href="/enterprise" className="text-sm text-white/40 hover:text-white transition-colors">
                            Enterprise
                        </Link>
                        <Link href="/preview" className="text-sm text-white/40 hover:text-white transition-colors">
                            Try Free
                        </Link>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link href="/login" className="text-sm text-white/40 hover:text-white transition-colors">
                            Sign in
                        </Link>
                        <Link href="/learn/checkout?plan=professional">
                            <button className="px-5 py-2.5 rounded-full bg-white text-black font-medium text-sm hover:bg-white/90 transition-all">
                                Get Started
                            </button>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero */}
            <section className="pt-32 pb-16 px-6">
                <div className="mx-auto max-w-6xl text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        Invest in{" "}
                        <span className="text-white/80">
                            AI-Native Skills
                        </span>
                    </h1>
                    <p className="text-xl text-white/60 max-w-2xl mx-auto">
                        The most comprehensive AI-Native training program.
                        No subscriptions, no hidden fees — pay once, learn forever.
                    </p>
                </div>
            </section>

            {/* Individual Plans */}
            <section className="pb-16 px-6">
                <div className="mx-auto max-w-6xl">
                    <h2 className="text-2xl font-bold text-center mb-8">Individual Plans</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {individualPlans.map((plan) => (
                            <Card
                                key={plan.id}
                                className={cn(
                                    "p-6 relative overflow-hidden",
                                    plan.highlight
                                        ? "border-white/20 bg-white/[0.05]"
                                        : "bg-white/[0.02]"
                                )}
                            >
                                {plan.badge && (
                                    <Badge className="absolute top-4 right-4 bg-white/10 text-white border-white/20">
                                        {plan.badge}
                                    </Badge>
                                )}
                                <h3 className="text-lg font-bold">{plan.name}</h3>
                                <div className="mt-4 mb-2">
                                    <span className="text-3xl font-bold">{plan.price}</span>
                                    {plan.period && (
                                        <span className="text-white/50 ml-2">{plan.period}</span>
                                    )}
                                </div>
                                <p className="text-sm text-white/50 mb-6">{plan.description}</p>

                                <ul className="space-y-3 mb-6">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm">
                                            <Check className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                                            <span className="text-white/80">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Link href={plan.href}>
                                    <Button
                                        className={cn(
                                            "w-full",
                                            plan.highlight
                                                ? "bg-white text-black hover:bg-white/90"
                                                : plan.id === "demo"
                                                    ? "bg-white/10 hover:bg-white/20"
                                                    : ""
                                        )}
                                    >
                                        {plan.cta}
                                    </Button>
                                </Link>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Enterprise Plans */}
            <section className="py-16 px-6 bg-white/[0.02]">
                <div className="mx-auto max-w-6xl">
                    <div className="text-center mb-12">
                        <Badge className="mb-4 bg-blue-500/20 text-blue-300 border-blue-500/30">
                            <Building2 className="h-3 w-3 mr-1" />
                            For Organizations
                        </Badge>
                        <h2 className="text-3xl font-bold mb-4">Enterprise Training</h2>
                        <p className="text-white/60 max-w-xl mx-auto">
                            Transform your entire organization with group training,
                            live sessions, and on-site workshops.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 mb-12">
                        {enterprisePlans.map((plan) => (
                            <Card key={plan.id} className="p-6 bg-white/[0.02]">
                                <div className="flex items-center gap-2 mb-2">
                                    <Users className="h-5 w-5 text-blue-400" />
                                    <span className="text-sm text-white/50">{plan.seats}</span>
                                </div>
                                <h3 className="text-xl font-bold">{plan.name}</h3>
                                <div className="mt-3 mb-4">
                                    <span className="text-2xl font-bold">{plan.price}</span>
                                    {plan.period && (
                                        <span className="text-white/50 ml-2">{plan.period}</span>
                                    )}
                                </div>
                                <ul className="space-y-2">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm">
                                            <Check className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                                            <span className="text-white/70">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </Card>
                        ))}
                    </div>

                    <div className="text-center">
                        <Link href="/enterprise">
                            <Button size="lg" className="gap-2">
                                <Headphones className="h-5 w-5" />
                                Talk to Sales
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Live Training Add-On */}
            <section className="py-16 px-6">
                <div className="mx-auto max-w-4xl">
                    <Card className="p-8 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border-emerald-500/20">
                        <div className="grid md:grid-cols-2 gap-8 items-center">
                            <div>
                                <Badge className="mb-4 bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
                                    <Video className="h-3 w-3 mr-1" />
                                    Live Training
                                </Badge>
                                <h2 className="text-2xl font-bold mb-4">On-Site & Live Sessions</h2>
                                <p className="text-white/60 mb-6">
                                    Bring our expert trainers to your organization for hands-on workshops,
                                    or book 1:1 sessions for personalized guidance.
                                </p>
                                <ul className="space-y-2 text-sm">
                                    <li className="flex items-center gap-2">
                                        <Check className="h-4 w-4 text-emerald-400" />
                                        Full-day on-site workshops from $5,000
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="h-4 w-4 text-emerald-400" />
                                        Customized to your tech stack
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="h-4 w-4 text-emerald-400" />
                                        Executive briefings included
                                    </li>
                                </ul>
                            </div>
                            <div className="text-center">
                                <div className="inline-flex items-center gap-4 p-4 rounded-xl bg-black/30">
                                    <div className="text-left">
                                        <p className="text-2xl font-bold">1:1 Sessions</p>
                                        <p className="text-sm text-white/50">Included in Expert tier</p>
                                    </div>
                                    <MessageSquare className="h-12 w-12 text-emerald-400" />
                                </div>
                                <Link href="/contact" className="block mt-4">
                                    <Button variant="outline" className="gap-2">
                                        Request On-Site Training
                                        <ArrowRight className="h-4 w-4" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </Card>
                </div>
            </section>

            {/* Trust Signals */}
            <section className="py-16 px-6 border-t border-white/5">
                <div className="mx-auto max-w-4xl">
                    <div className="grid md:grid-cols-4 gap-8 text-center">
                        <div>
                            <GraduationCap className="h-8 w-8 text-purple-400 mx-auto mb-3" />
                            <p className="font-bold">4,200+</p>
                            <p className="text-sm text-white/50">Certified Professionals</p>
                        </div>
                        <div>
                            <Star className="h-8 w-8 text-amber-400 mx-auto mb-3" />
                            <p className="font-bold">4.9/5</p>
                            <p className="text-sm text-white/50">Average Rating</p>
                        </div>
                        <div>
                            <Shield className="h-8 w-8 text-emerald-400 mx-auto mb-3" />
                            <p className="font-bold">30-Day</p>
                            <p className="text-sm text-white/50">Money-Back Guarantee</p>
                        </div>
                        <div>
                            <Zap className="h-8 w-8 text-blue-400 mx-auto mb-3" />
                            <p className="font-bold">Instant</p>
                            <p className="text-sm text-white/50">Access After Purchase</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-16 px-6 bg-white/[0.02]">
                <div className="mx-auto max-w-5xl">
                    <h2 className="text-2xl font-bold text-center mb-10">What Professionals Say</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <Card className="p-6 bg-white/[0.02]">
                            <div className="flex gap-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                                ))}
                            </div>
                            <p className="text-white/70 mb-4 text-sm leading-relaxed">
                                "The interactive labs are game-changing. I went from dabbling with ChatGPT to building actual AI agents in my workflow. Worth every penny."
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 font-bold">
                                    JL
                                </div>
                                <div>
                                    <p className="font-medium text-sm">James Liu</p>
                                    <p className="text-xs text-white/50">Sr. Software Engineer, Stripe</p>
                                </div>
                            </div>
                        </Card>
                        <Card className="p-6 bg-white/[0.02]">
                            <div className="flex gap-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                                ))}
                            </div>
                            <p className="text-white/70 mb-4 text-sm leading-relaxed">
                                "Finally, AI training that's actually practical. The context engineering module alone saved me hours of trial and error. Highly recommend for any product leader."
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 font-bold">
                                    SP
                                </div>
                                <div>
                                    <p className="font-medium text-sm">Sarah Patterson</p>
                                    <p className="text-xs text-white/50">VP Product, Notion</p>
                                </div>
                            </div>
                        </Card>
                        <Card className="p-6 bg-white/[0.02]">
                            <div className="flex gap-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                                ))}
                            </div>
                            <p className="text-white/70 mb-4 text-sm leading-relaxed">
                                "We enrolled our entire engineering team. The certification path and progress tracking made it easy to manage. Seeing real productivity gains within weeks."
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 font-bold">
                                    MK
                                </div>
                                <div>
                                    <p className="font-medium text-sm">Michael Kim</p>
                                    <p className="text-xs text-white/50">CTO, Scale Ventures</p>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </section>

            {/* FAQ Preview */}
            <section className="py-16 px-6 bg-white/[0.02]">
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="text-2xl font-bold mb-8">Questions?</h2>
                    <div className="grid md:grid-cols-2 gap-6 text-left">
                        <div>
                            <h3 className="font-medium mb-2">What's the difference between tiers?</h3>
                            <p className="text-sm text-white/50">
                                Essentials covers foundations (Modules 1-4). Professional unlocks all 11 modules
                                plus full certification. Expert adds live 1:1 trainer time.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-medium mb-2">Is there a subscription?</h3>
                            <p className="text-sm text-white/50">
                                No! All plans are one-time payments with lifetime access to purchased content.
                                We believe in straightforward pricing.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-medium mb-2">Can I upgrade later?</h3>
                            <p className="text-sm text-white/50">
                                Yes! You can upgrade from Essentials to Professional anytime.
                                You'll only pay the difference.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-medium mb-2">Do you offer refunds?</h3>
                            <p className="text-sm text-white/50">
                                30-day money-back guarantee, no questions asked.
                                If it's not for you, we'll refund in full.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-16 px-6">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold mb-4">Ready to Become AI-Native?</h2>
                    <p className="text-white/60 mb-8">
                        Start with the free demo to experience our quality,
                        or jump straight into the full curriculum.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/preview">
                            <Button size="lg" variant="outline" className="gap-2 min-w-[180px]">
                                <BookOpen className="h-5 w-5" />
                                Try Free Demo
                            </Button>
                        </Link>
                        <Link href="/learn/checkout?plan=professional">
                            <Button size="lg" className="gap-2 bg-white text-black hover:bg-white/90 min-w-[180px]">
                                <Award className="h-5 w-5" />
                                Get Certified
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
