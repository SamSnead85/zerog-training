import { Card, Badge, Progress } from "@/components/ui";
import {
    Trophy,
    Star,
    Flame,
    Target,
    BookOpen,
    Award,
    Zap,
    Clock,
    Users,
    Crown,
    Lock,
} from "lucide-react";

const achievements = [
    {
        id: "first-course",
        title: "First Steps",
        description: "Complete your first course",
        icon: BookOpen,
        unlocked: true,
        unlockedDate: "Dec 20, 2024",
        color: "from-green-500 to-emerald-600",
    },
    {
        id: "week-streak",
        title: "Week Warrior",
        description: "Maintain a 7-day learning streak",
        icon: Flame,
        unlocked: true,
        unlockedDate: "Dec 22, 2024",
        color: "from-orange-500 to-red-600",
    },
    {
        id: "fast-learner",
        title: "Fast Learner",
        description: "Complete 5 courses in one month",
        icon: Zap,
        unlocked: true,
        unlockedDate: "Dec 18, 2024",
        color: "from-yellow-500 to-amber-600",
    },
    {
        id: "perfectionist",
        title: "Perfectionist",
        description: "Score 100% on 3 assessments",
        icon: Target,
        unlocked: false,
        progress: 2,
        total: 3,
        color: "from-purple-500 to-violet-600",
    },
    {
        id: "marathon",
        title: "Learning Marathon",
        description: "Complete 10 hours of training",
        icon: Clock,
        unlocked: false,
        progress: 7,
        total: 10,
        color: "from-blue-500 to-cyan-600",
    },
    {
        id: "team-player",
        title: "Team Player",
        description: "Join a cohort learning group",
        icon: Users,
        unlocked: false,
        color: "from-pink-500 to-rose-600",
    },
    {
        id: "leader",
        title: "Thought Leader",
        description: "Complete all Leadership courses",
        icon: Crown,
        unlocked: false,
        color: "from-amber-500 to-yellow-600",
    },
    {
        id: "certified",
        title: "Certified Pro",
        description: "Earn 5 certificates",
        icon: Award,
        unlocked: false,
        progress: 1,
        total: 5,
        color: "from-indigo-500 to-blue-600",
    },
];

export default function AchievementsPage() {
    const unlocked = achievements.filter(a => a.unlocked);
    const locked = achievements.filter(a => !a.unlocked);

    return (
        <div className="p-6 lg:p-8 max-w-6xl mx-auto">
            <div className="mb-8">
                <h1 className="text-2xl font-bold mb-2">Achievements</h1>
                <p className="text-muted-foreground">
                    Earn badges by completing learning milestones
                </p>
            </div>

            {/* Summary stats */}
            <div className="grid grid-cols-3 gap-4 mb-10">
                <Card variant="glass" className="p-5 text-center">
                    <Trophy className="h-8 w-8 text-warning mx-auto mb-2" />
                    <p className="text-3xl font-bold">{unlocked.length}</p>
                    <p className="text-sm text-muted-foreground">Unlocked</p>
                </Card>
                <Card variant="glass" className="p-5 text-center">
                    <Star className="h-8 w-8 text-primary mx-auto mb-2" />
                    <p className="text-3xl font-bold">{locked.length}</p>
                    <p className="text-sm text-muted-foreground">To Earn</p>
                </Card>
                <Card variant="glass" className="p-5 text-center">
                    <Flame className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                    <p className="text-3xl font-bold">5</p>
                    <p className="text-sm text-muted-foreground">Day Streak</p>
                </Card>
            </div>

            {/* Unlocked */}
            <div className="mb-10">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-warning" />
                    Unlocked Achievements
                </h2>
                <div className="grid md:grid-cols-3 gap-4">
                    {unlocked.map((achievement) => {
                        const Icon = achievement.icon;
                        return (
                            <Card key={achievement.id} variant="glass" className="p-5 text-center">
                                <div className={`h-16 w-16 rounded-full bg-gradient-to-br ${achievement.color} flex items-center justify-center mx-auto mb-3`}>
                                    <Icon className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="font-semibold mb-1">{achievement.title}</h3>
                                <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                                <Badge variant="secondary" className="text-xs">
                                    Unlocked {achievement.unlockedDate}
                                </Badge>
                            </Card>
                        );
                    })}
                </div>
            </div>

            {/* Locked */}
            <div>
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Lock className="h-5 w-5 text-muted-foreground" />
                    Locked Achievements
                </h2>
                <div className="grid md:grid-cols-3 gap-4">
                    {locked.map((achievement) => {
                        const Icon = achievement.icon;
                        return (
                            <Card key={achievement.id} variant="outline" className="p-5 text-center opacity-70">
                                <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-3 relative">
                                    <Icon className="h-8 w-8 text-muted-foreground" />
                                    <Lock className="h-4 w-4 text-muted-foreground absolute -bottom-1 -right-1 bg-background rounded-full p-0.5" />
                                </div>
                                <h3 className="font-semibold mb-1">{achievement.title}</h3>
                                <p className="text-sm text-muted-foreground mb-3">{achievement.description}</p>
                                {achievement.progress !== undefined && (
                                    <div className="space-y-1">
                                        <Progress value={(achievement.progress / achievement.total!) * 100} className="h-1.5" />
                                        <p className="text-xs text-muted-foreground">{achievement.progress}/{achievement.total}</p>
                                    </div>
                                )}
                            </Card>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
