"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button, Card } from "@/components/ui";
import { Rocket, ArrowLeft, Mail, MessageSquare, Building2 } from "lucide-react";
import { Suspense } from "react";

function ContactForm() {
    const searchParams = useSearchParams();
    const type = searchParams.get("type");
    const isEnterprise = type === "enterprise";

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
                        Scaled<span className="text-gradient">Native</span>
                    </span>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Contact info */}
                    <div>
                        <h1 className="text-3xl font-bold mb-4">
                            {isEnterprise ? "Enterprise Sales" : "Get in Touch"}
                        </h1>
                        <p className="text-muted-foreground mb-8">
                            {isEnterprise
                                ? "Let's discuss how ScaledNative can transform training at your organization."
                                : "Have questions? We'd love to hear from you."}
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                    <Mail className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-medium">Email</h3>
                                    <p className="text-muted-foreground">hello@zerogtraining.com</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="h-10 w-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                                    <MessageSquare className="h-5 w-5 text-secondary" />
                                </div>
                                <div>
                                    <h3 className="font-medium">Live Chat</h3>
                                    <p className="text-muted-foreground">Available Mon-Fri, 9am-6pm EST</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                                    <Building2 className="h-5 w-5 text-accent" />
                                </div>
                                <div>
                                    <h3 className="font-medium">Office</h3>
                                    <p className="text-muted-foreground">San Francisco, CA</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact form */}
                    <Card variant="glass" padding="lg">
                        <form className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">First Name</label>
                                    <input
                                        type="text"
                                        placeholder="John"
                                        className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Last Name</label>
                                    <input
                                        type="text"
                                        placeholder="Doe"
                                        className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Work Email</label>
                                <input
                                    type="email"
                                    placeholder="john@company.com"
                                    className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>

                            {isEnterprise && (
                                <>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Company</label>
                                        <input
                                            type="text"
                                            placeholder="Your company name"
                                            className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Number of Employees</label>
                                        <select className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary">
                                            <option>500-1,000</option>
                                            <option>1,000-5,000</option>
                                            <option>5,000-10,000</option>
                                            <option>10,000+</option>
                                        </select>
                                    </div>
                                </>
                            )}

                            <div>
                                <label className="block text-sm font-medium mb-2">Message</label>
                                <textarea
                                    rows={4}
                                    placeholder="How can we help?"
                                    className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                                />
                            </div>

                            <Button className="w-full" size="lg">
                                {isEnterprise ? "Contact Sales Team" : "Send Message"}
                            </Button>
                        </form>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default function ContactPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
                <div className="animate-pulse text-muted-foreground">Loading...</div>
            </div>
        }>
            <ContactForm />
        </Suspense>
    );
}
