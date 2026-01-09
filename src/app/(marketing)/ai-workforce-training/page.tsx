import type { Metadata } from "next";
import Link from "next/link";
import { FAQSchema, BreadcrumbSchema } from "@/components/seo/StructuredData";

export const metadata: Metadata = {
    title: "AI Workforce Training | Train Your Entire Workforce on AI | ScaledNative",
    description: "Enterprise AI workforce training for organizations of all sizes. Role-based learning paths, hands-on labs, and certification for every employee. 95% completion rate, 736% ROI.",
    keywords: ["AI workforce training", "train workforce on AI", "employee AI training", "corporate AI skills", "AI training for employees", "enterprise workforce AI"],
    alternates: { canonical: "https://scalednative.com/ai-workforce-training" },
};

const faqs = [
    { question: "What is AI workforce training?", answer: "AI workforce training is the systematic process of educating all employees — from entry-level to executives — on how to effectively work with AI technologies in their roles." },
    { question: "How quickly can we train our entire workforce?", answer: "Timeline depends on organization size. Typical: 1,000 employees in 4-6 weeks, 5,000 in 8-12 weeks, 10,000+ in 12-16 weeks with our scalable platform and dedicated support." },
];

export default function AIWorkforceTrainingPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <FAQSchema faqs={faqs} />
            <BreadcrumbSchema items={[{ name: "Home", url: "https://scalednative.com" }, { name: "AI Workforce Training", url: "https://scalednative.com/ai-workforce-training" }]} />
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
                    <Link href="/" className="font-playfair text-2xl italic">ScaledNative<sup className="text-[10px]">™</sup></Link>
                    <Link href="/demo" className="px-4 py-2 bg-white text-black rounded-full text-sm font-medium">Get Demo</Link>
                </div>
            </nav>
            <section className="pt-32 pb-20 px-6"><div className="max-w-6xl mx-auto text-center">
                <h1 className="text-5xl md:text-7xl font-bold mb-6">AI Workforce<br />Training</h1>
                <p className="text-xl text-white/60 max-w-3xl mx-auto mb-8">Train your <strong className="text-white">entire workforce on AI</strong>. Role-based paths ensure everyone gets relevant skills. 95% completion. 736% ROI.</p>
                <Link href="/demo" className="px-8 py-4 bg-white text-black rounded-full font-semibold">Request Demo</Link>
            </div></section>
            <section className="py-20 px-6 border-t border-white/5"><div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold mb-12 text-center">Role-Based Learning Paths</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {["Executives", "Managers", "Sales", "Marketing", "HR", "Finance", "Operations", "IT", "Customer Service", "Legal", "R&D", "All Employees"].map((role, i) => (
                        <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-center">
                            <span className="text-sm">{role}</span>
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
