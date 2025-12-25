"use client";

import Link from "next/link";
import { Button, Input, Card } from "@/components/ui";
import { Rocket, ArrowLeft } from "lucide-react";

export default function LoginPage() {
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
                    <h1 className="text-2xl font-bold mb-2">Welcome back</h1>
                    <p className="text-muted-foreground mb-6">
                        Sign in to your account to continue
                    </p>

                    <form className="space-y-4">
                        <Input
                            label="Email"
                            type="email"
                            placeholder="john@company.com"
                        />
                        <Input
                            label="Password"
                            type="password"
                            placeholder="Enter your password"
                        />

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" className="rounded border-border" />
                                <span className="text-muted-foreground">Remember me</span>
                            </label>
                            <Link href="/forgot-password" className="text-primary hover:underline">
                                Forgot password?
                            </Link>
                        </div>

                        <Button className="w-full" size="lg">
                            Sign in
                        </Button>
                    </form>

                    <div className="mt-6 pt-6 border-t border-border text-center text-sm text-muted-foreground">
                        Don&apos;t have an account?{" "}
                        <Link href="/signup" className="text-primary hover:underline">
                            Start free trial
                        </Link>
                    </div>
                </Card>
            </div>
        </div>
    );
}
