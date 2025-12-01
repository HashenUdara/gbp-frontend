"use client";

import * as React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// ============================================
// EmptyState - Reusable empty/placeholder state
// ============================================

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
  size = "md",
}: EmptyStateProps) {
  const sizes = {
    sm: { icon: "h-8 w-8", title: "text-sm", desc: "text-xs", gap: "gap-2" },
    md: {
      icon: "h-12 w-12",
      title: "text-base",
      desc: "text-sm",
      gap: "gap-3",
    },
    lg: {
      icon: "h-16 w-16",
      title: "text-lg",
      desc: "text-base",
      gap: "gap-4",
    },
  };

  const s = sizes[size];

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center p-8",
        s.gap,
        className
      )}
    >
      {Icon && (
        <div className="p-4 rounded-full bg-muted/50">
          <Icon className={cn(s.icon, "text-muted-foreground/50")} />
        </div>
      )}
      <div className="space-y-1">
        <h3 className={cn("font-medium text-foreground", s.title)}>{title}</h3>
        {description && (
          <p className={cn("text-muted-foreground", s.desc)}>{description}</p>
        )}
      </div>
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}

// ============================================
// StatusIndicator - Status dot with optional pulse
// ============================================

interface StatusIndicatorProps {
  status:
    | "online"
    | "offline"
    | "busy"
    | "away"
    | "success"
    | "warning"
    | "error";
  pulse?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function StatusIndicator({
  status,
  pulse = false,
  size = "md",
  className,
}: StatusIndicatorProps) {
  const colors = {
    online: "bg-emerald-500",
    offline: "bg-zinc-400",
    busy: "bg-red-500",
    away: "bg-amber-500",
    success: "bg-emerald-500",
    warning: "bg-amber-500",
    error: "bg-red-500",
  };

  const sizes = {
    sm: "h-1.5 w-1.5",
    md: "h-2 w-2",
    lg: "h-2.5 w-2.5",
  };

  return (
    <span
      className={cn(
        "rounded-full",
        colors[status],
        sizes[size],
        pulse && "animate-pulse",
        className
      )}
    />
  );
}

// ============================================
// InfoItem - Label + Value pair for displaying info
// ============================================

interface InfoItemProps {
  icon?: LucideIcon;
  label: string;
  value: React.ReactNode;
  className?: string;
  direction?: "horizontal" | "vertical";
  size?: "sm" | "md";
}

export function InfoItem({
  icon: Icon,
  label,
  value,
  className,
  direction = "vertical",
  size = "md",
}: InfoItemProps) {
  const isHorizontal = direction === "horizontal";
  const sizes = {
    sm: { label: "text-xs", value: "text-xs", icon: "h-3.5 w-3.5" },
    md: { label: "text-[13px]", value: "text-[13px]", icon: "h-4 w-4" },
  };
  const s = sizes[size];

  return (
    <div
      className={cn(
        "flex",
        isHorizontal ? "items-center gap-2" : "items-start gap-3",
        className
      )}
    >
      {Icon && (
        <Icon
          className={cn(s.icon, "text-muted-foreground/60 shrink-0 mt-0.5")}
        />
      )}
      <div className={cn(isHorizontal ? "flex items-center gap-2" : "")}>
        <p className={cn(s.label, "font-medium text-foreground")}>{label}</p>
        <div className={cn(s.value, "text-muted-foreground/70")}>{value}</div>
      </div>
    </div>
  );
}

// ============================================
// TrendIndicator - Show value change with arrow
// ============================================

interface TrendIndicatorProps {
  value: number;
  suffix?: string;
  positiveIsGood?: boolean;
  showIcon?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function TrendIndicator({
  value,
  suffix = "%",
  positiveIsGood = true,
  showIcon = true,
  size = "md",
  className,
}: TrendIndicatorProps) {
  const isPositive = value > 0;
  const isNeutral = value === 0;
  const isGood = isNeutral ? false : positiveIsGood ? isPositive : !isPositive;

  const colors = {
    good: "text-emerald-600",
    bad: "text-red-500",
    neutral: "text-muted-foreground",
  };

  const sizes = {
    sm: "text-[10px]",
    md: "text-xs",
    lg: "text-sm",
  };

  const color = isNeutral ? colors.neutral : isGood ? colors.good : colors.bad;

  return (
    <span
      className={cn(
        "flex items-center font-medium",
        color,
        sizes[size],
        className
      )}
    >
      {showIcon && (
        <span className="mr-0.5">
          {isPositive ? "↑" : isNeutral ? "→" : "↓"}
        </span>
      )}
      {Math.abs(value).toFixed(1)}
      {suffix}
    </span>
  );
}

// ============================================
// SectionHeader - Consistent section headers
// ============================================

interface SectionHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function SectionHeader({
  title,
  description,
  action,
  className,
  size = "md",
}: SectionHeaderProps) {
  const sizes = {
    sm: { title: "text-sm", desc: "text-xs" },
    md: { title: "text-lg", desc: "text-sm" },
    lg: { title: "text-xl", desc: "text-base" },
  };
  const s = sizes[size];

  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row sm:items-center justify-between gap-4",
        className
      )}
    >
      <div>
        <h2 className={cn("font-semibold text-foreground", s.title)}>
          {title}
        </h2>
        {description && (
          <p className={cn("text-muted-foreground mt-0.5", s.desc)}>
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

// ============================================
// Divider - Separator with optional label
// ============================================

interface DividerProps {
  label?: string;
  className?: string;
  orientation?: "horizontal" | "vertical";
}

export function Divider({
  label,
  className,
  orientation = "horizontal",
}: DividerProps) {
  if (orientation === "vertical") {
    return <div className={cn("w-px bg-border/40 self-stretch", className)} />;
  }

  if (label) {
    return (
      <div className={cn("flex items-center gap-3", className)}>
        <div className="flex-1 h-px bg-border/40" />
        <span className="text-xs text-muted-foreground">{label}</span>
        <div className="flex-1 h-px bg-border/40" />
      </div>
    );
  }

  return <div className={cn("h-px bg-border/40 w-full", className)} />;
}

// ============================================
// ClickableCard - Card with hover effects
// ============================================

interface ClickableCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  disabled?: boolean;
  selected?: boolean;
}

export function ClickableCard({
  children,
  disabled = false,
  selected = false,
  className,
  ...props
}: ClickableCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border/50 bg-card p-4 transition-all",
        !disabled && "cursor-pointer hover:border-border hover:bg-accent/30",
        selected && "border-primary bg-primary/5",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// ============================================
// LoadingSkeleton - Flexible loading skeleton
// ============================================

interface LoadingSkeletonProps {
  variant?: "text" | "avatar" | "card" | "custom";
  width?: string | number;
  height?: string | number;
  className?: string;
}

export function LoadingSkeleton({
  variant = "text",
  width,
  height,
  className,
}: LoadingSkeletonProps) {
  const variants = {
    text: "h-4 w-full rounded",
    avatar: "h-10 w-10 rounded-full",
    card: "h-32 w-full rounded-xl",
    custom: "",
  };

  return (
    <div
      className={cn("bg-muted animate-pulse", variants[variant], className)}
      style={{ width, height }}
    />
  );
}

// ============================================
// Counter Badge - Animated number badge
// ============================================

interface CounterBadgeProps {
  count: number;
  max?: number;
  variant?: "default" | "success" | "warning" | "error";
  className?: string;
}

export function CounterBadge({
  count,
  max = 99,
  variant = "default",
  className,
}: CounterBadgeProps) {
  const displayCount = count > max ? `${max}+` : count;

  const variants = {
    default: "bg-muted text-muted-foreground",
    success:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300",
    warning:
      "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300",
    error: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center min-w-5 h-5 px-1.5 text-[10px] font-medium rounded-full",
        variants[variant],
        className
      )}
    >
      {displayCount}
    </span>
  );
}

// ============================================
// StatusBadge - Colored badge for status display
// ============================================

type StatusType = "success" | "warning" | "error" | "info" | "neutral";

interface StatusBadgeProps {
  status: StatusType;
  children: React.ReactNode;
  variant?: "default" | "outline" | "subtle";
  size?: "sm" | "md";
  className?: string;
}

export function StatusBadge({
  status,
  children,
  variant = "default",
  size = "md",
  className,
}: StatusBadgeProps) {
  const statusColors = {
    success: {
      default: "bg-emerald-500 text-white",
      outline: "border-emerald-500 text-emerald-700 dark:text-emerald-400",
      subtle:
        "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400",
    },
    warning: {
      default: "bg-amber-500 text-white",
      outline: "border-amber-500 text-amber-700 dark:text-amber-400",
      subtle:
        "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400",
    },
    error: {
      default: "bg-red-500 text-white",
      outline: "border-red-500 text-red-700 dark:text-red-400",
      subtle: "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-400",
    },
    info: {
      default: "bg-blue-500 text-white",
      outline: "border-blue-500 text-blue-700 dark:text-blue-400",
      subtle: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400",
    },
    neutral: {
      default: "bg-zinc-500 text-white",
      outline: "border-zinc-500 text-zinc-700 dark:text-zinc-400",
      subtle: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400",
    },
  };

  const sizes = {
    sm: "text-[10px] px-1.5 py-0",
    md: "text-xs px-2 py-0.5",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded-md",
        variant === "outline" && "border",
        statusColors[status][variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
}

// ============================================
// InfoRow - Alias for InfoItem (for backwards compatibility)
// ============================================

export const InfoRow = InfoItem;

// ============================================
// Section - Container for content sections
// ============================================

interface SectionProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function Section({
  children,
  title,
  description,
  action,
  className,
}: SectionProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {(title || description || action) && (
        <SectionHeader
          title={title || ""}
          description={description}
          action={action}
        />
      )}
      {children}
    </div>
  );
}
