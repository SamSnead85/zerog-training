import Link from "next/link";
import { ArrowLeft, Clock, Linkedin, Twitter, Copy, ChevronRight, TrendingUp, AlertTriangle, Target, Users } from "lucide-react";

export const metadata = {
    title: "The AI Skills Gap Crisis: Why Traditional Training Failed | ScaledNative",
    description:
        "87% of executives report AI skills gaps in their organizations. Learn why traditional training approaches are failing and what actually works for enterprise AI adoption.",
    keywords: [
        "AI skills gap",
        "AI training failure",
        "enterprise AI adoption",
        "workforce AI readiness",
        "AI upskilling",
        "corporate AI training",
    ],
    openGraph: {
        title: "The AI Skills Gap Crisis: Why Traditional Training Failed",
        description: "87% of executives report critical AI skills gaps. Here's why and what to do about it.",
        type: "article",
        authors: ["ScaledNative Research"],
        publishedTime: "2024-12-28",
    },
};

export default function AISkillsGapArticle() {
    const tableOfContents = [
        { id: "crisis", title: "The Skills Crisis" },
        { id: "why-failing", title: "Why Training is Failing" },
        { id: "completion-myth", title: "The Completion Myth" },
        { id: "what-works", title: "What Actually Works" },
        { id: "future", title: "The Path Forward" },
    ];

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Reading Progress Bar */}
            <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-white/10">
                <div className="h-full bg-gradient-to-r from-amber-500 to-red-500 w-0" id="reading-progress" />
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
                            <button className="p-2 rounded-full hover:bg-white/10 transition-colors" title="Share on LinkedIn">
                                <Linkedin className="h-4 w-4 text-white/40" />
                            </button>
                            <button className="p-2 rounded-full hover:bg-white/10 transition-colors" title="Share on Twitter">
                                <Twitter className="h-4 w-4 text-white/40" />
                            </button>
                            <button className="p-2 rounded-full hover:bg-white/10 transition-colors" title="Copy link">
                                <Copy className="h-4 w-4 text-white/40" />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero */}
            <header className="relative pt-24 pb-16 px-6 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-600/20 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-red-600/20 rounded-full blur-3xl" />
                </div>

                <div className="relative z-10 mx-auto max-w-4xl">
                    <div className="flex items-center gap-3 mb-8">
                        <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-red-500/20 text-amber-300 text-xs font-medium uppercase tracking-wider border border-amber-500/20">
                            Workforce Crisis
                        </span>
                        <span className="text-xs text-white/30">December 2024</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-8 bg-gradient-to-br from-white via-white to-white/60 bg-clip-text text-transparent">
                        The AI Skills Gap Crisis: Why Traditional Training Failed
                    </h1>

                    <p className="text-xl md:text-2xl text-white/50 mb-10 leading-relaxed max-w-3xl">
                        87% of executives report critical AI skills gaps. The platforms they trusted to close those gaps
                        have a 4% completion rate. Something is fundamentally broken.
                    </p>

                    <div className="flex flex-wrap items-center gap-6">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-red-500 flex items-center justify-center">
                                <AlertTriangle className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-white">ScaledNative Research</p>
                                <p className="text-xs text-white/40">Enterprise Analysis</p>
                            </div>
                        </div>
                        <div className="h-8 w-px bg-white/10 hidden sm:block" />
                        <div className="flex items-center gap-2 text-sm text-white/40">
                            <Clock className="h-4 w-4" />
                            <span>7 min read</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Content */}
            <div className="relative px-6 pb-24">
                <div className="mx-auto max-w-6xl">
                    <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-16">
                        <article className="max-w-3xl">
                            <section id="crisis" className="mb-16">
                                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">The Skills Crisis</h2>
                                <p className="text-lg text-white/70 leading-relaxed mb-6 first-letter:text-5xl first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-amber-400">
                                    Every major consulting firm has published the same finding: enterprises are facing an unprecedented
                                    AI skills gap. McKinsey reports that 87% of executives either have skills gaps today or expect them
                                    within five years. Gartner finds that lack of AI talent is the primary barrier to AI adoption. The
                                    World Economic Forum estimates 97 million new AI-related roles will emerge by 2025.
                                </p>
                                <p className="text-lg text-white/70 leading-relaxed mb-6">
                                    The response has been predictable: organizations have flooded training platforms with demand.
                                    Corporate subscriptions to Coursera, Udemy, and LinkedIn Learning have surged. AI courses have
                                    become the fastest-growing category on every major learning platform.
                                </p>

                                {/* Stats Visual */}
                                <div className="my-10 grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {[
                                        { value: "87%", label: "Report skills gaps", color: "text-amber-400" },
                                        { value: "4%", label: "Completion rate", color: "text-red-400" },
                                        { value: "$8B", label: "Annual training spend", color: "text-white" },
                                        { value: "97M", label: "New AI roles needed", color: "text-white" },
                                    ].map((stat, i) => (
                                        <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-center">
                                            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                                            <p className="text-xs text-white/40 mt-1">{stat.label}</p>
                                        </div>
                                    ))}
                                </div>

                                <p className="text-lg text-white/70 leading-relaxed">
                                    And yet the skills gap persists. In many organizations, it is widening.
                                </p>
                            </section>

                            <section id="why-failing" className="mb-16">
                                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">Why Training is Failing</h2>
                                <p className="text-lg text-white/70 leading-relaxed mb-6">
                                    The training industry has a dirty secret: completion rates for corporate online learning hover
                                    around 4%. That is not a typo. For every 100 employees enrolled in an AI course, only 4 will
                                    finish it. The rest abandon halfway through, never start after enrolling, or click through
                                    without engagement.
                                </p>

                                <blockquote className="my-10 pl-6 border-l-4 border-amber-500 py-4 bg-gradient-to-r from-amber-500/5 to-transparent">
                                    <p className="text-xl md:text-2xl text-white/90 italic font-light leading-relaxed">
                                        "For every 100 employees enrolled in an AI course, only 4 will finish it."
                                    </p>
                                </blockquote>

                                <p className="text-lg text-white/70 leading-relaxed mb-6">
                                    This is not a failure of employee motivation. It is a failure of training design. Most AI
                                    courses were created for individual learners with intrinsic interest in technology. They assume
                                    unlimited time, self-directed learning, and personal goals. Enterprise learners have none of
                                    these conditions. They have jobs to do, deadlines to meet, and training mandates they did not
                                    choose.
                                </p>
                            </section>

                            <section id="completion-myth" className="mb-16">
                                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">The Completion Myth</h2>
                                <p className="text-lg text-white/70 leading-relaxed mb-6">
                                    Even when employees complete training, completion does not equal competency. Watching a video
                                    about prompt engineering is not the same as being able to prompt effectively. Passing a quiz
                                    about AI concepts is not the same as knowing when to apply them.
                                </p>

                                <div className="my-10 p-6 rounded-2xl bg-gradient-to-br from-red-500/10 to-amber-500/10 border border-red-500/20">
                                    <h4 className="text-sm font-semibold text-red-400 uppercase tracking-wider mb-3">The Real Problem</h4>
                                    <p className="text-white/80">
                                        Traditional training measures activity, not capability. Hours logged. Courses completed.
                                        Certificates earned. None of these predict whether an employee can actually use AI to
                                        improve their work.
                                    </p>
                                </div>

                                <p className="text-lg text-white/70 leading-relaxed">
                                    The result is a paradox: training budgets increase, course enrollments rise, completion
                                    certificates accumulate, and the skills gap remains unchanged.
                                </p>
                            </section>

                            <section id="what-works" className="mb-16">
                                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">What Actually Works</h2>
                                <p className="text-lg text-white/70 leading-relaxed mb-8">
                                    Effective AI training shares certain characteristics that traditional platforms lack:
                                </p>

                                <div className="space-y-4 mb-8">
                                    {[
                                        { icon: Target, title: "Context-specific", desc: "Training built around the learner's actual role, industry, and company tools. Generic AI courses cannot compete with learning that uses your data and your workflows." },
                                        { icon: TrendingUp, title: "Skill-verified", desc: "Assessment through demonstrated capability, not quiz scores. Can the employee actually accomplish tasks using AI? That is the only metric that matters." },
                                        { icon: Users, title: "Cohort-based", desc: "Learning with peers creates accountability that solitary video watching cannot. When teams learn together, adoption accelerates across the organization." },
                                        { icon: Target, title: "Immediately applicable", desc: "Training that produces work outputs, not just knowledge. By the end of a module, learners should have created something useful for their job." },
                                    ].map((item, i) => (
                                        <div key={i} className="flex gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
                                            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-red-500 flex items-center justify-center">
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

                            <section id="future" className="mb-16">
                                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">The Path Forward</h2>
                                <p className="text-lg text-white/70 leading-relaxed mb-6">
                                    The AI skills gap is real. It will define which organizations thrive and which struggle
                                    over the next decade. But solving it requires abandoning assumptions about how training
                                    works.
                                </p>

                                <div className="my-10 py-8 border-t border-b border-white/10">
                                    <p className="text-xl md:text-2xl text-white font-medium leading-relaxed text-center">
                                        Stop measuring completions.<br />
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-red-400">Start measuring capabilities.</span>
                                    </p>
                                </div>

                                <p className="text-lg text-white/70 leading-relaxed">
                                    Organizations that recognize this shift and invest in training that actually works will
                                    close their skills gaps. Those that continue throwing money at traditional platforms will
                                    watch their best talent leave for companies that take AI readiness seriously.
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

                                <div className="mt-6 p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 to-red-500/10 border border-amber-500/20">
                                    <h4 className="font-semibold text-white mb-2">Close Your Skills Gap</h4>
                                    <p className="text-sm text-white/60 mb-4">ScaledNative delivers 95% completion rates through context-specific, skill-verified training.</p>
                                    <Link href="/enterprise">
                                        <button className="w-full px-4 py-2.5 rounded-lg bg-white/10 text-white text-sm font-medium hover:bg-white/20 transition-colors">
                                            Learn More →
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
                        <Link href="/insights/ai-skills-gap-crisis" className="hover:text-white transition-colors">Share this article</Link>
                        <Link href="/enterprise" className="hover:text-white transition-colors">Enterprise</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
