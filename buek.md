# Project Information — BUEK University Website

Filled checklist for the **Bangladesh University of Engineering Knowledge (BUEK)** project.

---

## Basic Project Details

- **Project name:** Bangladesh University of Engineering Knowledge (BUEK)
- **Project type:** Institution Website / Client Project
- **Short one-line summary:** A full-featured university website with a powerful admin panel for complete content management.
- **Full short description:** BUEK is a modern, multi-page university website built for Bangladesh University of Engineering Knowledge in Khulna, Bangladesh. It features a dynamic public-facing site with hero sliders, news and events, photo gallery, academic programs, and a contact system. A fully protected admin panel allows staff to manage all content, media, and page sections without any coding knowledge.
- **Project category:** Web
- **Is this project featured?** Yes

---

## Project Links

- **Live website link:** *(to be added when deployed)*
- **Google Play Store link:** N/A
- **App Store link:** N/A
- **GitHub repository link:** *(private or to be added)*
- **Demo video link:** *(to be added)*
- **Client/business link:** *(to be added)*

---

## Client / Ownership

- **Client name:** Bangladesh University of Engineering Knowledge
- **Organization name:** BUEK — Bangladesh University of Engineering Knowledge
- **Location:** Khulna, Bangladesh
- **Your role:** Lead Developer (full-stack)
- **Other team members involved:** *(to be added)*
- **What Effy Tech handled:** Planning, UI/UX design, frontend, backend, admin panel, media integration, deployment

---

## Tech Stack

| Area                 | Technologies                                       |
|----------------------|----------------------------------------------------|
| Framework            | Next.js 15.1.3 (App Router)                        |
| Frontend             | React 19, TypeScript 5.7, Tailwind CSS 3.4         |
| Backend              | Next.js Server Actions, Node.js                    |
| Database             | MongoDB 6.11 (cloud)                               |
| Authentication       | Custom JWT via `jose` 5.9 (HTTP-only cookies)      |
| Media / Storage      | Cloudinary 2.5 (image hosting + media library)     |
| Icons                | Lucide React 0.468                                 |
| Utilities            | clsx 2.1                                           |
| Hosting / Deployment | Vercel (recommended)                               |
| Code Quality         | ESLint 9.17 with Next.js config                    |

```text
Framework:    Next.js 15 (App Router)
Frontend:     React 19, TypeScript, Tailwind CSS
Backend:      Next.js Server Actions
Database:     MongoDB (cloud)
Auth:         Custom JWT (jose) with HTTP-only cookies, 8-hour sessions
Media:        Cloudinary (image upload, library, optimization)
Hosting:      Vercel
```

---

## Key Features

**Public-Facing:**

- Dynamic hero slider with rotating slides, background images, and call-to-action buttons
- Full academic programs listing with faculties, departments, and subjects
- News, events, and notice board with categories, dates, and featured items
- Photo gallery with albums organized by year and department (with lightbox viewer)
- Contact form with department info, office hours, and map embed
- Mobile-responsive design with hamburger menu and smooth navigation
- SEO-optimized pages with custom meta titles and descriptions
- 10+ public pages including About, Mission & Vision, Chairman's Message, Committee

**Admin Panel:**

- Fully protected admin dashboard with JWT authentication
- WYSIWYG content editor for every page and section
- Cloudinary media library browser — upload, search, and manage images
- Publish / draft status control for news, events, and gallery
- Contact message inbox with quick reply via email
- Homepage content manager — sliders, feature cards, quick access cards, news selection
- Global site settings — university name, logo, favicon, tagline, contact, social links, SEO

---

## Problem and Solution

- **Problem:** The university had no digital platform to publish news, academic programs, or contact information. Managing updates required technical staff and there was no structured way to present institutional information.
- **Target users:** University administration, students, prospective applicants, and the general public.
- **What was important:** Building an admin system simple enough for non-technical staff to use, while keeping the public site fast, professional, and SEO-friendly.
- **How the solution helped:** The admin panel allows any staff member to update any page content, upload media, publish news, and manage gallery albums without writing any code. The public site presents the university professionally and is optimized for search engines and mobile devices.

---

## Screenshots and Media

| Type                   | Notes                                               |
|------------------------|-----------------------------------------------------|
| Thumbnail              | Homepage hero with slider                           |
| Screenshot 1           | Homepage — full view with slider and sections       |
| Screenshot 2           | Academic programs page                              |
| Screenshot 3           | News and events listing                             |
| Screenshot 4           | Gallery with photo albums                           |
| Screenshot 5           | Admin dashboard panel                               |
| Screenshot 6           | Admin content editor for a page                     |
| Mobile screenshot      | Homepage and navigation on mobile                   |

**Image guidelines:**

- Use high-quality desktop screenshots (1440px or 1280px wide)
- Capture full-page scrollable views where possible
- Avoid screenshots with any real admin credentials visible
- Use consistent browser framing (Chrome, no extensions)

**Suggested folder structure:**

```text
public/images/buek/thumbnail.png
public/images/buek/home.png
public/images/buek/academic.png
public/images/buek/news-events.png
public/images/buek/gallery.png
public/images/buek/admin-dashboard.png
public/images/buek/admin-editor.png
public/images/buek/mobile-home.png
```

---

## Metrics / Proof

- Built for a real university institution in Bangladesh
- 10+ public pages with fully dynamic content
- 11 admin management sections covering every area of the site
- Supports unlimited news articles, gallery albums, and committee members
- Cloudinary integration supports 30MB+ media uploads
- MongoDB-backed with 6 collections and full CRUD operations
- 5-minute edge caching on public pages for fast load times

*(Live user and traffic metrics to be added after deployment)*

---

## Project Timeline

- **Start date:** *(to be added)*
- **End date:** *(to be added)*
- **Current status:** `In Development`

---

## Content for Website Card

```text
Title:              Bangladesh University of Engineering Knowledge (BUEK)
Category:           Web
Short Description:  A full-featured university website with a powerful admin panel,
                    dynamic content management, media library, and 10+ public pages.
Tech Tags:          Next.js, React, TypeScript, Tailwind CSS, MongoDB, Cloudinary
Thumbnail Path:     /images/buek/thumbnail.png
Live URL:           (to be added)
Client Name:        Bangladesh University of Engineering Knowledge
Featured:           Yes
```

---

## Content for Detail Page

```text
Project Overview:
  A modern, full-stack university website for Bangladesh University of Engineering Knowledge
  in Khulna, Bangladesh. Built with Next.js 15 and a MongoDB backend, the project includes
  a fully responsive public site and a protected admin panel for complete content management
  without any coding knowledge required.

Problem:
  The university lacked a digital presence and had no structured way to publish news,
  academic programs, or institutional information. Updating content required technical staff.

Solution:
  Built a complete CMS-style website with a WYSIWYG admin panel. Staff can manage every
  page, section, image, and piece of content through a protected dashboard. The public site
  is fast, SEO-ready, and mobile-responsive.

My / Our Role:
  Lead Developer — full-stack. Handled planning, UI/UX design, frontend, backend,
  admin panel architecture, Cloudinary integration, MongoDB schema design, and deployment setup.

Main Features:
  - Dynamic hero slider with multiple slides and CTAs
  - 10+ public pages: Home, About, Mission & Vision, Chairman's Message, Committee,
    Academic Programs, News & Events, Gallery, Contact
  - Protected admin panel with WYSIWYG editing for every page
  - Cloudinary media library — upload, browse, and manage images
  - News and events system with categories, dates, and featured flags
  - Photo gallery with albums organized by year and department
  - Contact form with message inbox and quick email reply
  - Global site settings (logo, favicon, tagline, SEO, social links)
  - Publish / draft status control
  - Mobile-responsive design with hamburger navigation

Tech Stack:
  Next.js 15, React 19, TypeScript, Tailwind CSS, MongoDB, Cloudinary, jose (JWT),
  Lucide React, Vercel

Challenges:
  - Designing an admin panel simple enough for non-technical university staff
  - Handling large media uploads (30MB+) through Next.js Server Actions
  - Building flexible data models that support all page types within a single MongoDB schema
  - Implementing secure session management without a third-party auth library

Result / Impact:
  University staff can now fully manage all website content independently.
  The public site is professional, SEO-optimized, mobile-friendly, and built to scale.

Links:
  Live URL:    (to be added after deployment)
  GitHub:      (private)

Screenshots:
  /images/buek/thumbnail.png
  /images/buek/home.png
  /images/buek/academic.png
  /images/buek/news-events.png
  /images/buek/gallery.png
  /images/buek/admin-dashboard.png
  /images/buek/admin-editor.png
  /images/buek/mobile-home.png
```

---

## Things NOT to Send

- Real admin email or password
- MongoDB URI or any environment variable values
- Cloudinary API keys
- Any screenshots showing private messages from the contact inbox
- Fake user or traffic numbers before deployment

---

## Environment Variables Required

```text
MONGODB_URI=            # MongoDB connection string
MONGODB_DB=buek         # Database name (defaults to "buek")
CLOUDINARY_CLOUD_NAME=  # Cloudinary account ID
CLOUDINARY_API_KEY=     # Cloudinary API key
CLOUDINARY_API_SECRET=  # Cloudinary API secret
ADMIN_EMAIL=            # Admin login email
ADMIN_PASSWORD=         # Admin login password (min 6 characters)
SESSION_SECRET=         # JWT signing secret (32+ characters recommended)
NEXT_PUBLIC_SITE_URL=   # Public site URL (optional, for SEO)
```

---

## Run Commands

```bash
npm run dev       # Start development server (localhost:3000)
npm run build     # Build for production
npm run start     # Start production server
npm run lint      # Run ESLint
npm run clean     # Clear .next cache
```


here in the details answer for you