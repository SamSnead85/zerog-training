"use client";

import Link from "next/link";
import { Button, Card, Badge } from "@/components/ui";
import {
    Building2,
    Shield,
    Users,
    ArrowRight,
    Lock,
    Sparkles,
    CheckCircle2,
    Phone,
    Mail,
    Calendar,
} from "lucide-react";
import { LogoIcon } from "@/components/brand/Logo";

export default function SignupPage() {
    return (
        <div className="min-h-screen flex">
            {/* Left Panel - Branded Hero */}
            <div className="hidden lg:flex lg:w-1/2 xl:w-[55%] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-950 via-blue-950 to-indigo-950" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(14,165,233,0.25),transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(99,102,241,0.2),transparent_50%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

                <div className="relative z-10 flex flex-col justify-between p-12 xl:p-16">
                    <Link href="/" className="flex items-center gap-3">
                        <LogoIcon size={40} />
                        <span className="text-2xl font-semibold text-white">
                            Scaled<span className="text-cyan-400">Native</span>
                            <span className="text-white/60 font-light ml-2">Training</span>
                        </span>
                    </Link>

                    <div className="space-y-6 max-w-lg">
                        <h1 className="text-4xl xl:text-5xl font-bold text-white leading-tight">
                            Enterprise
                            <br />
                            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">AI-Native</span>
                            <br />
                            <span className="text-white/60">Training</span>
                        </h1>

                        <p className="text-lg text-white/60 leading-relaxed">
                            Transform your organization with customized AI training
                            tailored to your industry, tech stack, and workforce.
                        </p>

                        <div className="flex flex-col gap-4 pt-4">
                            <div className="flex items-center gap-3 text-white/70">
                                <div className="h-8 w-8 rounded-full bg-cyan-500/10 flex items-center justify-center">
                                    <Building2 className="h-4 w-4 text-cyan-400" />
                                </div>
                                <span className="text-sm">Designed for teams of 25+ users</span>
                            </div>
                            <div className="flex items-center gap-3 text-white/70">
                                <div className="h-8 w-8 rounded-full bg-cyan-500/10 flex items-center justify-center">
                                    <Sparkles className="h-4 w-4 text-cyan-400" />
                                </div>
                                <span className="text-sm">Highly customizable to your organization</span>
                            </div>
                            <div className="flex items-center gap-3 text-white/70">
                                <div className="h-8 w-8 rounded-full bg-cyan-500/10 flex items-center justify-center">
                                    <Shield className="h-4 w-4 text-cyan-400" />
                                </div>
                                <span className="text-sm">SOC 2 Type II & HIPAA compliant</span>
                            </div>
                        </div>
                    </div>

                    <div className="text-white/40 text-sm">
                        scalednative.com
                    </div>
                </div>
            </div>

            {/* Right Panel - Contact Sales */}
            <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-background">
                <div className="w-full max-w-md">
                    {/* Mobile Logo */}
                    <div className="lg:hidden flex items-center gap-2 mb-10">
                        <LogoIcon size={32} />
                        <span className="text-xl font-semibold">
                            Scaled<span className="text-cyan-400">Native</span>
                        </span>
                    </div>

                    {/* Lock Icon */}
                    <div className="flex justify-center mb-6">
                        <div className="h-16 w-16 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                            <Lock className="h-8 w-8 text-amber-500" />
                        </div>
                    </div>

                    {/* Header */}
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-semibold text-foreground">Enterprise Access Only</h2>
                        <p className="text-muted-foreground mt-2">
                            ScaledNative is available through enterprise licensing.
                            Contact our team to get started.
                        </p>
                    </div>

                    {/* Enterprise Info Card */}
                    <Card className="p-6 mb-6 bg-white/[0.02] border-border">
                        <div className="flex items-center gap-3 mb-4">
                            <Users className="h-5 w-5 text-blue-400" />
                            <span className="font-medium">What You Get</span>
                        </div>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                                Unlimited access to all training modules
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                                Customized learning paths for your team
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                                Enterprise analytics & reporting
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                                Priority support & dedicated success manager
                            </li>
                        </ul>
                        <div className="mt-4 pt-4 border-t border-border">
                            <p className="text-sm text-blue-300">
                                Starting at <strong>$2,500</strong> per user/year
                            </p>
                        </div>
                    </Card>

                    {/* CTA Buttons */}
                    <div className="space-y-3">
                        <Link href="/contact?type=demo" className="block">
                            <Button size="lg" className="w-full gap-2 bg-white text-black hover:bg-white/90">
                                <Calendar className="h-5 w-5" />
                                Schedule a Demo
                            </Button>
                        </Link>
                        <Link href="/contact?type=invoice" className="block">
                            <Button size="lg" variant="outline" className="w-full gap-2">
                                <Mail className="h-5 w-5" />
                                Request Invoice
                            </Button>
                        </Link>
                    </div>

                    {/* Already have access */}
                    <div className="mt-8 text-center">
                        <p className="text-sm text-muted-foreground">
                            Already have access?{" "}
                            <Link href="/login" className="text-primary hover:underline">
                                Sign in
                            </Link>
                        </p>
                    </div>

                    {/* Back to site */}
                    <div className="mt-4 text-center">
                        <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                            ← Back to site
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
