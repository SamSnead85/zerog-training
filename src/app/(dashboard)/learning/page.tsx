import Link from "next/link";
import { Card, Badge, Button, Progress } from "@/components/ui";
import {
    Play,
    Clock,
    BookOpen,
    ArrowRight,
    CheckCircle2,
} from "lucide-react";

// Mock data for current learning
const inProgressCourses = [
    {
        id: "safe-scrum-master",
        title: "SAFe Scrum Master Certification Prep",
        category: "Agile & SAFe",
        progress: 65,
        nextLesson: "Facilitating PI Planning",
        thumbnail: "bg-gradient-to-br from-purple-600 to-pink-500",
        completedLessons: 10,
        totalLessons: 15,
        lastAccessed: "2 hours ago",
    },
    {
        id: "leadership-fundamentals",
        title: "Leadership Fundamentals",
        category: "Leadership",
        progress: 30,
        nextLesson: "Emotional Intelligence",
        thumbnail: "bg-gradient-to-br from-blue-600 to-cyan-500",
        completedLessons: 4,
        totalLessons: 15,
        lastAccessed: "Yesterday",
    },
    {
        id: "hipaa-essentials",
        title: "HIPAA Compliance Essentials",
        category: "Compliance",
        progress: 100,
        nextLesson: "Completed!",
        thumbnail: "bg-gradient-to-br from-red-600 to-orange-500",
        completedLessons: 6,
        totalLessons: 6,
        lastAccessed: "3 days ago",
        completed: true,
    },
];

export default function LearningPage() {
    const inProgress = inProgressCourses.filter(c => !c.completed);
    const completed = inProgressCourses.filter(c => c.completed);

    return (
        <div className="p-6 lg:p-8 max-w-6xl mx-auto">
            <div className="mb-8">
                <h1 className="text-2xl font-bold mb-2">My Learning</h1>
                <p className="text-muted-foreground">
                    Track your progress and continue where you left off
                </p>
            </div>

            {/* In Progress */}
            <div className="mb-10">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-primary" />
                        In Progress ({inProgress.length})
                    </h2>
                </div>

                <div className="space-y-4">
                    {inProgress.map((course) => (
                        <Link key={course.id} href={`/module/${course.id}`}>
                            <Card variant="glass" hover="lift" className="overflow-hidden group">
                                <div className="flex">
                                    <div className={`w-40 ${course.thumbnail} flex items-center justify-center flex-shrink-0 relative`}>
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                                        <div className="h-12 w-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center group-hover:scale-110 transition-transform z-10">
                                            <Play className="h-6 w-6 text-white ml-0.5" />
                                        </div>
                                    </div>
                                    <div className="p-5 flex-1">
                                        <div className="flex items-start justify-between gap-4">
                                            <div>
                                                <Badge variant="outline" className="mb-2 text-xs">{course.category}</Badge>
                                                <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                                                    {course.title}
                                                </h3>
                                                <p className="text-sm text-muted-foreground mt-1">
                                                    Next: {course.nextLesson}
                                                </p>
                                            </div>
                                            <Button className="gap-2">
                                                Continue
                                                <ArrowRight className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        <div className="mt-4 flex items-center gap-4">
                                            <Progress value={course.progress} className="flex-1 h-2" />
                                            <span className="text-sm font-medium">{course.progress}%</span>
                                        </div>
                                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                                            <span>{course.completedLessons}/{course.totalLessons} lessons</span>
                                            <span>•</span>
                                            <span className="flex items-center gap-1">
                                                <Clock className="h-3 w-3" />
                                                Last accessed {course.lastAccessed}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Completed */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-success" />
                        Completed ({completed.length})
                    </h2>
                </div>

                <div className="space-y-4">
                    {completed.map((course) => (
                        <Link key={course.id} href={`/module/${course.id}`}>
                            <Card variant="outline" className="overflow-hidden group opacity-80 hover:opacity-100 transition-opacity">
                                <div className="flex">
                                    <div className={`w-32 ${course.thumbnail} flex items-center justify-center flex-shrink-0 relative`}>
                                        <div className="absolute inset-0 bg-black/40" />
                                        <CheckCircle2 className="h-10 w-10 text-white z-10" />
                                    </div>
                                    <div className="p-4 flex-1">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <Badge variant="outline" className="mb-2 text-xs">{course.category}</Badge>
                                                <h3 className="font-semibold group-hover:text-primary transition-colors">
                                                    {course.title}
                                                </h3>
                                                <p className="text-sm text-muted-foreground mt-1">
                                                    Completed {course.lastAccessed}
                                                </p>
                                            </div>
                                            <Button variant="outline" size="sm">View Certificate</Button>
                                        </div>
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
