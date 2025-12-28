"use client";

import { useState } from "react";
import Link from "next/link";
import {
    aiNativeCurriculum,
    certificationTracks,
    getModulesByLevel,
    type AIModule,
    type CertificationTrack
} from "@/lib/curriculum/ai-native-curriculum";
import { Card, Button, Badge, Progress } from "@/components/ui";
import {
    Brain,
    Sparkles,
    Clock,
    BookOpen,
    Code,
    Users,
    ChevronRight,
    CheckCircle2,
    Trophy,
    Zap,
    Layers,
    Target,
    GraduationCap,
    Play,
    ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";

const levelConfig = {
    foundation: { color: "bg-blue-500/20 text-blue-500 border-blue-500/30", icon: BookOpen },
    professional: { color: "bg-purple-500/20 text-purple-500 border-purple-500/30", icon: Code },
    architect: { color: "bg-amber-500/20 text-amber-500 border-amber-500/30", icon: Layers },
};

function CertificationCard({ track }: { track: CertificationTrack }) {
    const config = levelConfig[track.level];
    const Icon = config.icon;
    const modules = track.modules.map(id => aiNativeCurriculum.find(m => m.id === id)).filter(Boolean) as AIModule[];

    return (
        <Card className={cn("p-6 hover:border-primary/30 transition-all group", `border-${track.level === 'foundation' ? 'blue' : track.level === 'professional' ? 'purple' : 'amber'}-500/20`)}>
            <div className="flex items-start gap-4 mb-4">
                <div className={cn("w-14 h-14 rounded-xl flex items-center justify-center", config.color)}>
                    <Icon className="h-7 w-7" />
                </div>
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-2xl">{track.badge}</span>
                        <Badge variant="outline" className={cn("text-xs", config.color)}>
                            {track.level.charAt(0).toUpperCase() + track.level.slice(1)}
                        </Badge>
                    </div>
                    <h3 className="text-lg font-bold group-hover:text-primary transition-colors">{track.title}</h3>
                </div>
            </div>

            <p className="text-sm text-muted-foreground mb-4">{track.description}</p>

            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {track.duration}
                </span>
                <span className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    {modules.length} Modules
                </span>
                <span className="flex items-center gap-1">
                    <Trophy className="h-4 w-4" />
                    {track.validityPeriod}
                </span>
            </div>

            <div className="space-y-2 mb-4">
                {modules.map((module, i) => (
                    <div key={module.id} className="flex items-center gap-2 text-sm">
                        <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
                            {module.number}
                        </div>
                        <span>{module.title}</span>
                    </div>
                ))}
            </div>

            {track.prerequisites && (
                <div className="text-xs text-muted-foreground mb-4">
                    <span className="font-medium">Prerequisites:</span> {track.prerequisites.join(", ")}
                </div>
            )}

            <Link href="/ai-native/sample-lesson">
                <Button className="w-full group-hover:bg-primary transition-colors">
                    Start {track.level === 'foundation' ? 'Learning' : 'Track'}
                    <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
            </Link>
        </Card>
    );
}

function ModuleCard({ module }: { module: AIModule }) {
    const config = levelConfig[module.level];

    return (
        <Link href={`/ai-native/${module.id}`}>
            <Card className="p-4 sm:p-5 hover:border-primary/30 hover:shadow-lg transition-all group cursor-pointer h-full">
                <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center text-base sm:text-lg font-bold shrink-0">
                        {module.number}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1.5">
                            <Badge variant="outline" className={cn("text-[10px] sm:text-xs", config.color)}>
                                {module.level.charAt(0).toUpperCase() + module.level.slice(1)}
                            </Badge>
                            <span className="text-[10px] sm:text-xs text-muted-foreground flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {module.duration}
                            </span>
                        </div>
                        <h4 className="font-semibold text-sm sm:text-base group-hover:text-primary transition-colors leading-snug">
                            {module.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-muted-foreground line-clamp-1 sm:line-clamp-2 mt-1">
                            {module.subtitle}
                        </p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary shrink-0 hidden sm:block" />
                </div>
            </Card>
        </Link>
    );
}

export default function AINativeTrainingPage() {
    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative overflow-hidden py-20 px-4">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-purple-500/5 to-background" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent opacity-50" />

                <div className="relative max-w-6xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                        <Sparkles className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">Flagship AI-Native Training</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-purple-500 bg-clip-text text-transparent">
                        Transform Your Workforce<br />into AI-Native Professionals
                    </h1>

                    <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                        Comprehensive, role-specific curriculum that transforms professionals into AI-powered practitioners.
                        Built on frameworks from <strong className="text-foreground">SAFe</strong>, <strong className="text-foreground">DeepLearning.AI</strong>,
                        <strong className="text-foreground"> Google Cloud</strong>, and <strong className="text-foreground">Microsoft</strong>.
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
                        <Link href="/ai-native/sample-lesson">
                            <Button size="lg" className="gap-2">
                                <Play className="h-5 w-5" />
                                Start AI-Native Journey
                            </Button>
                        </Link>
                        <Link href="#curriculum">
                            <Button size="lg" variant="outline" className="gap-2">
                                <BookOpen className="h-5 w-5" />
                                Explore Curriculum
                            </Button>
                        </Link>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                        {[
                            { value: "8", label: "Expert Modules", icon: BookOpen },
                            { value: "90+", label: "Hours of Content", icon: Clock },
                            { value: "3", label: "Certification Levels", icon: GraduationCap },
                            { value: "25+", label: "Hands-On Projects", icon: Code },
                        ].map((stat, i) => (
                            <div key={i} className="text-center">
                                <stat.icon className="h-6 w-6 mx-auto mb-2 text-primary" />
                                <div className="text-3xl font-bold">{stat.value}</div>
                                <div className="text-sm text-muted-foreground">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Value Propositions */}
            <section className="py-16 px-4 border-t border-border">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-2xl font-bold text-center mb-12">Why AI-Native Training?</h2>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                        {[
                            { icon: Layers, title: "Depth Over Breadth", description: "Not surface-level tool training—deep competency development" },
                            { icon: Users, title: "Role-Specific", description: "Customized learning paths for each professional role" },
                            { icon: Code, title: "Hands-On, Project-Based", description: "Real-world projects, not just theory" },
                            { icon: Trophy, title: "Certification Pathways", description: "Multi-level credentials that demonstrate mastery" },
                        ].map((item, i) => (
                            <Card key={i} className="p-5 text-center">
                                <item.icon className="h-10 w-10 mx-auto mb-3 text-primary" />
                                <h3 className="font-semibold mb-2">{item.title}</h3>
                                <p className="text-sm text-muted-foreground">{item.description}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Skills You'll Master */}
            <section className="py-16 px-4 border-t border-border bg-gradient-to-br from-primary/5 to-purple-500/5">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-10">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-3">Skills You'll Master</h2>
                        <p className="text-muted-foreground">Practical AI capabilities that transform your daily work</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { skill: "Agentic AI", detail: "Build self-improving AI systems" },
                            { skill: "Prompt Engineering", detail: "Expert-level prompting" },
                            { skill: "RAG Architecture", detail: "Knowledge-grounded AI" },
                            { skill: "SAFe AI Integration", detail: "AI in Agile workflows" },
                            { skill: "Multi-Agent Systems", detail: "Collaborative AI teams" },
                            { skill: "AI Security", detail: "Responsible AI practices" },
                            { skill: "MLOps", detail: "Production AI pipelines" },
                            { skill: "Enterprise Architecture", detail: "Scale AI across org" },
                        ].map((item, i) => (
                            <div key={i} className="p-4 rounded-lg bg-background border border-border/50 hover:border-primary/30 transition-colors">
                                <div className="flex items-center gap-2 mb-1">
                                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                    <span className="font-semibold text-sm">{item.skill}</span>
                                </div>
                                <p className="text-xs text-muted-foreground pl-6">{item.detail}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Professional Tracks */}
            <section className="py-16 px-4 border-t border-border bg-muted/20">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Choose Your Track</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Role-specific AI transformation for every professional
                        </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
                        <Link href="/ai-native">
                            <Card className="p-4 text-center hover:border-primary/50 transition-all cursor-pointer h-full border-primary">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center mx-auto mb-3">
                                    <Code className="h-6 w-6" />
                                </div>
                                <h3 className="font-semibold text-sm">Developers</h3>
                                <Badge className="mt-2 text-xs">Current</Badge>
                            </Card>
                        </Link>
                        <Link href="/ai-native/product-managers">
                            <Card className="p-4 text-center hover:border-primary/50 transition-all cursor-pointer h-full">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-500/10 flex items-center justify-center mx-auto mb-3">
                                    <span className="text-2xl">📊</span>
                                </div>
                                <h3 className="font-semibold text-sm">Product Managers</h3>
                            </Card>
                        </Link>
                        <Link href="/ai-native/business-analysts">
                            <Card className="p-4 text-center hover:border-primary/50 transition-all cursor-pointer h-full">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/10 flex items-center justify-center mx-auto mb-3">
                                    <span className="text-2xl">📈</span>
                                </div>
                                <h3 className="font-semibold text-sm">Business Analysts</h3>
                            </Card>
                        </Link>
                        <Link href="/ai-native/project-managers">
                            <Card className="p-4 text-center hover:border-primary/50 transition-all cursor-pointer h-full">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-500/10 flex items-center justify-center mx-auto mb-3">
                                    <span className="text-2xl">📋</span>
                                </div>
                                <h3 className="font-semibold text-sm">Project Managers</h3>
                            </Card>
                        </Link>
                        <Link href="/ai-native/everyone">
                            <Card className="p-4 text-center hover:border-primary/50 transition-all cursor-pointer h-full">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-500/10 flex items-center justify-center mx-auto mb-3">
                                    <span className="text-2xl">🌟</span>
                                </div>
                                <h3 className="font-semibold text-sm">AI for Everyone</h3>
                            </Card>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Certification Tracks */}
            <section className="py-16 px-4 bg-muted/30">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Developer Certification Tracks</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Progress through three certification levels to demonstrate your AI-native expertise
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {certificationTracks.map((track) => (
                            <CertificationCard key={track.id} track={track} />
                        ))}
                    </div>
                </div>
            </section>

            {/* All Modules */}
            <section id="curriculum" className="py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Complete Curriculum</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            8 comprehensive modules covering everything from AI fundamentals to enterprise architecture
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                        {aiNativeCurriculum.map((module) => (
                            <ModuleCard key={module.id} module={module} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Learning Journey */}
            <section className="py-16 px-4 border-t border-border">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-10">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-3">Your Learning Journey</h2>
                        <p className="text-muted-foreground">Progress from fundamentals to enterprise leadership</p>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        {[
                            { level: "Foundation", duration: "40-60h", icon: "🎓", color: "from-blue-500/20 to-blue-600/20" },
                            { level: "Professional", duration: "30-40h", icon: "🏆", color: "from-purple-500/20 to-purple-600/20" },
                            { level: "Architect", duration: "20-30h", icon: "⚡", color: "from-amber-500/20 to-amber-600/20" },
                        ].map((step, i) => (
                            <div key={i} className="flex items-center gap-3 w-full md:w-auto">
                                <div className={`flex-1 md:flex-initial p-4 rounded-xl bg-gradient-to-br ${step.color} border border-border/50 text-center`}>
                                    <div className="text-2xl mb-1">{step.icon}</div>
                                    <div className="font-semibold">{step.level}</div>
                                    <div className="text-xs text-muted-foreground">{step.duration}</div>
                                </div>
                                {i < 2 && (
                                    <ChevronRight className="h-5 w-5 text-muted-foreground hidden md:block" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 bg-gradient-to-br from-primary/10 to-purple-500/10">
                <div className="max-w-4xl mx-auto text-center">
                    <Brain className="h-16 w-16 mx-auto mb-6 text-primary" />
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Ready to Become AI-Native?
                    </h2>
                    <p className="text-lg text-muted-foreground mb-6">
                        Join thousands of professionals transforming their careers with AI-native skills
                    </p>

                    {/* Social Proof */}
                    <div className="flex flex-wrap justify-center gap-8 mb-8">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-primary">2,500+</div>
                            <div className="text-sm text-muted-foreground">Professionals Enrolled</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold">4.9/5</div>
                            <div className="text-sm text-muted-foreground">Average Rating</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-emerald-500">94%</div>
                            <div className="text-sm text-muted-foreground">Completion Rate</div>
                        </div>
                    </div>

                    {/* Enterprise Benefits */}
                    <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> Enterprise SSO</span>
                        <span className="flex items-center gap-1"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> Team Analytics</span>
                        <span className="flex items-center gap-1"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> Custom Learning Paths</span>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <Link href="/ai-native/sample-lesson">
                            <Button size="lg" className="gap-2">
                                <Zap className="h-5 w-5" />
                                Start Free Trial
                            </Button>
                        </Link>
                        <Link href="/signup">
                            <Button size="lg" variant="outline" className="gap-2">
                                Talk to Sales
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Newsletter Signup */}
            <section className="py-12 px-4 border-t border-border bg-muted/30">
                <div className="max-w-xl mx-auto text-center">
                    <h3 className="text-lg font-semibold mb-2">Stay Updated</h3>
                    <p className="text-sm text-muted-foreground mb-4">Get notified when new modules and certifications launch</p>
                    <div className="flex gap-2 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-4 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                        <Button>Subscribe</Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">No spam. Unsubscribe anytime.</p>
                </div>
            </section>
        </div>
    );
}
