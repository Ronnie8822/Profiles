export interface StoredProfile {
  username: string;
  data: any;
}

const KEY = "profiles-data";

/* 🔹 Get all profiles */
export const getAllProfiles = (): StoredProfile[] => {
  const raw = localStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : [];
};

/* 🔹 Save / Update profile (RETURN SLUG) */
export const saveProfile = (profile: any): string => {
  const profiles = getAllProfiles();

  if (!profile.username) {
    throw new Error("Username is required");
  }

  const slug = profile.username.toLowerCase();

  const updated = profiles.filter((p) => p.username !== slug);

  updated.push({
    username: slug,
    data: { ...profile, username: slug },
  });

  localStorage.setItem(KEY, JSON.stringify(updated));

  return slug; // ❗ VERY IMPORTANT
};

/* 🔹 Get profile by username */
export const getProfileByUsername = (username: string) => {
  const profiles = getAllProfiles();
  return profiles.find((p) => p.username === username)?.data || null;
};
