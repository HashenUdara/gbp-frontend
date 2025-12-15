"use client";

import { Table } from "@tanstack/react-table";
import { SearchIcon, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";

export interface ToolbarConfig {
  searchColumn?: string;
  searchPlaceholder?: string;
  filters?: {
    column: string;
    title: string;
    options: {
      label: string;
      value: string;
      icon?: React.ComponentType<{ className?: string }>;
    }[];
  }[];
}

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  config: ToolbarConfig;
}

export function DataTableToolbar<TData>({
  table,
  config,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {config.searchColumn && (
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
              <SearchIcon size={16} />
            </div>
            <Input
              placeholder={config.searchPlaceholder || "Search..."}
              value={
                (table
                  .getColumn(config.searchColumn)
                  ?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table
                  .getColumn(config.searchColumn!)
                  ?.setFilterValue(event.target.value)
              }
              className="peer ps-9 pe-9 h-9 w-[150px] lg:w-[360px]"
            />
          </div>
        )}
        {config.filters?.map(
          (filter) =>
            table.getColumn(filter.column) && (
              <DataTableFacetedFilter
                key={filter.column}
                column={table.getColumn(filter.column)}
                title={filter.title}
                options={filter.options}
              />
            )
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
