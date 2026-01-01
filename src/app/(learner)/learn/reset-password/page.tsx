"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, CheckCircle, XCircle } from "lucide-react";
import { Button, Card } from "@/components/ui";

function ResetPasswordForm() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get("token");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

    if (!token) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center px-4">
                <Card className="w-full max-w-md p-8 border-white/10 bg-white/[0.02]">
                    <div className="text-center">
                        <div className="h-16 w-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-6">
                            <XCircle className="h-8 w-8 text-red-500" />
                        </div>
                        <h1 className="text-2xl font-semibold mb-3">Invalid Link</h1>
                        <p className="text-white/50 mb-6">
                            This password reset link is invalid or has expired.
                        </p>
                        <Link href="/learn/forgot-password">
                            <Button className="bg-white text-black hover:bg-white/90">
                                Request New Link
                            </Button>
                        </Link>
                    </div>
                </Card>
            </div>
        );
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (password.length < 8) {
            setError("Password must be at least 8 characters");
            return;
        }

        setIsLoading(true);

        try {
            const res = await fetch("/api/learner/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Failed to reset password");
            }

            setIsSuccess(true);
            setTimeout(() => {
                router.push("/learn/login");
            }, 3000);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center px-4">
                <Card className="w-full max-w-md p-8 border-white/10 bg-white/[0.02]">
                    <div className="text-center">
                        <div className="h-16 w-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-6">
                            <CheckCircle className="h-8 w-8 text-emerald-500" />
                        </div>
                        <h1 className="text-2xl font-semibold mb-3">Password Reset!</h1>
                        <p className="text-white/50 mb-6">
                            Your password has been reset successfully. Redirecting to sign in...
                        </p>
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
                        <Lock className="h-7 w-7 text-cyan-400" />
                    </div>
                    <h1 className="text-2xl font-semibold mb-2">Create new password</h1>
                    <p className="text-white/50 text-sm">
                        Enter a new password for your account
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-white/70 mb-2">
                            New Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={8}
                            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-cyan-400/50 transition-colors"
                            placeholder="At least 8 characters"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-white/70 mb-2">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-cyan-400/50 transition-colors"
                            placeholder="Confirm your password"
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
                        {isLoading ? "Resetting..." : "Reset Password"}
                    </Button>
                </form>
            </Card>
        </div>
    );
}

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={
            <div className="min-h-[80vh] flex items-center justify-center">
                <div className="animate-pulse text-white/50">Loading...</div>
            </div>
        }>
            <ResetPasswordForm />
        </Suspense>
    );
}
