import type { Metadata } from "next";
import Link from "next/link";
import { Shield } from "lucide-react";
import { FAQSchema, CourseSchema, BreadcrumbSchema } from "@/components/seo/StructuredData";

export const metadata: Metadata = {
    title: "Prompt Engineering Training & Certification | Learn Prompt Engineering | ScaledNative",
    description: "Master prompt engineering with ScaledNative's comprehensive training program. Learn ChatGPT, Claude, GPT-4, and enterprise AI prompting. Industry-recognized certification. Hands-on labs with real AI systems.",
    keywords: [
        "prompt engineering",
        "prompt engineering training",
        "prompt engineering certification",
        "prompt engineering course",
        "learn prompt engineering",
        "ChatGPT training",
        "GPT-4 training",
        "Claude training",
        "AI prompting"
    ],
    alternates: { canonical: "https://scalednative.com/prompt-engineering" },
    openGraph: {
        title: "Prompt Engineering Training & Certification | Learn Prompt Engineering",
        description: "Master prompt engineering with hands-on training. ChatGPT, Claude, GPT-4. Industry certification.",
        url: "https://scalednative.com/prompt-engineering",
        type: "website",
    },
};

const faqs = [
    {
        question: "What is prompt engineering and why is it important?",
        answer: "Prompt engineering is the art and science of crafting effective instructions for AI systems like ChatGPT and Claude. Effective prompting can improve AI output quality by 10x and reduce costs by 90%."
    },
    {
        question: "What will I learn in prompt engineering training?",
        answer: "Our training covers: prompt anatomy, zero-shot vs few-shot prompting, chain-of-thought techniques, role-based prompting, output formatting, prompt security, and API-level prompting."
    },
    {
        question: "Do I need coding experience for prompt engineering?",
        answer: "No coding experience is required for foundational prompt engineering. Our beginner track is designed for non-technical professionals."
    },
    {
        question: "What certification do I get after completing training?",
        answer: "You earn the Prompt Engineering Professional certificate with a shareable digital badge, LinkedIn certification, and verification URL."
    }
];

export default function PromptEngineeringPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <FAQSchema faqs={faqs} />
            <CourseSchema course={{
                name: "Prompt Engineering Mastery",
                description: "Comprehensive prompt engineering training with certification. Master ChatGPT, Claude, GPT-4.",
                rating: 4.9,
                reviewCount: 2847,
                duration: "PT16H",
                price: "199"
            }} />
            <BreadcrumbSchema items={[
                { name: "Home", url: "https://scalednative.com" },
                { name: "Training", url: "https://scalednative.com/training" },
                { name: "Prompt Engineering", url: "https://scalednative.com/prompt-engineering" }
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
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 mb-8">
                        <span className="text-sm text-purple-400">Most In-Demand AI Skill of 2025</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold mb-6">
                        Prompt Engineering<br />Training & Certification
                    </h1>

                    <p className="text-xl text-white/60 max-w-3xl mx-auto mb-8">
                        Master <strong className="text-white">prompt engineering</strong> with comprehensive training.
                        Learn to craft perfect prompts for ChatGPT, Claude, and GPT-4.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                        <Link href="/signup" className="px-8 py-4 bg-purple-500 text-white rounded-full font-semibold hover:bg-purple-600 transition-colors">
                            Start Prompt Engineering Training
                        </Link>
                        <Link href="/preview" className="px-8 py-4 bg-white/5 text-white rounded-full font-semibold border border-white/10 hover:bg-white/10 transition-colors">
                            Preview Free Lesson
                        </Link>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/40">
                        <span>✓ 16 Hours of Content</span>
                        <span>✓ Hands-on Labs</span>
                        <span>✓ Industry Certification</span>
                    </div>
                </div>
            </section>

            {/* What You'll Learn */}
            <section className="py-20 px-6 border-t border-white/5">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold mb-12 text-center">What You'll Learn</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { module: "1", title: "Prompt Fundamentals", topics: ["Prompt anatomy", "Clear instructions", "Context setting"] },
                            { module: "2", title: "Advanced Techniques", topics: ["Chain-of-thought", "Few-shot learning", "Role prompting"] },
                            { module: "3", title: "Output Formatting", topics: ["Structured outputs", "JSON/XML responses", "Table formatting"] },
                            { module: "4", title: "Enterprise Prompting", topics: ["Prompt libraries", "Template systems", "Version control"] },
                            { module: "5", title: "API Prompting", topics: ["OpenAI API", "Programmatic prompts", "Batch processing"] },
                            { module: "6", title: "Prompt Security", topics: ["Injection prevention", "Input validation", "Safe outputs"] },
                        ].map((module, i) => (
                            <div key={i} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-purple-500/30 transition-colors">
                                <div className="text-xs text-purple-400 mb-2">Module {module.module}</div>
                                <h3 className="text-lg font-semibold mb-3">{module.title}</h3>
                                <ul className="text-sm text-white/50 space-y-1">
                                    {module.topics.map((topic, j) => (
                                        <li key={j}>• {topic}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* AI Models */}
            <section className="py-20 px-6 border-t border-white/5">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-6">AI Models You'll Master</h2>
                    <div className="flex flex-wrap justify-center gap-4">
                        {["ChatGPT", "GPT-4", "Claude", "Claude 3", "Gemini", "Llama", "Mistral", "Copilot"].map((model, i) => (
                            <span key={i} className="px-4 py-2 rounded-lg bg-white/5 border border-white/10">
                                {model}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-20 px-6 border-t border-white/5">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold mb-12 text-center">Prompt Engineering FAQs</h2>
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
                    <h2 className="text-3xl font-bold mb-4">Start Your Prompt Engineering Journey</h2>
                    <p className="text-xl text-white/50 mb-8">Join 50,000+ professionals who earned their certification.</p>
                    <Link href="/signup" className="inline-flex px-8 py-4 bg-purple-500 text-white rounded-full font-semibold hover:bg-purple-600 transition-colors">
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
