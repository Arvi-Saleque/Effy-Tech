# Effy Tech Mobile Menu Portal Fix

## Cause

The first CSS-only hotfix still left the mobile overlay inside the fixed public
navbar. Because the navbar uses `backdrop-filter`, it creates its own containing
and stacking context in Chromium. The browser could therefore continue clipping
the overlay to the navbar's painted area even when an explicit viewport height
was assigned.

## Fix

- Render the open mobile navigation into `document.body` with a React portal.
- Keep the overlay fixed from the 68px navbar edge to the viewport bottom.
- Isolate the overlay stack and place it above page content.
- Preserve the existing backdrop, panel scrolling, safe-area padding, focus
  trap, Escape dismissal, focus restoration, search action, and body scroll
  lock.

The portal removes the menu from every navbar-specific containing block, so the
homepage hero and header effects can no longer constrain its height.

## Responsive contract

- At widths up to 860px, the overlay fills all space below the navbar.
- The panel is full width on phones and capped at 520px on wider mobile/tablet
  layouts.
- Only the panel's vertical content scrolls; horizontal overflow remains hidden.
- The desktop navigation remains unchanged.
