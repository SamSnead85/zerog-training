"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, Badge, Button, Input } from "@/components/ui";
import {
    Search,
    Filter,
    Grid3X3,
    List,
    Clock,
    Star,
    Play,
    Sparkles,
    ChevronDown,
    Check,
    Users,
    BookOpen,
    Shield,
    Laptop,
    Crown,
    Target,
    Heart,
    Briefcase,
    Scale,
    Brain,
} from "lucide-react";

const categories = [
    { id: "all", label: "All Courses", icon: BookOpen, count: 58 },
    { id: "ai", label: "AI & Technology", icon: Brain, count: 6 },
    { id: "agile", label: "Agile & SAFe", icon: Target, count: 8 },
    { id: "leadership", label: "Leadership", icon: Crown, count: 6 },
    { id: "compliance", label: "Compliance", icon: Shield, count: 7 },
    { id: "technology", label: "Cloud & DevOps", icon: Laptop, count: 9 },
    { id: "soft-skills", label: "Soft Skills", icon: Heart, count: 6 },
    { id: "sales", label: "Sales", icon: Briefcase, count: 5 },
    { id: "dei", label: "DEI", icon: Users, count: 4 },
    { id: "project-mgmt", label: "Project Management", icon: Scale, count: 5 },
];

const courses = [
    // AI & Technology - NEW FEATURED
    {
        id: "ai-native-transformation",
        title: "AI Native & Enterprise AI Transformation",
        description: "Master the strategy and implementation of AI-first organizations. LLMs, RAG, AI Operating Model.",
        category: "ai",
        categoryLabel: "AI & Technology",
        rating: 4.9,
        students: 15200,
        duration: "6h",
        lessons: 5,
        level: "Advanced",
        thumbnail: "bg-gradient-to-br from-cyan-600 to-blue-600",
        featured: true,
        prePopulated: true,
        isNew: true,
    },
    {
        id: "agentic-ai",
        title: "Agentic AI: Autonomous AI Systems",
        description: "Design and deploy AI agents that reason, plan, and take action. ReAct, LangGraph, CrewAI.",
        category: "ai",
        categoryLabel: "AI & Technology",
        rating: 4.9,
        students: 8900,
        duration: "5h",
        lessons: 3,
        level: "Advanced",
        thumbnail: "bg-gradient-to-br from-violet-600 to-fuchsia-600",
        featured: true,
        prePopulated: true,
        isNew: true,
    },
    {
        id: "legacy-modernization-ai",
        title: "Legacy Modernization with AI",
        description: "Transform legacy systems using AI-powered analysis, code translation, and migration strategies.",
        category: "ai",
        categoryLabel: "AI & Technology",
        rating: 4.8,
        students: 6400,
        duration: "4h",
        lessons: 3,
        level: "Intermediate",
        thumbnail: "bg-gradient-to-br from-emerald-600 to-teal-600",
        prePopulated: true,
        isNew: true,
    },
    {
        id: "prompt-engineering",
        title: "Prompt Engineering Mastery",
        description: "Learn advanced prompting techniques for LLMs. Chain-of-thought, few-shot, and system prompts.",
        category: "ai",
        categoryLabel: "AI & Technology",
        rating: 4.8,
        students: 22100,
        duration: "3h",
        lessons: 6,
        level: "Intermediate",
        thumbnail: "bg-gradient-to-br from-orange-500 to-red-600",
        isNew: true,
    },
    {
        id: "rag-implementation",
        title: "RAG Implementation Guide",
        description: "Build production-ready RAG systems. Vector databases, embeddings, chunking, and retrieval strategies.",
        category: "ai",
        categoryLabel: "AI & Technology",
        rating: 4.7,
        students: 11200,
        duration: "4h",
        lessons: 5,
        level: "Advanced",
        thumbnail: "bg-gradient-to-br from-pink-600 to-rose-600",
        isNew: true,
    },
    // Existing courses
    {
        id: "safe-scrum-master",
        title: "SAFe Scrum Master Certification Prep",
        description: "Master the Scrum Master role in a SAFe enterprise. Learn to facilitate Agile teams and PI planning.",
        category: "agile",
        categoryLabel: "Agile & SAFe",
        rating: 4.9,
        students: 24500,
        duration: "8h",
        lessons: 12,
        level: "Intermediate",
        thumbnail: "bg-gradient-to-br from-purple-600 to-pink-500",
        featured: true,
        prePopulated: true,
    },
    {
        id: "leadership-fundamentals",
        title: "Leadership Fundamentals",
        description: "Core leadership principles for emerging leaders. Build emotional intelligence and team management skills.",
        category: "leadership",
        categoryLabel: "Leadership",
        rating: 4.8,
        students: 18900,
        duration: "6h",
        lessons: 10,
        level: "Beginner",
        thumbnail: "bg-gradient-to-br from-blue-600 to-cyan-500",
        featured: true,
        prePopulated: true,
    },
    {
        id: "hipaa-essentials",
        title: "HIPAA Compliance Essentials",
        description: "Comprehensive HIPAA training covering PHI protection, breach prevention, and regulatory requirements.",
        category: "compliance",
        categoryLabel: "Compliance",
        rating: 4.7,
        students: 32100,
        duration: "2h",
        lessons: 6,
        level: "Beginner",
        thumbnail: "bg-gradient-to-br from-red-600 to-orange-500",
        prePopulated: true,
    },
    {
        id: "product-owner",
        title: "SAFe Product Owner/Product Manager",
        description: "Lead product development in a Lean-Agile enterprise. Master backlog management and PI planning.",
        category: "agile",
        categoryLabel: "Agile & SAFe",
        rating: 4.9,
        students: 15600,
        duration: "8h",
        lessons: 11,
        level: "Intermediate",
        thumbnail: "bg-gradient-to-br from-violet-600 to-purple-500",
        prePopulated: true,
    },
    {
        id: "effective-feedback",
        title: "Giving & Receiving Feedback",
        description: "Master the art of constructive feedback using the SBI model. Build stronger team relationships.",
        category: "soft-skills",
        categoryLabel: "Soft Skills",
        rating: 4.9,
        students: 21300,
        duration: "45min",
        lessons: 5,
        level: "Beginner",
        thumbnail: "bg-gradient-to-br from-green-600 to-emerald-500",
        prePopulated: true,
    },
    {
        id: "data-analytics",
        title: "Data Analytics Fundamentals",
        description: "Build data analysis skills using modern tools. Learn to derive insights and make data-driven decisions.",
        category: "technology",
        categoryLabel: "Cloud & DevOps",
        rating: 4.6,
        students: 28400,
        duration: "5h",
        lessons: 9,
        level: "Beginner",
        thumbnail: "bg-gradient-to-br from-indigo-600 to-violet-500",
    },
    {
        id: "inclusive-leadership",
        title: "Inclusive Leadership",
        description: "Create an inclusive workplace culture. Learn to recognize bias and foster belonging.",
        category: "dei",
        categoryLabel: "DEI",
        rating: 4.8,
        students: 12700,
        duration: "1.5h",
        lessons: 6,
        level: "All Levels",
        thumbnail: "bg-gradient-to-br from-pink-600 to-rose-500",
        prePopulated: true,
    },
    {
        id: "consultative-selling",
        title: "Consultative Selling Mastery",
        description: "Transform from order-taker to trusted advisor. Master discovery, needs analysis, and solution selling.",
        category: "sales",
        categoryLabel: "Sales",
        rating: 4.7,
        students: 9800,
        duration: "3h",
        lessons: 8,
        level: "Intermediate",
        thumbnail: "bg-gradient-to-br from-amber-600 to-yellow-500",
        prePopulated: true,
    },
    {
        id: "cybersecurity-fundamentals",
        title: "Cybersecurity Fundamentals",
        description: "Essential security awareness for all employees. Phishing, passwords, data protection, and incident response.",
        category: "compliance",
        categoryLabel: "Compliance",
        rating: 4.8,
        students: 45200,
        duration: "2.5h",
        lessons: 7,
        level: "Beginner",
        thumbnail: "bg-gradient-to-br from-slate-600 to-zinc-700",
    },
    {
        id: "change-management",
        title: "Leading Change",
        description: "Guide your organization through transformation. Kotter's 8 steps, resistance management, and communication.",
        category: "leadership",
        categoryLabel: "Leadership",
        rating: 4.7,
        students: 16800,
        duration: "3h",
        lessons: 8,
        level: "Intermediate",
        thumbnail: "bg-gradient-to-br from-teal-600 to-cyan-600",
    },
];

export default function LibraryPage() {
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

    const filteredCourses = courses.filter((course) => {
        const matchesCategory = selectedCategory === "all" || course.category === selectedCategory;
        const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="flex">
            {/* Category Sidebar */}
            <aside className="w-64 border-r border-border p-4 hidden lg:block sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
                <h2 className="font-semibold mb-4">Categories</h2>
                <ul className="space-y-1">
                    {categories.map((cat) => {
                        const Icon = cat.icon;
                        const isActive = selectedCategory === cat.id;
                        return (
                            <li key={cat.id}>
                                <button
                                    onClick={() => setSelectedCategory(cat.id)}
                                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${isActive
                                        ? "bg-primary/10 text-primary font-medium"
                                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                        }`}
                                >
                                    <Icon className="h-4 w-4" />
                                    <span className="flex-1 text-left">{cat.label}</span>
                                    <span className="text-xs">{cat.count}</span>
                                </button>
                            </li>
                        );
                    })}
                </ul>

                <div className="mt-8 p-4 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20">
                    <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="h-5 w-5 text-primary" />
                        <span className="font-medium text-sm">AI Customization</span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">
                        Every course can be customized with your organization&apos;s context.
                    </p>
                    <Link href="/try">
                        <Button size="sm" className="w-full">Try Demo</Button>
                    </Link>
                </div>
            </aside>

            {/* Main content */}
            <div className="flex-1 p-6">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold mb-2">Training Library</h1>
                    <p className="text-muted-foreground">
                        Browse 50+ professional training modules. Customize any course with your org context.
                    </p>
                </div>

                {/* Search and filters */}
                <div className="flex flex-wrap items-center gap-4 mb-6">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search courses..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full h-10 pl-10 pr-4 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>

                    <Button variant="outline" size="sm" className="gap-2">
                        <Filter className="h-4 w-4" />
                        Filters
                        <ChevronDown className="h-3 w-3" />
                    </Button>

                    <div className="flex items-center border border-border rounded-lg">
                        <button
                            onClick={() => setViewMode("grid")}
                            className={`p-2 ${viewMode === "grid" ? "bg-muted text-foreground" : "text-muted-foreground"}`}
                        >
                            <Grid3X3 className="h-4 w-4" />
                        </button>
                        <button
                            onClick={() => setViewMode("list")}
                            className={`p-2 ${viewMode === "list" ? "bg-muted text-foreground" : "text-muted-foreground"}`}
                        >
                            <List className="h-4 w-4" />
                        </button>
                    </div>
                </div>

                {/* Results count */}
                <p className="text-sm text-muted-foreground mb-4">
                    Showing {filteredCourses.length} courses
                </p>

                {/* Course grid */}
                <div className={viewMode === "grid" ? "grid md:grid-cols-2 xl:grid-cols-3 gap-5" : "space-y-4"}>
                    {filteredCourses.map((course) => (
                        <Link key={course.id} href={`/module/${course.id}`}>
                            <Card
                                variant="glass"
                                hover="lift"
                                className={`overflow-hidden group ${viewMode === "list" ? "flex" : ""}`}
                            >
                                <div className={`${course.thumbnail} relative ${viewMode === "list" ? "w-48 h-32" : "h-40"} flex items-center justify-center`}>
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                                    <div className="h-14 w-14 rounded-full bg-white/20 backdrop-blur flex items-center justify-center group-hover:scale-110 transition-transform z-10">
                                        <Play className="h-7 w-7 text-white ml-0.5" />
                                    </div>
                                    {course.featured && (
                                        <Badge className="absolute top-3 left-3 bg-warning text-warning-foreground">Featured</Badge>
                                    )}
                                    {course.prePopulated && (
                                        <div className="absolute top-3 right-3 flex items-center gap-1 bg-background/90 backdrop-blur px-2 py-1 rounded text-xs">
                                            <Check className="h-3 w-3 text-success" />
                                            Pre-built content
                                        </div>
                                    )}
                                </div>
                                <div className="p-4 flex-1">
                                    <Badge variant="outline" className="mb-2 text-xs">{course.categoryLabel}</Badge>
                                    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                        {course.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                                        {course.description}
                                    </p>
                                    <div className="flex items-center gap-3 text-sm text-muted-foreground flex-wrap">
                                        <span className="flex items-center gap-1">
                                            <Star className="h-4 w-4 fill-warning text-warning" />
                                            {course.rating}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Users className="h-4 w-4" />
                                            {course.students.toLocaleString()}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock className="h-4 w-4" />
                                            {course.duration}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 mt-3">
                                        <Badge variant="secondary" className="text-xs">{course.level}</Badge>
                                        <Badge variant="secondary" className="text-xs">{course.lessons} lessons</Badge>
                                    </div>
                                </div>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
