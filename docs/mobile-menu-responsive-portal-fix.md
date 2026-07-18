# Effy Tech — Mobile Menu Portal Fix

The public mobile menu is rendered into `document.body` with React
`createPortal`. This prevents the navbar's backdrop filter and stacking context
from clipping the overlay.

- The overlay is viewport-fixed below the 68px navigation bar.
- It covers the remaining screen height and has its own isolated stack.
- Body scroll locking, Escape dismissal, focus handling, backdrop dismissal,
  and the responsive panel remain unchanged.
- The public menu is hidden on custom showcase and admin routes as before.

Files involved:

- `src/components/layout/Navbar.jsx`
- `src/app/globals.css`
