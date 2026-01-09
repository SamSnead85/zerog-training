import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "AI Training Change Management | L&D Transformation Guide | ScaledNative",
    description: "Change management strategies for AI training initiatives. Stakeholder buy-in, communication plans, resistance handling, and success measurement for training rollouts.",
    keywords: ["AI training change management", "L&D change management", "training rollout strategy", "AI adoption change management"],
    alternates: { canonical: "https://scalednative.com/insights/ai-training-change-management" },
};

export default function ChangeManagementPage() {
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
                    <div className="text-sm text-white/40 uppercase tracking-wider mb-4">Insights • Change Management</div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">AI Training Change Management</h1>
                    <p className="text-xl text-white/60 mb-12">Drive adoption and engagement for AI training initiatives.</p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">The ADKAR Framework for AI Training</h2>
                    <div className="space-y-4 mb-12">
                        {[
                            { letter: "A", word: "Awareness", desc: "Communicate the 'why' - AI transformation imperative" },
                            { letter: "D", word: "Desire", desc: "Connect AI skills to career growth and job security" },
                            { letter: "K", word: "Knowledge", desc: "Provide training that's practical and role-relevant" },
                            { letter: "A", word: "Ability", desc: "Enable practice through hands-on labs and real projects" },
                            { letter: "R", word: "Reinforcement", desc: "Recognize achievements and measure ongoing usage" },
                        ].map((item, i) => (
                            <div key={i} className="flex gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                                <span className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold flex-shrink-0">{item.letter}</span>
                                <div>
                                    <h3 className="font-semibold">{item.word}</h3>
                                    <p className="text-white/50 text-sm">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <h2 className="text-2xl font-bold mt-8 mb-4">Common Resistance Points</h2>
                    <ul className="text-white/70 space-y-2 mb-8">
                        <li><strong>"AI will replace my job"</strong> → Frame as augmentation, not replacement</li>
                        <li><strong>"I don't have time"</strong> → Show ROI of time invested vs time saved</li>
                        <li><strong>"It's too technical"</strong> → Emphasize practical, role-based approach</li>
                        <li><strong>"We tried before"</strong> → Differentiate approach with completion data</li>
                    </ul>

                    <Link href="/demo" className="inline-flex px-6 py-3 bg-white text-black rounded-full font-medium">Plan Your Rollout</Link>
                </div>
            </article>
            <footer className="py-12 px-8 border-t border-white/5"><div className="mx-auto max-w-6xl flex justify-between items-center">
                <span className="font-playfair text-lg italic">ScaledNative<sup className="text-[8px]">™</sup></span>
                <div className="text-xs text-white/20">© 2025 ScaledNative™</div>
            </div></footer>
        </div>
    );
}
