export type ContactSource = "manual" | "import" | "crm";

export type TimelineEventType =
  | "added"
  | "sms_sent"
  | "sms_delivered"
  | "sms_opened"
  | "sms_failed"
  | "qr_viewed"
  | "link_clicked"
  | "review_started"
  | "review_completed"
  | "reminder_sent"
  | "unsubscribed";

export interface TimelineEvent {
  id: string;
  type: TimelineEventType;
  title: string;
  description: string;
  timestamp: Date;
  metadata?: Record<string, string | number | boolean>;
}

export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
  source: ContactSource;
  notes?: string;
  addedDate: Date;
  lastActivity?: Date;
  reviewCount: number;
  timeline: TimelineEvent[];
}
