"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button, Input, Card } from "@/components/ui";
import { Rocket, ArrowLeft, Check } from "lucide-react";
import { Suspense } from "react";

function SignupForm() {
    const searchParams = useSearchParams();
    const plan = searchParams.get("plan") || "professional";

    const planDetails: Record<string, { name: string; price: string }> = {
        starter: { name: "Starter", price: "$29/user/month" },
        professional: { name: "Professional", price: "$49/user/month" },
        enterprise: { name: "Enterprise", price: "Custom pricing" },
    };

    const selectedPlan = planDetails[plan] || planDetails.professional;

    return (
        <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-6">
            {/* Background effects */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute top-20 left-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
                <div className="absolute bottom-20 right-1/4 h-96 w-96 rounded-full bg-secondary/10 blur-3xl" />
            </div>

            <div className="w-full max-w-md">
                {/* Back link */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to home
                </Link>

                {/* Logo */}
                <div className="flex items-center gap-2 mb-8">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary">
                        <Rocket className="h-6 w-6 text-background" />
                    </div>
                    <span className="text-2xl font-bold">
                        Zero<span className="text-gradient">G</span>
                    </span>
                </div>

                <Card variant="glass" padding="lg" className="backdrop-blur-xl">
                    <h1 className="text-2xl font-bold mb-2">Start your free trial</h1>
                    <p className="text-muted-foreground mb-6">
                        Get started with the {selectedPlan.name} plan. No credit card required.
                    </p>

                    <form className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <Input label="First name" placeholder="John" />
                            <Input label="Last name" placeholder="Doe" />
                        </div>
                        <Input
                            label="Work email"
                            type="email"
                            placeholder="john@company.com"
                        />
                        <Input
                            label="Company name"
                            placeholder="Acme Inc."
                        />
                        <Input
                            label="Password"
                            type="password"
                            placeholder="Create a password"
                        />

                        <Button className="w-full" size="lg">
                            Start 14-day free trial
                        </Button>
                    </form>

                    <div className="mt-6 space-y-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Check className="h-4 w-4 text-success" />
                            No credit card required
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Check className="h-4 w-4 text-success" />
                            14 days free access to all features
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Check className="h-4 w-4 text-success" />
                            Cancel anytime
                        </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-border text-center text-sm text-muted-foreground">
                        Already have an account?{" "}
                        <Link href="/login" className="text-primary hover:underline">
                            Log in
                        </Link>
                    </div>
                </Card>

                <p className="mt-6 text-center text-xs text-muted-foreground">
                    By signing up, you agree to our{" "}
                    <Link href="/terms" className="underline hover:text-foreground">
                        Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="underline hover:text-foreground">
                        Privacy Policy
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default function SignupPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
                <div className="animate-pulse text-muted-foreground">Loading...</div>
            </div>
        }>
            <SignupForm />
        </Suspense>
    );
}
