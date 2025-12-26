"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, Badge, Button, Input } from "@/components/ui";
import {
    Mail,
    Lock,
    Eye,
    EyeOff,
    ArrowRight,
    Building2,
    AlertCircle,
    CheckCircle2,
} from "lucide-react";

interface LoginPageProps {
    onLogin?: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
}

export function LoginPage({ onLogin }: LoginPageProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            if (onLogin) {
                const result = await onLogin(email, password);
                if (!result.success) {
                    setError(result.error || "Login failed");
                }
            } else {
                // Demo mode - redirect to dashboard
                window.location.href = "/dashboard";
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-2">
                        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                            <span className="text-xl font-bold text-primary-foreground">Z</span>
                        </div>
                        <span className="text-2xl font-bold">ZeroG</span>
                    </Link>
                    <p className="text-muted-foreground mt-2">Enterprise Healthcare Training</p>
                </div>

                <Card className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="text-center mb-6">
                            <h1 className="text-2xl font-bold">Welcome back</h1>
                            <p className="text-sm text-muted-foreground">
                                Sign in to your account to continue
                            </p>
                        </div>

                        {error && (
                            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center gap-2 text-sm text-red-500">
                                <AlertCircle className="h-4 w-4" />
                                {error}
                            </div>
                        )}

                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium mb-1.5 block">
                                    Work Email
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="you@healthcare.org"
                                        required
                                        className="w-full h-11 pl-10 pr-4 rounded-lg bg-white/[0.02] border border-white/10 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-1.5">
                                    <label className="text-sm font-medium">Password</label>
                                    <Link
                                        href="/forgot-password"
                                        className="text-xs text-primary hover:underline"
                                    >
                                        Forgot password?
                                    </Link>
                                </div>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        required
                                        className="w-full h-11 pl-10 pr-12 rounded-lg bg-white/[0.02] border border-white/10 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-4 w-4" />
                                        ) : (
                                            <Eye className="h-4 w-4" />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-11 gap-2"
                            disabled={isLoading}
                        >
                            {isLoading ? "Signing in..." : "Sign in"}
                            {!isLoading && <ArrowRight className="h-4 w-4" />}
                        </Button>

                        {/* SSO Option */}
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-border" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-card px-2 text-muted-foreground">
                                    Or continue with
                                </span>
                            </div>
                        </div>

                        <Button variant="outline" className="w-full h-11 gap-2">
                            <Building2 className="h-4 w-4" />
                            Single Sign-On (SSO)
                        </Button>
                    </form>
                </Card>

                {/* Demo Credentials */}
                <Card className="mt-4 p-4 bg-primary/5 border-primary/20">
                    <p className="text-xs font-medium mb-2">Demo Credentials:</p>
                    <div className="space-y-1 text-xs text-muted-foreground">
                        <p>Admin: admin@healthcare.org / admin123</p>
                        <p>Manager: manager@healthcare.org / manager123</p>
                        <p>Employee: employee@healthcare.org / employee123</p>
                    </div>
                </Card>

                {/* Footer */}
                <p className="text-center text-sm text-muted-foreground mt-6">
                    Don't have an account?{" "}
                    <Link href="/signup" className="text-primary hover:underline">
                        Contact your administrator
                    </Link>
                </p>
            </div>
        </div>
    );
}
