"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StatCard } from "@/components/dashboard/stat-card";
import { BusinessProfile, BusinessStats, Review, Post } from "@/lib/mock-data";
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
} from "lucide-react";

interface OverviewTabProps {
  profile: BusinessProfile;
  stats: BusinessStats;
  recentReviews: Review[];
  recentPosts: Post[];
}

export function OverviewTab({
  profile,
  stats,
  recentReviews,
  recentPosts,
}: OverviewTabProps) {
  return (
    <div className="space-y-5">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <StatCard
          title="Profile Views"
          value={stats.views.value}
          change={stats.views.change}
          period={stats.views.period}
          icon={<Eye className="h-4 w-4" />}
        />
        <StatCard
          title="Search Appearances"
          value={stats.searches.value}
          change={stats.searches.change}
          period={stats.searches.period}
          icon={<Search className="h-4 w-4" />}
        />
        <StatCard
          title="Total Actions"
          value={stats.actions.value}
          change={stats.actions.change}
          period={stats.actions.period}
          icon={<MousePointer className="h-4 w-4" />}
        />
        <StatCard
          title="Phone Calls"
          value={stats.calls.value}
          change={stats.calls.change}
          period={stats.calls.period}
          icon={<Phone className="h-4 w-4" />}
        />
        <StatCard
          title="Directions"
          value={stats.directions.value}
          change={stats.directions.change}
          period={stats.directions.period}
          icon={<Navigation className="h-4 w-4" />}
        />
        <StatCard
          title="Website Clicks"
          value={stats.websiteClicks.value}
          change={stats.websiteClicks.change}
          period={stats.websiteClicks.period}
          icon={<Globe className="h-4 w-4" />}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left Column - 2/3 width */}
        <div className="lg:col-span-2 space-y-5">
          {/* Recent Reviews */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-[15px]">Recent Reviews</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground gap-1 text-[13px] h-8"
              >
                View All <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentReviews.slice(0, 3).map((review, index) => (
                <div key={review.id}>
                  {index > 0 && <Separator className="mb-4 bg-border/40" />}
                  <div className="flex gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={review.avatar} alt={review.author} />
                      <AvatarFallback className="text-xs">
                        {review.author[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-[13px]">
                            {review.author}
                          </span>
                          {review.isNew && (
                            <Badge
                              variant="secondary"
                              className="bg-blue-50/70 text-blue-600 dark:bg-blue-950 dark:text-blue-400 text-[10px] px-1.5 py-0 rounded-md"
                            >
                              New
                            </Badge>
                          )}
                        </div>
                        <span className="text-[11px] text-muted-foreground/60">
                          {review.date}
                        </span>
                      </div>
                      <div className="flex items-center gap-0.5 my-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < review.rating
                                ? "fill-amber-400 text-amber-400"
                                : "fill-muted/50 text-muted/50"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-[13px] text-muted-foreground/80 line-clamp-2">
                        {review.text}
                      </p>
                      {review.reply && (
                        <div className="mt-2 pl-3 border-l-2 border-border/40">
                          <p className="text-[11px] text-muted-foreground/70 line-clamp-1">
                            <span className="font-medium text-foreground/70">
                              Your reply:
                            </span>{" "}
                            {review.reply}
                          </p>
                        </div>
                      )}
                      {!review.reply && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="mt-1 h-7 text-[11px] text-muted-foreground hover:text-foreground px-2"
                        >
                          <MessageSquare className="h-3 w-3 mr-1" />
                          Reply
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Posts */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-[15px]">Recent Posts</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground gap-1 text-[13px] h-8"
              >
                View All <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {recentPosts.slice(0, 4).map((post) => (
                  <div
                    key={post.id}
                    className="group flex gap-3 p-3 rounded-xl border border-border/40 hover:border-border/60 hover:bg-accent/30 transition-all cursor-pointer"
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
                      <p className="text-[13px] font-medium line-clamp-1">
                        {post.title}
                      </p>
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
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-5">
          {/* Quick Info */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-[15px]">Quick Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-muted-foreground/60 mt-0.5" />
                <div>
                  <p className="text-[13px] font-medium">Address</p>
                  <p className="text-[13px] text-muted-foreground/70">
                    {profile.address.street}
                    <br />
                    {profile.address.city}, {profile.address.state}{" "}
                    {profile.address.zip}
                  </p>
                </div>
              </div>
              <Separator className="bg-border/40" />
              <div className="flex items-start gap-3">
                <Phone className="h-4 w-4 text-muted-foreground/60 mt-0.5" />
                <div>
                  <p className="text-[13px] font-medium">Phone</p>
                  <p className="text-[13px] text-muted-foreground/70">
                    {profile.phone}
                  </p>
                </div>
              </div>
              <Separator className="bg-border/40" />
              <div className="flex items-start gap-3">
                <Globe className="h-4 w-4 text-muted-foreground/60 mt-0.5" />
                <div>
                  <p className="text-[13px] font-medium">Website</p>
                  <a
                    href={profile.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[13px] text-muted-foreground/70 hover:text-foreground transition-colors"
                  >
                    {profile.website.replace("https://", "")}
                  </a>
                </div>
              </div>
              <Separator className="bg-border/40" />
              <div className="flex items-start gap-3">
                <Mail className="h-4 w-4 text-muted-foreground/60 mt-0.5" />
                <div>
                  <p className="text-[13px] font-medium">Email</p>
                  <p className="text-[13px] text-muted-foreground/70">
                    {profile.email}
                  </p>
                </div>
              </div>
              <Separator className="bg-border/40" />
              <div className="flex items-start gap-3">
                <Clock className="h-4 w-4 text-muted-foreground/60 mt-0.5" />
                <div>
                  <p className="text-[13px] font-medium">Today&apos;s Hours</p>
                  <p className="text-[13px] text-muted-foreground/70">
                    {profile.openingHours.find(
                      (h) =>
                        h.day ===
                        new Date().toLocaleDateString("en-US", {
                          weekday: "long",
                        })
                    )?.hours || "Closed"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Profile Completion */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-[15px]">
                  Profile Completion
                </CardTitle>
                <span className="text-xl font-semibold text-foreground">
                  {profile.profileCompletion}%
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Progress
                value={profile.profileCompletion}
                className="h-1.5 bg-muted/50"
              />
              <div className="space-y-2">
                {profile.profileCompletionItems.map((item) => (
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
                      className={
                        item.completed
                          ? "text-muted-foreground/60 line-through"
                          : "text-foreground/80"
                      }
                    >
                      {item.item}
                    </span>
                    {!item.completed && (
                      <Badge
                        variant="secondary"
                        className="ml-auto text-[10px] px-1.5 py-0 bg-amber-50/70 text-amber-600 dark:bg-amber-950 dark:text-amber-400 rounded-md"
                      >
                        To do
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Attributes */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-[15px]">Attributes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-1.5">
                {profile.attributes.map((attr) => (
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
        </div>
      </div>
    </div>
  );
}
