"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EmptyState, ClickableCard } from "@/components/ui/primitives";
import { MoreHorizontal, LucideIcon, Upload } from "lucide-react";

// ============================================
// Grid Item Types
// ============================================

export interface GridItemAction {
  key: string;
  label: string;
  icon?: LucideIcon;
  onClick?: () => void;
  variant?: "default" | "destructive";
  separator?: boolean;
}

// ============================================
// MediaCard - For photos/images
// ============================================

interface MediaCardProps {
  src: string;
  alt?: string;
  badge?: string;
  badgeColor?: string;
  overlay?: React.ReactNode;
  actions?: GridItemAction[];
  onClick?: () => void;
  aspectRatio?: "square" | "video" | "portrait";
  className?: string;
}

export function MediaCard({
  src,
  alt = "Image",
  badge,
  badgeColor,
  overlay,
  actions,
  onClick,
  aspectRatio = "video",
  className,
}: MediaCardProps) {
  const aspectClasses = {
    square: "aspect-square",
    video: "aspect-video",
    portrait: "aspect-[3/4]",
  };

  return (
    <div
      className={cn(
        "group relative rounded-xl overflow-hidden border border-border bg-card",
        aspectClasses[aspectRatio],
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover transition-transform group-hover:scale-105"
      />

      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      {/* Badge */}
      {badge && (
        <Badge
          className={cn(
            "absolute top-2 left-2 text-[10px]",
            badgeColor ||
              "bg-zinc-900/70 text-white dark:bg-zinc-100/70 dark:text-black"
          )}
        >
          {badge}
        </Badge>
      )}

      {/* Custom overlay content */}
      {overlay && (
        <div className="absolute inset-0 flex items-end opacity-0 group-hover:opacity-100 transition-opacity">
          {overlay}
        </div>
      )}

      {/* Actions menu */}
      {actions && actions.length > 0 && (
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="secondary"
                size="icon"
                className="h-7 w-7 bg-white/90 hover:bg-white text-foreground"
                onClick={(e) => e.stopPropagation()}
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              {actions.map((action, index) => (
                <React.Fragment key={action.key}>
                  {action.separator && index > 0 && <DropdownMenuSeparator />}
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation();
                      action.onClick?.();
                    }}
                    className={cn(
                      "gap-2",
                      action.variant === "destructive" &&
                        "text-destructive focus:text-destructive"
                    )}
                  >
                    {action.icon && <action.icon className="h-4 w-4" />}
                    {action.label}
                  </DropdownMenuItem>
                </React.Fragment>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  );
}

// ============================================
// ContentCard - For posts/content items
// ============================================

interface ContentCardProps {
  image?: string;
  imagePlaceholder?: React.ReactNode;
  badge?: string;
  badgeColor?: string;
  title: string;
  subtitle?: string;
  meta?: React.ReactNode;
  footer?: React.ReactNode;
  actions?: GridItemAction[];
  onClick?: () => void;
  className?: string;
}

export function ContentCard({
  image,
  imagePlaceholder,
  badge,
  badgeColor,
  title,
  subtitle,
  meta,
  footer,
  actions,
  onClick,
  className,
}: ContentCardProps) {
  return (
    <ClickableCard
      onClick={onClick}
      className={cn("overflow-hidden p-0", className)}
    >
      {/* Image or placeholder */}
      {(image || imagePlaceholder) && (
        <div className="aspect-video bg-muted overflow-hidden relative">
          {image ? (
            <img
              src={image}
              alt={title}
              className="h-full w-full object-cover group-hover:scale-105 transition-transform"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center">
              {imagePlaceholder}
            </div>
          )}
          {badge && (
            <Badge
              className={cn("absolute top-2 left-2 text-[10px]", badgeColor)}
            >
              {badge}
            </Badge>
          )}
        </div>
      )}

      {/* Content */}
      <div className="p-4 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            {meta && (
              <div className="text-[10px] text-muted-foreground/60 mb-1">
                {meta}
              </div>
            )}
            <h4 className="font-medium text-[13px] line-clamp-1">{title}</h4>
            {subtitle && (
              <p className="text-[12px] text-muted-foreground/70 line-clamp-2 mt-1">
                {subtitle}
              </p>
            )}
          </div>
          {actions && actions.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 shrink-0 text-muted-foreground hover:text-foreground"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                {actions.map((action, index) => (
                  <React.Fragment key={action.key}>
                    {action.separator && index > 0 && <DropdownMenuSeparator />}
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation();
                        action.onClick?.();
                      }}
                      className={cn(
                        "gap-2",
                        action.variant === "destructive" &&
                          "text-destructive focus:text-destructive"
                      )}
                    >
                      {action.icon && <action.icon className="h-4 w-4" />}
                      {action.label}
                    </DropdownMenuItem>
                  </React.Fragment>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
        {footer && (
          <div className="pt-2 border-t border-border/40">{footer}</div>
        )}
      </div>
    </ClickableCard>
  );
}

// ============================================
// UploadCard - Placeholder for upload action
// ============================================

interface UploadCardProps {
  onClick?: () => void;
  title?: string;
  description?: string;
  accept?: string;
  aspectRatio?: "square" | "video" | "portrait";
  className?: string;
}

export function UploadCard({
  onClick,
  title = "Upload",
  description,
  aspectRatio = "video",
  className,
}: UploadCardProps) {
  const aspectClasses = {
    square: "aspect-square",
    video: "aspect-video",
    portrait: "aspect-[3/4]",
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        "border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center gap-3 hover:border-primary hover:bg-accent/50 transition-colors cursor-pointer group",
        aspectClasses[aspectRatio],
        className
      )}
    >
      <div className="p-3 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
        <Upload className="h-6 w-6" />
      </div>
      <div className="text-center">
        <p className="text-sm font-medium">{title}</p>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
  );
}

// ============================================
// DataGrid - Grid container for cards
// ============================================

interface DataGridProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  keyExtractor: (item: T) => string;
  emptyState?: {
    icon?: LucideIcon;
    title: string;
    description?: string;
    action?: React.ReactNode;
  };
  loading?: boolean;
  skeletonCount?: number;
  columns?: 2 | 3 | 4 | 5;
  gap?: "sm" | "md" | "lg";
  prependItems?: React.ReactNode;
  className?: string;
}

export function DataGrid<T>({
  items,
  renderItem,
  keyExtractor,
  emptyState,
  loading = false,
  skeletonCount = 6,
  columns = 3,
  gap = "md",
  prependItems,
  className,
}: DataGridProps<T>) {
  const columnClasses = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
    5: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
  };

  const gapClasses = {
    sm: "gap-2",
    md: "gap-4",
    lg: "gap-6",
  };

  if (loading) {
    return (
      <div
        className={cn(
          "grid",
          columnClasses[columns],
          gapClasses[gap],
          className
        )}
      >
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <div
            key={i}
            className="aspect-video rounded-xl bg-muted animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (items.length === 0 && emptyState && !prependItems) {
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
    <div
      className={cn("grid", columnClasses[columns], gapClasses[gap], className)}
    >
      {prependItems}
      {items.map((item, index) => (
        <React.Fragment key={keyExtractor(item)}>
          {renderItem(item, index)}
        </React.Fragment>
      ))}
    </div>
  );
}
