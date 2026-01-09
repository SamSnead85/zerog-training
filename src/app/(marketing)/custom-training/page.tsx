import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Custom AI Training | Tailored AI Training Programs | ScaledNative",
    description: "Custom AI training programs tailored to your organization. Content customization, industry-specific examples, and branded learning experiences.",
    keywords: ["custom AI training", "tailored AI training", "bespoke AI training", "customized AI curriculum", "enterprise custom training"],
    alternates: { canonical: "https://scalednative.com/custom-training" },
};

export default function CustomTrainingPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
                    <Link href="/" className="font-playfair text-2xl italic">ScaledNative<sup className="text-[10px]">™</sup></Link>
                    <Link href="/demo" className="px-4 py-2 bg-white text-black rounded-full text-sm font-medium">Get Demo</Link>
                </div>
            </nav>
            <section className="pt-32 pb-20 px-6"><div className="max-w-6xl mx-auto text-center">
                <h1 className="text-5xl md:text-7xl font-bold mb-6">Custom<br />AI Training</h1>
                <p className="text-xl text-white/60 max-w-3xl mx-auto mb-8">Training tailored to your world. Industry examples, branded experience, your use cases.</p>
                <Link href="/demo" className="px-8 py-4 bg-violet-600 text-white rounded-full font-semibold">Discuss Customization</Link>
            </div></section>
            <section className="py-20 px-6 border-t border-white/5"><div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-8 text-center">Customization Options</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    {[
                        { title: "Industry Examples", desc: "Real scenarios from your sector" },
                        { title: "Branded Experience", desc: "Your logo, colors, terminology" },
                        { title: "Tool Integration", desc: "Your specific AI tools included" },
                        { title: "Policy Alignment", desc: "Your AI governance incorporated" },
                        { title: "Role Customization", desc: "Your job families reflected" },
                        { title: "Custom Assessments", desc: "Your competency framework" },
                    ].map((item, i) => (
                        <div key={i} className="p-6 rounded-xl bg-white/[0.02] border border-white/5">
                            <h3 className="font-semibold mb-2">{item.title}</h3>
                            <p className="text-white/60 text-sm">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div></section>
            <footer className="py-12 px-8 border-t border-white/5"><div className="mx-auto max-w-6xl flex justify-between items-center">
                <span className="font-playfair text-lg italic">ScaledNative<sup className="text-[8px]">™</sup></span>
                <div className="text-xs text-white/20">© 2025 ScaledNative™</div>
            </div></footer>
        </div>
    );
}
