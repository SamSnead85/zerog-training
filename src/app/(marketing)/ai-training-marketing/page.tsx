import type { Metadata } from "next";
import Link from "next/link";
import { FAQSchema, BreadcrumbSchema } from "@/components/seo/StructuredData";

export const metadata: Metadata = {
    title: "AI Training for Marketing | Marketing AI Training & Automation | ScaledNative",
    description: "AI training for marketing professionals. Learn AI content creation, campaign optimization, marketing analytics, and personalization at scale. Hands-on labs with marketing AI tools.",
    keywords: ["AI training for marketing", "marketing AI training", "AI for marketers", "content AI training", "marketing automation AI", "AI marketing tools training"],
    alternates: { canonical: "https://scalednative.com/ai-training-marketing" },
};

const faqs = [
    { question: "What do marketers learn?", answer: "Marketers learn AI content creation, campaign optimization, audience segmentation, personalization at scale, marketing analytics with AI, and automation workflows." },
    { question: "Which marketing AI tools are covered?", answer: "Training covers ChatGPT for content, Jasper, Copy.ai, Midjourney for images, AI analytics tools, and integrations with marketing platforms like HubSpot and Marketo." },
];

export default function AITrainingMarketingPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <FAQSchema faqs={faqs} />
            <BreadcrumbSchema items={[{ name: "Home", url: "https://scalednative.com" }, { name: "AI Training for Marketing", url: "https://scalednative.com/ai-training-marketing" }]} />
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
                    <Link href="/" className="font-playfair text-2xl italic">ScaledNative<sup className="text-[10px]">™</sup></Link>
                    <Link href="/signup" className="px-4 py-2 bg-white text-black rounded-full text-sm font-medium">Get Started</Link>
                </div>
            </nav>
            <section className="pt-32 pb-20 px-6"><div className="max-w-6xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/30 mb-8">
                    <span className="text-sm text-fuchsia-400">Marketing Excellence Track</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-bold mb-6">AI Training<br />for Marketing</h1>
                <p className="text-xl text-white/60 max-w-3xl mx-auto mb-8">10x your marketing output with AI. <strong className="text-white">AI training for marketing</strong> covers content, campaigns, and analytics.</p>
                <Link href="/signup" className="px-8 py-4 bg-fuchsia-500 text-white rounded-full font-semibold">Start Marketing AI Training</Link>
            </div></section>
            <section className="py-20 px-6 border-t border-white/5"><div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold mb-12 text-center">Marketing AI Curriculum</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        { title: "AI Content Creation", desc: "Blog posts, emails, social media" },
                        { title: "Campaign Optimization", desc: "A/B testing, budget allocation" },
                        { title: "Personalization", desc: "Segment and personalize at scale" },
                        { title: "Visual AI", desc: "Images, videos, design with AI" },
                        { title: "Marketing Analytics", desc: "AI-powered insights and attribution" },
                        { title: "SEO with AI", desc: "Keyword research, content optimization" },
                    ].map((topic, i) => (
                        <div key={i} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                            <h3 className="font-semibold mb-2">{topic.title}</h3>
                            <p className="text-sm text-white/50">{topic.desc}</p>
                        </div>
                    ))}
                </div>
            </div></section>
            <section className="py-20 px-6 border-t border-white/5"><div className="max-w-4xl mx-auto">
                {faqs.map((faq, i) => (<details key={i} className="group p-6 rounded-2xl bg-white/[0.02] border border-white/5 mb-4"><summary className="font-semibold cursor-pointer flex justify-between">{faq.question}<span className="group-open:rotate-45">+</span></summary><p className="mt-4 text-white/60">{faq.answer}</p></details>))}
            </div></section>
            <footer className="py-12 px-8 border-t border-white/5"><div className="mx-auto max-w-6xl flex justify-between items-center">
                <span className="font-playfair text-lg italic">ScaledNative<sup className="text-[8px]">™</sup></span>
                <div className="text-xs text-white/20">© 2025 ScaledNative™</div>
            </div></footer>
        </div>
    );
}
