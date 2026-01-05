"use client";

import Link from "next/link";
import { Button, Card, Badge } from "@/components/ui";
import {
    Lock,
    Building2,
    Calendar,
    Sparkles,
    Play,
    Mail,
} from "lucide-react";

export default function TryDemoPage() {
    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-6">
            <div className="max-w-md w-full text-center">
                <div className="flex justify-center mb-6">
                    <div className="h-20 w-20 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                        <Lock className="h-10 w-10 text-amber-500" />
                    </div>
                </div>

                <Badge className="mb-4 bg-blue-500/20 text-blue-300 border-blue-500/30">
                    <Building2 className="h-3 w-3 mr-1" />
                    Enterprise Only
                </Badge>

                <h1 className="text-3xl font-bold mb-4">
                    Enterprise Access Required
                </h1>

                <p className="text-white/50 mb-8">
                    ScaledNative training is available through enterprise licensing.
                    Contact our team for a personalized demo.
                </p>

                <div className="space-y-3">
                    <Link href="/contact?type=demo" className="block">
                        <Button size="lg" className="w-full gap-2 bg-white text-black hover:bg-white/90">
                            <Calendar className="h-5 w-5" />
                            Schedule a Demo
                        </Button>
                    </Link>
                    <Link href="/tour" className="block">
                        <Button size="lg" variant="outline" className="w-full gap-2">
                            <Play className="h-5 w-5" />
                            Take Self-Guided Tour
                        </Button>
                    </Link>
                </div>

                <div className="mt-8">
                    <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                        ← Back to site
                    </Link>
                </div>
            </div>
        </div>
    );
}
