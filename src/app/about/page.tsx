import Link from "next/link";
import { Button } from "@/components/ui";
import { LogoIcon } from "@/components/brand/Logo";
import { ArrowRight, Users, Target, Zap, Globe } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-background/80 backdrop-blur-xl">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                    <Link href="/" className="flex items-center gap-2.5">
                        <LogoIcon size={32} />
                        <span className="text-lg font-semibold tracking-tight">
                            <span className="font-playfair italic">ScaledNative<sup class="text-[10px]">™</sup></span>
                            <span className="text-muted-foreground ml-1 font-light">Training</span>
                        </span>
                    </Link>
                    <Link href="/signup">
                        <Button>Get Started</Button>
                    </Link>
                </div>
            </nav>

            {/* Hero */}
            <section className="pt-32 pb-20 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        About <span className="text-primary">ScaledNative</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        We're building the future of enterprise training with AI that actually understands your organization.
                    </p>
                </div>
            </section>

            {/* Mission */}
            <section className="py-20 px-6 bg-muted/20">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                            <p className="text-muted-foreground mb-4">
                                Training shouldn't be one-size-fits-all. Every organization has unique processes, terminology, and culture. Yet most training platforms force you into generic templates that don't resonate with your team.
                            </p>
                            <p className="text-muted-foreground">
                                ScaledNative uses AI to create training that references your actual policies, tools, and workflows. Training that feels like it was built specifically for your organization—because it was.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { icon: Users, label: "50,000+", desc: "Learners" },
                                { icon: Target, label: "500+", desc: "Organizations" },
                                { icon: Zap, label: "1M+", desc: "Courses Created" },
                                { icon: Globe, label: "40+", desc: "Languages" },
                            ].map((stat) => (
                                <div key={stat.label} className="p-6 rounded-xl bg-white/[0.02] border border-white/10 text-center">
                                    <stat.icon className="h-6 w-6 text-primary mx-auto mb-2" />
                                    <p className="text-2xl font-bold">{stat.label}</p>
                                    <p className="text-sm text-muted-foreground">{stat.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 px-6">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-4">Ready to transform your training?</h2>
                    <p className="text-muted-foreground mb-8">Start creating AI-powered training today.</p>
                    <Link href="/signup">
                        <Button size="lg" className="gap-2">
                            Get Started Free <ArrowRight className="h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 px-6 border-t border-white/5">
                <div className="max-w-6xl mx-auto flex items-center justify-between text-sm text-muted-foreground">
                    <p>© 2024 ScaledNative. All rights reserved.</p>
                    <Link href="/" className="hover:text-foreground">Back to Home</Link>
                </div>
            </footer>
        </div>
    );
}
