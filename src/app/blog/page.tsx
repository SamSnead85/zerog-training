import Link from "next/link";
import { Button } from "@/components/ui";
import { LogoIcon } from "@/components/brand/Logo";
import { Calendar, Clock, ArrowRight } from "lucide-react";

const posts = [
    {
        title: "The Future of Enterprise Training: AI-Powered Personalization",
        excerpt: "How AI is transforming corporate learning by creating truly personalized training experiences.",
        date: "Dec 15, 2024",
        readTime: "5 min read",
        category: "AI & Training",
    },
    {
        title: "5 Metrics That Actually Matter for L&D Success",
        excerpt: "Move beyond completion rates and measure what really drives business outcomes.",
        date: "Dec 10, 2024",
        readTime: "4 min read",
        category: "Best Practices",
    },
    {
        title: "Building a Culture of Continuous Learning",
        excerpt: "Practical strategies for fostering a learning-first mindset in your organization.",
        date: "Dec 5, 2024",
        readTime: "6 min read",
        category: "Leadership",
    },
    {
        title: "Compliance Training That Doesn't Put People to Sleep",
        excerpt: "Engaging approaches to mandatory training that actually stick.",
        date: "Nov 28, 2024",
        readTime: "4 min read",
        category: "Compliance",
    },
];

export default function BlogPage() {
    return (
        <div className="min-h-screen bg-background">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-background/80 backdrop-blur-xl">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                    <Link href="/" className="flex items-center gap-2.5">
                        <LogoIcon size={32} />
                        <span className="text-lg font-semibold tracking-tight">
                            <span className="font-playfair italic">ScaledNative<sup class="text-[10px]">™</sup></span>
                            <span className="text-muted-foreground ml-1 font-light">Training</span>
                        </span>
                    </Link>
                    <Link href="/signup">
                        <Button>Get Started</Button>
                    </Link>
                </div>
            </nav>

            {/* Hero */}
            <section className="pt-32 pb-16 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">Blog</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Insights on AI, enterprise training, and building effective learning programs.
                    </p>
                </div>
            </section>

            {/* Posts */}
            <section className="py-16 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="space-y-6">
                        {posts.map((post) => (
                            <article key={post.title} className="p-6 rounded-xl bg-white/[0.02] border border-white/10 hover:border-primary/30 transition-colors cursor-pointer">
                                <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                                    <span className="text-primary font-medium">{post.category}</span>
                                    <span>•</span>
                                    <span className="flex items-center gap-1">
                                        <Calendar className="h-4 w-4" />
                                        {post.date}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Clock className="h-4 w-4" />
                                        {post.readTime}
                                    </span>
                                </div>
                                <h2 className="text-xl font-semibold mb-2 hover:text-primary transition-colors">{post.title}</h2>
                                <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                                <span className="text-primary text-sm font-medium flex items-center gap-1">
                                    Read more <ArrowRight className="h-4 w-4" />
                                </span>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 px-6 border-t border-white/5">
                <div className="max-w-6xl mx-auto flex items-center justify-between text-sm text-muted-foreground">
                    <p>© 2024 ScaledNative. All rights reserved.</p>
                    <Link href="/" className="hover:text-foreground">Back to Home</Link>
                </div>
            </footer>
        </div>
    );
}
