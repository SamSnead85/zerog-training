import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "AI Use Cases by Department | Departmental AI Applications | ScaledNative",
    description: "AI use cases organized by department. Discover how HR, Finance, Marketing, Sales, Operations, IT, and other teams can leverage AI for productivity gains.",
    keywords: ["AI use cases by department", "departmental AI", "AI applications by team", "AI use cases enterprise", "AI for business departments"],
    alternates: { canonical: "https://scalednative.com/insights/ai-use-cases-by-department" },
};

export default function AIUseCasesByDepartmentPage() {
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
                    <div className="text-sm text-white/40 uppercase tracking-wider mb-4">Insights • Use Cases</div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">AI Use Cases by Department</h1>
                    <p className="text-xl text-white/60 mb-12">Discover AI applications for every team.</p>

                    <div className="space-y-8">
                        {[
                            { dept: "Sales", uses: ["Lead scoring", "Email personalization", "Sales forecasting", "Competitive intelligence"] },
                            { dept: "Marketing", uses: ["Content creation", "Ad copy optimization", "Customer segmentation", "Campaign analysis"] },
                            { dept: "HR", uses: ["Resume screening", "Employee Q&A", "Policy generation", "Performance insights"] },
                            { dept: "Finance", uses: ["Expense analysis", "Forecasting", "Audit support", "Variance explanations"] },
                            { dept: "Operations", uses: ["Process documentation", "Demand forecasting", "Quality analysis", "Vendor management"] },
                            { dept: "IT", uses: ["Ticket routing", "Knowledge base", "Code assistance", "Security monitoring"] },
                        ].map((item, i) => (
                            <div key={i} className="p-6 rounded-xl bg-white/[0.02] border border-white/5">
                                <h3 className="text-xl font-bold mb-4">{item.dept}</h3>
                                <div className="grid grid-cols-2 gap-2">
                                    {item.uses.map((use, j) => (
                                        <span key={j} className="text-sm text-white/60">• {use}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12">
                        <Link href="/demo" className="inline-flex px-6 py-3 bg-white text-black rounded-full font-medium">Get Custom Use Case Assessment</Link>
                    </div>
                </div>
            </article>
            <footer className="py-12 px-8 border-t border-white/5"><div className="mx-auto max-w-6xl flex justify-between items-center">
                <span className="font-playfair text-lg italic">ScaledNative<sup className="text-[8px]">™</sup></span>
                <div className="text-xs text-white/20">© 2025 ScaledNative™</div>
            </div></footer>
        </div>
    );
}
