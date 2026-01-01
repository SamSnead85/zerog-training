"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Card, Badge, Button, Progress } from "@/components/ui";
import {
    Award,
    Clock,
    CheckCircle2,
    ChevronLeft,
    AlertCircle,
    FileText,
    Shield,
    RefreshCcw,
    ArrowRight,
    Target,
    BookOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Exam data for each certification track
const examData: Record<string, {
    trackId: string;
    trackTitle: string;
    examTitle: string;
    description: string;
    duration: number; // minutes
    questions: number;
    passingScore: number;
    attempts: number;
    topics: Array<{ name: string; questionCount: number; weight: number }>;
    rules: string[];
    tips: string[];
}> = {
    "native-practitioner": {
        trackId: "native-practitioner",
        trackTitle: "NATIVE Certified Practitioner",
        examTitle: "NATIVE Practitioner Certification Exam",
        description: "This comprehensive exam tests your understanding of the NATIVE framework and your ability to apply AI-native practices in real-world scenarios.",
        duration: 90,
        questions: 50,
        passingScore: 75,
        attempts: 3,
        topics: [
            { name: "NATIVE Framework Foundations", questionCount: 12, weight: 24 },
            { name: "Human-AI Collaboration", questionCount: 10, weight: 20 },
            { name: "Prompt Engineering", questionCount: 12, weight: 24 },
            { name: "Agentic Workflows", questionCount: 10, weight: 20 },
            { name: "AI Testing & Validation", questionCount: 6, weight: 12 },
        ],
        rules: [
            "You have 90 minutes to complete all 50 questions",
            "You cannot pause the exam once started",
            "All questions must be answered to submit",
            "You need 75% or higher to pass",
            "You have 3 attempts included with your enrollment",
            "Results are available immediately after submission",
        ],
        tips: [
            "Review all course materials before attempting the exam",
            "Complete all hands-on exercises first",
            "Read each question carefully before answering",
            "Flag difficult questions and return to them later",
            "Manage your time - about 1.5 minutes per question",
        ],
    },
    "ai-engineer": {
        trackId: "ai-engineer",
        trackTitle: "AI Engineering Professional",
        examTitle: "AI Engineering Professional Certification Exam",
        description: "This advanced exam validates your expertise in designing, building, and deploying enterprise-grade AI systems.",
        duration: 120,
        questions: 60,
        passingScore: 75,
        attempts: 3,
        topics: [
            { name: "Agentic AI Systems", questionCount: 14, weight: 23 },
            { name: "Prompt Engineering", questionCount: 10, weight: 17 },
            { name: "AI Architecture Patterns", questionCount: 12, weight: 20 },
            { name: "AI Security", questionCount: 10, weight: 17 },
            { name: "MLOps & AI Operations", questionCount: 10, weight: 17 },
            { name: "AI Ethics & Governance", questionCount: 4, weight: 6 },
        ],
        rules: [
            "You have 120 minutes to complete all 60 questions",
            "You cannot pause the exam once started",
            "All questions must be answered to submit",
            "You need 75% or higher to pass",
            "You have 3 attempts included with your enrollment",
            "Results are available immediately after submission",
        ],
        tips: [
            "Focus extra attention on Agentic AI and Architecture topics",
            "Practice with the hands-on labs before attempting",
            "Review security best practices thoroughly",
            "Understand MLOps concepts and tools",
            "Budget 2 minutes per question on average",
        ],
    },
    "prompt-specialist": {
        trackId: "prompt-specialist",
        trackTitle: "Prompt Engineering Specialist",
        examTitle: "Prompt Engineering Specialist Certification Exam",
        description: "This focused exam validates your mastery of prompt engineering techniques and best practices.",
        duration: 60,
        questions: 40,
        passingScore: 75,
        attempts: 3,
        topics: [
            { name: "Prompt Engineering Fundamentals", questionCount: 15, weight: 38 },
            { name: "Advanced Prompting Techniques", questionCount: 15, weight: 38 },
            { name: "Prompt Optimization & Testing", questionCount: 10, weight: 24 },
        ],
        rules: [
            "You have 60 minutes to complete all 40 questions",
            "You cannot pause the exam once started",
            "All questions must be answered to submit",
            "You need 75% or higher to pass",
            "You have 3 attempts included with your enrollment",
        ],
        tips: [
            "Practice writing prompts for various scenarios",
            "Understand Chain-of-Thought and ReAct patterns",
            "Know the differences between LLM providers",
            "Review prompt optimization strategies",
        ],
    },
    "ai-leader": {
        trackId: "ai-leader",
        trackTitle: "AI Transformation Leader",
        examTitle: "AI Transformation Leader Certification Exam",
        description: "This executive-level exam validates your ability to lead AI transformation initiatives in organizations.",
        duration: 60,
        questions: 40,
        passingScore: 75,
        attempts: 3,
        topics: [
            { name: "NATIVE Framework for Leaders", questionCount: 10, weight: 25 },
            { name: "AI Leadership & Strategy", questionCount: 12, weight: 30 },
            { name: "AI Roadmapping", questionCount: 10, weight: 25 },
            { name: "Change Management", questionCount: 8, weight: 20 },
        ],
        rules: [
            "You have 60 minutes to complete all 40 questions",
            "You cannot pause the exam once started",
            "All questions must be answered to submit",
            "You need 75% or higher to pass",
            "You have 3 attempts included with your enrollment",
        ],
        tips: [
            "Focus on strategic thinking, not technical details",
            "Understand ROI calculation for AI initiatives",
            "Know change management best practices",
            "Review case studies from the courses",
        ],
    },
};

export default function ExamPage() {
    const params = useParams();
    const router = useRouter();
    const trackId = params.trackId as string;
    const exam = examData[trackId];
    const [acknowledged, setAcknowledged] = useState(false);

    if (!exam) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-16 text-center">
                <h1 className="text-2xl font-bold mb-4">Exam Not Found</h1>
                <p className="text-muted-foreground mb-6">
                    The certification exam you're looking for doesn't exist.
                </p>
                <Link href="/learn/tracks">
                    <Button>View All Tracks</Button>
                </Link>
            </div>
        );
    }

    const handleStartExam = () => {
        if (acknowledged) {
            router.push(`/learn/certifications/${trackId}/exam/take`);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Breadcrumb */}
            <Link
                href={`/learn/tracks/${trackId}`}
                className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6"
            >
                <ChevronLeft className="h-4 w-4" />
                Back to {exam.trackTitle}
            </Link>

            {/* Header */}
            <div className="mb-8">
                <Badge className="mb-4 bg-amber-500/10 text-amber-500 border-amber-500/20">
                    <Award className="h-3 w-3 mr-1" />
                    Certification Exam
                </Badge>
                <h1 className="text-3xl font-bold mb-3">{exam.examTitle}</h1>
                <p className="text-muted-foreground">{exam.description}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
                {/* Exam Stats */}
                <Card className="p-4 text-center">
                    <FileText className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <div className="text-2xl font-bold">{exam.questions}</div>
                    <div className="text-sm text-muted-foreground">Questions</div>
                </Card>
                <Card className="p-4 text-center">
                    <Clock className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <div className="text-2xl font-bold">{exam.duration}</div>
                    <div className="text-sm text-muted-foreground">Minutes</div>
                </Card>
                <Card className="p-4 text-center">
                    <Target className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <div className="text-2xl font-bold">{exam.passingScore}%</div>
                    <div className="text-sm text-muted-foreground">To Pass</div>
                </Card>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
                {/* Topics */}
                <Card className="p-6">
                    <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-primary" />
                        Exam Topics
                    </h2>
                    <div className="space-y-4">
                        {exam.topics.map((topic, i) => (
                            <div key={i}>
                                <div className="flex justify-between text-sm mb-1">
                                    <span>{topic.name}</span>
                                    <span className="text-muted-foreground">
                                        {topic.questionCount} questions ({topic.weight}%)
                                    </span>
                                </div>
                                <Progress value={topic.weight} className="h-2" />
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Rules */}
                <Card className="p-6">
                    <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <Shield className="h-5 w-5 text-primary" />
                        Exam Rules
                    </h2>
                    <ul className="space-y-2">
                        {exam.rules.map((rule, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm">
                                <AlertCircle className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                                {rule}
                            </li>
                        ))}
                    </ul>
                </Card>
            </div>

            {/* Tips */}
            <Card className="p-6 mb-8 bg-emerald-500/5 border-emerald-500/20">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                    Tips for Success
                </h2>
                <ul className="space-y-2">
                    {exam.tips.map((tip, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                            {tip}
                        </li>
                    ))}
                </ul>
            </Card>

            {/* Attempts */}
            <Card className="p-6 mb-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="font-medium">Exam Attempts</h3>
                        <p className="text-sm text-muted-foreground">
                            You have {exam.attempts} attempts included with your enrollment
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <RefreshCcw className="h-4 w-4 text-muted-foreground" />
                        <span className="text-lg font-bold">{exam.attempts}/3</span>
                        <span className="text-sm text-muted-foreground">remaining</span>
                    </div>
                </div>
            </Card>

            {/* Start Exam */}
            <Card className="p-6">
                <div className="flex items-start gap-3 mb-6">
                    <input
                        type="checkbox"
                        id="acknowledge"
                        checked={acknowledged}
                        onChange={(e) => setAcknowledged(e.target.checked)}
                        className="mt-1"
                    />
                    <label htmlFor="acknowledge" className="text-sm">
                        I understand that once I start the exam, I cannot pause it. I have reviewed
                        the exam rules and I'm ready to complete all {exam.questions} questions within{" "}
                        {exam.duration} minutes.
                    </label>
                </div>

                <Button
                    className="w-full gap-2 text-lg py-6"
                    disabled={!acknowledged}
                    onClick={handleStartExam}
                >
                    Start Exam Now
                    <ArrowRight className="h-5 w-5" />
                </Button>
            </Card>
        </div>
    );
}
