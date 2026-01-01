"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, Badge, Button, Progress } from "@/components/ui";
import {
    BookOpen,
    Clock,
    Award,
    ArrowRight,
    Sparkles,
    Play,
    CheckCircle2,
    Flame,
    Trophy,
    Target,
    TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock purchased courses (would come from database/API)
const mockPurchasedCourses = [
    {
        id: "native-framework",
        title: "NATIVE Framework Foundations",
        progress: 45,
        lessonsCompleted: 9,
        totalLessons: 20,
        lastAccessed: "2 hours ago",
        nextLesson: "Augment Execution Patterns",
        image: "/images/training/network-security.png",
    },
    {
        id: "prompt-engineering",
        title: "Prompt Engineering Mastery",
        progress: 75,
        lessonsCompleted: 18,
        totalLessons: 24,
        lastAccessed: "Yesterday",
        nextLesson: "Advanced Chain-of-Thought",
        image: "/images/training/cybersecurity-hero.png",
    },
];

// Mock certifications in progress
const mockCertifications = [
    {
        id: "native-practitioner",
        title: "NATIVE Certified Practitioner",
        coursesCompleted: 2,
        totalCourses: 5,
        progress: 40,
    },
];

// Mock achievements
const mockAchievements = [
    { id: "first-lesson", title: "First Steps", description: "Complete your first lesson", earned: true },
    { id: "streak-7", title: "Week Warrior", description: "7-day learning streak", earned: true },
    { id: "course-complete", title: "Course Champion", description: "Complete a course", earned: false },
];

export default function LearnerDashboard() {
    const router = useRouter();
    const [user, setUser] = useState<{ name: string; email: string; xp: number; streakDays: number } | null>(null);
    const [purchases, setPurchases] = useState<Array<{ courseId?: string; trackId?: string }>>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch user from API
        async function fetchUser() {
            try {
                const res = await fetch("/api/learner/me");
                const data = await res.json();

                if (!res.ok || !data.success) {
                    router.push("/learn/login");
                    return;
                }

                setUser(data.user);
                setPurchases(data.purchases || []);
            } catch (err) {
                router.push("/learn/login");
            } finally {
                setLoading(false);
            }
        }

        fetchUser();
    }, [router]);

    if (loading || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-pulse text-muted-foreground">Loading...</div>
            </div>
        );
    }

    const firstName = user.name?.split(" ")[0] || "Learner";

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Welcome Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold">
                        Welcome back, {firstName}! 👋
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Ready to continue your learning journey?
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <Card className="px-4 py-2 flex items-center gap-2 bg-amber-500/10 border-amber-500/20">
                        <Flame className="h-5 w-5 text-amber-500" />
                        <span className="font-bold text-amber-500">{user.streakDays || 0}</span>
                        <span className="text-sm text-muted-foreground">day streak</span>
                    </Card>
                    <Card className="px-4 py-2 flex items-center gap-2 bg-purple-500/10 border-purple-500/20">
                        <Sparkles className="h-5 w-5 text-purple-500" />
                        <span className="font-bold text-purple-500">{(user.xp || 0).toLocaleString()}</span>
                        <span className="text-sm text-muted-foreground">XP</span>
                    </Card>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <Card className="p-4">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                            <BookOpen className="h-5 w-5 text-blue-500" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold">{mockPurchasedCourses.length}</p>
                            <p className="text-xs text-muted-foreground">Courses</p>
                        </div>
                    </div>
                </Card>
                <Card className="p-4">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                            <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold">27</p>
                            <p className="text-xs text-muted-foreground">Lessons Done</p>
                        </div>
                    </div>
                </Card>
                <Card className="p-4">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                            <Clock className="h-5 w-5 text-amber-500" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold">8.5</p>
                            <p className="text-xs text-muted-foreground">Hours Learned</p>
                        </div>
                    </div>
                </Card>
                <Card className="p-4">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                            <Award className="h-5 w-5 text-purple-500" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold">{mockAchievements.filter(a => a.earned).length}</p>
                            <p className="text-xs text-muted-foreground">Achievements</p>
                        </div>
                    </div>
                </Card>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Content - Left 2/3 */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Continue Learning */}
                    <section>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold flex items-center gap-2">
                                <Play className="h-5 w-5 text-primary" />
                                Continue Learning
                            </h2>
                            <Link href="/learn/courses">
                                <Button variant="ghost" size="sm" className="gap-1">
                                    Browse More <ArrowRight className="h-4 w-4" />
                                </Button>
                            </Link>
                        </div>

                        <div className="space-y-4">
                            {mockPurchasedCourses.map((course) => (
                                <Link key={course.id} href={`/learn/course/${course.id}`}>
                                    <Card className="overflow-hidden hover:border-primary/50 transition-all group">
                                        <div className="flex">
                                            {/* Thumbnail */}
                                            <div className="w-40 md:w-48 relative flex-shrink-0">
                                                <img
                                                    src={course.image}
                                                    alt={course.title}
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className="absolute inset-0 bg-black/30" />
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 group-hover:bg-primary transition-all">
                                                        <Play className="h-5 w-5 text-white ml-0.5" />
                                                    </div>
                                                </div>
                                                {/* Progress bar */}
                                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/30">
                                                    <div
                                                        className="h-full bg-primary transition-all"
                                                        style={{ width: `${course.progress}%` }}
                                                    />
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="p-4 flex-1">
                                                <h3 className="font-semibold group-hover:text-primary transition-colors">
                                                    {course.title}
                                                </h3>
                                                <p className="text-sm text-primary mt-1">
                                                    Up next: {course.nextLesson}
                                                </p>
                                                <div className="flex items-center gap-4 mt-3">
                                                    <Progress value={course.progress} className="flex-1 h-2" />
                                                    <span className="text-sm font-medium">{course.progress}%</span>
                                                </div>
                                                <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                                                    <span>{course.lessonsCompleted}/{course.totalLessons} lessons</span>
                                                    <span>•</span>
                                                    <span>{course.lastAccessed}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </section>

                    {/* Certification Progress */}
                    {mockCertifications.length > 0 && (
                        <section>
                            <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
                                <Trophy className="h-5 w-5 text-amber-500" />
                                Certification Progress
                            </h2>

                            {mockCertifications.map((cert) => (
                                <Card key={cert.id} className="p-4 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-amber-500/20">
                                    <div className="flex items-center justify-between mb-3">
                                        <div>
                                            <h3 className="font-semibold">{cert.title}</h3>
                                            <p className="text-sm text-muted-foreground">
                                                {cert.coursesCompleted} of {cert.totalCourses} courses completed
                                            </p>
                                        </div>
                                        <Badge className="bg-amber-500/20 text-amber-500 border-amber-500/30">
                                            {cert.progress}% Complete
                                        </Badge>
                                    </div>
                                    <Progress value={cert.progress} className="h-2" />
                                    <Link href={`/learn/tracks/${cert.id}`}>
                                        <Button variant="outline" size="sm" className="mt-4 gap-2">
                                            View Track <ArrowRight className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                </Card>
                            ))}
                        </section>
                    )}
                </div>

                {/* Sidebar - Right 1/3 */}
                <div className="space-y-6">
                    {/* Daily Goal */}
                    <Card className="p-4">
                        <h3 className="font-semibold flex items-center gap-2 mb-3">
                            <Target className="h-5 w-5 text-cyan-500" />
                            Daily Goal
                        </h3>
                        <div className="text-center py-4">
                            <div className="relative inline-flex">
                                <svg className="h-24 w-24 -rotate-90">
                                    <circle
                                        cx="48"
                                        cy="48"
                                        r="40"
                                        stroke="currentColor"
                                        strokeWidth="8"
                                        fill="none"
                                        className="text-muted"
                                    />
                                    <circle
                                        cx="48"
                                        cy="48"
                                        r="40"
                                        stroke="currentColor"
                                        strokeWidth="8"
                                        fill="none"
                                        strokeDasharray={251.2}
                                        strokeDashoffset={251.2 * 0.4}
                                        className="text-cyan-500"
                                    />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-2xl font-bold">60%</span>
                                </div>
                            </div>
                            <p className="text-sm text-muted-foreground mt-2">
                                2 of 3 lessons today
                            </p>
                        </div>
                        <Button className="w-full" size="sm">
                            Complete Daily Goal
                        </Button>
                    </Card>

                    {/* Achievements */}
                    <Card className="p-4">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="font-semibold flex items-center gap-2">
                                <Award className="h-5 w-5 text-purple-500" />
                                Achievements
                            </h3>
                            <Link href="/learn/achievements" className="text-sm text-primary hover:underline">
                                View All
                            </Link>
                        </div>
                        <div className="space-y-3">
                            {mockAchievements.map((achievement) => (
                                <div
                                    key={achievement.id}
                                    className={cn(
                                        "flex items-center gap-3 p-2 rounded-lg",
                                        achievement.earned ? "bg-purple-500/10" : "bg-muted/50 opacity-50"
                                    )}
                                >
                                    <div className={cn(
                                        "h-8 w-8 rounded-full flex items-center justify-center",
                                        achievement.earned ? "bg-purple-500 text-white" : "bg-muted"
                                    )}>
                                        {achievement.earned ? (
                                            <CheckCircle2 className="h-4 w-4" />
                                        ) : (
                                            <Trophy className="h-4 w-4" />
                                        )}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">{achievement.title}</p>
                                        <p className="text-xs text-muted-foreground">{achievement.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Upgrade CTA */}
                    <Card className="p-4 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border-cyan-500/30">
                        <h3 className="font-semibold mb-2">Unlock All Courses</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            Get unlimited access to 50+ courses with our All-Access Pass
                        </p>
                        <Link href="/learn/pricing">
                            <Button className="w-full gap-2">
                                <Sparkles className="h-4 w-4" />
                                View Plans
                            </Button>
                        </Link>
                    </Card>
                </div>
            </div>
        </div>
    );
}
