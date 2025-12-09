import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  boolean,
  integer,
  text,
  date,
  time,
} from "drizzle-orm/pg-core";
import { googleBusinessProfileLocations } from "../../schema";

// ============================================================================
// REVIEW LINKS - Main Configuration Table
// ============================================================================

export const reviewLinks = pgTable("review_links", {
  id: uuid("id").primaryKey().defaultRandom(),
  locationId: uuid("location_id")
    .references(() => googleBusinessProfileLocations.id)
    .notNull()
    .unique(), // One review link per location

  // Link Settings
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  isActive: boolean("is_active").default(true).notNull(),
  status: varchar("status", { length: 20 }).default("draft").notNull(), // 'draft' | 'published'

  // Appearance
  theme: varchar("theme", { length: 20 }).default("light").notNull(), // 'light' | 'dark' | 'gradient'
  primaryColor: varchar("primary_color", { length: 7 }).default("#22C55E"),
  gradientFrom: varchar("gradient_from", { length: 7 }),
  gradientTo: varchar("gradient_to", { length: 7 }),

  // Content
  headline: varchar("headline", { length: 255 }).default(
    "How was your experience?"
  ),
  subheadline: text("subheadline").default(
    "We value your feedback! Please take a moment to rate your visit."
  ),
  showBusinessName: boolean("show_business_name").default(true),
  showBusinessLogo: boolean("show_business_logo").default(true),
  showBusinessAddress: boolean("show_business_address").default(false),

  // Positive Response (high ratings)
  positiveHeadline: varchar("positive_headline", { length: 255 }).default(
    "Thank you! 🎉"
  ),
  positiveSubheadline: text("positive_subheadline").default(
    "We're thrilled you had a great experience! Would you mind sharing your feedback on Google?"
  ),
  positiveCtaText: varchar("positive_cta_text", { length: 100 }).default(
    "Leave a Google Review"
  ),
  positiveRedirectUrl: varchar("positive_redirect_url", { length: 500 }), // Google review URL

  // Negative Response (low ratings)
  negativeHeadline: varchar("negative_headline", { length: 255 }).default(
    "We're sorry to hear that"
  ),
  negativeSubheadline: text("negative_subheadline").default(
    "We appreciate your honesty. Please let us know how we can improve."
  ),
  negativeCtaText: varchar("negative_cta_text", { length: 100 }).default(
    "Submit Feedback"
  ),
  showFeedbackForm: boolean("show_feedback_form").default(true),
  feedbackPlaceholder: text("feedback_placeholder").default(
    "Tell us what went wrong and how we can make it right..."
  ),

  // Behavior
  minRatingToRedirect: integer("min_rating_to_redirect").default(4).notNull(), // 1-5

  // Top 5 Features
  logoUrl: varchar("logo_url", { length: 500 }), // Custom logo upload
  thankYouRedirectUrl: varchar("thank_you_redirect_url", { length: 500 }), // Redirect after review
  notifyEmail: varchar("notify_email", { length: 255 }), // Email for alerts
  notifyOnNegative: boolean("notify_on_negative").default(false), // Alert on low rating
  expiresAt: timestamp("expires_at"), // Link expiration

  // Audit
  createdBy: varchar("created_by", { length: 255 }),
  createdDate: timestamp("created_date").defaultNow().notNull(),
  modifiedBy: varchar("modified_by", { length: 255 }),
  modifiedDate: timestamp("modified_date"),
  publishedAt: timestamp("published_at"),
});

// ============================================================================
// REVIEW LINK VISITS - Analytics for Page Views
// ============================================================================

export const reviewLinkVisits = pgTable("review_link_visits", {
  id: uuid("id").primaryKey().defaultRandom(),
  reviewLinkId: uuid("review_link_id")
    .references(() => reviewLinks.id)
    .notNull(),

  // Visitor Info
  visitorId: varchar("visitor_id", { length: 255 }), // Anonymous session ID
  ipAddress: varchar("ip_address", { length: 45 }), // IPv4/IPv6
  userAgent: text("user_agent"),
  referrer: varchar("referrer", { length: 500 }),

  // Device & Location
  deviceType: varchar("device_type", { length: 20 }), // 'mobile' | 'desktop' | 'tablet'
  country: varchar("country", { length: 2 }), // ISO country code
  city: varchar("city", { length: 100 }),

  // UTM Tracking (Top 5 Feature)
  utmSource: varchar("utm_source", { length: 100 }),
  utmMedium: varchar("utm_medium", { length: 100 }),
  utmCampaign: varchar("utm_campaign", { length: 100 }),

  visitedAt: timestamp("visited_at").defaultNow().notNull(),
});

// ============================================================================
// REVIEW LINK INTERACTIONS - Rating & Click Tracking
// ============================================================================

export const reviewLinkInteractions = pgTable("review_link_interactions", {
  id: uuid("id").primaryKey().defaultRandom(),
  reviewLinkId: uuid("review_link_id")
    .references(() => reviewLinks.id)
    .notNull(),
  visitId: uuid("visit_id").references(() => reviewLinkVisits.id),

  rating: integer("rating"), // 1-5 stars selected
  actionType: varchar("action_type", { length: 50 }).notNull(), // 'rating_selected' | 'cta_clicked' | 'feedback_submitted'
  redirectUrl: varchar("redirect_url", { length: 500 }), // Where they were sent

  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ============================================================================
// REVIEW LINK FEEDBACK - Private Negative Feedback Storage
// ============================================================================

export const reviewLinkFeedback = pgTable("review_link_feedback", {
  id: uuid("id").primaryKey().defaultRandom(),
  reviewLinkId: uuid("review_link_id")
    .references(() => reviewLinks.id)
    .notNull(),
  interactionId: uuid("interaction_id").references(
    () => reviewLinkInteractions.id
  ),

  rating: integer("rating").notNull(), // 1-5 (stored for quick access)
  feedbackText: text("feedback_text"),
  contactEmail: varchar("contact_email", { length: 255 }),
  contactPhone: varchar("contact_phone", { length: 50 }),

  // Workflow
  status: varchar("status", { length: 50 }).default("new").notNull(), // 'new' | 'read' | 'resolved' | 'archived'
  internalNotes: text("internal_notes"),
  resolvedBy: varchar("resolved_by", { length: 255 }),
  resolvedAt: timestamp("resolved_at"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ============================================================================
// REVIEW LINK DAILY STATS - Aggregated Analytics
// ============================================================================

export const reviewLinkDailyStats = pgTable("review_link_daily_stats", {
  id: uuid("id").primaryKey().defaultRandom(),
  reviewLinkId: uuid("review_link_id")
    .references(() => reviewLinks.id)
    .notNull(),

  date: date("date").notNull(),

  // Counts
  totalVisits: integer("total_visits").default(0),
  uniqueVisitors: integer("unique_visitors").default(0),
  totalRatings: integer("total_ratings").default(0),
  positiveRatings: integer("positive_ratings").default(0),
  negativeRatings: integer("negative_ratings").default(0),
  ctaClicks: integer("cta_clicks").default(0),
  feedbackSubmitted: integer("feedback_submitted").default(0),

  // Rating Distribution
  rating1Count: integer("rating_1_count").default(0),
  rating2Count: integer("rating_2_count").default(0),
  rating3Count: integer("rating_3_count").default(0),
  rating4Count: integer("rating_4_count").default(0),
  rating5Count: integer("rating_5_count").default(0),
});

// ============================================================================
// Type Exports
// ============================================================================

export type ReviewLink = typeof reviewLinks.$inferSelect;
export type NewReviewLink = typeof reviewLinks.$inferInsert;

export type ReviewLinkVisit = typeof reviewLinkVisits.$inferSelect;
export type NewReviewLinkVisit = typeof reviewLinkVisits.$inferInsert;

export type ReviewLinkInteraction = typeof reviewLinkInteractions.$inferSelect;
export type NewReviewLinkInteraction =
  typeof reviewLinkInteractions.$inferInsert;

export type ReviewLinkFeedbackType = typeof reviewLinkFeedback.$inferSelect;
export type NewReviewLinkFeedback = typeof reviewLinkFeedback.$inferInsert;

export type ReviewLinkDailyStat = typeof reviewLinkDailyStats.$inferSelect;
export type NewReviewLinkDailyStat = typeof reviewLinkDailyStats.$inferInsert;
