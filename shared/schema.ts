import { sql } from "drizzle-orm";
import { pgTable, text, varchar, jsonb, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export * from "./models/auth";

export const socialLinkSchema = z.object({
  id: z.string(),
  platform: z.enum([
    "instagram",
    "youtube",
    "facebook",
    "x",
    "telegram",
    "whatsapp",
    "discord",
    "spotify",
    "github",
    "website",
  ]),
  url: z.string().url(),
  label: z.string().optional(),
});

export type SocialLink = z.infer<typeof socialLinkSchema>;
export type SocialPlatform = SocialLink["platform"];

export const profiles = pgTable("profiles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id"),
  username: text("username").notNull().unique(),
  name: text("name").notNull(),
  tagline: text("tagline").default(""),
  about: text("about").default(""),
  avatarUrl: text("avatar_url"),
  bannerUrl: text("banner_url"),
  primaryColor: text("primary_color").default("#7c3aed"),
  accentColor: text("accent_color").default("#c084fc"),
  gradientFrom: text("gradient_from").default("#7c3aed"),
  gradientTo: text("gradient_to").default("#c084fc"),
  useGradient: text("use_gradient").default("true"),
  fontFamily: text("font_family").default("Inter"),
  shareSlug: text("share_slug").unique(),
  isPublished: text("is_published").default("false"),
  isPrivate: boolean("is_private").default(false),
  musicUrl: text("music_url"),
  links: jsonb("links").$type<SocialLink[]>().default([]),
});

export const insertProfileSchema = createInsertSchema(profiles).omit({
  id: true,
});

export type InsertProfile = z.infer<typeof insertProfileSchema>;
export type Profile = typeof profiles.$inferSelect;

