import Link from "next/link";
import { ArrowLeft, Clock, Linkedin, Twitter, Copy, ChevronRight, XCircle, CheckCircle, Layers, Shield, Users, Rocket } from "lucide-react";

export const metadata = {
    title: "Why 70% of AI Initiatives Fail: The Foundation First Approach | ScaledNative",
    description:
        "Most AI initiatives fail not because of technology but because of people and process. Learn the Foundation First approach that separates successful transformations from expensive failures.",
    keywords: [
        "AI initiative failure",
        "AI transformation",
        "AI adoption strategy",
        "enterprise AI",
        "AI implementation",
        "Foundation First",
    ],
    openGraph: {
        title: "Why 70% of AI Initiatives Fail: The Foundation First Approach",
        description: "The real reasons AI initiatives fail and how to avoid becoming a statistic.",
        type: "article",
        authors: ["ScaledNative Research"],
        publishedTime: "2024-12-20",
    },
};

export default function AIInitiativesFailArticle() {
    const tableOfContents = [
        { id: "seventy-percent", title: "The 70% Problem" },
        { id: "real-reasons", title: "The Real Reasons" },
        { id: "foundation-first", title: "Foundation First" },
        { id: "three-pillars", title: "The Three Pillars" },
        { id: "sequence-matters", title: "Why Sequence Matters" },
        { id: "path-forward", title: "The Path Forward" },
    ];

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Reading Progress Bar */}
            <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-white/10">
                <div className="h-full bg-gradient-to-r from-rose-500 to-pink-500 w-0" id="reading-progress" />
            </div>

            {/* Navigation */}
            <nav className="fixed top-1 left-0 right-0 z-40 bg-black/80 backdrop-blur-xl border-b border-white/5">
                <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
                    <Link href="/" className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors">
                        <ArrowLeft className="h-4 w-4" />
                        ScaledNative
                    </Link>
                    <div className="flex items-center gap-4">
                        <span className="text-xs text-white/30 uppercase tracking-wider hidden sm:block">Insights</span>
                        <div className="flex items-center gap-2">
                            <button className="p-2 rounded-full hover:bg-white/10 transition-colors"><Linkedin className="h-4 w-4 text-white/40" /></button>
                            <button className="p-2 rounded-full hover:bg-white/10 transition-colors"><Twitter className="h-4 w-4 text-white/40" /></button>
                            <button className="p-2 rounded-full hover:bg-white/10 transition-colors"><Copy className="h-4 w-4 text-white/40" /></button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero */}
            <header className="relative pt-24 pb-16 px-6 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-rose-600/20 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-pink-600/20 rounded-full blur-3xl" />
                </div>

                <div className="relative z-10 mx-auto max-w-4xl">
                    <div className="flex items-center gap-3 mb-8">
                        <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-rose-500/20 to-pink-500/20 text-rose-300 text-xs font-medium uppercase tracking-wider border border-rose-500/20">
                            Strategy
                        </span>
                        <span className="text-xs text-white/30">December 2024</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-8 bg-gradient-to-br from-white via-white to-white/60 bg-clip-text text-transparent">
                        Why 70% of AI Initiatives Fail: The Foundation First Approach
                    </h1>

                    <p className="text-xl md:text-2xl text-white/50 mb-10 leading-relaxed max-w-3xl">
                        The technology works. The budgets are approved. The vendors are eager.
                        So why do most AI initiatives fail to deliver value?
                    </p>

                    <div className="flex flex-wrap items-center gap-6">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center">
                                <XCircle className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-white">ScaledNative Research</p>
                                <p className="text-xs text-white/40">Transformation Strategy</p>
                            </div>
                        </div>
                        <div className="h-8 w-px bg-white/10 hidden sm:block" />
                        <div className="flex items-center gap-2 text-sm text-white/40">
                            <Clock className="h-4 w-4" />
                            <span>8 min read</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Content */}
            <div className="relative px-6 pb-24">
                <div className="mx-auto max-w-6xl">
                    <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-16">
                        <article className="max-w-3xl">
                            <section id="seventy-percent" className="mb-16">
                                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">The 70% Problem</h2>
                                <p className="text-lg text-white/70 leading-relaxed mb-6 first-letter:text-5xl first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-rose-400">
                                    Study after study confirms the same uncomfortable truth: approximately 70% of AI initiatives
                                    fail to deliver their expected value. McKinsey, Gartner, BCG, and countless others have
                                    documented this pattern. The number varies slightly by methodology, but the conclusion
                                    is consistent. Most AI projects do not succeed.
                                </p>
                                <p className="text-lg text-white/70 leading-relaxed mb-6">
                                    This is puzzling because the technology demonstrably works. AI models are more capable than
                                    ever. Cloud platforms make deployment accessible. Vendors offer turnkey solutions for nearly
                                    every use case. If the technology works, why do the initiatives fail?
                                </p>

                                {/* Failure/Success Visual */}
                                <div className="my-10 flex gap-4">
                                    <div className="flex-1 p-5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-center">
                                        <p className="text-4xl font-bold text-rose-400 mb-2">70%</p>
                                        <p className="text-sm text-white/50">Fail to deliver value</p>
                                    </div>
                                    <div className="flex-1 p-5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center">
                                        <p className="text-4xl font-bold text-emerald-400 mb-2">30%</p>
                                        <p className="text-sm text-white/50">Achieve expected ROI</p>
                                    </div>
                                </div>
                            </section>

                            <section id="real-reasons" className="mb-16">
                                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">The Real Reasons</h2>
                                <p className="text-lg text-white/70 leading-relaxed mb-6">
                                    When AI initiatives fail, the post-mortems typically blame data quality, integration
                                    complexity, or unclear requirements. These are real challenges, but they are symptoms,
                                    not root causes. The actual failure points are more fundamental:
                                </p>

                                <div className="space-y-4 mb-8">
                                    {[
                                        { title: "People are not ready", desc: "Employees lack the skills to use AI effectively, fear AI will replace them, or simply do not understand what AI can and cannot do." },
                                        { title: "Processes are not adapted", desc: "Existing workflows assume human execution. AI is layered on top rather than integrated into redesigned processes." },
                                        { title: "Culture resists change", desc: "Organizations reward the old ways of working. Early AI adopters face friction rather than support." },
                                        { title: "Governance is absent", desc: "No frameworks exist for AI decision-making, risk management, or quality assurance. Each team invents their own approach." },
                                    ].map((item, i) => (
                                        <div key={i} className="flex gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-rose-500/20 flex items-center justify-center">
                                                <XCircle className="h-4 w-4 text-rose-400" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-white mb-1">{item.title}</h4>
                                                <p className="text-sm text-white/60 leading-relaxed">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <blockquote className="my-10 pl-6 border-l-4 border-rose-500 py-4 bg-gradient-to-r from-rose-500/5 to-transparent">
                                    <p className="text-xl md:text-2xl text-white/90 italic font-light leading-relaxed">
                                        "AI initiatives fail not because of technology, but because organizations try to insert
                                        AI into foundations that cannot support it."
                                    </p>
                                </blockquote>
                            </section>

                            <section id="foundation-first" className="mb-16">
                                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">Foundation First</h2>
                                <p className="text-lg text-white/70 leading-relaxed mb-6">
                                    The organizations that succeed with AI share a counterintuitive approach: they invest in
                                    foundations before they invest in applications. They train their people, adapt their processes,
                                    and establish governance before they deploy production AI systems.
                                </p>
                                <p className="text-lg text-white/70 leading-relaxed mb-6">
                                    This feels slow. When executives see competitors announcing AI initiatives, the pressure is
                                    to move fast, buy technology, and announce wins. Foundation work is invisible. It does not
                                    generate press releases.
                                </p>

                                <div className="my-10 p-6 rounded-2xl bg-gradient-to-br from-rose-500/10 to-pink-500/10 border border-rose-500/20">
                                    <h4 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-3">The Paradox</h4>
                                    <p className="text-white/80">
                                        Organizations that move slowly on foundations move faster overall. Their AI initiatives
                                        succeed the first time rather than requiring multiple expensive restarts.
                                    </p>
                                </div>
                            </section>

                            <section id="three-pillars" className="mb-16">
                                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">The Three Pillars</h2>
                                <p className="text-lg text-white/70 leading-relaxed mb-8">
                                    Foundation First rests on three pillars that must be established before AI deployment:
                                </p>

                                <div className="space-y-4 mb-8">
                                    {[
                                        { icon: Users, title: "AI-Ready People", desc: "Workforce training that builds understanding, reduces fear, and develops practical skills. Not just prompt engineering, but AI fluency across all roles." },
                                        { icon: Layers, title: "AI-Ready Processes", desc: "Workflows redesigned to leverage AI capabilities. Not AI layered onto human processes, but human-AI collaboration designed from first principles." },
                                        { icon: Shield, title: "AI-Ready Governance", desc: "Frameworks for AI decision-making, risk management, quality assurance, and continuous improvement. Clear policies before unclear situations arise." },
                                    ].map((item, i) => (
                                        <div key={i} className="flex gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
                                            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center">
                                                <item.icon className="h-5 w-5 text-white" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-white mb-1">{item.title}</h4>
                                                <p className="text-sm text-white/60 leading-relaxed">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section id="sequence-matters" className="mb-16">
                                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">Why Sequence Matters</h2>
                                <p className="text-lg text-white/70 leading-relaxed mb-6">
                                    The order is not arbitrary. People must come first because processes depend on human
                                    judgment about where AI fits. Processes must come second because governance needs to
                                    protect and enable specific workflows. Governance comes third because it must be grounded
                                    in practical reality rather than theoretical risk.
                                </p>

                                {/* Sequence Visual */}
                                <div className="my-10 flex items-center justify-center gap-4">
                                    {["People", "Process", "Governance", "Deploy"].map((step, i) => (
                                        <div key={i} className="flex items-center gap-4">
                                            <div className={`px-4 py-2 rounded-lg text-sm font-medium ${i === 3 ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/20' : 'bg-white/[0.02] text-white/60 border border-white/5'}`}>
                                                {step}
                                            </div>
                                            {i < 3 && <ChevronRight className="h-4 w-4 text-white/20" />}
                                        </div>
                                    ))}
                                </div>

                                <p className="text-lg text-white/70 leading-relaxed">
                                    Only after all three foundations are in place should organizations proceed to production
                                    AI deployment. This is the sequence that the successful 30% follow. The failing 70% skip
                                    or rush the foundation work.
                                </p>
                            </section>

                            <section id="path-forward" className="mb-16">
                                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">The Path Forward</h2>
                                <p className="text-lg text-white/70 leading-relaxed mb-6">
                                    If your organization is contemplating AI initiatives, the question is not which AI technology
                                    to buy. The question is whether your foundations can support whatever technology you choose.
                                </p>

                                <div className="my-10 py-8 border-t border-b border-white/10">
                                    <p className="text-xl md:text-2xl text-white font-medium leading-relaxed text-center">
                                        Technology is not the differentiator.<br />
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-400">Readiness is the differentiator.</span>
                                    </p>
                                </div>

                                <p className="text-lg text-white/70 leading-relaxed">
                                    The organizations that will succeed with AI are not those with the biggest budgets or the
                                    most sophisticated technology. They are the ones that invest in their people, adapt their
                                    processes, and establish governance before they deploy. Foundation First is not a delay
                                    tactic. It is the fastest path to AI value.
                                </p>
                            </section>
                        </article>

                        {/* Sidebar */}
                        <aside className="hidden lg:block">
                            <div className="sticky top-24">
                                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                                    <h4 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-4">In This Article</h4>
                                    <nav className="space-y-2">
                                        {tableOfContents.map((item) => (
                                            <a key={item.id} href={`#${item.id}`} className="block text-sm text-white/50 hover:text-white transition-colors py-1">
                                                {item.title}
                                            </a>
                                        ))}
                                    </nav>
                                </div>

                                <div className="mt-6 p-6 rounded-2xl bg-gradient-to-br from-rose-500/10 to-pink-500/10 border border-rose-500/20">
                                    <h4 className="font-semibold text-white mb-2">Build Your Foundation</h4>
                                    <p className="text-sm text-white/60 mb-4">ScaledNative provides the training, methodology, and governance frameworks for AI-ready organizations.</p>
                                    <Link href="/native">
                                        <button className="w-full px-4 py-2.5 rounded-lg bg-white/10 text-white text-sm font-medium hover:bg-white/20 transition-colors">
                                            NATIVE Framework →
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="border-t border-white/5 py-12 px-6">
                <div className="mx-auto max-w-4xl flex flex-col md:flex-row items-center justify-between gap-6">
                    <Link href="/" className="font-playfair text-lg italic text-white/50 hover:text-white transition-colors">ScaledNative™</Link>
                    <div className="flex items-center gap-6 text-sm text-white/30">
                        <Link href="/native" className="hover:text-white transition-colors">NATIVE Framework</Link>
                        <Link href="/enterprise" className="hover:text-white transition-colors">Enterprise</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
