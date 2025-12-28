"use client";

import { useState } from "react";
import { Card, Button, Badge, Progress } from "@/components/ui";
import {
    Store,
    Star,
    Clock,
    Users,
    Download,
    Filter,
    Search,
    ChevronRight,
    Play,
    BookOpen,
    Award,
    TrendingUp
} from "lucide-react";
import { cn } from "@/lib/utils";

type Category = "compliance" | "security" | "leadership" | "technical" | "soft_skills";
type ContentProvider = "zerog" | "linkedin" | "coursera" | "skillsoft" | "partner";

interface MarketplaceCourse {
    id: string;
    title: string;
    description: string;
    provider: ContentProvider;
    category: Category;
    duration: string;
    rating: number;
    enrollments: number;
    thumbnail: string;
    price: "free" | "included" | number;
    isNew: boolean;
    isFeatured: boolean;
    skills: string[];
}

const categoryConfig: Record<Category, { label: string; color: string }> = {
    compliance: { label: "Compliance", color: "bg-blue-500/20 text-blue-500" },
    security: { label: "Security", color: "bg-red-500/20 text-red-500" },
    leadership: { label: "Leadership", color: "bg-purple-500/20 text-purple-500" },
    technical: { label: "Technical", color: "bg-emerald-500/20 text-emerald-500" },
    soft_skills: { label: "Soft Skills", color: "bg-amber-500/20 text-amber-500" },
};

const providerLogos: Record<ContentProvider, string> = {
    zerog: "⚡",
    linkedin: "🔗",
    coursera: "📚",
    skillsoft: "🎯",
    partner: "🤝",
};

const mockCourses: MarketplaceCourse[] = [
    { id: "1", title: "HIPAA Compliance Essentials", description: "Complete HIPAA training meeting all regulatory requirements", provider: "zerog", category: "compliance", duration: "2 hours", rating: 4.8, enrollments: 12500, thumbnail: "/images/training/compliance-hipaa.png", price: "included", isNew: false, isFeatured: true, skills: ["HIPAA", "PHI Protection", "Compliance"] },
    { id: "2", title: "Cybersecurity for Everyone", description: "Essential security awareness training for all employees", provider: "skillsoft", category: "security", duration: "1.5 hours", rating: 4.6, enrollments: 8900, thumbnail: "/images/training/cybersecurity-hero.png", price: "included", isNew: false, isFeatured: true, skills: ["Security Awareness", "Phishing", "Password Security"] },
    { id: "3", title: "Leading Remote Teams", description: "Master the art of managing distributed teams effectively", provider: "linkedin", category: "leadership", duration: "3 hours", rating: 4.7, enrollments: 5600, thumbnail: "/images/training/network-security.png", price: "included", isNew: true, isFeatured: false, skills: ["Remote Work", "Team Management", "Communication"] },
    { id: "4", title: "GDPR Data Privacy", description: "EU data protection regulation compliance training", provider: "zerog", category: "compliance", duration: "2.5 hours", rating: 4.9, enrollments: 7800, thumbnail: "/images/training/data-protection.png", price: "included", isNew: false, isFeatured: false, skills: ["GDPR", "Data Privacy", "EU Compliance"] },
    { id: "5", title: "AI for Business Leaders", description: "Understanding AI transformation for executives", provider: "coursera", category: "technical", duration: "4 hours", rating: 4.5, enrollments: 3200, thumbnail: "/images/training/security-visual.png", price: 49, isNew: true, isFeatured: true, skills: ["AI", "Digital Transformation", "Strategy"] },
    { id: "6", title: "Effective Communication", description: "Build powerful communication skills for the workplace", provider: "partner", category: "soft_skills", duration: "2 hours", rating: 4.4, enrollments: 4100, thumbnail: "/images/training/phishing-email-example.png", price: "free", isNew: false, isFeatured: false, skills: ["Communication", "Presentation", "Writing"] },
];

export function ContentMarketplace() {
    const [courses, setCourses] = useState(mockCourses);
    const [searchQuery, setSearchQuery] = useState("");
    const [categoryFilter, setCategoryFilter] = useState<Category | "all">("all");

    const filtered = courses.filter(c => {
        const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = categoryFilter === "all" || c.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    const featured = courses.filter(c => c.isFeatured);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                        <Store className="h-5 w-5 text-primary" />
                        Content Marketplace
                    </h2>
                    <p className="text-sm text-muted-foreground">Browse and add premium training content to your library</p>
                </div>
            </div>

            {/* Featured Section */}
            <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    Featured Content
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {featured.slice(0, 3).map((course) => (
                        <Card key={course.id} className="overflow-hidden group">
                            <div className="h-32 bg-gradient-to-br from-primary/20 to-purple-500/20 relative">
                                {course.isNew && (
                                    <Badge className="absolute top-2 left-2 bg-primary">New</Badge>
                                )}
                                <div className="absolute bottom-2 right-2">
                                    <Badge variant="outline" className="bg-background/80">
                                        {providerLogos[course.provider]} {course.provider}
                                    </Badge>
                                </div>
                            </div>
                            <div className="p-4">
                                <Badge variant="outline" className={cn("text-xs mb-2", categoryConfig[course.category].color)}>
                                    {categoryConfig[course.category].label}
                                </Badge>
                                <h4 className="font-semibold mb-1 group-hover:text-primary transition-colors">{course.title}</h4>
                                <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{course.description}</p>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                                        {course.rating}
                                        <span>•</span>
                                        <Clock className="h-3 w-3" />
                                        {course.duration}
                                    </div>
                                    <Button size="sm">
                                        {course.price === "included" ? "Add" : course.price === "free" ? "Free" : `$${course.price}`}
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Search and Filters */}
            <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search courses..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 rounded-lg border bg-card"
                    />
                </div>
                <div className="flex gap-2">
                    {(["all", "compliance", "security", "leadership", "technical", "soft_skills"] as const).map((cat) => (
                        <Button
                            key={cat}
                            variant={categoryFilter === cat ? "default" : "outline"}
                            size="sm"
                            onClick={() => setCategoryFilter(cat)}
                        >
                            {cat === "all" ? "All" : categoryConfig[cat].label}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Course Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((course) => (
                    <Card key={course.id} className="p-4 hover:border-primary/30 transition-all group">
                        <div className="flex items-start gap-3">
                            <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center text-xl">
                                {providerLogos[course.provider]}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <h4 className="font-medium truncate group-hover:text-primary transition-colors">{course.title}</h4>
                                    {course.isNew && <Badge className="text-xs bg-primary">New</Badge>}
                                </div>
                                <Badge variant="outline" className={cn("text-xs mb-2", categoryConfig[course.category].color)}>
                                    {categoryConfig[course.category].label}
                                </Badge>
                                <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{course.description}</p>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                                    <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                                    {course.rating}
                                    <span>•</span>
                                    <Clock className="h-3 w-3" />
                                    {course.duration}
                                    <span>•</span>
                                    <Users className="h-3 w-3" />
                                    {course.enrollments.toLocaleString()}
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex flex-wrap gap-1">
                                        {course.skills.slice(0, 2).map((skill, i) => (
                                            <Badge key={i} variant="outline" className="text-xs">{skill}</Badge>
                                        ))}
                                    </div>
                                    <Button size="sm" variant="outline">
                                        {course.price === "included" ? "Add" : course.price === "free" ? "Free" : `$${course.price}`}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
