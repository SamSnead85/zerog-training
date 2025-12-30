"use client";

import Link from "next/link";
import { everyoneTrack } from "@/lib/curriculum/professional-tracks";
import { Card, Button, Badge } from "@/components/ui";
import {
    Clock,
    BookOpen,
    ChevronRight,
    CheckCircle2,
    Target,
    Play,
    ArrowRight,
    Sparkles,
    Users,
    Award,
    Zap
} from "lucide-react";

const track = everyoneTrack;

export default function EveryonePage() {
    return (
        <div className="min-h-screen bg-background">
            {/* Hero */}
            <section className="relative overflow-hidden py-20 px-4">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-background" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent opacity-50" />

                <div className="relative max-w-6xl mx-auto">
                    <div className="flex items-center gap-2 mb-6">
                        <Link href="/ai-native" className="text-sm text-muted-foreground hover:text-primary">
                            AI-Native Training
                        </Link>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">AI for Everyone</span>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-12 items-center">
                        <div className="flex-1">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
                                <Users className="h-4 w-4 text-blue-500" />
                                <span className="text-sm font-medium text-blue-500">Foundation Track</span>
                            </div>

                            <h1 className="text-4xl md:text-5xl font-bold mb-6">
                                {track.headline}
                            </h1>

                            <p className="text-lg text-muted-foreground mb-6">
                                {track.description}
                            </p>

                            <div className="flex items-center gap-6 mb-8 text-sm">
                                <span className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                    {track.totalDuration}
                                </span>
                                <span className="flex items-center gap-2">
                                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                                    {track.modules.length} Modules
                                </span>
                                <span className="flex items-center gap-2">
                                    <Award className="h-4 w-4 text-muted-foreground" />
                                    {track.certificationCode} Certification
                                </span>
                            </div>

                            <div className="flex gap-4">
                                <Link href="/training/module-1">
                                    <Button size="lg" className="gap-2">
                                        <Play className="h-5 w-5" />
                                        Start Learning
                                    </Button>
                                </Link>
                                <Link href="#modules">
                                    <Button size="lg" variant="outline" className="gap-2">
                                        View Curriculum
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        <div className="w-full lg:w-80">
                            <Card className="p-6 border-blue-500/20">
                                <div className="text-4xl mb-4">{track.icon}</div>
                                <h3 className="font-bold mb-2">{track.certification}</h3>
                                <p className="text-sm text-muted-foreground mb-4">
                                    Essential AI literacy for every professional
                                </p>
                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center gap-2">
                                        <CheckCircle2 className="h-4 w-4 text-blue-500" />
                                        <span>No Technical Background Required</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle2 className="h-4 w-4 text-blue-500" />
                                        <span>{track.modules.length} Practical Modules</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle2 className="h-4 w-4 text-blue-500" />
                                        <span>Hands-On AI Tool Practice</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle2 className="h-4 w-4 text-blue-500" />
                                        <span>Digital Badge ({track.certificationCode})</span>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* Who Is This For */}
            <section className="py-16 px-4 border-t border-border">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-2xl font-bold text-center mb-8">Perfect For Every Role</h2>
                    <div className="grid md:grid-cols-4 gap-4">
                        {[
                            { role: "Sales Teams", benefit: "Create proposals and analyze markets faster" },
                            { role: "HR Professionals", benefit: "Streamline recruiting and onboarding" },
                            { role: "Marketing", benefit: "Generate content and analyze campaigns" },
                            { role: "Finance", benefit: "Automate reports and data analysis" },
                        ].map((item, i) => (
                            <Card key={i} className="p-4 text-center">
                                <h3 className="font-semibold mb-2">{item.role}</h3>
                                <p className="text-sm text-muted-foreground">{item.benefit}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Modules */}
            <section id="modules" className="py-16 px-4 bg-muted/30">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold mb-4">Curriculum</h2>
                    <p className="text-muted-foreground mb-8">
                        {track.modules.length} beginner-friendly modules to get you productive with AI
                    </p>

                    <div className="space-y-4">
                        {track.modules.map((module) => (
                            <Card key={module.id} className="p-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-lg font-bold text-blue-500">
                                        {module.number}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <Badge variant="outline" className="text-xs">
                                                <Clock className="h-3 w-3 mr-1" />
                                                {module.duration}
                                            </Badge>
                                            <Badge className="text-xs bg-blue-500/20 text-blue-500">
                                                Beginner
                                            </Badge>
                                        </div>
                                        <h3 className="font-bold text-lg mb-1">{module.title}</h3>
                                        <p className="text-sm text-muted-foreground mb-3">{module.subtitle}</p>
                                        <p className="text-sm text-muted-foreground">{module.description}</p>

                                        <div className="mt-4 flex flex-wrap gap-2">
                                            {module.topics.map((topic) => (
                                                <Badge key={topic.id} variant="secondary" className="text-xs">
                                                    {topic.title}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Capstone */}
            <section className="py-16 px-4">
                <div className="max-w-4xl mx-auto">
                    <Card className="p-8 border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-transparent">
                        <div className="flex items-center gap-2 mb-4">
                            <Target className="h-6 w-6 text-blue-500" />
                            <h2 className="text-2xl font-bold">Capstone Project</h2>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">{track.capstoneProject.title}</h3>
                        <p className="text-muted-foreground mb-6">{track.capstoneProject.description}</p>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h4 className="font-semibold mb-3">Objectives</h4>
                                <ul className="space-y-2">
                                    {track.capstoneProject.objectives.map((obj, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm">
                                            <CheckCircle2 className="h-4 w-4 text-blue-500 mt-0.5" />
                                            <span>{obj}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-3">Deliverables</h4>
                                <ul className="space-y-2">
                                    {track.capstoneProject.deliverables.map((del, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm">
                                            <ArrowRight className="h-4 w-4 text-blue-500 mt-0.5" />
                                            <span>{del}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </Card>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 px-4 bg-blue-500/10">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-4">Ready to Master AI?</h2>
                    <p className="text-muted-foreground mb-8">
                        Start your AI journey today - no technical background required
                    </p>
                    <Link href="/training/module-1">
                        <Button size="lg" className="gap-2">
                            <Zap className="h-5 w-5" />
                            Start Free Trial
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
}
