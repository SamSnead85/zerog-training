"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, Badge, Button, Progress } from "@/components/ui";
import {
    Play,
    Lock,
    CheckCircle2,
    Sparkles,
    Bot,
    Code,
    Briefcase,
    Brain,
    Target,
    Award,
    Clock,
    BookOpen,
    ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PromptPlayground } from "@/components/labs/interactive/PromptPlayground";

// Demo module lessons - showcasing the most exciting concepts
const demoLessons = [
    {
        id: 1,
        title: "The Agentic Revolution",
        type: "video",
        duration: "6 min",
        icon: Bot,
        unlocked: true,
        description: "How autonomous AI agents are transforming enterprise software",
    },
    {
        id: 2,
        title: "Build an AI Agent (Live Lab)",
        type: "interactive",
        duration: "10 min",
        icon: Code,
        unlocked: true,
        description: "Experience our interactive labs — design a real AI agent",
        isLab: true,
    },
    {
        id: 3,
        title: "AI-Native Product Strategy",
        type: "video",
        duration: "5 min",
        icon: Briefcase,
        unlocked: true,
        description: "How product leaders rethink strategy in the AI era",
    },
    {
        id: 4,
        title: "Context Engineering Secrets",
        type: "video",
        duration: "5 min",
        icon: Brain,
        unlocked: true,
        description: "The #1 skill that separates beginners from experts",
    },
    {
        id: 5,
        title: "Code Generation Mastery",
        type: "video",
        duration: "4 min",
        icon: Code,
        unlocked: true,
        description: "Generate production-ready code, not just snippets",
    },
];

const lessonContent: Record<number, string> = {
    1: `
# The Agentic Revolution

We've entered a new era. AI is no longer just a tool you prompt — it's becoming an **autonomous collaborator**.

## What AI Agents Can Do

- **Execute multi-step workflows** without constant guidance
- **Self-correct and iterate** based on outcomes
- **Use tools and APIs** to accomplish real-world tasks
- **Reason through complex problems** step-by-step

## Industry Impact

> "By 2026, 50% of enterprise software development will involve AI agents working alongside human engineers."

## The NATIVE Framework

**N**eural — LLMs as reasoning engines
**A**ugmented — Humans + AI together
**T**eams — Restructured around AI
**I**ntelligent — Continuous learning
**V**alue — Measurable outcomes
**E**ngineering — Production-grade

*This is what you'll master in the full curriculum.*
    `,
    3: `
# AI-Native Product Strategy

The best products aren't adding AI — they're **built from AI first**.

## The Strategic Shift

**Traditional:** AI as a feature add-on
**AI-Native:** AI as the core capability

## Key Questions for Leaders

1. **What decisions can AI make autonomously?**
   - Low-risk, high-volume → Full automation
   - High-risk, nuanced → AI-assisted with human approval

2. **How does the product get smarter over time?**
   - Feedback loops from user corrections
   - Continuous model improvement

3. **What's the human-AI handoff?**
   - Clear escalation triggers
   - Validation workflows

## Real Example

**Customer Support Transformation**
- Before: 100 agents, 10,000 tickets/day
- After: AI handles 80%, humans handle complex 20%
- Result: 4x capacity, higher satisfaction
    `,
    4: `
# Context Engineering: The Hidden Skill

Prompt engineering gets attention. **Context engineering** gets results.

## The Difference

**Prompt Engineering:** What you ask
**Context Engineering:** What AI knows when you ask

## The $100K Context

**Amateur approach:**
\`\`\`
You are a legal assistant. Help with contracts.
\`\`\`

**Expert approach:**
\`\`\`
You are a senior legal analyst at Morrison & Foerster,
specializing in SaaS contracts for enterprise software.

CONTEXT:
- Client: Fortune 500 technology company
- Deal size: $10M+ annual contract value
- Key concerns: IP ownership, liability caps, SLAs

POLICIES:
- Never accept unlimited liability
- Minimum 99.9% uptime SLA

When reviewing, cite specific sections.
\`\`\`

**Same question, 10x better results.**

## Your Superpower

Modern LLMs: 100K-200K token context windows
Most people use: < 1%

Experts include: domain knowledge, policies, history, examples.
    `,
    5: `
# Code Generation That Actually Works

The difference between "AI wrote code" and "AI wrote production code."

## The 5-Layer Prompt

**1. Role Definition**
\`\`\`
You are a senior TypeScript engineer at Stripe
with 10 years in payment systems.
\`\`\`

**2. Constraints**
\`\`\`
- TypeScript 5.0 strict mode
- No any types
- Comprehensive error handling
\`\`\`

**3. Architecture Context**
\`\`\`
Part of payment processing pipeline.
Must be idempotent, handle retries.
\`\`\`

**4. Examples**
\`\`\`
Similar function: [paste existing code]
\`\`\`

**5. Output Specification**
\`\`\`
Return: implementation + unit tests + docs
\`\`\`

## The Result

Instead of 20-line snippet:
- 100+ lines of production code
- Full test coverage
- Documentation
- Error handling

*This is what professionals do.*
    `,
};

export default function PreviewPage() {
    const [activeLesson, setActiveLesson] = useState(1);
    const [completedLessons, setCompletedLessons] = useState<number[]>([]);
    const [showQuiz, setShowQuiz] = useState(false);
    const [quizScore, setQuizScore] = useState<number | null>(null);

    const currentLesson = demoLessons.find((l) => l.id === activeLesson);
    const progress = (completedLessons.length / 5) * 100;

    const handleCompleteLesson = () => {
        if (!completedLessons.includes(activeLesson)) {
            setCompletedLessons([...completedLessons, activeLesson]);
        }
        if (activeLesson < 5) {
            setActiveLesson(activeLesson + 1);
        } else {
            setShowQuiz(true);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Header */}
            <div className="border-b border-white/5 bg-black/80 backdrop-blur-xl sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="font-bold text-lg">ScaledNative</Link>
                        <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                            Free Preview
                        </Badge>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex items-center gap-3 text-sm">
                            <Clock className="h-4 w-4 text-white/50" />
                            <span className="text-white/60">~30 min</span>
                        </div>
                        <Link href="/pricing">
                            <Button className="gap-2 bg-gradient-to-r from-purple-600 to-blue-600">
                                <Sparkles className="h-4 w-4" />
                                Unlock Full Course
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 py-3">
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-white/60">Progress</span>
                        <Progress value={progress} className="flex-1 h-2" />
                        <span className="text-sm text-white/60">{completedLessons.length}/5</span>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <h2 className="font-bold mb-4 flex items-center gap-2">
                            <BookOpen className="h-5 w-5 text-purple-400" />
                            AI-Native Essentials
                        </h2>
                        <div className="space-y-2">
                            {demoLessons.map((lesson) => (
                                <button
                                    key={lesson.id}
                                    onClick={() => {
                                        // If quiz is done, don't navigate to lesson - show completion
                                        if (quizScore !== null) return;
                                        setActiveLesson(lesson.id);
                                    }}
                                    disabled={quizScore !== null}
                                    className={cn(
                                        "w-full text-left p-3 rounded-lg border transition-all",
                                        quizScore !== null
                                            ? "opacity-50 cursor-not-allowed border-white/5 bg-white/[0.02]"
                                            : activeLesson === lesson.id
                                                ? "border-purple-500/50 bg-purple-500/10"
                                                : "border-white/5 hover:border-white/20 bg-white/[0.02]"
                                    )}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className={cn(
                                            "h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0",
                                            completedLessons.includes(lesson.id)
                                                ? "bg-emerald-500/20 text-emerald-400"
                                                : "bg-purple-500/20 text-purple-400"
                                        )}>
                                            {completedLessons.includes(lesson.id) ? (
                                                <CheckCircle2 className="h-4 w-4" />
                                            ) : (
                                                <lesson.icon className="h-4 w-4" />
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium truncate">{lesson.title}</p>
                                            <p className="text-xs text-white/40">{lesson.duration}</p>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>

                        {completedLessons.length >= 4 && (
                            <Button
                                onClick={() => setShowQuiz(true)}
                                className="w-full mt-4 gap-2"
                                variant={quizScore !== null ? "outline" : "default"}
                            >
                                <Target className="h-4 w-4" />
                                {quizScore !== null ? `Score: ${quizScore}/5` : "Take Quiz"}
                            </Button>
                        )}

                        {/* Locked Content Teaser */}
                        <div className="mt-6 p-4 rounded-xl bg-white/[0.02] border border-white/10">
                            <div className="flex items-center gap-2 mb-2">
                                <Lock className="h-4 w-4 text-white/40" />
                                <span className="text-sm font-medium">Full Curriculum</span>
                            </div>
                            <p className="text-xs text-white/40 mb-3">
                                11 modules • 100+ hours • 15 labs
                            </p>
                            <Link href="/pricing">
                                <Button size="sm" variant="outline" className="w-full">
                                    View Pricing
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        {/* Show completion screen if quiz is done */}
                        {quizScore !== null && !showQuiz ? (
                            <div className="text-center py-12 space-y-6">
                                <div className="h-20 w-20 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center mx-auto">
                                    <Award className="h-10 w-10 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold mb-2">Preview Complete!</h1>
                                    <p className="text-white/60 text-lg">
                                        You scored {quizScore}/5 on the quiz
                                    </p>
                                </div>
                                <div className="max-w-md mx-auto p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                                    <h2 className="font-bold mb-2">Ready for the full curriculum?</h2>
                                    <p className="text-sm text-white/60 mb-4">
                                        11 modules • 100+ hours • 15 interactive labs • Certification
                                    </p>
                                    <Link href="/pricing">
                                        <Button className="w-full gap-2 bg-gradient-to-r from-purple-600 to-blue-600">
                                            <Sparkles className="h-4 w-4" />
                                            View Pricing
                                        </Button>
                                    </Link>
                                </div>
                                <Button
                                    variant="ghost"
                                    onClick={() => {
                                        setQuizScore(null);
                                        setActiveLesson(1);
                                        setCompletedLessons([]);
                                    }}
                                    className="text-white/40"
                                >
                                    Restart Preview
                                </Button>
                            </div>
                        ) : showQuiz ? (
                            <DemoQuiz
                                onComplete={(score) => {
                                    setQuizScore(score);
                                    setShowQuiz(false);
                                }}
                                onBack={() => setShowQuiz(false)}
                            />
                        ) : currentLesson?.isLab ? (
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h1 className="text-2xl font-bold">{currentLesson.title}</h1>
                                        <p className="text-white/60 mt-1">{currentLesson.description}</p>
                                    </div>
                                    <Badge className="bg-blue-500/20 text-blue-300">Interactive Lab</Badge>
                                </div>
                                <PromptPlayground
                                    labId="ai-native-product-strategy"
                                    labName="Design an AI Agent"
                                    labDescription="Create a prompt that defines an effective AI agent for enterprise use."
                                    objectives={[
                                        "Define clear agent persona and capabilities",
                                        "Include organizational policies",
                                        "Specify guardrails and constraints",
                                    ]}
                                    placeholder={`Design an AI agent for enterprise customer support.

Example start:
"You are a customer support agent for Acme Corp...

CAPABILITIES:
- Answer product questions
- Look up order status
- Escalate billing issues

CONSTRAINTS:
- Never promise future features
- ..."

Write your agent prompt below:`}
                                    maxInputTokens={4000}
                                />
                                <div className="flex justify-end">
                                    <Button onClick={handleCompleteLesson} className="gap-2">
                                        Continue <ChevronRight className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        ) : currentLesson ? (
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h1 className="text-2xl font-bold">{currentLesson.title}</h1>
                                        <p className="text-white/60 mt-1">{currentLesson.description}</p>
                                    </div>
                                    <Badge className="bg-purple-500/20 text-purple-300">
                                        <Play className="h-3 w-3 mr-1" />
                                        {currentLesson.duration}
                                    </Badge>
                                </div>
                                <Card className="p-8 bg-white/[0.02]">
                                    <div className="prose prose-invert max-w-none text-white/80 whitespace-pre-line">
                                        {lessonContent[activeLesson] || "Content loading..."}
                                    </div>
                                </Card>
                                <div className="flex justify-between">
                                    {activeLesson > 1 && (
                                        <Button variant="outline" onClick={() => setActiveLesson(activeLesson - 1)}>
                                            Previous
                                        </Button>
                                    )}
                                    <Button onClick={handleCompleteLesson} className="gap-2 ml-auto">
                                        {activeLesson === 5 ? "Take Quiz" : "Continue"}
                                        <ChevronRight className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
}

function DemoQuiz({ onComplete, onBack }: { onComplete: (score: number) => void; onBack: () => void }) {
    const [currentQ, setCurrentQ] = useState(0);
    const [answers, setAnswers] = useState<number[]>([]);

    const questions = [
        {
            q: "What does 'A' in NATIVE framework stand for?",
            options: ["Autonomous", "Augmented", "Artificial", "Adaptive"],
            correct: 1,
        },
        {
            q: "What's the key difference between prompt and context engineering?",
            options: [
                "Prompt engineering is for beginners",
                "Context engineering focuses on what AI knows, not just what you ask",
                "They are the same thing",
                "Context engineering only works with GPT-4",
            ],
            correct: 1,
        },
        {
            q: "In AI-Native product strategy, what's the first question?",
            options: [
                "What AI tools should we buy?",
                "How do we replace all humans?",
                "What decisions can AI make autonomously?",
                "How do we add AI to existing features?",
            ],
            correct: 2,
        },
        {
            q: "What % of context window do most people use?",
            options: ["Less than 1%", "About 50%", "Around 80%", "100%"],
            correct: 0,
        },
        {
            q: "What makes production code generation different?",
            options: [
                "Using GPT-4 instead of GPT-3",
                "Role, constraints, context, examples, and output specs",
                "Writing longer prompts",
                "Paying for premium AI access",
            ],
            correct: 1,
        },
    ];

    const handleAnswer = (answerIndex: number) => {
        const newAnswers = [...answers, answerIndex];
        setAnswers(newAnswers);

        if (currentQ < questions.length - 1) {
            setCurrentQ(currentQ + 1);
        } else {
            const score = newAnswers.reduce((acc, ans, i) =>
                acc + (ans === questions[i].correct ? 1 : 0), 0
            );
            onComplete(score);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Quick Quiz</h1>
                <Badge>Q{currentQ + 1}/5</Badge>
            </div>
            <Card className="p-8 bg-white/[0.02]">
                <h2 className="text-xl font-medium mb-6">{questions[currentQ].q}</h2>
                <div className="space-y-3">
                    {questions[currentQ].options.map((option, i) => (
                        <button
                            key={i}
                            onClick={() => handleAnswer(i)}
                            className="w-full p-4 text-left rounded-lg border border-white/10 hover:border-purple-500/50 hover:bg-purple-500/5 transition-all"
                        >
                            <span className="font-medium text-white/50 mr-3">{String.fromCharCode(65 + i)}.</span>
                            {option}
                        </button>
                    ))}
                </div>
            </Card>
            <Button variant="outline" onClick={onBack}>Back to Lessons</Button>
        </div>
    );
}
