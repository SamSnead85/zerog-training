"use client";

import { useState, useEffect } from "react";
import { Card, Badge, Button, Progress } from "@/components/ui";
import {
    Sparkles,
    AlertTriangle,
    ArrowRight,
    X,
} from "lucide-react";
import Link from "next/link";

interface DemoUsage {
    used: number;
    remaining: number;
    limit: number;
    canGenerate: boolean;
}

interface DemoLimitBannerProps {
    onClose?: () => void;
    variant?: "banner" | "modal";
}

export function DemoLimitBanner({ onClose, variant = "banner" }: DemoLimitBannerProps) {
    const [usage, setUsage] = useState<DemoUsage | null>(null);
    const [showUpgradePrompt, setShowUpgradePrompt] = useState(false);

    useEffect(() => {
        fetchUsage();
    }, []);

    const fetchUsage = async () => {
        try {
            const res = await fetch("/api/demo-usage");
            const data = await res.json();
            setUsage(data);

            if (data.remaining === 0) {
                setShowUpgradePrompt(true);
            }
        } catch (error) {
            console.error("Failed to fetch usage:", error);
        }
    };

    if (!usage) return null;

    // Limit reached modal
    if (showUpgradePrompt && variant === "modal") {
        return (
            <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
                <Card className="max-w-md w-full p-6 text-center">
                    <AlertTriangle className="h-12 w-12 text-amber-500 mx-auto mb-4" />
                    <h2 className="text-xl font-bold mb-2">Free Demo Limit Reached</h2>
                    <p className="text-muted-foreground mb-6">
                        You've used your 2 free AI generations for today.
                        Sign up to unlock unlimited access!
                    </p>

                    <div className="space-y-3">
                        <Link href="/signup" className="block">
                            <Button className="w-full gap-2">
                                <Sparkles className="h-4 w-4" />
                                Sign Up - Start Free
                            </Button>
                        </Link>
                        <Link href="/pricing" className="block">
                            <Button variant="outline" className="w-full">
                                View Pricing Plans
                            </Button>
                        </Link>
                    </div>

                    <p className="text-xs text-muted-foreground mt-4">
                        Your free generations reset at midnight
                    </p>
                </Card>
            </div>
        );
    }

    // Usage banner
    return (
        <div className="bg-primary/5 border-b border-primary/10 py-2 px-4">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Sparkles className="h-4 w-4 text-primary" />
                    <span className="text-sm">
                        <strong>{usage.remaining}</strong> free generation{usage.remaining !== 1 ? "s" : ""} remaining today
                    </span>
                    <div className="w-24 hidden sm:block">
                        <Progress value={(usage.used / usage.limit) * 100} className="h-1.5" />
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Link href="/pricing">
                        <Button size="sm" variant="ghost" className="text-xs gap-1">
                            Upgrade
                            <ArrowRight className="h-3 w-3" />
                        </Button>
                    </Link>
                    {onClose && (
                        <button onClick={onClose} className="p-1 hover:bg-muted rounded">
                            <X className="h-4 w-4" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

// Hook for checking demo usage before generation
export function useDemoUsage() {
    const [usage, setUsage] = useState<DemoUsage | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const checkUsage = async (): Promise<DemoUsage> => {
        const res = await fetch("/api/demo-usage");
        const data = await res.json();
        setUsage(data);
        return data;
    };

    const recordUsage = async (): Promise<{ success: boolean; usage: DemoUsage }> => {
        setIsLoading(true);
        try {
            const res = await fetch("/api/demo-usage", { method: "POST" });
            const data = await res.json();
            setUsage(data);
            return { success: res.ok, usage: data };
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        checkUsage();
    }, []);

    return {
        usage,
        isLoading,
        checkUsage,
        recordUsage,
        canGenerate: usage?.canGenerate ?? false,
        remaining: usage?.remaining ?? 0,
    };
}
