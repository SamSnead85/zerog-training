"use client";

import Link from "next/link";
import { Card, Badge, Button, Progress } from "@/components/ui";
import {
    BookOpen,
    Clock,
    Award,
    ArrowRight,
    GraduationCap,
    CheckCircle2,
    Users,
    Star,
} from "lucide-react";
import { cn } from "@/lib/utils";

const certificationTracks = [
    {
        id: "native-practitioner",
        title: "NATIVE Certified Practitioner",
        description: "Master the NATIVE framework for AI-native software delivery. Complete 5 courses and pass the certification exam to earn your credential.",
        courses: [
            { id: "native-framework", title: "NATIVE Framework Foundations", duration: "4 hrs", required: true },
            { id: "human-ai-collaboration", title: "Human-AI Collaboration", duration: "4 hrs", required: true },
            { id: "prompt-engineering", title: "Prompt Engineering Mastery", duration: "6 hrs", required: true },
            { id: "agentic-workflows", title: "Agentic Workflow Design", duration: "5 hrs", required: true },
            { id: "ai-testing", title: "AI Testing & Validation", duration: "4 hrs", required: true },
        ],
        totalDuration: "23 hours",
        price: 399,
        originalPrice: 495,
        students: 4200,
        rating: 4.9,
        gradient: "from-cyan-500/20 to-blue-500/20",
        badge: "Most Popular",
    },
    {
        id: "ai-engineer",
        title: "AI Engineering Professional",
        description: "Comprehensive training in designing, building, and deploying AI systems at scale. Perfect for developers and architects.",
        courses: [
            { id: "agentic-ai-systems", title: "Agentic AI Systems", duration: "8 hrs", required: true },
            { id: "prompt-engineering", title: "Prompt Engineering Mastery", duration: "6 hrs", required: true },
            { id: "ai-architecture", title: "AI Architecture Patterns", duration: "6 hrs", required: true },
            { id: "ai-security", title: "AI Security Fundamentals", duration: "5 hrs", required: true },
            { id: "ai-ops", title: "AI Operations & MLOps", duration: "5 hrs", required: true },
            { id: "ai-ethics", title: "AI Ethics & Governance", duration: "3 hrs", required: true },
        ],
        totalDuration: "33 hours",
        price: 499,
        originalPrice: 594,
        students: 2800,
        rating: 4.8,
        gradient: "from-purple-500/20 to-pink-500/20",
    },
    {
        id: "prompt-specialist",
        title: "Prompt Engineering Specialist",
        description: "Deep dive into prompt engineering for LLMs. Learn advanced techniques for crafting effective prompts.",
        courses: [
            { id: "prompt-engineering", title: "Prompt Engineering Mastery", duration: "6 hrs", required: true },
            { id: "advanced-prompting", title: "Advanced Prompting Techniques", duration: "5 hrs", required: true },
            { id: "prompt-optimization", title: "Prompt Optimization & Testing", duration: "4 hrs", required: true },
        ],
        totalDuration: "15 hours",
        price: 249,
        originalPrice: 297,
        students: 3500,
        rating: 4.7,
        gradient: "from-amber-500/20 to-orange-500/20",
    },
    {
        id: "ai-leader",
        title: "AI Transformation Leader",
        description: "Strategic leadership training for executives driving AI transformation in their organizations.",
        courses: [
            { id: "native-framework", title: "NATIVE Framework Foundations", duration: "4 hrs", required: true },
            { id: "leadership-ai", title: "AI Leadership for Executives", duration: "3 hrs", required: true },
            { id: "ai-strategy", title: "AI Strategy & Roadmapping", duration: "4 hrs", required: true },
            { id: "change-management", title: "AI Change Management", duration: "3 hrs", required: true },
        ],
        totalDuration: "14 hours",
        price: 349,
        originalPrice: 396,
        students: 1800,
        rating: 4.9,
        gradient: "from-emerald-500/20 to-teal-500/20",
    },
];

export default function TracksPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-12">
                <Badge className="mb-4 bg-amber-500/10 text-amber-500 border-amber-500/20">
                    <Award className="h-3 w-3 mr-1" />
                    Industry Recognized
                </Badge>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                    Certification Tracks
                </h1>
                <p className="text-lg text-muted-foreground">
                    Complete a structured learning path and earn a professional certification
                    that validates your expertise in AI-native technologies.
                </p>
            </div>

            {/* Benefits */}
            <div className="grid md:grid-cols-4 gap-4 mb-12">
                {[
                    { icon: GraduationCap, title: "Official Certificate", desc: "Signed digital credential" },
                    { icon: Award, title: "LinkedIn Badge", desc: "Share your achievement" },
                    { icon: Users, title: "Alumni Network", desc: "Connect with peers" },
                    { icon: CheckCircle2, title: "Lifetime Access", desc: "All course materials" },
                ].map((item, i) => (
                    <Card key={i} className="p-4 text-center">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-2">
                            <item.icon className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="font-medium text-sm">{item.title}</h3>
                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </Card>
                ))}
            </div>

            {/* Tracks */}
            <div className="space-y-6">
                {certificationTracks.map((track) => (
                    <Card
                        key={track.id}
                        className={cn(
                            "overflow-hidden bg-gradient-to-r",
                            track.gradient
                        )}
                    >
                        <div className="p-6 md:p-8">
                            <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                                {/* Left: Info */}
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-3">
                                        {track.badge && (
                                            <Badge className="bg-primary text-primary-foreground">
                                                {track.badge}
                                            </Badge>
                                        )}
                                        <div className="flex items-center gap-1 text-sm">
                                            <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                                            <span className="font-medium">{track.rating}</span>
                                            <span className="text-muted-foreground">({track.students.toLocaleString()} enrolled)</span>
                                        </div>
                                    </div>

                                    <h2 className="text-2xl font-bold mb-2">{track.title}</h2>
                                    <p className="text-muted-foreground mb-4">{track.description}</p>

                                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                                        <span className="flex items-center gap-1">
                                            <BookOpen className="h-4 w-4" />
                                            {track.courses.length} courses
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock className="h-4 w-4" />
                                            {track.totalDuration}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Award className="h-4 w-4" />
                                            Certification exam
                                        </span>
                                    </div>

                                    {/* Course List */}
                                    <div className="grid md:grid-cols-2 gap-2">
                                        {track.courses.map((course, idx) => (
                                            <div
                                                key={course.id}
                                                className="flex items-center gap-2 p-2 rounded-lg bg-background/50"
                                            >
                                                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">
                                                    {idx + 1}
                                                </div>
                                                <span className="text-sm flex-1">{course.title}</span>
                                                <span className="text-xs text-muted-foreground">{course.duration}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Right: Pricing */}
                                <div className="lg:w-64 flex-shrink-0">
                                    <Card className="p-6 bg-background">
                                        <div className="text-center mb-4">
                                            <div className="flex items-center justify-center gap-2 mb-1">
                                                <span className="text-3xl font-bold">${track.price}</span>
                                                <span className="text-lg text-muted-foreground line-through">${track.originalPrice}</span>
                                            </div>
                                            <Badge variant="outline" className="text-emerald-500 border-emerald-500/30">
                                                Save ${track.originalPrice - track.price}
                                            </Badge>
                                        </div>

                                        <Link href={`/learn/tracks/${track.id}`}>
                                            <Button className="w-full gap-2 mb-3">
                                                <GraduationCap className="h-4 w-4" />
                                                Get Certified
                                            </Button>
                                        </Link>

                                        <div className="space-y-2 text-xs text-muted-foreground">
                                            <div className="flex items-center gap-2">
                                                <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                                                All {track.courses.length} courses included
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                                                Certification exam included
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                                                30-day money-back guarantee
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* CTA */}
            <div className="text-center mt-12 py-12 border-t border-border">
                <h2 className="text-2xl font-bold mb-4">Not sure which track is right for you?</h2>
                <p className="text-muted-foreground mb-6">
                    Take our quick assessment to get a personalized recommendation
                </p>
                <Link href="/learn/quiz">
                    <Button variant="outline" size="lg" className="gap-2">
                        Take Skills Assessment
                        <ArrowRight className="h-4 w-4" />
                    </Button>
                </Link>
            </div>
        </div>
    );
}
