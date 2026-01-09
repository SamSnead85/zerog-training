import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "How to Choose an AI Training Platform | Enterprise Buyer Guide | ScaledNative",
    description: "Complete guide to choosing an AI training platform for your enterprise. Evaluation criteria, must-have features, red flags, and questions to ask vendors.",
    keywords: ["choose AI training platform", "AI training platform guide", "enterprise AI training buyer guide", "evaluate AI training", "AI training vendor selection"],
    alternates: { canonical: "https://scalednative.com/insights/how-to-choose-ai-training-platform" },
};

export default function ChooseAITrainingPlatformPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
                    <Link href="/" className="font-playfair text-2xl italic">ScaledNative<sup className="text-[10px]">™</sup></Link>
                    <Link href="/demo" className="px-4 py-2 bg-white text-black rounded-full text-sm font-medium">Get Demo</Link>
                </div>
            </nav>

            <article className="pt-32 pb-20 px-6">
                <div className="max-w-3xl mx-auto">
                    <div className="text-sm text-white/40 uppercase tracking-wider mb-4">Insights • Buyer Guide</div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">How to Choose an AI Training Platform</h1>
                    <p className="text-xl text-white/60 mb-12">Enterprise buyer's guide to evaluating AI training vendors.</p>

                    <div className="prose prose-invert prose-lg max-w-none">
                        <h2 className="text-2xl font-bold mt-12 mb-4">Key Evaluation Criteria</h2>

                        <h3 className="text-xl font-semibold mt-8 mb-3">1. AI-Specific Content</h3>
                        <p className="text-white/70 mb-4">Look for platforms with content specifically designed for AI training, not generic courses with AI added as an afterthought.</p>

                        <h3 className="text-xl font-semibold mt-8 mb-3">2. Hands-On Learning</h3>
                        <p className="text-white/70 mb-4">Video-only learning has 15% completion rates. Platforms with interactive labs achieve 95%.</p>

                        <h3 className="text-xl font-semibold mt-8 mb-3">3. Enterprise Compliance</h3>
                        <p className="text-white/70 mb-4">For healthcare: HIPAA, HITRUST. For all: SOC 2 Type II. Don't compromise on security.</p>

                        <h3 className="text-xl font-semibold mt-8 mb-3">4. Certification Programs</h3>
                        <p className="text-white/70 mb-4">Industry-recognized certifications help with employee development and recruitment.</p>

                        <h3 className="text-xl font-semibold mt-8 mb-3">5. Dedicated Support</h3>
                        <p className="text-white/70 mb-4">A dedicated success manager is the difference between deployment success and failure.</p>

                        <h2 className="text-2xl font-bold mt-12 mb-4">Questions to Ask Vendors</h2>
                        <ul className="text-white/70 space-y-2 mb-6">
                            <li>• What's your average course completion rate?</li>
                            <li>• How is content kept current with AI developments?</li>
                            <li>• What enterprise integrations do you support?</li>
                            <li>• What compliance certifications do you hold?</li>
                            <li>• What does onboarding and support look like?</li>
                        </ul>

                        <Link href="/demo" className="inline-flex px-6 py-3 bg-white text-black rounded-full font-medium">Evaluate ScaledNative</Link>
                    </div>
                </div>
            </article>

            <footer className="py-12 px-8 border-t border-white/5"><div className="mx-auto max-w-6xl flex justify-between items-center">
                <span className="font-playfair text-lg italic">ScaledNative<sup className="text-[8px]">™</sup></span>
                <div className="text-xs text-white/20">© 2025 ScaledNative™</div>
            </div></footer>
        </div>
    );
}
