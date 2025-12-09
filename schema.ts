import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  boolean,
  integer,
  text,
} from "drizzle-orm/pg-core";

// Users table
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  clerkId: varchar("clerk_id", { length: 255 }).unique().notNull(),
  firstName: varchar("first_name", { length: 255 }),
  lastName: varchar("last_name", { length: 255 }),
  email: varchar("email", { length: 255 }),
  phone: varchar("phone", { length: 50 }),
  timezone: varchar("timezone", { length: 100 }),
  lifetimeValue: integer("lifetime_value"),
  status: integer("status"),
  createdBy: varchar("created_by", { length: 255 }),
  createdDate: timestamp("created_date"),
  modifiedBy: varchar("modified_by", { length: 255 }),
  modifiedDate: timestamp("modified_date"),
});

// Logins table
export const logins = pgTable("logins", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id),
  userToken: varchar("user_token", { length: 255 }),
  createdBy: varchar("created_by", { length: 255 }),
  createdDate: timestamp("created_date"),
  modifiedBy: varchar("modified_by", { length: 255 }),
  modifiedDate: timestamp("modified_date"),
});

// Provider table
export const provider = pgTable("provider", {
  id: integer("id").primaryKey(),
  name: varchar("name", { length: 255 }),
  accessToken: varchar("access_token", { length: 500 }),
  status: varchar("status", { length: 50 }),
  createdBy: varchar("created_by", { length: 255 }),
  createdDate: timestamp("created_date"),
  modifiedBy: varchar("modified_by", { length: 255 }),
  modifiedDate: timestamp("modified_date"),
});

// CRMIntegration table
export const crmIntegration = pgTable("crm_integration", {
  id: uuid("id").primaryKey().defaultRandom(),
  customerIntegrationId: uuid("customer_integration_id"),
  guid: uuid("guid"),
  name: varchar("name", { length: 255 }),
  refreshToken: varchar("refresh_token", { length: 500 }),
  accessToken: varchar("access_token", { length: 500 }),
  tokenExpiry: timestamp("token_expiry"),
  status: varchar("status", { length: 50 }),
  isActive: boolean("is_active"),
  createdBy: varchar("created_by", { length: 255 }),
  createdDate: timestamp("created_date"),
  modifiedBy: varchar("modified_by", { length: 255 }),
  modifiedDate: timestamp("modified_date"),
});

// IntegrationTypes table
export const integrationTypes = pgTable("integration_types", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }),
  isActive: boolean("is_active"),
  createdBy: varchar("created_by", { length: 255 }),
  createdDate: timestamp("created_date"),
  modifiedBy: varchar("modified_by", { length: 255 }),
  modifiedDate: timestamp("modified_date"),
});

// CustomerIntegrations table
export const customerIntegrations = pgTable("customer_integrations", {
  id: uuid("id").primaryKey().defaultRandom(),
  customerId: uuid("customer_id"),
  integrationId: uuid("integration_id").references(() => integrationTypes.id),
  status: varchar("status", { length: 50 }),
  createdBy: varchar("created_by", { length: 255 }),
  createdDate: timestamp("created_date"),
  modifiedBy: varchar("modified_by", { length: 255 }),
  modifiedDate: timestamp("modified_date"),
});

// GoogleBusinessProfile table
export const googleBusinessProfile = pgTable("google_business_profile", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  customerIntegrationId: uuid("customer_integration_id"),
  guid: uuid("guid"),
  googleAccountId: varchar("google_account_id", { length: 255 }),
  googleRefreshToken: varchar("google_refresh_token", { length: 500 }),
  googleAccessToken: varchar("google_access_token", { length: 500 }),
  tokenExpiry: timestamp("token_expiry"),
  status: varchar("status", { length: 50 }),
  accountEmail: varchar("account_email", { length: 255 }),
  accountName: varchar("account_name", { length: 255 }),
  accountPicture: varchar("account_picture", { length: 500 }),
  createdBy: varchar("created_by", { length: 255 }),
  createdDate: timestamp("created_date"),
  modifiedBy: varchar("modified_by", { length: 255 }),
  modifiedDate: timestamp("modified_date"),
});

// GoogleBusinessProfileLocations table
export const googleBusinessProfileLocations = pgTable(
  "google_business_profile_locations",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    googleBusinessProfileId: uuid("google_business_profile_id").references(
      () => googleBusinessProfile.id
    ),
    locationId: varchar("location_id", { length: 255 }),
    name: varchar("name", { length: 255 }),
    address: text("address"),
    status: varchar("status", { length: 50 }),
    branch: varchar("branch", { length: 255 }),
    createdBy: varchar("created_by", { length: 255 }),
    createdDate: timestamp("created_date"),
    modifiedBy: varchar("modified_by", { length: 255 }),
    modifiedDate: timestamp("modified_date"),
  }
);

// Stripe Customers table - Maps users to Stripe customer IDs
export const stripeCustomers = pgTable("stripe_customers", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull()
    .unique(),
  stripeCustomerId: varchar("stripe_customer_id", { length: 255 })
    .notNull()
    .unique(),
  email: varchar("email", { length: 255 }),
  createdBy: varchar("created_by", { length: 255 }),
  createdDate: timestamp("created_date").defaultNow().notNull(),
  modifiedBy: varchar("modified_by", { length: 255 }),
  modifiedDate: timestamp("modified_date"),
});

// Stripe Payment Methods table - Stores payment method information
export const stripePaymentMethods = pgTable("stripe_payment_methods", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  stripeCustomerId: varchar("stripe_customer_id", { length: 255 }).notNull(),
  setupIntentId: varchar("setup_intent_id", { length: 255 }),
  paymentMethodId: varchar("payment_method_id", { length: 255 }).unique(),
  paymentMethodType: varchar("payment_method_type", { length: 50 }), // 'card'
  // Card details (for display only)
  cardLast4: varchar("card_last4", { length: 4 }),
  cardBrand: varchar("card_brand", { length: 50 }), // 'visa', 'mastercard', etc.
  cardExpMonth: integer("card_exp_month"),
  cardExpYear: integer("card_exp_year"),
  // Status tracking
  status: varchar("status", { length: 50 }).notNull(), // 'pending', 'active', 'failed', 'expired'
  isDefault: boolean("is_default").default(false),
  // Metadata
  createdBy: varchar("created_by", { length: 255 }),
  createdDate: timestamp("created_date").defaultNow().notNull(),
  modifiedBy: varchar("modified_by", { length: 255 }),
  modifiedDate: timestamp("modified_date"),
});

// Stripe Webhook Events table - Tracks processed events for idempotency
export const stripeWebhookEvents = pgTable("stripe_webhook_events", {
  id: uuid("id").primaryKey().defaultRandom(),
  eventId: varchar("event_id", { length: 255 }).notNull().unique(),
  eventType: varchar("event_type", { length: 100 }).notNull(),
  processedAt: timestamp("processed_at").defaultNow().notNull(),
  data: text("data"), // JSON string of event data
});
