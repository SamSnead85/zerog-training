import { PromptPlayground } from "@/components/labs/interactive/PromptPlayground";
import { QuotaDisplay } from "@/components/labs/interactive/QuotaDisplay";
import Link from "next/link";
import { ArrowLeft, Beaker, BookOpen, Code, Briefcase, Lightbulb } from "lucide-react";

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
                            used={500000}
                            limit={5000000}
                            remaining={4500000}
                            percentUsed={10}
                            tier="enrolled"
                            resetsOn={new Date("2026-02-01")}
                        />
                    </div>

                    {/* Lab Categories */}
                    <div className="grid md:grid-cols-3 gap-4 mb-12">
                        <a href="#code-generation" className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20 transition-colors">
                            <Code className="h-6 w-6 text-blue-400 mb-2" />
                            <h3 className="font-semibold">Code Generation</h3>
                            <p className="text-sm text-white/50">6 Labs • APIs, Testing, Debugging</p>
                        </a>
                        <a href="#product-management" className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 hover:bg-green-500/20 transition-colors">
                            <Briefcase className="h-6 w-6 text-green-400 mb-2" />
                            <h3 className="font-semibold">Product Management</h3>
                            <p className="text-sm text-white/50">5 Labs • AI-Native Strategy</p>
                        </a>
                        <a href="#prompt-engineering" className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 hover:bg-purple-500/20 transition-colors">
                            <Lightbulb className="h-6 w-6 text-purple-400 mb-2" />
                            <h3 className="font-semibold">Prompt Engineering</h3>
                            <p className="text-sm text-white/50">4 Labs • Context & RAG</p>
                        </a>
                    </div>

                    {/* ==================== CODE GENERATION SECTION ==================== */}
                    <section id="code-generation" className="mb-16 scroll-mt-20">
                        <div className="flex items-center gap-3 mb-8">
                            <Code className="h-6 w-6 text-blue-400" />
                            <h2 className="text-2xl font-bold">Code Generation Labs</h2>
                            <span className="px-2 py-0.5 text-xs rounded-full bg-blue-500/20 text-blue-300">6 Labs</span>
                        </div>

                        {/* Lab: Basic Code Generation */}
                        <div className="mb-12">
                            <div className="flex items-center gap-3 mb-6">
                                <BookOpen className="h-5 w-5 text-blue-400" />
                                <h3 className="text-xl font-semibold">Lab 1: AI-Assisted Code Generation</h3>
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

Example: "Create a TypeScript function that validates email addresses and returns a detailed validation result..."

Be specific about:
- The programming language
- Input/output requirements
- Error handling expectations
- Documentation needs

Start typing your prompt...`}
                                maxInputTokens={4000}
                            />
                        </div>

                        {/* Lab: API Design */}
                        <div className="mb-12">
                            <div className="flex items-center gap-3 mb-6">
                                <BookOpen className="h-5 w-5 text-blue-400" />
                                <h3 className="text-xl font-semibold">Lab 2: REST API Design with AI</h3>
                            </div>
                            <PromptPlayground
                                labId="api-design"
                                labName="API Design Challenge"
                                labDescription="Design a complete REST API with proper endpoints, validation, and documentation."
                                objectives={[
                                    "Design a well-structured REST API",
                                    "Include proper HTTP methods and status codes",
                                    "Implement input validation",
                                    "Generate OpenAPI/Swagger documentation",
                                ]}
                                placeholder={`Design a REST API for a specific use case.

Example: "Design a REST API for a task management system with users, projects, and tasks. Include authentication, pagination, and filtering..."

Specify:
- Resource relationships
- Authentication/authorization needs
- Query parameters for filtering/sorting
- Error response formats

Start typing your prompt...`}
                                maxInputTokens={4000}
                            />
                        </div>

                        {/* Lab: Unit Test Generation */}
                        <div className="mb-12">
                            <div className="flex items-center gap-3 mb-6">
                                <BookOpen className="h-5 w-5 text-blue-400" />
                                <h3 className="text-xl font-semibold">Lab 3: AI-Powered Test Generation</h3>
                            </div>
                            <PromptPlayground
                                labId="unit-test-generation"
                                labName="Test Generation Challenge"
                                labDescription="Generate comprehensive unit tests for a given function or class."
                                objectives={[
                                    "Generate comprehensive unit tests",
                                    "Cover edge cases and error scenarios",
                                    "Use appropriate testing patterns (AAA, mocks)",
                                    "Achieve high code coverage",
                                ]}
                                placeholder={`Provide a function and ask for comprehensive tests.

Example:
"Generate unit tests for this function:
\`\`\`typescript
function calculateDiscount(price: number, discountPercent: number, memberType: 'gold' | 'silver' | 'bronze'): number {
  // ... implementation
}
\`\`\`

Cover edge cases, boundary values, and error scenarios."

Start typing your prompt...`}
                                maxInputTokens={6000}
                            />
                        </div>

                        {/* More Code Labs Preview */}
                        <div className="grid md:grid-cols-3 gap-4 p-6 rounded-xl bg-white/[0.02] border border-white/10">
                            <div className="p-4">
                                <h4 className="font-medium mb-1">Lab 4: AI-Assisted Refactoring</h4>
                                <p className="text-sm text-white/50">Identify code smells and apply refactoring patterns</p>
                            </div>
                            <div className="p-4">
                                <h4 className="font-medium mb-1">Lab 5: AI Debugging Partner</h4>
                                <p className="text-sm text-white/50">Root cause analysis and fix suggestions</p>
                            </div>
                            <div className="p-4">
                                <h4 className="font-medium mb-1">Lab 6: SQL Query Generation</h4>
                                <p className="text-sm text-white/50">Efficient queries with optimization hints</p>
                            </div>
                        </div>
                    </section>

                    {/* ==================== PRODUCT MANAGEMENT SECTION ==================== */}
                    <section id="product-management" className="mb-16 scroll-mt-20">
                        <div className="flex items-center gap-3 mb-8">
                            <Briefcase className="h-6 w-6 text-green-400" />
                            <h2 className="text-2xl font-bold">AI-Native Product Management Labs</h2>
                            <span className="px-2 py-0.5 text-xs rounded-full bg-green-500/20 text-green-300">5 Labs</span>
                        </div>

                        {/* Lab: AI-Native Product Strategy */}
                        <div className="mb-12">
                            <div className="flex items-center gap-3 mb-6">
                                <BookOpen className="h-5 w-5 text-green-400" />
                                <h3 className="text-xl font-semibold">Lab 1: AI-Native Product Strategy</h3>
                            </div>
                            <PromptPlayground
                                labId="ai-native-product-strategy"
                                labName="AI-Native Strategy Workshop"
                                labDescription="Define an AI-first product vision that leverages AI as a core capability, not just an add-on."
                                objectives={[
                                    "Define AI-first product vision",
                                    "Identify AI capabilities vs. human oversight needs",
                                    "Design for continuous AI improvement",
                                    "Address AI-specific risks and mitigation",
                                ]}
                                placeholder={`Design an AI-native product strategy.

Example: "I'm building a customer support platform. Help me design an AI-native strategy where AI handles 80% of inquiries autonomously while humans focus on complex cases. Address:
- Which tasks should be fully automated vs. AI-assisted vs. human-only
- How to continuously improve AI from customer feedback
- Trust and transparency considerations
- Rollout strategy from pilot to full deployment"

Start typing your prompt...`}
                                maxInputTokens={4000}
                            />
                        </div>

                        {/* Lab: AI Product Roadmap */}
                        <div className="mb-12">
                            <div className="flex items-center gap-3 mb-6">
                                <BookOpen className="h-5 w-5 text-green-400" />
                                <h3 className="text-xl font-semibold">Lab 2: AI Product Roadmap Design</h3>
                            </div>
                            <PromptPlayground
                                labId="ai-product-roadmap"
                                labName="AI Roadmap Workshop"
                                labDescription="Create a phased AI capability rollout that balances innovation with risk management."
                                objectives={[
                                    "Create phased AI capability rollout",
                                    "Balance innovation with risk management",
                                    "Define clear success metrics for AI features",
                                    "Plan for model iteration and improvement",
                                ]}
                                placeholder={`Design an AI product roadmap.

Example: "Create a 12-month roadmap for adding AI capabilities to our e-commerce platform. Consider:
- Phase 1: AI-powered product recommendations (Q1)
- Phase 2: Conversational shopping assistant (Q2)
- Phase 3: Automated inventory prediction (Q3)
- Phase 4: Personalized pricing optimization (Q4)

For each phase, define success metrics, risk mitigation, and dependency on previous phases."

Start typing your prompt...`}
                                maxInputTokens={4000}
                            />
                        </div>

                        {/* Lab: AI PRD Writing */}
                        <div className="mb-12">
                            <div className="flex items-center gap-3 mb-6">
                                <BookOpen className="h-5 w-5 text-green-400" />
                                <h3 className="text-xl font-semibold">Lab 3: AI Feature PRD Writing</h3>
                            </div>
                            <PromptPlayground
                                labId="ai-prd-writing"
                                labName="AI PRD Workshop"
                                labDescription="Write clear AI feature specifications including behavior, edge cases, and acceptance criteria."
                                objectives={[
                                    "Write clear AI feature specifications",
                                    "Define expected AI behavior and edge cases",
                                    "Specify human oversight requirements",
                                    "Include AI-specific acceptance criteria",
                                ]}
                                placeholder={`Write a PRD for an AI feature.

Example: "Write a PRD for an AI-powered document classification system that:
- Automatically categorizes incoming documents (invoices, contracts, correspondence)
- Provides confidence scores for each classification
- Routes low-confidence documents to human review
- Learns from human corrections

Include sections for: model requirements, training data needs, evaluation metrics, human oversight workflow, and rollout criteria."

Start typing your prompt...`}
                                maxInputTokens={4000}
                            />
                        </div>

                        {/* More PM Labs Preview */}
                        <div className="grid md:grid-cols-2 gap-4 p-6 rounded-xl bg-white/[0.02] border border-white/10">
                            <div className="p-4">
                                <h4 className="font-medium mb-1">Lab 4: AI Feature Prioritization Framework</h4>
                                <p className="text-sm text-white/50">RICE + AI factors: data availability, model complexity, responsible AI</p>
                            </div>
                            <div className="p-4">
                                <h4 className="font-medium mb-1">Lab 5: AI Integration Planning</h4>
                                <p className="text-sm text-white/50">Hybrid workflows, trust thresholds, change management</p>
                            </div>
                        </div>
                    </section>

                    {/* ==================== PROMPT ENGINEERING SECTION ==================== */}
                    <section id="prompt-engineering" className="mb-16 scroll-mt-20">
                        <div className="flex items-center gap-3 mb-8">
                            <Lightbulb className="h-6 w-6 text-purple-400" />
                            <h2 className="text-2xl font-bold">Prompt Engineering Labs</h2>
                            <span className="px-2 py-0.5 text-xs rounded-full bg-purple-500/20 text-purple-300">4 Labs</span>
                        </div>

                        {/* Lab: Prompt Fundamentals */}
                        <div className="mb-12">
                            <div className="flex items-center gap-3 mb-6">
                                <BookOpen className="h-5 w-5 text-purple-400" />
                                <h3 className="text-xl font-semibold">Lab 1: Prompt Engineering Fundamentals</h3>
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

                        {/* More Prompt Labs Preview */}
                        <div className="grid md:grid-cols-3 gap-4 p-6 rounded-xl bg-white/[0.02] border border-white/10">
                            <div className="p-4">
                                <h4 className="font-medium mb-1">Lab 2: Contract Summarization</h4>
                                <p className="text-sm text-white/50">Extract key terms from legal documents</p>
                            </div>
                            <div className="p-4">
                                <h4 className="font-medium mb-1">Lab 3: RAG Prompt Design</h4>
                                <p className="text-sm text-white/50">Design prompts that use retrieved context effectively</p>
                            </div>
                            <div className="p-4">
                                <h4 className="font-medium mb-1">Lab 4: Agent Context Engineering</h4>
                                <p className="text-sm text-white/50">Build context for AI agents with guardrails</p>
                            </div>
                        </div>
                    </section>

                    {/* CTA */}
                    <div className="p-8 rounded-2xl border border-white/10 bg-gradient-to-r from-purple-500/10 to-blue-500/10 text-center">
                        <h3 className="text-xl font-semibold mb-2">Ready to Master AI-Native Skills?</h3>
                        <p className="text-white/60 mb-6 max-w-xl mx-auto">
                            These interactive labs are part of our comprehensive AI-Native certification program.
                            15 labs across code generation, product management, and context engineering.
                        </p>
                        <Link
                            href="/training"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:from-purple-500 hover:to-blue-500 transition-colors"
                        >
                            Explore Full Curriculum
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}

