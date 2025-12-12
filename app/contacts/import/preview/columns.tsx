"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  CheckCircle2Icon,
  MoreHorizontalIcon,
  PencilIcon,
  Trash2Icon,
  XCircleIcon,
} from "lucide-react";
import { ImportRow } from "../import-context";
import { DataTableColumnHeader } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ColumnActions {
  onEdit: (row: ImportRow) => void;
  onDelete: (id: string) => void;
}

export function getImportPreviewColumns(
  actions: ColumnActions
): ColumnDef<ImportRow>[] {
  return [
    {
      id: "status",
      header: () => <span className="sr-only">Status</span>,
      cell: ({ row }) => {
        const isValid = row.original.isValid;
        const errors = row.original.errors;

        if (isValid) {
          return (
            <CheckCircle2Icon className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          );
        }

        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <XCircleIcon className="h-4 w-4 text-rose-600 dark:text-rose-400 cursor-help" />
              </TooltipTrigger>
              <TooltipContent side="right" className="max-w-48">
                {errors.map((err, i) => (
                  <p
                    key={i}
                    className="text-rose-600 dark:text-rose-400 text-xs"
                  >
                    {err}
                  </p>
                ))}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      },
      enableSorting: false,
      size: 50,
    },
    {
      accessorKey: "firstName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="First Name" />
      ),
      cell: ({ row }) => (
        <span className="font-medium">{row.original.firstName || "-"}</span>
      ),
    },
    {
      accessorKey: "lastName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Last Name" />
      ),
      cell: ({ row }) => row.original.lastName || "-",
    },
    {
      accessorKey: "email",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Email" />
      ),
      cell: ({ row }) => row.original.email || "-",
    },
    {
      accessorKey: "telephone",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Telephone" />
      ),
      cell: ({ row }) => row.original.telephone || "-",
    },
    {
      accessorKey: "isValid",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Valid" />
      ),
      cell: ({ row }) => (
        <span
          className={`text-xs font-medium ${
            row.original.isValid
              ? "text-emerald-600 dark:text-emerald-400"
              : "text-rose-600 dark:text-rose-400"
          }`}
        >
          {row.original.isValid ? "Yes" : "No"}
        </span>
      ),
      filterFn: (row, id, value) => {
        return value.includes(String(row.getValue(id)));
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => actions.onEdit(row.original)}>
                <PencilIcon className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => actions.onDelete(row.original.id)}
                className="text-destructive focus:text-destructive"
              >
                <Trash2Icon className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
      enableSorting: false,
      size: 50,
    },
  ];
}
