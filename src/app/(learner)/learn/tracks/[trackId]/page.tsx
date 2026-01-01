"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Card, Badge, Button, Progress } from "@/components/ui";
import {
    BookOpen,
    Clock,
    Award,
    ArrowRight,
    GraduationCap,
    CheckCircle2,
    Play,
    Lock,
    FileText,
    Star,
    ChevronLeft,
    Users,
    Calendar,
    Target,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Certification track data - would typically come from a database
const certificationTracks: Record<string, {
    id: string;
    title: string;
    description: string;
    longDescription: string;
    courses: Array<{
        id: string;
        title: string;
        duration: string;
        lessons: number;
        required: boolean;
    }>;
    totalDuration: string;
    price: number;
    originalPrice: number;
    students: number;
    rating: number;
    gradient: string;
    badge?: string;
    examDetails: {
        questions: number;
        duration: string;
        passingScore: number;
        attempts: number;
    };
    learningOutcomes: string[];
    requirements: string[];
}> = {
    "native-practitioner": {
        id: "native-practitioner",
        title: "NATIVE Certified Practitioner",
        description: "Master the NATIVE framework for AI-native software delivery.",
        longDescription: "This comprehensive certification program teaches you to apply the NATIVE (Neural-Augmented Teams for Intelligent Value Engineering) framework in real-world software projects. You'll learn to seamlessly integrate AI assistants into your development workflow, optimize human-AI collaboration, and deliver measurable productivity gains.",
        courses: [
            { id: "native-framework", title: "NATIVE Framework Foundations", duration: "4 hrs", lessons: 12, required: true },
            { id: "human-ai-collaboration", title: "Human-AI Collaboration", duration: "4 hrs", lessons: 10, required: true },
            { id: "prompt-engineering", title: "Prompt Engineering Mastery", duration: "6 hrs", lessons: 18, required: true },
            { id: "agentic-workflows", title: "Agentic Workflow Design", duration: "5 hrs", lessons: 14, required: true },
            { id: "ai-testing", title: "AI Testing & Validation", duration: "4 hrs", lessons: 11, required: true },
        ],
        totalDuration: "23 hours",
        price: 399,
        originalPrice: 495,
        students: 4200,
        rating: 4.9,
        gradient: "from-cyan-500/20 to-blue-500/20",
        badge: "Most Popular",
        examDetails: {
            questions: 50,
            duration: "90 minutes",
            passingScore: 75,
            attempts: 3,
        },
        learningOutcomes: [
            "Apply the NATIVE framework to transform software delivery",
            "Design effective human-AI collaboration patterns",
            "Write production-grade prompts for any LLM",
            "Build and deploy agentic workflows",
            "Validate AI outputs with systematic testing",
        ],
        requirements: [
            "2+ years of software development experience",
            "Basic understanding of AI/ML concepts",
            "Familiarity with at least one programming language",
        ],
    },
    "ai-engineer": {
        id: "ai-engineer",
        title: "AI Engineering Professional",
        description: "Comprehensive training in designing, building, and deploying AI systems at scale.",
        longDescription: "The AI Engineering Professional certification prepares you to architect and implement enterprise-grade AI systems. From agentic architectures to MLOps pipelines, you'll gain the skills to lead AI initiatives in any organization.",
        courses: [
            { id: "agentic-ai-systems", title: "Agentic AI Systems", duration: "8 hrs", lessons: 22, required: true },
            { id: "prompt-engineering", title: "Prompt Engineering Mastery", duration: "6 hrs", lessons: 18, required: true },
            { id: "ai-architecture", title: "AI Architecture Patterns", duration: "6 hrs", lessons: 16, required: true },
            { id: "ai-security", title: "AI Security Fundamentals", duration: "5 hrs", lessons: 14, required: true },
            { id: "ai-ops", title: "AI Operations & MLOps", duration: "5 hrs", lessons: 13, required: true },
            { id: "ai-ethics", title: "AI Ethics & Governance", duration: "3 hrs", lessons: 8, required: true },
        ],
        totalDuration: "33 hours",
        price: 499,
        originalPrice: 594,
        students: 2800,
        rating: 4.8,
        gradient: "from-purple-500/20 to-pink-500/20",
        examDetails: {
            questions: 60,
            duration: "120 minutes",
            passingScore: 75,
            attempts: 3,
        },
        learningOutcomes: [
            "Design multi-agent AI systems for complex workflows",
            "Implement production RAG and agent architectures",
            "Deploy AI systems with proper security controls",
            "Build and operate MLOps pipelines",
            "Navigate ethical considerations in AI development",
        ],
        requirements: [
            "3+ years of software development experience",
            "Experience with Python or TypeScript",
            "Understanding of API design and cloud services",
        ],
    },
    "prompt-specialist": {
        id: "prompt-specialist",
        title: "Prompt Engineering Specialist",
        description: "Deep dive into prompt engineering for LLMs.",
        longDescription: "Become an expert in the art and science of prompt engineering. This focused certification covers advanced techniques for crafting prompts that reliably produce high-quality outputs across different LLM providers.",
        courses: [
            { id: "prompt-engineering", title: "Prompt Engineering Mastery", duration: "6 hrs", lessons: 18, required: true },
            { id: "advanced-prompting", title: "Advanced Prompting Techniques", duration: "5 hrs", lessons: 15, required: true },
            { id: "prompt-optimization", title: "Prompt Optimization & Testing", duration: "4 hrs", lessons: 12, required: true },
        ],
        totalDuration: "15 hours",
        price: 249,
        originalPrice: 297,
        students: 3500,
        rating: 4.7,
        gradient: "from-amber-500/20 to-orange-500/20",
        examDetails: {
            questions: 40,
            duration: "60 minutes",
            passingScore: 75,
            attempts: 3,
        },
        learningOutcomes: [
            "Write clear, effective prompts for any use case",
            "Apply Chain-of-Thought and ReAct patterns",
            "Optimize prompts for cost and quality",
            "Test and iterate on prompt designs systematically",
        ],
        requirements: [
            "Basic programming experience",
            "Familiarity with ChatGPT or similar tools",
        ],
    },
    "ai-leader": {
        id: "ai-leader",
        title: "AI Transformation Leader",
        description: "Strategic leadership training for executives driving AI transformation.",
        longDescription: "This executive-focused certification equips business leaders with the strategic frameworks and practical knowledge to lead AI transformation initiatives. Learn to build AI roadmaps, manage organizational change, and measure AI ROI.",
        courses: [
            { id: "native-framework", title: "NATIVE Framework Foundations", duration: "4 hrs", lessons: 12, required: true },
            { id: "leadership-ai", title: "AI Leadership for Executives", duration: "3 hrs", lessons: 9, required: true },
            { id: "ai-strategy", title: "AI Strategy & Roadmapping", duration: "4 hrs", lessons: 11, required: true },
            { id: "change-management", title: "AI Change Management", duration: "3 hrs", lessons: 8, required: true },
        ],
        totalDuration: "14 hours",
        price: 349,
        originalPrice: 396,
        students: 1800,
        rating: 4.9,
        gradient: "from-emerald-500/20 to-teal-500/20",
        examDetails: {
            questions: 40,
            duration: "60 minutes",
            passingScore: 75,
            attempts: 3,
        },
        learningOutcomes: [
            "Develop AI transformation strategies aligned with business goals",
            "Build and manage high-performing AI teams",
            "Create compelling AI roadmaps and business cases",
            "Lead organizational change for AI adoption",
        ],
        requirements: [
            "5+ years of professional experience",
            "Leadership or management experience",
            "Interest in AI transformation",
        ],
    },
};

export default function CertificationTrackPage() {
    const params = useParams();
    const trackId = params.trackId as string;
    const track = certificationTracks[trackId];

    if (!track) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-16 text-center">
                <h1 className="text-2xl font-bold mb-4">Track Not Found</h1>
                <p className="text-muted-foreground mb-6">
                    The certification track you're looking for doesn't exist.
                </p>
                <Link href="/learn/tracks">
                    <Button>View All Tracks</Button>
                </Link>
            </div>
        );
    }

    const totalLessons = track.courses.reduce((sum, c) => sum + c.lessons, 0);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Breadcrumb */}
            <Link
                href="/learn/tracks"
                className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6"
            >
                <ChevronLeft className="h-4 w-4" />
                Back to All Tracks
            </Link>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Header */}
                    <div className={cn("rounded-xl p-8 bg-gradient-to-r", track.gradient)}>
                        <div className="flex items-center gap-3 mb-4">
                            {track.badge && (
                                <Badge className="bg-primary text-primary-foreground">
                                    {track.badge}
                                </Badge>
                            )}
                            <div className="flex items-center gap-1 text-sm">
                                <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                                <span className="font-medium">{track.rating}</span>
                                <span className="text-muted-foreground">
                                    ({track.students.toLocaleString()} enrolled)
                                </span>
                            </div>
                        </div>

                        <h1 className="text-3xl md:text-4xl font-bold mb-4">{track.title}</h1>
                        <p className="text-lg text-muted-foreground">{track.longDescription}</p>

                        <div className="flex flex-wrap items-center gap-6 mt-6 text-sm">
                            <span className="flex items-center gap-2">
                                <BookOpen className="h-4 w-4" />
                                {track.courses.length} courses • {totalLessons} lessons
                            </span>
                            <span className="flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                {track.totalDuration}
                            </span>
                            <span className="flex items-center gap-2">
                                <Award className="h-4 w-4" />
                                Certification included
                            </span>
                        </div>
                    </div>

                    {/* Learning Outcomes */}
                    <Card className="p-6">
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <Target className="h-5 w-5 text-primary" />
                            What You'll Learn
                        </h2>
                        <div className="grid md:grid-cols-2 gap-3">
                            {track.learningOutcomes.map((outcome, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                                    <span className="text-sm">{outcome}</span>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Curriculum */}
                    <div>
                        <h2 className="text-xl font-bold mb-4">Curriculum</h2>
                        <div className="space-y-3">
                            {track.courses.map((course, idx) => (
                                <Card
                                    key={course.id}
                                    className="p-4 hover:shadow-md transition-shadow"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold">
                                            {idx + 1}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-medium">{course.title}</h3>
                                            <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                                                <span>{course.lessons} lessons</span>
                                                <span>•</span>
                                                <span>{course.duration}</span>
                                                {course.required && (
                                                    <>
                                                        <span>•</span>
                                                        <Badge variant="outline" className="text-xs">
                                                            Required
                                                        </Badge>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                        <Link href={`/learn/course/${course.id}`}>
                                            <Button variant="ghost" size="sm" className="gap-1">
                                                <Play className="h-3 w-3" />
                                                Preview
                                            </Button>
                                        </Link>
                                    </div>
                                </Card>
                            ))}

                            {/* Certification Exam */}
                            <Card className="p-4 border-amber-500/30 bg-amber-500/5">
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-500">
                                        <Award className="h-5 w-5" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-medium">Certification Exam</h3>
                                        <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                                            <span>{track.examDetails.questions} questions</span>
                                            <span>•</span>
                                            <span>{track.examDetails.duration}</span>
                                            <span>•</span>
                                            <span>{track.examDetails.passingScore}% to pass</span>
                                        </div>
                                    </div>
                                    <Link href={`/learn/certifications/${track.id}/exam`}>
                                        <Button variant="outline" size="sm" className="gap-1">
                                            <FileText className="h-3 w-3" />
                                            Exam Details
                                        </Button>
                                    </Link>
                                </div>
                            </Card>
                        </div>
                    </div>

                    {/* Requirements */}
                    <Card className="p-6">
                        <h2 className="text-xl font-bold mb-4">Requirements</h2>
                        <ul className="space-y-2">
                            {track.requirements.map((req, i) => (
                                <li key={i} className="flex items-center gap-3 text-sm">
                                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                    {req}
                                </li>
                            ))}
                        </ul>
                    </Card>
                </div>

                {/* Sidebar - Sticky Pricing */}
                <div className="lg:col-span-1">
                    <div className="sticky top-24">
                        <Card className="p-6">
                            <div className="text-center mb-6">
                                <div className="flex items-center justify-center gap-2 mb-2">
                                    <span className="text-4xl font-bold">${track.price}</span>
                                    <span className="text-xl text-muted-foreground line-through">
                                        ${track.originalPrice}
                                    </span>
                                </div>
                                <Badge variant="outline" className="text-emerald-500 border-emerald-500/30">
                                    Save ${track.originalPrice - track.price}
                                </Badge>
                            </div>

                            <Link href={`/learn/checkout?track=${track.id}`}>
                                <Button className="w-full gap-2 text-lg py-6 mb-4">
                                    <GraduationCap className="h-5 w-5" />
                                    Enroll Now
                                </Button>
                            </Link>

                            <p className="text-xs text-center text-muted-foreground mb-6">
                                30-day money-back guarantee
                            </p>

                            <div className="space-y-3 border-t pt-4">
                                <h3 className="font-medium text-sm">This track includes:</h3>
                                <div className="space-y-2 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                        {track.courses.length} complete courses
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                        {totalLessons} video lessons
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                        Hands-on exercises & projects
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                        Downloadable resources
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                        Certification exam ({track.examDetails.attempts} attempts)
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                        Official certificate & badge
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                        Lifetime access
                                    </div>
                                </div>
                            </div>

                            <div className="border-t mt-6 pt-4">
                                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                    <Users className="h-4 w-4" />
                                    <span>{track.students.toLocaleString()} already enrolled</span>
                                </div>
                            </div>
                        </Card>

                        {/* Enterprise CTA */}
                        <Card className="p-4 mt-4 bg-muted/50">
                            <p className="text-sm font-medium mb-2">Training a team?</p>
                            <p className="text-xs text-muted-foreground mb-3">
                                Get volume discounts for 5+ learners
                            </p>
                            <Link href="/enterprise">
                                <Button variant="outline" size="sm" className="w-full">
                                    Enterprise Options
                                </Button>
                            </Link>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
