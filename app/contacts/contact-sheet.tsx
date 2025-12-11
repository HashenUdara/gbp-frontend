"use client";

import * as React from "react";
import { format, formatDistanceToNow } from "date-fns";
import {
  Mail,
  Phone,
  Calendar,
  Star,
  UserPlus,
  Send,
  CheckCircle2,
  XCircle,
  Eye,
  QrCode,
  Link2,
  Edit3,
  Award,
  Bell,
  UserX,
  Clock,
  Copy,
  Check,
  ChevronRight,
  Pencil,
  Trash2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";

import { Contact, TimelineEventType } from "./types";
import { sourceOptions, statusOptions } from "./data";

// Icon mapping for timeline events
const timelineIcons: Record<
  TimelineEventType,
  React.ComponentType<{ className?: string }>
> = {
  added: UserPlus,
  sms_sent: Send,
  sms_delivered: CheckCircle2,
  sms_opened: Eye,
  sms_failed: XCircle,
  qr_viewed: QrCode,
  link_clicked: Link2,
  review_started: Edit3,
  review_completed: Award,
  reminder_sent: Bell,
  unsubscribed: UserX,
};

// Minimal color scheme - just subtle tints
const eventColors: Record<TimelineEventType, string> = {
  added: "text-foreground",
  sms_sent: "text-foreground",
  sms_delivered: "text-emerald-600 dark:text-emerald-400",
  sms_opened: "text-foreground",
  sms_failed: "text-rose-600 dark:text-rose-400",
  qr_viewed: "text-foreground",
  link_clicked: "text-foreground",
  review_started: "text-foreground",
  review_completed: "text-emerald-600 dark:text-emerald-400",
  reminder_sent: "text-foreground",
  unsubscribed: "text-muted-foreground",
};

function getStatusConfig(status: string) {
  switch (status) {
    case "active":
      return {
        dot: "bg-emerald-500",
        text: "text-emerald-600 dark:text-emerald-400",
      };
    case "inactive":
      return { dot: "bg-rose-500", text: "text-rose-600 dark:text-rose-400" };
    case "pending":
      return {
        dot: "bg-amber-500",
        text: "text-amber-600 dark:text-amber-400",
      };
    default:
      return { dot: "bg-muted-foreground", text: "text-muted-foreground" };
  }
}

// Generate avatar hue based on name
function getAvatarHue(name: string): number {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % 360;
}

interface ContactSheetProps {
  contact: Contact | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit?: (contact: Contact) => void;
  onDelete?: (contact: Contact) => void;
}

export function ContactSheet({
  contact,
  open,
  onOpenChange,
  onEdit,
  onDelete,
}: ContactSheetProps) {
  const [copiedField, setCopiedField] = React.useState<string | null>(null);

  if (!contact) return null;

  const fullName = `${contact.firstName} ${contact.lastName}`;
  const initials = `${contact.firstName.charAt(0)}${contact.lastName.charAt(
    0
  )}`.toUpperCase();
  const hue = getAvatarHue(fullName);
  const sourceOption = sourceOptions.find((s) => s.value === contact.source);
  const statusOption = statusOptions.find((s) => s.value === contact.status);
  const statusConfig = getStatusConfig(contact.status);

  // Sort timeline by date, most recent first
  const sortedTimeline = [...contact.timeline].sort(
    (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
  );

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md p-0 overflow-hidden"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 pb-4">
            <div className="flex items-start gap-4">
              {/* Avatar */}
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-base font-semibold"
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

              <div className="flex-1 min-w-0">
                <h2 className="text-lg font-semibold tracking-tight">
                  {fullName}
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  {/* Inline action buttons */}
                  <div className="flex items-center gap-2">
                    {onEdit && (
                      <button
                        onClick={() => onEdit(contact)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border border-border/60 hover:bg-muted/50 transition-colors"
                      >
                        <Pencil className="h-3 w-3" />
                        Edit
                      </button>
                    )}
                    {onDelete && (
                      <button
                        onClick={() => {
                          onDelete(contact);
                          onOpenChange(false);
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border border-border/60 text-destructive hover:bg-destructive/10 hover:border-destructive/30 transition-colors"
                      >
                        <Trash2 className="h-3 w-3" />
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto px-6 pb-6">
            {/* Contact Section */}
            <div className="mt-5">
              <h3 className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-3">
                Contact
              </h3>
              <div className="space-y-2">
                {/* Email */}
                <button
                  onClick={() => copyToClipboard(contact.email, "email")}
                  className="w-full group"
                >
                  <div className="flex items-center justify-between p-3 rounded-lg border border-border/60 hover:border-border hover:bg-muted/30 transition-all">
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{contact.email}</span>
                    </div>
                    <span className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                      {copiedField === "email" ? (
                        <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                          <Check className="h-3 w-3" />
                        </span>
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                    </span>
                  </div>
                </button>

                {/* Phone */}
                <button
                  onClick={() => copyToClipboard(contact.telephone, "phone")}
                  className="w-full group"
                >
                  <div className="flex items-center justify-between p-3 rounded-lg border border-border/60 hover:border-border hover:bg-muted/30 transition-all">
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{contact.telephone}</span>
                    </div>
                    <span className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                      {copiedField === "phone" ? (
                        <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                          <Check className="h-3 w-3" />
                        </span>
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                    </span>
                  </div>
                </button>
              </div>
            </div>

            {/* Details Section */}
            <div className="mt-5">
              <h3 className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-3">
                Details
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {/* Source */}
                <div className="p-3 rounded-lg border border-border/60">
                  <p className="text-[11px] text-muted-foreground mb-1">
                    Source
                  </p>
                  <div className="flex items-center gap-2">
                    {sourceOption?.icon && (
                      <sourceOption.icon className="h-3.5 w-3.5 text-muted-foreground" />
                    )}
                    <span className="text-sm font-medium">
                      {sourceOption?.label}
                    </span>
                  </div>
                </div>

                {/* Added */}
                <div className="p-3 rounded-lg border border-border/60">
                  <p className="text-[11px] text-muted-foreground mb-1">
                    Added
                  </p>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-sm font-medium">
                      {format(contact.addedDate, "MMM d, yyyy")}
                    </span>
                  </div>
                </div>

                {/* Last Activity - spans full width */}
                {contact.lastActivity && (
                  <div className="col-span-2 p-3 rounded-lg border border-border/60">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="text-[11px] text-muted-foreground">
                          Last Activity
                        </span>
                      </div>
                      <span className="text-sm font-medium">
                        {formatDistanceToNow(contact.lastActivity, {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Divider */}
            <div className="my-5 h-px bg-border/60" />

            {/* Timeline */}
            <div>
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                  Activity
                </h3>
                <span className="text-xs text-muted-foreground">
                  {contact.timeline.length} events
                </span>
              </div>

              <div className="relative pl-3">
                {/* Vertical line - positioned to go through icon centers */}
                <div className="absolute left-[23px] top-0 bottom-0 w-px bg-border/40" />

                <div className="space-y-0">
                  {sortedTimeline.map((event, index) => {
                    const Icon = timelineIcons[event.type];
                    const color = eventColors[event.type];
                    const isSuccess =
                      event.type === "review_completed" ||
                      event.type === "sms_delivered";
                    const isFailed =
                      event.type === "sms_failed" ||
                      event.type === "unsubscribed";
                    const isFirst = index === 0;
                    const isLast = index === sortedTimeline.length - 1;

                    return (
                      <div
                        key={event.id}
                        className="relative flex gap-4 py-4 hover:bg-muted/20 rounded-lg transition-colors -ml-3 pl-3"
                      >
                        {/* Icon */}
                        <div
                          className={`relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-background border ${
                            isSuccess
                              ? "border-emerald-500/60"
                              : isFailed
                              ? "border-rose-500/60"
                              : "border-border"
                          }`}
                        >
                          <Icon className={`h-3 w-3 ${color}`} />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0 pt-0.5">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <h4 className="text-sm font-medium leading-tight">
                                {event.title}
                              </h4>
                              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                                {event.description}
                              </p>
                            </div>
                            <time className="text-[10px] text-muted-foreground shrink-0 pt-0.5">
                              {formatDistanceToNow(event.timestamp, {
                                addSuffix: true,
                              })}
                            </time>
                          </div>

                          {/* Star rating for reviews */}
                          {event.metadata?.rating && (
                            <div className="flex items-center gap-0.5 mt-2">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < (event.metadata?.rating as number)
                                      ? "fill-amber-400 text-amber-400"
                                      : "fill-muted text-muted"
                                  }`}
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Footer action */}
          {onEdit && (
            <div className="p-4 border-t bg-muted/30">
              <Button
                onClick={() => onEdit(contact)}
                className="w-full"
                variant="default"
              >
                Send Review Request
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
