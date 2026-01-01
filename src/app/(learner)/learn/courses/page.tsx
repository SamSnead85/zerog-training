"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, Badge, Button } from "@/components/ui";
import {
    BookOpen,
    Clock,
    Star,
    Search,
    Filter,
    Play,
    SlidersHorizontal,
    Grid,
    List,
} from "lucide-react";
import { cn } from "@/lib/utils";

// All courses
const allCourses = [
    {
        id: "native-framework",
        title: "NATIVE Framework Foundations",
        description: "Master AI-native software delivery with the NATIVE operating model. The foundation for all certifications.",
        category: "Agentic Agile SDLC",
        duration: "4 hours",
        lessons: 20,
        rating: 4.9,
        students: 12500,
        price: 99,
        image: "/images/training/network-security.png",
        level: "Beginner",
        isNew: true,
        isFeatured: true,
    },
    {
        id: "prompt-engineering",
        title: "Prompt Engineering Mastery",
        description: "Advanced techniques for crafting effective AI prompts. From basics to chain-of-thought reasoning.",
        category: "AI & Technology",
        duration: "6 hours",
        lessons: 24,
        rating: 4.8,
        students: 8900,
        price: 149,
        image: "/images/training/cybersecurity-hero.png",
        level: "Intermediate",
        isFeatured: true,
    },
    {
        id: "human-ai-collaboration",
        title: "Human-AI Collaboration",
        description: "Build effective partnerships between humans and AI agents. Essential for modern teams.",
        category: "Agentic Agile SDLC",
        duration: "4 hours",
        lessons: 18,
        rating: 4.7,
        students: 6200,
        price: 99,
        image: "/images/training/data-protection.png",
        level: "Beginner",
    },
    {
        id: "agentic-ai-systems",
        title: "Agentic AI Systems",
        description: "Design and build autonomous AI workflows that execute complex tasks independently.",
        category: "AI & Technology",
        duration: "8 hours",
        lessons: 32,
        rating: 4.9,
        students: 4500,
        price: 199,
        image: "/images/training/security-visual.png",
        level: "Advanced",
        isNew: true,
    },
    {
        id: "leadership-ai",
        title: "AI Leadership for Executives",
        description: "Strategic frameworks for leading AI transformation initiatives in your organization.",
        category: "Leadership",
        duration: "3 hours",
        lessons: 12,
        rating: 4.8,
        students: 3200,
        price: 129,
        image: "/images/training/data-protection.png",
        level: "Intermediate",
    },
    {
        id: "ai-security",
        title: "AI Security Fundamentals",
        description: "Protect AI systems from adversarial attacks, prompt injection, and data poisoning.",
        category: "Security",
        duration: "5 hours",
        lessons: 20,
        rating: 4.7,
        students: 2800,
        price: 149,
        image: "/images/training/cybersecurity-hero.png",
        level: "Intermediate",
    },
];

const categories = ["All", "Agentic Agile SDLC", "AI & Technology", "Leadership", "Security"];
const levels = ["All Levels", "Beginner", "Intermediate", "Advanced"];

export default function CourseCatalogPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedLevel, setSelectedLevel] = useState("All Levels");
    const [sortBy, setSortBy] = useState("popular");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

    const filteredCourses = allCourses.filter((course) => {
        const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
        const matchesLevel = selectedLevel === "All Levels" || course.level === selectedLevel;
        return matchesSearch && matchesCategory && matchesLevel;
    });

    const sortedCourses = [...filteredCourses].sort((a, b) => {
        switch (sortBy) {
            case "popular":
                return b.students - a.students;
            case "rating":
                return b.rating - a.rating;
            case "newest":
                return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
            case "price-low":
                return a.price - b.price;
            case "price-high":
                return b.price - a.price;
            default:
                return 0;
        }
    });

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold">Course Catalog</h1>
                <p className="text-muted-foreground mt-2">
                    Explore our library of AI-native training courses
                </p>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col lg:flex-row gap-4 mb-8">
                {/* Search */}
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search courses..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full h-11 pl-11 pr-4 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                </div>

                {/* Category Filter */}
                <div className="flex gap-2 flex-wrap">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={cn(
                                "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                                selectedCategory === category
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-muted hover:bg-muted/80"
                            )}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {/* Secondary Filters */}
            <div className="flex items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                    {/* Level */}
                    <select
                        value={selectedLevel}
                        onChange={(e) => setSelectedLevel(e.target.value)}
                        className="h-10 px-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    >
                        {levels.map((level) => (
                            <option key={level} value={level}>{level}</option>
                        ))}
                    </select>

                    {/* Sort */}
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="h-10 px-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    >
                        <option value="popular">Most Popular</option>
                        <option value="rating">Highest Rated</option>
                        <option value="newest">Newest</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                    </select>
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                        {sortedCourses.length} courses
                    </span>
                    <div className="hidden md:flex items-center gap-1 ml-4">
                        <button
                            onClick={() => setViewMode("grid")}
                            className={cn(
                                "p-2 rounded-lg",
                                viewMode === "grid" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                            )}
                        >
                            <Grid className="h-4 w-4" />
                        </button>
                        <button
                            onClick={() => setViewMode("list")}
                            className={cn(
                                "p-2 rounded-lg",
                                viewMode === "list" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                            )}
                        >
                            <List className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Course Grid */}
            <div className={cn(
                "gap-6",
                viewMode === "grid" ? "grid md:grid-cols-2 lg:grid-cols-3" : "space-y-4"
            )}>
                {sortedCourses.map((course) => (
                    <Link key={course.id} href={`/learn/courses/${course.id}`}>
                        <Card className={cn(
                            "group overflow-hidden hover:border-primary/50 transition-all duration-300 h-full",
                            viewMode === "list" && "flex"
                        )}>
                            {/* Image */}
                            <div className={cn(
                                "relative overflow-hidden",
                                viewMode === "grid" ? "h-44" : "w-48 flex-shrink-0"
                            )}>
                                <img
                                    src={course.image}
                                    alt={course.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute top-3 left-3 flex gap-2">
                                    {course.isNew && (
                                        <Badge className="bg-emerald-500 text-white text-xs">New</Badge>
                                    )}
                                    {course.isFeatured && (
                                        <Badge className="bg-amber-500 text-white text-xs">Featured</Badge>
                                    )}
                                </div>
                                <div className="absolute bottom-3 right-3">
                                    <div className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all">
                                        <Play className="h-4 w-4 text-white ml-0.5" />
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-4 flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <Badge variant="outline" className="text-xs">{course.category}</Badge>
                                    <Badge variant="outline" className="text-xs">{course.level}</Badge>
                                </div>
                                <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                                    {course.title}
                                </h3>
                                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                                    {course.description}
                                </p>

                                <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
                                    <span className="flex items-center gap-1">
                                        <Clock className="h-3 w-3" /> {course.duration}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <BookOpen className="h-3 w-3" /> {course.lessons} lessons
                                    </span>
                                </div>

                                <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
                                    <div className="flex items-center gap-1">
                                        <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                                        <span className="font-medium">{course.rating}</span>
                                        <span className="text-xs text-muted-foreground">({course.students.toLocaleString()})</span>
                                    </div>
                                    <span className="font-bold text-lg">${course.price}</span>
                                </div>
                            </div>
                        </Card>
                    </Link>
                ))}
            </div>

            {sortedCourses.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-muted-foreground">No courses found matching your criteria</p>
                    <Button
                        variant="outline"
                        className="mt-4"
                        onClick={() => {
                            setSearchQuery("");
                            setSelectedCategory("All");
                            setSelectedLevel("All Levels");
                        }}
                    >
                        Clear Filters
                    </Button>
                </div>
            )}
        </div>
    );
}
