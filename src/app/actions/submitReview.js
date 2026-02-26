/* ============================================================
   submitReview — Server Action for Amal Tracker reviews
   ─────────────────────────────────────────────────
   Validates review data and stores to a JSON file.
   New reviews default to approved: false (pending moderation).
   ============================================================ */

"use server";

import { readFile, writeFile, mkdir } from "fs/promises";
import { join } from "path";

const REVIEWS_DIR = join(process.cwd(), "data");
const REVIEWS_FILE = join(REVIEWS_DIR, "reviews-amal.json");

/* ── Read ALL reviews (including unapproved) ───────────────── */
export async function getReviews() {
  try {
    const raw = await readFile(REVIEWS_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
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
    await mkdir(REVIEWS_DIR, { recursive: true });
    const existing = await getReviews();
    existing.unshift(review); // newest first
    await writeFile(REVIEWS_FILE, JSON.stringify(existing, null, 2), "utf-8");
    return { success: true, review };
  } catch (err) {
    console.error("Failed to save review:", err);
    return { success: false, errors: { server: "Failed to save review. Please try again." } };
  }
}
