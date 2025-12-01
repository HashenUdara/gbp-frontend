"use client";

import * as React from "react";

// ============================================
// Types
// ============================================

export type FilterValue = string | number | boolean | string[] | null;

export interface FilterState {
  [key: string]: FilterValue;
}

export interface FilterDefinition<T = FilterValue> {
  key: string;
  label: string;
  type: "select" | "multiselect" | "text" | "range" | "date" | "boolean";
  options?: { label: string; value: T }[];
  defaultValue?: T;
}

// ============================================
// useFilters - Generic filter state management
// ============================================

interface UseFiltersOptions<T extends FilterState> {
  initialFilters?: Partial<T>;
  defaultFilters?: T;
  onFiltersChange?: (filters: T) => void;
}

export function useFilters<T extends FilterState>({
  initialFilters = {} as Partial<T>,
  defaultFilters = {} as T,
  onFiltersChange,
}: UseFiltersOptions<T> = {}) {
  const [filters, setFilters] = React.useState<T>({
    ...defaultFilters,
    ...initialFilters,
  } as T);

  // Track if any filters are active (different from defaults)
  const activeFilterCount = React.useMemo(() => {
    return Object.keys(filters).filter((key) => {
      const value = filters[key];
      const defaultValue = defaultFilters[key];

      if (Array.isArray(value)) {
        return value.length > 0;
      }
      if (value === null || value === undefined || value === "") {
        return false;
      }
      return value !== defaultValue;
    }).length;
  }, [filters, defaultFilters]);

  const hasActiveFilters = activeFilterCount > 0;

  // Set a single filter value
  const setFilter = React.useCallback(
    <K extends keyof T>(key: K, value: T[K]) => {
      setFilters((prev) => {
        const next = { ...prev, [key]: value };
        onFiltersChange?.(next);
        return next;
      });
    },
    [onFiltersChange]
  );

  // Update multiple filters at once
  const updateFilters = React.useCallback(
    (updates: Partial<T>) => {
      setFilters((prev) => {
        const next = { ...prev, ...updates };
        onFiltersChange?.(next);
        return next;
      });
    },
    [onFiltersChange]
  );

  // Reset a single filter to default
  const resetFilter = React.useCallback(
    <K extends keyof T>(key: K) => {
      setFilters((prev) => {
        const next = { ...prev, [key]: defaultFilters[key] };
        onFiltersChange?.(next);
        return next;
      });
    },
    [defaultFilters, onFiltersChange]
  );

  // Reset all filters to defaults
  const resetAllFilters = React.useCallback(() => {
    setFilters(defaultFilters);
    onFiltersChange?.(defaultFilters);
  }, [defaultFilters, onFiltersChange]);

  // Toggle a value in a multiselect filter
  const toggleFilterValue = React.useCallback(
    <K extends keyof T>(key: K, value: string) => {
      setFilters((prev) => {
        const currentValue = prev[key];
        let newValue: string[];

        if (Array.isArray(currentValue)) {
          if (currentValue.includes(value)) {
            newValue = currentValue.filter((v) => v !== value);
          } else {
            newValue = [...currentValue, value];
          }
        } else {
          newValue = [value];
        }

        const next = { ...prev, [key]: newValue as T[K] };
        onFiltersChange?.(next);
        return next;
      });
    },
    [onFiltersChange]
  );

  // Check if a specific value is active in a filter
  const isFilterValueActive = React.useCallback(
    <K extends keyof T>(key: K, value: FilterValue): boolean => {
      const filterValue = filters[key];
      if (Array.isArray(filterValue)) {
        return filterValue.includes(value as string);
      }
      return filterValue === value;
    },
    [filters]
  );

  // Get filter value
  const getFilter = React.useCallback(
    <K extends keyof T>(key: K): T[K] => {
      return filters[key];
    },
    [filters]
  );

  return {
    filters,
    setFilter,
    updateFilters,
    resetFilter,
    resetAllFilters,
    toggleFilterValue,
    isFilterValueActive,
    getFilter,
    hasActiveFilters,
    activeFilterCount,
  };
}

// ============================================
// useSearchFilter - Text search with debounce
// ============================================

interface UseSearchFilterOptions {
  initialValue?: string;
  debounceMs?: number;
  onSearch?: (value: string) => void;
}

export function useSearchFilter({
  initialValue = "",
  debounceMs = 300,
  onSearch,
}: UseSearchFilterOptions = {}) {
  const [searchValue, setSearchValue] = React.useState(initialValue);
  const [debouncedValue, setDebouncedValue] = React.useState(initialValue);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(searchValue);
      onSearch?.(searchValue);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [searchValue, debounceMs, onSearch]);

  const clearSearch = React.useCallback(() => {
    setSearchValue("");
    setDebouncedValue("");
    onSearch?.("");
  }, [onSearch]);

  return {
    searchValue,
    setSearchValue,
    debouncedValue,
    clearSearch,
    hasSearch: searchValue.length > 0,
  };
}

// ============================================
// useFilteredData - Apply filters to data
// ============================================

type FilterPredicate<T, F extends FilterState> = (
  item: T,
  filters: F
) => boolean;

interface UseFilteredDataOptions<T, F extends FilterState> {
  data: T[];
  filters: F;
  filterFn: FilterPredicate<T, F>;
  searchValue?: string;
  searchFn?: (item: T, search: string) => boolean;
}

export function useFilteredData<T, F extends FilterState>({
  data,
  filters,
  filterFn,
  searchValue = "",
  searchFn,
}: UseFilteredDataOptions<T, F>): T[] {
  return React.useMemo(() => {
    let result = data;

    // Apply search filter if provided
    if (searchValue && searchFn) {
      result = result.filter((item) =>
        searchFn(item, searchValue.toLowerCase())
      );
    }

    // Apply filters
    result = result.filter((item) => filterFn(item, filters));

    return result;
  }, [data, filters, filterFn, searchValue, searchFn]);
}

// ============================================
// useSortedData - Sort data
// ============================================

type SortComparator<T> = (a: T, b: T) => number;
type SortDirection = "asc" | "desc";

interface UseSortedDataOptions<T, K extends string> {
  data: T[];
  sortKey?: K;
  sortDirection?: SortDirection;
  comparators: Record<K, SortComparator<T>>;
}

export function useSortedData<T, K extends string>({
  data,
  sortKey,
  sortDirection = "asc",
  comparators,
}: UseSortedDataOptions<T, K>): T[] {
  return React.useMemo(() => {
    if (!sortKey || !comparators[sortKey]) {
      return data;
    }

    const comparator = comparators[sortKey];
    const sorted = [...data].sort(comparator);

    return sortDirection === "desc" ? sorted.reverse() : sorted;
  }, [data, sortKey, sortDirection, comparators]);
}

// ============================================
// Preset filter helpers
// ============================================

// Date range filter
export interface DateRangeFilter {
  start: string | null;
  end: string | null;
}

export function createDateRangeFilter(
  range: DateRangeFilter,
  getDate: (item: unknown) => Date | string
): (item: unknown) => boolean {
  return (item) => {
    if (!range.start && !range.end) return true;

    const itemDate = new Date(getDate(item));
    if (range.start && itemDate < new Date(range.start)) return false;
    if (range.end && itemDate > new Date(range.end)) return false;

    return true;
  };
}

// Status filter
export function createStatusFilter<T>(
  status: string | string[] | null,
  getStatus: (item: T) => string
): (item: T) => boolean {
  return (item) => {
    if (!status || (Array.isArray(status) && status.length === 0)) return true;

    const itemStatus = getStatus(item);
    if (Array.isArray(status)) {
      return status.includes(itemStatus);
    }
    return itemStatus === status;
  };
}
