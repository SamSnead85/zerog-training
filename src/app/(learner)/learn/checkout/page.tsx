"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
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
} from "lucide-react";
import { Suspense } from "react";

// Track pricing data
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
    "prompt-specialist": {
        id: "prompt-specialist",
        title: "Prompt Engineering Specialist",
        description: "Deep dive into prompt engineering for LLMs.",
        price: 249,
        originalPrice: 297,
        courses: 3,
        duration: "15 hours",
        gradient: "from-amber-500/20 to-orange-500/20",
    },
    "ai-leader": {
        id: "ai-leader",
        title: "AI Transformation Leader",
        description: "Strategic leadership training for executives driving AI transformation.",
        price: 349,
        originalPrice: 396,
        courses: 4,
        duration: "14 hours",
        gradient: "from-emerald-500/20 to-teal-500/20",
    },
};

function CheckoutContent() {
    const searchParams = useSearchParams();
    const trackId = searchParams.get("track") || "native-practitioner";
    const track = trackData[trackId] || trackData["native-practitioner"];

    const handleEnroll = async () => {
        // In production, this would integrate with Stripe
        // For now, redirect to a contact/enterprise page
        alert("Stripe checkout integration coming soon! Contact us for enrollment.");
    };

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Breadcrumb */}
            <Link
                href={`/learn/tracks/${track.id}`}
                className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6"
            >
                <ArrowLeft className="h-4 w-4" />
                Back to Track Details
            </Link>

            <div className="grid lg:grid-cols-5 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-3 space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Complete Your Enrollment</h1>
                        <p className="text-muted-foreground">
                            You're enrolling in the <span className="font-medium text-foreground">{track.title}</span> certification program.
                        </p>
                    </div>

                    {/* Order Summary Card */}
                    <Card className={`p-6 bg-gradient-to-r ${track.gradient}`}>
                        <div className="flex items-start gap-4">
                            <div className="h-12 w-12 rounded-xl bg-background/80 flex items-center justify-center">
                                <Award className="h-6 w-6 text-primary" />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-lg font-bold">{track.title}</h2>
                                <p className="text-sm text-muted-foreground mt-1">{track.description}</p>
                                <div className="flex items-center gap-4 mt-3 text-sm">
                                    <span className="flex items-center gap-1">
                                        <BookOpen className="h-4 w-4" />
                                        {track.courses} courses
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Clock className="h-4 w-4" />
                                        {track.duration}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* What's Included */}
                    <Card className="p-6">
                        <h3 className="font-bold mb-4">What's Included</h3>
                        <div className="grid sm:grid-cols-2 gap-3">
                            {[
                                "Full certification curriculum",
                                "Hands-on labs & exercises",
                                "Certification exam (3 attempts)",
                                "Official digital certificate",
                                "LinkedIn badge",
                                "Lifetime access to content",
                                "Community access",
                                "Certificate verification",
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-2 text-sm">
                                    <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                                    {item}
                                </div>
                            ))}
                        </div>
                    </Card>

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
                                <span>{track.title}</span>
                                <span className="line-through text-muted-foreground">${track.originalPrice}</span>
                            </div>
                            <div className="flex justify-between text-sm text-emerald-500">
                                <span>Limited-time discount</span>
                                <span>-${track.originalPrice - track.price}</span>
                            </div>
                            <div className="border-t pt-3 flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span>${track.price}</span>
                            </div>
                        </div>

                        <Button
                            className="w-full gap-2 text-lg py-6 mb-4"
                            onClick={handleEnroll}
                        >
                            <Sparkles className="h-5 w-5" />
                            Complete Purchase
                        </Button>

                        <p className="text-xs text-center text-muted-foreground">
                            By purchasing, you agree to our Terms of Service
                        </p>

                        {/* Discount Badge */}
                        <div className="mt-6 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                            <div className="flex items-center gap-2">
                                <Badge className="bg-amber-500/20 text-amber-600 border-amber-500/30">
                                    Save ${track.originalPrice - track.price}
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                    Limited-time offer
                                </span>
                            </div>
                        </div>

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
