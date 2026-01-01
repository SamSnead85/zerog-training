import { PromptPlayground } from "@/components/labs/interactive/PromptPlayground";
import { QuotaDisplay } from "@/components/labs/interactive/QuotaDisplay";
import Link from "next/link";
import { ArrowLeft, Beaker, BookOpen } from "lucide-react";

export const metadata = {
    title: "Interactive Lab Demo | ScaledNative",
    description: "Experience our revolutionary AI-powered interactive labs where you write real prompts and get real AI responses.",
};

export default function LabDemoPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-xl border-b border-white/5">
                <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Home
                    </Link>
                    <div className="flex items-center gap-4">
                        <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs border border-purple-500/30">
                            Beta Preview
                        </span>
                    </div>
                </div>
            </nav>

            {/* Hero */}
            <header className="pt-24 pb-12 px-6">
                <div className="mx-auto max-w-6xl">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/30">
                            <Beaker className="h-6 w-6 text-purple-400" />
                        </div>
                        <span className="text-sm text-white/50">Interactive Labs</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">
                        Learn AI by <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Building AI</span>
                    </h1>
                    <p className="text-white/60 max-w-2xl text-lg">
                        Write your own prompts, execute against real AI models, and get instant feedback on your approach.
                        This is how AI-Native professionals learn.
                    </p>
                </div>
            </header>

            {/* Main Content */}
            <main className="px-6 pb-24">
                <div className="mx-auto max-w-6xl">
                    {/* Quota Display */}
                    <div className="mb-8 max-w-sm">
                        <QuotaDisplay
                            used={125000}
                            limit={500000}
                            remaining={375000}
                            percentUsed={25}
                            tier="enrolled"
                            resetsOn={new Date("2026-02-01")}
                        />
                    </div>

                    {/* Lab 1: Prompt Engineering */}
                    <div className="mb-12">
                        <div className="flex items-center gap-3 mb-6">
                            <BookOpen className="h-5 w-5 text-purple-400" />
                            <h2 className="text-xl font-semibold">Lab 1: Prompt Engineering Fundamentals</h2>
                        </div>
                        <PromptPlayground
                            labId="prompt-engineering-101"
                            labName="Prompt Engineering Challenge"
                            labDescription="Write a prompt that effectively generates a product description for an e-commerce website."
                            objectives={[
                                "Write a clear, specific prompt",
                                "Include relevant context",
                                "Specify the desired output format",
                            ]}
                            placeholder={`Write a prompt to generate a product description.

Example scenario: You're building an e-commerce site and need AI to generate compelling product descriptions from basic product data.

Your prompt should:
- Be specific about what you want
- Include example data or context
- Specify the tone and format

Start typing your prompt...`}
                            maxInputTokens={2000}
                        />
                    </div>

                    {/* Lab 2: Code Generation */}
                    <div className="mb-12">
                        <div className="flex items-center gap-3 mb-6">
                            <BookOpen className="h-5 w-5 text-blue-400" />
                            <h2 className="text-xl font-semibold">Lab 2: AI-Assisted Code Generation</h2>
                        </div>
                        <PromptPlayground
                            labId="code-generation"
                            labName="Code Generation Challenge"
                            labDescription="Prompt the AI to generate a useful utility function with proper error handling and documentation."
                            objectives={[
                                "Generate functional, correct code",
                                "Include error handling",
                                "Follow coding best practices",
                                "Produce well-documented code",
                            ]}
                            placeholder={`Write a prompt to generate code.

Example: "Create a TypeScript function that validates email addresses..."

Be specific about:
- The programming language
- Input/output requirements
- Error handling expectations
- Documentation needs

Start typing your prompt...`}
                            maxInputTokens={4000}
                        />
                    </div>

                    {/* Coming Soon */}
                    <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.02] text-center">
                        <h3 className="text-lg font-semibold mb-2">More Labs Coming Soon</h3>
                        <p className="text-white/50 mb-4">
                            RAG Pipeline Design • Agent Context Engineering • Enterprise Simulations
                        </p>
                        <Link
                            href="/training"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/10 text-white font-medium hover:bg-white/20 transition-colors"
                        >
                            Explore Full Curriculum
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
