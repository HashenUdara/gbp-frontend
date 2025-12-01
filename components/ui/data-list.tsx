"use client";

import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn, getInitials } from "@/lib/utils";
import { EmptyState } from "@/components/ui/primitives";
import { ArrowRight, MoreHorizontal, LucideIcon } from "lucide-react";

// ============================================
// List Item Types
// ============================================

export interface ListItemAction {
  key: string;
  label: string;
  icon?: LucideIcon;
  onClick?: () => void;
  variant?: "default" | "destructive";
  separator?: boolean;
}

// ============================================
// DataListItem - Single item in a list
// ============================================

interface DataListItemProps {
  /** Avatar image URL */
  avatar?: string;
  /** Fallback text for avatar (usually initials) */
  avatarFallback?: string;
  /** Primary content/title */
  title: React.ReactNode;
  /** Secondary content */
  subtitle?: React.ReactNode;
  /** Content on the right side */
  trailing?: React.ReactNode;
  /** Meta information (date, status, etc.) */
  meta?: React.ReactNode;
  /** Actions dropdown items */
  actions?: ListItemAction[];
  /** Click handler for the whole item */
  onClick?: () => void;
  /** Additional class names */
  className?: string;
  /** Show separator after item */
  showSeparator?: boolean;
}

export function DataListItem({
  avatar,
  avatarFallback,
  title,
  subtitle,
  trailing,
  meta,
  actions,
  onClick,
  className,
  showSeparator = false,
}: DataListItemProps) {
  const content = (
    <div className="flex gap-3">
      {(avatar || avatarFallback) && (
        <Avatar className="h-9 w-9 shrink-0">
          <AvatarImage src={avatar} />
          <AvatarFallback className="text-xs">
            {avatarFallback || "?"}
          </AvatarFallback>
        </Avatar>
      )}
      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              {typeof title === "string" ? (
                <span className="font-medium text-[13px] truncate">
                  {title}
                </span>
              ) : (
                title
              )}
            </div>
            {meta && (
              <div className="text-[11px] text-muted-foreground/60 mt-0.5">
                {meta}
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {trailing}
            {actions && actions.length > 0 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-muted-foreground hover:text-foreground"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  {actions.map((action, index) => (
                    <React.Fragment key={action.key}>
                      {action.separator && index > 0 && (
                        <DropdownMenuSeparator />
                      )}
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          action.onClick?.();
                        }}
                        className={cn(
                          "gap-2 text-[13px]",
                          action.variant === "destructive" &&
                            "text-destructive focus:text-destructive"
                        )}
                      >
                        {action.icon && <action.icon className="h-3.5 w-3.5" />}
                        {action.label}
                      </DropdownMenuItem>
                    </React.Fragment>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
        {subtitle && (
          <div className="text-[13px] text-muted-foreground/80">{subtitle}</div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {onClick ? (
        <button
          onClick={onClick}
          className={cn(
            "w-full text-left p-3 rounded-lg hover:bg-accent/50 transition-colors",
            className
          )}
        >
          {content}
        </button>
      ) : (
        <div className={cn("p-3", className)}>{content}</div>
      )}
      {showSeparator && <Separator className="bg-border/40" />}
    </>
  );
}

// ============================================
// DataList - Container for list items
// ============================================

interface DataListProps<T> {
  /** Items to render */
  items: T[];
  /** Render function for each item */
  renderItem: (item: T, index: number) => React.ReactNode;
  /** Key extractor function */
  keyExtractor: (item: T) => string;
  /** Empty state props */
  emptyState?: {
    icon?: LucideIcon;
    title: string;
    description?: string;
    action?: React.ReactNode;
  };
  /** Loading state */
  loading?: boolean;
  /** Number of skeleton items when loading */
  skeletonCount?: number;
  /** Additional class names */
  className?: string;
  /** Show separators between items */
  showSeparators?: boolean;
}

export function DataList<T>({
  items,
  renderItem,
  keyExtractor,
  emptyState,
  loading = false,
  skeletonCount = 3,
  className,
  showSeparators = false,
}: DataListProps<T>) {
  if (loading) {
    return (
      <div className={cn("space-y-1", className)}>
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <div key={i} className="p-3 space-y-2">
            <div className="flex gap-3">
              <div className="h-9 w-9 rounded-full bg-muted animate-pulse" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-1/3 bg-muted animate-pulse rounded" />
                <div className="h-3 w-full bg-muted animate-pulse rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (items.length === 0 && emptyState) {
    return (
      <EmptyState
        icon={emptyState.icon}
        title={emptyState.title}
        description={emptyState.description}
        action={emptyState.action}
        className={className}
      />
    );
  }

  return (
    <div className={cn("space-y-1", className)}>
      {items.map((item, index) => (
        <React.Fragment key={keyExtractor(item)}>
          {renderItem(item, index)}
          {showSeparators && index < items.length - 1 && (
            <Separator className="bg-border/40" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

// ============================================
// DataListCard - Card wrapper with header
// ============================================

interface DataListCardProps<T> extends DataListProps<T> {
  /** Card title */
  title: string;
  /** View all link/action */
  viewAllHref?: string;
  viewAllLabel?: string;
  onViewAll?: () => void;
  /** Max items to show */
  maxItems?: number;
}

export function DataListCard<T>({
  title,
  viewAllHref,
  viewAllLabel = "View All",
  onViewAll,
  maxItems,
  items,
  ...listProps
}: DataListCardProps<T>) {
  const displayItems = maxItems ? items.slice(0, maxItems) : items;
  const hasMore = maxItems && items.length > maxItems;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-[15px]">{title}</CardTitle>
        {(viewAllHref || onViewAll || hasMore) && (
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground gap-1 text-[13px] h-8"
            onClick={onViewAll}
            asChild={!!viewAllHref}
          >
            {viewAllHref ? (
              <a href={viewAllHref}>
                {viewAllLabel} <ArrowRight className="h-3.5 w-3.5" />
              </a>
            ) : (
              <>
                {viewAllLabel} <ArrowRight className="h-3.5 w-3.5" />
              </>
            )}
          </Button>
        )}
      </CardHeader>
      <CardContent className="pt-0">
        <DataList items={displayItems} {...listProps} />
      </CardContent>
    </Card>
  );
}

// ============================================
// ReviewItem - Specialized list item for reviews
// ============================================

interface ReviewItemProps {
  author: string;
  avatar?: string;
  rating: number;
  date: string;
  text: string;
  reply?: string;
  isNew?: boolean;
  onReply?: () => void;
  className?: string;
}

export function ReviewItem({
  author,
  avatar,
  rating,
  date,
  text,
  reply,
  isNew,
  onReply,
  className,
}: ReviewItemProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <DataListItem
        avatar={avatar}
        avatarFallback={getInitials(author)}
        title={
          <span className="flex items-center gap-2">
            <span className="font-medium text-[13px]">{author}</span>
            {isNew && (
              <Badge
                variant="secondary"
                className="bg-blue-50/70 text-blue-600 dark:bg-blue-950 dark:text-blue-400 text-[10px] px-1.5 py-0"
              >
                New
              </Badge>
            )}
          </span>
        }
        subtitle={
          <p className="text-[13px] text-muted-foreground/80 line-clamp-2">
            {text}
          </p>
        }
        meta={date}
        trailing={
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                className={cn(
                  "h-3 w-3",
                  i < rating
                    ? "fill-amber-400 text-amber-400"
                    : "fill-muted/50 text-muted/50"
                )}
                viewBox="0 0 24 24"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
          </div>
        }
      />
      {reply && (
        <div className="ml-12 pl-3 border-l-2 border-border/40">
          <p className="text-[11px] text-muted-foreground/70 line-clamp-1">
            <span className="font-medium text-foreground/70">Your reply:</span>{" "}
            {reply}
          </p>
        </div>
      )}
      {!reply && onReply && (
        <div className="ml-12">
          <Button
            variant="ghost"
            size="sm"
            onClick={onReply}
            className="h-7 text-[11px] text-muted-foreground hover:text-foreground px-2"
          >
            Reply
          </Button>
        </div>
      )}
    </div>
  );
}
