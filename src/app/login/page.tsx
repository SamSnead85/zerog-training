"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui";
import { PremiumButton } from "@/components/ui/premium-buttons";
import {
    Mail,
    Lock,
    Eye,
    EyeOff,
    Loader2,
    Building2,
    ArrowRight,
    Shield,
    Zap,
    Users,
    CheckCircle2,
} from "lucide-react";
import { LogoIcon } from "@/components/brand/Logo";

export default function LoginPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate login delay
        await new Promise(r => setTimeout(r, 1000));

        // Store user in localStorage for demo
        localStorage.setItem("zerog_user", JSON.stringify({
            email,
            name: email.split("@")[0],
            isLoggedIn: true,
        }));

        // Redirect to dashboard
        router.push("/dashboard");
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Panel - Branded Hero */}
            <div className="hidden lg:flex lg:w-1/2 xl:w-[55%] relative overflow-hidden">
                {/* Gradient Background - Vibrant Cyan to Indigo */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-950 via-blue-950 to-indigo-950" />

                {/* Animated gradient overlay - Brighter, more vibrant */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(14,165,233,0.25),transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(99,102,241,0.2),transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.1),transparent_70%)]" />

                {/* Grid pattern overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

                {/* Content */}
                <div className="relative z-10 flex flex-col justify-between p-12 xl:p-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3">
                        <LogoIcon size={40} />
                        <span className="text-2xl font-semibold text-white">
                            Zero<span className="text-cyan-400">G</span>
                            <span className="text-white/60 font-light ml-2">Training</span>
                        </span>
                    </Link>

                    {/* Main Headline */}
                    <div className="space-y-6 max-w-lg">
                        <h1 className="text-4xl xl:text-5xl font-bold text-white leading-tight">
                            Enterprise Training
                            <br />
                            <span className="text-white/60">in </span>
                            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Days</span>
                            <span className="text-white/60">,</span>
                            <br />
                            <span className="text-white/60">Not Months</span>
                        </h1>

                        <p className="text-lg text-white/60 leading-relaxed">
                            Transform your policies, SOPs, and knowledge base into
                            interactive training your workforce will actually complete.
                        </p>

                        {/* Trust indicators */}
                        <div className="flex flex-col gap-3 pt-4">
                            <div className="flex items-center gap-3 text-white/70">
                                <div className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center">
                                    <Shield className="h-4 w-4 text-cyan-400" />
                                </div>
                                <span className="text-sm">SOC 2 Type II & HIPAA Compliant</span>
                            </div>
                            <div className="flex items-center gap-3 text-white/70">
                                <div className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center">
                                    <Zap className="h-4 w-4 text-cyan-400" />
                                </div>
                                <span className="text-sm">AI-powered content generation in seconds</span>
                            </div>
                            <div className="flex items-center gap-3 text-white/70">
                                <div className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center">
                                    <Users className="h-4 w-4 text-cyan-400" />
                                </div>
                                <span className="text-sm">Trusted by 50,000+ learners worldwide</span>
                            </div>
                        </div>
                    </div>

                    {/* Footer - Company URL */}
                    <div className="text-white/40 text-sm">
                        zerog.training
                    </div>
                </div>
            </div>

            {/* Right Panel - Sign In Form */}
            <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-background">
                <div className="w-full max-w-md">
                    {/* Mobile Logo */}
                    <div className="lg:hidden flex items-center gap-2 mb-10">
                        <LogoIcon size={32} />
                        <span className="text-xl font-semibold">
                            Zero<span className="text-cyan-400">G</span>
                            <span className="text-muted-foreground font-light ml-1">Training</span>
                        </span>
                    </div>

                    {/* Header */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold text-foreground">Sign in</h2>
                        <p className="text-muted-foreground mt-1">
                            New to ScaledNative?{" "}
                            <Link href="/signup" className="text-primary hover:underline">
                                Create an account
                            </Link>
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <input
                                    type="email"
                                    placeholder="name@company.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full h-11 pl-10 pr-4 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full h-11 pl-10 pr-12 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>

                        <PremiumButton
                            type="submit"
                            variant="gradient"
                            size="lg"
                            glow
                            loading={isLoading}
                            icon={!isLoading ? <ArrowRight className="h-4 w-4" /> : undefined}
                            iconPosition="right"
                            className="w-full"
                        >
                            {isLoading ? "Signing in..." : "Sign in"}
                        </PremiumButton>
                    </form>

                    {/* Divider */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-border" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">or</span>
                        </div>
                    </div>

                    {/* SSO Options */}
                    <div className="space-y-3">
                        <button
                            type="button"
                            className="w-full h-11 flex items-center justify-center gap-3 rounded-lg border border-border bg-background hover:bg-muted/50 transition-colors text-sm font-medium"
                        >
                            <Building2 className="h-4 w-4" />
                            Continue with SAML (SSO)
                        </button>
                        <button
                            type="button"
                            className="w-full h-11 flex items-center justify-center gap-3 rounded-lg border border-border bg-background hover:bg-muted/50 transition-colors text-sm font-medium"
                        >
                            <svg className="h-4 w-4" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            Continue with Google
                        </button>
                        <button
                            type="button"
                            className="w-full h-11 flex items-center justify-center gap-3 rounded-lg border border-border bg-background hover:bg-muted/50 transition-colors text-sm font-medium"
                        >
                            <svg className="h-4 w-4" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M3 5.5A2.5 2.5 0 0 1 5.5 3h13A2.5 2.5 0 0 1 21 5.5v13a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 18.5v-13zm2.5-1a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h13a1 1 0 0 0 1-1v-13a1 1 0 0 0-1-1h-13z" />
                                <path fill="#00A4EF" d="M4.5 4.5h6.75v6.75H4.5z" />
                                <path fill="#FFB900" d="M12.75 4.5h6.75v6.75h-6.75z" />
                                <path fill="#7FBA00" d="M4.5 12.75h6.75v6.75H4.5z" />
                                <path fill="#F25022" d="M12.75 12.75h6.75v6.75h-6.75z" />
                            </svg>
                            Continue with Microsoft
                        </button>
                    </div>

                    {/* Forgot Password */}
                    <div className="mt-6 text-center">
                        <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                            Forgot your password?
                        </Link>
                    </div>

                    {/* Terms */}
                    <div className="mt-8 text-center text-xs text-muted-foreground">
                        By signing in, you agree to our{" "}
                        <Link href="/terms" className="underline hover:text-foreground">
                            Terms of Use
                        </Link>
                        ,{" "}
                        <Link href="/privacy" className="underline hover:text-foreground">
                            Privacy Notice
                        </Link>
                        ,<br />
                        <Link href="/security" className="underline hover:text-foreground">
                            Security Policy
                        </Link>
                        , and{" "}
                        <Link href="/terms" className="underline hover:text-foreground">
                            Help & Support
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
