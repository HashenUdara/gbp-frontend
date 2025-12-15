# Reusable Data Table Components

## Overview

The data table components have been refactored to be reusable across the application. They provide advanced features including:

- **Search & Filter**: Full-text search and faceted filtering
- **Sorting**: Click column headers to sort ascending/descending
- **Pagination**: Configurable page sizes (10, 20, 30, 40, 50 rows)
- **Column Visibility**: Toggle which columns are visible
- **Row Selection**: Select multiple rows for batch operations
- **Row Click**: Click rows to open detail dialogs

## Location

All reusable data table components are located in `/components/data-table/`:

```
components/data-table/
├── data-table.tsx                    # Main data table component
├── data-table-toolbar.tsx            # Configurable toolbar (search + filters)
├── data-table-pagination.tsx         # Pagination controls
├── data-table-view-options.tsx       # Column visibility toggle
├── data-table-column-header.tsx      # Sortable column headers
├── data-table-faceted-filter.tsx     # Multi-select filter component
└── index.ts                          # Barrel export
```

## Usage

### Basic Example

```tsx
import { DataTable } from '@/components/data-table'
import { createMyColumns } from './columns'

function MyManager() {
  const [data, setData] = useState([])
  
  const columns = createMyColumns({
    onEdit: handleEdit,
    onDelete: handleDelete,
  })

  return (
    <DataTable
      columns={columns}
      data={data}
      onRowClick={handleRowClick}
      toolbarConfig={{
        searchColumn: "name",
        searchPlaceholder: "Search...",
        filters: [
          {
            column: "status",
            title: "Status",
            options: statusOptions,
          },
        ],
      }}
    />
  )
}
```

### Column Definition

Create a columns file that exports a function to generate column definitions:

```tsx
import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "@/components/data-table"

interface MyColumnsProps {
  onEdit: (item: MyType) => void
  onDelete: (item: MyType) => void
}

export const createMyColumns = ({
  onEdit,
  onDelete,
}: MyColumnsProps): ColumnDef<MyType>[] => [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => row.getValue("name"),
  },
  // ... more columns
]
```

### Toolbar Configuration

The toolbar is highly configurable via the `toolbarConfig` prop:

```tsx
toolbarConfig={{
  // Optional: Enable search on a specific column
  searchColumn: "email",
  searchPlaceholder: "Search users...",
  
  // Optional: Add faceted filters
  filters: [
    {
      column: "role",
      title: "Role",
      options: [
        { value: "admin", label: "Admin" },
        { value: "user", label: "User" },
      ],
    },
  ],
}}
```

## Current Implementations

### 1. Flight Listings (`app/admin/flights`)

- Search by flight number
- Filter by status (Available, Limited, Almost Full, Sold Out)
- Click rows to view flight details
- Actions: Edit, Delete

### 2. Organization Management (`app/super-admin/organizations`)

- Search by organization name
- Click rows to view organization details
- Actions: Edit, Delete, Manage Admins

### 3. User Management (`app/super-admin/users`)

- Search by email
- Filter by role (User, Admin, Super Admin)
- Click rows to view user details
- Actions: Edit (update role), Delete

## Features

### Search

Full-text search on a configurable column:

```tsx
toolbarConfig={{
  searchColumn: "name",
  searchPlaceholder: "Search organizations...",
}}
```

### Filters

Multi-select faceted filters with counts:

```tsx
toolbarConfig={{
  filters: [
    {
      column: "status",
      title: "Status",
      options: [
        { value: "active", label: "Active" },
        { value: "inactive", label: "Inactive" },
      ],
    },
  ],
}}
```

### Sorting

All columns with `DataTableColumnHeader` support sorting:

```tsx
{
  accessorKey: "createdAt",
  header: ({ column }) => (
    <DataTableColumnHeader column={column} title="Created" />
  ),
}
```

### Pagination

Automatically included with page size selector:

- Sizes: 10, 20, 30, 40, 50 rows per page
- First/Previous/Next/Last page buttons
- Current page indicator

### Column Visibility

Users can toggle which columns to display:

- Click the "View" button in the toolbar
- Check/uncheck columns to show/hide

### Row Click

Handle row clicks to show details:

```tsx
<DataTable
  columns={columns}
  data={data}
  onRowClick={(row) => {
    setSelectedItem(row)
    setDetailsOpen(true)
  }}
/>
```

## Styling

The data table uses shadcn/ui components and Tailwind CSS:

- Responsive design (mobile, tablet, desktop)
- Dark mode support
- Hover states for interactive elements
- Loading states with spinners
- Empty states with helpful messages

## Accessibility

- Keyboard navigation support
- ARIA labels for screen readers
- Focus indicators
- Semantic HTML structure

## Performance

- Virtual scrolling for large datasets (via Tanstack Table)
- Memoized column definitions
- Efficient filtering and sorting
- Minimal re-renders

## Best Practices

1. **Column Factory**: Use a factory function to create columns with callbacks
2. **Type Safety**: Use TypeScript generics for type-safe columns
3. **Stop Propagation**: Stop event propagation in action buttons to prevent row clicks
4. **Loading States**: Show loading spinners during data fetches
5. **Empty States**: Provide helpful messages when no data is available
6. **Confirmation Dialogs**: Use dialogs for destructive actions
7. **Toast Notifications**: Show success/error messages after operations

## Migration Guide

To migrate an existing table to use the reusable data table:

1. Create a columns file with column definitions
2. Replace the simple Table component with DataTable
3. Add toolbar configuration for search and filters
4. Implement row click handler for details dialog
5. Update action handlers to work with the new structure

Example migration:

```tsx
// Before
<Table>
  <TableBody>
    {items.map(item => (
      <TableRow key={item.id}>
        <TableCell>{item.name}</TableCell>
        <TableCell>
          <Button onClick={() => handleEdit(item)}>Edit</Button>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>

// After
<DataTable
  columns={createItemColumns({ onEdit: handleEdit })}
  data={items}
  onRowClick={handleRowClick}
  toolbarConfig={{
    searchColumn: "name",
    searchPlaceholder: "Search items...",
  }}
/>
```
