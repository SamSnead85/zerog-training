import Link from "next/link";
import { Rocket, ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
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

                <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

                <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
                    <p className="text-lg">Last updated: December 2024</p>

                    <section>
                        <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">1. Information We Collect</h2>
                        <p>We collect information you provide directly, such as account information, content you upload, and communications with us.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">2. How We Use Your Information</h2>
                        <p>We use collected information to provide, maintain, and improve our services, and to communicate with you.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">3. Data Security</h2>
                        <p>We implement industry-standard security measures to protect your personal information and organizational data.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">4. Contact Us</h2>
                        <p>For privacy-related questions, contact us at privacy@zerogtraining.com</p>
                    </section>
                </div>
            </div>
        </div>
    );
}
