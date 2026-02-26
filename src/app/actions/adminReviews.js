/* ============================================================
   adminReviews — Server Actions for review moderation
   ─────────────────────────────────────────────────
   Approve, delete, and fetch ALL reviews.
   Uses Upstash Redis for storage, protected by ADMIN_SECRET.
   ============================================================ */

"use server";

import { revalidatePath } from "next/cache";
import { getReviews } from "./submitReview";
import { Redis } from "@upstash/redis";

const REVIEWS_KEY = "reviews-amal";

/* ── Redis client ──────────────────────────────────────────── */
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

/* ── Helpers ───────────────────────────────────────────────── */
function verifySecret(secret) {
  return secret === process.env.ADMIN_SECRET;
}

async function saveReviews(reviews) {
  const r = getRedis();
  if (r) {
    await r.set(REVIEWS_KEY, JSON.stringify(reviews));
  } else {
    // Local fallback — write to JSON file
    const { writeFile, mkdir } = await import("fs/promises");
    const { join } = await import("path");
    const dir = join(process.cwd(), "data");
    await mkdir(dir, { recursive: true });
    await writeFile(join(dir, "reviews-amal.json"), JSON.stringify(reviews, null, 2), "utf-8");
  }
}

/* ── Verify admin login ────────────────────────────────────── */
export async function verifyAdmin(secret) {
  if (!verifySecret(secret)) {
    return { success: false, error: "Invalid secret" };
  }
  return { success: true };
}

/* ── Get all reviews (admin only) ──────────────────────────── */
export async function getAllReviews(secret) {
  if (!verifySecret(secret)) {
    return { success: false, error: "Unauthorized" };
  }
  const reviews = await getReviews();
  return { success: true, reviews };
}

/* ── Approve a review ──────────────────────────────────────── */
export async function approveReview(secret, reviewId) {
  if (!verifySecret(secret)) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const reviews = await getReviews();
    const index = reviews.findIndex((r) => r.id === reviewId);
    if (index === -1) {
      return { success: false, error: "Review not found" };
    }

    reviews[index].approved = true;
    await saveReviews(reviews);
    revalidatePath("/projects/IAM");
    return { success: true };
  } catch (err) {
    console.error("Failed to approve review:", err);
    return { success: false, error: "Failed to approve review" };
  }
}

/* ── Unapprove a review (set back to pending) ─────────────── */
export async function unapproveReview(secret, reviewId) {
  if (!verifySecret(secret)) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const reviews = await getReviews();
    const index = reviews.findIndex((r) => r.id === reviewId);
    if (index === -1) {
      return { success: false, error: "Review not found" };
    }

    reviews[index].approved = false;
    await saveReviews(reviews);
    revalidatePath("/projects/IAM");
    return { success: true };
  } catch (err) {
    console.error("Failed to unapprove review:", err);
    return { success: false, error: "Failed to unapprove review" };
  }
}

/* ── Delete a review ───────────────────────────────────────── */
export async function deleteReview(secret, reviewId) {
  if (!verifySecret(secret)) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const reviews = await getReviews();
    const filtered = reviews.filter((r) => r.id !== reviewId);

    if (filtered.length === reviews.length) {
      return { success: false, error: "Review not found" };
    }

    await saveReviews(filtered);
    revalidatePath("/projects/IAM");
    return { success: true };
  } catch (err) {
    console.error("Failed to delete review:", err);
    return { success: false, error: "Failed to delete review" };
  }
}
