"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Review } from "@/lib/mock-data";
import {
  Star,
  MessageSquare,
  ArrowUpDown,
  CheckCircle2,
  Clock,
  ThumbsUp,
  Flag,
  MoreHorizontal,
  Send,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface ReviewsTabProps {
  reviews: Review[];
  totalReviews: number;
  averageRating: number;
}

export function ReviewsTab({
  reviews,
  totalReviews,
  averageRating,
}: ReviewsTabProps) {
  const [filterRating, setFilterRating] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("newest");

  // Rating distribution
  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: reviews.filter((r) => r.rating === rating).length,
    percentage:
      (reviews.filter((r) => r.rating === rating).length / reviews.length) *
      100,
  }));

  const filteredReviews = reviews.filter((review) => {
    const matchesRating =
      filterRating === "all" || review.rating === parseInt(filterRating);
    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "replied" && review.reply) ||
      (filterStatus === "pending" && !review.reply);
    return matchesRating && matchesStatus;
  });

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (sortBy === "newest") return 0; // Already sorted by date in mock data
    if (sortBy === "oldest") return 0;
    if (sortBy === "highest") return b.rating - a.rating;
    if (sortBy === "lowest") return a.rating - b.rating;
    return 0;
  });

  const pendingReplies = reviews.filter((r) => !r.reply).length;
  const newReviews = reviews.filter((r) => r.isNew).length;

  return (
    <div className="space-y-6">
      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Overall Rating Card */}
        <Card className="md:col-span-1">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-5xl font-bold text-foreground mb-2">
                {averageRating}
              </div>
              <div className="flex items-center justify-center gap-1 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-5 w-5",
                      i < Math.floor(averageRating)
                        ? "fill-amber-400 text-amber-400"
                        : "fill-muted text-muted"
                    )}
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                Based on {totalReviews} reviews
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Rating Distribution */}
        <Card className="md:col-span-2">
          <CardContent className="p-6">
            <div className="space-y-2">
              {ratingDistribution.map(({ rating, count, percentage }) => (
                <div key={rating} className="flex items-center gap-3">
                  <div className="flex items-center gap-1 w-12">
                    <span className="text-sm font-medium">{rating}</span>
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  </div>
                  <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-400 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground w-12 text-right">
                    {count}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card className="md:col-span-1">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">New Reviews</span>
              <Badge
                variant="secondary"
                className="bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400"
              >
                {newReviews}
              </Badge>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Pending Replies
              </span>
              <Badge
                variant="secondary"
                className="bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400"
              >
                {pendingReplies}
              </Badge>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Response Rate
              </span>
              <span className="text-sm font-medium">
                {Math.round(
                  ((reviews.length - pendingReplies) / reviews.length) * 100
                )}
                %
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Select value={filterRating} onValueChange={setFilterRating}>
            <SelectTrigger className="w-[140px]">
              <Star className="h-4 w-4 mr-2" />
              <SelectValue placeholder="All ratings" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Ratings</SelectItem>
              <SelectItem value="5">5 Stars</SelectItem>
              <SelectItem value="4">4 Stars</SelectItem>
              <SelectItem value="3">3 Stars</SelectItem>
              <SelectItem value="2">2 Stars</SelectItem>
              <SelectItem value="1">1 Star</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[160px]">
              <MessageSquare className="h-4 w-4 mr-2" />
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Reviews</SelectItem>
              <SelectItem value="replied">Replied</SelectItem>
              <SelectItem value="pending">Pending Reply</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[160px]">
            <ArrowUpDown className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
            <SelectItem value="highest">Highest Rated</SelectItem>
            <SelectItem value="lowest">Lowest Rated</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {sortedReviews.map((review) => (
          <Card key={review.id} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={review.avatar} alt={review.author} />
                  <AvatarFallback>{review.author[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{review.author}</span>
                        {review.isNew && (
                          <Badge
                            variant="secondary"
                            className="bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400 text-[10px]"
                          >
                            New
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                "h-4 w-4",
                                i < review.rating
                                  ? "fill-amber-400 text-amber-400"
                                  : "fill-muted text-muted"
                              )}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {review.date}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {review.reply ? (
                        <Badge
                          variant="secondary"
                          className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 gap-1"
                        >
                          <CheckCircle2 className="h-3 w-3" />
                          Replied
                        </Badge>
                      ) : (
                        <Badge
                          variant="secondary"
                          className="bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400 gap-1"
                        >
                          <Clock className="h-3 w-3" />
                          Pending
                        </Badge>
                      )}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="gap-2">
                            <ThumbsUp className="h-4 w-4" />
                            Mark as Helpful
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 text-destructive focus:text-destructive">
                            <Flag className="h-4 w-4" />
                            Report Review
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  <p className="mt-3 text-sm text-foreground leading-relaxed">
                    {review.text}
                  </p>

                  {/* Reply Section */}
                  {review.reply ? (
                    <div className="mt-4 pl-4 border-l-2 border-primary/20 bg-accent/30 rounded-r-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium">Your Reply</span>
                        <span className="text-xs text-muted-foreground">
                          {review.replyDate}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {review.reply}
                      </p>
                    </div>
                  ) : (
                    <div className="mt-4 flex items-center gap-2">
                      <Button variant="outline" size="sm" className="gap-2">
                        <MessageSquare className="h-4 w-4" />
                        Reply
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="gap-2 text-muted-foreground"
                      >
                        <Send className="h-4 w-4" />
                        Generate AI Reply
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {sortedReviews.length === 0 && (
        <div className="text-center py-12">
          <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-1">No reviews found</h3>
          <p className="text-sm text-muted-foreground">
            Try adjusting your filters to see more reviews
          </p>
        </div>
      )}
    </div>
  );
}
