import Link from "next/link";
import { Card, Badge, Progress, Button } from "@/components/ui";
import {
    Play,
    Clock,
    Trophy,
    Flame,
    Target,
    TrendingUp,
    ArrowRight,
    BookOpen,
    CheckCircle2,
    Star,
} from "lucide-react";

// Mock data - will be replaced with real data
const continuelearning = [
    {
        id: "safe-scrum-master",
        title: "SAFe Scrum Master",
        category: "Agile",
        progress: 65,
        nextLesson: "Facilitating PI Planning",
        thumbnail: "bg-gradient-to-br from-purple-600 to-pink-500",
        duration: "35 min left",
    },
    {
        id: "leadership-fundamentals",
        title: "Leadership Fundamentals",
        category: "Leadership",
        progress: 30,
        nextLesson: "Emotional Intelligence",
        thumbnail: "bg-gradient-to-br from-blue-600 to-cyan-500",
        duration: "2h 15min left",
    },
];

const recommended = [
    {
        id: "hipaa-essentials",
        title: "HIPAA Compliance Essentials",
        category: "Compliance",
        rating: 4.8,
        students: 12500,
        duration: "1h 30min",
        thumbnail: "bg-gradient-to-br from-red-600 to-orange-500",
    },
    {
        id: "effective-feedback",
        title: "Giving & Receiving Feedback",
        category: "Soft Skills",
        rating: 4.9,
        students: 8900,
        duration: "45min",
        thumbnail: "bg-gradient-to-br from-green-600 to-emerald-500",
    },
    {
        id: "data-analytics",
        title: "Data Analytics Fundamentals",
        category: "Technology",
        rating: 4.7,
        students: 15200,
        duration: "3h",
        thumbnail: "bg-gradient-to-br from-indigo-600 to-violet-500",
    },
];

export default function DashboardPage() {
    return (
        <div className="p-6 lg:p-8 max-w-7xl mx-auto">
            {/* Welcome section */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold mb-2">Welcome back, John! 👋</h1>
                <p className="text-muted-foreground">
                    You&apos;re on a <span className="text-primary font-medium">5-day streak</span>! Keep up the great work.
                </p>
            </div>

            {/* Stats cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <Card variant="glass" className="p-4">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <BookOpen className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold">12</p>
                            <p className="text-xs text-muted-foreground">Courses in progress</p>
                        </div>
                    </div>
                </Card>
                <Card variant="glass" className="p-4">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center">
                            <CheckCircle2 className="h-5 w-5 text-success" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold">24</p>
                            <p className="text-xs text-muted-foreground">Completed</p>
                        </div>
                    </div>
                </Card>
                <Card variant="glass" className="p-4">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-warning/10 flex items-center justify-center">
                            <Flame className="h-5 w-5 text-warning" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold">5</p>
                            <p className="text-xs text-muted-foreground">Day streak</p>
                        </div>
                    </div>
                </Card>
                <Card variant="glass" className="p-4">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                            <Clock className="h-5 w-5 text-secondary" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold">47h</p>
                            <p className="text-xs text-muted-foreground">Learning time</p>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Continue Learning */}
            <div className="mb-10">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">Continue Learning</h2>
                    <Link href="/learning" className="text-sm text-primary hover:underline flex items-center gap-1">
                        View all <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                    {continuelearning.map((course) => (
                        <Link key={course.id} href={`/module/${course.id}`}>
                            <Card variant="glass" hover="lift" className="overflow-hidden group">
                                <div className="flex">
                                    <div className={`w-32 h-32 ${course.thumbnail} flex items-center justify-center flex-shrink-0`}>
                                        <div className="h-12 w-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <Play className="h-6 w-6 text-white ml-0.5" />
                                        </div>
                                    </div>
                                    <div className="p-4 flex-1">
                                        <Badge variant="outline" className="mb-2 text-xs">{course.category}</Badge>
                                        <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                                            {course.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground mb-3">
                                            Next: {course.nextLesson}
                                        </p>
                                        <div className="flex items-center gap-3">
                                            <Progress value={course.progress} className="flex-1 h-1.5" />
                                            <span className="text-xs text-muted-foreground">{course.progress}%</span>
                                        </div>
                                        <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                                            <Clock className="h-3 w-3" /> {course.duration}
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Recommended for You */}
            <div className="mb-10">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h2 className="text-lg font-semibold">Recommended for You</h2>
                        <p className="text-sm text-muted-foreground">Based on your role and learning history</p>
                    </div>
                    <Link href="/library" className="text-sm text-primary hover:underline flex items-center gap-1">
                        Browse library <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                    {recommended.map((course) => (
                        <Link key={course.id} href={`/module/${course.id}`}>
                            <Card variant="glass" hover="lift" className="overflow-hidden group">
                                <div className={`h-36 ${course.thumbnail} flex items-center justify-center relative`}>
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                                    <div className="h-14 w-14 rounded-full bg-white/20 backdrop-blur flex items-center justify-center group-hover:scale-110 transition-transform z-10">
                                        <Play className="h-7 w-7 text-white ml-0.5" />
                                    </div>
                                    <Badge className="absolute top-3 right-3">{course.category}</Badge>
                                </div>
                                <div className="p-4">
                                    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                        {course.title}
                                    </h3>
                                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                        <span className="flex items-center gap-1">
                                            <Star className="h-4 w-4 fill-warning text-warning" />
                                            {course.rating}
                                        </span>
                                        <span>{course.students.toLocaleString()} learners</span>
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                                        <Clock className="h-3 w-3" /> {course.duration}
                                    </p>
                                </div>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Quick Actions */}
            <div>
                <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
                <div className="grid md:grid-cols-3 gap-4">
                    <Card variant="outline" className="p-5 hover:border-primary/50 transition-colors cursor-pointer group">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                                <Target className="h-6 w-6 text-background" />
                            </div>
                            <div>
                                <h3 className="font-medium group-hover:text-primary transition-colors">Set Learning Goals</h3>
                                <p className="text-sm text-muted-foreground">Define your weekly targets</p>
                            </div>
                        </div>
                    </Card>
                    <Card variant="outline" className="p-5 hover:border-primary/50 transition-colors cursor-pointer group">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center">
                                <Trophy className="h-6 w-6 text-background" />
                            </div>
                            <div>
                                <h3 className="font-medium group-hover:text-primary transition-colors">View Achievements</h3>
                                <p className="text-sm text-muted-foreground">3 new badges to earn</p>
                            </div>
                        </div>
                    </Card>
                    <Card variant="outline" className="p-5 hover:border-primary/50 transition-colors cursor-pointer group">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                                <TrendingUp className="h-6 w-6 text-background" />
                            </div>
                            <div>
                                <h3 className="font-medium group-hover:text-primary transition-colors">View Progress Report</h3>
                                <p className="text-sm text-muted-foreground">Track your growth</p>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
