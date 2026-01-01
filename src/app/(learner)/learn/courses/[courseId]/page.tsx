"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Card, Badge, Button, Progress } from "@/components/ui";
import {
    BookOpen,
    Clock,
    Star,
    Users,
    Play,
    CheckCircle2,
    Lock,
    Award,
    ArrowLeft,
    ShoppingCart,
    Sparkles,
    CreditCard,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Course data (would come from API)
const courseData: Record<string, {
    id: string;
    title: string;
    description: string;
    longDescription: string;
    category: string;
    duration: string;
    lessons: number;
    rating: number;
    students: number;
    price: number;
    image: string;
    level: string;
    instructor: { name: string; title: string; avatar: string };
    curriculum: { title: string; lessons: { title: string; duration: string; isFree: boolean }[] }[];
    whatYouLearn: string[];
    requirements: string[];
}> = {
    "native-framework": {
        id: "native-framework",
        title: "NATIVE Framework Foundations",
        description: "Master AI-native software delivery with the NATIVE operating model.",
        longDescription: "This comprehensive course teaches you the NATIVE framework for AI-native software development. You'll learn how to normalize intent, augment execution, test continuously, iterate autonomously, validate outcomes, and evolve systems. Perfect for teams transitioning to AI-first development practices.",
        category: "Agentic Agile SDLC",
        duration: "4 hours",
        lessons: 20,
        rating: 4.9,
        students: 12500,
        price: 99,
        image: "/images/training/network-security.png",
        level: "Beginner",
        instructor: { name: "Dr. Sarah Chen", title: "AI Transformation Lead", avatar: "" },
        curriculum: [
            {
                title: "Introduction to NATIVE",
                lessons: [
                    { title: "What is NATIVE?", duration: "8 min", isFree: true },
                    { title: "The AI-Native Imperative", duration: "12 min", isFree: true },
                    { title: "Framework Overview", duration: "10 min", isFree: false },
                ]
            },
            {
                title: "Normalize Intent",
                lessons: [
                    { title: "Capturing User Intent", duration: "15 min", isFree: false },
                    { title: "Intent Templates", duration: "12 min", isFree: false },
                    { title: "Hands-on: Intent Workshop", duration: "20 min", isFree: false },
                ]
            },
            {
                title: "Augment Execution",
                lessons: [
                    { title: "AI-Assisted Implementation", duration: "18 min", isFree: false },
                    { title: "Human-AI Handoffs", duration: "15 min", isFree: false },
                    { title: "Quality Gates", duration: "12 min", isFree: false },
                ]
            },
        ],
        whatYouLearn: [
            "Apply the 6 principles of NATIVE in your daily work",
            "Set up AI-augmented development workflows",
            "Design effective human-AI collaboration patterns",
            "Implement continuous testing strategies",
            "Lead teams through AI transformation",
        ],
        requirements: [
            "Basic understanding of software development",
            "Familiarity with agile concepts",
            "No prior AI experience required",
        ],
    },
};

// Default course for unknown IDs
const defaultCourse = courseData["native-framework"];

export default function CourseDetailPage() {
    const params = useParams();
    const router = useRouter();
    const courseId = params.courseId as string;
    const course = courseData[courseId] || defaultCourse;
    const [isProcessing, setIsProcessing] = useState(false);

    const handlePurchase = async () => {
        setIsProcessing(true);

        try {
            // Call checkout API to create Stripe session
            const res = await fetch("/api/learner/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    type: "course",
                    itemId: courseId,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                if (res.status === 401) {
                    // Not logged in, redirect to signup
                    router.push(`/learn/signup?redirect=/learn/courses/${courseId}`);
                    return;
                }
                alert(data.error || "Failed to start checkout");
                setIsProcessing(false);
                return;
            }

            // Redirect to Stripe checkout
            if (data.url) {
                window.location.href = data.url;
            }
        } catch (err) {
            alert("Something went wrong. Please try again.");
            setIsProcessing(false);
        }
    };

    const totalLessons = course.curriculum.reduce((acc, section) => acc + section.lessons.length, 0);
    const freeLessons = course.curriculum.reduce(
        (acc, section) => acc + section.lessons.filter(l => l.isFree).length,
        0
    );

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <div className="bg-gradient-to-b from-muted/50 to-background py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Link href="/learn/courses" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Courses
                    </Link>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Left: Course Info */}
                        <div className="lg:col-span-2">
                            <div className="flex items-center gap-2 mb-4">
                                <Badge>{course.category}</Badge>
                                <Badge variant="outline">{course.level}</Badge>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold mb-4">{course.title}</h1>
                            <p className="text-lg text-muted-foreground mb-6">{course.longDescription}</p>

                            <div className="flex flex-wrap items-center gap-6 text-sm">
                                <div className="flex items-center gap-1">
                                    <Star className="h-5 w-5 text-amber-400 fill-amber-400" />
                                    <span className="font-bold">{course.rating}</span>
                                    <span className="text-muted-foreground">({course.students.toLocaleString()} students)</span>
                                </div>
                                <div className="flex items-center gap-1 text-muted-foreground">
                                    <Clock className="h-4 w-4" />
                                    {course.duration}
                                </div>
                                <div className="flex items-center gap-1 text-muted-foreground">
                                    <BookOpen className="h-4 w-4" />
                                    {course.lessons} lessons
                                </div>
                            </div>

                            {/* Instructor */}
                            <div className="flex items-center gap-3 mt-6 pt-6 border-t border-border">
                                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold">
                                    {course.instructor.name.split(" ").map(n => n[0]).join("")}
                                </div>
                                <div>
                                    <p className="font-medium">{course.instructor.name}</p>
                                    <p className="text-sm text-muted-foreground">{course.instructor.title}</p>
                                </div>
                            </div>
                        </div>

                        {/* Right: Purchase Card */}
                        <div>
                            <Card className="p-6 sticky top-24">
                                <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                                    <img
                                        src={course.image}
                                        alt={course.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                        <button className="h-16 w-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-transform">
                                            <Play className="h-8 w-8 text-white ml-1" />
                                        </button>
                                    </div>
                                </div>

                                <div className="text-center mb-4">
                                    <span className="text-4xl font-bold">${course.price}</span>
                                    <span className="text-muted-foreground ml-2">one-time</span>
                                </div>

                                <Button
                                    size="lg"
                                    className="w-full gap-2 mb-3"
                                    onClick={handlePurchase}
                                    disabled={isProcessing}
                                >
                                    {isProcessing ? (
                                        <>Processing...</>
                                    ) : (
                                        <>
                                            <CreditCard className="h-5 w-5" />
                                            Buy Now
                                        </>
                                    )}
                                </Button>

                                <p className="text-center text-xs text-muted-foreground mb-4">
                                    30-day money-back guarantee
                                </p>

                                <div className="space-y-3 pt-4 border-t border-border">
                                    <div className="flex items-center gap-2 text-sm">
                                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                        <span>Lifetime access</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                        <span>{course.lessons} on-demand lessons</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                        <span>Certificate of completion</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                        <span>Downloadable resources</span>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>

            {/* Course Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        {/* What You'll Learn */}
                        <section>
                            <h2 className="text-2xl font-bold mb-4">What You'll Learn</h2>
                            <Card className="p-6">
                                <ul className="grid md:grid-cols-2 gap-3">
                                    {course.whatYouLearn.map((item, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                            <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                                            <span className="text-sm">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </Card>
                        </section>

                        {/* Curriculum */}
                        <section>
                            <h2 className="text-2xl font-bold mb-4">Course Curriculum</h2>
                            <p className="text-sm text-muted-foreground mb-4">
                                {course.curriculum.length} sections • {totalLessons} lessons • {course.duration} total
                            </p>
                            <div className="space-y-3">
                                {course.curriculum.map((section, sectionIdx) => (
                                    <Card key={sectionIdx} className="overflow-hidden">
                                        <div className="p-4 bg-muted/50 font-medium flex items-center justify-between">
                                            <span>{section.title}</span>
                                            <span className="text-sm text-muted-foreground">
                                                {section.lessons.length} lessons
                                            </span>
                                        </div>
                                        <div className="divide-y divide-border">
                                            {section.lessons.map((lesson, lessonIdx) => (
                                                <div key={lessonIdx} className="p-4 flex items-center gap-4">
                                                    {lesson.isFree ? (
                                                        <Play className="h-4 w-4 text-primary" />
                                                    ) : (
                                                        <Lock className="h-4 w-4 text-muted-foreground" />
                                                    )}
                                                    <span className="flex-1 text-sm">{lesson.title}</span>
                                                    {lesson.isFree && (
                                                        <Badge variant="outline" className="text-xs">Preview</Badge>
                                                    )}
                                                    <span className="text-sm text-muted-foreground">{lesson.duration}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </section>

                        {/* Requirements */}
                        <section>
                            <h2 className="text-2xl font-bold mb-4">Requirements</h2>
                            <ul className="space-y-2">
                                {course.requirements.map((req, i) => (
                                    <li key={i} className="flex items-start gap-2 text-muted-foreground">
                                        <span className="text-foreground">•</span>
                                        <span>{req}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
