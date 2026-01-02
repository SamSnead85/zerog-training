"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { Card, Badge, Button } from "@/components/ui";
import {
    ArrowLeft,
    CheckCircle2,
    Shield,
    Clock,
    CreditCard,
    Sparkles,
    Award,
    BookOpen,
    Timer,
    Video,
    MessageSquare,
    Loader2,
} from "lucide-react";
import { Suspense } from "react";

// Individual plan pricing
const planData: Record<string, {
    id: string;
    title: string;
    description: string;
    price: number;
    originalPrice: number;
    modules: string;
    duration: string;
    gradient: string;
    features: string[];
    badge?: string;
}> = {
    essentials: {
        id: "essentials",
        title: "AI-Native Essentials",
        description: "Foundation knowledge for AI-Native development.",
        price: 299,
        originalPrice: 399,
        modules: "Modules 1-4",
        duration: "20+ hours",
        gradient: "from-blue-500/20 to-cyan-500/20",
        features: [
            "Modules 1-4 (Foundations)",
            "20+ hours of content",
            "Interactive prompt labs",
            "Foundation certificate",
            "Community access",
            "Lifetime access",
        ],
    },
    professional: {
        id: "professional",
        title: "AI-Native Professional",
        description: "Complete curriculum with full NATIVE certification.",
        price: 799,
        originalPrice: 999,
        modules: "All 11 modules",
        duration: "100+ hours",
        gradient: "from-purple-500/20 to-pink-500/20",
        badge: "Most Popular",
        features: [
            "All 11 modules (100+ hours)",
            "15 interactive AI labs",
            "NATIVE Practitioner Certification",
            "AI-Native Product Management",
            "Code generation mastery",
            "Context engineering deep dive",
            "Priority community support",
            "Lifetime access + updates",
        ],
    },
    expert: {
        id: "expert",
        title: "Expert + Live Training",
        description: "Premium access with personal trainer guidance.",
        price: 1499,
        originalPrice: 1999,
        modules: "All 11 modules + Live",
        duration: "100+ hours + 2hr session",
        gradient: "from-emerald-500/20 to-teal-500/20",
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
    },
};

// Legacy track pricing (for backwards compatibility)
const trackData: Record<string, {
    id: string;
    title: string;
    description: string;
    price: number;
    originalPrice: number;
    courses: number;
    duration: string;
    gradient: string;
}> = {
    "native-practitioner": {
        id: "native-practitioner",
        title: "NATIVE Certified Practitioner",
        description: "Master the NATIVE framework for AI-native software delivery.",
        price: 399,
        originalPrice: 495,
        courses: 5,
        duration: "23 hours",
        gradient: "from-cyan-500/20 to-blue-500/20",
    },
    "ai-engineer": {
        id: "ai-engineer",
        title: "AI Engineering Professional",
        description: "Comprehensive training in designing, building, and deploying AI systems at scale.",
        price: 499,
        originalPrice: 594,
        courses: 6,
        duration: "33 hours",
        gradient: "from-purple-500/20 to-pink-500/20",
    },
};

function CheckoutContent() {
    const searchParams = useSearchParams();
    const planId = searchParams.get("plan");
    const trackId = searchParams.get("track");

    // Check if using new plan system or legacy track system
    const plan = planId ? planData[planId] : null;
    const track = trackId ? trackData[trackId] : null;

    const item = plan || track || planData["professional"];
    const isPlan = !!plan;
    const [isLoading, setIsLoading] = useState(false);

    const handleEnroll = async () => {
        setIsLoading(true);
        try {
            // Call our Stripe checkout API
            const response = await fetch("/api/stripe/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    planId: item.id,
                    quantity: 1,
                }),
            });

            const data = await response.json();

            if (data.error) {
                alert(`Error: ${data.error}`);
                setIsLoading(false);
                return;
            }

            if (data.mode === "demo") {
                alert("Stripe is in demo mode. Configure STRIPE_SECRET_KEY to enable payments.");
                setIsLoading(false);
                return;
            }

            // Redirect to Stripe Checkout
            if (data.url) {
                window.location.href = data.url;
            }
        } catch (error) {
            console.error("Checkout error:", error);
            alert("An error occurred. Please try again.");
            setIsLoading(false);
        }
    };

    const features = isPlan && plan ? plan.features : [
        "Full certification curriculum",
        "Hands-on labs & exercises",
        "Certification exam (3 attempts)",
        "Official digital certificate",
        "LinkedIn badge",
        "Lifetime access to content",
        "Community access",
        "Certificate verification",
    ];

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Breadcrumb */}
            <Link
                href="/pricing"
                className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6"
            >
                <ArrowLeft className="h-4 w-4" />
                Back to Pricing
            </Link>

            <div className="grid lg:grid-cols-5 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-3 space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Complete Your Enrollment</h1>
                        <p className="text-muted-foreground">
                            You're enrolling in <span className="font-medium text-foreground">{item.title}</span>
                        </p>
                    </div>

                    {/* Order Summary Card */}
                    <Card className={`p-6 bg-gradient-to-r ${item.gradient}`}>
                        <div className="flex items-start gap-4">
                            <div className="h-12 w-12 rounded-xl bg-background/80 flex items-center justify-center">
                                {isPlan && planId === "expert" ? (
                                    <Video className="h-6 w-6 text-primary" />
                                ) : (
                                    <Award className="h-6 w-6 text-primary" />
                                )}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <h2 className="text-lg font-bold">{item.title}</h2>
                                    {"badge" in item && item.badge && (
                                        <Badge className="bg-primary text-primary-foreground text-xs">
                                            {item.badge}
                                        </Badge>
                                    )}
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                                <div className="flex items-center gap-4 mt-3 text-sm">
                                    <span className="flex items-center gap-1">
                                        <BookOpen className="h-4 w-4" />
                                        {"modules" in item ? item.modules : `${(item as NonNullable<typeof track>).courses} courses`}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Clock className="h-4 w-4" />
                                        {item.duration}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* What's Included */}
                    <Card className="p-6">
                        <h3 className="font-bold mb-4">What's Included</h3>
                        <div className="grid sm:grid-cols-2 gap-3">
                            {features.map((feature, i) => (
                                <div key={i} className="flex items-center gap-2 text-sm">
                                    <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                                    {feature}
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Expert Live Session Info */}
                    {isPlan && planId === "expert" && (
                        <Card className="p-6 border-emerald-500/20 bg-emerald-500/5">
                            <div className="flex items-start gap-4">
                                <MessageSquare className="h-8 w-8 text-emerald-500 flex-shrink-0" />
                                <div>
                                    <h3 className="font-bold mb-2">Your 1:1 Live Session</h3>
                                    <p className="text-sm text-muted-foreground">
                                        After enrollment, you'll receive a link to schedule your 2-hour session
                                        with a certified trainer. Bring your actual projects and get personalized
                                        guidance on implementing AI-native practices.
                                    </p>
                                </div>
                            </div>
                        </Card>
                    )}

                    {/* Trust Signals */}
                    <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                        <span className="flex items-center gap-2">
                            <Shield className="h-4 w-4" />
                            30-day money-back guarantee
                        </span>
                        <span className="flex items-center gap-2">
                            <Timer className="h-4 w-4" />
                            Instant access after payment
                        </span>
                        <span className="flex items-center gap-2">
                            <CreditCard className="h-4 w-4" />
                            Secure payment
                        </span>
                    </div>
                </div>

                {/* Sidebar - Payment */}
                <div className="lg:col-span-2">
                    <Card className="p-6 sticky top-24">
                        <h3 className="font-bold mb-4">Order Summary</h3>

                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between text-sm">
                                <span>{item.title}</span>
                                <span className="line-through text-muted-foreground">${item.originalPrice}</span>
                            </div>
                            <div className="flex justify-between text-sm text-emerald-500">
                                <span>Limited-time discount</span>
                                <span>-${item.originalPrice - item.price}</span>
                            </div>
                            <div className="border-t pt-3 flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span>${item.price}</span>
                            </div>
                        </div>

                        <Button
                            className="w-full gap-2 text-lg py-6 mb-4"
                            onClick={handleEnroll}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="h-5 w-5" />
                                    Complete Purchase
                                </>
                            )}
                        </Button>

                        <p className="text-xs text-center text-muted-foreward">
                            By purchasing, you agree to our Terms of Service
                        </p>

                        {/* Discount Badge */}
                        <div className="mt-6 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                            <div className="flex items-center gap-2">
                                <Badge className="bg-amber-500/20 text-amber-600 border-amber-500/30">
                                    Save ${item.originalPrice - item.price}
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                    Limited-time offer
                                </span>
                            </div>
                        </div>

                        {/* Upgrade CTA for Essentials */}
                        {isPlan && planId === "essentials" && (
                            <div className="mt-6 pt-6 border-t text-center">
                                <p className="text-sm text-muted-foreground mb-2">
                                    Want the full curriculum?
                                </p>
                                <Link href="/learn/checkout?plan=professional">
                                    <Button variant="outline" size="sm" className="w-full">
                                        Upgrade to Professional (+$500)
                                    </Button>
                                </Link>
                            </div>
                        )}

                        {/* Enterprise Option */}
                        <div className="mt-6 pt-6 border-t text-center">
                            <p className="text-sm text-muted-foreground mb-2">
                                Enrolling a team?
                            </p>
                            <Link href="/enterprise">
                                <Button variant="outline" size="sm" className="w-full">
                                    Get Enterprise Pricing
                                </Button>
                            </Link>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default function CheckoutPage() {
    return (
        <Suspense fallback={
            <div className="max-w-5xl mx-auto px-4 py-16 text-center">
                <div className="animate-pulse">
                    <div className="h-8 bg-muted rounded w-64 mx-auto mb-4"></div>
                    <div className="h-4 bg-muted rounded w-96 mx-auto"></div>
                </div>
            </div>
        }>
            <CheckoutContent />
        </Suspense>
    );
}
