"use client";

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
    aiNativeCurriculum,
    getModuleById,
    type AIModule
} from "@/lib/curriculum/ai-native-curriculum";
import { Card, Button, Badge, Progress } from "@/components/ui";
import {
    Brain,
    Clock,
    BookOpen,
    Code,
    ChevronRight,
    ChevronLeft,
    CheckCircle2,
    Target,
    Play,
    FileText,
    Layers,
    ArrowRight,
    Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

const levelConfig = {
    foundation: { color: "bg-blue-500/20 text-blue-500 border-blue-500/30" },
    professional: { color: "bg-purple-500/20 text-purple-500 border-purple-500/30" },
    architect: { color: "bg-amber-500/20 text-amber-500 border-amber-500/30" },
};

const difficultyConfig = {
    beginner: { color: "bg-emerald-500/20 text-emerald-500" },
    intermediate: { color: "bg-blue-500/20 text-blue-500" },
    advanced: { color: "bg-amber-500/20 text-amber-500" },
};

export default function ModulePage({ params }: { params: Promise<{ moduleId: string }> }) {
    const { moduleId } = use(params);
    const module = getModuleById(moduleId);

    if (!module) {
        notFound();
    }

    const config = levelConfig[module.level];
    const prevModule = aiNativeCurriculum.find(m => m.number === module.number - 1);
    const nextModule = aiNativeCurriculum.find(m => m.number === module.number + 1);

    return (
        <div className="min-h-screen bg-background">
            {/* Breadcrumb */}
            <div className="border-b border-border/50 bg-muted/30">
                <div className="max-w-6xl mx-auto px-4 py-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Link href="/ai-native" className="hover:text-primary transition-colors">
                            AI-Native Training
                        </Link>
                        <ChevronRight className="h-4 w-4" />
                        <span className="text-foreground font-medium">Module {module.number}</span>
                    </div>
                </div>
            </div>

            {/* Hero */}
            <section className="py-12 px-4 border-b border-border">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-start gap-6">
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center text-3xl font-bold shrink-0">
                            {module.number}
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <Badge variant="outline" className={cn("text-xs", config.color)}>
                                    {module.level.charAt(0).toUpperCase() + module.level.slice(1)}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                    <Clock className="h-3 w-3 mr-1" />
                                    {module.duration}
                                </Badge>
                                {module.status === "available" && (
                                    <Badge className="text-xs bg-emerald-500">Available Now</Badge>
                                )}
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold mb-2">{module.title}</h1>
                            <p className="text-lg text-muted-foreground">{module.subtitle}</p>
                        </div>
                    </div>

                    <p className="mt-6 text-muted-foreground max-w-4xl">{module.description}</p>

                    {/* Source Attribution - adds credibility */}
                    <div className="mt-4 flex flex-wrap items-center gap-2">
                        <span className="text-xs text-muted-foreground">Based on:</span>
                        {module.id === "module-3" && (
                            <Badge variant="outline" className="text-xs bg-blue-500/10 text-blue-400 border-blue-500/30">DeepLearning.AI</Badge>
                        )}
                        {module.id === "module-5" && (
                            <>
                                <Badge variant="outline" className="text-xs bg-purple-500/10 text-purple-400 border-purple-500/30">SAFe 6.0</Badge>
                                <Badge variant="outline" className="text-xs bg-orange-500/10 text-orange-400 border-orange-500/30">CrewAI</Badge>
                            </>
                        )}
                        {module.id === "module-4" && (
                            <Badge variant="outline" className="text-xs bg-emerald-500/10 text-emerald-400 border-emerald-500/30">Google Cloud</Badge>
                        )}
                        {module.id === "module-7" && (
                            <Badge variant="outline" className="text-xs bg-red-500/10 text-red-400 border-red-500/30">OWASP</Badge>
                        )}
                        {!["module-3", "module-4", "module-5", "module-7"].includes(module.id) && (
                            <Badge variant="outline" className="text-xs">Industry Best Practices</Badge>
                        )}
                    </div>

                    <div className="mt-6 flex items-center gap-4">
                        <Link href="/ai-native/sample-lesson">
                            <Button size="lg" className="gap-2">
                                <Play className="h-5 w-5" />
                                Start Module
                            </Button>
                        </Link>
                        {module.id === "module-3" && (
                            <Link href="/ai-native/lab">
                                <Button size="lg" variant="secondary" className="gap-2">
                                    <Code className="h-5 w-5" />
                                    Interactive Lab
                                </Button>
                            </Link>
                        )}
                        <Button size="lg" variant="outline" className="gap-2">
                            <FileText className="h-5 w-5" />
                            Download Syllabus
                        </Button>
                    </div>
                </div>
            </section>

            {/* Content */}
            <div className="max-w-6xl mx-auto px-4 py-12 grid lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Learning Objectives */}
                    <Card className="p-6">
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <Target className="h-5 w-5 text-primary" />
                            Learning Objectives
                        </h2>
                        <div className="space-y-3">
                            {module.learningObjectives.map((obj, i) => (
                                <div key={obj.id} className="flex items-start gap-3">
                                    <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5 shrink-0" />
                                    <span>{obj.text}</span>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Topics */}
                    <Card className="p-6">
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <BookOpen className="h-5 w-5 text-primary" />
                            Topics Covered
                        </h2>
                        <div className="space-y-4">
                            {module.topics.map((topic, i) => (
                                <div key={topic.id} className="border border-border rounded-lg p-4">
                                    <div className="flex items-start justify-between mb-2">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                                                {i + 1}
                                            </div>
                                            <div>
                                                <h3 className="font-semibold">{topic.title}</h3>
                                                <p className="text-sm text-muted-foreground">{topic.description}</p>
                                            </div>
                                        </div>
                                        <Badge variant="outline" className="text-xs shrink-0">
                                            <Clock className="h-3 w-3 mr-1" />
                                            {topic.duration}
                                        </Badge>
                                    </div>
                                    {topic.subtopics && (
                                        <div className="mt-3 ml-11 space-y-1">
                                            {topic.subtopics.map((sub, j) => (
                                                <div key={j} className="text-sm text-muted-foreground flex items-center gap-2">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                                                    {sub}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Hands-On Projects */}
                    <Card className="p-6">
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <Code className="h-5 w-5 text-primary" />
                            Hands-On Projects
                        </h2>
                        <div className="space-y-4">
                            {module.handsOnProjects.map((project) => {
                                const diffConfig = difficultyConfig[project.difficulty];
                                return (
                                    <div key={project.id} className="border border-border rounded-lg p-4 hover:border-primary/30 transition-colors">
                                        <div className="flex items-start justify-between mb-2">
                                            <h3 className="font-semibold">{project.title}</h3>
                                            <div className="flex items-center gap-2">
                                                <Badge variant="outline" className={cn("text-xs", diffConfig.color)}>
                                                    {project.difficulty}
                                                </Badge>
                                                <Badge variant="outline" className="text-xs">
                                                    <Clock className="h-3 w-3 mr-1" />
                                                    {project.duration}
                                                </Badge>
                                            </div>
                                        </div>
                                        <p className="text-sm text-muted-foreground">{project.description}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Module Progress */}
                    <Card className="p-6">
                        <h3 className="font-semibold mb-4">Module Progress</h3>
                        <Progress value={0} className="h-2 mb-2" />
                        <p className="text-sm text-muted-foreground">Not started</p>
                        <Link href="/ai-native/sample-lesson">
                            <Button className="w-full mt-4 gap-2">
                                <Play className="h-4 w-4" />
                                Start Module
                            </Button>
                        </Link>
                    </Card>

                    {/* Prerequisites */}
                    {module.prerequisites && module.prerequisites.length > 0 && (
                        <Card className="p-6">
                            <h3 className="font-semibold mb-4">Prerequisites</h3>
                            <div className="space-y-2">
                                {module.prerequisites.map((prereq, i) => (
                                    <div key={i} className="flex items-center gap-2 text-sm">
                                        <Layers className="h-4 w-4 text-muted-foreground" />
                                        <span>{prereq}</span>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    )}

                    {/* Recommended Resources */}
                    <Card className="p-6">
                        <h3 className="font-semibold mb-4">Recommended Resources</h3>
                        <div className="space-y-3">
                            {module.id === "module-3" && (
                                <>
                                    <a href="https://www.deeplearning.ai/short-courses/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-primary hover:underline">
                                        <Play className="h-4 w-4" />
                                        DeepLearning.AI Courses
                                    </a>
                                    <a href="https://github.com/langchain-ai/langgraph" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-primary hover:underline">
                                        <Code className="h-4 w-4" />
                                        LangGraph Repository
                                    </a>
                                </>
                            )}
                            {module.id === "module-4" && (
                                <a href="https://cloud.google.com/learn/training/machinelearning-ai" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-primary hover:underline">
                                    <Play className="h-4 w-4" />
                                    Google Cloud ML Training
                                </a>
                            )}
                            {module.id === "module-2" && (
                                <a href="https://github.com/features/copilot" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-primary hover:underline">
                                    <Code className="h-4 w-4" />
                                    GitHub Copilot Docs
                                </a>
                            )}
                            <p className="text-xs text-muted-foreground">External learning resources to supplement your training.</p>
                        </div>
                    </Card>

                    {/* Assessment */}
                    <Card className="p-6">
                        <h3 className="font-semibold mb-4">Assessment</h3>
                        <p className="text-sm text-muted-foreground">{module.assessmentType}</p>
                    </Card>

                    {/* Navigation */}
                    <Card className="p-6">
                        <h3 className="font-semibold mb-4">Module Navigation</h3>
                        <div className="space-y-2">
                            {prevModule && (
                                <Link href={`/ai-native/${prevModule.id}`}>
                                    <Button variant="outline" className="w-full justify-start gap-2">
                                        <ChevronLeft className="h-4 w-4" />
                                        <span className="truncate">{prevModule.title}</span>
                                    </Button>
                                </Link>
                            )}
                            {nextModule && (
                                <Link href={`/ai-native/${nextModule.id}`}>
                                    <Button variant="outline" className="w-full justify-end gap-2">
                                        <span className="truncate">{nextModule.title}</span>
                                        <ChevronRight className="h-4 w-4" />
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
