import type { Metadata } from "next";
import Link from "next/link";
import { FAQSchema, BreadcrumbSchema } from "@/components/seo/StructuredData";

export const metadata: Metadata = {
    title: "AI Training for Sales Teams | Sales AI Training & Certification | ScaledNative",
    description: "AI training designed for sales professionals. Learn to use AI for prospecting, lead scoring, email personalization, competitive analysis, and sales forecasting. Hands-on labs with sales-specific AI tools.",
    keywords: ["AI training for sales", "sales AI training", "AI for sales teams", "sales enablement AI", "AI prospecting training", "sales automation AI"],
    alternates: { canonical: "https://scalednative.com/ai-training-sales" },
};

const faqs = [
    { question: "What do sales teams learn in AI training?", answer: "Sales professionals learn AI-powered prospecting, lead scoring automation, email personalization with AI, competitive intelligence gathering, sales forecasting, and CRM AI integration." },
    { question: "Which sales AI tools are covered?", answer: "Training covers ChatGPT for sales, AI email tools, AI-powered CRM features (Salesforce Einstein, HubSpot AI), sales intelligence platforms, and custom AI workflows." },
];

export default function AITrainingSalesPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <FAQSchema faqs={faqs} />
            <BreadcrumbSchema items={[{ name: "Home", url: "https://scalednative.com" }, { name: "AI Training for Sales", url: "https://scalednative.com/ai-training-sales" }]} />
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
                    <Link href="/" className="font-playfair text-2xl italic">ScaledNative<sup className="text-[10px]">™</sup></Link>
                    <Link href="/signup" className="px-4 py-2 bg-white text-black rounded-full text-sm font-medium">Get Started</Link>
                </div>
            </nav>
            <section className="pt-32 pb-20 px-6"><div className="max-w-6xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500/10 border border-rose-500/30 mb-8">
                    <span className="text-sm text-rose-400">Sales Enablement Track</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-bold mb-6">AI Training<br />for Sales Teams</h1>
                <p className="text-xl text-white/60 max-w-3xl mx-auto mb-8">Supercharge your sales with AI. <strong className="text-white">AI training for sales</strong> covers prospecting, personalization, and closing with AI assistance.</p>
                <Link href="/signup" className="px-8 py-4 bg-rose-500 text-white rounded-full font-semibold">Start Sales AI Training</Link>
            </div></section>
            <section className="py-20 px-6 border-t border-white/5"><div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold mb-12 text-center">Sales AI Curriculum</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        { title: "AI Prospecting", desc: "Identify and qualify leads faster" },
                        { title: "Email Personalization", desc: "AI-powered outreach at scale" },
                        { title: "Competitive Intel", desc: "Gather insights with AI research" },
                        { title: "Sales Forecasting", desc: "Predict outcomes with AI analytics" },
                        { title: "Objection Handling", desc: "AI-assisted response strategies" },
                        { title: "CRM Integration", desc: "Maximize Salesforce/HubSpot AI" },
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
