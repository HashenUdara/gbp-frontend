"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { EmptyState } from "@/components/ui/primitives";
import { Post } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
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
  type LucideIcon,
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

// ============================================
// Types
// ============================================

interface PostsTabProps {
  posts: Post[];
  onCreate?: () => void;
  onEdit?: (post: Post) => void;
  onDelete?: (post: Post) => void;
  onDuplicate?: (post: Post) => void;
}

type PostType = Post["type"];
type PostStatus = Post["status"];

interface PostFilters {
  type: string;
  status: string;
}

// ============================================
// Constants
// ============================================

const POST_TYPE_CONFIG: Record<
  PostType,
  {
    icon: LucideIcon;
    label: string;
    color: string;
  }
> = {
  update: {
    icon: Megaphone,
    label: "Update",
    color: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400",
  },
  offer: {
    icon: Tag,
    label: "Offer",
    color:
      "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400",
  },
  event: {
    icon: CalendarDays,
    label: "Event",
    color:
      "bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-400",
  },
  product: {
    icon: Package,
    label: "Product",
    color: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400",
  },
};

const POST_STATUS_CONFIG: Record<PostStatus, { label: string; color: string }> =
  {
    published: {
      label: "Published",
      color:
        "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400",
    },
    scheduled: {
      label: "Scheduled",
      color: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400",
    },
    draft: {
      label: "Draft",
      color: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400",
    },
  };

const TYPE_FILTER_OPTIONS = [
  { value: "all", label: "All Types" },
  { value: "update", label: "Updates" },
  { value: "offer", label: "Offers" },
  { value: "event", label: "Events" },
  { value: "product", label: "Products" },
];

// ============================================
// Sub-components
// ============================================

interface PostStatsProps {
  posts: Post[];
  activeStatus: string;
  onStatusChange: (status: string) => void;
}

function PostStats({ posts, activeStatus, onStatusChange }: PostStatsProps) {
  const counts = React.useMemo(
    () => ({
      all: posts.length,
      published: posts.filter((p) => p.status === "published").length,
      scheduled: posts.filter((p) => p.status === "scheduled").length,
      draft: posts.filter((p) => p.status === "draft").length,
    }),
    [posts]
  );

  const stats = [
    {
      key: "all",
      label: "Total Posts",
      value: counts.all,
      color: "text-foreground",
    },
    {
      key: "published",
      label: "Published",
      value: counts.published,
      color: "text-emerald-600",
    },
    {
      key: "scheduled",
      label: "Scheduled",
      value: counts.scheduled,
      color: "text-blue-600",
    },
    {
      key: "draft",
      label: "Drafts",
      value: counts.draft,
      color: "text-zinc-500",
    },
  ];

  return (
    <div className="flex items-center gap-6 p-4 bg-card border border-border rounded-xl">
      {stats.map((stat, index) => (
        <React.Fragment key={stat.key}>
          {index > 0 && <Separator orientation="vertical" className="h-12" />}
          <button
            onClick={() => onStatusChange(stat.key)}
            className={cn(
              "text-center px-4 py-2 rounded-lg transition-colors",
              activeStatus === stat.key ? "bg-accent" : "hover:bg-accent/50"
            )}
          >
            <p className={cn("text-2xl font-semibold", stat.color)}>
              {stat.value}
            </p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </button>
        </React.Fragment>
      ))}
    </div>
  );
}

interface CreatePostCardProps {
  onClick?: () => void;
}

function CreatePostCard({ onClick }: CreatePostCardProps) {
  return (
    <Card
      className="border-2 border-dashed hover:border-primary hover:bg-accent/50 transition-colors cursor-pointer group"
      onClick={onClick}
    >
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
  );
}

interface PostCardProps {
  post: Post;
  onEdit?: () => void;
  onDelete?: () => void;
  onDuplicate?: () => void;
}

function PostCard({ post, onEdit, onDelete, onDuplicate }: PostCardProps) {
  const typeConfig = POST_TYPE_CONFIG[post.type];
  const statusConfig = POST_STATUS_CONFIG[post.status];
  const Icon = typeConfig.icon;

  return (
    <Card className="overflow-hidden group">
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
        <div className="aspect-video bg-linear-to-br from-primary/5 to-primary/10 flex items-center justify-center">
          <div className="p-4 rounded-full bg-primary/10 text-primary">
            <Icon className="h-6 w-6" />
          </div>
        </div>
      )}

      <CardContent className="p-4 space-y-3">
        {/* Badges */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge className={cn("text-[10px]", typeConfig.color)}>
              <Icon className="h-3 w-3 mr-1" />
              {typeConfig.label}
            </Badge>
            <Badge className={cn("text-[10px]", statusConfig.color)}>
              {post.status === "scheduled" && (
                <Clock className="h-3 w-3 mr-1" />
              )}
              {statusConfig.label}
            </Badge>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="gap-2" onClick={onEdit}>
                <Pencil className="h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2" onClick={onDuplicate}>
                <Copy className="h-4 w-4" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="gap-2 text-destructive focus:text-destructive"
                onClick={onDelete}
              >
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
  );
}

// ============================================
// Main Component
// ============================================

export function PostsTab({
  posts,
  onCreate,
  onEdit,
  onDelete,
  onDuplicate,
}: PostsTabProps) {
  const [filters, setFilters] = React.useState<PostFilters>({
    type: "all",
    status: "all",
  });

  // Filter posts
  const filteredPosts = React.useMemo(
    () =>
      posts.filter((post) => {
        const matchesType =
          filters.type === "all" || post.type === filters.type;
        const matchesStatus =
          filters.status === "all" || post.status === filters.status;
        return matchesType && matchesStatus;
      }),
    [posts, filters]
  );

  const handleStatusChange = React.useCallback((status: string) => {
    setFilters((prev) => ({ ...prev, status }));
  }, []);

  const handleTypeChange = React.useCallback((type: string) => {
    setFilters((prev) => ({ ...prev, type }));
  }, []);

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h2 className="text-base sm:text-lg font-semibold">Posts</h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Share updates, offers, and events with your customers
          </p>
        </div>
        <Button className="gap-1.5 sm:gap-2 h-9 sm:h-10 text-xs sm:text-sm w-fit" onClick={onCreate}>
          <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          Create Post
        </Button>
      </div>

      {/* Quick Stats */}
      <PostStats
        posts={posts}
        activeStatus={filters.status}
        onStatusChange={handleStatusChange}
      />

      {/* Filters */}
      <div className="flex items-center gap-2 sm:gap-3">
        <Select value={filters.type} onValueChange={handleTypeChange}>
          <SelectTrigger className="w-[130px] sm:w-40">
            <Filter className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
            <SelectValue placeholder="All types" />
          </SelectTrigger>
          <SelectContent>
            {TYPE_FILTER_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        <CreatePostCard onClick={onCreate} />

        {filteredPosts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onEdit={() => onEdit?.(post)}
            onDelete={() => onDelete?.(post)}
            onDuplicate={() => onDuplicate?.(post)}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredPosts.length === 0 && (
        <EmptyState
          icon={Megaphone}
          title="No posts found"
          description={
            filters.type !== "all" || filters.status !== "all"
              ? "Try adjusting your filters"
              : "Create your first post to engage with customers"
          }
          action={
            <Button onClick={onCreate} className="gap-2">
              <Plus className="h-4 w-4" />
              Create Post
            </Button>
          }
        />
      )}
    </div>
  );
}
