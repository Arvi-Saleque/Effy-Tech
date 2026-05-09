/* ============================================================
   Service Explorer Data
   Enriched service definitions for the interactive explorer UI.
   Each service has: category badge, description, menuIcon key,
   and 6 feature cards (icon key, title, description).
   ============================================================ */

export const explorerServices = [
  /* ── Build Group ─────────────────────────────────────────── */
  {
    id: "website-webapp",
    group: "Build",
    shortTitle: "Website & Web Apps",
    title: "Website & Web Application Development",
    category: "Web Solutions",
    description:
      "We design and develop fast, secure, and SEO-friendly websites and custom web applications tailored to your business goals. Built for performance, scaled for growth.",
    menuIcon: "template",
    features: [
      {
        icon: "device-mobile",
        title: "Responsive Design",
        description:
          "Looks perfect on every device — mobile, tablet, and desktop — with a seamless experience.",
      },
      {
        icon: "search",
        title: "SEO Optimized",
        description:
          "Built to rank higher on search engines and drive consistent organic traffic to your business.",
      },
      {
        icon: "puzzle",
        title: "Custom Functionality",
        description:
          "Tailored features, booking flows, and business logic built to fit your exact workflow.",
      },
      {
        icon: "shield-check",
        title: "Secure & Reliable",
        description:
          "HTTPS, input validation, and hardened architecture so your site stays safe and online.",
      },
      {
        icon: "scale",
        title: "Scalable Architecture",
        description:
          "Built for performance today and ready to grow as your business expands over time.",
      },
      {
        icon: "refresh",
        title: "Ongoing Support",
        description:
          "We stay available after launch for updates, bug fixes, and continuous improvements.",
      },
    ],
  },
  {
    id: "mobile-app",
    group: "Build",
    shortTitle: "Mobile App Development",
    title: "Mobile App Development",
    category: "Mobile Solutions",
    description:
      "Cross-platform Android and iOS applications with modern UI, smooth performance, and scalable backend integration. From idea to app store publication.",
    menuIcon: "device-mobile",
    features: [
      {
        icon: "device-mobile",
        title: "Cross-Platform Builds",
        description:
          "One codebase, native-quality experience on both Android and iOS with Flutter.",
      },
      {
        icon: "sparkles",
        title: "Smooth UI & UX",
        description:
          "Intuitive layouts, fast navigation, and polished interactions your users will love.",
      },
      {
        icon: "database",
        title: "Firebase Integration",
        description:
          "Real-time data sync, push notifications, and secure user authentication out of the box.",
      },
      {
        icon: "cloud",
        title: "Offline Support",
        description:
          "App remains functional even without a stable internet connection using local caching.",
      },
      {
        icon: "presentation-chart",
        title: "Admin Dashboard",
        description:
          "Manage users, content, and orders from a dedicated web control panel.",
      },
      {
        icon: "check-circle",
        title: "App Store Ready",
        description:
          "We handle submission, testing, and publishing to Google Play and Apple App Store.",
      },
    ],
  },
  {
    id: "fullstack-software",
    group: "Build",
    shortTitle: "Full-Stack Software",
    title: "Full-Stack Software Development",
    category: "Software Engineering",
    description:
      "Complete software solutions from frontend design to backend APIs, databases, admin panels, and cloud deployment. End-to-end ownership for your product.",
    menuIcon: "code",
    features: [
      {
        icon: "code",
        title: "Frontend & Backend",
        description:
          "Complete solution covering UI, REST APIs, database design, and admin panel in one project.",
      },
      {
        icon: "users",
        title: "Role-Based Access",
        description:
          "Custom user roles, permissions, and access control so the right people see the right data.",
      },
      {
        icon: "shield-check",
        title: "Secure Authentication",
        description:
          "JWT, session-based, and OAuth login flows with password hashing and rate limiting.",
      },
      {
        icon: "document-text",
        title: "File & Report Export",
        description:
          "Upload, manage, and export reports as PDF or Excel — on demand and automated.",
      },
      {
        icon: "currency-dollar",
        title: "Payment Ready",
        description:
          "Integrated with bKash, SSLCommerz, Stripe, and other regional payment gateways.",
      },
      {
        icon: "cloud",
        title: "Cloud Deployment",
        description:
          "Deployed on Vercel, VPS, AWS, or your preferred hosting with CI/CD setup.",
      },
    ],
  },
  {
    id: "ecommerce",
    group: "Build",
    shortTitle: "E-commerce Development",
    title: "E-commerce Development",
    category: "Online Store",
    description:
      "Complete online store development with product management, cart, order tracking, payment integration, and admin control. Ready to sell from day one.",
    menuIcon: "shopping-bag",
    features: [
      {
        icon: "collection",
        title: "Product Catalog",
        description:
          "Clean product pages with variants, images, filters, and category management.",
      },
      {
        icon: "shopping-bag",
        title: "Cart & Checkout",
        description:
          "Smooth buying flow with coupon support, discount logic, and guest checkout.",
      },
      {
        icon: "currency-dollar",
        title: "Payment Gateway",
        description:
          "bKash, SSLCommerz, Stripe, and cash on delivery — configured for your region.",
      },
      {
        icon: "refresh",
        title: "Order Tracking",
        description:
          "Real-time order status updates for both customers and your admin team.",
      },
      {
        icon: "database",
        title: "Inventory Control",
        description:
          "Stock levels update automatically on each sale, return, or manual adjustment.",
      },
      {
        icon: "presentation-chart",
        title: "Admin Dashboard",
        description:
          "Manage products, orders, customers, promo codes, and reports in one panel.",
      },
    ],
  },
  {
    id: "dashboard-admin",
    group: "Build",
    shortTitle: "Dashboard Development",
    title: "Dashboard & Admin Panel Development",
    category: "Admin Tools",
    description:
      "Custom dashboards and admin panels to manage users, content, sales, reports, files, and business operations — built for your team's exact workflow.",
    menuIcon: "presentation-chart",
    features: [
      {
        icon: "presentation-chart",
        title: "Analytics Dashboard",
        description:
          "Visual charts, KPIs, and business metrics updated in real time for quick decisions.",
      },
      {
        icon: "users",
        title: "User Management",
        description:
          "Add, edit, deactivate, and control access levels for every team member.",
      },
      {
        icon: "document-text",
        title: "Sales & Reports",
        description:
          "Filter by date or category and export results to Excel or PDF with one click.",
      },
      {
        icon: "pencil-alt",
        title: "Content Management",
        description:
          "Manage posts, media, files, and page content without touching any code.",
      },
      {
        icon: "bell",
        title: "Notification Center",
        description:
          "In-app alerts for orders, tasks, approvals, and system events keep the team informed.",
      },
      {
        icon: "adjustments",
        title: "Multi-Role Access",
        description:
          "Separate views and permissions for admins, managers, and staff roles.",
      },
    ],
  },
  {
    id: "erp-management",
    group: "Build",
    shortTitle: "Custom ERP & Management",
    title: "Custom ERP & Management Software",
    category: "Enterprise Systems",
    description:
      "Tailored management systems for schools, businesses, hospitals, shops, and organizations. Replaces spreadsheets with structured, automated workflows.",
    menuIcon: "collection",
    features: [
      {
        icon: "collection",
        title: "School & University ERP",
        description:
          "Admissions, result management, attendance tracking, and fee collection in one system.",
      },
      {
        icon: "users",
        title: "HR & Payroll",
        description:
          "Employee records, leave tracking, salary calculation, and payslip generation.",
      },
      {
        icon: "currency-dollar",
        title: "POS System",
        description:
          "Quick sales processing, receipt printing, and daily cash report summaries.",
      },
      {
        icon: "database",
        title: "Inventory & Procurement",
        description:
          "Track stock levels, purchase orders, and supplier records across all locations.",
      },
      {
        icon: "chat",
        title: "CRM Module",
        description:
          "Client database, follow-up reminders, deal pipeline, and communication history.",
      },
      {
        icon: "puzzle",
        title: "Custom Modules",
        description:
          "Any workflow unique to your organization can be designed and built as a module.",
      },
    ],
  },
  {
    id: "mvp-startup",
    group: "Build",
    shortTitle: "MVP Development",
    title: "MVP & Startup Product Development",
    category: "Startup Launch",
    description:
      "We help startups turn ideas into launch-ready MVPs with planning, UI/UX, development, backend, and deployment — with a clear path to scale.",
    menuIcon: "light-bulb",
    features: [
      {
        icon: "light-bulb",
        title: "Idea Validation",
        description:
          "We help you test assumptions and define what to build before writing a single line of code.",
      },
      {
        icon: "pencil-alt",
        title: "UI/UX Design First",
        description:
          "Wireframes and prototypes reviewed with stakeholders before development begins.",
      },
      {
        icon: "code",
        title: "Lean Development",
        description:
          "We ship only what matters for launch — core features, clean code, no bloat.",
      },
      {
        icon: "cloud",
        title: "Deployment Ready",
        description:
          "Fully deployed, tested, and ready to show investors or real users on day one.",
      },
      {
        icon: "trending-up",
        title: "Scale-Ready Foundation",
        description:
          "Architecture planned for version 2, 3, and beyond without rewriting from scratch.",
      },
      {
        icon: "users",
        title: "Investor-Ready Build",
        description:
          "Clean UI, working features, and a demo that communicates your product clearly.",
      },
    ],
  },
  {
    id: "education-solutions",
    group: "Build",
    shortTitle: "Education Digital Solutions",
    title: "School, College & University Digital Solutions",
    category: "Education Tech",
    description:
      "Dedicated digital platforms for educational institutions — websites, student portals, result systems, admission forms, and admin control.",
    menuIcon: "template",
    features: [
      {
        icon: "globe",
        title: "Academic Website",
        description:
          "Professional institutional website with news, notices, and department pages.",
      },
      {
        icon: "document-text",
        title: "Result & Notice System",
        description:
          "Publish exam results and notices online — searchable and accessible to students.",
      },
      {
        icon: "users",
        title: "Student & Teacher Portal",
        description:
          "Separate login portals for students, teachers, and administrative staff.",
      },
      {
        icon: "clipboard",
        title: "Admission Form System",
        description:
          "Online admission with form submission, approval workflow, and payment tracking.",
      },
      {
        icon: "collection",
        title: "Committee Management",
        description:
          "Manage staff listings, roles, committees, and governance pages from the admin panel.",
      },
      {
        icon: "shield-check",
        title: "Secure & Reliable",
        description:
          "Role-based access ensures students, teachers, and admins only see what they need.",
      },
    ],
  },

  /* ── Automate Group ──────────────────────────────────────── */
  {
    id: "business-automation",
    group: "Automate",
    shortTitle: "Business Automation",
    title: "Business Automation Solutions",
    category: "Automation",
    description:
      "Automation tools to reduce manual work, manage operations, track clients, generate reports, and improve business efficiency across your team.",
    menuIcon: "cog",
    features: [
      {
        icon: "document-text",
        title: "Invoice Automation",
        description:
          "Auto-generate and send branded invoices to clients on milestone or schedule.",
      },
      {
        icon: "clipboard",
        title: "Client & Task Tracking",
        description:
          "Follow-up reminders, task assignment boards, and deadline alerts for your team.",
      },
      {
        icon: "database",
        title: "Inventory Management",
        description:
          "Track stock, purchases, and supplier records without manual spreadsheet entry.",
      },
      {
        icon: "presentation-chart",
        title: "Sales Reporting",
        description:
          "Daily, weekly, and monthly performance reports generated automatically.",
      },
      {
        icon: "users",
        title: "Employee Attendance",
        description:
          "Digital attendance tracking, leave requests, payroll, and HR workflows.",
      },
      {
        icon: "bell",
        title: "Multi-Channel Alerts",
        description:
          "Send automated WhatsApp, SMS, and email notifications based on business events.",
      },
    ],
  },
  {
    id: "ai-automation",
    group: "Automate",
    shortTitle: "AI Agent Development",
    title: "AI Agent & AI Automation",
    category: "Artificial Intelligence",
    description:
      "Custom AI agents, chatbots, and automation systems that help businesses handle customer support, data processing, documents, and repetitive tasks.",
    menuIcon: "sparkles",
    features: [
      {
        icon: "chat",
        title: "AI Customer Support",
        description:
          "24/7 chatbot that handles common questions, collects leads, and escalates when needed.",
      },
      {
        icon: "device-mobile",
        title: "WhatsApp AI Bot",
        description:
          "Automatically respond, qualify, and route leads from your WhatsApp Business number.",
      },
      {
        icon: "document-text",
        title: "Document Assistant",
        description:
          "Extract key data, summarize content, and answer questions from PDFs or contracts.",
      },
      {
        icon: "database",
        title: "RAG Knowledge Base",
        description:
          "Custom AI trained on your products and FAQs — answers accurately, stays on brand.",
      },
      {
        icon: "mail",
        title: "Email Automation",
        description:
          "Read, categorize, and draft replies to incoming emails based on content and context.",
      },
      {
        icon: "trending-up",
        title: "Lead Generation Bot",
        description:
          "Capture and qualify leads across your website, WhatsApp, and social channels.",
      },
    ],
  },
  {
    id: "api-integration",
    group: "Automate",
    shortTitle: "API Integration",
    title: "API Development & Integration",
    category: "Backend & APIs",
    description:
      "Secure backend APIs and third-party integrations including payment gateways, SMS, email, maps, and business tools — connecting your software stack.",
    menuIcon: "cube",
    features: [
      {
        icon: "code",
        title: "REST API Development",
        description:
          "Clean, versioned REST APIs with proper authentication, validation, and documentation.",
      },
      {
        icon: "currency-dollar",
        title: "Payment Gateway",
        description:
          "bKash, SSLCommerz, Stripe, and other gateways integrated and tested end-to-end.",
      },
      {
        icon: "device-mobile",
        title: "SMS & WhatsApp APIs",
        description:
          "Send OTPs, alerts, and messages programmatically via SMS and WhatsApp Business.",
      },
      {
        icon: "globe",
        title: "Map & Location APIs",
        description:
          "Google Maps, geocoding, distance calculation, and delivery zone management.",
      },
      {
        icon: "puzzle",
        title: "Third-Party Integrations",
        description:
          "Firebase, Zapier, CRM tools, and business software connected to your system.",
      },
      {
        icon: "shield-check",
        title: "Secure by Design",
        description:
          "Rate limiting, JWT auth, CORS policies, and input sanitization on every endpoint.",
      },
    ],
  },
  {
    id: "crm-client-management",
    group: "Automate",
    shortTitle: "CRM System",
    title: "CRM & Client Management System",
    category: "Client Relations",
    description:
      "Custom CRM software to manage leads, clients, follow-ups, project status, invoices, payments, files, and full communication history.",
    menuIcon: "presentation-chart",
    features: [
      {
        icon: "users",
        title: "Client Database",
        description:
          "Centralized record of every client — contact info, history, status, and notes.",
      },
      {
        icon: "bell",
        title: "Follow-Up Tracking",
        description:
          "Set reminders and track every touchpoint so no lead or client falls through the cracks.",
      },
      {
        icon: "clipboard",
        title: "Project Status Tracking",
        description:
          "See every active project's progress, assigned team, and upcoming milestones at a glance.",
      },
      {
        icon: "currency-dollar",
        title: "Invoice & Payments",
        description:
          "Generate invoices, track payment status, and send reminders automatically.",
      },
      {
        icon: "document-text",
        title: "Client File Management",
        description:
          "Store and retrieve contracts, agreements, and documents linked to each client.",
      },
      {
        icon: "trending-up",
        title: "Lead Pipeline",
        description:
          "Move leads through stages from first contact to closed deal with pipeline views.",
      },
    ],
  },
  {
    id: "pos-inventory",
    group: "Automate",
    shortTitle: "POS & Inventory Software",
    title: "POS, Inventory & Sales Management",
    category: "Retail Operations",
    description:
      "Practical POS and inventory systems for shops and local businesses that need cleaner sales, stock, purchase, and invoice management.",
    menuIcon: "shopping-bag",
    features: [
      {
        icon: "currency-dollar",
        title: "Shop POS",
        description:
          "Fast sales entry, barcode scanning, receipt printing, and daily cash summary.",
      },
      {
        icon: "database",
        title: "Stock Management",
        description:
          "Track inventory levels in real time — get alerts before you run out of stock.",
      },
      {
        icon: "presentation-chart",
        title: "Sales Reports",
        description:
          "View daily, weekly, and monthly sales with filters, charts, and export options.",
      },
      {
        icon: "clipboard",
        title: "Purchase Tracking",
        description:
          "Record supplier purchases, pending deliveries, and restock history with ease.",
      },
      {
        icon: "document-text",
        title: "Invoice Generation",
        description:
          "Auto-generate branded invoices and receipts for every transaction.",
      },
      {
        icon: "users",
        title: "Supplier & Customer Records",
        description:
          "Maintain contact and transaction history for all suppliers and customers.",
      },
    ],
  },
  {
    id: "whatsapp-automation",
    group: "Automate",
    shortTitle: "WhatsApp Automation",
    title: "WhatsApp Business Automation",
    category: "Communication",
    description:
      "WhatsApp workflows for faster replies, lead collection, order updates, reminders, support, and smarter customer communication.",
    menuIcon: "cog",
    features: [
      {
        icon: "chat",
        title: "Auto Reply",
        description:
          "Instantly respond to common questions, greetings, and FAQs without manual effort.",
      },
      {
        icon: "trending-up",
        title: "Lead Collection",
        description:
          "Capture name, phone, and interest automatically and send leads to your CRM or sheet.",
      },
      {
        icon: "refresh",
        title: "Order Updates",
        description:
          "Send real-time order confirmation, shipping, and delivery notifications to customers.",
      },
      {
        icon: "users",
        title: "Customer Support",
        description:
          "Handle repeat questions automatically and escalate complex issues to your team.",
      },
      {
        icon: "bell",
        title: "Payment Reminders",
        description:
          "Automatically remind clients of upcoming dues or overdue payments on schedule.",
      },
      {
        icon: "clipboard",
        title: "Appointment Reminders",
        description:
          "Send booking confirmations and reminder messages to reduce no-shows.",
      },
    ],
  },
  {
    id: "data-reporting",
    group: "Automate",
    shortTitle: "Data & Reporting Software",
    title: "Data Management & Reporting Software",
    category: "Business Intelligence",
    description:
      "Software for businesses moving away from manual Excel files into organized data entry, reporting, dashboards, exports, and analytics.",
    menuIcon: "presentation-chart",
    features: [
      {
        icon: "code",
        title: "Excel to Software",
        description:
          "Convert your existing spreadsheets into a structured, searchable database system.",
      },
      {
        icon: "presentation-chart",
        title: "Report Dashboard",
        description:
          "Visual summaries of key metrics — filterable by date, category, or branch.",
      },
      {
        icon: "document-text",
        title: "Scheduled Reports",
        description:
          "Auto-generate daily, weekly, or monthly reports and send them by email.",
      },
      {
        icon: "clipboard",
        title: "Data Entry Panel",
        description:
          "Clean, role-restricted forms for your team to enter and update records accurately.",
      },
      {
        icon: "collection",
        title: "PDF & Excel Export",
        description:
          "Export any report or data view as a formatted PDF or Excel file on demand.",
      },
      {
        icon: "trending-up",
        title: "Analytics Dashboard",
        description:
          "Track trends, spot anomalies, and make data-driven decisions with visual charts.",
      },
    ],
  },

  /* ── Grow Group ──────────────────────────────────────────── */
  {
    id: "ui-ux",
    group: "Grow",
    shortTitle: "UI/UX Design",
    title: "UI/UX Design",
    category: "Design",
    description:
      "Clean, modern, user-friendly interface design for websites, mobile apps, dashboards, and digital products — from wireframes to pixel-perfect Figma files.",
    menuIcon: "pencil-alt",
    features: [
      {
        icon: "device-mobile",
        title: "Mobile App UI",
        description:
          "Intuitive screen-by-screen design for Android and iOS apps with consistent design language.",
      },
      {
        icon: "template",
        title: "Website UI Design",
        description:
          "Modern, brand-aligned website designs ready for developer handoff.",
      },
      {
        icon: "presentation-chart",
        title: "Dashboard UI",
        description:
          "Data-rich admin panels and dashboards designed for clarity and efficiency.",
      },
      {
        icon: "pencil-alt",
        title: "Wireframes & Prototypes",
        description:
          "Low-fidelity wireframes and interactive Figma prototypes before development starts.",
      },
      {
        icon: "sparkles",
        title: "Design System",
        description:
          "Reusable component library with colors, typography, and spacing tokens for consistency.",
      },
      {
        icon: "users",
        title: "User Research",
        description:
          "Understand your users' goals and pain points before defining any screen or flow.",
      },
    ],
  },
  {
    id: "hosting-deployment",
    group: "Grow",
    shortTitle: "Hosting & Deployment",
    title: "Hosting, Deployment & Maintenance",
    category: "Infrastructure",
    description:
      "Domain, hosting, server setup, deployment, SSL, database configuration, and ongoing technical maintenance — so your product stays live and fast.",
    menuIcon: "server",
    features: [
      {
        icon: "globe",
        title: "Domain & SSL Setup",
        description:
          "Domain registration, DNS configuration, and HTTPS SSL certificates for every site.",
      },
      {
        icon: "cloud",
        title: "Cloud Deployment",
        description:
          "Deploy on Vercel, VPS, cPanel, Firebase, or AWS depending on your project needs.",
      },
      {
        icon: "database",
        title: "Database Configuration",
        description:
          "Production-ready database setup with backups, indexing, and security hardening.",
      },
      {
        icon: "mail",
        title: "Business Email Setup",
        description:
          "Configure professional email on Google Workspace, Zoho Mail, or cPanel hosting.",
      },
      {
        icon: "shield-check",
        title: "Server Security",
        description:
          "Firewall rules, access controls, and monitoring to keep your server protected.",
      },
      {
        icon: "refresh",
        title: "Ongoing Maintenance",
        description:
          "Regular updates, backups, performance checks, and technical support after launch.",
      },
    ],
  },
  {
    id: "seo-growth",
    group: "Grow",
    shortTitle: "SEO Setup",
    title: "SEO & Digital Growth Setup",
    category: "Growth",
    description:
      "Technical SEO, analytics, tracking tools, performance optimization, and conversion-focused pages to grow your online visibility and business results.",
    menuIcon: "globe",
    features: [
      {
        icon: "search",
        title: "Technical SEO",
        description:
          "Fix crawl errors, sitemap, schema markup, meta tags, and page speed for better rankings.",
      },
      {
        icon: "presentation-chart",
        title: "Analytics Setup",
        description:
          "Google Analytics 4, Search Console, and conversion event tracking configured properly.",
      },
      {
        icon: "chip",
        title: "Meta Pixel & Tracking",
        description:
          "Facebook Pixel, TikTok events, and Google Tag Manager set up for accurate ad tracking.",
      },
      {
        icon: "trending-up",
        title: "On-Page Optimization",
        description:
          "Keyword placement, content structure, internal linking, and metadata improved.",
      },
      {
        icon: "template",
        title: "Landing Page Optimization",
        description:
          "Conversion-focused page design with clear CTAs, fast load time, and A/B-ready structure.",
      },
      {
        icon: "refresh",
        title: "Performance Monitoring",
        description:
          "Regular SEO health checks and ranking reports to track growth over time.",
      },
    ],
  },
  {
    id: "branding-creative",
    group: "Grow",
    shortTitle: "Branding Design",
    title: "Branding & Creative Design",
    category: "Brand Identity",
    description:
      "Professional brand identity, social media creatives, business cards, company profiles, and marketing materials that make your business look credible and memorable.",
    menuIcon: "chip",
    features: [
      {
        icon: "sparkles",
        title: "Logo & Brand Identity",
        description:
          "Custom logo design with full color palette, typography, and usage guidelines.",
      },
      {
        icon: "pencil-alt",
        title: "Social Media Design",
        description:
          "Consistent post templates, stories, covers, and creatives for all platforms.",
      },
      {
        icon: "document-text",
        title: "Business Cards & Print",
        description:
          "Business cards, brochures, letterheads, and print materials ready for production.",
      },
      {
        icon: "collection",
        title: "Company Profile",
        description:
          "Designed PDF company profile that presents your services professionally to clients.",
      },
      {
        icon: "template",
        title: "Brand Guidelines",
        description:
          "A document defining how your brand looks and sounds — for internal and external use.",
      },
      {
        icon: "chip",
        title: "Banner & Marketing",
        description:
          "Digital and print banners, event materials, and campaign creatives for promotions.",
      },
    ],
  },
  {
    id: "software-consulting",
    group: "Grow",
    shortTitle: "Software Consulting",
    title: "Software Consulting & Digital Strategy",
    category: "Consulting",
    description:
      "We help businesses understand requirements, plan software systems, choose the right technology, and execute projects efficiently with less risk and waste.",
    menuIcon: "light-bulb",
    features: [
      {
        icon: "clipboard",
        title: "Requirement Analysis",
        description:
          "We listen carefully, map your workflow, and translate business needs into clear specs.",
      },
      {
        icon: "light-bulb",
        title: "Idea Validation",
        description:
          "Honest assessment of your software idea before you invest in development.",
      },
      {
        icon: "code",
        title: "Tech Stack Selection",
        description:
          "Recommend the right languages, frameworks, and tools for your project and budget.",
      },
      {
        icon: "scale",
        title: "Architecture Planning",
        description:
          "Design a system structure that supports your launch and scales as you grow.",
      },
      {
        icon: "currency-dollar",
        title: "Cost Estimation",
        description:
          "Transparent breakdown of what your project will cost and how long it will take.",
      },
      {
        icon: "trending-up",
        title: "MVP Planning",
        description:
          "Define exactly what to build first for the fastest path to a working product.",
      },
    ],
  },
];

/* Group metadata for sidebar section headers */
export const explorerGroups = [
  { id: "Build", label: "Build", description: "Websites, apps & software" },
  { id: "Automate", label: "Automate", description: "Automation, AI & integrations" },
  { id: "Grow", label: "Grow", description: "Design, launch & growth" },
];
