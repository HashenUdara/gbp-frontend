// ============================================
// Centralized Type Definitions
// ============================================

import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

// ============================================
// Common Types
// ============================================

export type Status = "success" | "warning" | "error" | "info" | "neutral";
export type Size = "xs" | "sm" | "md" | "lg" | "xl";
export type Variant = "default" | "outline" | "ghost" | "link" | "destructive";

// ============================================
// Stat/Metric Types
// ============================================

export interface StatValue {
  value: number;
  change: number;
  period: string;
}

export interface StatConfig {
  key: string;
  title: string;
  icon: LucideIcon;
  format?: "number" | "currency" | "percentage";
}

// ============================================
// Filter Types
// ============================================

export interface FilterOption<T = string> {
  value: T;
  label: string;
  icon?: LucideIcon;
  count?: number;
}

export interface FilterConfig<T = string> {
  key: string;
  label: string;
  icon?: LucideIcon;
  options: FilterOption<T>[];
  defaultValue?: T;
}

// ============================================
// List/Grid Types
// ============================================

export interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
}

export interface SortState<T = string> {
  key: T;
  direction: "asc" | "desc";
}

// ============================================
// Action Types
// ============================================

export interface ActionItem {
  key: string;
  label: string;
  icon?: LucideIcon;
  variant?: "default" | "destructive";
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
  separator?: boolean;
}

// ============================================
// Navigation Types
// ============================================

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  badge?: string | number;
  isActive?: boolean;
  children?: NavItem[];
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

// ============================================
// Entity Item Base
// ============================================

export interface BaseEntity {
  id: string;
  createdAt?: string;
  updatedAt?: string;
}

// ============================================
// Component Prop Helpers
// ============================================

export type WithClassName<T = object> = T & {
  className?: string;
};

export type WithChildren<T = object> = T & {
  children?: ReactNode;
};

export type WithAsChild<T = object> = T & {
  asChild?: boolean;
};

// ============================================
// Render Prop Types
// ============================================

export type RenderFunction<T, R = ReactNode> = (item: T, index: number) => R;

// ============================================
// Response Types
// ============================================

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: string;
  meta?: {
    total: number;
    page: number;
    pageSize: number;
  };
}
