"use client";

import { useState } from "react";
import { Card, Button, Badge } from "@/components/ui";
import {
    Users,
    MessageSquare,
    ThumbsUp,
    Share2,
    BookOpen,
    Clock,
    ChevronRight,
    Heart,
    Award
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SocialPost {
    id: string;
    user: {
        name: string;
        avatar: string;
        title: string;
    };
    type: "completion" | "achievement" | "discussion" | "share";
    content: string;
    courseName?: string;
    timestamp: string;
    likes: number;
    comments: number;
    isLiked: boolean;
}

const mockFeed: SocialPost[] = [
    {
        id: "1",
        user: { name: "Sarah Chen", avatar: "SC", title: "Engineering Manager" },
        type: "completion",
        content: "Just completed the NATIVE Framework Foundations certification! 🎉 Ready to lead our agentic development initiatives.",
        courseName: "NATIVE Framework Certification",
        timestamp: "2 hours ago",
        likes: 24,
        comments: 8,
        isLiked: false,
    },
    {
        id: "2",
        user: { name: "Michael Brown", avatar: "MB", title: "Product Manager" },
        type: "achievement",
        content: "Earned the 'Security Champion' badge after completing all cybersecurity courses! 🛡️",
        timestamp: "4 hours ago",
        likes: 18,
        comments: 5,
        isLiked: true,
    },
    {
        id: "3",
        user: { name: "Emily Rodriguez", avatar: "ER", title: "Security Analyst" },
        type: "discussion",
        content: "Has anyone taken the new Prompt Engineering course? Looking for study partners for the advanced modules.",
        courseName: "Prompt Engineering Masterclass",
        timestamp: "6 hours ago",
        likes: 7,
        comments: 12,
        isLiked: false,
    },
    {
        id: "4",
        user: { name: "David Kim", avatar: "DK", title: "Operations Lead" },
        type: "share",
        content: "Highly recommend this HIPAA training for anyone in healthcare. The scenarios are incredibly realistic and practical.",
        courseName: "HIPAA Privacy & Security 2024",
        timestamp: "Yesterday",
        likes: 32,
        comments: 11,
        isLiked: false,
    },
];

const typeConfig = {
    completion: { icon: Award, label: "Completed", color: "text-emerald-500" },
    achievement: { icon: Award, label: "Achievement", color: "text-yellow-500" },
    discussion: { icon: MessageSquare, label: "Discussion", color: "text-blue-500" },
    share: { icon: Share2, label: "Shared", color: "text-purple-500" },
};

export function SocialLearningFeed() {
    const [posts, setPosts] = useState(mockFeed);

    const handleLike = (postId: string) => {
        setPosts(prev => prev.map(post => {
            if (post.id === postId) {
                return {
                    ...post,
                    isLiked: !post.isLiked,
                    likes: post.isLiked ? post.likes - 1 : post.likes + 1,
                };
            }
            return post;
        }));
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                        <Users className="h-5 w-5 text-primary" />
                        Learning Community
                    </h2>
                    <p className="text-sm text-muted-foreground">See what your colleagues are learning</p>
                </div>
                <Button size="sm" className="gap-1">
                    <MessageSquare className="h-4 w-4" />
                    Share Update
                </Button>
            </div>

            {/* Stats Banner */}
            <Card className="p-4 bg-gradient-to-r from-primary/5 to-purple-500/5">
                <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                        <div className="text-2xl font-bold">1,247</div>
                        <div className="text-xs text-muted-foreground">Courses Completed Today</div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold">89</div>
                        <div className="text-xs text-muted-foreground">Active Discussions</div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold">42</div>
                        <div className="text-xs text-muted-foreground">New Achievements</div>
                    </div>
                </div>
            </Card>

            {/* Feed */}
            <div className="space-y-4">
                {posts.map((post) => {
                    const config = typeConfig[post.type];
                    const TypeIcon = config.icon;

                    return (
                        <Card key={post.id} className="p-4">
                            {/* Header */}
                            <div className="flex items-start gap-3 mb-3">
                                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-sm font-medium">
                                    {post.user.avatar}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium">{post.user.name}</span>
                                        <span className={cn("flex items-center gap-1 text-xs", config.color)}>
                                            <TypeIcon className="h-3 w-3" />
                                            {config.label}
                                        </span>
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                        {post.user.title} • {post.timestamp}
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <p className="text-sm mb-3">{post.content}</p>

                            {/* Course Reference */}
                            {post.courseName && (
                                <div className="flex items-center gap-2 p-2 rounded-lg bg-muted mb-3">
                                    <BookOpen className="h-4 w-4 text-primary" />
                                    <span className="text-sm font-medium">{post.courseName}</span>
                                    <ChevronRight className="h-4 w-4 ml-auto text-muted-foreground" />
                                </div>
                            )}

                            {/* Actions */}
                            <div className="flex items-center gap-4 pt-3 border-t border-border">
                                <button
                                    onClick={() => handleLike(post.id)}
                                    className={cn(
                                        "flex items-center gap-1 text-sm transition-colors",
                                        post.isLiked ? "text-red-500" : "text-muted-foreground hover:text-foreground"
                                    )}
                                >
                                    <Heart className={cn("h-4 w-4", post.isLiked && "fill-current")} />
                                    {post.likes}
                                </button>
                                <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                                    <MessageSquare className="h-4 w-4" />
                                    {post.comments}
                                </button>
                                <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors ml-auto">
                                    <Share2 className="h-4 w-4" />
                                    Share
                                </button>
                            </div>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
