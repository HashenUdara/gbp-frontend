"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Copy, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { format } from "date-fns";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTableColumnHeader } from "@/components/data-table";

import { Contact, TimelineEventType } from "./types";
import { sourceOptions } from "./data";

// Generate a consistent subtle hue based on name for avatar
function getAvatarHue(name: string): number {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % 360;
}

function getInitials(firstName: string, lastName: string): string {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}

// Status badge styles based on event type
function getStatusBadgeStyle(eventType: TimelineEventType): string {
  switch (eventType) {
    case "review_completed":
      return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
    case "sms_delivered":
    case "sms_opened":
    case "link_clicked":
      return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20";
    case "sms_sent":
    case "reminder_sent":
      return "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20";
    case "sms_failed":
      return "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20";
    case "unsubscribed":
      return "bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20";
    case "review_started":
    case "qr_viewed":
      return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20";
    default:
      return "bg-muted text-muted-foreground border-border";
  }
}

// Status filter options based on timeline event types
export const statusFilterOptions = [
  { value: "review_completed", label: "Reviewed" },
  { value: "link_clicked", label: "Link Clicked" },
  { value: "sms_sent", label: "SMS Sent" },
  { value: "sms_delivered", label: "SMS Delivered" },
  { value: "sms_failed", label: "SMS Failed" },
  { value: "reminder_sent", label: "Reminder Sent" },
  { value: "unsubscribed", label: "Unsubscribed" },
  { value: "added", label: "New" },
];

export function getColumns(
  onEdit: (contact: Contact) => void,
  onDelete: (contact: Contact) => void
): ColumnDef<Contact>[] {
  return [
    // 1. Name
    {
      id: "name",
      accessorFn: (row) => `${row.firstName} ${row.lastName}`,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
      cell: ({ row }) => {
        const firstName = row.original.firstName;
        const lastName = row.original.lastName;
        const fullName = `${firstName} ${lastName}`;
        const initials = getInitials(firstName, lastName);
        const hue = getAvatarHue(fullName);

        return (
          <div className="flex items-center gap-3">
            <div
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-xs font-medium"
              style={
                {
                  "--avatar-hue": hue,
                  backgroundColor:
                    "oklch(var(--avatar-bg-l) var(--avatar-bg-c) var(--avatar-hue))",
                  color:
                    "oklch(var(--avatar-text-l) var(--avatar-text-c) var(--avatar-hue))",
                } as React.CSSProperties
              }
            >
              {initials}
            </div>
            <span className="font-medium">{fullName}</span>
          </div>
        );
      },
      enableSorting: true,
      enableHiding: false,
    },
    // 2. Phone
    {
      accessorKey: "telephone",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Phone" />
      ),
      cell: ({ row }) => (
        <span className="text-muted-foreground">
          {row.getValue("telephone")}
        </span>
      ),
      enableSorting: false,
    },
    // 3. Email
    {
      accessorKey: "email",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Email" />
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">{row.getValue("email")}</span>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => {
              e.stopPropagation();
              navigator.clipboard.writeText(row.getValue("email"));
            }}
          >
            <Copy className="h-3 w-3" />
          </Button>
        </div>
      ),
      enableSorting: true,
    },
    // 4. Status
    {
      id: "status",
      accessorFn: (row) => {
        if (row.timeline.length === 0) return "added";
        const sorted = [...row.timeline].sort(
          (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
        );
        return sorted[0].type;
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        const timeline = row.original.timeline;
        if (timeline.length === 0) {
          return (
            <Badge
              variant="outline"
              className={`text-xs ${getStatusBadgeStyle("added")}`}
            >
              New
            </Badge>
          );
        }
        const sorted = [...timeline].sort(
          (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
        );
        const lastEvent = sorted[0];
        const statusOption = statusFilterOptions.find(
          (s) => s.value === lastEvent.type
        );

        return (
          <Badge
            variant="outline"
            className={`text-xs ${getStatusBadgeStyle(lastEvent.type)}`}
          >
            {statusOption?.label || lastEvent.title}
          </Badge>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
      enableSorting: true,
      sortingFn: (rowA, rowB) => {
        const aTimeline = rowA.original.timeline;
        const bTimeline = rowB.original.timeline;
        const aLatest =
          aTimeline.length > 0
            ? Math.max(...aTimeline.map((t) => t.timestamp.getTime()))
            : 0;
        const bLatest =
          bTimeline.length > 0
            ? Math.max(...bTimeline.map((t) => t.timestamp.getTime()))
            : 0;
        return aLatest - bLatest;
      },
    },
    // 5. Source
    {
      accessorKey: "source",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Source" />
      ),
      cell: ({ row }) => {
        const source = row.getValue("source") as string;
        const sourceOption = sourceOptions.find((s) => s.value === source);
        return (
          <span className="text-muted-foreground text-sm">
            {sourceOption?.label || source}
          </span>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
      enableSorting: true,
    },
    // 6. Added
    {
      accessorKey: "addedDate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Added" />
      ),
      cell: ({ row }) => {
        const date = row.getValue("addedDate") as Date;
        return (
          <span className="text-muted-foreground text-sm">
            {format(date, "MMM d, yyyy")}
          </span>
        );
      },
      enableSorting: true,
    },
    // 7. Actions
    {
      id: "actions",
      cell: ({ row }) => {
        const contact = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-8 w-8 p-0"
                onClick={(e) => e.stopPropagation()}
              >
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  navigator.clipboard.writeText(contact.email);
                }}
              >
                <Copy className="mr-2 h-4 w-4" />
                Copy email
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(contact);
                }}
              >
                <Pencil className="mr-2 h-4 w-4" />
                Edit contact
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(contact);
                }}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete contact
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}
