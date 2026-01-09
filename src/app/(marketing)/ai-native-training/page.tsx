import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Shield } from "lucide-react";
import { FAQSchema, CourseSchema, BreadcrumbSchema } from "@/components/seo/StructuredData";

export const metadata: Metadata = {
    title: "AI-Native Training | Transform Your Workforce | ScaledNative",
    description: "Become an AI-native organization with ScaledNative's transformation training. The NATIVE framework teaches teams to think, work, and innovate with AI. 634+ hours of hands-on training, 6 certification tracks, 95% completion rate.",
    keywords: [
        "AI-native training",
        "AI-native transformation",
        "AI-native workforce",
        "AI-native organization",
        "AI-native thinking",
        "NATIVE framework",
        "AI transformation training",
        "become AI-native",
        "AI-first training"
    ],
    alternates: {
        canonical: "https://scalednative.com/ai-native-training",
    },
    openGraph: {
        title: "AI-Native Training | Transform Your Workforce",
        description: "Become an AI-native organization with the NATIVE framework.",
        url: "https://scalednative.com/ai-native-training",
        type: "website",
    },
};

const faqs = [
    {
        question: "What does AI-native mean?",
        answer: "AI-native refers to an organization or individual that fundamentally operates with AI integrated into every workflow, decision, and process. Unlike AI-assisted (using AI as a tool), AI-native means AI is woven into the fabric of how work gets done."
    },
    {
        question: "How do you become an AI-native organization?",
        answer: "Becoming AI-native requires a systematic transformation approach. ScaledNative's NATIVE framework provides the methodology: Navigate (assess current state), Architect (design AI integration), Transform (train workforce), Integrate (embed AI processes), Validate (measure outcomes), Evolve (continuous improvement)."
    },
    {
        question: "What is the NATIVE framework for AI transformation?",
        answer: "The NATIVE framework is ScaledNative's proprietary methodology for AI transformation. NATIVE stands for: Navigate, Architect, Transform, Integrate, Validate, Evolve. It's the only framework that addresses both technology and cultural transformation."
    },
    {
        question: "How long does AI-native transformation take?",
        answer: "AI-native transformation timelines vary by organization size. Small teams (under 50) typically achieve AI-native status in 3-6 months. Mid-size organizations (50-500) in 6-12 months. Enterprises (500+) in 12-24 months."
    }
];

export default function AINativeTrainingPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <FAQSchema faqs={faqs} />
            <CourseSchema course={{
                name: "AI-Native Transformation Training",
                description: "Comprehensive training to become an AI-native organization using the NATIVE framework methodology.",
                rating: 4.9,
                reviewCount: 1247,
                duration: "PT60H",
                price: "299"
            }} />
            <BreadcrumbSchema items={[
                { name: "Home", url: "https://scalednative.com" },
                { name: "AI-Native Training", url: "https://scalednative.com/ai-native-training" }
            ]} />

            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
                    <Link href="/" className="font-playfair text-2xl font-medium tracking-tight italic">
                        ScaledNative<sup className="text-[10px] align-super ml-0.5">™</sup>
                    </Link>
                    <div className="hidden md:flex items-center gap-10">
                        <Link href="/native" className="text-sm text-white/40 hover:text-white transition-colors">Framework</Link>
                        <Link href="/training" className="text-sm text-white/40 hover:text-white transition-colors">Training</Link>
                        <Link href="/pricing" className="text-sm text-white/40 hover:text-white transition-colors">Pricing</Link>
                        <Link href="/enterprise" className="text-sm text-white/40 hover:text-white transition-colors">Enterprise</Link>
                    </div>
                    <Link href="/signup" className="px-4 py-2 bg-white text-black rounded-full text-sm font-medium hover:bg-white/90">
                        Get Started
                    </Link>
                </div>
            </nav>

            {/* Hero */}
            <section className="pt-32 pb-20 px-6">
                <div className="max-w-6xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 mb-8">
                        <span className="text-sm text-emerald-400">The Future of Work is AI-Native</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold mb-6">
                        AI-Native Training for<br />Enterprise Transformation
                    </h1>

                    <p className="text-xl text-white/60 max-w-3xl mx-auto mb-8">
                        Don't just use AI — become <strong className="text-white">AI-native</strong>. Our transformation training
                        teaches organizations to think, work, and innovate with AI at the core.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                        <Link href="/signup" className="px-8 py-4 bg-emerald-500 text-white rounded-full font-semibold hover:bg-emerald-600 transition-colors">
                            Start AI-Native Training
                        </Link>
                        <Link href="/native" className="px-8 py-4 bg-white/5 text-white rounded-full font-semibold border border-white/10 hover:bg-white/10 transition-colors">
                            Learn NATIVE Framework
                        </Link>
                    </div>
                </div>
            </section>

            {/* What is AI-Native */}
            <section className="py-20 px-6 border-t border-white/5">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold mb-6 text-center">What is AI-Native?</h2>
                    <p className="text-lg text-white/60 mb-6">
                        <strong className="text-white">AI-native</strong> describes an organization that operates with artificial intelligence
                        fundamentally integrated into every workflow, decision, and process. It's not about using AI as an occasional
                        tool — it's about building AI into the DNA of how work gets done.
                    </p>
                    <div className="grid md:grid-cols-2 gap-6 mt-8">
                        <div className="p-6 rounded-2xl bg-red-500/10 border border-red-500/20">
                            <h3 className="font-semibold mb-2 text-red-400">❌ AI-Assisted (Old Model)</h3>
                            <ul className="text-white/50 space-y-1 text-sm">
                                <li>• Uses AI occasionally as a tool</li>
                                <li>• AI is separate from core workflows</li>
                                <li>• Incremental productivity gains</li>
                            </ul>
                        </div>
                        <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                            <h3 className="font-semibold mb-2 text-emerald-400">✓ AI-Native (Future Model)</h3>
                            <ul className="text-white/50 space-y-1 text-sm">
                                <li>• AI embedded in every process</li>
                                <li>• AI-first thinking and design</li>
                                <li>• Exponential productivity gains</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* NATIVE Framework */}
            <section className="py-20 px-6 border-t border-white/5">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold mb-4 text-center">The NATIVE Framework</h2>
                    <p className="text-center text-white/50 mb-12">Our proven 6-phase methodology for AI-native transformation</p>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { letter: "N", word: "Navigate", desc: "Assess your AI readiness and identify opportunities" },
                            { letter: "A", word: "Architect", desc: "Design AI integration patterns for your business" },
                            { letter: "T", word: "Transform", desc: "Train your workforce with role-specific AI skills" },
                            { letter: "I", word: "Integrate", desc: "Embed AI into workflows and decision-making" },
                            { letter: "V", word: "Validate", desc: "Measure outcomes and ROI" },
                            { letter: "E", word: "Evolve", desc: "Continuously improve and stay ahead" },
                        ].map((phase, i) => (
                            <div key={i} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-emerald-500/30 transition-colors">
                                <div className="text-4xl font-bold text-emerald-400 mb-2">{phase.letter}</div>
                                <h3 className="text-lg font-semibold mb-2">{phase.word}</h3>
                                <p className="text-white/50 text-sm">{phase.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-20 px-6 border-t border-white/5">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold mb-12 text-center">AI-Native Training FAQs</h2>
                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <details key={i} className="group p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                                <summary className="font-semibold cursor-pointer list-none flex items-center justify-between">
                                    {faq.question}
                                    <span className="text-2xl group-open:rotate-45 transition-transform">+</span>
                                </summary>
                                <p className="mt-4 text-white/60">{faq.answer}</p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 px-6 border-t border-white/5">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-4">Become AI-Native Today</h2>
                    <p className="text-xl text-white/50 mb-8">Join organizations leading the AI-native transformation.</p>
                    <Link href="/signup" className="inline-flex px-8 py-4 bg-emerald-500 text-white rounded-full font-semibold hover:bg-emerald-600 transition-colors">
                        Start Your Transformation
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-8 border-t border-white/5">
                <div className="mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-center gap-6">
                    <span className="font-playfair text-lg italic">ScaledNative<sup className="text-[8px]">™</sup></span>
                    <div className="flex flex-wrap justify-center gap-8 text-sm text-white/30">
                        <Link href="/native" className="hover:text-white transition-colors">Framework</Link>
                        <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
                        <Link href="/enterprise" className="hover:text-white transition-colors">Enterprise</Link>
                        <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
                    </div>
                    <div className="text-xs text-white/20">© 2025 ScaledNative™</div>
                </div>
            </footer>
        </div>
    );
}
