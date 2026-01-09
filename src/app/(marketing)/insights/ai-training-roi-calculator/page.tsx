import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "AI Training ROI Calculator | Calculate Your AI Training Investment | ScaledNative",
    description: "Calculate the ROI of AI training for your organization. See projected productivity gains, cost savings, and payback period. Based on real enterprise data.",
    keywords: ["AI training ROI", "AI training calculator", "AI training investment", "ROI of AI training", "AI training cost benefit", "AI training payback"],
    alternates: { canonical: "https://scalednative.com/insights/ai-training-roi-calculator" },
};

export default function AITrainingROIPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
                    <Link href="/" className="font-playfair text-2xl italic">ScaledNative<sup className="text-[10px]">™</sup></Link>
                    <Link href="/demo" className="px-4 py-2 bg-white text-black rounded-full text-sm font-medium">Get Demo</Link>
                </div>
            </nav>

            <section className="pt-32 pb-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="text-sm text-white/40 uppercase tracking-wider mb-4 text-center">Insights • ROI Analysis</div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">AI Training ROI Calculator</h1>
                    <p className="text-xl text-white/60 mb-12 text-center">See the business impact of investing in AI training for your workforce.</p>

                    <div className="p-8 rounded-2xl bg-white/[0.03] border border-white/10 mb-12">
                        <h2 className="text-xl font-bold mb-6">Average Enterprise Results</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                                <div className="text-4xl font-bold text-emerald-400 mb-2">736%</div>
                                <p className="text-white/60">Average ROI in Year 1</p>
                            </div>
                            <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                                <div className="text-4xl font-bold text-blue-400 mb-2">40%</div>
                                <p className="text-white/60">Productivity Increase</p>
                            </div>
                            <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
                                <div className="text-4xl font-bold text-purple-400 mb-2">3.2 mo</div>
                                <p className="text-white/60">Average Payback Period</p>
                            </div>
                            <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20">
                                <div className="text-4xl font-bold text-orange-400 mb-2">95%</div>
                                <p className="text-white/60">Training Completion Rate</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 rounded-2xl bg-white/[0.03] border border-white/10 mb-12">
                        <h2 className="text-xl font-bold mb-4">How We Calculate ROI</h2>
                        <ul className="text-white/70 space-y-2">
                            <li><strong>Productivity Value:</strong> (Hours saved × Employee hourly cost × Number of employees)</li>
                            <li><strong>Error Reduction:</strong> (Cost of errors × Reduction percentage)</li>
                            <li><strong>Faster Competency:</strong> (Reduced ramp time × New hire cost)</li>
                            <li><strong>Less:</strong> Training investment</li>
                        </ul>
                    </div>

                    <div className="text-center">
                        <p className="text-white/60 mb-6">Get a customized ROI analysis for your organization.</p>
                        <Link href="/demo" className="inline-flex px-8 py-4 bg-white text-black rounded-full font-semibold">
                            Request Custom ROI Analysis
                        </Link>
                    </div>
                </div>
            </section>

            <footer className="py-12 px-8 border-t border-white/5"><div className="mx-auto max-w-6xl flex justify-between items-center">
                <span className="font-playfair text-lg italic">ScaledNative<sup className="text-[8px]">™</sup></span>
                <div className="text-xs text-white/20">© 2025 ScaledNative™</div>
            </div></footer>
        </div>
    );
}
