"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, Badge, Button } from "@/components/ui";
import {
    NetflixModuleCard,
    HorizontalScrollRow,
    CategoryHeroBanner,
} from "@/components/ui/netflix-cards";
import {
    BookOpen,
    Sparkles,
    Heart,
    Building2,
    Code2,
    Briefcase,
    Shield,
    TrendingUp,
    Palette,
    GraduationCap,
    Search,
    Brain,
    Workflow,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

// Category definitions
interface Category {
    id: string;
    name: string;
    icon: React.ElementType;
    color: string;
}

const categories: Category[] = [
    { id: "ai-tech", name: "AI & Technology", icon: Brain, color: "text-purple-500" },
    { id: "agile-safe", name: "Agile & SAFe", icon: Workflow, color: "text-blue-500" },
    { id: "compliance", name: "Compliance & Security", icon: Shield, color: "text-emerald-500" },
    { id: "leadership", name: "Leadership", icon: Briefcase, color: "text-amber-500" },
    { id: "healthcare", name: "Healthcare", icon: Heart, color: "text-red-500" },
    { id: "onboarding", name: "Onboarding & HR", icon: GraduationCap, color: "text-cyan-500" },
];

// Extended course data with Netflix-style metadata
interface Course {
    id: string;
    title: string;
    description: string;
    category: string;
    duration: string;
    rating: number;
    enrollments: number;
    isNew?: boolean;
    isTrending?: boolean;
    isAINative?: boolean;
    difficulty: "beginner" | "intermediate" | "advanced";
    instructor: string;
    sections: number;
    progress?: number;
}

// Featured course for hero banner
const featuredCourse: Course = {
    id: "agentic-ai-masterclass",
    title: "Agentic AI Masterclass: Building Autonomous Workflows",
    description: "Master the art of creating AI agents that can reason, plan, and execute complex tasks. Learn to build production-ready agentic systems using LangChain, AutoGPT patterns, and enterprise orchestration frameworks.",
    category: "AI & Technology",
    duration: "8 hours",
    rating: 4.9,
    enrollments: 15420,
    isNew: true,
    isTrending: true,
    isAINative: true,
    difficulty: "advanced",
    instructor: "Dr. Sarah Chen",
    sections: 24,
};

// Course catalog organized by category
const coursesByCategory: Record<string, Course[]> = {
    "AI & Technology": [
        { id: "agentic-ai-fundamentals", title: "Agentic AI Fundamentals", description: "Build AI agents that can autonomously complete complex tasks.", category: "AI & Technology", duration: "6 hrs", rating: 4.9, enrollments: 12500, isTrending: true, isAINative: true, difficulty: "intermediate", instructor: "Dr. Sarah Chen", sections: 18 },
        { id: "prompt-engineering", title: "Prompt Engineering Masterclass", description: "Advanced techniques for crafting effective AI prompts.", category: "AI & Technology", duration: "4 hrs", rating: 4.8, enrollments: 28000, isAINative: true, difficulty: "beginner", instructor: "Marcus Johnson", sections: 12 },
        { id: "llm-fundamentals", title: "Large Language Models (LLMs)", description: "Deep dive into transformer architecture and LLM capabilities.", category: "AI & Technology", duration: "5 hrs", rating: 4.7, enrollments: 9800, difficulty: "advanced", instructor: "Dr. Emily Rodriguez", sections: 15 },
        { id: "github-copilot", title: "GitHub Copilot Mastery", description: "10x your coding productivity with AI pair programming.", category: "AI & Technology", duration: "3 hrs", rating: 4.8, enrollments: 22000, isNew: true, isAINative: true, difficulty: "beginner", instructor: "Alex Kumar", sections: 10 },
        { id: "chatgpt-power-user", title: "ChatGPT Power User", description: "Advanced ChatGPT techniques for professionals.", category: "AI & Technology", duration: "2 hrs", rating: 4.6, enrollments: 35000, isAINative: true, difficulty: "beginner", instructor: "Lisa Wang", sections: 8 },
        { id: "ai-ethics", title: "AI Ethics & Responsible AI", description: "Build ethical AI systems that are fair and transparent.", category: "AI & Technology", duration: "4 hrs", rating: 4.5, enrollments: 7500, difficulty: "intermediate", instructor: "Dr. Priya Sharma", sections: 12 },
        { id: "vector-databases", title: "Vector Databases & RAG", description: "Build semantic search and retrieval-augmented generation systems.", category: "AI & Technology", duration: "5 hrs", rating: 4.8, enrollments: 6800, isNew: true, difficulty: "advanced", instructor: "Sarah Martinez", sections: 14 },
    ],
    "Agile & SAFe": [
        { id: "safe-agilist", title: "SAFe 6.0 Agilist Certification", description: "Master the Scaled Agile Framework for enterprise agility.", category: "Agile & SAFe", duration: "8 hrs", rating: 4.9, enrollments: 45000, isTrending: true, difficulty: "intermediate", instructor: "Dr. John Anderson", sections: 20 },
        { id: "scrum-master", title: "Scrum Master Certification", description: "Lead agile teams with the Scrum framework.", category: "Agile & SAFe", duration: "6 hrs", rating: 4.8, enrollments: 38000, difficulty: "beginner", instructor: "Rachel Thompson", sections: 16 },
        { id: "product-owner", title: "Product Owner Essentials", description: "Maximize product value through effective backlog management.", category: "Agile & SAFe", duration: "5 hrs", rating: 4.7, enrollments: 28000, difficulty: "intermediate", instructor: "Tom Wilson", sections: 14 },
        { id: "kanban", title: "Kanban for Teams", description: "Optimize flow and reduce waste with Kanban.", category: "Agile & SAFe", duration: "4 hrs", rating: 4.6, enrollments: 18000, difficulty: "beginner", instructor: "Kevin O'Brien", sections: 10 },
        { id: "pi-planning", title: "PI Planning Facilitation", description: "Run effective Program Increment planning events.", category: "Agile & SAFe", duration: "3 hrs", rating: 4.8, enrollments: 12000, isNew: true, difficulty: "advanced", instructor: "Jennifer Lee", sections: 8 },
    ],
    "Compliance & Security": [
        { id: "nist-csf", title: "NIST CSF 2.0 Comprehensive", description: "Master the NIST Cybersecurity Framework 2.0 with all 6 functions.", category: "Compliance & Security", duration: "6 hrs", rating: 4.9, enrollments: 22000, isTrending: true, difficulty: "intermediate", instructor: "Michael Chen", sections: 18 },
        { id: "hipaa-2024", title: "HIPAA Privacy & Security 2024", description: "Complete HIPAA compliance training for healthcare organizations.", category: "Compliance & Security", duration: "4 hrs", rating: 4.8, enrollments: 42000, difficulty: "beginner", instructor: "Dr. Sarah Williams", sections: 12 },
        { id: "soc2", title: "SOC 2 Type II Deep Dive", description: "Implement Trust Service Criteria for your organization.", category: "Compliance & Security", duration: "5 hrs", rating: 4.7, enrollments: 15000, difficulty: "advanced", instructor: "Robert Garcia", sections: 14 },
        { id: "gdpr", title: "GDPR Essentials", description: "Navigate European data protection regulations.", category: "Compliance & Security", duration: "3 hrs", rating: 4.6, enrollments: 28000, difficulty: "beginner", instructor: "Emma Schmidt", sections: 10 },
        { id: "cybersecurity", title: "Cybersecurity Awareness", description: "Essential security training for all employees.", category: "Compliance & Security", duration: "2 hrs", rating: 4.5, enrollments: 85000, progress: 60, difficulty: "beginner", instructor: "James Miller", sections: 8 },
        { id: "iso27001", title: "ISO 27001 Implementation", description: "Build an Information Security Management System.", category: "Compliance & Security", duration: "6 hrs", rating: 4.8, enrollments: 9500, isNew: true, difficulty: "advanced", instructor: "Dr. Anna Lee", sections: 16 },
    ],
    "Leadership": [
        { id: "leadership-ai-era", title: "Leadership in the AI Era", description: "Lead your team through AI-driven transformation.", category: "Leadership", duration: "5 hrs", rating: 4.8, enrollments: 18500, isTrending: true, isAINative: true, difficulty: "intermediate", instructor: "Jennifer Lee", sections: 14 },
        { id: "change-management", title: "Change Management Mastery", description: "Guide your organization through successful change initiatives.", category: "Leadership", duration: "4 hrs", rating: 4.7, enrollments: 24000, difficulty: "intermediate", instructor: "Dr. Michael Brown", sections: 12 },
        { id: "executive-presence", title: "Executive Presence", description: "Command the room and inspire confidence.", category: "Leadership", duration: "3 hrs", rating: 4.6, enrollments: 12000, difficulty: "advanced", instructor: "Sarah Johnson", sections: 8 },
        { id: "dei-leadership", title: "DEI for Leaders", description: "Build inclusive teams that drive innovation.", category: "Leadership", duration: "4 hrs", rating: 4.5, enrollments: 16000, difficulty: "intermediate", instructor: "Dr. Maria Santos", sections: 10 },
    ],
    "Healthcare": [
        { id: "bloodborne-pathogens", title: "Bloodborne Pathogens (OSHA)", description: "OSHA 29 CFR 1910.1030 compliance training.", category: "Healthcare", duration: "2 hrs", rating: 4.8, enrollments: 52000, difficulty: "beginner", instructor: "Dr. James Wilson", sections: 8 },
        { id: "patient-safety", title: "Patient Safety Essentials", description: "Joint Commission NPSG and safety culture.", category: "Healthcare", duration: "3 hrs", rating: 4.7, enrollments: 28000, difficulty: "beginner", instructor: "Nurse Patricia Adams", sections: 10 },
        { id: "clinical-documentation", title: "Clinical Documentation Excellence", description: "Accurate documentation for quality care and compliance.", category: "Healthcare", duration: "4 hrs", rating: 4.6, enrollments: 18000, difficulty: "intermediate", instructor: "Dr. Susan Lee", sections: 12 },
        { id: "infection-control", title: "Infection Control & Prevention", description: "CDC guidelines for healthcare-associated infections.", category: "Healthcare", duration: "3 hrs", rating: 4.7, enrollments: 35000, isTrending: true, difficulty: "beginner", instructor: "Dr. Robert Kim", sections: 10 },
    ],
    "Onboarding & HR": [
        { id: "new-hire-essentials", title: "New Hire Essentials", description: "Everything new employees need to know on day one.", category: "Onboarding & HR", duration: "2 hrs", rating: 4.8, enrollments: 65000, difficulty: "beginner", instructor: "HR Team", sections: 8 },
        { id: "harassment-prevention", title: "Harassment Prevention", description: "Creating a respectful and inclusive workplace.", category: "Onboarding & HR", duration: "2 hrs", rating: 4.6, enrollments: 78000, difficulty: "beginner", instructor: "Legal Team", sections: 6 },
        { id: "workplace-safety", title: "Workplace Safety Fundamentals", description: "OSHA general industry safety requirements.", category: "Onboarding & HR", duration: "3 hrs", rating: 4.5, enrollments: 45000, difficulty: "beginner", instructor: "Safety Team", sections: 10 },
    ],
};

// Continue Watching - courses with progress
const continueWatching: Course[] = [
    { ...coursesByCategory["Compliance & Security"][4], progress: 60 },
    { id: "in-progress-agile", title: "Scrum Master Certification", description: "Lead agile teams with the Scrum framework.", category: "Agile & SAFe", duration: "6 hrs", rating: 4.8, enrollments: 38000, difficulty: "beginner", instructor: "Rachel Thompson", sections: 16, progress: 35 },
    { id: "in-progress-ai", title: "Prompt Engineering Masterclass", description: "Advanced techniques for crafting effective AI prompts.", category: "AI & Technology", duration: "4 hrs", rating: 4.8, enrollments: 28000, isAINative: true, difficulty: "beginner", instructor: "Marcus Johnson", sections: 12, progress: 80 },
];

export function UniversalContentLibrary() {
    const router = useRouter();
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    const handleModuleClick = (id: string) => {
        router.push(`/module/${id}`);
    };

    return (
        <div className="space-y-8 -mx-6 lg:-mx-8">
            {/* Hero Banner - Featured Course */}
            <div className="px-6 lg:px-8">
                <CategoryHeroBanner
                    title={featuredCourse.title}
                    description={featuredCourse.description}
                    category={featuredCourse.category}
                    duration={featuredCourse.duration}
                    rating={featuredCourse.rating}
                    onPlay={() => handleModuleClick(featuredCourse.id)}
                    onMoreInfo={() => handleModuleClick(featuredCourse.id)}
                />
            </div>

            {/* AI Generation CTA */}
            <div className="px-6 lg:px-8">
                <Card className="p-6 bg-gradient-to-r from-primary/10 via-purple-500/10 to-primary/5 border-primary/20">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center">
                            <Sparkles className="h-7 w-7 text-white" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-semibold text-lg">Can't find what you need?</h3>
                            <p className="text-sm text-muted-foreground">
                                Generate custom training tailored to your organization in minutes with AI
                            </p>
                        </div>
                        <Link href="/studio">
                            <Button className="gap-2">
                                <Sparkles className="h-4 w-4" />
                                AI Training Studio
                            </Button>
                        </Link>
                    </div>
                </Card>
            </div>

            {/* Continue Watching */}
            {continueWatching.length > 0 && (
                <div className="px-6 lg:px-8">
                    <HorizontalScrollRow title="Continue Learning" subtitle="Pick up where you left off">
                        {continueWatching.map((course) => (
                            <NetflixModuleCard
                                key={course.id}
                                {...course}
                                onClick={() => handleModuleClick(course.id)}
                            />
                        ))}
                    </HorizontalScrollRow>
                </div>
            )}

            {/* Category Quick Filter */}
            <div className="px-6 lg:px-8">
                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    <Button
                        variant={selectedCategory === null ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCategory(null)}
                        className="flex-shrink-0"
                    >
                        All
                    </Button>
                    {categories.map((cat) => {
                        const Icon = cat.icon;
                        return (
                            <Button
                                key={cat.id}
                                variant={selectedCategory === cat.name ? "default" : "outline"}
                                size="sm"
                                onClick={() => setSelectedCategory(selectedCategory === cat.name ? null : cat.name)}
                                className="flex-shrink-0 gap-1.5"
                            >
                                <Icon className={cn("h-4 w-4", selectedCategory !== cat.name && cat.color)} />
                                {cat.name}
                            </Button>
                        );
                    })}
                </div>
            </div>

            {/* Course Rows by Category */}
            {Object.entries(coursesByCategory)
                .filter(([category]) => !selectedCategory || category === selectedCategory)
                .map(([category, courses]) => (
                    <div key={category} className="px-6 lg:px-8">
                        <HorizontalScrollRow
                            title={category}
                            subtitle={`${courses.length} courses available`}
                            showAll
                            onShowAll={() => setSelectedCategory(category)}
                        >
                            {courses.map((course) => (
                                <NetflixModuleCard
                                    key={course.id}
                                    {...course}
                                    onClick={() => handleModuleClick(course.id)}
                                />
                            ))}
                        </HorizontalScrollRow>
                    </div>
                ))}

            {/* Trending Now */}
            <div className="px-6 lg:px-8">
                <HorizontalScrollRow title="🔥 Trending Now" subtitle="Most popular this week">
                    {Object.values(coursesByCategory)
                        .flat()
                        .filter((c) => c.isTrending)
                        .map((course) => (
                            <NetflixModuleCard
                                key={course.id}
                                {...course}
                                onClick={() => handleModuleClick(course.id)}
                            />
                        ))}
                </HorizontalScrollRow>
            </div>

            {/* New Releases */}
            <div className="px-6 lg:px-8 pb-8">
                <HorizontalScrollRow title="✨ New Releases" subtitle="Fresh content just added">
                    {Object.values(coursesByCategory)
                        .flat()
                        .filter((c) => c.isNew)
                        .map((course) => (
                            <NetflixModuleCard
                                key={course.id}
                                {...course}
                                onClick={() => handleModuleClick(course.id)}
                            />
                        ))}
                </HorizontalScrollRow>
            </div>
        </div>
    );
}
