"use client";

import { useState, use } from "react";
import Link from "next/link";
import { Card, Badge, Button, Progress } from "@/components/ui";
import {
    Play,
    Clock,
    Star,
    Users,
    ChevronDown,
    ChevronRight,
    Check,
    Lock,
    FileText,
    Video,
    Sparkles,
    BookOpen,
    Award,
    Building2,
    ArrowLeft,
    Share2,
    Heart,
} from "lucide-react";

// Pre-populated SAFe Scrum Master content
const moduleData: Record<string, {
    title: string;
    description: string;
    category: string;
    rating: number;
    students: number;
    duration: string;
    level: string;
    thumbnail: string;
    objectives: string[];
    lessons: { id: string; title: string; duration: string; type: "video" | "reading" | "quiz" | "simulation"; preview?: boolean }[];
    instructor: { name: string; title: string; bio: string };
}> = {
    "safe-scrum-master": {
        title: "SAFe Scrum Master Certification Prep",
        description: "Master the Scrum Master role in a SAFe enterprise. Learn to facilitate Agile teams, lead PI planning, and drive continuous improvement. This comprehensive course prepares you for the SAFe Scrum Master certification exam.",
        category: "Agile & SAFe",
        rating: 4.9,
        students: 24500,
        duration: "8 hours",
        level: "Intermediate",
        thumbnail: "bg-gradient-to-br from-purple-600 to-pink-500",
        objectives: [
            "Understand the Scrum Master role in a SAFe enterprise",
            "Facilitate Agile team events effectively",
            "Lead and participate in PI Planning",
            "Coach teams on Agile practices and mindset",
            "Support DevOps and continuous delivery",
            "Prepare for SAFe Scrum Master certification",
        ],
        lessons: [
            { id: "1", title: "Introduction to SAFe", duration: "15 min", type: "video", preview: true },
            { id: "2", title: "The Agile Manifesto & Principles", duration: "20 min", type: "video", preview: true },
            { id: "3", title: "Scrum Fundamentals in SAFe", duration: "25 min", type: "video" },
            { id: "4", title: "The Agile Release Train", duration: "30 min", type: "video" },
            { id: "5", title: "Knowledge Check: SAFe Basics", duration: "10 min", type: "quiz" },
            { id: "6", title: "The Scrum Master as Servant Leader", duration: "25 min", type: "video" },
            { id: "7", title: "Building High-Performing Teams", duration: "30 min", type: "video" },
            { id: "8", title: "Facilitation Techniques", duration: "35 min", type: "video" },
            { id: "9", title: "Roleplay: Difficult Team Dynamics", duration: "20 min", type: "simulation" },
            { id: "10", title: "Preparing for PI Planning", duration: "40 min", type: "video" },
            { id: "11", title: "Facilitating PI Planning", duration: "45 min", type: "video" },
            { id: "12", title: "Simulation: PI Planning Breakout", duration: "30 min", type: "simulation" },
            { id: "13", title: "Supporting DevOps", duration: "25 min", type: "video" },
            { id: "14", title: "Continuous Improvement", duration: "20 min", type: "video" },
            { id: "15", title: "Final Assessment", duration: "30 min", type: "quiz" },
        ],
        instructor: {
            name: "Sarah Chen",
            title: "SAFe Program Consultant",
            bio: "15+ years experience in Agile transformation. Certified SAFe SPC, PSM III, and Enterprise Coach."
        }
    },
    "leadership-fundamentals": {
        title: "Leadership Fundamentals",
        description: "Build essential leadership skills for emerging leaders and new managers. Learn emotional intelligence, effective delegation, feedback techniques, and how to inspire your team to achieve exceptional results.",
        category: "Leadership",
        rating: 4.8,
        students: 18900,
        duration: "6 hours",
        level: "Beginner",
        thumbnail: "bg-gradient-to-br from-blue-600 to-cyan-500",
        objectives: [
            "Understand the difference between leadership and management",
            "Develop emotional intelligence for better relationships",
            "Master delegation and empowerment techniques",
            "Give and receive feedback effectively",
            "Lead teams through change and uncertainty",
            "Build a personal leadership development plan",
        ],
        lessons: [
            { id: "1", title: "What is Leadership?", duration: "15 min", type: "video", preview: true },
            { id: "2", title: "Leadership vs Management", duration: "20 min", type: "video", preview: true },
            { id: "3", title: "Your Leadership Style", duration: "25 min", type: "video" },
            { id: "4", title: "Self-Assessment: Leadership Inventory", duration: "15 min", type: "quiz" },
            { id: "5", title: "Understanding Emotional Intelligence", duration: "30 min", type: "video" },
            { id: "6", title: "Self-Awareness & Self-Regulation", duration: "25 min", type: "video" },
            { id: "7", title: "Empathy in Leadership", duration: "20 min", type: "video" },
            { id: "8", title: "Roleplay: Difficult Conversation", duration: "25 min", type: "simulation" },
            { id: "9", title: "The Art of Delegation", duration: "25 min", type: "video" },
            { id: "10", title: "Empowering Your Team", duration: "20 min", type: "video" },
            { id: "11", title: "The SBI Feedback Model", duration: "25 min", type: "video" },
            { id: "12", title: "Simulation: Giving Feedback", duration: "20 min", type: "simulation" },
            { id: "13", title: "Leading Through Change", duration: "30 min", type: "video" },
            { id: "14", title: "Your Leadership Action Plan", duration: "20 min", type: "reading" },
            { id: "15", title: "Final Assessment", duration: "25 min", type: "quiz" },
        ],
        instructor: {
            name: "Michael Torres",
            title: "Executive Leadership Coach",
            bio: "Former Fortune 500 VP. Coached 500+ leaders on their development journey."
        }
    },
};

// Default module for any ID not defined
const defaultModule = {
    title: "Training Module",
    description: "This training module will be customized with your organization's context.",
    category: "General",
    rating: 4.5,
    students: 1000,
    duration: "2 hours",
    level: "All Levels",
    thumbnail: "bg-gradient-to-br from-gray-600 to-gray-500",
    objectives: ["Learn core concepts", "Apply to your work", "Complete assessment"],
    lessons: [
        { id: "1", title: "Introduction", duration: "15 min", type: "video" as const, preview: true },
        { id: "2", title: "Core Concepts", duration: "30 min", type: "video" as const },
        { id: "3", title: "Assessment", duration: "20 min", type: "quiz" as const },
    ],
    instructor: { name: "ZeroG AI", title: "AI Instructor", bio: "AI-generated content customized for your org." }
};

export default function ModuleDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

    const module = moduleData[id] || { ...defaultModule, title: `Module: ${id}` };

    const toggleSection = (sectionId: string) => {
        setExpandedSections(prev => ({ ...prev, [sectionId]: !prev[sectionId] }));
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case "video": return Video;
            case "reading": return FileText;
            case "quiz": return Award;
            case "simulation": return Sparkles;
            default: return BookOpen;
        }
    };

    return (
        <div className="min-h-screen">
            {/* Hero section */}
            <div className={`${module.thumbnail} relative`}>
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative max-w-6xl mx-auto px-6 py-12">
                    <Link
                        href="/library"
                        className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Library
                    </Link>

                    <div className="grid lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            <Badge className="mb-4">{module.category}</Badge>
                            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                                {module.title}
                            </h1>
                            <p className="text-white/80 text-lg mb-6">
                                {module.description}
                            </p>

                            <div className="flex flex-wrap items-center gap-4 text-white/90 mb-6">
                                <span className="flex items-center gap-1">
                                    <Star className="h-5 w-5 fill-warning text-warning" />
                                    <strong>{module.rating}</strong>
                                </span>
                                <span className="flex items-center gap-1">
                                    <Users className="h-5 w-5" />
                                    {module.students.toLocaleString()} learners
                                </span>
                                <span className="flex items-center gap-1">
                                    <Clock className="h-5 w-5" />
                                    {module.duration}
                                </span>
                                <Badge variant="secondary">{module.level}</Badge>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                <Button size="lg" className="gap-2">
                                    <Play className="h-5 w-5" />
                                    Start Learning
                                </Button>
                                <Button size="lg" variant="outline" className="gap-2 bg-white/10 border-white/30 text-white hover:bg-white/20">
                                    <Sparkles className="h-5 w-5" />
                                    Customize for My Org
                                </Button>
                            </div>
                        </div>

                        {/* Quick info card */}
                        <Card variant="glass" className="p-6 bg-white/10 backdrop-blur-xl border-white/20">
                            <h3 className="font-semibold text-white mb-4">This course includes:</h3>
                            <ul className="space-y-3 text-white/90 text-sm">
                                <li className="flex items-center gap-3">
                                    <Video className="h-5 w-5 text-primary" />
                                    {module.lessons.filter(l => l.type === "video").length} video lessons
                                </li>
                                <li className="flex items-center gap-3">
                                    <Sparkles className="h-5 w-5 text-secondary" />
                                    {module.lessons.filter(l => l.type === "simulation").length} interactive simulations
                                </li>
                                <li className="flex items-center gap-3">
                                    <Award className="h-5 w-5 text-accent" />
                                    {module.lessons.filter(l => l.type === "quiz").length} assessments
                                </li>
                                <li className="flex items-center gap-3">
                                    <Building2 className="h-5 w-5 text-success" />
                                    Customizable with your org context
                                </li>
                                <li className="flex items-center gap-3">
                                    <Award className="h-5 w-5 text-warning" />
                                    Certificate of completion
                                </li>
                            </ul>
                        </Card>
                    </div>
                </div>
            </div>

            {/* Content section */}
            <div className="max-w-6xl mx-auto px-6 py-10">
                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        {/* What you'll learn */}
                        <Card className="p-6">
                            <h2 className="text-xl font-semibold mb-4">What you&apos;ll learn</h2>
                            <ul className="grid md:grid-cols-2 gap-3">
                                {module.objectives.map((obj, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                        <Check className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                                        <span className="text-sm">{obj}</span>
                                    </li>
                                ))}
                            </ul>
                        </Card>

                        {/* Course content */}
                        <Card className="p-6">
                            <h2 className="text-xl font-semibold mb-4">Course Content</h2>
                            <p className="text-sm text-muted-foreground mb-4">
                                {module.lessons.length} lessons • {module.duration} total
                            </p>

                            <div className="space-y-2">
                                {module.lessons.map((lesson, index) => {
                                    const TypeIcon = getTypeIcon(lesson.type);
                                    return (
                                        <div
                                            key={lesson.id}
                                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                                        >
                                            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
                                                {index + 1}
                                            </div>
                                            <TypeIcon className="h-4 w-4 text-muted-foreground" />
                                            <span className="flex-1">{lesson.title}</span>
                                            <span className="text-sm text-muted-foreground">{lesson.duration}</span>
                                            {lesson.preview ? (
                                                <Badge variant="outline" className="text-xs">Preview</Badge>
                                            ) : (
                                                <Lock className="h-4 w-4 text-muted-foreground" />
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </Card>

                        {/* Instructor */}
                        <Card className="p-6">
                            <h2 className="text-xl font-semibold mb-4">Your Instructor</h2>
                            <div className="flex items-start gap-4">
                                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-xl font-bold">
                                    {module.instructor.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                    <h3 className="font-semibold">{module.instructor.name}</h3>
                                    <p className="text-sm text-muted-foreground mb-2">{module.instructor.title}</p>
                                    <p className="text-sm">{module.instructor.bio}</p>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Customize CTA */}
                        <Card className="p-6 border-primary/30 bg-primary/5">
                            <div className="flex items-center gap-2 mb-3">
                                <Sparkles className="h-5 w-5 text-primary" />
                                <h3 className="font-semibold">Customize This Course</h3>
                            </div>
                            <p className="text-sm text-muted-foreground mb-4">
                                Add your organization&apos;s policies, tools, and examples to make this training 100% relevant.
                            </p>
                            <Link href={`/studio/customize/${id}`}>
                                <Button className="w-full">Customize with AI</Button>
                            </Link>
                        </Card>

                        {/* Share */}
                        <Card className="p-6">
                            <h3 className="font-semibold mb-3">Share this course</h3>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="flex-1 gap-2">
                                    <Share2 className="h-4 w-4" />
                                    Share
                                </Button>
                                <Button variant="outline" size="sm" className="flex-1 gap-2">
                                    <Heart className="h-4 w-4" />
                                    Save
                                </Button>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
