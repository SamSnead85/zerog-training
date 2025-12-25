import Link from "next/link";
import { Rocket, ArrowLeft } from "lucide-react";

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-gradient-hero">
            <div className="mx-auto max-w-3xl px-6 py-16">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to home
                </Link>

                <div className="flex items-center gap-2 mb-8">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary">
                        <Rocket className="h-6 w-6 text-background" />
                    </div>
                    <span className="text-2xl font-bold">
                        Zero<span className="text-gradient">G</span>
                    </span>
                </div>

                <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>

                <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
                    <p className="text-lg">Last updated: December 2024</p>

                    <section>
                        <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">1. Acceptance of Terms</h2>
                        <p>By accessing ZeroG AI Training, you agree to be bound by these terms of service.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">2. Use of Service</h2>
                        <p>You may use our service for lawful purposes in accordance with these terms.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">3. User Content</h2>
                        <p>You retain ownership of content you upload. You grant us license to use it for providing the service.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">4. Termination</h2>
                        <p>We may terminate or suspend access to our service at our discretion.</p>
                    </section>
                </div>
            </div>
        </div>
    );
}
