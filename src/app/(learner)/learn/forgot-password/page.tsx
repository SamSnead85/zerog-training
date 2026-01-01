"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, CheckCircle } from "lucide-react";
import { Button, Card } from "@/components/ui";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const res = await fetch("/api/learner/reset-request", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Failed to send reset email");
            }

            setIsSubmitted(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center px-4">
                <Card className="w-full max-w-md p-8 border-white/10 bg-white/[0.02]">
                    <div className="text-center">
                        <div className="h-16 w-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-6">
                            <CheckCircle className="h-8 w-8 text-emerald-500" />
                        </div>
                        <h1 className="text-2xl font-semibold mb-3">Check your email</h1>
                        <p className="text-white/50 mb-6">
                            If an account exists for <strong className="text-white">{email}</strong>,
                            you'll receive a password reset link shortly.
                        </p>
                        <Link href="/learn/login">
                            <Button variant="outline" className="border-white/20">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Sign In
                            </Button>
                        </Link>
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4">
            <Card className="w-full max-w-md p-8 border-white/10 bg-white/[0.02]">
                <div className="text-center mb-8">
                    <div className="h-14 w-14 rounded-full bg-cyan-400/10 flex items-center justify-center mx-auto mb-4">
                        <Mail className="h-7 w-7 text-cyan-400" />
                    </div>
                    <h1 className="text-2xl font-semibold mb-2">Forgot password?</h1>
                    <p className="text-white/50 text-sm">
                        Enter your email and we'll send you a reset link
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-white/70 mb-2">
                            Email address
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-cyan-400/50 transition-colors"
                            placeholder="you@example.com"
                        />
                    </div>

                    {error && (
                        <div className="text-red-400 text-sm text-center bg-red-500/10 rounded-lg py-2">
                            {error}
                        </div>
                    )}

                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-white text-black hover:bg-white/90 h-12"
                    >
                        {isLoading ? "Sending..." : "Send Reset Link"}
                    </Button>
                </form>

                <div className="mt-6 text-center">
                    <Link
                        href="/learn/login"
                        className="text-sm text-white/40 hover:text-white transition-colors inline-flex items-center gap-2"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Sign In
                    </Link>
                </div>
            </Card>
        </div>
    );
}
