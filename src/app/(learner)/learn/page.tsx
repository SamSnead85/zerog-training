"use client";

import Link from "next/link";
import { Card, Button } from "@/components/ui";
import {
    BookOpen,
    Clock,
    Star,
    Users,
    Award,
    ArrowRight,
    GraduationCap,
    Shield,
    Brain,
    CheckCircle2,
} from "lucide-react";

// Course data with pricing
const featuredCourses = [
    {
        id: "native-framework",
        title: "NATIVE Framework Foundations",
        description: "Master AI-native software delivery with the NATIVE operating model. The foundation for all certifications.",
        category: "Software Delivery",
        duration: "4 hours",
        lessons: 20,
        rating: 4.9,
        students: 12500,
        price: 99,
        image: "/images/training/network-security.png",
    },
    {
        id: "prompt-engineering",
        title: "Prompt Engineering Mastery",
        description: "Advanced techniques for crafting effective AI prompts. From basics to chain-of-thought reasoning.",
        category: "Technical Skills",
        duration: "6 hours",
        lessons: 24,
        rating: 4.8,
        students: 8900,
        price: 149,
        image: "/images/training/cybersecurity-hero.png",
    },
    {
        id: "human-ai-collaboration",
        title: "Human-AI Collaboration",
        description: "Build effective partnerships between humans and AI agents. Essential for modern teams.",
        category: "Leadership",
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
        category: "Technical Skills",
        duration: "8 hours",
        lessons: 32,
        rating: 4.9,
        students: 4500,
        price: 199,
        image: "/images/training/security-visual.png",
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
    },
    {
        id: "ai-engineer",
        title: "AI Engineering Professional",
        description: "Master AI systems design and implementation",
        courses: 6,
        duration: "32 hours",
        price: 499,
        originalPrice: 594,
    },
    {
        id: "prompt-specialist",
        title: "Prompt Engineering Specialist",
        description: "Advanced prompt design and optimization",
        courses: 3,
        duration: "14 hours",
        price: 249,
        originalPrice: 297,
    },
];

export default function LearnLandingPage() {
    return (
        <div className="min-h-screen">
            {/* Hero Section - Premium Design */}
            <section className="relative overflow-hidden py-24 lg:py-32">
                {/* Sophisticated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-background to-background" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(14,165,233,0.08),transparent_50%)]" />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />

                <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-4xl mx-auto">
                        {/* Subtle eyebrow text */}
                        <p className="text-sm font-medium text-cyan-400/80 tracking-widest uppercase mb-6">
                            Professional Development
                        </p>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                            Advance Your Career in
                            <span className="block mt-2 bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent">
                                Modern Software Delivery
                            </span>
                        </h1>

                        <p className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                            Industry-leading courses in AI-augmented development, prompt engineering,
                            and human-machine collaboration. Earn recognized certifications that matter.
                        </p>

                        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link href="/learn/courses">
                                <Button size="lg" className="px-8 h-12 text-base font-medium">
                                    Explore Courses
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                            <Link href="/learn/tracks">
                                <Button variant="outline" size="lg" className="px-8 h-12 text-base font-medium border-white/20 hover:bg-white/5">
                                    View Certifications
                                </Button>
                            </Link>
                        </div>

                        {/* Trust indicators - understated */}
                        <div className="mt-16 pt-8 border-t border-white/5">
                            <div className="flex flex-wrap items-center justify-center gap-12 text-sm text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <Users className="h-4 w-4 text-cyan-400/60" />
                                    <span>50,000+ Professionals</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Star className="h-4 w-4 text-cyan-400/60" />
                                    <span>4.9 Course Rating</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Award className="h-4 w-4 text-cyan-400/60" />
                                    <span>Industry Recognized</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Courses */}
            <section className="py-20 bg-muted/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-end justify-between mb-10">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-semibold">Featured Courses</h2>
                            <p className="text-muted-foreground mt-2">Start with our most impactful programs</p>
                        </div>
                        <Link href="/learn/courses">
                            <Button variant="ghost" className="gap-2 text-muted-foreground hover:text-foreground">
                                View All <ArrowRight className="h-4 w-4" />
                            </Button>
                        </Link>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {featuredCourses.map((course) => (
                            <Link key={course.id} href={`/learn/courses/${course.id}`}>
                                <Card className="group overflow-hidden h-full border-white/5 hover:border-white/15 transition-all duration-300">
                                    {/* Image */}
                                    <div className="relative h-36 overflow-hidden">
                                        <img
                                            src={course.image}
                                            alt={course.title}
                                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                    </div>

                                    {/* Content */}
                                    <div className="p-5">
                                        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
                                            {course.category}
                                        </p>
                                        <h3 className="font-semibold text-base line-clamp-2 group-hover:text-cyan-400 transition-colors">
                                            {course.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                                            {course.description}
                                        </p>

                                        <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
                                            <span className="flex items-center gap-1.5">
                                                <Clock className="h-3.5 w-3.5" /> {course.duration}
                                            </span>
                                            <span className="flex items-center gap-1.5">
                                                <BookOpen className="h-3.5 w-3.5" /> {course.lessons} lessons
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/5">
                                            <div className="flex items-center gap-1.5 text-sm">
                                                <Star className="h-4 w-4 text-cyan-400" />
                                                <span className="font-medium">{course.rating}</span>
                                                <span className="text-muted-foreground">({course.students.toLocaleString()})</span>
                                            </div>
                                            <span className="font-semibold text-lg">${course.price}</span>
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
                                <Card className="p-6 h-full border-white/5 hover:border-white/15 transition-all duration-300">
                                    <div className="h-10 w-10 rounded-lg bg-cyan-400/10 flex items-center justify-center mb-5">
                                        <GraduationCap className="h-5 w-5 text-cyan-400" />
                                    </div>
                                    <h3 className="text-lg font-semibold mb-2">{track.title}</h3>
                                    <p className="text-muted-foreground text-sm mb-5">{track.description}</p>

                                    <div className="flex items-center gap-5 text-sm text-muted-foreground mb-5">
                                        <span className="flex items-center gap-1.5">
                                            <BookOpen className="h-4 w-4" /> {track.courses} courses
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <Clock className="h-4 w-4" /> {track.duration}
                                        </span>
                                    </div>

                                    <div className="flex items-baseline gap-2 pt-4 border-t border-white/5">
                                        <span className="text-2xl font-semibold">${track.price}</span>
                                        <span className="text-sm text-muted-foreground line-through">${track.originalPrice}</span>
                                    </div>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why ScaledNative */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl md:text-3xl font-semibold">Why ScaledNative</h2>
                    </div>

                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            { icon: Brain, title: "Expert-Led Content", desc: "Learn from industry practitioners" },
                            { icon: Shield, title: "Lifetime Access", desc: "Purchase once, learn forever" },
                            { icon: Award, title: "Certification", desc: "Earn credentials that matter" },
                            { icon: CheckCircle2, title: "Hands-On Practice", desc: "Real projects, real skills" },
                        ].map((item, i) => (
                            <div key={i} className="text-center">
                                <div className="h-10 w-10 rounded-lg bg-cyan-400/10 flex items-center justify-center mx-auto mb-4">
                                    <item.icon className="h-5 w-5 text-cyan-400" />
                                </div>
                                <h3 className="font-medium mb-1">{item.title}</h3>
                                <p className="text-sm text-muted-foreground">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 border-t border-white/5">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                        Ready to advance your career?
                    </h2>
                    <p className="text-muted-foreground mb-8">
                        Join 50,000+ professionals developing in-demand skills
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/learn/signup">
                            <Button size="lg" className="px-8 h-12">
                                Create Free Account
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                        <Link href="/learn/courses">
                            <Button variant="outline" size="lg" className="px-8 h-12 border-white/20 hover:bg-white/5">
                                Browse Courses
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
