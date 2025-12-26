"use client";

import { Button } from "@/components/ui";
import {
    BookOpen,
    Users,
    Sparkles,
    FileText,
    BarChart3,
    FolderOpen,
    Plus,
} from "lucide-react";
import Link from "next/link";

interface EmptyStateProps {
    type: "courses" | "team" | "assignments" | "reports" | "library";
}

const emptyStates = {
    courses: {
        icon: BookOpen,
        title: "No courses yet",
        description: "Create your first training course using AI or browse our content library.",
        primaryAction: { label: "Create with AI", href: "/create", icon: Sparkles },
        secondaryAction: { label: "Browse Library", href: "/library", icon: BookOpen },
    },
    team: {
        icon: Users,
        title: "No team members",
        description: "Add employees to start assigning training and tracking progress.",
        primaryAction: { label: "Add Employees", href: "/workforce", icon: Plus },
        secondaryAction: { label: "Bulk Import", href: "/workforce", icon: FileText },
    },
    assignments: {
        icon: FolderOpen,
        title: "No training assigned",
        description: "Assign training courses to your team to get started.",
        primaryAction: { label: "Assign Training", href: "/assign", icon: Plus },
        secondaryAction: { label: "View Courses", href: "/library", icon: BookOpen },
    },
    reports: {
        icon: BarChart3,
        title: "No reports available",
        description: "Reports will appear here once your team starts completing training.",
        primaryAction: { label: "Assign Training", href: "/assign", icon: Plus },
        secondaryAction: null,
    },
    library: {
        icon: BookOpen,
        title: "Content library is empty",
        description: "Create custom courses or import from our curated collection.",
        primaryAction: { label: "Create Course", href: "/create", icon: Sparkles },
        secondaryAction: { label: "Import Content", href: "/studio", icon: Plus },
    },
};

export function EmptyState({ type }: EmptyStateProps) {
    const state = emptyStates[type];
    const Icon = state.icon;

    return (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-6">
                <Icon className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{state.title}</h3>
            <p className="text-muted-foreground max-w-sm mb-6">{state.description}</p>
            <div className="flex gap-3">
                <Link href={state.primaryAction.href}>
                    <Button className="gap-2">
                        <state.primaryAction.icon className="h-4 w-4" />
                        {state.primaryAction.label}
                    </Button>
                </Link>
                {state.secondaryAction && (
                    <Link href={state.secondaryAction.href}>
                        <Button variant="outline" className="gap-2">
                            <state.secondaryAction.icon className="h-4 w-4" />
                            {state.secondaryAction.label}
                        </Button>
                    </Link>
                )}
            </div>
        </div>
    );
}
