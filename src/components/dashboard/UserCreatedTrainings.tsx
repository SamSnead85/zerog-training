"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getSavedTrainings, type StoredTraining } from "@/lib/training-storage";
import { Card, Badge, Button } from "@/components/ui";
import {
    Sparkles,
    Clock,
    BookOpen,
    ChevronRight,
    GraduationCap,
    FolderOpen,
    Plus,
} from "lucide-react";

export function UserCreatedTrainings() {
    const [trainings, setTrainings] = useState<StoredTraining[]>([]);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        setTrainings(getSavedTrainings());
    }, []);

    // Only render on client to avoid hydration issues
    if (!isClient) return null;

    if (trainings.length === 0) {
        return (
            <div className="p-6 rounded-xl bg-white/[0.02] border border-white/10 border-dashed text-center">
                <FolderOpen className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                <h3 className="font-medium mb-1">No training modules yet</h3>
                <p className="text-sm text-muted-foreground mb-4">
                    Create your first AI-powered training module
                </p>
                <Link href="/studio/create">
                    <Button size="sm" className="gap-2">
                        <Plus className="h-4 w-4" />
                        Create Training
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {trainings.slice(0, 3).map((training) => (
                <div
                    key={training.id}
                    className="group p-4 rounded-xl bg-white/[0.02] border border-white/10 hover:border-primary/30 transition-all"
                >
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                                <Badge
                                    variant={training.status === "published" ? "success" : "secondary"}
                                    className="text-xs"
                                >
                                    {training.status === "published" ? "Published" : "Draft"}
                                </Badge>
                                {training.category && (
                                    <Badge variant="outline" className="text-xs">
                                        {training.category}
                                    </Badge>
                                )}
                            </div>
                            <h3 className="font-semibold group-hover:text-primary transition-colors line-clamp-1">
                                {training.title}
                            </h3>
                            <p className="text-sm text-muted-foreground line-clamp-1 mt-0.5">
                                {training.description}
                            </p>
                            <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {training.duration}
                                </span>
                                <span className="flex items-center gap-1">
                                    <BookOpen className="h-3 w-3" />
                                    {training.sections.length} sections
                                </span>
                                <span className="flex items-center gap-1">
                                    <GraduationCap className="h-3 w-3" />
                                    {training.sections.filter(s => s.type === "quiz").length} quizzes
                                </span>
                            </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                    </div>
                </div>
            ))}

            {trainings.length > 3 && (
                <Link href="/library" className="block text-center text-sm text-primary hover:underline">
                    View all {trainings.length} trainings →
                </Link>
            )}
        </div>
    );
}
