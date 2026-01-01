"use client";

import { useState } from "react";
import { Button } from "@/components/ui";
import { Mail, CheckCircle, Loader2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface NewsletterSignupProps {
    variant?: "inline" | "card" | "minimal";
    className?: string;
}

export function NewsletterSignup({ variant = "inline", className }: NewsletterSignupProps) {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim()) return;

        setStatus("loading");

        try {
            const response = await fetch("/api/newsletter/subscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                setStatus("success");
                setMessage("You're in! Check your inbox for a welcome email.");
                setEmail("");
            } else {
                const data = await response.json();
                setStatus("error");
                setMessage(data.error || "Something went wrong. Please try again.");
            }
        } catch {
            setStatus("error");
            setMessage("Network error. Please try again.");
        }
    };

    if (status === "success") {
        return (
            <div className={cn("flex items-center gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20", className)}>
                <CheckCircle className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                <p className="text-sm text-emerald-300">{message}</p>
            </div>
        );
    }

    if (variant === "minimal") {
        return (
            <form onSubmit={handleSubmit} className={cn("flex gap-2", className)}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 min-w-0"
                    required
                />
                <Button type="submit" disabled={status === "loading"} size="sm">
                    {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : "Subscribe"}
                </Button>
            </form>
        );
    }

    if (variant === "card") {
        return (
            <div className={cn("p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-white/10", className)}>
                <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="h-5 w-5 text-purple-400" />
                    <h3 className="font-bold text-white">AI-Native Updates</h3>
                </div>
                <p className="text-sm text-white/60 mb-4">
                    Get the latest AI training insights, new course announcements, and industry trends.
                </p>
                <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 rounded-lg bg-black/30 border border-white/10 text-white placeholder:text-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                        required
                    />
                    <Button type="submit" disabled={status === "loading"} className="w-full gap-2">
                        {status === "loading" ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <Mail className="h-4 w-4" />
                        )}
                        {status === "loading" ? "Subscribing..." : "Subscribe Now"}
                    </Button>
                </form>
                {status === "error" && (
                    <p className="text-xs text-red-400 mt-2">{message}</p>
                )}
            </div>
        );
    }

    // Default: inline variant
    return (
        <div className={cn("", className)}>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email for updates"
                        className="w-full pl-11 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                        required
                    />
                </div>
                <Button type="submit" disabled={status === "loading"} className="gap-2 min-h-[44px]">
                    {status === "loading" ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                        <Sparkles className="h-4 w-4" />
                    )}
                    {status === "loading" ? "Subscribing..." : "Get Updates"}
                </Button>
            </form>
            {status === "error" && (
                <p className="text-xs text-red-400 mt-2">{message}</p>
            )}
        </div>
    );
}
