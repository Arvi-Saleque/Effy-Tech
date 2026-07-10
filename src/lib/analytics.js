/* ============================================================
   Analytics — GTM dataLayer event helper
   ─────────────────────────────────────────────────────────────
   The website loads Google Tag Manager globally. Events are
   queued directly in window.dataLayer so clicks are preserved
   even when the GTM script has not finished loading yet.
   ============================================================ */

/**
 * Queue a custom event for Google Tag Manager / GA4.
 *
 * @param {string} eventName - GTM custom event name.
 * @param {Record<string, string|number|boolean>} params - Event parameters.
 * @returns {boolean} Whether the event was queued in the browser.
 */
export function trackEvent(eventName, params = {}) {
  if (typeof window === "undefined") {
    return false;
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    ...params,
    event: eventName,
  });

  return true;
}

/* ── Predefined events for common actions ─────────────────── */

/** Track CTA button clicks (Download, Visit Site, Contact, etc.). */
export function trackCTAClick(buttonName, page = "") {
  trackEvent("cta_click", {
    button_name: buttonName,
    page_location: page || window.location.pathname,
  });
}

/** Track project card view/click. */
export function trackProjectClick(projectName, action = "view") {
  trackEvent("project_interaction", {
    project_name: projectName,
    action,
  });
}

/** Track external link clicks. */
export function trackExternalLink(url, context = "") {
  trackEvent("external_link", {
    link_url: url,
    context,
  });
}

/** Track review submission. */
export function trackReviewSubmit(projectName, rating) {
  trackEvent("review_submit", {
    project_name: projectName,
    rating,
  });
}

/** Track contact form submission. */
export function trackContactSubmit() {
  trackEvent("contact_form_submit");
}
