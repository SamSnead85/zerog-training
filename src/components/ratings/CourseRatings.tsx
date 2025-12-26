"use client";

import { useState } from "react";
import { Card, Badge, Button, Progress } from "@/components/ui";
import {
    Star,
    ThumbsUp,
    MessageSquare,
    MoreHorizontal,
    Filter,
    ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Review {
    id: string;
    author: {
        name: string;
        role?: string;
    };
    rating: number;
    date: string;
    content: string;
    helpful: number;
    isHelpful: boolean;
}

interface CourseRatingsProps {
    courseId: string;
    courseTitle: string;
    averageRating: number;
    totalReviews: number;
    ratingDistribution: { stars: number; count: number }[];
}

// Mock reviews
const mockReviews: Review[] = [
    {
        id: "1",
        author: { name: "Sarah Chen", role: "Engineering Manager" },
        rating: 5,
        date: "2 weeks ago",
        content: "Excellent course! The practical examples really helped me understand the concepts. The instructor breaks down complex topics in an accessible way. Highly recommend for anyone looking to level up their skills.",
        helpful: 24,
        isHelpful: false,
    },
    {
        id: "2",
        author: { name: "Marcus Johnson", role: "Product Manager" },
        rating: 4,
        date: "1 month ago",
        content: "Very comprehensive coverage of the material. The quizzes at the end of each section helped reinforce the learning. Would have liked more real-world case studies.",
        helpful: 18,
        isHelpful: true,
    },
    {
        id: "3",
        author: { name: "Emily Rodriguez" },
        rating: 5,
        date: "1 month ago",
        content: "This course exceeded my expectations. The content is up-to-date and relevant. I immediately applied what I learned to my work.",
        helpful: 12,
        isHelpful: false,
    },
];

export function CourseRatings({
    courseId,
    courseTitle,
    averageRating = 4.7,
    totalReviews = 128,
    ratingDistribution = [
        { stars: 5, count: 89 },
        { stars: 4, count: 28 },
        { stars: 3, count: 8 },
        { stars: 2, count: 2 },
        { stars: 1, count: 1 },
    ],
}: Partial<CourseRatingsProps>) {
    const [reviews, setReviews] = useState(mockReviews);
    const [sortBy, setSortBy] = useState<"recent" | "helpful">("helpful");
    const [showWriteReview, setShowWriteReview] = useState(false);
    const [newRating, setNewRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);

    const maxCount = Math.max(...ratingDistribution.map((r) => r.count));

    const handleHelpful = (reviewId: string) => {
        setReviews(reviews.map((r) =>
            r.id === reviewId
                ? { ...r, isHelpful: !r.isHelpful, helpful: r.isHelpful ? r.helpful - 1 : r.helpful + 1 }
                : r
        ));
    };

    const renderStars = (rating: number, size: "sm" | "md" | "lg" = "md") => {
        const sizeClass = size === "sm" ? "h-3 w-3" : size === "lg" ? "h-6 w-6" : "h-4 w-4";
        return (
            <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        className={cn(
                            sizeClass,
                            star <= rating ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"
                        )}
                    />
                ))}
            </div>
        );
    };

    return (
        <div className="space-y-6">
            {/* Overview */}
            <Card className="p-6">
                <div className="grid md:grid-cols-[200px_1fr] gap-8">
                    {/* Average Rating */}
                    <div className="text-center">
                        <p className="text-5xl font-bold mb-2">{averageRating}</p>
                        {renderStars(Math.round(averageRating), "lg")}
                        <p className="text-sm text-muted-foreground mt-2">
                            {totalReviews} reviews
                        </p>
                    </div>

                    {/* Distribution */}
                    <div className="space-y-2">
                        {ratingDistribution.map((item) => (
                            <div key={item.stars} className="flex items-center gap-3">
                                <span className="text-sm w-12 flex items-center gap-1">
                                    {item.stars} <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                                </span>
                                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-yellow-500 rounded-full transition-all"
                                        style={{ width: `${(item.count / maxCount) * 100}%` }}
                                    />
                                </div>
                                <span className="text-sm text-muted-foreground w-8">
                                    {item.count}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-6 pt-6 border-t border-border">
                    <Button onClick={() => setShowWriteReview(!showWriteReview)}>
                        Write a Review
                    </Button>
                </div>
            </Card>

            {/* Write Review Form */}
            {showWriteReview && (
                <Card className="p-6">
                    <h3 className="font-semibold mb-4">Write Your Review</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="text-sm text-muted-foreground mb-2 block">Your Rating</label>
                            <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        onClick={() => setNewRating(star)}
                                        onMouseEnter={() => setHoverRating(star)}
                                        onMouseLeave={() => setHoverRating(0)}
                                    >
                                        <Star
                                            className={cn(
                                                "h-8 w-8 transition-colors",
                                                star <= (hoverRating || newRating)
                                                    ? "text-yellow-500 fill-yellow-500"
                                                    : "text-muted-foreground"
                                            )}
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="text-sm text-muted-foreground mb-2 block">Your Review</label>
                            <textarea
                                placeholder="Share your experience with this course..."
                                rows={4}
                                className="w-full px-4 py-3 rounded-xl bg-white/[0.02] border border-white/10 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                            />
                        </div>
                        <div className="flex gap-3">
                            <Button>Submit Review</Button>
                            <Button variant="outline" onClick={() => setShowWriteReview(false)}>
                                Cancel
                            </Button>
                        </div>
                    </div>
                </Card>
            )}

            {/* Reviews Header */}
            <div className="flex items-center justify-between">
                <h3 className="font-semibold">Reviews</h3>
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                    className="h-9 px-3 rounded-lg bg-muted border-0 text-sm"
                >
                    <option value="helpful">Most Helpful</option>
                    <option value="recent">Most Recent</option>
                </select>
            </div>

            {/* Reviews List */}
            <div className="space-y-4">
                {reviews.map((review) => (
                    <Card key={review.id} className="p-4">
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-zinc-600 to-zinc-700 flex items-center justify-center text-sm font-medium">
                                    {review.author.name.split(" ").map((n) => n[0]).join("")}
                                </div>
                                <div>
                                    <p className="font-medium text-sm">{review.author.name}</p>
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                        {renderStars(review.rating, "sm")}
                                        <span>•</span>
                                        <span>{review.date}</span>
                                    </div>
                                </div>
                            </div>
                            <button className="p-1 hover:bg-muted rounded">
                                <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                            </button>
                        </div>

                        <p className="text-sm mb-4">{review.content}</p>

                        <div className="flex items-center gap-4 text-sm">
                            <button
                                onClick={() => handleHelpful(review.id)}
                                className={cn(
                                    "flex items-center gap-1.5 transition-colors",
                                    review.isHelpful ? "text-primary" : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                <ThumbsUp className={cn("h-4 w-4", review.isHelpful && "fill-current")} />
                                Helpful ({review.helpful})
                            </button>
                            <button className="text-muted-foreground hover:text-foreground flex items-center gap-1.5">
                                <MessageSquare className="h-4 w-4" />
                                Reply
                            </button>
                        </div>
                    </Card>
                ))}
            </div>

            <Button variant="outline" className="w-full">
                Load More Reviews
            </Button>
        </div>
    );
}
