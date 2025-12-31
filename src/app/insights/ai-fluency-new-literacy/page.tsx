import Link from "next/link";
import { ArrowLeft, Clock, Linkedin, Twitter, Copy, ChevronRight, Brain, Sparkles, MessageSquare, Code } from "lucide-react";

export const metadata = {
    title: "From Prompt Engineering to AI Fluency: The New Digital Literacy | ScaledNative",
    description:
        "Prompt engineering was the first wave. AI fluency is the destination. Learn what it means to be truly literate in AI and why it matters for every professional.",
    keywords: [
        "AI fluency",
        "AI literacy",
        "prompt engineering",
        "AI skills",
        "AI thinking",
        "enterprise AI training",
    ],
    openGraph: {
        title: "From Prompt Engineering to AI Fluency: The New Digital Literacy",
        description: "Prompt engineering was step one. Here's what true AI fluency looks like.",
        type: "article",
        authors: ["ScaledNative Research"],
        publishedTime: "2024-12-25",
    },
};

export default function AIFluencyArticle() {
    const tableOfContents = [
        { id: "first-wave", title: "The First Wave" },
        { id: "beyond-prompts", title: "Beyond Prompting" },
        { id: "fluency-defined", title: "AI Fluency Defined" },
        { id: "four-pillars", title: "The Four Pillars" },
        { id: "organizational", title: "Organizational Implications" },
    ];

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Reading Progress Bar */}
            <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-white/10">
                <div className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 w-0" id="reading-progress" />
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
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-cyan-600/20 rounded-full blur-3xl" />
                </div>

                <div className="relative z-10 mx-auto max-w-4xl">
                    <div className="flex items-center gap-3 mb-8">
                        <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 text-emerald-300 text-xs font-medium uppercase tracking-wider border border-emerald-500/20">
                            AI Literacy
                        </span>
                        <span className="text-xs text-white/30">December 2024</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-8 bg-gradient-to-br from-white via-white to-white/60 bg-clip-text text-transparent">
                        From Prompt Engineering to AI Fluency: The New Digital Literacy
                    </h1>

                    <p className="text-xl md:text-2xl text-white/50 mb-10 leading-relaxed max-w-3xl">
                        Prompt engineering was the gateway skill. But true AI fluency goes far beyond writing better prompts.
                        It is becoming the defining competency of the modern professional.
                    </p>

                    <div className="flex flex-wrap items-center gap-6">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
                                <Brain className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-white">ScaledNative Research</p>
                                <p className="text-xs text-white/40">Future of Work</p>
                            </div>
                        </div>
                        <div className="h-8 w-px bg-white/10 hidden sm:block" />
                        <div className="flex items-center gap-2 text-sm text-white/40">
                            <Clock className="h-4 w-4" />
                            <span>6 min read</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Content */}
            <div className="relative px-6 pb-24">
                <div className="mx-auto max-w-6xl">
                    <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-16">
                        <article className="max-w-3xl">
                            <section id="first-wave" className="mb-16">
                                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">The First Wave</h2>
                                <p className="text-lg text-white/70 leading-relaxed mb-6 first-letter:text-5xl first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-emerald-400">
                                    When ChatGPT launched in November 2022, prompt engineering became the hottest skill in technology
                                    overnight. Courses appeared everywhere. Certifications proliferated. Job postings demanded
                                    "prompt engineering experience" as if it were a decade-old discipline rather than a practice
                                    invented months earlier.
                                </p>
                                <p className="text-lg text-white/70 leading-relaxed mb-6">
                                    The hype was understandable. Early users discovered that the quality of AI outputs depended
                                    heavily on how you asked. Specific techniques emerged: chain-of-thought prompting, few-shot
                                    examples, role-based instructions. Those who mastered these techniques could extract dramatically
                                    better results from the same models.
                                </p>

                                <blockquote className="my-10 pl-6 border-l-4 border-emerald-500 py-4 bg-gradient-to-r from-emerald-500/5 to-transparent">
                                    <p className="text-xl md:text-2xl text-white/90 italic font-light leading-relaxed">
                                        "Prompt engineering was the gateway drug to AI literacy."
                                    </p>
                                </blockquote>
                            </section>

                            <section id="beyond-prompts" className="mb-16">
                                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">Beyond Prompting</h2>
                                <p className="text-lg text-white/70 leading-relaxed mb-6">
                                    Here is the truth that prompt engineering courses do not advertise: the techniques that work
                                    today may not work tomorrow. Models evolve. Interfaces change. The specific syntax that extracts
                                    optimal results from GPT-4 may be irrelevant for GPT-5 or Claude 4 or whatever comes next.
                                </p>
                                <p className="text-lg text-white/70 leading-relaxed mb-6">
                                    This is not a criticism of prompt engineering. It is a recognition that prompting is a tactic,
                                    not a strategy. The deeper skill is understanding how AI systems work, what they can and cannot
                                    do, and how to integrate them effectively into workflows. That deeper skill is AI fluency.
                                </p>

                                <div className="my-10 p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20">
                                    <h4 className="text-sm font-semibold text-emerald-400 uppercase tracking-wider mb-3">Key Insight</h4>
                                    <p className="text-white/80">
                                        Prompt engineering is to AI fluency what typing is to writing. Necessary but not sufficient.
                                        The goal is not to type faster. The goal is to think and communicate more effectively.
                                    </p>
                                </div>
                            </section>

                            <section id="fluency-defined" className="mb-16">
                                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">AI Fluency Defined</h2>
                                <p className="text-lg text-white/70 leading-relaxed mb-6">
                                    AI fluency is the ability to work effectively with AI systems across contexts. It includes
                                    understanding AI capabilities and limitations, knowing when to use AI versus human judgment,
                                    integrating AI into complex workflows, evaluating AI outputs critically, and adapting as
                                    AI technology evolves.
                                </p>
                                <p className="text-lg text-white/70 leading-relaxed">
                                    An AI-fluent professional does not just know how to prompt well. They know how to think
                                    about problems in ways that leverage AI appropriately. They can decompose complex tasks,
                                    identify which components benefit from AI assistance, orchestrate multiple AI tools, and
                                    validate results against domain expertise.
                                </p>
                            </section>

                            <section id="four-pillars" className="mb-16">
                                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">The Four Pillars of AI Fluency</h2>

                                <div className="space-y-4 mb-8">
                                    {[
                                        { icon: Brain, title: "Conceptual Understanding", desc: "How AI systems work at a fundamental level. Not the mathematics, but the mental models. Understanding why AI hallucinates, why context matters, why some tasks are easy and others hard." },
                                        { icon: MessageSquare, title: "Interaction Competence", desc: "The ability to communicate effectively with AI systems. This includes prompting, but also knowing how to iterate, refine, and guide AI through complex tasks." },
                                        { icon: Code, title: "Workflow Integration", desc: "Embedding AI into real work processes. Knowing which tools to use when, how to chain AI capabilities, and how to maintain quality through automated pipelines." },
                                        { icon: Sparkles, title: "Critical Evaluation", desc: "The judgment to assess AI outputs, identify errors, verify claims, and know when human expertise must override AI suggestions." },
                                    ].map((item, i) => (
                                        <div key={i} className="flex gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
                                            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
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

                            <section id="organizational" className="mb-16">
                                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">Organizational Implications</h2>
                                <p className="text-lg text-white/70 leading-relaxed mb-6">
                                    For organizations, the shift from prompt engineering to AI fluency has significant implications.
                                    One-off prompt engineering workshops are not enough. AI fluency requires sustained development
                                    across all four pillars, embedded in actual work contexts.
                                </p>

                                <div className="my-10 py-8 border-t border-b border-white/10">
                                    <p className="text-xl md:text-2xl text-white font-medium leading-relaxed text-center">
                                        The goal is not prompt engineers.<br />
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">The goal is an AI-fluent workforce.</span>
                                    </p>
                                </div>

                                <p className="text-lg text-white/70 leading-relaxed">
                                    Organizations that invest in AI fluency will develop sustainable competitive advantages.
                                    Their employees will adapt as AI evolves. They will not need to retrain for every new model
                                    or tool because their people understand the underlying principles. That is the difference
                                    between teaching tactics and building capabilities.
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

                                <div className="mt-6 p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20">
                                    <h4 className="font-semibold text-white mb-2">Build AI Fluency</h4>
                                    <p className="text-sm text-white/60 mb-4">Our curriculum develops all four pillars of AI fluency through hands-on, role-specific training.</p>
                                    <Link href="/training">
                                        <button className="w-full px-4 py-2.5 rounded-lg bg-white/10 text-white text-sm font-medium hover:bg-white/20 transition-colors">
                                            Explore Training →
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
                        <Link href="/training" className="hover:text-white transition-colors">Training</Link>
                        <Link href="/certifications" className="hover:text-white transition-colors">Certifications</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
