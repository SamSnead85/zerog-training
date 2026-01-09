import type { Metadata } from "next";
import Link from "next/link";
import { FAQSchema, BreadcrumbSchema } from "@/components/seo/StructuredData";

export const metadata: Metadata = {
    title: "Coursera Alternative for Enterprise | Better Than Coursera for Business | ScaledNative",
    description: "ScaledNative is the enterprise-focused Coursera alternative with hands-on AI labs, 95% completion rates, and dedicated success managers. Purpose-built for AI transformation.",
    keywords: ["Coursera alternative", "Coursera for business alternative", "better than Coursera", "enterprise AI training"],
    alternates: { canonical: "https://scalednative.com/coursera-alternative" },
};

const faqs = [
    { question: "Why is ScaledNative a better Coursera alternative?", answer: "Purpose-built for enterprise AI training with hands-on labs, 95% completion rates, enterprise compliance (HIPAA, SOC 2), and dedicated success managers." },
    { question: "How is ScaledNative different from Coursera?", answer: "Coursera offers academic courses. ScaledNative provides practical enterprise AI training with faster time-to-competency and measurable business outcomes." },
];

export default function CourseraAlternativePage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <FAQSchema faqs={faqs} />
            <BreadcrumbSchema items={[{ name: "Home", url: "https://scalednative.com" }, { name: "Coursera Alternative", url: "https://scalednative.com/coursera-alternative" }]} />
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
                    <Link href="/" className="font-playfair text-2xl italic">ScaledNative<sup className="text-[10px]">™</sup></Link>
                    <div className="hidden md:flex gap-10"><Link href="/native" className="text-sm text-white/40 hover:text-white">Framework</Link><Link href="/pricing" className="text-sm text-white/40 hover:text-white">Pricing</Link></div>
                    <Link href="/demo" className="px-4 py-2 bg-white text-black rounded-full text-sm font-medium">Get Demo</Link>
                </div>
            </nav>
            <section className="pt-32 pb-20 px-6"><div className="max-w-6xl mx-auto text-center">
                <h1 className="text-5xl md:text-7xl font-bold mb-6">Looking for a<br /><span className="text-blue-400">Coursera Alternative</span>?</h1>
                <p className="text-xl text-white/60 max-w-3xl mx-auto mb-8">ScaledNative: enterprise-focused AI training. 95% completion rate. Practical, hands-on learning.</p>
                <Link href="/demo" className="px-8 py-4 bg-blue-500 text-white rounded-full font-semibold">See the Difference</Link>
            </div></section>
            <section className="py-20 px-6 border-t border-white/5"><div className="max-w-5xl mx-auto">
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="p-6 rounded-2xl bg-red-500/10 border border-red-500/20">
                        <h3 className="font-semibold mb-2 text-red-400">❌ Coursera for Business</h3>
                        <ul className="text-white/50 text-sm space-y-1"><li>• Academic university courses</li><li>• Theory-heavy, lecture-based</li><li>• 20% completion rate</li></ul>
                    </div>
                    <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                        <h3 className="font-semibold mb-2 text-emerald-400">✓ ScaledNative</h3>
                        <ul className="text-white/50 text-sm space-y-1"><li>• Purpose-built enterprise training</li><li>• Hands-on labs and practice</li><li>• 95% completion rate</li></ul>
                    </div>
                </div>
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
