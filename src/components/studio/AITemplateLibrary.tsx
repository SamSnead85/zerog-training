"use client";

import { useState } from "react";
import { Card, Button, Badge, Progress } from "@/components/ui";
import {
    Wand2,
    Sparkles,
    FileText,
    Clock,
    Users,
    Star,
    ChevronRight,
    Search,
    Filter,
    Shield,
    Briefcase,
    Heart,
    Brain,
    Target
} from "lucide-react";
import { cn } from "@/lib/utils";

type TemplateCategory = "compliance" | "leadership" | "technology" | "healthcare" | "custom";

interface AITemplate {
    id: string;
    title: string;
    description: string;
    category: TemplateCategory;
    estimatedDuration: string;
    difficulty: "beginner" | "intermediate" | "advanced";
    usageCount: number;
    rating: number;
    isNew: boolean;
    isFeatured: boolean;
}

const categoryConfig: Record<TemplateCategory, { label: string; icon: React.ElementType; color: string }> = {
    compliance: { label: "Compliance", icon: Shield, color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
    leadership: { label: "Leadership", icon: Briefcase, color: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
    technology: { label: "Technology", icon: Brain, color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
    healthcare: { label: "Healthcare", icon: Heart, color: "bg-red-500/20 text-red-400 border-red-500/30" },
    custom: { label: "Custom", icon: Target, color: "bg-slate-500/20 text-slate-400 border-slate-500/30" },
};

const mockTemplates: AITemplate[] = [
    { id: "1", title: "HIPAA Privacy Training", description: "Generate comprehensive HIPAA compliance training with PHI handling scenarios", category: "healthcare", estimatedDuration: "45 min", difficulty: "intermediate", usageCount: 1250, rating: 4.9, isNew: false, isFeatured: true },
    { id: "2", title: "Cybersecurity Awareness", description: "Create engaging security training with phishing simulations and best practices", category: "compliance", estimatedDuration: "30 min", difficulty: "beginner", usageCount: 2100, rating: 4.8, isNew: false, isFeatured: true },
    { id: "3", title: "AI Ethics & Responsible Use", description: "Build training on ethical AI usage and organizational guidelines", category: "technology", estimatedDuration: "25 min", difficulty: "intermediate", usageCount: 890, rating: 4.7, isNew: true, isFeatured: false },
    { id: "4", title: "Leadership Fundamentals", description: "Generate leadership development content with situational exercises", category: "leadership", estimatedDuration: "60 min", difficulty: "advanced", usageCount: 1500, rating: 4.8, isNew: false, isFeatured: false },
    { id: "5", title: "Data Privacy (GDPR/CCPA)", description: "Create data protection training covering major privacy regulations", category: "compliance", estimatedDuration: "40 min", difficulty: "intermediate", usageCount: 980, rating: 4.6, isNew: false, isFeatured: false },
    { id: "6", title: "Prompt Engineering Basics", description: "Build AI prompt engineering training for team productivity", category: "technology", estimatedDuration: "35 min", difficulty: "beginner", usageCount: 1800, rating: 4.9, isNew: true, isFeatured: true },
    { id: "7", title: "AI-Native Framework Fundamentals", description: "Generate NATIVE framework training with real-world implementation scenarios", category: "leadership", estimatedDuration: "50 min", difficulty: "intermediate", usageCount: 1100, rating: 4.7, isNew: false, isFeatured: false },
    { id: "8", title: "Patient Safety Essentials", description: "Create Joint Commission compliant patient safety training", category: "healthcare", estimatedDuration: "35 min", difficulty: "beginner", usageCount: 750, rating: 4.8, isNew: false, isFeatured: false },
];

export function AITemplateLibrary() {
    const [templates, setTemplates] = useState(mockTemplates);
    const [searchQuery, setSearchQuery] = useState("");
    const [categoryFilter, setCategoryFilter] = useState<TemplateCategory | "all">("all");

    const filtered = templates.filter(t => {
        const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = categoryFilter === "all" || t.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    const featured = templates.filter(t => t.isFeatured);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                        <Wand2 className="h-5 w-5 text-primary" />
                        AI Template Library
                    </h2>
                    <p className="text-sm text-muted-foreground">Pre-built templates for instant training generation</p>
                </div>
                <Button className="gap-1">
                    <Sparkles className="h-4 w-4" />
                    Create from Scratch
                </Button>
            </div>

            {/* Featured Templates */}
            <div>
                <h3 className="font-medium mb-3 flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    Featured Templates
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {featured.map((template) => {
                        const cat = categoryConfig[template.category];
                        const CatIcon = cat.icon;
                        return (
                            <Card
                                key={template.id}
                                className="p-4 hover:border-primary/30 transition-all cursor-pointer group bg-gradient-to-br from-primary/5 to-transparent"
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", cat.color)}>
                                        <CatIcon className="h-5 w-5" />
                                    </div>
                                    {template.isNew && (
                                        <Badge className="bg-emerald-500 text-white">New</Badge>
                                    )}
                                </div>
                                <h4 className="font-semibold mb-1 group-hover:text-primary transition-colors">{template.title}</h4>
                                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{template.description}</p>
                                <div className="flex items-center justify-between text-xs text-muted-foreground">
                                    <span className="flex items-center gap-1">
                                        <Clock className="h-3 w-3" />
                                        {template.estimatedDuration}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Star className="h-3 w-3 text-yellow-500 fill-current" />
                                        {template.rating}
                                    </span>
                                </div>
                            </Card>
                        );
                    })}
                </div>
            </div>

            {/* Search and Filters */}
            <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search templates..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                </div>
                <div className="flex gap-2 overflow-x-auto">
                    {(["all", "compliance", "leadership", "technology", "healthcare"] as const).map((cat) => (
                        <Button
                            key={cat}
                            variant={categoryFilter === cat ? "default" : "outline"}
                            size="sm"
                            onClick={() => setCategoryFilter(cat)}
                        >
                            {cat === "all" ? "All" : categoryConfig[cat].label}
                        </Button>
                    ))}
                </div>
            </div>

            {/* All Templates */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {filtered.map((template) => {
                    const cat = categoryConfig[template.category];
                    const CatIcon = cat.icon;
                    return (
                        <Card
                            key={template.id}
                            className="p-4 hover:border-primary/30 transition-all cursor-pointer group"
                        >
                            <div className="flex items-start justify-between mb-3">
                                <Badge variant="outline" className={cn("text-xs", cat.color)}>
                                    <CatIcon className="h-3 w-3 mr-1" />
                                    {cat.label}
                                </Badge>
                                {template.isNew && (
                                    <Badge className="bg-emerald-500 text-white text-xs">New</Badge>
                                )}
                            </div>
                            <h4 className="font-medium mb-1 group-hover:text-primary transition-colors">{template.title}</h4>
                            <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{template.description}</p>
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                                <span className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {template.estimatedDuration}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Users className="h-3 w-3" />
                                    {template.usageCount.toLocaleString()}
                                </span>
                            </div>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
