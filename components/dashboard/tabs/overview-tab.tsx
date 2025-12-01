"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StatCard } from "@/components/dashboard/stat-card";
import { InfoItem, StatusBadge } from "@/components/ui/primitives";
import { BusinessProfile, BusinessStats, Review, Post } from "@/lib/mock-data";
import { cn, getInitials } from "@/lib/utils";
import {
  Eye,
  Search,
  MousePointer,
  Phone,
  Navigation,
  Globe,
  Clock,
  Mail,
  MapPin,
  CheckCircle2,
  Circle,
  Star,
  ArrowRight,
  Image as ImageIcon,
  MessageSquare,
  type LucideIcon,
} from "lucide-react";

// ============================================
// Types
// ============================================

interface OverviewTabProps {
  profile: BusinessProfile;
  stats: BusinessStats;
  recentReviews: Review[];
  recentPosts: Post[];
}

interface StatConfig {
  key: keyof BusinessStats;
  title: string;
  icon: LucideIcon;
}

// ============================================
// Constants
// ============================================

const STAT_CONFIGS: StatConfig[] = [
  { key: "views", title: "Profile Views", icon: Eye },
  { key: "searches", title: "Search Appearances", icon: Search },
  { key: "actions", title: "Total Actions", icon: MousePointer },
  { key: "calls", title: "Phone Calls", icon: Phone },
  { key: "directions", title: "Directions", icon: Navigation },
  { key: "websiteClicks", title: "Website Clicks", icon: Globe },
];

// ============================================
// Sub-components
// ============================================

interface StatsGridProps {
  stats: BusinessStats;
}

function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
      {STAT_CONFIGS.map(({ key, title, icon: Icon }) => {
        const stat = stats[key];
        return (
          <StatCard
            key={key}
            title={title}
            value={stat.value}
            change={stat.change}
            period={stat.period}
            icon={<Icon className="h-4 w-4" />}
          />
        );
      })}
    </div>
  );
}

// ============================================
// Review Components
// ============================================

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md";
}

function StarRating({ rating, maxRating = 5, size = "sm" }: StarRatingProps) {
  const sizeClass = size === "sm" ? "h-3 w-3" : "h-4 w-4";
  
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: maxRating }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            sizeClass,
            i < rating
              ? "fill-amber-400 text-amber-400"
              : "fill-muted/50 text-muted/50"
          )}
        />
      ))}
    </div>
  );
}

interface ReviewItemProps {
  review: Review;
  onReply?: (review: Review) => void;
}

function ReviewItem({ review, onReply }: ReviewItemProps) {
  return (
    <div className="flex gap-3">
      <Avatar className="h-8 w-8">
        <AvatarImage src={review.avatar} alt={review.author} />
        <AvatarFallback className="text-xs">
          {getInitials(review.author)}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-medium text-[13px]">{review.author}</span>
            {review.isNew && (
              <StatusBadge status="info" variant="subtle" size="sm">
                New
              </StatusBadge>
            )}
          </div>
          <span className="text-[11px] text-muted-foreground/60">
            {review.date}
          </span>
        </div>
        <div className="my-1">
          <StarRating rating={review.rating} />
        </div>
        <p className="text-[13px] text-muted-foreground/80 line-clamp-2">
          {review.text}
        </p>
        {review.reply && (
          <div className="mt-2 pl-3 border-l-2 border-border/40">
            <p className="text-[11px] text-muted-foreground/70 line-clamp-1">
              <span className="font-medium text-foreground/70">Your reply:</span>{" "}
              {review.reply}
            </p>
          </div>
        )}
        {!review.reply && (
          <Button
            variant="ghost"
            size="sm"
            className="mt-1 h-7 text-[11px] text-muted-foreground hover:text-foreground px-2"
            onClick={() => onReply?.(review)}
          >
            <MessageSquare className="h-3 w-3 mr-1" />
            Reply
          </Button>
        )}
      </div>
    </div>
  );
}

interface RecentReviewsCardProps {
  reviews: Review[];
  onViewAll?: () => void;
  onReply?: (review: Review) => void;
}

function RecentReviewsCard({ reviews, onViewAll, onReply }: RecentReviewsCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-[15px]">Recent Reviews</CardTitle>
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-foreground gap-1 text-[13px] h-8"
          onClick={onViewAll}
        >
          View All <ArrowRight className="h-3.5 w-3.5" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {reviews.slice(0, 3).map((review, index) => (
          <React.Fragment key={review.id}>
            {index > 0 && <Separator className="mb-4 bg-border/40" />}
            <ReviewItem review={review} onReply={onReply} />
          </React.Fragment>
        ))}
      </CardContent>
    </Card>
  );
}

// ============================================
// Post Components
// ============================================

interface PostItemProps {
  post: Post;
  onClick?: (post: Post) => void;
}

function PostItem({ post, onClick }: PostItemProps) {
  return (
    <div
      className="group flex gap-3 p-3 rounded-xl border border-border/40 hover:border-border/60 hover:bg-accent/30 transition-all cursor-pointer"
      onClick={() => onClick?.(post)}
    >
      {post.image ? (
        <div className="h-14 w-14 rounded-lg bg-muted overflow-hidden shrink-0">
          <img
            src={post.image}
            alt={post.title}
            className="h-full w-full object-cover"
          />
        </div>
      ) : (
        <div className="h-14 w-14 rounded-lg bg-muted/50 flex items-center justify-center shrink-0">
          <ImageIcon className="h-5 w-5 text-muted-foreground/50" />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <Badge
            variant="outline"
            className="text-[10px] px-1.5 py-0 capitalize border-border/40 text-muted-foreground/70 rounded-md"
          >
            {post.type}
          </Badge>
          <span className="text-[10px] text-muted-foreground/50">
            {post.date}
          </span>
        </div>
        <p className="text-[13px] font-medium line-clamp-1">{post.title}</p>
        <div className="flex items-center gap-3 mt-1 text-[11px] text-muted-foreground/60">
          <span className="flex items-center gap-1">
            <Eye className="h-3 w-3" />
            {post.views.toLocaleString()}
          </span>
          <span className="flex items-center gap-1">
            <MousePointer className="h-3 w-3" />
            {post.clicks}
          </span>
        </div>
      </div>
    </div>
  );
}

interface RecentPostsCardProps {
  posts: Post[];
  onViewAll?: () => void;
  onPostClick?: (post: Post) => void;
}

function RecentPostsCard({ posts, onViewAll, onPostClick }: RecentPostsCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-[15px]">Recent Posts</CardTitle>
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-foreground gap-1 text-[13px] h-8"
          onClick={onViewAll}
        >
          View All <ArrowRight className="h-3.5 w-3.5" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-3">
          {posts.slice(0, 4).map((post) => (
            <PostItem key={post.id} post={post} onClick={onPostClick} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// ============================================
// Sidebar Components
// ============================================

interface QuickInfoCardProps {
  profile: BusinessProfile;
}

function QuickInfoCard({ profile }: QuickInfoCardProps) {
  const todayHours = React.useMemo(() => {
    const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
    return profile.openingHours.find((h) => h.day === today)?.hours || "Closed";
  }, [profile.openingHours]);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-[15px]">Quick Info</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <InfoItem
          icon={MapPin}
          label="Address"
          value={
            <>
              {profile.address.street}
              <br />
              {profile.address.city}, {profile.address.state} {profile.address.zip}
            </>
          }
        />
        <Separator className="bg-border/40" />
        <InfoItem icon={Phone} label="Phone" value={profile.phone} />
        <Separator className="bg-border/40" />
        <InfoItem
          icon={Globe}
          label="Website"
          value={
            <a
              href={profile.website}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              {profile.website.replace("https://", "")}
            </a>
          }
        />
        <Separator className="bg-border/40" />
        <InfoItem icon={Mail} label="Email" value={profile.email} />
        <Separator className="bg-border/40" />
        <InfoItem icon={Clock} label="Today's Hours" value={todayHours} />
      </CardContent>
    </Card>
  );
}

interface ProfileCompletionCardProps {
  completion: number;
  items: { item: string; completed: boolean }[];
}

function ProfileCompletionCard({ completion, items }: ProfileCompletionCardProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-[15px]">Profile Completion</CardTitle>
          <span className="text-xl font-semibold text-foreground">
            {completion}%
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Progress value={completion} className="h-1.5 bg-muted/50" />
        <div className="space-y-2">
          {items.map((item) => (
            <div
              key={item.item}
              className="flex items-center gap-2 text-[13px]"
            >
              {item.completed ? (
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500/80" />
              ) : (
                <Circle className="h-3.5 w-3.5 text-muted-foreground/40" />
              )}
              <span
                className={cn(
                  item.completed
                    ? "text-muted-foreground/60 line-through"
                    : "text-foreground/80"
                )}
              >
                {item.item}
              </span>
              {!item.completed && (
                <StatusBadge status="warning" variant="subtle" size="sm" className="ml-auto">
                  To do
                </StatusBadge>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

interface AttributesCardProps {
  attributes: string[];
}

function AttributesCard({ attributes }: AttributesCardProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-[15px]">Attributes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-1.5">
          {attributes.map((attr) => (
            <Badge
              key={attr}
              variant="secondary"
              className="font-normal text-[11px] px-2 py-0.5 bg-muted/50 text-muted-foreground/80 rounded-md"
            >
              {attr}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// ============================================
// Main Component
// ============================================

export function OverviewTab({
  profile,
  stats,
  recentReviews,
  recentPosts,
}: OverviewTabProps) {
  // Event handlers can be added here
  const handleViewAllReviews = React.useCallback(() => {
    // Navigate to reviews tab or open modal
  }, []);

  const handleViewAllPosts = React.useCallback(() => {
    // Navigate to posts tab or open modal
  }, []);

  const handleReplyToReview = React.useCallback((review: Review) => {
    // Open reply dialog
    console.log("Reply to review:", review.id);
  }, []);

  const handlePostClick = React.useCallback((post: Post) => {
    // Open post details
    console.log("View post:", post.id);
  }, []);

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* Stats Grid */}
      <StatsGrid stats={stats} />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
        {/* Left Column - 2/3 width */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-5">
          <RecentReviewsCard
            reviews={recentReviews}
            onViewAll={handleViewAllReviews}
            onReply={handleReplyToReview}
          />
          <RecentPostsCard
            posts={recentPosts}
            onViewAll={handleViewAllPosts}
            onPostClick={handlePostClick}
          />
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-4 sm:space-y-5">
          <QuickInfoCard profile={profile} />
          <ProfileCompletionCard
            completion={profile.profileCompletion}
            items={profile.profileCompletionItems}
          />
          <AttributesCard attributes={profile.attributes} />
        </div>
      </div>
    </div>
  );
}
