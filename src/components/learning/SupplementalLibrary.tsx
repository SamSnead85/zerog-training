"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    BookOpen,
    Play,
    FileText,
    Headphones,
    Wrench,
    ExternalLink,
    Clock,
    ChevronDown,
    ChevronUp,
    Star
} from "lucide-react";
import type { SupplementalLibrary, SupplementalResource } from "@/lib/curriculum/lesson-content";

interface SupplementalLibraryProps {
    library: SupplementalLibrary;
}

const typeIcons = {
    video: Play,
    book: BookOpen,
    article: FileText,
    podcast: Headphones,
    course: Star,
    tool: Wrench
};

const difficultyColors = {
    beginner: "bg-green-500/10 text-green-400 border-green-500/30",
    intermediate: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    advanced: "bg-red-500/10 text-red-400 border-red-500/30"
};

function ResourceCard({ resource }: { resource: SupplementalResource }) {
    const Icon = typeIcons[resource.type];

    return (
        <div className="p-4 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-all group">
            <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 shrink-0">
                    <Icon className="w-5 h-5 text-blue-400" />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-white group-hover:text-blue-300 transition-colors truncate">
                            {resource.title}
                        </h4>
                        {resource.free && (
                            <Badge variant="outline" className="text-xs bg-green-500/10 text-green-400 border-green-500/30">
                                Free
                            </Badge>
                        )}
                    </div>
                    {resource.author && (
                        <p className="text-sm text-white/60 mb-1">by {resource.author}</p>
                    )}
                    <p className="text-sm text-white/70 line-clamp-2">{resource.description}</p>
                    <div className="flex items-center gap-3 mt-2">
                        {resource.duration && (
                            <span className="text-xs text-white/50 flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {resource.duration}
                            </span>
                        )}
                        {resource.difficulty && (
                            <Badge variant="outline" className={`text-xs ${difficultyColors[resource.difficulty]}`}>
                                {resource.difficulty}
                            </Badge>
                        )}
                        {resource.url && (
                            <a
                                href={resource.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 ml-auto"
                            >
                                Open <ExternalLink className="w-3 h-3" />
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function ResourceSection({
    title,
    resources,
    icon: Icon
}: {
    title: string;
    resources: SupplementalResource[];
    icon: React.ElementType
}) {
    const [expanded, setExpanded] = useState(true);

    if (!resources?.length) return null;

    return (
        <div className="mb-6">
            <button
                onClick={() => setExpanded(!expanded)}
                className="flex items-center gap-2 w-full text-left mb-3 group"
            >
                <Icon className="w-5 h-5 text-blue-400" />
                <h3 className="text-lg font-semibold text-white">{title}</h3>
                <Badge variant="outline" className="ml-2 text-xs">{resources.length}</Badge>
                {expanded ? (
                    <ChevronUp className="w-4 h-4 text-white/50 ml-auto" />
                ) : (
                    <ChevronDown className="w-4 h-4 text-white/50 ml-auto" />
                )}
            </button>
            {expanded && (
                <div className="grid gap-3">
                    {resources.map((resource, index) => (
                        <ResourceCard key={index} resource={resource} />
                    ))}
                </div>
            )}
        </div>
    );
}

export function SupplementalLibraryComponent({ library }: SupplementalLibraryProps) {
    return (
        <Card className="border-white/10 bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-sm overflow-hidden">
            <CardHeader className="border-b border-white/10 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10">
                <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg">
                        <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <CardTitle className="text-xl text-white">{library.title}</CardTitle>
                        <p className="text-sm text-white/60 mt-1">{library.description}</p>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-6">
                <ResourceSection title="Videos" resources={library.videos || []} icon={Play} />
                <ResourceSection title="Books" resources={library.books || []} icon={BookOpen} />
                <ResourceSection title="Articles & Tutorials" resources={library.articles || []} icon={FileText} />
                <ResourceSection title="Podcasts" resources={library.podcasts || []} icon={Headphones} />
                <ResourceSection title="Tools & Platforms" resources={library.tools || []} icon={Wrench} />
            </CardContent>
        </Card>
    );
}
