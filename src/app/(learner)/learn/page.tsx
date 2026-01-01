"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge, Card, Button, Progress } from "@/components/ui";
import {
    BookOpen,
    Clock,
    Star,
    Users,
    Award,
    ArrowRight,
    Sparkles,
    GraduationCap,
    Shield,
    Brain,
    CheckCircle2,
    Play,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Course data with pricing
const featuredCourses = [
    {
        id: "native-framework",
        title: "NATIVE Framework Foundations",
        description: "Master AI-native software delivery with the NATIVE operating model. The foundation for all certifications.",
        category: "Agentic Agile SDLC",
        duration: "4 hours",
        lessons: 20,
        rating: 4.9,
        students: 12500,
        price: 99,
        image: "/images/training/network-security.png",
        isFeatured: true,
        isNew: true,
    },
    {
        id: "prompt-engineering",
        title: "Prompt Engineering Mastery",
        description: "Advanced techniques for crafting effective AI prompts. From basics to chain-of-thought reasoning.",
        category: "AI & Technology",
        duration: "6 hours",
        lessons: 24,
        rating: 4.8,
        students: 8900,
        price: 149,
        image: "/images/training/cybersecurity-hero.png",
        isFeatured: true,
    },
    {
        id: "human-ai-collaboration",
        title: "Human-AI Collaboration",
        description: "Build effective partnerships between humans and AI agents. Essential for modern teams.",
        category: "Agentic Agile SDLC",
        duration: "4 hours",
        lessons: 18,
        rating: 4.7,
        students: 6200,
        price: 99,
        image: "/images/training/data-protection.png",
    },
    {
        id: "agentic-ai-systems",
        title: "Agentic AI Systems",
        description: "Design and build autonomous AI workflows that execute complex tasks independently.",
        category: "AI & Technology",
        duration: "8 hours",
        lessons: 32,
        rating: 4.9,
        students: 4500,
        price: 199,
        image: "/images/training/security-visual.png",
        isNew: true,
    },
];

// Certification tracks
const certificationTracks = [
    {
        id: "native-practitioner",
        title: "NATIVE Certified Practitioner",
        description: "Complete certification in AI-native software delivery",
        courses: 5,
        duration: "20 hours",
        price: 399,
        originalPrice: 495,
        badge: "Most Popular",
        color: "from-cyan-500/20 to-blue-500/20",
    },
    {
        id: "ai-engineer",
        title: "AI Engineering Professional",
        description: "Master AI systems design and implementation",
        courses: 6,
        duration: "32 hours",
        price: 499,
        originalPrice: 594,
        color: "from-purple-500/20 to-pink-500/20",
    },
    {
        id: "prompt-specialist",
        title: "Prompt Engineering Specialist",
        description: "Advanced prompt design and optimization",
        courses: 3,
        duration: "14 hours",
        price: 249,
        originalPrice: 297,
        color: "from-amber-500/20 to-orange-500/20",
    },
];

export default function LearnLandingPage() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative overflow-hidden py-20 lg:py-28">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/50 via-background to-background" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(14,165,233,0.15),transparent_50%)]" />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto">
                        <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                            <Sparkles className="h-3 w-3 mr-1" />
                            AI-Native Training Platform
                        </Badge>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                            Master the Future of
                            <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                                Software Delivery
                            </span>
                        </h1>
                        <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
                            Learn AI-native development, prompt engineering, and human-AI collaboration
                            from industry experts. Get certified and advance your career.
                        </p>
                        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link href="/learn/courses">
                                <Button size="lg" className="gap-2 px-8">
                                    Browse Courses
                                    <ArrowRight className="h-4 w-4" />
                                </Button>
                            </Link>
                            <Link href="/learn/tracks">
                                <Button variant="outline" size="lg" className="gap-2 px-8">
                                    <GraduationCap className="h-4 w-4" />
                                    Get Certified
                                </Button>
                            </Link>
                        </div>

                        {/* Trust indicators */}
                        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <Users className="h-4 w-4 text-cyan-400" />
                                <span>50,000+ Learners</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Star className="h-4 w-4 text-amber-400" />
                                <span>4.9 Average Rating</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Award className="h-4 w-4 text-emerald-400" />
                                <span>Industry Recognized</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Courses */}
            <section className="py-16 bg-muted/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold">Featured Courses</h2>
                            <p className="text-muted-foreground mt-1">Start learning with our most popular courses</p>
                        </div>
                        <Link href="/learn/courses">
                            <Button variant="ghost" className="gap-2">
                                View All <ArrowRight className="h-4 w-4" />
                            </Button>
                        </Link>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {featuredCourses.map((course) => (
                            <Link key={course.id} href={`/learn/courses/${course.id}`}>
                                <Card className="group overflow-hidden h-full hover:border-primary/50 transition-all duration-300">
                                    {/* Image */}
                                    <div className="relative h-40 overflow-hidden">
                                        <img
                                            src={course.image}
                                            alt={course.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                        <div className="absolute top-3 left-3 flex gap-2">
                                            {course.isNew && (
                                                <Badge className="bg-emerald-500 text-white text-xs">New</Badge>
                                            )}
                                            {course.isFeatured && (
                                                <Badge className="bg-amber-500 text-white text-xs">Featured</Badge>
                                            )}
                                        </div>
                                        <div className="absolute bottom-3 right-3">
                                            <div className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all">
                                                <Play className="h-4 w-4 text-white ml-0.5" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-4">
                                        <Badge variant="outline" className="mb-2 text-xs">
                                            {course.category}
                                        </Badge>
                                        <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                                            {course.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                                            {course.description}
                                        </p>

                                        <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
                                            <span className="flex items-center gap-1">
                                                <Clock className="h-3 w-3" /> {course.duration}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <BookOpen className="h-3 w-3" /> {course.lessons} lessons
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
                                            <div className="flex items-center gap-1">
                                                <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                                                <span className="font-medium">{course.rating}</span>
                                                <span className="text-xs text-muted-foreground">({course.students.toLocaleString()})</span>
                                            </div>
                                            <span className="font-bold text-lg">${course.price}</span>
                                        </div>
                                    </div>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Certification Tracks */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold">Certification Tracks</h2>
                        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
                            Complete a track to earn an industry-recognized certification and badge
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {certificationTracks.map((track) => (
                            <Link key={track.id} href={`/learn/tracks/${track.id}`}>
                                <Card className={cn(
                                    "p-6 h-full hover:border-primary/50 transition-all duration-300 bg-gradient-to-br",
                                    track.color
                                )}>
                                    {track.badge && (
                                        <Badge className="mb-4 bg-primary text-primary-foreground">
                                            {track.badge}
                                        </Badge>
                                    )}
                                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                                        <GraduationCap className="h-6 w-6 text-primary" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">{track.title}</h3>
                                    <p className="text-muted-foreground text-sm mb-4">{track.description}</p>

                                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                                        <span className="flex items-center gap-1">
                                            <BookOpen className="h-4 w-4" /> {track.courses} courses
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock className="h-4 w-4" /> {track.duration}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <span className="text-2xl font-bold">${track.price}</span>
                                        <span className="text-sm text-muted-foreground line-through">${track.originalPrice}</span>
                                        <Badge variant="outline" className="text-emerald-500 border-emerald-500/30">
                                            Save ${track.originalPrice - track.price}
                                        </Badge>
                                    </div>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-16 bg-muted/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold">Why Learn With ScaledNative</h2>
                    </div>

                    <div className="grid md:grid-cols-4 gap-6">
                        {[
                            { icon: Brain, title: "Expert Instructors", desc: "Learn from industry practitioners" },
                            { icon: Shield, title: "Lifetime Access", desc: "Buy once, access forever" },
                            { icon: Award, title: "Certification", desc: "Earn recognized credentials" },
                            { icon: CheckCircle2, title: "Hands-On Labs", desc: "Practice with real projects" },
                        ].map((item, i) => (
                            <Card key={i} className="p-6 text-center">
                                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                                    <item.icon className="h-6 w-6 text-primary" />
                                </div>
                                <h3 className="font-semibold mb-1">{item.title}</h3>
                                <p className="text-sm text-muted-foreground">{item.desc}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Ready to Start Learning?
                    </h2>
                    <p className="text-lg text-muted-foreground mb-8">
                        Join 50,000+ professionals advancing their careers with AI-native skills
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/learn/signup">
                            <Button size="lg" className="gap-2 px-8">
                                Create Free Account
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </Link>
                        <Link href="/learn/courses">
                            <Button variant="outline" size="lg" className="px-8">
                                Browse Courses
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
