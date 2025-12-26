"use client";

import { useState } from "react";
import { Card, Badge, Button, Progress } from "@/components/ui";
import {
    BookOpen,
    Clock,
    Users,
    Star,
    Play,
    ChevronRight,
    Sparkles,
    Heart,
    Building2,
    Code2,
    Briefcase,
    GraduationCap,
    Shield,
    Brain,
    Palette,
    TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface CourseCategory {
    id: string;
    name: string;
    description: string;
    courseCount: number;
    icon: React.ElementType;
    color: string;
    featured?: boolean;
}

const categories: CourseCategory[] = [
    { id: "ai-skills", name: "AI & Automation", description: "Master AI tools and workflows", courseCount: 24, icon: Sparkles, color: "text-purple-500", featured: true },
    { id: "healthcare", name: "Healthcare", description: "HIPAA, clinical skills, compliance", courseCount: 18, icon: Heart, color: "text-red-500", featured: true },
    { id: "tech", name: "Technology", description: "Software, cloud, and data skills", courseCount: 42, icon: Code2, color: "text-blue-500" },
    { id: "leadership", name: "Leadership", description: "Management and team skills", courseCount: 28, icon: Briefcase, color: "text-amber-500" },
    { id: "compliance", name: "Compliance & Safety", description: "Industry regulations and safety", courseCount: 35, icon: Shield, color: "text-emerald-500" },
    { id: "sales", name: "Sales & Marketing", description: "Revenue and growth skills", courseCount: 22, icon: TrendingUp, color: "text-pink-500" },
    { id: "creative", name: "Creative", description: "Design, content, and media", courseCount: 16, icon: Palette, color: "text-orange-500" },
    { id: "onboarding", name: "Employee Onboarding", description: "New hire training programs", courseCount: 12, icon: GraduationCap, color: "text-cyan-500" },
];

interface PrebuiltCourse {
    id: string;
    title: string;
    category: string;
    duration: string;
    rating: number;
    enrollments: number;
    isAINative: boolean;
    tags: string[];
}

const featuredCourses: PrebuiltCourse[] = [
    { id: "1", title: "AI Fundamentals for Everyone", category: "AI & Automation", duration: "2 hours", rating: 4.9, enrollments: 15420, isAINative: true, tags: ["Popular", "AI-Native"] },
    { id: "2", title: "Prompt Engineering Mastery", category: "AI & Automation", duration: "3 hours", rating: 4.8, enrollments: 8750, isAINative: true, tags: ["AI-Native", "Hot"] },
    { id: "3", title: "HIPAA Privacy & Security 2024", category: "Healthcare", duration: "2.5 hours", rating: 4.8, enrollments: 12500, isAINative: false, tags: ["Required", "Compliance"] },
    { id: "4", title: "Leadership in the AI Era", category: "Leadership", duration: "4 hours", rating: 4.7, enrollments: 6200, isAINative: true, tags: ["AI-Native"] },
    { id: "5", title: "Cybersecurity Awareness", category: "Compliance & Safety", duration: "1.5 hours", rating: 4.6, enrollments: 22000, isAINative: false, tags: ["Required"] },
    { id: "6", title: "AI-Powered Sales Techniques", category: "Sales & Marketing", duration: "2.5 hours", rating: 4.8, enrollments: 4500, isAINative: true, tags: ["AI-Native", "New"] },
];

export function UniversalContentLibrary() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredCourses = selectedCategory
        ? featuredCourses.filter((c) => c.category === selectedCategory)
        : featuredCourses;

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold">Training Library</h1>
                <p className="text-muted-foreground">
                    Pre-built courses or generate your own with AI
                </p>
            </div>

            {/* AI Generation CTA */}
            <Card className="p-6 bg-gradient-to-r from-primary/10 via-purple-500/10 to-primary/5 border-primary/20">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center">
                        <Sparkles className="h-7 w-7 text-white" />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-semibold text-lg">Generate Custom Training with AI</h3>
                        <p className="text-sm text-muted-foreground">
                            Create training tailored to your industry, tech stack, and workflows in minutes
                        </p>
                    </div>
                    <Link href="/curriculum">
                        <Button className="gap-2">
                            <Sparkles className="h-4 w-4" />
                            Create with AI
                        </Button>
                    </Link>
                </div>
            </Card>

            {/* Categories */}
            <div>
                <h2 className="font-semibold mb-4">Browse by Category</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {categories.map((cat) => {
                        const Icon = cat.icon;
                        return (
                            <Card
                                key={cat.id}
                                className={cn(
                                    "p-4 cursor-pointer transition-all hover:border-primary/30",
                                    selectedCategory === cat.name && "border-primary bg-primary/5"
                                )}
                                onClick={() => setSelectedCategory(
                                    selectedCategory === cat.name ? null : cat.name
                                )}
                            >
                                <Icon className={cn("h-6 w-6 mb-2", cat.color)} />
                                <h3 className="font-medium text-sm">{cat.name}</h3>
                                <p className="text-xs text-muted-foreground">
                                    {cat.courseCount} courses
                                </p>
                                {cat.featured && (
                                    <Badge className="mt-2 text-xs bg-primary/10 text-primary">
                                        Featured
                                    </Badge>
                                )}
                            </Card>
                        );
                    })}
                </div>
            </div>

            {/* Featured Courses */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="font-semibold">
                        {selectedCategory ? `${selectedCategory} Courses` : "Featured Courses"}
                    </h2>
                    {selectedCategory && (
                        <Button variant="ghost" size="sm" onClick={() => setSelectedCategory(null)}>
                            Clear filter
                        </Button>
                    )}
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredCourses.map((course) => (
                        <Card key={course.id} className="p-5 hover:border-primary/30 transition-all">
                            <div className="flex items-start justify-between mb-3">
                                <Badge variant="outline" className="text-xs">
                                    {course.category}
                                </Badge>
                                {course.isAINative && (
                                    <Badge className="bg-primary/10 text-primary text-xs gap-1">
                                        <Sparkles className="h-3 w-3" />
                                        AI-Native
                                    </Badge>
                                )}
                            </div>

                            <h3 className="font-semibold mb-2">{course.title}</h3>

                            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                                <span className="flex items-center gap-1">
                                    <Clock className="h-4 w-4" />
                                    {course.duration}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Star className="h-4 w-4 text-amber-500" />
                                    {course.rating}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Users className="h-4 w-4" />
                                    {(course.enrollments / 1000).toFixed(1)}k
                                </span>
                            </div>

                            <div className="flex gap-2">
                                {course.tags.slice(0, 2).map((tag) => (
                                    <Badge
                                        key={tag}
                                        variant="outline"
                                        className={cn(
                                            "text-xs",
                                            tag === "New" && "text-emerald-500 border-emerald-500/30",
                                            tag === "Hot" && "text-orange-500 border-orange-500/30",
                                            tag === "Popular" && "text-blue-500 border-blue-500/30"
                                        )}
                                    >
                                        {tag}
                                    </Badge>
                                ))}
                            </div>

                            <Button className="w-full mt-4 gap-2">
                                <Play className="h-4 w-4" />
                                Start Learning
                            </Button>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Industry Solutions */}
            <Card className="p-6">
                <h2 className="font-semibold mb-4">Industry Solutions</h2>
                <p className="text-sm text-muted-foreground mb-4">
                    Pre-configured training packages for specific industries
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-gradient-to-br from-red-500/10 to-transparent border border-red-500/20">
                        <Heart className="h-6 w-6 text-red-500 mb-2" />
                        <h3 className="font-medium mb-1">Healthcare</h3>
                        <p className="text-xs text-muted-foreground mb-3">
                            HIPAA, clinical training, compliance
                        </p>
                        <Link href="/healthcare">
                            <Button variant="outline" size="sm" className="w-full">Explore</Button>
                        </Link>
                    </div>
                    <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20">
                        <Building2 className="h-6 w-6 text-blue-500 mb-2" />
                        <h3 className="font-medium mb-1">Financial Services</h3>
                        <p className="text-xs text-muted-foreground mb-3">
                            Compliance, risk, customer service
                        </p>
                        <Button variant="outline" size="sm" className="w-full">Coming Soon</Button>
                    </div>
                    <div className="p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/20">
                        <Code2 className="h-6 w-6 text-purple-500 mb-2" />
                        <h3 className="font-medium mb-1">Technology</h3>
                        <p className="text-xs text-muted-foreground mb-3">
                            Engineering, security, AI adoption
                        </p>
                        <Button variant="outline" size="sm" className="w-full">Coming Soon</Button>
                    </div>
                </div>
            </Card>
        </div>
    );
}
