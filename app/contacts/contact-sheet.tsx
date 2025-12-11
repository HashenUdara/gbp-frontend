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
}

export function ContactSheet({
  contact,
  open,
  onOpenChange,
  onEdit,
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
          <div className="p-6 pb-0">
            <div className="flex items-start gap-4">
              {/* Avatar - clean, minimal */}
              <div
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-lg font-semibold"
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

              <div className="flex-1 min-w-0 pt-1">
                <h2 className="text-xl font-semibold tracking-tight">
                  {fullName}
                </h2>
                <div className="flex items-center gap-3 mt-1.5">
                  {/* Status - just text with dot */}
                  <span className="inline-flex items-center gap-1.5 text-sm">
                    <span
                      className={`h-2 w-2 rounded-full ${statusConfig.dot}`}
                    />
                    <span className={statusConfig.text}>
                      {statusOption?.label}
                    </span>
                  </span>

                  {contact.reviewCount > 0 && (
                    <>
                      <span className="text-muted-foreground/40">·</span>
                      <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                        <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                        {contact.reviewCount}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto px-6 pb-6">
            {/* Contact Details */}
            <div className="mt-6 space-y-1">
              {/* Email row */}
              <button
                onClick={() => copyToClipboard(contact.email, "email")}
                className="w-full flex items-center justify-between py-3 px-1 hover:bg-muted/50 rounded-lg transition-colors group -mx-1"
              >
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <div className="text-left">
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="text-sm">{contact.email}</p>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                  {copiedField === "email" ? (
                    <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                      <Check className="h-3 w-3" /> Copied
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <Copy className="h-3 w-3" /> Copy
                    </span>
                  )}
                </span>
              </button>

              {/* Phone row */}
              <button
                onClick={() => copyToClipboard(contact.telephone, "phone")}
                className="w-full flex items-center justify-between py-3 px-1 hover:bg-muted/50 rounded-lg transition-colors group -mx-1"
              >
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <div className="text-left">
                    <p className="text-xs text-muted-foreground">Phone</p>
                    <p className="text-sm">{contact.telephone}</p>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                  {copiedField === "phone" ? (
                    <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                      <Check className="h-3 w-3" /> Copied
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <Copy className="h-3 w-3" /> Copy
                    </span>
                  )}
                </span>
              </button>

              {/* Source row */}
              <div className="flex items-center gap-3 py-3 px-1">
                {sourceOption?.icon && (
                  <sourceOption.icon className="h-4 w-4 text-muted-foreground" />
                )}
                <div>
                  <p className="text-xs text-muted-foreground">Source</p>
                  <p className="text-sm">{sourceOption?.label}</p>
                </div>
              </div>

              {/* Added date row */}
              <div className="flex items-center gap-3 py-3 px-1">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Added</p>
                  <p className="text-sm">
                    {format(contact.addedDate, "MMM d, yyyy")}
                  </p>
                </div>
              </div>

              {contact.lastActivity && (
                <div className="flex items-center gap-3 py-3 px-1">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Last Activity
                    </p>
                    <p className="text-sm">
                      {formatDistanceToNow(contact.lastActivity, {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="my-6 h-px bg-border" />

            {/* Timeline */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium">Activity</h3>
                <span className="text-xs text-muted-foreground">
                  {contact.timeline.length} events
                </span>
              </div>

              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-[11px] top-2 bottom-2 w-px bg-border" />

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

                    return (
                      <div key={event.id} className="relative flex gap-4 py-3">
                        {/* Icon */}
                        <div
                          className={`relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-background border ${
                            isSuccess
                              ? "border-emerald-500/50"
                              : isFailed
                              ? "border-rose-500/50"
                              : "border-border"
                          }`}
                        >
                          <Icon className={`h-3 w-3 ${color}`} />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0 -mt-0.5">
                          <div className="flex items-baseline justify-between gap-2">
                            <h4 className="text-sm font-medium">
                              {event.title}
                            </h4>
                            <time className="text-[11px] text-muted-foreground shrink-0">
                              {formatDistanceToNow(event.timestamp, {
                                addSuffix: true,
                              })}
                            </time>
                          </div>
                          <p className="text-sm text-muted-foreground mt-0.5">
                            {event.description}
                          </p>

                          {/* Star rating for reviews */}
                          {event.metadata?.rating && (
                            <div className="flex items-center gap-0.5 mt-2">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-3.5 w-3.5 ${
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
