"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { EmptyState, StatusBadge } from "@/components/ui/primitives";
import { Review } from "@/lib/mock-data";
import { cn, getInitials } from "@/lib/utils";
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

// ============================================
// Types
// ============================================

interface ReviewsTabProps {
  reviews: Review[];
  totalReviews: number;
  averageRating: number;
  onReply?: (review: Review) => void;
  onGenerateAIReply?: (review: Review) => void;
  onMarkHelpful?: (review: Review) => void;
  onReport?: (review: Review) => void;
}

interface ReviewFilters {
  rating: string;
  status: string;
  sortBy: string;
}

// ============================================
// Constants
// ============================================

const DEFAULT_FILTERS: ReviewFilters = {
  rating: "all",
  status: "all",
  sortBy: "newest",
};

const RATING_OPTIONS = [
  { value: "all", label: "All Ratings" },
  { value: "5", label: "5 Stars" },
  { value: "4", label: "4 Stars" },
  { value: "3", label: "3 Stars" },
  { value: "2", label: "2 Stars" },
  { value: "1", label: "1 Star" },
];

const STATUS_OPTIONS = [
  { value: "all", label: "All Reviews" },
  { value: "replied", label: "Replied" },
  { value: "pending", label: "Pending Reply" },
];

const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "highest", label: "Highest Rated" },
  { value: "lowest", label: "Lowest Rated" },
];

// ============================================
// Sub-components
// ============================================

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

function StarRating({
  rating,
  maxRating = 5,
  size = "md",
  showLabel = false,
}: StarRatingProps) {
  const sizeClasses = {
    sm: "h-3.5 w-3.5",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: maxRating }).map((_, i) => (
          <Star
            key={i}
            className={cn(
              sizeClasses[size],
              i < rating
                ? "fill-amber-400 text-amber-400"
                : "fill-muted text-muted"
            )}
          />
        ))}
      </div>
      {showLabel && <span className="text-sm font-medium ml-1">{rating}</span>}
    </div>
  );
}

interface RatingDistributionProps {
  reviews: Review[];
}

function RatingDistribution({ reviews }: RatingDistributionProps) {
  const distribution = React.useMemo(
    () =>
      [5, 4, 3, 2, 1].map((rating) => ({
        rating,
        count: reviews.filter((r) => r.rating === rating).length,
        percentage:
          reviews.length > 0
            ? (reviews.filter((r) => r.rating === rating).length /
                reviews.length) *
              100
            : 0,
      })),
    [reviews]
  );

  return (
    <div className="space-y-2">
      {distribution.map(({ rating, count, percentage }) => (
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
  );
}

interface ReviewStatsProps {
  totalReviews: number;
  averageRating: number;
  newCount: number;
  pendingCount: number;
  responseRate: number;
  reviews: Review[];
}

function ReviewStats({
  totalReviews,
  averageRating,
  newCount,
  pendingCount,
  responseRate,
  reviews,
}: ReviewStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {/* Overall Rating Card */}
      <Card className="md:col-span-1">
        <CardContent className="p-6">
          <div className="text-center">
            <div className="text-5xl font-bold text-foreground mb-2">
              {averageRating}
            </div>
            <div className="flex justify-center mb-2">
              <StarRating rating={Math.floor(averageRating)} size="lg" />
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
          <RatingDistribution reviews={reviews} />
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <Card className="md:col-span-1">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">New Reviews</span>
            <StatusBadge status="info" variant="subtle">
              {newCount}
            </StatusBadge>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Pending Replies
            </span>
            <StatusBadge status="warning" variant="subtle">
              {pendingCount}
            </StatusBadge>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Response Rate</span>
            <span className="text-sm font-medium">{responseRate}%</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

interface ReviewFiltersProps {
  filters: ReviewFilters;
  onFilterChange: <K extends keyof ReviewFilters>(
    key: K,
    value: ReviewFilters[K]
  ) => void;
}

function ReviewFiltersBar({ filters, onFilterChange }: ReviewFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
      <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto scrollbar-none">
        <Select
          value={filters.rating}
          onValueChange={(v) => onFilterChange("rating", v)}
        >
          <SelectTrigger className="w-[120px] sm:w-[140px] shrink-0">
            <Star className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
            <SelectValue placeholder="All ratings" />
          </SelectTrigger>
          <SelectContent>
            {RATING_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={filters.status}
          onValueChange={(v) => onFilterChange("status", v)}
        >
          <SelectTrigger className="w-[130px] sm:w-40 shrink-0">
            <MessageSquare className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
            <SelectValue placeholder="All statuses" />
          </SelectTrigger>
          <SelectContent>
            {STATUS_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Select
        value={filters.sortBy}
        onValueChange={(v) => onFilterChange("sortBy", v)}
      >
        <SelectTrigger className="w-full sm:w-40">
          <ArrowUpDown className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          {SORT_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

interface ReviewCardProps {
  review: Review;
  onReply?: () => void;
  onGenerateAIReply?: () => void;
  onMarkHelpful?: () => void;
  onReport?: () => void;
}

function ReviewCard({
  review,
  onReply,
  onGenerateAIReply,
  onMarkHelpful,
  onReport,
}: ReviewCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4 sm:p-6">
        <div className="flex gap-3 sm:gap-4">
          <Avatar className="h-8 w-8 sm:h-10 sm:w-10 shrink-0">
            <AvatarImage src={review.avatar} alt={review.author} />
            <AvatarFallback>{getInitials(review.author)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex items-start justify-between gap-2 sm:gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-medium text-sm sm:text-base truncate">{review.author}</span>
                  {review.isNew && (
                    <StatusBadge status="info" variant="subtle" size="sm">
                      New
                    </StatusBadge>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <StarRating rating={review.rating} />
                  <span className="text-xs sm:text-sm text-muted-foreground">
                    {review.date}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 sm:gap-2 shrink-0">
                <div className="hidden xs:block">
                  {review.reply ? (
                    <Badge
                      variant="secondary"
                      className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 gap-1 text-[10px] sm:text-xs"
                    >
                      <CheckCircle2 className="h-3 w-3" />
                      Replied
                    </Badge>
                  ) : (
                    <Badge
                      variant="secondary"
                      className="bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400 gap-1 text-[10px] sm:text-xs"
                    >
                      <Clock className="h-3 w-3" />
                      Pending
                    </Badge>
                  )}
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="gap-2" onClick={onMarkHelpful}>
                      <ThumbsUp className="h-4 w-4" />
                      Mark as Helpful
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="gap-2 text-destructive focus:text-destructive"
                      onClick={onReport}
                    >
                      <Flag className="h-4 w-4" />
                      Report Review
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Review Text */}
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
                <p className="text-sm text-muted-foreground">{review.reply}</p>
              </div>
            ) : (
              <div className="mt-4 flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  onClick={onReply}
                >
                  <MessageSquare className="h-4 w-4" />
                  Reply
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2 text-muted-foreground"
                  onClick={onGenerateAIReply}
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
  );
}

// ============================================
// Main Component
// ============================================

export function ReviewsTab({
  reviews,
  totalReviews,
  averageRating,
  onReply,
  onGenerateAIReply,
  onMarkHelpful,
  onReport,
}: ReviewsTabProps) {
  // Filter state management
  const [filters, setFilters] = React.useState<ReviewFilters>(DEFAULT_FILTERS);

  // Filter setter helper
  const setFilter = React.useCallback(
    <K extends keyof ReviewFilters>(key: K, value: ReviewFilters[K]) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  // Computed stats
  const stats = React.useMemo(
    () => ({
      newCount: reviews.filter((r) => r.isNew).length,
      pendingCount: reviews.filter((r) => !r.reply).length,
      responseRate: Math.round(
        ((reviews.length - reviews.filter((r) => !r.reply).length) /
          reviews.length) *
          100
      ),
    }),
    [reviews]
  );

  // Filter and sort reviews
  const processedReviews = React.useMemo(() => {
    // First filter
    let result = reviews.filter((review) => {
      const matchesRating =
        filters.rating === "all" || review.rating === parseInt(filters.rating);
      const matchesStatus =
        filters.status === "all" ||
        (filters.status === "replied" && review.reply) ||
        (filters.status === "pending" && !review.reply);
      return matchesRating && matchesStatus;
    });

    // Then sort
    result = [...result].sort((a, b) => {
      if (filters.sortBy === "highest") return b.rating - a.rating;
      if (filters.sortBy === "lowest") return a.rating - b.rating;
      // For newest/oldest, we'd need actual dates - for now keep original order
      return 0;
    });

    return result;
  }, [reviews, filters]);

  return (
    <div className="space-y-6">
      {/* Stats Summary */}
      <ReviewStats
        totalReviews={totalReviews}
        averageRating={averageRating}
        newCount={stats.newCount}
        pendingCount={stats.pendingCount}
        responseRate={stats.responseRate}
        reviews={reviews}
      />

      {/* Filters */}
      <ReviewFiltersBar filters={filters} onFilterChange={setFilter} />

      {/* Reviews List */}
      <div className="space-y-4">
        {processedReviews.map((review) => (
          <ReviewCard
            key={review.id}
            review={review}
            onReply={() => onReply?.(review)}
            onGenerateAIReply={() => onGenerateAIReply?.(review)}
            onMarkHelpful={() => onMarkHelpful?.(review)}
            onReport={() => onReport?.(review)}
          />
        ))}
      </div>

      {/* Empty State */}
      {processedReviews.length === 0 && (
        <EmptyState
          icon={MessageSquare}
          title="No reviews found"
          description="Try adjusting your filters to see more reviews"
        />
      )}
    </div>
  );
}
