"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Building2,
    Stethoscope,
    Landmark,
    ShoppingCart,
    Factory,
    Scale,
    Clock,
    Target,
    ChevronDown,
    ChevronUp,
    ExternalLink,
    CheckCircle2,
    ListChecks,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { type RealWorldProject } from "@/lib/curriculum/lesson-content";

interface ProjectCardProps {
    project: RealWorldProject;
}

const industryConfig = {
    healthcare: { icon: Stethoscope, color: "text-rose-500", bg: "bg-rose-500/10", border: "border-rose-500/20" },
    finance: { icon: Landmark, color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20" },
    retail: { icon: ShoppingCart, color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20" },
    manufacturing: { icon: Factory, color: "text-slate-500", bg: "bg-slate-500/10", border: "border-slate-500/20" },
    legal: { icon: Scale, color: "text-purple-500", bg: "bg-purple-500/10", border: "border-purple-500/20" },
    general: { icon: Building2, color: "text-cyan-500", bg: "bg-cyan-500/10", border: "border-cyan-500/20" },
};

export function ProjectCardComponent({ project }: ProjectCardProps) {
    const [expandedSection, setExpandedSection] = useState<"deliverables" | "rubric" | "resources" | null>("deliverables");
    const [checkedDeliverables, setCheckedDeliverables] = useState<Set<number>>(new Set());

    const industry = industryConfig[project.industry];
    const IndustryIcon = industry.icon;

    const toggleDeliverable = (index: number) => {
        setCheckedDeliverables((prev) => {
            const next = new Set(prev);
            if (next.has(index)) {
                next.delete(index);
            } else {
                next.add(index);
            }
            return next;
        });
    };

    const toggleSection = (section: "deliverables" | "rubric" | "resources") => {
        setExpandedSection(expandedSection === section ? null : section);
    };

    return (
        <Card className={cn("overflow-hidden", industry.border)}>
            {/* Header */}
            <div className={cn("p-6", industry.bg)}>
                <div className="flex items-start gap-4">
                    <div className={cn("w-14 h-14 rounded-xl flex items-center justify-center", industry.bg, "border", industry.border)}>
                        <IndustryIcon className={cn("h-7 w-7", industry.color)} />
                    </div>
                    <div className="flex-1">
                        <div className="flex items-start justify-between">
                            <div>
                                <Badge variant="outline" className={cn("mb-2 capitalize", industry.color, industry.border)}>
                                    {project.industry} Project
                                </Badge>
                                <h3 className="text-xl font-semibold">{project.title}</h3>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Clock className="h-4 w-4" />
                                {project.estimatedHours}h
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-6 space-y-6">
                {/* Scenario */}
                <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                        <Target className="h-4 w-4" />
                        Scenario
                    </h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">{project.scenario}</p>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2">
                    {project.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                        </Badge>
                    ))}
                </div>

                {/* Collapsible Sections */}
                <div className="space-y-3">
                    {/* Deliverables */}
                    <div className="border rounded-lg overflow-hidden">
                        <button
                            onClick={() => toggleSection("deliverables")}
                            className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
                        >
                            <div className="flex items-center gap-2">
                                <ListChecks className="h-4 w-4" />
                                <span className="font-medium">Deliverables</span>
                                <Badge variant="outline" className="text-xs">
                                    {checkedDeliverables.size}/{project.deliverables.length}
                                </Badge>
                            </div>
                            {expandedSection === "deliverables" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </button>
                        {expandedSection === "deliverables" && (
                            <div className="px-4 pb-4 space-y-2">
                                {project.deliverables.map((deliverable, i) => (
                                    <button
                                        key={i}
                                        onClick={() => toggleDeliverable(i)}
                                        className={cn(
                                            "w-full flex items-start gap-3 p-3 rounded-lg text-left transition-all",
                                            checkedDeliverables.has(i)
                                                ? "bg-emerald-500/10 border border-emerald-500/20"
                                                : "bg-muted/50 hover:bg-muted"
                                        )}
                                    >
                                        <div
                                            className={cn(
                                                "w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5",
                                                checkedDeliverables.has(i) ? "border-emerald-500 bg-emerald-500" : "border-muted-foreground"
                                            )}
                                        >
                                            {checkedDeliverables.has(i) && <CheckCircle2 className="h-3 w-3 text-white" />}
                                        </div>
                                        <span className={cn("text-sm", checkedDeliverables.has(i) && "text-emerald-600 dark:text-emerald-400")}>
                                            {deliverable}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Rubric */}
                    <div className="border rounded-lg overflow-hidden">
                        <button
                            onClick={() => toggleSection("rubric")}
                            className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
                        >
                            <div className="flex items-center gap-2">
                                <Target className="h-4 w-4" />
                                <span className="font-medium">Evaluation Criteria</span>
                            </div>
                            {expandedSection === "rubric" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </button>
                        {expandedSection === "rubric" && (
                            <div className="px-4 pb-4 space-y-3">
                                {project.rubric.map((item, i) => (
                                    <div key={i} className="p-3 rounded-lg bg-muted/50">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="font-medium text-sm">{item.criterion}</span>
                                            <Badge variant="outline" className="text-xs">
                                                {item.weight}%
                                            </Badge>
                                        </div>
                                        <p className="text-xs text-muted-foreground">{item.description}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Resources */}
                    <div className="border rounded-lg overflow-hidden">
                        <button
                            onClick={() => toggleSection("resources")}
                            className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
                        >
                            <div className="flex items-center gap-2">
                                <ExternalLink className="h-4 w-4" />
                                <span className="font-medium">Resources</span>
                            </div>
                            {expandedSection === "resources" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </button>
                        {expandedSection === "resources" && (
                            <div className="px-4 pb-4 space-y-2">
                                {project.resources.map((resource, i) => (
                                    <a
                                        key={i}
                                        href={resource.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                                    >
                                        <span className="text-sm">{resource.title}</span>
                                        <ExternalLink className="h-4 w-4 text-muted-foreground" />
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Start Project Button */}
                <Button className="w-full" size="lg">
                    Start Project
                </Button>
            </div>
        </Card>
    );
}
