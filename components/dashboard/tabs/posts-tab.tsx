"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Post } from "@/lib/mock-data";
import {
  Plus,
  Eye,
  MousePointer,
  Calendar,
  MoreHorizontal,
  Pencil,
  Trash2,
  Copy,
  Tag,
  CalendarDays,
  Megaphone,
  Package,
  Filter,
  Clock,
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface PostsTabProps {
  posts: Post[];
}

const postTypeIcons: Record<Post["type"], React.ReactNode> = {
  update: <Megaphone className="h-4 w-4" />,
  offer: <Tag className="h-4 w-4" />,
  event: <CalendarDays className="h-4 w-4" />,
  product: <Package className="h-4 w-4" />,
};

const postTypeLabels: Record<Post["type"], string> = {
  update: "Update",
  offer: "Offer",
  event: "Event",
  product: "Product",
};

const postTypeColors: Record<Post["type"], string> = {
  update: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400",
  offer:
    "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400",
  event: "bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-400",
  product: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400",
};

const statusColors: Record<Post["status"], string> = {
  published:
    "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400",
  scheduled: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400",
  draft: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400",
};

export function PostsTab({ posts }: PostsTabProps) {
  const [filterType, setFilterType] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const filteredPosts = posts.filter((post) => {
    const matchesType = filterType === "all" || post.type === filterType;
    const matchesStatus =
      filterStatus === "all" || post.status === filterStatus;
    return matchesType && matchesStatus;
  });

  const postCounts = {
    all: posts.length,
    published: posts.filter((p) => p.status === "published").length,
    scheduled: posts.filter((p) => p.status === "scheduled").length,
    draft: posts.filter((p) => p.status === "draft").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold">Posts</h2>
          <p className="text-sm text-muted-foreground">
            Share updates, offers, and events with your customers
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Create Post
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="flex items-center gap-6 p-4 bg-card border border-border rounded-xl">
        <button
          onClick={() => setFilterStatus("all")}
          className={cn(
            "text-center px-4 py-2 rounded-lg transition-colors",
            filterStatus === "all" ? "bg-accent" : "hover:bg-accent/50"
          )}
        >
          <p className="text-2xl font-semibold">{postCounts.all}</p>
          <p className="text-xs text-muted-foreground">Total Posts</p>
        </button>
        <Separator orientation="vertical" className="h-12" />
        <button
          onClick={() => setFilterStatus("published")}
          className={cn(
            "text-center px-4 py-2 rounded-lg transition-colors",
            filterStatus === "published" ? "bg-accent" : "hover:bg-accent/50"
          )}
        >
          <p className="text-2xl font-semibold text-emerald-600">
            {postCounts.published}
          </p>
          <p className="text-xs text-muted-foreground">Published</p>
        </button>
        <button
          onClick={() => setFilterStatus("scheduled")}
          className={cn(
            "text-center px-4 py-2 rounded-lg transition-colors",
            filterStatus === "scheduled" ? "bg-accent" : "hover:bg-accent/50"
          )}
        >
          <p className="text-2xl font-semibold text-blue-600">
            {postCounts.scheduled}
          </p>
          <p className="text-xs text-muted-foreground">Scheduled</p>
        </button>
        <button
          onClick={() => setFilterStatus("draft")}
          className={cn(
            "text-center px-4 py-2 rounded-lg transition-colors",
            filterStatus === "draft" ? "bg-accent" : "hover:bg-accent/50"
          )}
        >
          <p className="text-2xl font-semibold text-zinc-500">
            {postCounts.draft}
          </p>
          <p className="text-xs text-muted-foreground">Drafts</p>
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-[160px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="All types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="update">Updates</SelectItem>
            <SelectItem value="offer">Offers</SelectItem>
            <SelectItem value="event">Events</SelectItem>
            <SelectItem value="product">Products</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Create Post Card */}
        <Card className="border-2 border-dashed hover:border-primary hover:bg-accent/50 transition-colors cursor-pointer group">
          <CardContent className="flex flex-col items-center justify-center h-full min-h-[280px] gap-4">
            <div className="p-4 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <Plus className="h-8 w-8" />
            </div>
            <div className="text-center">
              <p className="font-medium">Create New Post</p>
              <p className="text-sm text-muted-foreground">
                Share an update, offer, or event
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Post Cards */}
        {filteredPosts.map((post) => (
          <Card key={post.id} className="overflow-hidden group">
            {/* Post Image */}
            {post.image ? (
              <div className="aspect-video bg-muted overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
            ) : (
              <div className="aspect-video bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center">
                <div className="p-4 rounded-full bg-primary/10 text-primary">
                  {postTypeIcons[post.type]}
                </div>
              </div>
            )}

            <CardContent className="p-4 space-y-3">
              {/* Badges */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge
                    className={cn("text-[10px]", postTypeColors[post.type])}
                  >
                    {postTypeIcons[post.type]}
                    <span className="ml-1">{postTypeLabels[post.type]}</span>
                  </Badge>
                  <Badge
                    className={cn("text-[10px]", statusColors[post.status])}
                  >
                    {post.status === "scheduled" && (
                      <Clock className="h-3 w-3 mr-1" />
                    )}
                    {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                  </Badge>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="gap-2">
                      <Pencil className="h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2">
                      <Copy className="h-4 w-4" />
                      Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="gap-2 text-destructive focus:text-destructive">
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Title & Content */}
              <div>
                <h3 className="font-medium line-clamp-1">{post.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                  {post.content}
                </p>
              </div>

              {/* Meta */}
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Eye className="h-3.5 w-3.5" />
                    {post.views.toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <MousePointer className="h-3.5 w-3.5" />
                    {post.clicks}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {post.date}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <Megaphone className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-1">No posts found</h3>
          <p className="text-sm text-muted-foreground">
            {filterType !== "all" || filterStatus !== "all"
              ? "Try adjusting your filters"
              : "Create your first post to engage with customers"}
          </p>
        </div>
      )}
    </div>
  );
}
