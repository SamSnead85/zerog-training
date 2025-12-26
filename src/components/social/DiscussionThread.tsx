"use client";

import { useState } from "react";
import { Button, Badge } from "@/components/ui";
import {
    MessageSquare,
    ThumbsUp,
    Reply,
    MoreHorizontal,
    Send,
    Pin,
    ChevronDown,
    ChevronUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Comment {
    id: string;
    author: {
        name: string;
        avatar?: string;
        role?: string;
    };
    content: string;
    timestamp: string;
    likes: number;
    isLiked: boolean;
    isPinned?: boolean;
    replies?: Comment[];
}

interface DiscussionThreadProps {
    lessonId: string;
    lessonTitle: string;
}

// Mock comments
const mockComments: Comment[] = [
    {
        id: "1",
        author: { name: "Sarah Chen", role: "Expert" },
        content: "Great explanation of the core concepts! One thing I'd add is that in practice, the implementation often varies based on team size. Has anyone else experienced this?",
        timestamp: "2 hours ago",
        likes: 12,
        isLiked: false,
        isPinned: true,
        replies: [
            {
                id: "1-1",
                author: { name: "Marcus Johnson" },
                content: "Absolutely! In our team of 8, we had to adapt the framework quite a bit.",
                timestamp: "1 hour ago",
                likes: 3,
                isLiked: true,
            },
        ],
    },
    {
        id: "2",
        author: { name: "David Kim" },
        content: "Can someone clarify the difference between the two approaches mentioned in section 2?",
        timestamp: "5 hours ago",
        likes: 8,
        isLiked: false,
        replies: [
            {
                id: "2-1",
                author: { name: "Emily Rodriguez", role: "Instructor" },
                content: "Great question! The key difference is in the timing of implementation. The first approach is proactive, while the second is reactive. I'll add more context in the next module.",
                timestamp: "4 hours ago",
                likes: 15,
                isLiked: true,
            },
        ],
    },
    {
        id: "3",
        author: { name: "Lisa Wang" },
        content: "This lesson really helped me understand the fundamentals. Thanks for the clear examples!",
        timestamp: "1 day ago",
        likes: 24,
        isLiked: true,
    },
];

function CommentCard({
    comment,
    isReply = false,
}: {
    comment: Comment;
    isReply?: boolean;
}) {
    const [showReplies, setShowReplies] = useState(true);
    const [liked, setLiked] = useState(comment.isLiked);
    const [likeCount, setLikeCount] = useState(comment.likes);
    const [isReplying, setIsReplying] = useState(false);

    const handleLike = () => {
        setLiked(!liked);
        setLikeCount(liked ? likeCount - 1 : likeCount + 1);
    };

    return (
        <div className={cn("group", isReply && "ml-12 mt-3")}>
            <div className={cn(
                "p-4 rounded-xl transition-all",
                comment.isPinned && "bg-primary/5 border border-primary/20",
                !comment.isPinned && "bg-white/[0.02] border border-white/10"
            )}>
                {/* Author */}
                <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-zinc-600 to-zinc-700 flex items-center justify-center text-xs font-medium">
                            {comment.author.name.split(" ").map(n => n[0]).join("")}
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="font-medium text-sm">{comment.author.name}</span>
                                {comment.author.role && (
                                    <Badge variant="outline" className="text-xs py-0">
                                        {comment.author.role}
                                    </Badge>
                                )}
                                {comment.isPinned && (
                                    <Pin className="h-3 w-3 text-primary" />
                                )}
                            </div>
                            <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                        </div>
                    </div>
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-muted rounded">
                        <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                    </button>
                </div>

                {/* Content */}
                <p className="text-sm mb-3 leading-relaxed">{comment.content}</p>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={handleLike}
                        className={cn(
                            "flex items-center gap-1.5 text-sm transition-colors",
                            liked ? "text-primary" : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        <ThumbsUp className={cn("h-4 w-4", liked && "fill-current")} />
                        {likeCount}
                    </button>
                    {!isReply && (
                        <button
                            onClick={() => setIsReplying(!isReplying)}
                            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <Reply className="h-4 w-4" />
                            Reply
                        </button>
                    )}
                </div>

                {/* Reply Input */}
                {isReplying && (
                    <div className="mt-3 flex gap-2">
                        <input
                            type="text"
                            placeholder="Write a reply..."
                            className="flex-1 h-9 px-3 rounded-lg bg-muted border-0 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                            autoFocus
                        />
                        <Button size="sm" className="h-9">
                            <Send className="h-4 w-4" />
                        </Button>
                    </div>
                )}
            </div>

            {/* Replies */}
            {comment.replies && comment.replies.length > 0 && (
                <div className="mt-1">
                    {!isReply && (
                        <button
                            onClick={() => setShowReplies(!showReplies)}
                            className="flex items-center gap-1 ml-12 mb-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
                        >
                            {showReplies ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                            {comment.replies.length} {comment.replies.length === 1 ? "reply" : "replies"}
                        </button>
                    )}
                    {showReplies && comment.replies.map((reply) => (
                        <CommentCard key={reply.id} comment={reply} isReply />
                    ))}
                </div>
            )}
        </div>
    );
}

export function DiscussionThread({ lessonId, lessonTitle }: DiscussionThreadProps) {
    const [newComment, setNewComment] = useState("");
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="border-t border-border pt-8 mt-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <MessageSquare className="h-5 w-5 text-muted-foreground" />
                    <h3 className="font-semibold">Discussion</h3>
                    <span className="text-sm text-muted-foreground">
                        {mockComments.length} comments
                    </span>
                </div>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    {isExpanded ? "Collapse" : "Expand"}
                </Button>
            </div>

            {/* New Comment Input */}
            <div className="flex gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-zinc-600 to-zinc-700 flex items-center justify-center text-sm font-medium flex-shrink-0">
                    JS
                </div>
                <div className="flex-1">
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Share your thoughts or ask a question..."
                        rows={2}
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.02] border border-white/10 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm resize-none"
                    />
                    <div className="flex justify-end mt-2">
                        <Button size="sm" disabled={!newComment.trim()} className="gap-2">
                            <Send className="h-4 w-4" />
                            Post Comment
                        </Button>
                    </div>
                </div>
            </div>

            {/* Comments */}
            <div className="space-y-4">
                {(isExpanded ? mockComments : mockComments.slice(0, 2)).map((comment) => (
                    <CommentCard key={comment.id} comment={comment} />
                ))}

                {!isExpanded && mockComments.length > 2 && (
                    <button
                        onClick={() => setIsExpanded(true)}
                        className="w-full py-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                        Show {mockComments.length - 2} more comments
                    </button>
                )}
            </div>
        </div>
    );
}
