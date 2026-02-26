/* ============================================================
   /admin/reviews — Review Moderation Panel
   ─────────────────────────────────────────────────
   Protected by ADMIN_SECRET. Manage (approve/delete) reviews
   for the Amal Tracker showcase page.
   ============================================================ */

"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  verifyAdmin,
  getAllReviews,
  approveReview,
  unapproveReview,
  deleteReview,
} from "@/app/actions/adminReviews";
import {
  HiStar,
  HiCheck,
  HiX,
  HiTrash,
  HiRefresh,
  HiShieldCheck,
  HiEye,
  HiEyeOff,
  HiClock,
  HiCheckCircle,
  HiExclamationCircle,
  HiLockClosed,
} from "react-icons/hi";

export default function AdminReviewsPage() {
  const [secret, setSecret] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [filter, setFilter] = useState("all"); // all | pending | approved
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [actionFeedback, setActionFeedback] = useState(null);
  const [showSecret, setShowSecret] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);

  /* ── Restore session ─────────────────────────────────────── */
  useEffect(() => {
    const stored = sessionStorage.getItem("admin_secret");
    if (stored) {
      setSecret(stored);
      setIsLoggedIn(true);
    }
  }, []);

  /* ── Auto-fetch reviews on login ─────────────────────────── */
  useEffect(() => {
    if (isLoggedIn && secret) {
      fetchReviews();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  /* ── Fetch all reviews ───────────────────────────────────── */
  const fetchReviews = useCallback(async () => {
    setLoading(true);
    const result = await getAllReviews(secret);
    if (result.success) {
      setReviews(result.reviews);
    } else {
      setActionFeedback({ type: "error", message: result.error });
      if (result.error === "Unauthorized") {
        handleLogout();
      }
    }
    setLoading(false);
  }, [secret]);

  /* ── Login handler ───────────────────────────────────────── */
  async function handleLogin(e) {
    e.preventDefault();
    setLoginError("");
    setLoading(true);
    const result = await verifyAdmin(secret);
    if (result.success) {
      sessionStorage.setItem("admin_secret", secret);
      setIsLoggedIn(true);
    } else {
      setLoginError("Invalid secret. Please try again.");
    }
    setLoading(false);
  }

  /* ── Logout ──────────────────────────────────────────────── */
  function handleLogout() {
    sessionStorage.removeItem("admin_secret");
    setSecret("");
    setIsLoggedIn(false);
    setReviews([]);
  }

  /* ── Approve ─────────────────────────────────────────────── */
  async function handleApprove(id) {
    const result = await approveReview(secret, id);
    if (result.success) {
      setReviews((prev) =>
        prev.map((r) => (r.id === id ? { ...r, approved: true } : r))
      );
      showFeedback("success", "Review approved");
    } else {
      showFeedback("error", result.error);
    }
  }

  /* ── Unapprove ───────────────────────────────────────────── */
  async function handleUnapprove(id) {
    const result = await unapproveReview(secret, id);
    if (result.success) {
      setReviews((prev) =>
        prev.map((r) => (r.id === id ? { ...r, approved: false } : r))
      );
      showFeedback("success", "Review set to pending");
    } else {
      showFeedback("error", result.error);
    }
  }

  /* ── Delete ──────────────────────────────────────────────── */
  async function handleDelete(id) {
    const result = await deleteReview(secret, id);
    if (result.success) {
      setReviews((prev) => prev.filter((r) => r.id !== id));
      setConfirmDelete(null);
      showFeedback("success", "Review deleted");
    } else {
      showFeedback("error", result.error);
    }
  }

  /* ── Feedback toast ──────────────────────────────────────── */
  function showFeedback(type, message) {
    setActionFeedback({ type, message });
    setTimeout(() => setActionFeedback(null), 3000);
  }

  /* ── Filtered reviews ────────────────────────────────────── */
  const filtered = reviews.filter((r) => {
    if (filter === "pending") return !r.approved;
    if (filter === "approved") return r.approved;
    return true;
  });

  const pendingCount = reviews.filter((r) => !r.approved).length;
  const approvedCount = reviews.filter((r) => r.approved).length;

  /* ── Login screen ────────────────────────────────────────── */
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#0a0e1a] flex items-center justify-center px-4">
        {/* Background effects */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/3 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[180px]" />
          <div className="absolute bottom-1/3 right-1/4 h-[400px] w-[400px] rounded-full bg-purple-500/4 blur-[150px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative w-full max-w-md"
        >
          <div className="rounded-2xl border border-neutral-800/60 bg-neutral-900/80 p-8 backdrop-blur-xl shadow-2xl">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 mb-4">
                <HiShieldCheck className="h-7 w-7 text-primary-light" />
              </div>
              <h1 className="text-xl font-bold text-neutral-100">
                Admin Panel
              </h1>
              <p className="text-sm text-neutral-500 mt-1">
                Review moderation for Amal Tracker
              </p>
            </div>

            {/* Login form */}
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label
                  htmlFor="admin-secret"
                  className="block text-xs font-medium uppercase tracking-wider text-neutral-500 mb-2"
                >
                  Admin Secret
                </label>
                <div className="relative">
                  <input
                    id="admin-secret"
                    type={showSecret ? "text" : "password"}
                    value={secret}
                    onChange={(e) => setSecret(e.target.value)}
                    required
                    placeholder="Enter admin secret"
                    className="w-full rounded-lg border border-neutral-700 bg-neutral-800/50 px-4 py-3 pr-10 text-sm text-neutral-200 placeholder-neutral-600 outline-none transition-all focus:border-primary-light focus:ring-2 focus:ring-primary-light/10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowSecret(!showSecret)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300 transition-colors cursor-pointer"
                  >
                    {showSecret ? (
                      <HiEyeOff className="h-4 w-4" />
                    ) : (
                      <HiEye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {loginError && (
                  <p className="mt-2 text-xs text-red-400">{loginError}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading || !secret}
                className="w-full rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-neutral-100 transition-all hover:bg-primary-dark hover:shadow-[0_0_30px_rgba(15,118,110,0.2)] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {loading ? "Verifying..." : "Login"}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    );
  }

  /* ── Admin dashboard ─────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-[#0a0e1a]">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 h-[600px] w-[600px] rounded-full bg-primary/3 blur-[200px]" />
        <div className="absolute bottom-0 right-1/3 h-[500px] w-[500px] rounded-full bg-purple-500/3 blur-[180px]" />
      </div>

      {/* Toast feedback */}
      <AnimatePresence>
        {actionFeedback && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -20, x: "-50%" }}
            className={`fixed top-6 left-1/2 z-50 flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-medium shadow-xl backdrop-blur-sm ${
              actionFeedback.type === "success"
                ? "border border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                : "border border-red-500/30 bg-red-500/10 text-red-400"
            }`}
          >
            {actionFeedback.type === "success" ? (
              <HiCheckCircle className="h-4 w-4" />
            ) : (
              <HiExclamationCircle className="h-4 w-4" />
            )}
            {actionFeedback.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-neutral-800/60 bg-[#0a0e1a]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
              <HiShieldCheck className="h-5 w-5 text-primary-light" />
            </div>
            <div>
              <h1 className="text-base font-bold text-neutral-100">
                Review Admin
              </h1>
              <p className="text-xs text-neutral-500">Amal Tracker</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchReviews}
              disabled={loading}
              className="flex items-center gap-1.5 rounded-lg border border-neutral-700 bg-neutral-800/50 px-3 py-2 text-xs font-medium text-neutral-300 transition-all hover:bg-neutral-700/50 hover:text-neutral-100 disabled:opacity-50 cursor-pointer"
            >
              <HiRefresh className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 rounded-lg border border-red-500/20 bg-red-500/5 px-3 py-2 text-xs font-medium text-red-400 transition-all hover:bg-red-500/10 cursor-pointer"
            >
              <HiLockClosed className="h-3.5 w-3.5" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-7xl px-6 py-8">
        {/* Stats */}
        <div className="mb-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              label: "Total",
              count: reviews.length,
              icon: HiStar,
              color: "text-blue-400",
              bg: "bg-blue-500/10 border-blue-500/20",
            },
            {
              label: "Pending",
              count: pendingCount,
              icon: HiClock,
              color: "text-amber-400",
              bg: "bg-amber-500/10 border-amber-500/20",
            },
            {
              label: "Approved",
              count: approvedCount,
              icon: HiCheckCircle,
              color: "text-emerald-400",
              bg: "bg-emerald-500/10 border-emerald-500/20",
            },
          ].map(({ label, count, icon: Icon, color, bg }) => (
            <div
              key={label}
              className="flex items-center gap-4 rounded-xl border border-neutral-800/60 bg-neutral-900/50 p-5 backdrop-blur-sm"
            >
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-lg border ${bg}`}
              >
                <Icon className={`h-5 w-5 ${color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-neutral-100">{count}</p>
                <p className="text-xs text-neutral-500">{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Filter tabs */}
        <div className="mb-6 flex items-center gap-2">
          {[
            { key: "all", label: "All", count: reviews.length },
            { key: "pending", label: "Pending", count: pendingCount },
            { key: "approved", label: "Approved", count: approvedCount },
          ].map(({ key, label, count }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`rounded-lg px-4 py-2 text-xs font-medium transition-all cursor-pointer ${
                filter === key
                  ? "bg-primary/15 text-primary-light border border-primary/30"
                  : "text-neutral-500 hover:text-neutral-300 border border-transparent hover:border-neutral-700"
              }`}
            >
              {label}{" "}
              <span
                className={`ml-1 ${
                  filter === key ? "text-primary-light/70" : "text-neutral-600"
                }`}
              >
                ({count})
              </span>
            </button>
          ))}
        </div>

        {/* Review list */}
        {loading && reviews.length === 0 ? (
          <div className="flex items-center justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary-light border-t-transparent" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="rounded-xl border border-neutral-800/60 bg-neutral-900/50 p-12 text-center backdrop-blur-sm">
            <p className="text-neutral-500">
              {filter === "pending"
                ? "No pending reviews"
                : filter === "approved"
                ? "No approved reviews"
                : "No reviews found"}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {filtered.map((review) => (
                <motion.div
                  key={review.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="group rounded-xl border border-neutral-800/60 bg-neutral-900/50 p-5 backdrop-blur-sm transition-colors hover:border-neutral-700/60"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    {/* Avatar + info */}
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary/30 to-primary-light/30 text-sm font-bold text-primary-light ring-1 ring-primary-light/20">
                        {review.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <p className="text-sm font-semibold text-neutral-200">
                            {review.name}
                          </p>
                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider ${
                              review.approved
                                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                            }`}
                          >
                            {review.approved ? (
                              <>
                                <HiCheckCircle className="h-3 w-3" />
                                Approved
                              </>
                            ) : (
                              <>
                                <HiClock className="h-3 w-3" />
                                Pending
                              </>
                            )}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex gap-0.5">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <HiStar
                                key={s}
                                className={`h-3.5 w-3.5 ${
                                  s <= review.rating
                                    ? "text-amber-400"
                                    : "text-neutral-700"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-neutral-600">
                            {new Date(review.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                        <p className="text-sm text-neutral-400 leading-relaxed">
                          {review.message}
                        </p>
                        <p className="mt-1 text-[10px] text-neutral-700 font-mono">
                          ID: {review.id}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 sm:shrink-0">
                      {review.approved ? (
                        <button
                          onClick={() => handleUnapprove(review.id)}
                          className="flex items-center gap-1.5 rounded-lg border border-amber-500/20 bg-amber-500/5 px-3 py-2 text-xs font-medium text-amber-400 transition-all hover:bg-amber-500/10 cursor-pointer"
                          title="Set to pending"
                        >
                          <HiClock className="h-3.5 w-3.5" />
                          Unapprove
                        </button>
                      ) : (
                        <button
                          onClick={() => handleApprove(review.id)}
                          className="flex items-center gap-1.5 rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-3 py-2 text-xs font-medium text-emerald-400 transition-all hover:bg-emerald-500/10 cursor-pointer"
                          title="Approve this review"
                        >
                          <HiCheck className="h-3.5 w-3.5" />
                          Approve
                        </button>
                      )}

                      {confirmDelete === review.id ? (
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleDelete(review.id)}
                            className="flex items-center gap-1 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs font-medium text-red-400 transition-all hover:bg-red-500/20 cursor-pointer"
                          >
                            <HiTrash className="h-3.5 w-3.5" />
                            Confirm
                          </button>
                          <button
                            onClick={() => setConfirmDelete(null)}
                            className="rounded-lg border border-neutral-700 bg-neutral-800/50 px-2.5 py-2 text-xs text-neutral-400 hover:text-neutral-200 transition-colors cursor-pointer"
                          >
                            <HiX className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setConfirmDelete(review.id)}
                          className="flex items-center gap-1.5 rounded-lg border border-red-500/20 bg-red-500/5 px-3 py-2 text-xs font-medium text-red-400 transition-all hover:bg-red-500/10 cursor-pointer"
                          title="Delete this review"
                        >
                          <HiTrash className="h-3.5 w-3.5" />
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>
    </div>
  );
}
