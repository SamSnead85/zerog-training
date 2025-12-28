import Link from "next/link";
import { Card, Badge, Progress, Button } from "@/components/ui";
import { UserCreatedTrainings } from "@/components/dashboard/UserCreatedTrainings";
import {
    Play,
    Clock,
    Trophy,
    Flame,
    Target,
    TrendingUp,
    BookOpen,
    CheckCircle2,
    Star,
    Calendar,
    Zap,
    Award,
    ChevronRight,
    Users,
    Sparkles,
    Medal,
    Rocket,
    Brain,
} from "lucide-react";

// User gamification data
const userStats = {
    xp: 2450,
    xpToNextLevel: 3000,
    level: 4,
    levelName: "Practitioner",
    streak: 5,
    coursesCompleted: 24,
    hoursLearned: 47,
};

// Recent achievements
const achievements = [
    { id: 1, title: "Quick Learner", description: "Complete 5 lessons in one day", icon: Zap, unlocked: true },
    { id: 2, title: "Streak Master", description: "Maintain a 7-day streak", icon: Flame, unlocked: false, progress: 71 },
    { id: 3, title: "Knowledge Seeker", description: "Complete 25 courses", icon: Brain, unlocked: false, progress: 96 },
];

// Continue learning courses
const continuelearning = [
    {
        id: "safe-scrum-master",
        title: "SAFe Scrum Master",
        category: "Agile",
        progress: 65,
        nextLesson: "Facilitating PI Planning",
        thumbnail: "bg-gradient-to-br from-zinc-700 to-zinc-600",
        duration: "35 min left",
        xpReward: 150,
    },
    {
        id: "leadership-fundamentals",
        title: "Leadership Fundamentals",
        category: "Leadership",
        progress: 30,
        nextLesson: "Emotional Intelligence",
        thumbnail: "bg-gradient-to-br from-zinc-600 to-zinc-500",
        duration: "2h 15min left",
        xpReward: 200,
    },
];

// Recommended courses
const recommended = [
    {
        id: "hipaa-essentials",
        title: "HIPAA Compliance Essentials",
        category: "Compliance",
        rating: 4.8,
        students: 12500,
        duration: "1h 30min",
        thumbnail: "bg-gradient-to-br from-zinc-700 to-zinc-600",
    },
    {
        id: "effective-feedback",
        title: "Giving & Receiving Feedback",
        category: "Soft Skills",
        rating: 4.9,
        students: 8900,
        duration: "45min",
        thumbnail: "bg-gradient-to-br from-zinc-600 to-zinc-500",
    },
    {
        id: "data-analytics",
        title: "Data Analytics Fundamentals",
        category: "Technology",
        rating: 4.7,
        students: 15200,
        duration: "3h",
        thumbnail: "bg-gradient-to-br from-zinc-700 to-zinc-600",
    },
];

// Recent activity
const recentActivity = [
    { type: "completed", title: "Completed 'Introduction to AI'", time: "2 hours ago", xp: 100 },
    { type: "achievement", title: "Earned 'Quick Learner' badge", time: "Yesterday", xp: 50 },
    { type: "started", title: "Started 'SAFe Scrum Master'", time: "2 days ago", xp: 25 },
];

export default function DashboardPage() {
    const xpProgress = (userStats.xp / userStats.xpToNextLevel) * 100;

    return (
        <div className="p-6 lg:p-8 max-w-7xl mx-auto">
            {/* Header with Level & XP */}
            <div className="mb-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div className="flex items-center gap-6">
                    {/* Level Badge */}
                    <div className="relative">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/20">
                            <span className="text-2xl font-bold text-primary">{userStats.level}</span>
                        </div>
                        {/* XP Progress Ring */}
                        <svg className="absolute inset-0 -rotate-90" viewBox="0 0 64 64">
                            <circle
                                cx="32"
                                cy="32"
                                r="28"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                                className="text-white/5"
                            />
                            <circle
                                cx="32"
                                cy="32"
                                r="28"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeDasharray={`${xpProgress * 1.76} 176`}
                                strokeLinecap="round"
                                className="text-primary transition-all duration-1000"
                            />
                        </svg>
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <h1 className="text-2xl font-semibold">Welcome back, John</h1>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                            <span className="text-muted-foreground">
                                <span className="text-foreground font-medium">{userStats.levelName}</span> • Level {userStats.level}
                            </span>
                            <span className="text-muted-foreground">
                                <span className="text-primary font-medium">{userStats.xp.toLocaleString()}</span> / {userStats.xpToNextLevel.toLocaleString()} XP
                            </span>
                        </div>
                    </div>
                </div>

                {/* Streak & Actions */}
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.02] border border-white/10">
                        <Flame className="h-5 w-5 text-primary" />
                        <div>
                            <p className="text-lg font-bold">{userStats.streak}</p>
                            <p className="text-xs text-muted-foreground">Day Streak</p>
                        </div>
                    </div>
                    <Button variant="outline" size="sm" className="gap-2">
                        <Calendar className="h-4 w-4" />
                        Schedule
                    </Button>
                    <Button size="sm" className="gap-2">
                        <Zap className="h-4 w-4" />
                        Quick Start
                    </Button>
                </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10">
                    <div className="flex items-center justify-between mb-3">
                        <BookOpen className="h-5 w-5 text-muted-foreground" />
                        <span className="text-xs text-primary flex items-center gap-1">
                            <TrendingUp className="h-3 w-3" /> +3
                        </span>
                    </div>
                    <p className="text-2xl font-semibold">12</p>
                    <p className="text-sm text-muted-foreground">Active Courses</p>
                </div>

                <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10">
                    <div className="flex items-center justify-between mb-3">
                        <CheckCircle2 className="h-5 w-5 text-muted-foreground" />
                        <span className="text-xs text-primary flex items-center gap-1">
                            <TrendingUp className="h-3 w-3" /> +5
                        </span>
                    </div>
                    <p className="text-2xl font-semibold">{userStats.coursesCompleted}</p>
                    <p className="text-sm text-muted-foreground">Completed</p>
                </div>

                <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10">
                    <div className="flex items-center justify-between mb-3">
                        <Trophy className="h-5 w-5 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">3 new</span>
                    </div>
                    <p className="text-2xl font-semibold">8</p>
                    <p className="text-sm text-muted-foreground">Achievements</p>
                </div>

                <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10">
                    <div className="flex items-center justify-between mb-3">
                        <Clock className="h-5 w-5 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">this month</span>
                    </div>
                    <p className="text-2xl font-semibold">{userStats.hoursLearned}h</p>
                    <p className="text-sm text-muted-foreground">Learning Time</p>
                </div>
            </div>

            {/* Main Content */}
            <div className="grid lg:grid-cols-3 gap-8">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-10">
                    {/* Your Created Trainings */}
                    <div>
                        <div className="flex items-center justify-between mb-5">
                            <div>
                                <h2 className="text-lg font-semibold">Your Trainings</h2>
                                <p className="text-sm text-muted-foreground">AI-generated modules you&apos;ve created</p>
                            </div>
                            <Link href="/studio/create" className="text-sm text-primary hover:underline">
                                + Create new
                            </Link>
                        </div>
                        <UserCreatedTrainings />
                    </div>

                    {/* Continue Learning */}
                    <div>
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-lg font-semibold">Continue Learning</h2>
                            <Link href="/learning" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                View all
                            </Link>
                        </div>
                        <div className="space-y-3">
                            {continuelearning.map((course) => (
                                <Link key={course.id} href={`/module/${course.id}`}>
                                    <div className="group p-4 rounded-xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all">
                                        <div className="flex gap-4">
                                            <div className={`w-16 h-16 ${course.thumbnail} rounded-lg flex items-center justify-center flex-shrink-0`}>
                                                <Play className="h-6 w-6 text-white/70" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between gap-2 mb-1">
                                                    <div>
                                                        <p className="text-xs text-muted-foreground mb-1">{course.category}</p>
                                                        <h3 className="font-medium group-hover:text-primary transition-colors">
                                                            {course.title}
                                                        </h3>
                                                    </div>
                                                    <div className="text-right">
                                                        <span className="text-xs text-primary font-medium">+{course.xpReward} XP</span>
                                                    </div>
                                                </div>
                                                <p className="text-sm text-muted-foreground mb-3">
                                                    Next: {course.nextLesson}
                                                </p>
                                                <div className="flex items-center gap-3">
                                                    <Progress value={course.progress} className="flex-1 h-1.5" />
                                                    <span className="text-xs text-muted-foreground">{course.progress}%</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Achievements Preview */}
                    <div>
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-lg font-semibold">Achievements</h2>
                            <Link href="/achievements" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                View all
                            </Link>
                        </div>
                        <div className="grid sm:grid-cols-3 gap-4">
                            {achievements.map((achievement) => {
                                const Icon = achievement.icon;
                                return (
                                    <div
                                        key={achievement.id}
                                        className={`p-4 rounded-xl border transition-all ${achievement.unlocked
                                            ? "bg-primary/5 border-primary/20"
                                            : "bg-white/[0.02] border-white/10"
                                            }`}
                                    >
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${achievement.unlocked ? "bg-primary/20" : "bg-white/5"
                                                }`}>
                                                <Icon className={`h-5 w-5 ${achievement.unlocked ? "text-primary" : "text-muted-foreground"}`} />
                                            </div>
                                            {achievement.unlocked && (
                                                <CheckCircle2 className="h-4 w-4 text-primary ml-auto" />
                                            )}
                                        </div>
                                        <h4 className="font-medium text-sm mb-1">{achievement.title}</h4>
                                        <p className="text-xs text-muted-foreground mb-2">{achievement.description}</p>
                                        {!achievement.unlocked && achievement.progress && (
                                            <div className="flex items-center gap-2">
                                                <Progress value={achievement.progress} className="flex-1 h-1" />
                                                <span className="text-xs text-muted-foreground">{achievement.progress}%</span>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Recommended */}
                    <div>
                        <div className="flex items-center justify-between mb-5">
                            <div>
                                <h2 className="text-lg font-semibold">Recommended</h2>
                                <p className="text-sm text-muted-foreground">Based on your interests</p>
                            </div>
                            <Link href="/library" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                Browse all
                            </Link>
                        </div>
                        <div className="grid sm:grid-cols-3 gap-4">
                            {recommended.map((course) => (
                                <Link key={course.id} href={`/module/${course.id}`}>
                                    <div className="group rounded-xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all overflow-hidden">
                                        <div className={`h-24 ${course.thumbnail} flex items-center justify-center`}>
                                            <Play className="h-8 w-8 text-white/50 group-hover:text-white/70 transition-colors" />
                                        </div>
                                        <div className="p-4">
                                            <p className="text-xs text-muted-foreground mb-1">{course.category}</p>
                                            <h3 className="font-medium text-sm group-hover:text-primary transition-colors line-clamp-2 min-h-[40px]">
                                                {course.title}
                                            </h3>
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
                                                <span className="flex items-center gap-1">
                                                    <Star className="h-3 w-3" />
                                                    {course.rating}
                                                </span>
                                                <span>•</span>
                                                <span>{course.duration}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-8">
                    {/* Weekly Progress */}
                    <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-medium">Weekly Goal</h3>
                            <span className="text-sm text-muted-foreground">75%</span>
                        </div>
                        <Progress value={75} className="h-2 mb-4" />
                        <p className="text-sm text-muted-foreground">
                            2 more lessons to reach your goal
                        </p>
                        <div className="flex gap-1 mt-4">
                            {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
                                <div
                                    key={day + i}
                                    className={`flex-1 h-7 rounded flex items-center justify-center text-xs ${i < 5 ? "bg-primary/20 text-primary" : "bg-white/5 text-muted-foreground"
                                        }`}
                                >
                                    {day}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* XP Activity */}
                    <div>
                        <h3 className="font-medium mb-4">XP Activity</h3>
                        <div className="space-y-2">
                            {recentActivity.map((activity, i) => (
                                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/5">
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm truncate">{activity.title}</p>
                                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                                    </div>
                                    <span className="text-sm text-primary font-medium">+{activity.xp}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div>
                        <h3 className="font-medium mb-4">Quick Actions</h3>
                        <div className="space-y-2">
                            {[
                                { icon: Target, label: "Set Goals" },
                                { icon: Trophy, label: "Leaderboard" },
                                { icon: Users, label: "Team Progress" },
                            ].map((action) => (
                                <button
                                    key={action.label}
                                    className="w-full flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all text-left"
                                >
                                    <action.icon className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm">{action.label}</span>
                                    <ChevronRight className="h-4 w-4 ml-auto text-muted-foreground" />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
