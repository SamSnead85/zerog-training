"use client";

import { Card, Badge } from "@/components/ui";
import {
    CheckCircle2,
    BookOpen,
    Award,
    TrendingUp,
    MessageSquare,
    Users,
    Star,
    Clock
} from "lucide-react";
import { cn } from "@/lib/utils";

type ActivityType = "completed" | "started" | "achievement" | "milestone" | "comment" | "team" | "rating";

interface Activity {
    id: string;
    type: ActivityType;
    title: string;
    description?: string;
    timestamp: string;
    meta?: {
        xp?: number;
        course?: string;
        badge?: string;
    };
}

const activityIcons: Record<ActivityType, React.ElementType> = {
    completed: CheckCircle2,
    started: BookOpen,
    achievement: Award,
    milestone: TrendingUp,
    comment: MessageSquare,
    team: Users,
    rating: Star,
};

const activityColors: Record<ActivityType, string> = {
    completed: "bg-emerald-500/20 text-emerald-500",
    started: "bg-blue-500/20 text-blue-500",
    achievement: "bg-yellow-500/20 text-yellow-500",
    milestone: "bg-purple-500/20 text-purple-500",
    comment: "bg-slate-500/20 text-slate-400",
    team: "bg-cyan-500/20 text-cyan-500",
    rating: "bg-amber-500/20 text-amber-500",
};

const mockActivities: Activity[] = [
    { id: "1", type: "completed", title: "Completed HIPAA Training", timestamp: "2 hours ago", meta: { xp: 150, course: "HIPAA Privacy & Security" } },
    { id: "2", type: "achievement", title: "Earned 'Security Champion' badge", timestamp: "3 hours ago", meta: { badge: "Security Champion" } },
    { id: "3", type: "started", title: "Started SAFe 6.0 Agilist", timestamp: "Yesterday", meta: { course: "SAFe 6.0 Agilist Certification" } },
    { id: "4", type: "milestone", title: "Reached 1,000 XP milestone", timestamp: "2 days ago", meta: { xp: 1000 } },
    { id: "5", type: "rating", title: "Rated Prompt Engineering Masterclass", timestamp: "3 days ago", meta: { course: "Prompt Engineering" } },
    { id: "6", type: "completed", title: "Completed Cybersecurity Awareness", timestamp: "4 days ago", meta: { xp: 100 } },
];

interface ActivityTimelineProps {
    activities?: Activity[];
    maxItems?: number;
}

export function ActivityTimeline({ activities = mockActivities, maxItems = 6 }: ActivityTimelineProps) {
    const displayActivities = activities.slice(0, maxItems);

    return (
        <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    Recent Activity
                </h3>
            </div>

            <div className="space-y-4">
                {displayActivities.map((activity, index) => {
                    const Icon = activityIcons[activity.type];
                    const isLast = index === displayActivities.length - 1;

                    return (
                        <div key={activity.id} className="flex gap-3">
                            {/* Timeline line */}
                            <div className="flex flex-col items-center">
                                <div className={cn("w-8 h-8 rounded-full flex items-center justify-center", activityColors[activity.type])}>
                                    <Icon className="h-4 w-4" />
                                </div>
                                {!isLast && <div className="w-px h-full bg-border mt-2" />}
                            </div>

                            {/* Content */}
                            <div className="flex-1 pb-4">
                                <div className="font-medium text-sm">{activity.title}</div>
                                {activity.meta?.xp && (
                                    <Badge variant="outline" className="mt-1 text-xs bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
                                        +{activity.meta.xp} XP
                                    </Badge>
                                )}
                                <div className="text-xs text-muted-foreground mt-1">{activity.timestamp}</div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </Card>
    );
}
