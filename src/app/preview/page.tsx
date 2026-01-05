"use client";

import Link from "next/link";
import { Button, Card, Badge } from "@/components/ui";
import {
    Play,
    Lock,
    Building2,
    ArrowRight,
    CheckCircle2,
    Calendar,
    Mail,
    Sparkles,
    Users,
    BookOpen,
} from "lucide-react";

export default function PreviewPage() {
    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl border-b border-white/5">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                    <Link href="/" className="flex items-center gap-2">
                        <span className="font-playfair text-xl font-medium tracking-tight italic text-white">
                            ScaledNative<sup className="text-[8px] align-super ml-0.5">™</sup>
                        </span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <Link href="/login" className="text-sm text-white/50 hover:text-white transition-colors">
                            Sign in
                        </Link>
                        <Link href="/contact">
                            <Button size="sm">Contact Sales</Button>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero */}
            <section className="pt-32 pb-16 px-6">
                <div className="mx-auto max-w-4xl text-center">
                    <div className="flex justify-center mb-6">
                        <div className="h-20 w-20 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                            <Lock className="h-10 w-10 text-amber-500" />
                        </div>
                    </div>

                    <Badge className="mb-4 bg-blue-500/20 text-blue-300 border-blue-500/30">
                        <Building2 className="h-3 w-3 mr-1" />
                        Enterprise Only
                    </Badge>

                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        Platform Preview
                        <br />
                        <span className="text-white/60">Available to Clients</span>
                    </h1>

                    <p className="text-xl text-white/50 max-w-2xl mx-auto mb-8">
                        Experience the full ScaledNative platform with a personalized demo.
                        Our team will walk you through the entire curriculum and hands-on labs.
                    </p>
                </div>
            </section>

            {/* What You'll See */}
            <section className="py-16 px-6">
                <div className="mx-auto max-w-5xl">
                    <h2 className="text-2xl font-bold text-center mb-10">What You&apos;ll Experience in a Demo</h2>

                    <div className="grid md:grid-cols-3 gap-6 mb-12">
                        <Card className="p-6 bg-white/[0.02]">
                            <Play className="h-8 w-8 text-cyan-400 mb-4" />
                            <h3 className="font-bold mb-2">Expert Video Content</h3>
                            <p className="text-sm text-white/50">
                                Deep technical lessons from industry practitioners on AI agents, RAG, and enterprise architecture.
                            </p>
                        </Card>

                        <Card className="p-6 bg-white/[0.02]">
                            <BookOpen className="h-8 w-8 text-emerald-400 mb-4" />
                            <h3 className="font-bold mb-2">Hands-On Labs</h3>
                            <p className="text-sm text-white/50">
                                Interactive coding environments where your team builds real AI systems, not just watches tutorials.
                            </p>
                        </Card>

                        <Card className="p-6 bg-white/[0.02]">
                            <Sparkles className="h-8 w-8 text-purple-400 mb-4" />
                            <h3 className="font-bold mb-2">Customization Options</h3>
                            <p className="text-sm text-white/50">
                                See how training can be tailored to your industry, tech stack, and specific learning objectives.
                            </p>
                        </Card>
                    </div>

                    {/* CTA */}
                    <div className="text-center">
                        <Card className="inline-block p-8 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-cyan-500/20">
                            <h3 className="text-xl font-bold mb-2">Ready to see the platform?</h3>
                            <p className="text-white/50 mb-6">
                                Schedule a personalized demo with our team.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                <Link href="/contact?type=demo">
                                    <Button size="lg" className="gap-2 bg-white text-black hover:bg-white/90">
                                        <Calendar className="h-5 w-5" />
                                        Schedule Demo
                                    </Button>
                                </Link>
                                <Link href="/tour">
                                    <Button size="lg" variant="outline" className="gap-2">
                                        <Play className="h-5 w-5" />
                                        Self-Guided Tour
                                    </Button>
                                </Link>
                            </div>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Back to site */}
            <div className="pb-16 text-center">
                <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    ← Back to site
                </Link>
            </div>
        </div>
    );
}
