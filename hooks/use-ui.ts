"use client";

import * as React from "react";

// ============================================
// useDisclosure - Toggle state management
// ============================================

export function useDisclosure(defaultOpen = false) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  const open = React.useCallback(() => setIsOpen(true), []);
  const close = React.useCallback(() => setIsOpen(false), []);
  const toggle = React.useCallback(() => setIsOpen((prev) => !prev), []);

  return { isOpen, open, close, toggle, setIsOpen };
}

// ============================================
// useSelection - Multi-select state
// ============================================

export function useSelection<T>(items: T[], keyExtractor: (item: T) => string) {
  const [selectedKeys, setSelectedKeys] = React.useState<Set<string>>(
    new Set()
  );

  const select = React.useCallback(
    (item: T) => {
      const key = keyExtractor(item);
      setSelectedKeys((prev) => new Set([...prev, key]));
    },
    [keyExtractor]
  );

  const deselect = React.useCallback(
    (item: T) => {
      const key = keyExtractor(item);
      setSelectedKeys((prev) => {
        const next = new Set(prev);
        next.delete(key);
        return next;
      });
    },
    [keyExtractor]
  );

  const toggle = React.useCallback(
    (item: T) => {
      const key = keyExtractor(item);
      setSelectedKeys((prev) => {
        const next = new Set(prev);
        if (next.has(key)) {
          next.delete(key);
        } else {
          next.add(key);
        }
        return next;
      });
    },
    [keyExtractor]
  );

  const selectAll = React.useCallback(() => {
    setSelectedKeys(new Set(items.map(keyExtractor)));
  }, [items, keyExtractor]);

  const clearSelection = React.useCallback(() => {
    setSelectedKeys(new Set());
  }, []);

  const isSelected = React.useCallback(
    (item: T) => selectedKeys.has(keyExtractor(item)),
    [selectedKeys, keyExtractor]
  );

  const selectedItems = React.useMemo(
    () => items.filter((item) => selectedKeys.has(keyExtractor(item))),
    [items, selectedKeys, keyExtractor]
  );

  return {
    selectedKeys,
    selectedItems,
    selectedCount: selectedKeys.size,
    isSelected,
    select,
    deselect,
    toggle,
    selectAll,
    clearSelection,
    isAllSelected: selectedKeys.size === items.length && items.length > 0,
    isNoneSelected: selectedKeys.size === 0,
    isSomeSelected: selectedKeys.size > 0 && selectedKeys.size < items.length,
  };
}

// ============================================
// usePagination - Pagination state
// ============================================

interface UsePaginationOptions {
  initialPage?: number;
  pageSize?: number;
  total: number;
}

export function usePagination({
  initialPage = 1,
  pageSize = 10,
  total,
}: UsePaginationOptions) {
  const [page, setPage] = React.useState(initialPage);

  const totalPages = Math.ceil(total / pageSize);

  const canGoNext = page < totalPages;
  const canGoPrev = page > 1;

  const goToPage = React.useCallback(
    (newPage: number) => {
      const validPage = Math.max(1, Math.min(newPage, totalPages));
      setPage(validPage);
    },
    [totalPages]
  );

  const nextPage = React.useCallback(() => {
    if (canGoNext) setPage((p) => p + 1);
  }, [canGoNext]);

  const prevPage = React.useCallback(() => {
    if (canGoPrev) setPage((p) => p - 1);
  }, [canGoPrev]);

  const firstPage = React.useCallback(() => setPage(1), []);
  const lastPage = React.useCallback(() => setPage(totalPages), [totalPages]);

  const startIndex = (page - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, total);

  return {
    page,
    pageSize,
    totalPages,
    total,
    startIndex,
    endIndex,
    canGoNext,
    canGoPrev,
    goToPage,
    nextPage,
    prevPage,
    firstPage,
    lastPage,
    setPage,
  };
}

// ============================================
// useSort - Sorting state
// ============================================

type SortDirection = "asc" | "desc";

interface UseSortOptions<T extends string> {
  initialKey?: T;
  initialDirection?: SortDirection;
}

export function useSort<T extends string>({
  initialKey,
  initialDirection = "asc",
}: UseSortOptions<T> = {}) {
  const [sortKey, setSortKey] = React.useState<T | undefined>(initialKey);
  const [sortDirection, setSortDirection] =
    React.useState<SortDirection>(initialDirection);

  const toggleSort = React.useCallback(
    (key: T) => {
      if (sortKey === key) {
        setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
      } else {
        setSortKey(key);
        setSortDirection("asc");
      }
    },
    [sortKey]
  );

  const setSort = React.useCallback((key: T, direction: SortDirection) => {
    setSortKey(key);
    setSortDirection(direction);
  }, []);

  const clearSort = React.useCallback(() => {
    setSortKey(undefined);
    setSortDirection("asc");
  }, []);

  return {
    sortKey,
    sortDirection,
    toggleSort,
    setSort,
    clearSort,
    isSorted: sortKey !== undefined,
  };
}

// ============================================
// useLocalStorage - Persistent state
// ============================================

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = React.useState<T>(() => {
    if (typeof window === "undefined") return initialValue;

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = React.useCallback(
    (value: T | ((prev: T) => T)) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        if (typeof window !== "undefined") {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
      } catch (error) {
        console.error("Error saving to localStorage:", error);
      }
    },
    [key, storedValue]
  );

  return [storedValue, setValue];
}

// ============================================
// useDebounce - Debounced value
// ============================================

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

// ============================================
// useMediaQuery - Responsive breakpoints
// ============================================

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const media = window.matchMedia(query);
    setMatches(media.matches);

    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
}

// Preset breakpoint hooks
export const useIsMobile = () => useMediaQuery("(max-width: 639px)");
export const useIsTablet = () =>
  useMediaQuery("(min-width: 640px) and (max-width: 1023px)");
export const useIsDesktop = () => useMediaQuery("(min-width: 1024px)");

// ============================================
// useExpandedState - For accordion/collapsible
// ============================================

export function useExpandedState<T extends string>(
  defaultExpanded: T[] = [],
  allowMultiple = true
) {
  const [expandedIds, setExpandedIds] = React.useState<Set<T>>(
    new Set(defaultExpanded)
  );

  const toggle = React.useCallback(
    (id: T) => {
      setExpandedIds((prev) => {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
        } else {
          if (!allowMultiple) {
            next.clear();
          }
          next.add(id);
        }
        return next;
      });
    },
    [allowMultiple]
  );

  const expand = React.useCallback((id: T) => {
    setExpandedIds((prev) => new Set([...prev, id]));
  }, []);

  const collapse = React.useCallback((id: T) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }, []);

  const expandAll = React.useCallback((ids: T[]) => {
    setExpandedIds(new Set(ids));
  }, []);

  const collapseAll = React.useCallback(() => {
    setExpandedIds(new Set());
  }, []);

  const isExpanded = React.useCallback(
    (id: T) => expandedIds.has(id),
    [expandedIds]
  );

  return {
    expandedIds: Array.from(expandedIds),
    isExpanded,
    toggle,
    expand,
    collapse,
    expandAll,
    collapseAll,
  };
}
