/* ============================================================
   submitReview — Server Action for Amal Tracker reviews
   ─────────────────────────────────────────────────
   Validates review data and stores to Upstash Redis (KV).
   Falls back to seed JSON for reads when Redis is unavailable.
   New reviews default to approved: false (pending moderation).
   ============================================================ */

"use server";

import { Redis } from "@upstash/redis";

const REVIEWS_KEY = "reviews-amal";

/* ── Redis client (lazy — only created when env vars exist) ── */
let redis = null;
function getRedis() {
  if (!redis && process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    redis = new Redis({
      url: process.env.KV_REST_API_URL,
      token: process.env.KV_REST_API_TOKEN,
    });
  }
  return redis;
}

/* ── Read from local JSON file (no caching — always fresh) ── */
async function readFromFile() {
  try {
    const { readFile } = await import("fs/promises");
    const { join } = await import("path");
    const raw = await readFile(join(process.cwd(), "data", "reviews-amal.json"), "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

/* ── Read ALL reviews (including unapproved) ───────────────── */
export async function getReviews() {
  const r = getRedis();
  if (r) {
    try {
      const data = await r.get(REVIEWS_KEY);
      if (data) return typeof data === "string" ? JSON.parse(data) : data;
      // First run — seed Redis from JSON file
      const seed = await readFromFile();
      if (seed.length > 0) {
        await r.set(REVIEWS_KEY, JSON.stringify(seed));
      }
      return seed;
    } catch (err) {
      console.error("Redis read error:", err);
    }
  }
  // Fallback: read from JSON file (always fresh)
  return readFromFile();
}

/* ── Read only APPROVED reviews (for public display) ───────── */
export async function getApprovedReviews() {
  const all = await getReviews();
  return all.filter((r) => r.approved === true);
}

/* ── Submit a new review ───────────────────────────────────── */
export async function submitReview(_prevState, formData) {
  const name = formData.get("name")?.toString().trim();
  const rating = parseInt(formData.get("rating"), 10);
  const message = formData.get("message")?.toString().trim();

  /* Validate */
  const errors = {};
  if (!name || name.length < 2) errors.name = "Name must be at least 2 characters";
  if (!rating || rating < 1 || rating > 5) errors.rating = "Please select a rating";
  if (!message || message.length < 10) errors.message = "Review must be at least 10 characters";

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  /* Build review object */
  const review = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    name,
    rating,
    message,
    date: new Date().toISOString(),
    avatar: name.charAt(0).toUpperCase(),
    approved: false,
  };

  /* Save */
  try {
    const r = getRedis();
    if (!r) {
      // Local fallback — write to JSON file
      const { readFile, writeFile, mkdir } = await import("fs/promises");
      const { join } = await import("path");
      const dir = join(process.cwd(), "data");
      await mkdir(dir, { recursive: true });
      const existing = await getReviews();
      existing.unshift(review);
      await writeFile(join(dir, "reviews-amal.json"), JSON.stringify(existing, null, 2), "utf-8");
      return { success: true, review };
    }

    const existing = await getReviews();
    existing.unshift(review);
    await r.set(REVIEWS_KEY, JSON.stringify(existing));
    return { success: true, review };
  } catch (err) {
    console.error("Failed to save review:", err);
    return { success: false, errors: { server: "Failed to save review. Please try again." } };
  }
}
