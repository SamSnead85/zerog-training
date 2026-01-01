import Link from "next/link";
import { ArrowLeft, Calendar, Clock, User, Share2, Linkedin, Twitter, Copy, ChevronRight, BookOpen } from "lucide-react";

export const metadata = {
    title: "Beyond Agile: Why the AI Era Demands a New Operating Model | ScaledNative",
    description:
        "Explore why traditional Agile and SAFe are becoming insufficient in an AI-driven world, and discover NATIVE as the next evolution of software delivery.",
    keywords: [
        "NATIVE framework",
        "AI SDLC",
        "Agile evolution",
        "SAFe alternative",
        "AI software development",
        "enterprise AI governance",
    ],
    openGraph: {
        title: "Beyond Agile: Why the AI Era Demands a New Operating Model",
        description: "Introducing NATIVE as the next evolution of software delivery for an AI-first world.",
        type: "article",
        authors: ["ScaledNative Research"],
        publishedTime: "2024-12-31",
    },
};

export default function NativeSDLCArticle() {
    const tableOfContents = [
        { id: "constraint-shifted", title: "The Constraint Has Shifted" },
        { id: "ai-changes", title: "AI Changes the Equation" },
        { id: "what-organizations-need", title: "What Organizations Need" },
        { id: "introducing-native", title: "Introducing NATIVE" },
        { id: "control-loops", title: "From Sprint Cycles to Control Loops" },
        { id: "path-forward", title: "The Path Forward" },
    ];

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Reading Progress Bar */}
            <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-white/10">
                <div
                    className="h-full bg-gradient-to-r from-purple-500 to-blue-500 w-0"
                    id="reading-progress"
                />
            </div>

            {/* Navigation */}
            <nav className="fixed top-1 left-0 right-0 z-40 bg-black/80 backdrop-blur-xl border-b border-white/5">
                <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        ScaledNative
                    </Link>
                    <div className="flex items-center gap-4">
                        <span className="text-xs text-white/30 uppercase tracking-wider hidden sm:block">
                            Insights
                        </span>
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

            {/* Hero Section with Gradient Background */}
            <header className="relative pt-24 pb-16 px-6 overflow-hidden">
                {/* Abstract gradient background */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-purple-900/10 to-blue-900/10 rounded-full blur-3xl" />
                </div>

                <div className="relative z-10 mx-auto max-w-4xl">
                    {/* Category Badge */}
                    <div className="flex items-center gap-3 mb-8">
                        <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-300 text-xs font-medium uppercase tracking-wider border border-purple-500/20">
                            Operating Model
                        </span>
                        <span className="text-xs text-white/30">December 2024</span>
                    </div>

                    {/* Title with Gradient Text */}
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-8 bg-gradient-to-br from-white via-white to-white/60 bg-clip-text text-transparent">
                        Beyond Agile: Why the AI Era Demands a New Operating Model
                    </h1>

                    {/* Subtitle */}
                    <p className="text-xl md:text-2xl text-white/50 mb-10 leading-relaxed max-w-3xl">
                        Traditional frameworks were designed for a world where humans wrote every line of code.
                        That world is ending. Here is what comes next.
                    </p>

                    {/* Author & Meta */}
                    <div className="flex flex-wrap items-center gap-6">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                                <BookOpen className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-white">ScaledNative Research</p>
                                <p className="text-xs text-white/40">Thought Leadership</p>
                            </div>
                        </div>
                        <div className="h-8 w-px bg-white/10 hidden sm:block" />
                        <div className="flex items-center gap-4 text-sm text-white/40">
                            <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                <span>8 min read</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content Area with Sidebar */}
            <div className="relative px-6 pb-24">
                <div className="mx-auto max-w-6xl">
                    <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-16">
                        {/* Article Content */}
                        <article className="max-w-3xl">
                            {/* Drop Cap First Paragraph */}
                            <section id="constraint-shifted" className="mb-16">
                                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">
                                    The Constraint Has Shifted
                                </h2>
                                <p className="text-lg text-white/70 leading-relaxed mb-6 first-letter:text-5xl first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-purple-400">
                                    For two decades, Agile methodologies have revolutionized how enterprises build software — and rightfully so. The Agile
                                    Manifesto emerged from a simple but powerful observation: waterfall planning was too slow, too rigid, and
                                    disconnected from the realities of building complex systems. Agile introduced iterative
                                    development, cross-functional teams, and continuous feedback. These innovations fundamentally improved software delivery
                                    by optimizing for what mattered most: the pace and coordination of human execution.
                                </p>
                                <p className="text-lg text-white/70 leading-relaxed mb-6">
                                    SAFe took this success to enterprise scale with genuine achievement. When hundreds of developers
                                    work on interconnected systems, coordination becomes paramount. Release trains, program
                                    increments, and architectural runways emerged as effective ways to synchronize human effort across
                                    large organizations. SAFe brought discipline, repeatability, and governance to complex software delivery —
                                    capabilities that were genuinely missing before. The framework's contribution to enterprise software delivery
                                    is substantial and lasting.
                                </p>

                                {/* Pull Quote */}
                                <blockquote className="my-10 pl-6 border-l-4 border-purple-500 py-4 bg-gradient-to-r from-purple-500/5 to-transparent">
                                    <p className="text-xl md:text-2xl text-white/90 italic font-light leading-relaxed">
                                        "Agile and SAFe optimized human coordination brilliantly. Now we must extend that thinking to hybrid teams of humans and AI agents."
                                    </p>
                                </blockquote>

                                <p className="text-lg text-white/70 leading-relaxed">
                                    The question is not whether Agile succeeded — it clearly did. The question is: what comes next when AI agents become
                                    primary executors and humans shift to validation, governance, and strategic direction?
                                </p>
                            </section>

                            <section id="ai-changes" className="mb-16">
                                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">
                                    AI Changes the Equation
                                </h2>
                                <p className="text-lg text-white/70 leading-relaxed mb-6">
                                    In organizations using AI development tools, the constraint has shifted from execution speed
                                    to judgment quality. AI can generate thousands of lines of code in minutes. It can scaffold
                                    entire applications, write tests, and produce documentation at machine speed. The bottleneck
                                    is no longer how fast developers can type. The bottleneck is how fast organizations can
                                    validate, govern, and absorb change.
                                </p>
                                <p className="text-lg text-white/70 leading-relaxed mb-6">
                                    This creates a fundamental problem for traditional frameworks. Sprints assume a predictable
                                    amount of work can be completed in a fixed timebox. But when AI can produce a week's worth of
                                    code in an afternoon, the sprint becomes an artificial constraint rather than a useful
                                    planning unit. Backlogs assume humans will execute items sequentially. But when AI can work
                                    on multiple items in parallel, the backlog becomes a bottleneck rather than a prioritization
                                    tool.
                                </p>

                                {/* Highlighted Insight Box */}
                                <div className="my-10 p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-white/10">
                                    <h4 className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-3">The Hybrid Workforce Reality</h4>
                                    <p className="text-white/80">
                                        The future isn't all-human or all-AI — it's a hybrid workforce where AI agents handle execution
                                        while humans provide judgment, context, and governance. This hybrid model requires a new operating system that
                                        leverages context engineering principles to ensure AI agents have the right information, memory, and constraints
                                        to operate safely at enterprise scale.
                                    </p>
                                </div>
                            </section>

                            <section id="what-organizations-need" className="mb-16">
                                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">
                                    What Organizations Actually Need
                                </h2>
                                <p className="text-lg text-white/70 leading-relaxed mb-6">
                                    Enterprises adopting AI development tools are discovering that velocity without governance
                                    creates chaos. Teams that can ship features daily are discovering that customers cannot absorb
                                    change at the same rate. Security reviews that assumed bi-weekly releases now face continuous
                                    streams of changes they cannot adequately assess. Compliance frameworks built for quarterly
                                    audits collapse under the weight of perpetual modification.
                                </p>
                                <p className="text-lg text-white/70 leading-relaxed font-medium text-white/90">
                                    The solution is not to slow AI down. The solution is to evolve the operating model.
                                </p>
                            </section>

                            <section id="introducing-native" className="mb-16">
                                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">
                                    Introducing NATIVE
                                </h2>
                                <p className="text-lg text-white/70 leading-relaxed mb-6">
                                    NATIVE is an AI-native software delivery lifecycle operating model. It is not a process
                                    overlay or certification program. It is a fundamental rethinking of how software gets built
                                    when AI is the primary executor and humans are the validators, governors, and decision-makers.
                                </p>
                                <p className="text-lg text-white/70 leading-relaxed mb-8">
                                    The framework consists of six principles that form a continuous control loop:
                                </p>

                                {/* NATIVE Framework Cards */}
                                <div className="space-y-4 mb-8">
                                    {[
                                        { letter: "N", title: "Normalize intent", desc: "Traditional backlogs contain tasks. AI-native development starts with outcomes. Instead of specifying how to build something, teams define what success looks like and why it matters." },
                                        { letter: "A", title: "Augment with agents", desc: "AI agents become the primary executors of defined intent. Human developers shift from writing code to supervising agents, reviewing outputs, and handling edge cases that require judgment." },
                                        { letter: "T", title: "Test continuously", desc: "When AI generates code at machine speed, testing must happen at machine speed. Validation runs before human review, not after." },
                                        { letter: "I", title: "Instrument everything", desc: "Every AI decision, every generated artifact, every validation result must be observable and traceable. When something goes wrong, you need to understand not just what happened but why." },
                                        { letter: "V", title: "Validate outcomes", desc: "The question is never whether the code works. The questions are whether it is correct, secure, compliant, and whether users will actually adopt it." },
                                        { letter: "E", title: "Evolve systems", desc: "AI-native development rejects the notion of fixed plans and stable states. Systems continuously learn from deployment outcomes. The operating model itself adapts." },
                                    ].map((item, i) => (
                                        <div key={i} className="flex gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
                                            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-xl font-bold">
                                                {item.letter}
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-white mb-1">{item.title}</h4>
                                                <p className="text-sm text-white/60 leading-relaxed">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section id="control-loops" className="mb-16">
                                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">
                                    From Sprint Cycles to Control Loops
                                </h2>
                                <p className="text-lg text-white/70 leading-relaxed mb-6">
                                    The fundamental difference between traditional frameworks and NATIVE is the shift from
                                    time-boxed cycles to continuous control loops. A sprint is a planning unit: work enters at
                                    the beginning and ships at the end. A control loop is a feedback mechanism: inputs trigger
                                    actions, actions produce outcomes, outcomes inform adjustments, and the cycle continues
                                    without fixed boundaries.
                                </p>

                                {/* Comparison Visual */}
                                <div className="my-10 grid md:grid-cols-2 gap-4">
                                    <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5">
                                        <h4 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">Traditional</h4>
                                        <ul className="space-y-2 text-sm text-white/60">
                                            <li className="flex items-center gap-2"><ChevronRight className="h-4 w-4 text-white/30" />Backlogs</li>
                                            <li className="flex items-center gap-2"><ChevronRight className="h-4 w-4 text-white/30" />Sprints</li>
                                            <li className="flex items-center gap-2"><ChevronRight className="h-4 w-4 text-white/30" />Code reviews</li>
                                            <li className="flex items-center gap-2"><ChevronRight className="h-4 w-4 text-white/30" />Velocity metrics</li>
                                        </ul>
                                    </div>
                                    <div className="p-5 rounded-xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20">
                                        <h4 className="text-xs font-semibold text-purple-400 uppercase tracking-wider mb-3">NATIVE</h4>
                                        <ul className="space-y-2 text-sm text-white/80">
                                            <li className="flex items-center gap-2"><ChevronRight className="h-4 w-4 text-purple-400" />Intent catalogs</li>
                                            <li className="flex items-center gap-2"><ChevronRight className="h-4 w-4 text-purple-400" />Continuous generation</li>
                                            <li className="flex items-center gap-2"><ChevronRight className="h-4 w-4 text-purple-400" />Policy & validation gates</li>
                                            <li className="flex items-center gap-2"><ChevronRight className="h-4 w-4 text-purple-400" />Reliability & outcome metrics</li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            <section id="path-forward" className="mb-16">
                                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">
                                    The Path Forward
                                </h2>
                                <p className="text-lg text-white/70 leading-relaxed mb-6">
                                    This is not an attack on Agile or SAFe — far from it. Those frameworks solved real problems, enabled countless successful
                                    projects, and continue to serve organizations well. The practices they pioneered — iterative delivery, continuous feedback,
                                    cross-functional teams, architectural thinking at scale — remain valuable. NATIVE doesn't discard these achievements;
                                    it builds upon them for a hybrid workforce where AI agents and humans collaborate.
                                </p>
                                <p className="text-lg text-white/70 leading-relaxed mb-6">
                                    Many Agile and SAFe practices translate directly to the agentic world. Daily standups still provide value when humans
                                    need to coordinate oversight of AI agents. Retrospectives still matter when teams need to learn from AI-generated outputs.
                                    Architectural runways become context engineering frameworks that give AI agents the guardrails and organizational knowledge
                                    they need to operate effectively. The ceremony adapts; the wisdom endures.
                                </p>

                                {/* Final Statement */}
                                <div className="my-10 py-8 border-t border-b border-white/10">
                                    <p className="text-xl md:text-2xl text-white font-medium leading-relaxed text-center">
                                        SAFe optimized human coordination with lasting impact.<br />
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">NATIVE extends this to hybrid human-AI teams with context engineering at its core.</span>
                                    </p>
                                </div>

                                <p className="text-lg text-white/70 leading-relaxed">
                                    NATIVE provides a path forward that is practical, governed, and enterprise-ready. The
                                    operating system is changing. The question is whether your organization will evolve with it.
                                </p>
                            </section>
                        </article>

                        {/* Sticky Sidebar */}
                        <aside className="hidden lg:block">
                            <div className="sticky top-24">
                                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                                    <h4 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-4">
                                        In This Article
                                    </h4>
                                    <nav className="space-y-2">
                                        {tableOfContents.map((item) => (
                                            <a
                                                key={item.id}
                                                href={`#${item.id}`}
                                                className="block text-sm text-white/50 hover:text-white transition-colors py-1"
                                            >
                                                {item.title}
                                            </a>
                                        ))}
                                    </nav>
                                </div>

                                {/* CTA Card */}
                                <div className="mt-6 p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20">
                                    <h4 className="font-semibold text-white mb-2">Learn the NATIVE Framework</h4>
                                    <p className="text-sm text-white/60 mb-4">
                                        ScaledNative provides training and certification for AI-native development.
                                    </p>
                                    <Link href="/native">
                                        <button className="w-full px-4 py-2.5 rounded-lg bg-white/10 text-white text-sm font-medium hover:bg-white/20 transition-colors">
                                            Explore Framework →
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
                    <Link href="/" className="font-playfair text-lg italic text-white/50 hover:text-white transition-colors">
                        ScaledNative™
                    </Link>
                    <div className="flex items-center gap-6 text-sm text-white/30">
                        <Link href="/insights/native-sdlc-evolution" className="hover:text-white transition-colors">Share this article</Link>
                        <Link href="/native" className="hover:text-white transition-colors">NATIVE Framework</Link>
                        <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
