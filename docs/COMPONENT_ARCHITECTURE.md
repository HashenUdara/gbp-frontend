# Component Architecture Documentation

## Overview

This document outlines the component architecture and design patterns used in the GBP (Google Business Profile) Dashboard application.

## Directory Structure

```
components/
├── dashboard/
│   ├── tabs/
│   │   ├── index.ts           # Barrel export
│   │   ├── overview-tab.tsx
│   │   ├── analysis-tab.tsx
│   │   ├── photos-tab.tsx
│   │   ├── reviews-tab.tsx
│   │   ├── posts-tab.tsx
│   │   └── qna-tab.tsx
│   ├── stat-card.tsx
│   ├── stat-card-new.tsx      # Enhanced version with variants
│   └── profile-header.tsx
├── ui/
│   ├── primitives/
│   │   └── index.tsx          # EmptyState, StatusBadge, InfoItem, etc.
│   ├── filter.tsx             # FilterSelect, FilterBar, FilterChips
│   ├── data-list.tsx          # DataList, DataListItem
│   └── data-grid.tsx          # DataGrid, GridItem, GridCard
hooks/
├── index.ts                    # Barrel export
├── use-ui.ts                   # useDisclosure, useSelection, usePagination, etc.
└── use-filters.ts              # useFilters, useSearchFilter, useFilteredData
lib/
├── types.ts                    # Centralized type definitions
├── utils.ts                    # Utility functions
└── mock-data.ts                # Mock data and data types
```

## Design Patterns

### 1. Composition Pattern

Components are designed to be composable, accepting `children` props and render functions where appropriate.

```tsx
<DataList
  data={items}
  renderItem={(item) => <DataListItem {...item} />}
  emptyState={<EmptyState title="No items" />}
/>
```

### 2. Compound Components

Related components are grouped together and exported from a single file:

```tsx
// Using compound components
<FilterBar
  filters={filterDefinitions}
  values={filterValues}
  onChange={handleChange}
/>
```

### 3. Configuration Objects

Complex UI configurations are defined as typed objects:

```tsx
const STAT_CONFIGS: StatConfig[] = [
  { key: "views", title: "Profile Views", icon: Eye },
  { key: "searches", title: "Search Appearances", icon: Search },
];
```

### 4. Custom Hooks for State

Reusable hooks encapsulate common state patterns:

```tsx
const { filters, setFilter, resetAllFilters } = useFilters<ReviewFilters>({
  defaultFilters: DEFAULT_FILTERS,
});

const { isExpanded, toggle, expand, collapse } = useExpandedState<string>();
```

## Component Guidelines

### Props Naming Conventions

- Event handlers: `onEventName` (e.g., `onDelete`, `onClick`)
- Boolean flags: `isState` or `hasState` (e.g., `isLoading`, `hasError`)
- Callbacks that return data: `onActionComplete` (e.g., `onSelectComplete`)

### Component Structure

```tsx
"use client"; // If needed for client-side features

import * as React from "react";
// External dependencies
// Internal UI components
// Types from lib
// Utilities

// Types specific to this component
interface ComponentProps {
  // Required props first
  // Optional props second
  className?: string;
}

// Constants (outside component)
const CONFIG = {};

// Sub-components (if small and only used here)
function SubComponent() {}

// Main component
export function Component({ ...props }: ComponentProps) {
  // Hooks
  // State
  // Computed values (useMemo)
  // Callbacks (useCallback)
  // Effects

  return (
    // JSX
  );
}
```

## Styling Guidelines

### Tailwind CSS Patterns

- Use `cn()` utility for conditional classes
- Follow size variants: `sm`, `md`, `lg`
- Use semantic color variables: `text-muted-foreground`, `bg-accent`
- Dark mode: Use `dark:` prefix for dark mode variants

### Example:

```tsx
const variants = {
  default: "bg-primary text-white",
  outline: "border border-primary text-primary",
  ghost: "text-primary hover:bg-primary/10",
};

<button className={cn("px-4 py-2 rounded-md", variants[variant], className)} />;
```

## Available Primitives

### EmptyState

Displays when a list or section has no content.

```tsx
<EmptyState
  icon={Search}
  title="No results found"
  description="Try adjusting your search terms"
  action={<Button>Clear filters</Button>}
/>
```

### StatusBadge

Colored badge for displaying status.

```tsx
<StatusBadge status="success" variant="subtle">
  Published
</StatusBadge>
```

### InfoItem

Label-value pair with optional icon.

```tsx
<InfoItem icon={MapPin} label="Address" value="123 Main St, City, State" />
```

### TrendIndicator

Shows percentage change with arrow indicator.

```tsx
<TrendIndicator value={12.5} suffix="%" positiveIsGood />
```

## Available Hooks

### useDisclosure

Toggle state management.

```tsx
const { isOpen, open, close, toggle } = useDisclosure();
```

### useSelection

Multi-select state management.

```tsx
const { selectedItems, toggle, selectAll, clearSelection } = useSelection(
  items,
  (item) => item.id
);
```

### usePagination

Pagination state management.

```tsx
const { page, nextPage, prevPage, totalPages } = usePagination({
  total: 100,
  pageSize: 10,
});
```

### useExpandedState

Accordion/collapsible state management.

```tsx
const { isExpanded, toggle, expand, collapse } = useExpandedState<string>(
  defaultExpanded,
  allowMultiple
);
```

### useFilters

Generic filter state management.

```tsx
const { filters, setFilter, resetAllFilters } = useFilters({
  defaultFilters: { status: "all", type: "all" },
});
```

## Best Practices

1. **Keep components focused**: Each component should do one thing well
2. **Use TypeScript strictly**: Define proper types for all props
3. **Avoid prop drilling**: Use composition or context for deep data passing
4. **Memoize expensive computations**: Use `useMemo` for derived data
5. **Stabilize callbacks**: Use `useCallback` for event handlers passed to children
6. **Prefer controlled components**: Accept values and onChange handlers
7. **Document complex components**: Add JSDoc comments for public APIs
