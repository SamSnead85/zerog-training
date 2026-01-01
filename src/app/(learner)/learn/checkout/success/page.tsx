"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Card, Button } from "@/components/ui";
import { CheckCircle2, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";

function CheckoutSuccessContent() {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get("session_id");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Give Stripe webhook time to process
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
                    <p className="text-lg">Processing your purchase...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <Card className="max-w-md w-full p-8 text-center">
                <div className="h-16 w-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="h-8 w-8 text-emerald-500" />
                </div>

                <h1 className="text-2xl font-bold mb-2">Purchase Successful!</h1>
                <p className="text-muted-foreground mb-6">
                    Thank you for your purchase. You now have full access to your course content.
                </p>

                <div className="space-y-3">
                    <Link href="/learn/dashboard">
                        <Button className="w-full gap-2">
                            Go to Dashboard
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </Link>
                    <Link href="/learn/courses">
                        <Button variant="outline" className="w-full">
                            Browse More Courses
                        </Button>
                    </Link>
                </div>
            </Card>
        </div>
    );
}

export default function CheckoutSuccessPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
                    <p className="text-lg">Loading...</p>
                </div>
            </div>
        }>
            <CheckoutSuccessContent />
        </Suspense>
    );
}
