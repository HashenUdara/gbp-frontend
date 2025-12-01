"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { cn, formatNumber } from "@/lib/utils";
import { TrendIndicator } from "@/components/ui/primitives";
import { LucideIcon } from "lucide-react";

// ============================================
// StatCard Variants
// ============================================

export type StatCardVariant = "default" | "compact" | "minimal" | "featured";
export type StatCardSize = "sm" | "md" | "lg";

// ============================================
// Props Interface
// ============================================

export interface StatCardProps {
  /** Title/label of the stat */
  title: string;
  /** The main value to display */
  value: string | number;
  /** Percentage change (positive or negative) */
  change?: number;
  /** Time period for the change (e.g., "vs last month") */
  period?: string;
  /** Icon to display */
  icon?: LucideIcon;
  /** Additional className */
  className?: string;
  /** Visual variant */
  variant?: StatCardVariant;
  /** Size variant */
  size?: StatCardSize;
  /** Format type for the value */
  format?: "number" | "currency" | "percentage" | "none";
  /** Whether positive change is good (for color coding) */
  positiveIsGood?: boolean;
  /** Loading state */
  loading?: boolean;
  /** Click handler */
  onClick?: () => void;
}

// ============================================
// Size & Variant Configurations
// ============================================

const sizeConfig = {
  sm: {
    padding: "p-3",
    title: "text-[11px]",
    value: "text-lg",
    icon: "h-3.5 w-3.5",
    iconWrapper: "p-1.5",
    gap: "space-y-1",
  },
  md: {
    padding: "p-4",
    title: "text-[13px]",
    value: "text-[22px]",
    icon: "h-4 w-4",
    iconWrapper: "p-2",
    gap: "space-y-1.5",
  },
  lg: {
    padding: "p-5",
    title: "text-sm",
    value: "text-3xl",
    icon: "h-5 w-5",
    iconWrapper: "p-2.5",
    gap: "space-y-2",
  },
};

// ============================================
// Format Value Helper
// ============================================

function formatValue(
  val: string | number,
  format: StatCardProps["format"] = "number"
): string {
  if (typeof val === "string") return val;

  switch (format) {
    case "currency":
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        notation: val >= 10000 ? "compact" : "standard",
        maximumFractionDigits: 1,
      }).format(val);
    case "percentage":
      return `${val.toFixed(1)}%`;
    case "none":
      return val.toString();
    default:
      return formatNumber(val);
  }
}

// ============================================
// Loading Skeleton
// ============================================

function StatCardSkeleton({ size = "md" }: { size?: StatCardSize }) {
  const s = sizeConfig[size];
  return (
    <Card className={cn(s.padding, "border-border/50")}>
      <div className="flex items-start justify-between">
        <div className={cn(s.gap, "flex-1")}>
          <div className="h-3 w-20 bg-muted animate-pulse rounded" />
          <div className="h-6 w-16 bg-muted animate-pulse rounded" />
          <div className="h-3 w-24 bg-muted animate-pulse rounded" />
        </div>
        <div className="p-2 rounded-xl bg-muted animate-pulse h-8 w-8" />
      </div>
    </Card>
  );
}

// ============================================
// StatCard Component
// ============================================

export function StatCard({
  title,
  value,
  change,
  period,
  icon: Icon,
  className,
  variant = "default",
  size = "md",
  format = "number",
  positiveIsGood = true,
  loading = false,
  onClick,
}: StatCardProps) {
  const s = sizeConfig[size];

  if (loading) {
    return <StatCardSkeleton size={size} />;
  }

  const isClickable = !!onClick;
  const formattedValue = formatValue(value, format);

  // Default variant
  if (variant === "default") {
    return (
      <Card
        className={cn(
          s.padding,
          "border-border/50",
          isClickable &&
            "cursor-pointer hover:border-border/80 transition-colors",
          className
        )}
        onClick={onClick}
      >
        <div className="flex items-start justify-between">
          <div className={s.gap}>
            <p className={cn(s.title, "font-normal text-muted-foreground/80")}>
              {title}
            </p>
            <p
              className={cn(
                s.value,
                "font-semibold tracking-tight text-foreground"
              )}
            >
              {formattedValue}
            </p>
            {change !== undefined && (
              <div className="flex items-center gap-1.5 pt-0.5">
                <TrendIndicator
                  value={change}
                  positiveIsGood={positiveIsGood}
                  size={size === "lg" ? "md" : "sm"}
                />
                {period && (
                  <span className="text-[11px] text-muted-foreground/60">
                    {period}
                  </span>
                )}
              </div>
            )}
          </div>
          {Icon && (
            <div
              className={cn(
                s.iconWrapper,
                "rounded-xl bg-muted/50 text-muted-foreground/70"
              )}
            >
              <Icon className={s.icon} />
            </div>
          )}
        </div>
      </Card>
    );
  }

  // Compact variant - inline icon
  if (variant === "compact") {
    return (
      <Card
        className={cn(
          "p-3 border-border/50",
          isClickable &&
            "cursor-pointer hover:border-border/80 transition-colors",
          className
        )}
        onClick={onClick}
      >
        <div className="flex items-center gap-3">
          {Icon && (
            <div className="p-2 rounded-lg bg-muted/50 text-muted-foreground/70">
              <Icon className="h-4 w-4" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-xs text-muted-foreground/80 truncate">{title}</p>
            <div className="flex items-baseline gap-2">
              <p className="text-lg font-semibold tracking-tight">
                {formattedValue}
              </p>
              {change !== undefined && (
                <TrendIndicator
                  value={change}
                  positiveIsGood={positiveIsGood}
                  size="sm"
                />
              )}
            </div>
          </div>
        </div>
      </Card>
    );
  }

  // Minimal variant - no card styling
  if (variant === "minimal") {
    return (
      <div
        className={cn(
          "text-center px-4 py-3 rounded-lg transition-colors",
          isClickable && "cursor-pointer hover:bg-accent/50",
          className
        )}
        onClick={onClick}
      >
        <p className="text-2xl font-semibold text-foreground">
          {formattedValue}
        </p>
        <p className="text-xs text-muted-foreground mt-1">{title}</p>
        {change !== undefined && (
          <div className="flex items-center justify-center gap-1 mt-1">
            <TrendIndicator
              value={change}
              positiveIsGood={positiveIsGood}
              size="sm"
            />
          </div>
        )}
      </div>
    );
  }

  // Featured variant - larger, more prominent
  if (variant === "featured") {
    return (
      <Card
        className={cn(
          "p-6 border-border/50 bg-linear-to-br from-primary/5 to-transparent",
          isClickable &&
            "cursor-pointer hover:border-border/80 transition-colors",
          className
        )}
        onClick={onClick}
      >
        <div className="flex items-start justify-between mb-4">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          {Icon && (
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
              <Icon className="h-5 w-5" />
            </div>
          )}
        </div>
        <p className="text-4xl font-bold tracking-tight text-foreground mb-2">
          {formattedValue}
        </p>
        {change !== undefined && (
          <div className="flex items-center gap-2">
            <TrendIndicator
              value={change}
              positiveIsGood={positiveIsGood}
              size="md"
            />
            {period && (
              <span className="text-sm text-muted-foreground">{period}</span>
            )}
          </div>
        )}
      </Card>
    );
  }

  return null;
}

// ============================================
// StatCardGrid - Grid container for stat cards
// ============================================

interface StatCardGridProps {
  children: React.ReactNode;
  columns?: 2 | 3 | 4 | 5 | 6;
  className?: string;
}

export function StatCardGrid({
  children,
  columns = 6,
  className,
}: StatCardGridProps) {
  const colClasses = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-2 md:grid-cols-4",
    5: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5",
    6: "grid-cols-2 md:grid-cols-3 lg:grid-cols-6",
  };

  return (
    <div className={cn("grid gap-3", colClasses[columns], className)}>
      {children}
    </div>
  );
}
