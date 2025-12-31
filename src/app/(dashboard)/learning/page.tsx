"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, Badge, Button, Progress } from "@/components/ui";
import {
    NetflixModuleCard,
    HorizontalScrollRow,
} from "@/components/ui/netflix-cards";
import {
    Play,
    Clock,
    BookOpen,
    ArrowRight,
    CheckCircle2,
    ChevronRight,
    Award,
    Sparkles,
    Brain,
    Shield,
    Workflow,
    TrendingUp,
    Heart,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Category gradients - Professional, muted enterprise tones
const categoryConfig: Record<string, { gradient: string; icon: React.ElementType }> = {
    "Agentic Agile SDLC": { gradient: "from-slate-600/40 via-zinc-600/25 to-slate-500/10", icon: Workflow },
    "AI & Technology": { gradient: "from-slate-700/40 via-slate-600/25 to-slate-500/10", icon: Brain },
    "Compliance": { gradient: "from-zinc-700/40 via-slate-600/25 to-zinc-500/10", icon: Shield },
    "Leadership": { gradient: "from-stone-700/40 via-stone-600/25 to-stone-500/10", icon: TrendingUp },
    "Healthcare": { gradient: "from-slate-700/40 via-zinc-600/25 to-slate-500/10", icon: Heart },
};

// In-progress courses with proper content and thumbnails
const inProgressCourses = [
    {
        id: "native-framework",
        title: "NATIVE Framework Foundations",
        description: "Master AI-native software delivery with the NATIVE operating model",
        category: "Agentic Agile SDLC",
        duration: "4 hrs",
        progress: 65,
        nextLesson: "Augment Execution",
        completedLessons: 13,
        totalLessons: 20,
        lastAccessed: "2 hours ago",
        rating: 4.9,
        thumbnail: "/images/training/network-security.png",
    },
    {
        id: "leadership-ai-era",
        title: "Leadership in the AI Era",
        description: "Lead your team through AI-driven transformation",
        category: "Leadership",
        duration: "5 hrs",
        progress: 30,
        nextLesson: "Building AI-First Culture",
        completedLessons: 4,
        totalLessons: 14,
        lastAccessed: "Yesterday",
        rating: 4.8,
        thumbnail: "/images/training/data-protection.png",
    },
    {
        id: "prompt-engineering",
        title: "Prompt Engineering Masterclass",
        description: "Advanced techniques for crafting effective AI prompts",
        category: "AI & Technology",
        duration: "4 hrs",
        progress: 80,
        nextLesson: "Chain-of-Thought Prompting",
        completedLessons: 10,
        totalLessons: 12,
        lastAccessed: "1 hour ago",
        rating: 4.8,
        thumbnail: "/images/training/cybersecurity-hero.png",
    },
];

// Completed courses
const completedCourses = [
    {
        id: "hipaa-2024",
        title: "HIPAA Privacy & Security 2024",
        description: "Complete HIPAA compliance training for healthcare organizations",
        category: "Compliance",
        duration: "4 hrs",
        completedDate: "Dec 20, 2024",
        certificateId: "HIPAA-2024-12345",
        rating: 4.8,
        thumbnail: "/images/training/compliance-hipaa.png",
    },
    {
        id: "nist-csf",
        title: "NIST CSF 2.0 Comprehensive",
        description: "Master the NIST Cybersecurity Framework 2.0",
        category: "Compliance",
        duration: "6 hrs",
        completedDate: "Dec 15, 2024",
        certificateId: "NIST-2024-67890",
        rating: 4.9,
        thumbnail: "/images/training/security-visual.png",
    },
];

// Recommended courses
const recommendedCourses = [
    { id: "agentic-ai", title: "Agentic AI Systems", description: "Build autonomous AI workflows", category: "AI & Technology", duration: "8 hrs", rating: 4.9, enrollments: 12500, isNew: true, difficulty: "advanced" as const, instructor: "Dr. Sarah Chen", sections: 20 },
    { id: "human-ai-collab", title: "Human-AI Collaboration", description: "Build effective human-AI partnerships", category: "Agentic Agile SDLC", duration: "4 hrs", rating: 4.8, enrollments: 31000, difficulty: "intermediate" as const, instructor: "Dr. Emily Rodriguez", sections: 14 },
    { id: "change-management", title: "Change Management Mastery", description: "Guide your organization through change", category: "Leadership", duration: "4 hrs", rating: 4.7, enrollments: 24000, difficulty: "intermediate" as const, instructor: "Dr. Michael Brown", sections: 12 },
    { id: "soc2", title: "SOC 2 Type II Deep Dive", description: "Implement Trust Service Criteria", category: "Compliance", duration: "5 hrs", rating: 4.7, enrollments: 15000, difficulty: "advanced" as const, instructor: "Robert Garcia", sections: 14 },
];

export default function LearningPage() {
    const router = useRouter();

    const handleModuleClick = (id: string) => {
        router.push(`/module/${id}`);
    };

    return (
        <div className="space-y-8 -mx-6 lg:-mx-8">
            {/* Header */}
            <div className="px-6 lg:px-8">
                <h1 className="text-2xl font-bold mb-2">My Learning</h1>
                <p className="text-muted-foreground">
                    Track your progress and continue where you left off
                </p>
            </div>

            {/* Continue Learning */}
            <div className="px-6 lg:px-8">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    Continue Learning ({inProgressCourses.length})
                </h2>

                <div className="grid gap-4">
                    {inProgressCourses.map((course) => {
                        const config = categoryConfig[course.category] || categoryConfig["AI & Technology"];
                        const CategoryIcon = config.icon;

                        return (
                            <Card
                                key={course.id}
                                className="overflow-hidden hover:border-primary/30 transition-all cursor-pointer group"
                                onClick={() => handleModuleClick(course.id)}
                            >
                                <div className="flex">
                                    {/* Image Thumbnail */}
                                    <div className="w-48 relative flex-shrink-0 overflow-hidden">
                                        <img
                                            src={course.thumbnail}
                                            alt={course.title}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black/30" />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="h-14 w-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                                                <Play className="h-6 w-6 text-white ml-0.5" />
                                            </div>
                                        </div>
                                        {/* Progress overlay at bottom */}
                                        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-black/30">
                                            <div
                                                className="h-full bg-white transition-all"
                                                style={{ width: `${course.progress}%` }}
                                            />
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-5 flex-1">
                                        <div className="flex items-start justify-between gap-4">
                                            <div>
                                                <Badge variant="outline" className="mb-2 text-xs">{course.category}</Badge>
                                                <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                                                    {course.title}
                                                </h3>
                                                <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                                                    {course.description}
                                                </p>
                                                <p className="text-sm text-primary mt-2">
                                                    Up next: {course.nextLesson}
                                                </p>
                                            </div>
                                            <Button className="gap-2 flex-shrink-0">
                                                Continue
                                                <ArrowRight className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        <div className="mt-4 flex items-center gap-4">
                                            <Progress value={course.progress} className="flex-1 h-2" />
                                            <span className="text-sm font-medium">{course.progress}%</span>
                                        </div>
                                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                                            <span>{course.completedLessons}/{course.totalLessons} lessons</span>
                                            <span>•</span>
                                            <span className="flex items-center gap-1">
                                                <Clock className="h-3 w-3" />
                                                {course.lastAccessed}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        );
                    })}
                </div>
            </div>

            {/* Recommended For You */}
            <div className="px-6 lg:px-8">
                <HorizontalScrollRow
                    title="Recommended For You"
                    subtitle="Based on your learning history"
                >
                    {recommendedCourses.map((course) => (
                        <NetflixModuleCard
                            key={course.id}
                            {...course}
                            onClick={() => handleModuleClick(course.id)}
                        />
                    ))}
                </HorizontalScrollRow>
            </div>

            {/* Completed */}
            <div className="px-6 lg:px-8 pb-8">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Award className="h-5 w-5 text-yellow-500" />
                    Completed ({completedCourses.length})
                </h2>

                <div className="grid md:grid-cols-2 gap-4">
                    {completedCourses.map((course) => {
                        const config = categoryConfig[course.category] || categoryConfig["Compliance"];
                        const CategoryIcon = config.icon;

                        return (
                            <Card
                                key={course.id}
                                className="overflow-hidden border-emerald-500/30 bg-emerald-500/5 hover:border-emerald-500/50 transition-all cursor-pointer group"
                                onClick={() => handleModuleClick(course.id)}
                            >
                                <div className="flex">
                                    {/* Completed Thumbnail with Image */}
                                    <div className="w-28 relative flex-shrink-0 overflow-hidden">
                                        <img
                                            src={course.thumbnail}
                                            alt={course.title}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-emerald-500/40 flex items-center justify-center">
                                            <CheckCircle2 className="h-10 w-10 text-white" />
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-4 flex-1">
                                        <Badge variant="outline" className="mb-2 text-xs border-emerald-500/30 text-emerald-600">{course.category}</Badge>
                                        <h3 className="font-semibold group-hover:text-primary transition-colors">
                                            {course.title}
                                        </h3>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            Completed {course.completedDate}
                                        </p>
                                        <div className="flex items-center gap-2 mt-3">
                                            <Link href="/certificates">
                                                <Button variant="outline" size="sm" className="gap-1 text-xs">
                                                    <Award className="h-3 w-3" />
                                                    View Certificate
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
