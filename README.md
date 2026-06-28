# Effy Tech — Official Website

A modern, scalable landing page for **Effy Tech**, built with a clean component architecture and centralized design system.

## Tech Stack

| Tool            | Purpose                          |
| --------------- | -------------------------------- |
| Next.js 15      | React framework (App Router)     |
| Tailwind CSS v4 | Utility-first styling            |
| Framer Motion   | Scroll & interaction animations  |
| React Icons     | Consistent iconography           |

## Project Structure

```
src/
├── app/                  # Next.js App Router (pages, layouts, global styles)
├── components/
│   ├── ui/               # Reusable primitives (Button, Card, Badge, etc.)
│   └── layout/           # Structural components (Navbar, Footer)
├── sections/             # Page-level sections (Hero, About, Projects, Contact)
├── data/                 # Static content separated from components
├── hooks/                # Custom React hooks (useFilter, etc.)
└── theme/                # Centralized design tokens
    ├── colors.js          # All color values — single source of truth
    ├── typography.js      # Font families, sizes, weights
    └── siteConfig.js      # Brand data, nav links, socials
```

## Design Principles

- **Zero hardcoded colors** — all colors flow from the theme system via Tailwind tokens
- **Component-first** — every UI element (buttons, cards, badges) is a reusable component
- **Data separated from UI** — project data, nav links, brand info live in dedicated files
- **Scalable architecture** — new pages, sections, and features plug in without restructuring

## Reusable Components

| Component          | Description                                        |
| ------------------ | -------------------------------------------------- |
| `Button`           | 4 variants (primary/secondary/outline/ghost), 3 sizes |
| `Card`             | Project card with image, badges, hover animation   |
| `Badge`            | Category pill (solid/outline)                      |
| `FilterBar`        | Animated category filter tabs                      |
| `SectionWrapper`   | Consistent section container with max-width/padding |
| `SectionHeading`   | Reusable title + subtitle block                    |
| `SearchInput`      | Styled search input with icon & clear button       |
| `Logo`             | Brand logo mark + text                             |
| `SocialLinks`      | Social media icon row                              |
| `ImagePlaceholder` | Dev placeholder for missing images                 |

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Security

- Deployment and secret-handling guidance: [`SECURITY_DEPLOYMENT.md`](./SECURITY_DEPLOYMENT.md)
- Environment variable placeholders: [`.env.example`](./.env.example)

## Color Palette

| Token             | Hex       | Usage                |
| ----------------- | --------- | -------------------- |
| `primary`         | `#10B981` | Emerald — brand CTA  |
| `primary-dark`    | `#059669` | Hover states         |
| `accent`          | `#4F46E5` | Deep Indigo contrast |
| `surface`         | `#FFFFFF` | Backgrounds          |
| `text-primary`    | `#111827` | Main text            |
| `text-secondary`  | `#6B7280` | Muted text           |

## License

Private — Effy Tech © 2026
