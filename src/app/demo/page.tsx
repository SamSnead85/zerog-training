import Link from "next/link";
import { Button } from "@/components/ui";
import { Rocket, Play, ArrowLeft, Calendar } from "lucide-react";

export default function DemoPage() {
    return (
        <div className="min-h-screen bg-gradient-hero">
            {/* Background effects */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute top-20 left-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
                <div className="absolute bottom-20 right-1/4 h-96 w-96 rounded-full bg-secondary/10 blur-3xl" />
            </div>

            <div className="mx-auto max-w-4xl px-6 py-16">
                {/* Back link */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to home
                </Link>

                {/* Logo */}
                <div className="flex items-center gap-2 mb-12">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary">
                        <Rocket className="h-6 w-6 text-background" />
                    </div>
                    <span className="text-2xl font-bold">
                        Zero<span className="text-gradient">G</span>
                    </span>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Video section */}
                    <div>
                        <h1 className="text-3xl font-bold mb-4">See ZeroG in Action</h1>
                        <p className="text-muted-foreground mb-8">
                            Watch how organizations are using ZeroG to create context-aware training
                            that actually works.
                        </p>

                        <div className="aspect-video rounded-xl border border-border bg-card overflow-hidden relative group cursor-pointer">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                                <div className="h-16 w-16 rounded-full bg-primary/90 flex items-center justify-center transition-transform group-hover:scale-110">
                                    <Play className="h-8 w-8 text-background ml-1" />
                                </div>
                            </div>
                            <div className="absolute bottom-4 left-4 right-4">
                                <div className="text-sm font-medium">Product Demo</div>
                                <div className="text-xs text-muted-foreground">5 min watch</div>
                            </div>
                        </div>
                    </div>

                    {/* Schedule demo */}
                    <div className="bg-card border border-border rounded-xl p-8">
                        <div className="flex items-center gap-2 mb-4">
                            <Calendar className="h-5 w-5 text-primary" />
                            <h2 className="text-xl font-semibold">Schedule a Live Demo</h2>
                        </div>
                        <p className="text-muted-foreground mb-6">
                            Get a personalized walkthrough with one of our product specialists.
                        </p>

                        <form className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Name</label>
                                <input
                                    type="text"
                                    placeholder="Your name"
                                    className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Work Email</label>
                                <input
                                    type="email"
                                    placeholder="you@company.com"
                                    className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Company Size</label>
                                <select className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary">
                                    <option>1-50 employees</option>
                                    <option>51-200 employees</option>
                                    <option>201-500 employees</option>
                                    <option>500+ employees</option>
                                </select>
                            </div>
                            <Button className="w-full" size="lg">
                                Request Demo
                            </Button>
                        </form>

                        <p className="text-xs text-muted-foreground mt-4 text-center">
                            We&apos;ll get back to you within 24 hours
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
