# Effy Tech Mobile Menu Responsive Hotfix

## Cause

The mobile overlay was a `position: fixed` descendant of the fixed public
navbar. The navbar uses `backdrop-filter`, which creates a containing block for
fixed descendants in modern browsers. The overlay's top and bottom offsets
were therefore resolved against the 68px navbar box instead of the viewport,
collapsing the menu into a clipped strip below the header. The decorative
off-canvas shape could also create horizontal scroll inside the panel.

## Fix

- Anchor the overlay absolutely to the fixed navbar at 68px.
- Size it explicitly to `100dvh - 68px`, with a `100vh` fallback.
- Constrain the panel to that height and allow vertical scrolling only.
- Contain overscroll and preserve momentum scrolling on touch devices.
- Include bottom safe-area padding for devices with a home indicator.
- Tighten padding, link height, and search metadata below 480px.

## Protected behavior

Menu content, destinations, search behavior, focus trap, Escape dismissal,
focus restoration, body scroll lock, desktop navigation, and public page
content are unchanged.
