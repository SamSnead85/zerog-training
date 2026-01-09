import type { Metadata } from "next";
import Link from "next/link";
import { FAQSchema, BreadcrumbSchema } from "@/components/seo/StructuredData";

export const metadata: Metadata = {
    title: "LinkedIn Learning Alternative | Better Than LinkedIn Learning for AI | ScaledNative",
    description: "Looking for a LinkedIn Learning alternative? ScaledNative offers enterprise AI training with 95% completion rates, hands-on labs, and industry certifications. Purpose-built for AI transformation.",
    keywords: ["LinkedIn Learning alternative", "LinkedIn Learning for business alternative", "better than LinkedIn Learning", "LinkedIn Learning competitor", "enterprise training alternative"],
    alternates: { canonical: "https://scalednative.com/linkedin-learning-alternative" },
};

const faqs = [
    { question: "Why is ScaledNative a better LinkedIn Learning alternative?", answer: "ScaledNative is purpose-built for AI training with 95% completion rates, hands-on labs, and enterprise compliance. LinkedIn Learning offers generic content with passive video consumption." },
    { question: "How does completion rate compare?", answer: "ScaledNative achieves 95% completion vs LinkedIn Learning's estimated 20% average. Our adaptive learning and hands-on approach drives engagement." },
];

export default function LinkedInLearningAlternativePage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <FAQSchema faqs={faqs} />
            <BreadcrumbSchema items={[{ name: "Home", url: "https://scalednative.com" }, { name: "LinkedIn Learning Alternative", url: "https://scalednative.com/linkedin-learning-alternative" }]} />
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
                    <Link href="/" className="font-playfair text-2xl italic">ScaledNative<sup className="text-[10px]">™</sup></Link>
                    <div className="hidden md:flex gap-10"><Link href="/native" className="text-sm text-white/40 hover:text-white">Framework</Link><Link href="/pricing" className="text-sm text-white/40 hover:text-white">Pricing</Link></div>
                    <Link href="/demo" className="px-4 py-2 bg-white text-black rounded-full text-sm font-medium">Get Demo</Link>
                </div>
            </nav>
            <section className="pt-32 pb-20 px-6"><div className="max-w-6xl mx-auto text-center">
                <h1 className="text-5xl md:text-7xl font-bold mb-6">Looking for a<br /><span className="text-blue-400">LinkedIn Learning Alternative</span>?</h1>
                <p className="text-xl text-white/60 max-w-3xl mx-auto mb-8">ScaledNative: 95% completion rate, hands-on AI labs, enterprise compliance. Better than LinkedIn Learning for AI training.</p>
                <Link href="/demo" className="px-8 py-4 bg-blue-500 text-white rounded-full font-semibold">See the Difference</Link>
            </div></section>
            <section className="py-20 px-6 border-t border-white/5"><div className="max-w-5xl mx-auto">
                <h2 className="text-3xl font-bold mb-12 text-center">ScaledNative vs LinkedIn Learning</h2>
                <table className="w-full text-left text-sm"><tbody>
                    <tr className="border-b border-white/5"><td className="py-3 px-4">Completion Rate</td><td className="py-3 px-4 text-emerald-400">95%</td><td className="py-3 px-4 text-white/40">20%</td></tr>
                    <tr className="border-b border-white/5"><td className="py-3 px-4">AI Content Focus</td><td className="py-3 px-4 text-emerald-400">Purpose-built</td><td className="py-3 px-4 text-white/40">Generic</td></tr>
                    <tr className="border-b border-white/5"><td className="py-3 px-4">Hands-on Labs</td><td className="py-3 px-4 text-emerald-400">✓</td><td className="py-3 px-4 text-white/40">❌</td></tr>
                    <tr className="border-b border-white/5"><td className="py-3 px-4">Enterprise SSO</td><td className="py-3 px-4 text-emerald-400">✓ Full</td><td className="py-3 px-4 text-white/40">Limited</td></tr>
                </tbody></table>
            </div></section>
            <section className="py-20 px-6 border-t border-white/5"><div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-12 text-center">FAQs</h2>
                {faqs.map((faq, i) => (<details key={i} className="group p-6 rounded-2xl bg-white/[0.02] border border-white/5 mb-4"><summary className="font-semibold cursor-pointer flex justify-between">{faq.question}<span className="group-open:rotate-45">+</span></summary><p className="mt-4 text-white/60">{faq.answer}</p></details>))}
            </div></section>
            <footer className="py-12 px-8 border-t border-white/5"><div className="mx-auto max-w-6xl flex justify-between items-center">
                <span className="font-playfair text-lg italic">ScaledNative<sup className="text-[8px]">™</sup></span>
                <div className="text-xs text-white/20">© 2025 ScaledNative™</div>
            </div></footer>
        </div>
    );
}
