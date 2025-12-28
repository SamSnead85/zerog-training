import Link from "next/link";
import { Button } from "@/components/ui";
import { LogoIcon } from "@/components/brand/Logo";
import { Shield, Lock, Server, Eye, CheckCircle2 } from "lucide-react";

const securityFeatures = [
    {
        icon: Shield,
        title: "SOC 2 Type II Certified",
        description: "Independently audited security controls and processes to ensure your data is protected.",
    },
    {
        icon: Lock,
        title: "End-to-End Encryption",
        description: "All data is encrypted in transit (TLS 1.3) and at rest (AES-256).",
    },
    {
        icon: Server,
        title: "Enterprise Infrastructure",
        description: "Hosted on enterprise-grade cloud infrastructure with 99.9% uptime SLA.",
    },
    {
        icon: Eye,
        title: "Privacy by Design",
        description: "GDPR compliant with data minimization and user consent management.",
    },
];

export default function SecurityPage() {
    return (
        <div className="min-h-screen bg-background">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-background/80 backdrop-blur-xl">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                    <Link href="/" className="flex items-center gap-2.5">
                        <LogoIcon size={32} />
                        <span className="text-lg font-semibold tracking-tight">
                            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Zero G</span>
                            <span className="text-muted-foreground ml-1 font-light">Training</span>
                        </span>
                    </Link>
                    <Link href="/signup">
                        <Button>Get Started</Button>
                    </Link>
                </div>
            </nav>

            {/* Hero */}
            <section className="pt-32 pb-16 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                        <Shield className="h-4 w-4" />
                        Enterprise Security
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        Security First
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Your data security is our top priority. We've built ZeroG with enterprise-grade security from the ground up.
                    </p>
                </div>
            </section>

            {/* Security Features */}
            <section className="py-16 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-6">
                        {securityFeatures.map((feature) => (
                            <div key={feature.title} className="p-6 rounded-xl bg-white/[0.02] border border-white/10">
                                <feature.icon className="h-10 w-10 text-primary mb-4" />
                                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                <p className="text-muted-foreground">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Compliance */}
            <section className="py-16 px-6 bg-muted/20">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold mb-8 text-center">Compliance & Certifications</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {["SOC 2", "GDPR", "ISO 27001", "HIPAA Ready"].map((cert) => (
                            <div key={cert} className="p-4 rounded-xl bg-white/[0.02] border border-white/10 text-center">
                                <CheckCircle2 className="h-6 w-6 text-primary mx-auto mb-2" />
                                <p className="font-medium">{cert}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 px-6 border-t border-white/5">
                <div className="max-w-6xl mx-auto flex items-center justify-between text-sm text-muted-foreground">
                    <p>© 2024 ZeroG AI Training. All rights reserved.</p>
                    <Link href="/" className="hover:text-foreground">Back to Home</Link>
                </div>
            </footer>
        </div>
    );
}
