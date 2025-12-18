import { type Profile, type InsertProfile, type SocialLink, profiles } from "@shared/schema";
import { db } from "./db";
import { eq, sql } from "drizzle-orm";

export interface IStorage {
  getProfile(id: string): Promise<Profile | undefined>;
  getProfileByUsername(username: string): Promise<Profile | undefined>;
  getProfileBySlug(slug: string): Promise<Profile | undefined>;
  getProfileByUserId(userId: string): Promise<Profile | undefined>;
  createProfile(profile: InsertProfile): Promise<Profile>;
  updateProfile(id: string, profile: Partial<InsertProfile>): Promise<Profile | undefined>;
  publishProfile(id: string): Promise<Profile | undefined>;
  checkUsernameAvailable(username: string): Promise<boolean>;
  checkSlugAvailable(slug: string): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  async getProfile(id: string): Promise<Profile | undefined> {
    const [profile] = await db.select().from(profiles).where(eq(profiles.id, id));
    return profile || undefined;
  }

  async getProfileByUsername(username: string): Promise<Profile | undefined> {
    const [profile] = await db.select().from(profiles).where(
      sql`LOWER(${profiles.username}) = LOWER(${username})`
    );
    return profile || undefined;
  }

  async getProfileBySlug(slug: string): Promise<Profile | undefined> {
    const [profile] = await db.select().from(profiles).where(
      sql`LOWER(${profiles.shareSlug}) = LOWER(${slug})`
    );
    return profile || undefined;
  }

  async getProfileByUserId(userId: string): Promise<Profile | undefined> {
    const [profile] = await db.select().from(profiles).where(eq(profiles.userId, userId));
    return profile || undefined;
  }

  async createProfile(insertProfile: InsertProfile): Promise<Profile> {
    const [profile] = await db
      .insert(profiles)
      .values({
        userId: insertProfile.userId ?? null,
        username: insertProfile.username,
        name: insertProfile.name,
        tagline: insertProfile.tagline ?? "",
        about: insertProfile.about ?? "",
        avatarUrl: insertProfile.avatarUrl ?? null,
        bannerUrl: insertProfile.bannerUrl ?? null,
        primaryColor: insertProfile.primaryColor ?? "#7c3aed",
        accentColor: insertProfile.accentColor ?? "#c084fc",
        gradientFrom: insertProfile.gradientFrom ?? "#7c3aed",
        gradientTo: insertProfile.gradientTo ?? "#c084fc",
        useGradient: insertProfile.useGradient ?? "true",
        fontFamily: insertProfile.fontFamily ?? "Inter",
        shareSlug: insertProfile.shareSlug ?? null,
        isPublished: insertProfile.isPublished ?? "false",
        isPrivate: insertProfile.isPrivate ?? false,
        links: (insertProfile.links ?? []) as SocialLink[],
      })
      .returning();
    return profile;
  }

  async updateProfile(id: string, updates: Partial<InsertProfile>): Promise<Profile | undefined> {
    const existing = await this.getProfile(id);
    if (!existing) return undefined;
    
    const [updated] = await db
      .update(profiles)
      .set({
        ...updates,
        links: updates.links !== undefined ? (updates.links as SocialLink[]) : undefined,
      })
      .where(eq(profiles.id, id))
      .returning();
    return updated || undefined;
  }

  async publishProfile(id: string): Promise<Profile | undefined> {
    const existing = await this.getProfile(id);
    if (!existing) return undefined;
    
    let slug = existing.shareSlug;
    if (!slug) {
      const randomPart = Math.random().toString(36).substring(2, 8);
      slug = existing.username.toLowerCase().replace(/[^a-z0-9]/g, '') + '-' + randomPart;
    }
    
    const [updated] = await db
      .update(profiles)
      .set({
        shareSlug: slug,
        isPublished: "true",
      })
      .where(eq(profiles.id, id))
      .returning();
    return updated || undefined;
  }

  async checkUsernameAvailable(username: string): Promise<boolean> {
    const existing = await this.getProfileByUsername(username);
    return !existing;
  }

  async checkSlugAvailable(slug: string): Promise<boolean> {
    const existing = await this.getProfileBySlug(slug);
    return !existing;
  }
}

export const storage = new DatabaseStorage();
