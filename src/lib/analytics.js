/* ============================================================
   Analytics — Event tracking helper
   ─────────────────────────────────────────────────
   Usage:
     import { trackEvent } from "@/lib/analytics";
     trackEvent("cta_click", { button: "Download", page: "IAM" });

   Events are sent to GA4 via gtag(). Safe to call even if
   gtag hasn't loaded yet (checks window.gtag existence).
   ============================================================ */

/**
 * Send a custom event to Google Analytics 4.
 * @param {string} eventName — GA4 event name (e.g. "cta_click", "download_click")
 * @param {Record<string, string|number>} params — Event parameters
 */
export function trackEvent(eventName, params = {}) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }
}

/* ── Predefined events for common actions ─────────────────── */

/** Track CTA button clicks (Download, Visit Site, Contact, etc.) */
export function trackCTAClick(buttonName, page = "") {
  trackEvent("cta_click", {
    button_name: buttonName,
    page_location: page || (typeof window !== "undefined" ? window.location.pathname : ""),
  });
}

/** Track project card view/click */
export function trackProjectClick(projectName, action = "view") {
  trackEvent("project_interaction", {
    project_name: projectName,
    action,
  });
}

/** Track external link clicks */
export function trackExternalLink(url, context = "") {
  trackEvent("external_link", {
    link_url: url,
    context,
  });
}

/** Track review submission */
export function trackReviewSubmit(projectName, rating) {
  trackEvent("review_submit", {
    project_name: projectName,
    rating,
  });
}

/** Track contact form submission */
export function trackContactSubmit() {
  trackEvent("contact_form_submit");
}
