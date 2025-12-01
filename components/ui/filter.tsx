"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { LucideIcon, X } from "lucide-react";

// ============================================
// Filter Types
// ============================================

export interface FilterOption<T = string> {
  value: T;
  label: string;
  icon?: LucideIcon;
  count?: number;
}

export interface FilterDefinition<T = string> {
  key: string;
  label: string;
  icon?: LucideIcon;
  options: FilterOption<T>[];
  defaultValue?: T;
}

// ============================================
// Single Filter Select
// ============================================

interface FilterSelectProps<T extends string = string> {
  filter: FilterDefinition<T>;
  value: T;
  onChange: (value: T) => void;
  className?: string;
  size?: "sm" | "md";
}

export function FilterSelect<T extends string = string>({
  filter,
  value,
  onChange,
  className,
  size = "md",
}: FilterSelectProps<T>) {
  const Icon = filter.icon;
  const sizeClasses = size === "sm" ? "h-8 text-xs" : "h-9 text-sm";

  return (
    <Select value={value} onValueChange={(v) => onChange(v as T)}>
      <SelectTrigger className={cn("w-40", sizeClasses, className)}>
        {Icon && <Icon className="h-4 w-4 mr-2 text-muted-foreground" />}
        <SelectValue placeholder={filter.label} />
      </SelectTrigger>
      <SelectContent>
        {filter.options.map((option) => {
          const OptionIcon = option.icon;
          return (
            <SelectItem key={String(option.value)} value={String(option.value)}>
              <span className="flex items-center gap-2">
                {OptionIcon && <OptionIcon className="h-3.5 w-3.5" />}
                {option.label}
                {option.count !== undefined && (
                  <span className="text-muted-foreground ml-auto">
                    ({option.count})
                  </span>
                )}
              </span>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}

// ============================================
// Filter Bar - Multiple filters in a row
// ============================================

interface FilterBarProps<T extends Record<string, string>> {
  filters: FilterDefinition[];
  values: T;
  onChange: (key: keyof T, value: string) => void;
  onClear?: () => void;
  className?: string;
}

export function FilterBar<T extends Record<string, string>>({
  filters,
  values,
  onChange,
  onClear,
  className,
}: FilterBarProps<T>) {
  const hasActiveFilters = filters.some((f) => {
    const value = values[f.key as keyof T];
    return value && value !== "all" && value !== f.defaultValue;
  });

  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      {filters.map((filter) => (
        <FilterSelect
          key={filter.key}
          filter={filter}
          value={
            values[filter.key as keyof T] ||
            (filter.defaultValue as string) ||
            "all"
          }
          onChange={(value) => onChange(filter.key as keyof T, value)}
        />
      ))}
      {hasActiveFilters && onClear && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClear}
          className="h-9 px-2 text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4 mr-1" />
          Clear
        </Button>
      )}
    </div>
  );
}

// ============================================
// Filter Chips - Badge-style filter selection
// ============================================

interface FilterChipsProps<T = string> {
  options: FilterOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
  variant?: "default" | "outline";
}

export function FilterChips<T extends string = string>({
  options,
  value,
  onChange,
  className,
  variant = "default",
}: FilterChipsProps<T>) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {options.map((option) => {
        const isActive = option.value === value;
        const Icon = option.icon;

        return (
          <Badge
            key={String(option.value)}
            variant={variant === "outline" ? "outline" : "secondary"}
            className={cn(
              "cursor-pointer transition-all",
              isActive
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "hover:bg-accent"
            )}
            onClick={() => onChange(option.value)}
          >
            {Icon && <Icon className="h-3 w-3 mr-1" />}
            {option.label}
            {option.count !== undefined && (
              <span
                className={cn("ml-1.5", isActive ? "opacity-70" : "opacity-50")}
              >
                {option.count}
              </span>
            )}
          </Badge>
        );
      })}
    </div>
  );
}

// ============================================
// Quick Filter Tabs - Button group style
// ============================================

interface QuickFilterTabsProps<T = string> {
  options: FilterOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
}

export function QuickFilterTabs<T extends string = string>({
  options,
  value,
  onChange,
  className,
}: QuickFilterTabsProps<T>) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-lg border border-border p-1 bg-muted/30",
        className
      )}
    >
      {options.map((option) => {
        const isActive = option.value === value;
        const Icon = option.icon;

        return (
          <button
            key={String(option.value)}
            onClick={() => onChange(option.value)}
            className={cn(
              "inline-flex items-center justify-center px-3 py-1.5 text-sm font-medium rounded-md transition-all",
              isActive
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {Icon && <Icon className="h-4 w-4 mr-1.5" />}
            {option.label}
            {option.count !== undefined && (
              <span
                className={cn(
                  "ml-1.5 text-xs",
                  isActive ? "text-muted-foreground" : "opacity-50"
                )}
              >
                {option.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

// ============================================
// useFilters Hook - Manage filter state
// ============================================

export function useFilters<T extends Record<string, string>>(
  initialValues: T
): {
  values: T;
  setValue: (key: keyof T, value: string) => void;
  setValues: (values: Partial<T>) => void;
  clear: () => void;
  isDefault: boolean;
} {
  const [values, setValuesState] = React.useState<T>(initialValues);

  const setValue = React.useCallback((key: keyof T, value: string) => {
    setValuesState((prev) => ({ ...prev, [key]: value }));
  }, []);

  const setValues = React.useCallback((newValues: Partial<T>) => {
    setValuesState((prev) => ({ ...prev, ...newValues }));
  }, []);

  const clear = React.useCallback(() => {
    setValuesState(initialValues);
  }, [initialValues]);

  const isDefault = React.useMemo(
    () => JSON.stringify(values) === JSON.stringify(initialValues),
    [values, initialValues]
  );

  return { values, setValue, setValues, clear, isDefault };
}

// Alias for backwards compatibility
export const QuickFilter = FilterChips;
