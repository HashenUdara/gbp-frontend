import {
  UserPlus,
  Upload,
  Globe,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import {
  Contact,
  ContactSource,
  ContactStatus,
  TimelineEventType,
} from "./types";

export const sourceOptions: {
  value: ContactSource;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { value: "manual", label: "Manual", icon: UserPlus },
  { value: "bulk_upload", label: "Bulk Upload", icon: Upload },
  { value: "crm_integration", label: "CRM Integration", icon: Globe },
];

export const statusOptions: {
  value: ContactStatus;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { value: "active", label: "Active", icon: CheckCircle },
  { value: "inactive", label: "Inactive", icon: XCircle },
  { value: "pending", label: "Pending", icon: Clock },
];

// Event type config for timeline display
export const timelineEventConfig: Record<
  TimelineEventType,
  { label: string; color: string }
> = {
  added: { label: "Contact Added", color: "text-blue-500" },
  sms_sent: { label: "SMS Sent", color: "text-sky-500" },
  sms_delivered: { label: "SMS Delivered", color: "text-teal-500" },
  sms_opened: { label: "SMS Opened", color: "text-emerald-500" },
  sms_failed: { label: "SMS Failed", color: "text-rose-500" },
  qr_viewed: { label: "QR Code Viewed", color: "text-violet-500" },
  link_clicked: { label: "Review Link Clicked", color: "text-amber-500" },
  review_started: { label: "Review Started", color: "text-orange-500" },
  review_completed: { label: "Review Completed", color: "text-green-500" },
  reminder_sent: { label: "Reminder Sent", color: "text-indigo-500" },
  unsubscribed: { label: "Unsubscribed", color: "text-gray-500" },
};

// Sample contacts with rich timeline data
export const sampleContacts: Contact[] = [
  {
    id: "1",
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@example.com",
    telephone: "+1 (555) 123-4567",
    source: "manual",
    status: "active",
    addedDate: new Date("2024-11-15"),
    lastActivity: new Date("2024-12-10"),
    reviewCount: 1,
    timeline: [
      {
        id: "t1-1",
        type: "added",
        title: "Contact Added",
        description: "Added manually by admin",
        timestamp: new Date("2024-11-15T10:30:00"),
      },
      {
        id: "t1-2",
        type: "sms_sent",
        title: "SMS Sent",
        description: "Review request SMS sent to +1 (555) 123-4567",
        timestamp: new Date("2024-11-15T10:35:00"),
      },
      {
        id: "t1-3",
        type: "sms_delivered",
        title: "SMS Delivered",
        description: "Message successfully delivered",
        timestamp: new Date("2024-11-15T10:35:30"),
      },
      {
        id: "t1-4",
        type: "link_clicked",
        title: "Review Link Clicked",
        description: "Opened review page from SMS link",
        timestamp: new Date("2024-11-16T14:22:00"),
      },
      {
        id: "t1-5",
        type: "review_completed",
        title: "Review Completed",
        description: "Left a 5-star review on Google",
        timestamp: new Date("2024-11-16T14:28:00"),
        metadata: { rating: 5, platform: "Google" },
      },
    ],
  },
  {
    id: "2",
    firstName: "Michael",
    lastName: "Chen",
    email: "m.chen@company.co",
    telephone: "+1 (555) 234-5678",
    source: "crm_integration",
    status: "active",
    addedDate: new Date("2024-11-20"),
    lastActivity: new Date("2024-12-08"),
    reviewCount: 0,
    timeline: [
      {
        id: "t2-1",
        type: "added",
        title: "Contact Added",
        description: "Imported from Salesforce CRM",
        timestamp: new Date("2024-11-20T09:00:00"),
      },
      {
        id: "t2-2",
        type: "sms_sent",
        title: "SMS Sent",
        description: "Review request SMS sent",
        timestamp: new Date("2024-11-20T09:15:00"),
      },
      {
        id: "t2-3",
        type: "sms_delivered",
        title: "SMS Delivered",
        description: "Message successfully delivered",
        timestamp: new Date("2024-11-20T09:15:45"),
      },
      {
        id: "t2-4",
        type: "reminder_sent",
        title: "Reminder Sent",
        description: "Follow-up SMS reminder sent",
        timestamp: new Date("2024-11-27T09:00:00"),
      },
      {
        id: "t2-5",
        type: "qr_viewed",
        title: "QR Code Viewed",
        description: "Scanned QR code from business card",
        timestamp: new Date("2024-12-08T16:45:00"),
      },
    ],
  },
  {
    id: "3",
    firstName: "Emily",
    lastName: "Rodriguez",
    email: "emily.r@startup.io",
    telephone: "+1 (555) 345-6789",
    source: "bulk_upload",
    status: "pending",
    addedDate: new Date("2024-12-01"),
    reviewCount: 0,
    timeline: [
      {
        id: "t3-1",
        type: "added",
        title: "Contact Added",
        description: "Imported via CSV bulk upload",
        timestamp: new Date("2024-12-01T11:00:00"),
      },
      {
        id: "t3-2",
        type: "sms_sent",
        title: "SMS Sent",
        description: "Review request SMS sent",
        timestamp: new Date("2024-12-01T11:30:00"),
      },
      {
        id: "t3-3",
        type: "sms_failed",
        title: "SMS Failed",
        description: "Delivery failed - invalid number format",
        timestamp: new Date("2024-12-01T11:31:00"),
      },
    ],
  },
  {
    id: "4",
    firstName: "James",
    lastName: "Wilson",
    email: "jwilson@enterprise.com",
    telephone: "+1 (555) 456-7890",
    source: "crm_integration",
    status: "active",
    addedDate: new Date("2024-12-05"),
    lastActivity: new Date("2024-12-11"),
    reviewCount: 1,
    timeline: [
      {
        id: "t4-1",
        type: "added",
        title: "Contact Added",
        description: "Synced from HubSpot CRM",
        timestamp: new Date("2024-12-05T08:00:00"),
      },
      {
        id: "t4-2",
        type: "sms_sent",
        title: "SMS Sent",
        description: "Review request SMS sent",
        timestamp: new Date("2024-12-05T08:30:00"),
      },
      {
        id: "t4-3",
        type: "sms_opened",
        title: "SMS Opened",
        description: "Message was opened",
        timestamp: new Date("2024-12-05T12:15:00"),
      },
      {
        id: "t4-4",
        type: "reminder_sent",
        title: "Reminder Sent",
        description: "Gentle reminder SMS sent",
        timestamp: new Date("2024-12-10T09:00:00"),
      },
      {
        id: "t4-5",
        type: "link_clicked",
        title: "Review Link Clicked",
        description: "Clicked on review link in SMS",
        timestamp: new Date("2024-12-11T10:30:00"),
      },
      {
        id: "t4-6",
        type: "review_started",
        title: "Review Started",
        description: "Started writing review",
        timestamp: new Date("2024-12-11T10:32:00"),
      },
      {
        id: "t4-7",
        type: "review_completed",
        title: "Review Completed",
        description: "Left a 4-star review on Google",
        timestamp: new Date("2024-12-11T10:38:00"),
        metadata: { rating: 4, platform: "Google" },
      },
    ],
  },
  {
    id: "5",
    firstName: "Olivia",
    lastName: "Brown",
    email: "olivia.brown@agency.net",
    telephone: "+1 (555) 567-8901",
    source: "manual",
    status: "inactive",
    addedDate: new Date("2024-10-28"),
    lastActivity: new Date("2024-11-05"),
    reviewCount: 0,
    timeline: [
      {
        id: "t5-1",
        type: "added",
        title: "Contact Added",
        description: "Added manually after store visit",
        timestamp: new Date("2024-10-28T15:00:00"),
      },
      {
        id: "t5-2",
        type: "sms_sent",
        title: "SMS Sent",
        description: "Review request SMS sent",
        timestamp: new Date("2024-10-28T15:30:00"),
      },
      {
        id: "t5-3",
        type: "sms_delivered",
        title: "SMS Delivered",
        description: "Message delivered successfully",
        timestamp: new Date("2024-10-28T15:30:30"),
      },
      {
        id: "t5-4",
        type: "reminder_sent",
        title: "Reminder Sent",
        description: "Follow-up reminder sent",
        timestamp: new Date("2024-11-04T10:00:00"),
      },
      {
        id: "t5-5",
        type: "unsubscribed",
        title: "Unsubscribed",
        description: "Opted out of SMS communications",
        timestamp: new Date("2024-11-05T09:22:00"),
      },
    ],
  },
  {
    id: "6",
    firstName: "David",
    lastName: "Kim",
    email: "david.kim@tech.io",
    telephone: "+1 (555) 678-9012",
    source: "bulk_upload",
    status: "active",
    addedDate: new Date("2024-12-08"),
    lastActivity: new Date("2024-12-09"),
    reviewCount: 0,
    timeline: [
      {
        id: "t6-1",
        type: "added",
        title: "Contact Added",
        description: "Imported via CSV bulk upload",
        timestamp: new Date("2024-12-08T14:00:00"),
      },
      {
        id: "t6-2",
        type: "sms_sent",
        title: "SMS Sent",
        description: "Review request SMS sent",
        timestamp: new Date("2024-12-08T14:30:00"),
      },
      {
        id: "t6-3",
        type: "sms_delivered",
        title: "SMS Delivered",
        description: "Message delivered successfully",
        timestamp: new Date("2024-12-08T14:30:45"),
      },
      {
        id: "t6-4",
        type: "link_clicked",
        title: "Review Link Clicked",
        description: "Opened review page",
        timestamp: new Date("2024-12-09T11:00:00"),
      },
    ],
  },
];
