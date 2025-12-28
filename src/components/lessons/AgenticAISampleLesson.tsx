"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, Button, Badge, Progress } from "@/components/ui";
import {
    Play,
    CheckCircle2,
    XCircle,
    ArrowRight,
    ArrowLeft,
    Code,
    Brain,
    RefreshCw,
    Sparkles,
    BookOpen,
    Target,
    Lightbulb,
    Copy,
    ExternalLink
} from "lucide-react";
import { cn } from "@/lib/utils";

interface LessonSection {
    id: string;
    title: string;
    type: "content" | "code" | "quiz" | "interactive";
    completed: boolean;
}

interface QuizQuestion {
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
}

const sampleQuestions: QuizQuestion[] = [
    {
        id: "q1",
        question: "What is the key difference between traditional LLM usage and agentic AI?",
        options: [
            "Agentic AI uses larger models",
            "Agentic AI can iterate, reflect, and adapt to complete complex tasks",
            "Agentic AI is only for coding tasks",
            "Traditional LLMs are faster than agentic AI"
        ],
        correctIndex: 1,
        explanation: "Agentic AI represents a new paradigm where LLMs can plan, execute, reflect, and adapt through iterative, multi-step workflows—unlike simple prompt-response systems."
    },
    {
        id: "q2",
        question: "Which is NOT one of the four core agentic design patterns?",
        options: [
            "Reflection",
            "Tool Use",
            "Fine-Tuning",
            "Multi-Agent"
        ],
        correctIndex: 2,
        explanation: "The four core agentic design patterns are: Reflection, Tool Use, Planning, and Multi-Agent. Fine-tuning is a model training technique, not an agentic pattern."
    },
    {
        id: "q3",
        question: "In the Reflection pattern, what happens after the initial generation?",
        options: [
            "The output is immediately returned to the user",
            "A new prompt is generated for a different model",
            "The AI critiques its own work and iterates to improve",
            "The system switches to a multi-agent mode"
        ],
        correctIndex: 2,
        explanation: "In the Reflection pattern, the AI critiques its own output against criteria, then refines and iterates until a quality threshold is met—like automated code review for any AI output."
    },
    {
        id: "q4",
        question: "What is the primary purpose of the Tool Use pattern?",
        options: [
            "To train the model on new data",
            "To connect AI to databases, APIs, and external services for real-world actions",
            "To create multiple copies of the same agent",
            "To improve the model's response speed"
        ],
        correctIndex: 1,
        explanation: "The Tool Use pattern connects AI to external systems, enabling agents to perform actions like database queries, API calls, email sending, and code execution—not just text generation."
    },
    {
        id: "q5",
        question: "In multi-agent systems, what is a 'hierarchical' architecture?",
        options: [
            "Agents working in a pipeline fashion",
            "A manager agent coordinating specialized worker agents",
            "Agents that share a common memory store",
            "Agents competing for the same task"
        ],
        correctIndex: 1,
        explanation: "In hierarchical multi-agent architecture, a manager or orchestrator agent coordinates multiple specialized worker agents, each handling different aspects of a complex workflow."
    },
    {
        id: "q6",
        question: "What distinguishes 'adaptive planning' from other planning approaches?",
        options: [
            "It generates the complete plan before execution",
            "It creates detailed sub-plans for each step",
            "It modifies the plan based on outcomes during execution",
            "It uses only code execution for planning"
        ],
        correctIndex: 2,
        explanation: "Adaptive planning dynamically modifies the plan based on outcomes and results from previous steps, allowing agents to respond to unexpected situations and new information."
    }
];

const lessonSections: LessonSection[] = [
    { id: "intro", title: "Introduction to Agentic Workflows", type: "content", completed: true },
    { id: "patterns", title: "The Four Design Patterns", type: "content", completed: true },
    { id: "reflection-code", title: "Implementing Reflection Pattern", type: "code", completed: false },
    { id: "quiz", title: "Knowledge Check", type: "quiz", completed: false },
    { id: "lab", title: "Hands-On Lab", type: "interactive", completed: false },
];

export function AgenticAISampleLesson() {
    const [activeSection, setActiveSection] = useState(2);
    const [quizState, setQuizState] = useState<{
        currentQuestion: number;
        answers: (number | null)[];
        showResults: boolean;
    }>({ currentQuestion: 0, answers: Array(sampleQuestions.length).fill(null), showResults: false });
    const [expandedCode, setExpandedCode] = useState(true);

    const handleAnswer = (optionIndex: number) => {
        const newAnswers = [...quizState.answers];
        newAnswers[quizState.currentQuestion] = optionIndex;
        setQuizState({ ...quizState, answers: newAnswers });
    };

    const nextQuestion = () => {
        if (quizState.currentQuestion < sampleQuestions.length - 1) {
            setQuizState({ ...quizState, currentQuestion: quizState.currentQuestion + 1 });
        } else {
            setQuizState({ ...quizState, showResults: true });
        }
    };

    const resetQuiz = () => {
        setQuizState({ currentQuestion: 0, answers: [null, null, null], showResults: false });
    };

    const correctCount = quizState.answers.filter((a, i) => a === sampleQuestions[i].correctIndex).length;

    const labSteps = [
        { title: "Environment Setup", description: "Installing LangChain and configuring API keys" },
        { title: "Creating the Critic Agent", description: "Building the self-evaluation component" },
        { title: "Implementing Iteration Loop", description: "Adding the refinement cycle" },
        { title: "Testing Your Agent", description: "Running the complete reflection workflow" },
    ];

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="border-b border-border bg-muted/30 py-3 sm:py-4 px-4 sm:px-6">
                <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
                    <div className="flex items-center gap-3 sm:gap-4">
                        <Link href="/ai-native" className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center hover:bg-primary/30 transition-colors shrink-0">
                            <Brain className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                        </Link>
                        <div>
                            <Badge variant="outline" className="text-[10px] sm:text-xs mb-0.5 bg-primary/10 text-primary border-primary/30">
                                Module 3 • Sample
                            </Badge>
                            <h1 className="text-base sm:text-xl font-bold leading-tight">Agentic AI</h1>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                        <Progress value={40} className="w-full sm:w-32 h-2 max-w-[100px] sm:max-w-none" />
                        <span className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">40%</span>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto py-4 sm:py-8 px-4 sm:px-6 grid lg:grid-cols-4 gap-4 sm:gap-8">
                {/* Sidebar - Lesson Navigation */}
                <div className="lg:col-span-1">
                    <Card className="p-4">
                        <h3 className="font-semibold mb-4 text-sm">Lesson Sections</h3>
                        <div className="space-y-2">
                            {lessonSections.map((section, i) => (
                                <button
                                    key={section.id}
                                    onClick={() => setActiveSection(i)}
                                    className={cn(
                                        "w-full flex items-center gap-3 p-2 rounded-lg text-left text-sm transition-colors",
                                        activeSection === i ? "bg-primary/10 text-primary" : "hover:bg-muted",
                                        section.completed && "text-muted-foreground"
                                    )}
                                >
                                    <div className={cn(
                                        "w-6 h-6 rounded-full flex items-center justify-center text-xs",
                                        section.completed ? "bg-emerald-500/20 text-emerald-500" :
                                            activeSection === i ? "bg-primary text-primary-foreground" : "bg-muted"
                                    )}>
                                        {section.completed ? <CheckCircle2 className="h-3 w-3" /> : i + 1}
                                    </div>
                                    <span className="flex-1 truncate">{section.title}</span>
                                </button>
                            ))}
                        </div>
                    </Card>

                    {/* Key Takeaways */}
                    <Card className="p-4 mt-4 bg-primary/5 border-primary/20">
                        <h3 className="font-semibold mb-3 text-sm flex items-center gap-2">
                            <Lightbulb className="h-4 w-4 text-primary" />
                            Key Takeaways
                        </h3>
                        <ul className="space-y-2 text-xs text-muted-foreground">
                            <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-3 w-3 text-emerald-500 mt-0.5 shrink-0" />
                                <span>Agentic AI iterates to improve quality</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-3 w-3 text-emerald-500 mt-0.5 shrink-0" />
                                <span>4 patterns: Reflection, Tool Use, Planning, Multi-Agent</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-3 w-3 text-emerald-500 mt-0.5 shrink-0" />
                                <span>Agents can critique and refine their own work</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-3 w-3 text-emerald-500 mt-0.5 shrink-0" />
                                <span>Production agents need evaluation and optimization</span>
                            </li>
                        </ul>
                    </Card>

                    <Card className="p-4 mt-4">
                        <Link href="/ai-native">
                            <Button variant="outline" className="w-full gap-2">
                                <ArrowLeft className="h-4 w-4" />
                                Back to Curriculum
                            </Button>
                        </Link>
                    </Card>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-3 space-y-6">
                    {/* Code Section */}
                    {activeSection === 2 && (
                        <>
                            <Card className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        <Code className="h-5 w-5 text-primary" />
                                        <h2 className="text-lg font-semibold">Implementing the Reflection Pattern</h2>
                                    </div>
                                    <Button variant="ghost" size="sm" onClick={() => setExpandedCode(!expandedCode)} className="text-xs">
                                        {expandedCode ? "Collapse" : "Expand"}
                                    </Button>
                                </div>

                                <p className="text-muted-foreground mb-4">
                                    The Reflection pattern enables AI to critique its own work and iterate to improve quality.
                                    Below is a Python implementation using LangChain:
                                </p>

                                {expandedCode && (
                                    <div className="relative">
                                        <pre className="bg-zinc-900 rounded-lg p-4 overflow-x-auto text-sm">
                                            <code className="text-emerald-400">{`from langchain import LLMChain, PromptTemplate
from langchain.chat_models import ChatOpenAI

# Initialize the LLM
llm = ChatOpenAI(model="gpt-4", temperature=0.7)

# Step 1: Generate initial output
generator_prompt = PromptTemplate(
    input_variables=["task"],
    template="""Generate a solution for: {task}
    
Be thorough and consider edge cases."""
)

# Step 2: Critique the output
critic_prompt = PromptTemplate(
    input_variables=["solution", "task"],
    template="""Review this solution for the task: {task}

Solution: {solution}

Provide specific, actionable feedback on:
1. Correctness
2. Completeness  
3. Edge cases
4. Improvements needed"""
)

# Step 3: Refine based on critique
refiner_prompt = PromptTemplate(
    input_variables=["solution", "critique", "task"],
    template="""Improve this solution based on the critique.

Original Task: {task}
Original Solution: {solution}
Critique: {critique}

Provide an improved solution:"""
)

def reflection_agent(task: str, max_iterations: int = 3):
    """Agentic reflection pattern implementation"""
    
    # Initial generation
    generator = LLMChain(llm=llm, prompt=generator_prompt)
    solution = generator.run(task=task)
    
    for i in range(max_iterations):
        # Critique
        critic = LLMChain(llm=llm, prompt=critic_prompt)
        critique = critic.run(solution=solution, task=task)
        
        # Check if critique indicates quality is sufficient
        if "no major issues" in critique.lower():
            break
            
        # Refine
        refiner = LLMChain(llm=llm, prompt=refiner_prompt)
        solution = refiner.run(
            solution=solution, 
            critique=critique, 
            task=task
        )
    
    return solution`}</code>
                                        </pre>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="absolute top-2 right-2"
                                            title="Copy code"
                                            onClick={() => navigator.clipboard.writeText('# Code copied!')}
                                        >
                                            <Copy className="h-4 w-4" />
                                        </Button>
                                    </div>
                                )}

                                <div className="mt-4 p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                                    <div className="flex items-start gap-2">
                                        <Lightbulb className="h-5 w-5 text-amber-500 mt-0.5" />
                                        <div>
                                            <h4 className="font-medium text-amber-500 mb-1">Key Insight</h4>
                                            <p className="text-sm text-muted-foreground">
                                                The reflection pattern typically improves output quality by 20-40% compared to
                                                single-pass generation, especially for complex tasks like code generation,
                                                analysis, and content creation.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            <div className="flex justify-between">
                                <Button variant="outline" onClick={() => setActiveSection(1)}>
                                    <ArrowLeft className="h-4 w-4 mr-2" />
                                    Previous
                                </Button>
                                <Button onClick={() => setActiveSection(3)}>
                                    Continue to Quiz
                                    <ArrowRight className="h-4 w-4 ml-2" />
                                </Button>
                            </div>
                        </>
                    )}

                    {/* Quiz Section */}
                    {activeSection === 3 && !quizState.showResults && (
                        <Card className="p-6">
                            <div className="flex items-center gap-2 mb-6">
                                <Target className="h-5 w-5 text-primary" />
                                <h2 className="text-lg font-semibold">Knowledge Check</h2>
                                <Badge variant="outline" className="ml-auto">
                                    {quizState.currentQuestion + 1} of {sampleQuestions.length}
                                </Badge>
                            </div>

                            <Progress
                                value={(quizState.currentQuestion / sampleQuestions.length) * 100}
                                className="h-1 mb-6"
                            />

                            <div className="space-y-6">
                                <h3 className="text-lg font-medium">
                                    {sampleQuestions[quizState.currentQuestion].question}
                                </h3>

                                <div className="space-y-3">
                                    {sampleQuestions[quizState.currentQuestion].options.map((option, i) => {
                                        const isSelected = quizState.answers[quizState.currentQuestion] === i;
                                        return (
                                            <button
                                                key={i}
                                                onClick={() => handleAnswer(i)}
                                                className={cn(
                                                    "w-full p-4 rounded-lg border text-left transition-all",
                                                    isSelected
                                                        ? "border-primary bg-primary/10"
                                                        : "border-border hover:border-primary/50"
                                                )}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className={cn(
                                                        "w-6 h-6 rounded-full border-2 flex items-center justify-center",
                                                        isSelected ? "border-primary bg-primary" : "border-muted-foreground"
                                                    )}>
                                                        {isSelected && <CheckCircle2 className="h-4 w-4 text-primary-foreground" />}
                                                    </div>
                                                    <span>{option}</span>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>

                                <div className="flex justify-end">
                                    <Button
                                        onClick={nextQuestion}
                                        disabled={quizState.answers[quizState.currentQuestion] === null}
                                    >
                                        {quizState.currentQuestion < sampleQuestions.length - 1 ? "Next Question" : "See Results"}
                                        <ArrowRight className="h-4 w-4 ml-2" />
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    )}

                    {/* Quiz Results */}
                    {activeSection === 3 && quizState.showResults && (
                        <Card className="p-6">
                            <div className="text-center mb-8">
                                <div className={cn(
                                    "w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4",
                                    correctCount === sampleQuestions.length
                                        ? "bg-emerald-500/20"
                                        : correctCount >= 2
                                            ? "bg-amber-500/20"
                                            : "bg-red-500/20"
                                )}>
                                    <span className="text-3xl font-bold">
                                        {correctCount}/{sampleQuestions.length}
                                    </span>
                                </div>
                                <h2 className="text-xl font-bold mb-2">
                                    {correctCount === sampleQuestions.length
                                        ? "Perfect Score! 🎉"
                                        : correctCount >= 2
                                            ? "Good Job! 👍"
                                            : "Keep Learning! 📚"}
                                </h2>
                                <p className="text-muted-foreground">
                                    You answered {correctCount} out of {sampleQuestions.length} questions correctly
                                </p>
                            </div>

                            <div className="space-y-4 mb-6">
                                {sampleQuestions.map((q, i) => {
                                    const userAnswer = quizState.answers[i];
                                    const isCorrect = userAnswer === q.correctIndex;
                                    return (
                                        <div key={q.id} className={cn(
                                            "p-4 rounded-lg border",
                                            isCorrect ? "border-emerald-500/30 bg-emerald-500/5" : "border-red-500/30 bg-red-500/5"
                                        )}>
                                            <div className="flex items-start gap-2 mb-2">
                                                {isCorrect ? (
                                                    <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5" />
                                                ) : (
                                                    <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                                                )}
                                                <div>
                                                    <p className="font-medium">{q.question}</p>
                                                    {!isCorrect && (
                                                        <p className="text-sm text-muted-foreground mt-1">
                                                            Correct answer: {q.options[q.correctIndex]}
                                                        </p>
                                                    )}
                                                    <p className="text-sm text-muted-foreground mt-2 italic">
                                                        {q.explanation}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="flex justify-between">
                                <Button variant="outline" onClick={resetQuiz}>
                                    <RefreshCw className="h-4 w-4 mr-2" />
                                    Retry Quiz
                                </Button>
                                <Button onClick={() => setActiveSection(4)}>
                                    Continue to Lab
                                    <ArrowRight className="h-4 w-4 ml-2" />
                                </Button>
                            </div>
                        </Card>
                    )}

                    {/* Interactive Lab */}
                    {activeSection === 4 && (
                        <Card className="p-8 text-center">
                            <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
                                <Sparkles className="h-10 w-10 text-primary" />
                            </div>
                            <h2 className="text-2xl font-bold mb-4">Hands-On Coding Lab</h2>
                            <p className="text-muted-foreground mb-2 max-w-lg mx-auto">
                                Build your own Reflection Agent step-by-step in our interactive code editor.
                            </p>
                            <p className="text-sm text-muted-foreground mb-6 max-w-lg mx-auto">
                                Each step requires you to write real code that gets validated before you can proceed.
                            </p>
                            <div className="flex items-center justify-center gap-4">
                                <Link href="/ai-native/lab">
                                    <Button size="lg" className="gap-2">
                                        <Play className="h-5 w-5" />
                                        Start Interactive Lab
                                    </Button>
                                </Link>
                                <a href="https://github.com/langchain-ai/langgraph" target="_blank" rel="noopener noreferrer">
                                    <Button size="lg" variant="outline" className="gap-2">
                                        <ExternalLink className="h-5 w-5" />
                                        View on GitHub
                                    </Button>
                                </a>
                            </div>
                            <div className="mt-6 p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 max-w-md mx-auto">
                                <div className="flex items-center gap-2 justify-center text-emerald-500 text-sm">
                                    <CheckCircle2 className="h-4 w-4" />
                                    <span>4 coding exercises with real-time validation</span>
                                </div>
                            </div>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AgenticAISampleLesson;

