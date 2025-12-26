"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Card, Badge, Button, Input } from "@/components/ui";
import {
    Search,
    SlidersHorizontal,
    X,
    Clock,
    Star,
    BookOpen,
    GraduationCap,
    Filter,
    ArrowUpDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Course {
    id: string;
    title: string;
    description: string;
    category: string;
    duration: string;
    difficulty: "Beginner" | "Intermediate" | "Advanced";
    rating: number;
    enrollments: number;
    tags: string[];
}

// Mock courses
const allCourses: Course[] = [
    { id: "safe-scrum-master", title: "SAFe Scrum Master Certification", description: "Master scaled agile frameworks", category: "Agile", duration: "8 hours", difficulty: "Intermediate", rating: 4.8, enrollments: 1250, tags: ["agile", "scrum", "certification"] },
    { id: "leadership-fundamentals", title: "Leadership Fundamentals", description: "Essential leadership skills", category: "Leadership", duration: "6 hours", difficulty: "Beginner", rating: 4.6, enrollments: 2100, tags: ["leadership", "management"] },
    { id: "hipaa-compliance", title: "HIPAA Compliance Essentials", description: "Healthcare data protection", category: "Compliance", duration: "2 hours", difficulty: "Beginner", rating: 4.5, enrollments: 3400, tags: ["hipaa", "compliance", "healthcare"] },
    { id: "cybersecurity-awareness", title: "Cybersecurity Awareness", description: "Protect against digital threats", category: "Security", duration: "3 hours", difficulty: "Beginner", rating: 4.7, enrollments: 4200, tags: ["security", "cyber", "awareness"] },
    { id: "data-analytics", title: "Data Analytics for Business", description: "Data-driven decision making", category: "Technology", duration: "10 hours", difficulty: "Advanced", rating: 4.9, enrollments: 890, tags: ["data", "analytics", "business"] },
    { id: "change-management", title: "Change Management", description: "Leading organizational change", category: "Leadership", duration: "5 hours", difficulty: "Intermediate", rating: 4.4, enrollments: 1560, tags: ["change", "management", "leadership"] },
    { id: "effective-communication", title: "Effective Communication", description: "Master workplace communication", category: "Soft Skills", duration: "4 hours", difficulty: "Beginner", rating: 4.7, enrollments: 2800, tags: ["communication", "soft-skills"] },
    { id: "project-management", title: "Project Management Professional", description: "PMP exam preparation", category: "Management", duration: "12 hours", difficulty: "Advanced", rating: 4.8, enrollments: 980, tags: ["pmp", "project", "management", "certification"] },
];

const categories = ["All", "Agile", "Leadership", "Compliance", "Security", "Technology", "Soft Skills", "Management"];
const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];
const sortOptions = [
    { value: "popular", label: "Most Popular" },
    { value: "rating", label: "Highest Rated" },
    { value: "newest", label: "Newest" },
    { value: "duration-asc", label: "Shortest First" },
    { value: "duration-desc", label: "Longest First" },
];

export function AdvancedSearch() {
    const [query, setQuery] = useState("");
    const [showFilters, setShowFilters] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedDifficulty, setSelectedDifficulty] = useState("All");
    const [sortBy, setSortBy] = useState("popular");
    const [recentSearches, setRecentSearches] = useState<string[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem("zerog-recent-searches");
        if (saved) setRecentSearches(JSON.parse(saved));
    }, []);

    const handleSearch = (searchQuery: string) => {
        setQuery(searchQuery);
        if (searchQuery.trim() && !recentSearches.includes(searchQuery.trim())) {
            const updated = [searchQuery.trim(), ...recentSearches.slice(0, 4)];
            setRecentSearches(updated);
            localStorage.setItem("zerog-recent-searches", JSON.stringify(updated));
        }
    };

    const clearRecentSearches = () => {
        setRecentSearches([]);
        localStorage.removeItem("zerog-recent-searches");
    };

    const filteredCourses = useMemo(() => {
        let results = allCourses;

        // Filter by query
        if (query.trim()) {
            const lowerQuery = query.toLowerCase();
            results = results.filter(
                (c) =>
                    c.title.toLowerCase().includes(lowerQuery) ||
                    c.description.toLowerCase().includes(lowerQuery) ||
                    c.tags.some((t) => t.toLowerCase().includes(lowerQuery))
            );
        }

        // Filter by category
        if (selectedCategory !== "All") {
            results = results.filter((c) => c.category === selectedCategory);
        }

        // Filter by difficulty
        if (selectedDifficulty !== "All") {
            results = results.filter((c) => c.difficulty === selectedDifficulty);
        }

        // Sort
        switch (sortBy) {
            case "popular":
                results.sort((a, b) => b.enrollments - a.enrollments);
                break;
            case "rating":
                results.sort((a, b) => b.rating - a.rating);
                break;
            case "duration-asc":
                results.sort((a, b) => parseInt(a.duration) - parseInt(b.duration));
                break;
            case "duration-desc":
                results.sort((a, b) => parseInt(b.duration) - parseInt(a.duration));
                break;
        }

        return results;
    }, [query, selectedCategory, selectedDifficulty, sortBy]);

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case "Beginner": return "bg-emerald-500/10 text-emerald-500";
            case "Intermediate": return "bg-blue-500/10 text-blue-500";
            case "Advanced": return "bg-purple-500/10 text-purple-500";
            default: return "";
        }
    };

    return (
        <div className="space-y-6">
            {/* Search Header */}
            <div className="flex gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => handleSearch(e.target.value)}
                        placeholder="Search courses, topics, or skills..."
                        className="w-full h-12 pl-11 pr-4 rounded-xl bg-white/[0.02] border border-white/10 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 text-base"
                    />
                    {query && (
                        <button
                            onClick={() => setQuery("")}
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    )}
                </div>
                <Button
                    variant={showFilters ? "default" : "outline"}
                    size="lg"
                    onClick={() => setShowFilters(!showFilters)}
                    className="gap-2"
                >
                    <SlidersHorizontal className="h-5 w-5" />
                    Filters
                </Button>
            </div>

            {/* Recent Searches */}
            {!query && recentSearches.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm text-muted-foreground">Recent:</span>
                    {recentSearches.map((search, i) => (
                        <button
                            key={i}
                            onClick={() => handleSearch(search)}
                            className="px-3 py-1 text-sm bg-muted rounded-full hover:bg-muted/80 transition-colors"
                        >
                            {search}
                        </button>
                    ))}
                    <button
                        onClick={clearRecentSearches}
                        className="text-xs text-muted-foreground hover:text-foreground"
                    >
                        Clear
                    </button>
                </div>
            )}

            {/* Filters Panel */}
            {showFilters && (
                <Card className="p-4">
                    <div className="grid md:grid-cols-3 gap-6">
                        {/* Category */}
                        <div>
                            <label className="text-sm font-medium mb-2 block">Category</label>
                            <div className="flex flex-wrap gap-2">
                                {categories.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat)}
                                        className={cn(
                                            "px-3 py-1.5 rounded-lg text-sm transition-colors",
                                            selectedCategory === cat
                                                ? "bg-primary text-primary-foreground"
                                                : "bg-muted hover:bg-muted/80"
                                        )}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Difficulty */}
                        <div>
                            <label className="text-sm font-medium mb-2 block">Difficulty</label>
                            <div className="flex flex-wrap gap-2">
                                {difficulties.map((diff) => (
                                    <button
                                        key={diff}
                                        onClick={() => setSelectedDifficulty(diff)}
                                        className={cn(
                                            "px-3 py-1.5 rounded-lg text-sm transition-colors",
                                            selectedDifficulty === diff
                                                ? "bg-primary text-primary-foreground"
                                                : "bg-muted hover:bg-muted/80"
                                        )}
                                    >
                                        {diff}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Sort */}
                        <div>
                            <label className="text-sm font-medium mb-2 block">Sort By</label>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="w-full h-10 px-3 rounded-lg bg-muted border-0 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                            >
                                {sortOptions.map((opt) => (
                                    <option key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </Card>
            )}

            {/* Results Count */}
            <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                    {filteredCourses.length} course{filteredCourses.length !== 1 ? "s" : ""} found
                </p>
            </div>

            {/* Results */}
            <div className="grid md:grid-cols-2 gap-4">
                {filteredCourses.map((course) => (
                    <Link key={course.id} href={`/module/${course.id}`}>
                        <Card className="p-4 hover:border-primary/30 transition-all h-full">
                            <div className="flex justify-between items-start mb-3">
                                <Badge variant="outline">{course.category}</Badge>
                                <Badge variant="secondary" className={getDifficultyColor(course.difficulty)}>
                                    {course.difficulty}
                                </Badge>
                            </div>
                            <h3 className="font-semibold mb-2">{course.title}</h3>
                            <p className="text-sm text-muted-foreground mb-4">{course.description}</p>
                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-4 text-muted-foreground">
                                    <span className="flex items-center gap-1">
                                        <Clock className="h-4 w-4" />
                                        {course.duration}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                                        {course.rating}
                                    </span>
                                </div>
                                <span className="text-muted-foreground">
                                    {course.enrollments.toLocaleString()} enrolled
                                </span>
                            </div>
                        </Card>
                    </Link>
                ))}
            </div>

            {/* No Results */}
            {filteredCourses.length === 0 && (
                <Card className="p-12 text-center">
                    <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">No courses found</h3>
                    <p className="text-muted-foreground mb-4">
                        Try adjusting your filters or search terms
                    </p>
                    <Button variant="outline" onClick={() => {
                        setQuery("");
                        setSelectedCategory("All");
                        setSelectedDifficulty("All");
                    }}>
                        Clear All Filters
                    </Button>
                </Card>
            )}
        </div>
    );
}
