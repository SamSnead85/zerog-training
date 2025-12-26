"use client";

import { useState } from "react";
import { Card, Badge, Button, Progress } from "@/components/ui";
import {
    BookOpen,
    Clock,
    Users,
    Star,
    CheckCircle2,
    Play,
    FileText,
    Shield,
    Heart,
    Stethoscope,
    Brain,
    AlertTriangle,
    Sparkles,
    ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface PrebuiltCourse {
    id: string;
    title: string;
    description: string;
    category: string;
    duration: string;
    modules: number;
    rating: number;
    enrollments: number;
    isRequired: boolean;
    icon: React.ElementType;
    tags: string[];
}

const healthcareCourses: PrebuiltCourse[] = [
    {
        id: "hipaa-2024",
        title: "HIPAA Privacy & Security 2024",
        description: "Comprehensive HIPAA training covering the Privacy Rule, Security Rule, and Breach Notification Rule. Updated for 2024 regulations.",
        category: "Compliance",
        duration: "2.5 hours",
        modules: 8,
        rating: 4.8,
        enrollments: 12500,
        isRequired: true,
        icon: Shield,
        tags: ["Required", "Annual", "Updated 2024"],
    },
    {
        id: "bloodborne",
        title: "Bloodborne Pathogens (OSHA)",
        description: "OSHA-compliant training on bloodborne pathogens exposure prevention, universal precautions, and post-exposure procedures.",
        category: "Safety",
        duration: "1.5 hours",
        modules: 5,
        rating: 4.7,
        enrollments: 8900,
        isRequired: true,
        icon: Heart,
        tags: ["OSHA", "Clinical Staff"],
    },
    {
        id: "infection-control",
        title: "Infection Prevention & Control",
        description: "Evidence-based infection prevention practices including hand hygiene, PPE use, and isolation precautions.",
        category: "Clinical",
        duration: "2 hours",
        modules: 6,
        rating: 4.9,
        enrollments: 7500,
        isRequired: true,
        icon: Stethoscope,
        tags: ["Required", "Clinical Staff"],
    },
    {
        id: "ai-healthcare",
        title: "AI in Healthcare: Foundations",
        description: "Introduction to AI technologies in healthcare settings. Covers clinical decision support, documentation assistance, and ethical considerations.",
        category: "AI Training",
        duration: "3 hours",
        modules: 10,
        rating: 4.6,
        enrollments: 3200,
        isRequired: false,
        icon: Brain,
        tags: ["AI-Native", "Interactive"],
    },
    {
        id: "workplace-violence",
        title: "Workplace Violence Prevention",
        description: "Recognition, prevention, and response strategies for workplace violence in healthcare settings.",
        category: "Safety",
        duration: "1.5 hours",
        modules: 5,
        rating: 4.5,
        enrollments: 6800,
        isRequired: true,
        icon: AlertTriangle,
        tags: ["Required", "All Staff"],
    },
    {
        id: "cultural-competency",
        title: "Cultural Competency in Healthcare",
        description: "Providing culturally sensitive care. Understanding implicit bias, health disparities, and patient-centered communication.",
        category: "Professional Development",
        duration: "2 hours",
        modules: 7,
        rating: 4.7,
        enrollments: 5400,
        isRequired: false,
        icon: Users,
        tags: ["DEI", "Patient Care"],
    },
    {
        id: "ai-prompt-engineering",
        title: "Enterprise Prompt Engineering for Healthcare",
        description: "Master AI interactions for healthcare contexts. Learn to craft effective prompts while maintaining HIPAA compliance.",
        category: "AI Training",
        duration: "2.5 hours",
        modules: 8,
        rating: 4.8,
        enrollments: 1800,
        isRequired: false,
        icon: Sparkles,
        tags: ["AI-Native", "Interactive", "New"],
    },
    {
        id: "documentation-ai",
        title: "AI-Assisted Clinical Documentation",
        description: "Leverage AI for efficient, accurate clinical documentation. Covers ambient scribes, note generation, and quality assurance.",
        category: "AI Training",
        duration: "2 hours",
        modules: 6,
        rating: 4.9,
        enrollments: 2100,
        isRequired: false,
        icon: FileText,
        tags: ["AI-Native", "Clinical Staff", "New"],
    },
];

export function HealthcareContentLibrary() {
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    const categories = ["all", "Compliance", "Safety", "Clinical", "AI Training", "Professional Development"];

    const filteredCourses = healthcareCourses.filter((course) => {
        const matchesCategory = selectedCategory === "all" || course.category === selectedCategory;
        const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold">Healthcare Training Library</h1>
                <p className="text-muted-foreground">
                    Pre-built, compliance-ready courses for healthcare organizations
                </p>
            </div>

            {/* AI-Native Banner */}
            <Card className="p-6 bg-gradient-to-r from-primary/10 to-purple-500/10 border-primary/20">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                        <Sparkles className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-semibold">AI-Native Courses Available</h3>
                        <p className="text-sm text-muted-foreground">
                            Courses tagged with AI-Native feature interactive lessons that adapt to your organization's context
                        </p>
                    </div>
                    <Link href="/context">
                        <Button variant="outline">Configure AI Context</Button>
                    </Link>
                </div>
            </Card>

            {/* Filters */}
            <div className="flex flex-wrap gap-4">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search courses..."
                    className="flex-1 min-w-[200px] h-10 px-4 rounded-lg bg-white/[0.02] border border-white/10 focus:border-primary/50 focus:outline-none"
                />
                <div className="flex gap-2 overflow-x-auto">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={cn(
                                "px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-colors",
                                selectedCategory === cat
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-muted hover:bg-muted/80"
                            )}
                        >
                            {cat === "all" ? "All Courses" : cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Course Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredCourses.map((course) => {
                    const Icon = course.icon;
                    return (
                        <Card key={course.id} className="p-6 hover:border-primary/30 transition-all">
                            <div className="flex items-start gap-3 mb-4">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                    <Icon className="h-6 w-6 text-primary" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold line-clamp-2">{course.title}</h3>
                                    <p className="text-xs text-muted-foreground">{course.category}</p>
                                </div>
                            </div>

                            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                                {course.description}
                            </p>

                            <div className="flex flex-wrap gap-1 mb-4">
                                {course.tags.map((tag) => (
                                    <Badge
                                        key={tag}
                                        variant="outline"
                                        className={cn(
                                            "text-xs",
                                            tag === "AI-Native" && "bg-primary/10 text-primary border-primary/30",
                                            tag === "Required" && "bg-red-500/10 text-red-500 border-red-500/30",
                                            tag === "New" && "bg-emerald-500/10 text-emerald-500 border-emerald-500/30"
                                        )}
                                    >
                                        {tag}
                                    </Badge>
                                ))}
                            </div>

                            <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                                <span className="flex items-center gap-1">
                                    <Clock className="h-4 w-4" />
                                    {course.duration}
                                </span>
                                <span className="flex items-center gap-1">
                                    <BookOpen className="h-4 w-4" />
                                    {course.modules} modules
                                </span>
                                <span className="flex items-center gap-1">
                                    <Star className="h-4 w-4 text-amber-500" />
                                    {course.rating}
                                </span>
                            </div>

                            <div className="flex gap-2">
                                <Button className="flex-1 gap-1">
                                    <Play className="h-4 w-4" />
                                    Start
                                </Button>
                                <Button variant="outline">
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
