"use client";

import { useState } from "react";
import { Card, Badge, Button } from "@/components/ui";
import {
    MessageSquare,
    Send,
    ThumbsUp,
    ThumbsDown,
    Reply,
    MoreHorizontal,
    Flag,
    User,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Comment {
    id: string;
    authorId: string;
    authorName: string;
    authorRole?: string;
    content: string;
    createdAt: string;
    likes: number;
    liked?: boolean;
    replies?: Comment[];
}

// Discussion thread for lessons
export function LessonDiscussion({
    lessonId,
    comments,
    onAddComment,
    onLike,
    onReply,
}: {
    lessonId: string;
    comments: Comment[];
    onAddComment: (content: string) => Promise<void>;
    onLike: (commentId: string) => Promise<void>;
    onReply: (commentId: string, content: string) => Promise<void>;
}) {
    const [newComment, setNewComment] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        if (!newComment.trim() || isSubmitting) return;
        setIsSubmitting(true);
        await onAddComment(newComment);
        setNewComment("");
        setIsSubmitting(false);
    };

    return (
        <Card className="p-6 bg-white/[0.02] border-white/10">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                Discussion ({comments.length})
            </h3>

            {/* Add comment */}
            <div className="mb-6">
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Ask a question or share your thoughts..."
                    rows={3}
                    className="w-full p-3 rounded-xl bg-black/30 border border-white/10 focus:border-primary focus:outline-none resize-none text-sm mb-2"
                />
                <div className="flex justify-end">
                    <Button
                        onClick={handleSubmit}
                        disabled={!newComment.trim() || isSubmitting}
                        className="gap-2"
                    >
                        <Send className="h-4 w-4" />
                        Post Comment
                    </Button>
                </div>
            </div>

            {/* Comments list */}
            <div className="space-y-4">
                {comments.length === 0 ? (
                    <p className="text-center text-white/40 py-8">
                        No comments yet. Be the first to start a discussion!
                    </p>
                ) : (
                    comments.map((comment) => (
                        <CommentItem
                            key={comment.id}
                            comment={comment}
                            onLike={onLike}
                            onReply={onReply}
                        />
                    ))
                )}
            </div>
        </Card>
    );
}

// Individual comment
function CommentItem({
    comment,
    onLike,
    onReply,
    isReply = false,
}: {
    comment: Comment;
    onLike: (id: string) => Promise<void>;
    onReply: (id: string, content: string) => Promise<void>;
    isReply?: boolean;
}) {
    const [showReplyInput, setShowReplyInput] = useState(false);
    const [replyContent, setReplyContent] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleReply = async () => {
        if (!replyContent.trim() || isSubmitting) return;
        setIsSubmitting(true);
        await onReply(comment.id, replyContent);
        setReplyContent("");
        setShowReplyInput(false);
        setIsSubmitting(false);
    };

    return (
        <div className={cn("flex gap-3", isReply && "ml-10")}>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-emerald-500 flex items-center justify-center text-xs font-medium flex-shrink-0">
                {comment.authorName.charAt(0)}
            </div>
            <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm">{comment.authorName}</span>
                    {comment.authorRole && (
                        <Badge className="text-xs bg-primary/20 text-primary">
                            {comment.authorRole}
                        </Badge>
                    )}
                    <span className="text-xs text-white/30">
                        {formatTimeAgo(comment.createdAt)}
                    </span>
                </div>
                <p className="text-sm text-white/80 mb-2">{comment.content}</p>

                {/* Actions */}
                <div className="flex items-center gap-4 text-xs">
                    <button
                        onClick={() => onLike(comment.id)}
                        className={cn(
                            "flex items-center gap-1 hover:text-primary transition-colors",
                            comment.liked ? "text-primary" : "text-white/40"
                        )}
                    >
                        <ThumbsUp className="h-3.5 w-3.5" />
                        {comment.likes > 0 && comment.likes}
                    </button>
                    {!isReply && (
                        <button
                            onClick={() => setShowReplyInput(!showReplyInput)}
                            className="flex items-center gap-1 text-white/40 hover:text-white transition-colors"
                        >
                            <Reply className="h-3.5 w-3.5" />
                            Reply
                        </button>
                    )}
                </div>

                {/* Reply input */}
                {showReplyInput && (
                    <div className="mt-3 flex gap-2">
                        <input
                            type="text"
                            value={replyContent}
                            onChange={(e) => setReplyContent(e.target.value)}
                            placeholder="Write a reply..."
                            className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-primary focus:outline-none text-sm"
                        />
                        <Button size="sm" onClick={handleReply} disabled={isSubmitting}>
                            <Send className="h-3.5 w-3.5" />
                        </Button>
                    </div>
                )}

                {/* Replies */}
                {comment.replies && comment.replies.length > 0 && (
                    <div className="mt-4 space-y-3">
                        {comment.replies.map((reply) => (
                            <CommentItem
                                key={reply.id}
                                comment={reply}
                                onLike={onLike}
                                onReply={onReply}
                                isReply
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

// Helper to format time ago
function formatTimeAgo(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return "just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
    return date.toLocaleDateString();
}

// Q&A section
export function QASection({
    questions,
    onAsk,
    onAnswer,
    onUpvote,
}: {
    questions: {
        id: string;
        question: string;
        askedBy: string;
        askedAt: string;
        upvotes: number;
        answer?: { content: string; answeredBy: string; answeredAt: string };
    }[];
    onAsk: (question: string) => Promise<void>;
    onAnswer: (questionId: string, answer: string) => Promise<void>;
    onUpvote: (questionId: string) => Promise<void>;
}) {
    const [newQuestion, setNewQuestion] = useState("");

    const handleAsk = async () => {
        if (!newQuestion.trim()) return;
        await onAsk(newQuestion);
        setNewQuestion("");
    };

    return (
        <Card className="p-6 bg-white/[0.02] border-white/10">
            <h3 className="font-semibold mb-4">Questions & Answers</h3>

            {/* Ask question */}
            <div className="flex gap-2 mb-6">
                <input
                    type="text"
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    placeholder="Ask a question..."
                    className="flex-1 px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-primary focus:outline-none"
                />
                <Button onClick={handleAsk}>Ask</Button>
            </div>

            {/* Questions */}
            <div className="space-y-4">
                {questions.map((q) => (
                    <div key={q.id} className="p-4 rounded-xl bg-white/5">
                        <div className="flex gap-3">
                            <button
                                onClick={() => onUpvote(q.id)}
                                className="flex flex-col items-center text-white/40 hover:text-primary"
                            >
                                <ThumbsUp className="h-4 w-4" />
                                <span className="text-xs">{q.upvotes}</span>
                            </button>
                            <div className="flex-1">
                                <p className="font-medium mb-1">{q.question}</p>
                                <p className="text-xs text-white/40">
                                    Asked by {q.askedBy} • {formatTimeAgo(q.askedAt)}
                                </p>
                                {q.answer && (
                                    <div className="mt-3 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                                        <p className="text-sm text-white/80">{q.answer.content}</p>
                                        <p className="text-xs text-emerald-400 mt-2">
                                            Answered by {q.answer.answeredBy}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
}
