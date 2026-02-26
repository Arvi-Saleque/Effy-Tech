/* ============================================================
   adminReviews — Server Actions for review moderation
   ─────────────────────────────────────────────────
   Approve, delete, and fetch ALL reviews.
   Protected by ADMIN_SECRET from .env.local.
   ============================================================ */

"use server";

import { readFile, writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { revalidatePath } from "next/cache";

const REVIEWS_DIR = join(process.cwd(), "data");
const REVIEWS_FILE = join(REVIEWS_DIR, "reviews-amal.json");

/* ── Helpers ───────────────────────────────────────────────── */
function verifySecret(secret) {
  return secret === process.env.ADMIN_SECRET;
}

async function readReviews() {
  try {
    const raw = await readFile(REVIEWS_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

async function saveReviews(reviews) {
  await mkdir(REVIEWS_DIR, { recursive: true });
  await writeFile(REVIEWS_FILE, JSON.stringify(reviews, null, 2), "utf-8");
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
  const reviews = await readReviews();
  return { success: true, reviews };
}

/* ── Approve a review ──────────────────────────────────────── */
export async function approveReview(secret, reviewId) {
  if (!verifySecret(secret)) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const reviews = await readReviews();
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
    const reviews = await readReviews();
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
    const reviews = await readReviews();
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
