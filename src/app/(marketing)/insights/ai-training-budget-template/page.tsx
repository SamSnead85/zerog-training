import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "AI Training Budget Template | L&D Budget Planning | ScaledNative",
    description: "AI training budget template and planning guide. Calculate costs, build business cases, and allocate resources for enterprise AI training programs.",
    keywords: ["AI training budget", "L&D budget template", "training cost calculator", "AI training ROI", "learning budget planning"],
    alternates: { canonical: "https://scalednative.com/insights/ai-training-budget-template" },
};

export default function BudgetTemplatePage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
                    <Link href="/" className="font-playfair text-2xl italic">ScaledNative<sup className="text-[10px]">™</sup></Link>
                    <Link href="/demo" className="px-4 py-2 bg-white text-black rounded-full text-sm font-medium">Get Demo</Link>
                </div>
            </nav>
            <article className="pt-32 pb-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="text-sm text-white/40 uppercase tracking-wider mb-4">Insights • Resource</div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">AI Training Budget Template</h1>
                    <p className="text-xl text-white/60 mb-12">Plan and justify AI training investments.</p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">Budget Categories</h2>
                    <div className="space-y-4 mb-12">
                        {[
                            { category: "Platform Licensing", example: "$15-40 per user/month" },
                            { category: "Implementation", example: "1-time setup + integration" },
                            { category: "Content Development", example: "Custom content if needed" },
                            { category: "Change Management", example: "Internal comms + champions" },
                            { category: "Time Investment", example: "2-4 hours/employee/month" },
                            { category: "Success Management", example: "Dedicated support" },
                        ].map((item, i) => (
                            <div key={i} className="flex justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5">
                                <span className="font-medium">{item.category}</span>
                                <span className="text-white/50">{item.example}</span>
                            </div>
                        ))}
                    </div>

                    <h2 className="text-2xl font-bold mt-8 mb-4">Sample Budget (500 Employees)</h2>
                    <div className="overflow-x-auto mb-12">
                        <table className="w-full text-left text-sm">
                            <tbody>
                                {[
                                    ["Annual Platform", "$90,000-$180,000"],
                                    ["Implementation", "$10,000-$25,000"],
                                    ["Change Management", "$5,000-$10,000"],
                                    ["Total Year 1", "$105,000-$215,000"],
                                    ["Per Employee", "$210-$430/year"],
                                ].map((row, i) => (
                                    <tr key={i} className="border-b border-white/5">
                                        <td className="py-3 px-4 font-medium">{row[0]}</td>
                                        <td className="py-3 px-4 text-emerald-400 text-right">{row[1]}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <Link href="/demo" className="inline-flex px-6 py-3 bg-white text-black rounded-full font-medium">Get Custom Quote</Link>
                </div>
            </article>
            <footer className="py-12 px-8 border-t border-white/5"><div className="mx-auto max-w-6xl flex justify-between items-center">
                <span className="font-playfair text-lg italic">ScaledNative<sup className="text-[8px]">™</sup></span>
                <div className="text-xs text-white/20">© 2025 ScaledNative™</div>
            </div></footer>
        </div>
    );
}
