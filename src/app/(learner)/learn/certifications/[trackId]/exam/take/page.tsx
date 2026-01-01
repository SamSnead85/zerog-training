"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { Card, Badge, Button, Progress } from "@/components/ui";
import {
    Clock,
    ChevronLeft,
    ChevronRight,
    Flag,
    AlertCircle,
    CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Sample exam questions - in production would come from database
const examQuestions: Record<string, Array<{
    id: string;
    question: string;
    options: string[];
    correctAnswer: number;
    topic: string;
}>> = {
    "native-practitioner": [
        {
            id: "np-1",
            question: "What does NATIVE stand for in the NATIVE framework?",
            options: [
                "Neural-Augmented Teams for Intelligent Value Engineering",
                "Natural AI Technology for Innovative Virtual Experiences",
                "New AI Training for Integrated Virtual Environments",
                "Neural Application Technology for Intelligent Virtual Entities",
            ],
            correctAnswer: 0,
            topic: "NATIVE Framework Foundations",
        },
        {
            id: "np-2",
            question: "Which phase of the NATIVE framework focuses on understanding existing workflows?",
            options: [
                "Navigate",
                "Assess",
                "Transform",
                "Integrate",
            ],
            correctAnswer: 1,
            topic: "NATIVE Framework Foundations",
        },
        {
            id: "np-3",
            question: "What is the primary goal of human-AI collaboration in AI-native development?",
            options: [
                "Replace human developers with AI",
                "Augment human capabilities while maintaining oversight",
                "Reduce development costs",
                "Speed up release cycles",
            ],
            correctAnswer: 1,
            topic: "Human-AI Collaboration",
        },
        {
            id: "np-4",
            question: "Which prompting technique asks the LLM to explain its reasoning step by step?",
            options: [
                "Zero-shot prompting",
                "Few-shot prompting",
                "Chain-of-thought prompting",
                "Role prompting",
            ],
            correctAnswer: 2,
            topic: "Prompt Engineering",
        },
        {
            id: "np-5",
            question: "What is the ReAct pattern in agent design?",
            options: [
                "A JavaScript framework for AI",
                "Reasoning and Acting in an interleaved loop",
                "Real-time Action processing",
                "Reactive Architecture for Teams",
            ],
            correctAnswer: 1,
            topic: "Agentic Workflows",
        },
        {
            id: "np-6",
            question: "What is the purpose of 'temperature' in LLM API calls?",
            options: [
                "To control the length of responses",
                "To control randomness/creativity of outputs",
                "To set the maximum tokens",
                "To enable streaming",
            ],
            correctAnswer: 1,
            topic: "Prompt Engineering",
        },
        {
            id: "np-7",
            question: "Which type of testing evaluates if an LLM's output is factually grounded?",
            options: [
                "Unit testing",
                "Integration testing",
                "Hallucination detection",
                "Load testing",
            ],
            correctAnswer: 2,
            topic: "AI Testing & Validation",
        },
        {
            id: "np-8",
            question: "What is the core agent loop?",
            options: [
                "Input → Process → Output",
                "Observe → Think → Act → Observe",
                "Query → Retrieve → Generate",
                "Plan → Execute → Review",
            ],
            correctAnswer: 1,
            topic: "Agentic Workflows",
        },
        {
            id: "np-9",
            question: "In the NATIVE framework, what does the 'Vi' component represent?",
            options: [
                "Visual Interface",
                "Validated Integration",
                "Value generation and intelligence amplification",
                "Virtual Infrastructure",
            ],
            correctAnswer: 2,
            topic: "NATIVE Framework Foundations",
        },
        {
            id: "np-10",
            question: "What is few-shot prompting?",
            options: [
                "Prompting with minimal text",
                "Including examples in the prompt to guide the model",
                "Limiting the number of API calls",
                "Using short prompts only",
            ],
            correctAnswer: 1,
            topic: "Prompt Engineering",
        },
        // Add more questions as needed - this is a sample
    ],
    "ai-engineer": [
        {
            id: "ae-1",
            question: "What is RAG in the context of LLM applications?",
            options: [
                "Random Access Generation",
                "Retrieval-Augmented Generation",
                "Rapid AI Generation",
                "Recursive Algorithm Generation",
            ],
            correctAnswer: 1,
            topic: "Agentic AI Systems",
        },
        {
            id: "ae-2",
            question: "What is the primary defense against prompt injection attacks?",
            options: [
                "Using HTTPS",
                "Input validation and sanitization",
                "Encryption",
                "Rate limiting",
            ],
            correctAnswer: 1,
            topic: "AI Security",
        },
        // Add more questions
    ],
    "prompt-specialist": [
        {
            id: "ps-1",
            question: "What is the purpose of a system prompt?",
            options: [
                "To process user input",
                "To set the AI's behavior, role, and constraints",
                "To store conversation history",
                "To connect to APIs",
            ],
            correctAnswer: 1,
            topic: "Prompt Engineering Fundamentals",
        },
    ],
    "ai-leader": [
        {
            id: "al-1",
            question: "What is the primary goal of AI transformation leadership?",
            options: [
                "Replacing all employees with AI",
                "Strategically integrating AI to enhance organizational capabilities",
                "Reducing technology spending",
                "Outsourcing AI development",
            ],
            correctAnswer: 1,
            topic: "AI Leadership & Strategy",
        },
    ],
};

export default function TakeExamPage() {
    const params = useParams();
    const router = useRouter();
    const trackId = params.trackId as string;
    const questions = examQuestions[trackId] || [];

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<Record<number, number>>({});
    const [flagged, setFlagged] = useState<Set<number>>(new Set());
    const [timeRemaining, setTimeRemaining] = useState(90 * 60); // 90 minutes in seconds
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [score, setScore] = useState(0);

    // Timer
    useEffect(() => {
        if (timeRemaining <= 0) {
            handleSubmit();
            return;
        }

        const timer = setInterval(() => {
            setTimeRemaining((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeRemaining]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    const handleAnswerSelect = (optionIndex: number) => {
        setAnswers((prev) => ({
            ...prev,
            [currentQuestion]: optionIndex,
        }));
    };

    const toggleFlag = () => {
        setFlagged((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(currentQuestion)) {
                newSet.delete(currentQuestion);
            } else {
                newSet.add(currentQuestion);
            }
            return newSet;
        });
    };

    const handleSubmit = useCallback(() => {
        setIsSubmitting(true);

        // Calculate score
        let correct = 0;
        questions.forEach((q, idx) => {
            if (answers[idx] === q.correctAnswer) {
                correct++;
            }
        });

        const percentage = Math.round((correct / questions.length) * 100);
        setScore(percentage);
        setShowResults(true);
        setIsSubmitting(false);
    }, [answers, questions]);

    const answeredCount = Object.keys(answers).length;
    const progress = Math.round((answeredCount / questions.length) * 100);

    if (questions.length === 0) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-16 text-center">
                <h1 className="text-2xl font-bold mb-4">Exam Not Available</h1>
                <p className="text-muted-foreground mb-6">
                    This exam is not currently available.
                </p>
                <Button onClick={() => router.back()}>Go Back</Button>
            </div>
        );
    }

    if (showResults) {
        const passed = score >= 75;

        return (
            <div className="max-w-2xl mx-auto px-4 py-16 text-center">
                <div className={cn(
                    "h-24 w-24 rounded-full mx-auto mb-6 flex items-center justify-center",
                    passed ? "bg-emerald-500/20" : "bg-red-500/20"
                )}>
                    {passed ? (
                        <CheckCircle2 className="h-12 w-12 text-emerald-500" />
                    ) : (
                        <AlertCircle className="h-12 w-12 text-red-500" />
                    )}
                </div>

                <h1 className="text-3xl font-bold mb-4">
                    {passed ? "Congratulations!" : "Keep Learning"}
                </h1>

                <div className="text-6xl font-bold mb-4">
                    {score}%
                </div>

                <p className="text-lg text-muted-foreground mb-8">
                    {passed
                        ? "You've passed the certification exam! Your certificate will be issued shortly."
                        : "You didn't pass this time. Review the course materials and try again."}
                </p>

                <div className="flex justify-center gap-4">
                    {passed ? (
                        <Button className="gap-2" onClick={() => router.push(`/learn/certifications/${trackId}/certificate`)}>
                            View Certificate
                        </Button>
                    ) : (
                        <Button variant="outline" onClick={() => router.push(`/learn/tracks/${trackId}`)}>
                            Review Course Materials
                        </Button>
                    )}
                    <Button variant="outline" onClick={() => router.push("/learn/tracks")}>
                        All Tracks
                    </Button>
                </div>
            </div>
        );
    }

    const currentQ = questions[currentQuestion];

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="sticky top-0 z-50 bg-background border-b">
                <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Badge variant="outline">
                            Question {currentQuestion + 1} of {questions.length}
                        </Badge>
                        <Progress value={progress} className="w-32 h-2" />
                        <span className="text-sm text-muted-foreground">
                            {answeredCount}/{questions.length} answered
                        </span>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className={cn(
                            "flex items-center gap-2 px-3 py-1.5 rounded-lg font-mono text-lg",
                            timeRemaining < 300 ? "bg-red-500/20 text-red-500" : "bg-muted"
                        )}>
                            <Clock className="h-4 w-4" />
                            {formatTime(timeRemaining)}
                        </div>
                        <Button
                            variant="destructive"
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                        >
                            Submit Exam
                        </Button>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="grid md:grid-cols-4 gap-8">
                    {/* Question Area */}
                    <div className="md:col-span-3">
                        <Card className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <Badge variant="outline" className="text-xs">
                                    {currentQ.topic}
                                </Badge>
                                <Button
                                    variant={flagged.has(currentQuestion) ? "default" : "ghost"}
                                    size="sm"
                                    className="gap-1"
                                    onClick={toggleFlag}
                                >
                                    <Flag className={cn("h-4 w-4", flagged.has(currentQuestion) && "fill-current")} />
                                    {flagged.has(currentQuestion) ? "Flagged" : "Flag"}
                                </Button>
                            </div>

                            <h2 className="text-xl font-medium mb-6">{currentQ.question}</h2>

                            <div className="space-y-3">
                                {currentQ.options.map((option, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleAnswerSelect(idx)}
                                        className={cn(
                                            "w-full p-4 text-left rounded-lg border transition-all",
                                            answers[currentQuestion] === idx
                                                ? "border-primary bg-primary/10"
                                                : "border-border hover:border-primary/50"
                                        )}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={cn(
                                                "h-6 w-6 rounded-full border-2 flex items-center justify-center",
                                                answers[currentQuestion] === idx
                                                    ? "border-primary bg-primary text-primary-foreground"
                                                    : "border-muted-foreground"
                                            )}>
                                                {answers[currentQuestion] === idx && (
                                                    <CheckCircle2 className="h-4 w-4" />
                                                )}
                                            </div>
                                            <span>{option}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>

                            <div className="flex justify-between mt-8">
                                <Button
                                    variant="outline"
                                    disabled={currentQuestion === 0}
                                    onClick={() => setCurrentQuestion((prev) => prev - 1)}
                                >
                                    <ChevronLeft className="h-4 w-4 mr-1" />
                                    Previous
                                </Button>
                                <Button
                                    disabled={currentQuestion === questions.length - 1}
                                    onClick={() => setCurrentQuestion((prev) => prev + 1)}
                                >
                                    Next
                                    <ChevronRight className="h-4 w-4 ml-1" />
                                </Button>
                            </div>
                        </Card>
                    </div>

                    {/* Question Navigator */}
                    <div className="md:col-span-1">
                        <Card className="p-4 sticky top-20">
                            <h3 className="font-medium mb-3 text-sm">Questions</h3>
                            <div className="grid grid-cols-5 gap-2">
                                {questions.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentQuestion(idx)}
                                        className={cn(
                                            "h-8 w-8 rounded text-xs font-medium transition-colors",
                                            currentQuestion === idx && "ring-2 ring-primary",
                                            answers[idx] !== undefined
                                                ? "bg-primary text-primary-foreground"
                                                : "bg-muted",
                                            flagged.has(idx) && "bg-amber-500 text-amber-foreground"
                                        )}
                                    >
                                        {idx + 1}
                                    </button>
                                ))}
                            </div>

                            <div className="mt-4 pt-4 border-t space-y-2 text-xs">
                                <div className="flex items-center gap-2">
                                    <div className="h-4 w-4 rounded bg-muted" />
                                    <span>Not answered</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="h-4 w-4 rounded bg-primary" />
                                    <span>Answered</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="h-4 w-4 rounded bg-amber-500" />
                                    <span>Flagged</span>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
