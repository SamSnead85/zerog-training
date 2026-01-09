import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Shield } from "lucide-react";
import { FAQSchema, CourseSchema, BreadcrumbSchema } from "@/components/seo/StructuredData";

export const metadata: Metadata = {
    title: "AI Training Platform | Enterprise AI Training & Certification | ScaledNative",
    description: "ScaledNative is the #1 AI training platform for enterprises. Comprehensive AI training courses, hands-on labs, and industry-recognized certifications. Transform your workforce with AI-native skills. 95% completion rate, 736% ROI.",
    keywords: [
        "AI training",
        "AI training platform",
        "AI training courses",
        "enterprise AI training",
        "corporate AI training",
        "AI workforce training",
        "AI skills training",
        "AI certification training",
        "AI upskilling",
        "AI reskilling",
        "artificial intelligence training",
        "machine learning training",
        "generative AI training",
        "ChatGPT training for business",
        "prompt engineering training"
    ],
    alternates: {
        canonical: "https://scalednative.com/ai-training",
    },
    openGraph: {
        title: "AI Training Platform | Enterprise AI Training & Certification",
        description: "Transform your workforce with the #1 AI training platform. Hands-on labs, certifications, and 736% ROI.",
        url: "https://scalednative.com/ai-training",
        type: "website",
    },
};

const faqs = [
    {
        question: "What is AI training and why do enterprises need it?",
        answer: "AI training is the process of educating your workforce on how to effectively use, implement, and work alongside artificial intelligence technologies. Enterprises need AI training because 87% of organizations report an AI skills gap, and companies with AI-trained employees see 40% higher productivity and 736% ROI on their AI investments."
    },
    {
        question: "How is ScaledNative different from Udemy or Coursera for AI training?",
        answer: "ScaledNative is purpose-built for enterprise AI transformation, not generic online learning. We offer: 1) The NATIVE framework methodology for systematic AI adoption, 2) Hands-on labs with real AI tools, not just video lectures, 3) Role-based learning paths for every job function, 4) Enterprise compliance (HIPAA, SOC 2, HITRUST), 5) 95% completion rate vs industry average of 15%."
    },
    {
        question: "What AI training certifications does ScaledNative offer?",
        answer: "ScaledNative offers 6 industry-recognized AI certifications: AI-Native Foundations, AI-Native Implementation Specialist, Prompt Engineering Professional, AI Transformation Leader, AI Data Strategist, and Enterprise AI Architect. All certifications include hands-on assessments and shareable credentials."
    },
    {
        question: "How long does AI training take?",
        answer: "Our AI training programs range from 4-hour quick-start modules to comprehensive 40+ hour certification tracks. Most employees complete foundational AI training in 1-2 weeks with just 30 minutes/day. The adaptive learning platform adjusts to each learner's pace."
    },
    {
        question: "Is AI training compliant with healthcare and financial regulations?",
        answer: "Yes, ScaledNative is fully compliant with HIPAA, SOC 2, and HITRUST requirements. Our AI training platform includes healthcare-specific and financial services AI compliance modules, making it ideal for regulated industries."
    }
];

export default function AITrainingPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <FAQSchema faqs={faqs} />
            <CourseSchema course={{
                name: "Enterprise AI Training Program",
                description: "Comprehensive AI training for organizations. Learn AI fundamentals, prompt engineering, AI integration, and transformation leadership.",
                rating: 4.9,
                reviewCount: 1247,
                duration: "PT40H",
                price: "199"
            }} />
            <BreadcrumbSchema items={[
                { name: "Home", url: "https://scalednative.com" },
                { name: "AI Training", url: "https://scalednative.com/ai-training" }
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

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6">
                <div className="max-w-6xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
                        <span className="text-sm text-white/70">#1 Rated AI Training Platform</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
                        AI Training Platform for<br />Enterprise Transformation
                    </h1>

                    <p className="text-xl text-white/60 max-w-3xl mx-auto mb-8">
                        Transform your workforce with comprehensive <strong className="text-white">AI training</strong> that delivers results.
                        Our enterprise <strong className="text-white">AI training platform</strong> features hands-on labs, industry certifications,
                        and the proven NATIVE framework methodology.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                        <Link href="/signup" className="px-8 py-4 bg-white text-black rounded-full font-semibold hover:bg-white/90 transition-colors">
                            Start Free AI Training
                        </Link>
                        <Link href="/demo" className="px-8 py-4 bg-white/5 text-white rounded-full font-semibold border border-white/10 hover:bg-white/10 transition-colors">
                            Request Enterprise Demo
                        </Link>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-white/40">
                        <span className="flex items-center gap-2"><Shield className="h-4 w-4" /> 95% Completion Rate</span>
                        <span className="flex items-center gap-2"><Shield className="h-4 w-4" /> 736% ROI</span>
                        <span className="flex items-center gap-2"><Shield className="h-4 w-4" /> HIPAA & SOC 2</span>
                    </div>
                </div>
            </section>

            {/* What is AI Training */}
            <section className="py-20 px-6 border-t border-white/5">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold mb-6 text-center">What is AI Training?</h2>
                    <p className="text-lg text-white/60 mb-6">
                        <strong className="text-white">AI training</strong> is the systematic process of educating your workforce to effectively understand,
                        use, and leverage artificial intelligence technologies in their daily work. Unlike traditional technology training,
                        AI training focuses on developing <strong className="text-white">AI-native thinking</strong> — the ability to identify opportunities where
                        AI can augment human capabilities and drive business value.
                    </p>
                    <p className="text-lg text-white/60">
                        Modern <strong className="text-white">enterprise AI training</strong> encompasses multiple disciplines: prompt engineering, AI integration patterns,
                        responsible AI practices, and transformation leadership. At ScaledNative, we deliver comprehensive
                        <strong className="text-white"> AI training courses</strong> that prepare every role in your organization for the AI-native future.
                    </p>
                </div>
            </section>

            {/* Benefits */}
            <section className="py-20 px-6 border-t border-white/5">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold mb-12 text-center">Benefits of Enterprise AI Training</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            { title: "40% Productivity Increase", desc: "Teams with AI training complete tasks 40% faster using AI-augmented workflows." },
                            { title: "736% ROI", desc: "Organizations see 736% return on investment within the first year of AI training." },
                            { title: "95% Completion Rate", desc: "Our adaptive AI training platform achieves 95% completion vs. 15% industry average." },
                            { title: "Close the AI Skills Gap", desc: "87% of organizations report an AI skills gap. AI training is the solution." },
                            { title: "Reduce AI Project Failures", desc: "70% of AI projects fail due to lack of training. Our methodology prevents this." },
                            { title: "Enterprise Compliance", desc: "HIPAA, SOC 2, and HITRUST compliant AI training for regulated industries." },
                        ].map((benefit, i) => (
                            <div key={i} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                                <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                                <p className="text-white/50 text-sm">{benefit.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Courses */}
            <section className="py-20 px-6 border-t border-white/5">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold mb-4 text-center">AI Training Courses & Certifications</h2>
                    <p className="text-center text-white/50 mb-12 max-w-2xl mx-auto">
                        Comprehensive AI training programs designed for every role in your organization
                    </p>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { name: "AI-Native Foundations", hours: "8 hours", level: "Beginner" },
                            { name: "Prompt Engineering Mastery", hours: "12 hours", level: "Intermediate" },
                            { name: "AI Integration Patterns", hours: "16 hours", level: "Advanced" },
                            { name: "AI Transformation Leadership", hours: "20 hours", level: "Executive" },
                            { name: "AI Data Strategy", hours: "15 hours", level: "Intermediate" },
                            { name: "Enterprise AI Architecture", hours: "24 hours", level: "Expert" },
                        ].map((course, i) => (
                            <div key={i} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/20 transition-colors">
                                <div className="text-xs text-white/40 uppercase tracking-wider mb-2">{course.level}</div>
                                <h3 className="text-lg font-semibold mb-1">{course.name}</h3>
                                <p className="text-sm text-white/40">{course.hours} of content</p>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-8">
                        <Link href="/training" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors">
                            View All AI Training Courses <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-20 px-6 border-t border-white/5">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold mb-12 text-center">AI Training FAQs</h2>
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
                    <h2 className="text-3xl font-bold mb-4">Start Your AI Training Journey Today</h2>
                    <p className="text-xl text-white/50 mb-8">
                        Join 50,000+ professionals who have transformed their careers with ScaledNative AI training.
                    </p>
                    <Link href="/signup" className="inline-flex px-8 py-4 bg-white text-black rounded-full font-semibold hover:bg-white/90 transition-colors">
                        Get Started Free
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
