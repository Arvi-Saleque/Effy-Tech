/* ============================================================
   Effy Tech — Site Configuration
   Centralized brand data, navigation, and social links.
   Components import from here — no hardcoded strings scattered.
   ============================================================ */

const siteConfig = {
  /* ── Brand ───────────────────────────────────────────────── */
  name: "Effy Tech",
  tagline: "Smart Solutions. Simple Execution.",
  description:
    "We craft modern, scalable, and beautiful digital products that drive growth and innovation.",
  url: "https://www.effytechbd.com",

  /* ── Navigation Links ────────────────────────────────────── */
  navLinks: [
    { label: "Services", href: "/#services" },
    { label: "Projects", href: "/#work" },
    { label: "Process", href: "/#process" },
    { label: "About", href: "/#about" },
    { label: "Contact", href: "/#contact" },
  ],

  /* ── Social Media ────────────────────────────────────────── */
  socials: [
    { platform: "facebook", url: "https://www.facebook.com/profile.php?id=61588615151448" },
    { platform: "linkedin", url: "https://www.linkedin.com/company/effy-tech" },
    { platform: "instagram", url: "https://www.instagram.com/effy__tech/" },
  ],

  /* ── Contact Info ────────────────────────────────────────── */
  contact: {
    email: "effytechbd@gmail.com",
    phone: "+8801511190270",
    address: "9/7, Garden Street, Shyamoli, Dhaka-1207.",
  },

  /* ── Project Filter Categories ───────────────────────────── */
  projectCategories: ["All", "Web", "Android"],

  /* ── About Section ───────────────────────────────────────── */
  about: {
    story: {
      title: "Our Story",
      text: "Founded with a vision to bridge the gap between cutting-edge technology and business growth, Effy Tech has evolved from a small dev studio into a full-service digital product company. We partner with startups and enterprises alike to turn ambitious ideas into polished, scalable products.",
    },
    mission: {
      title: "Our Mission",
      text: "To empower businesses with technology that is beautiful, performant, and built to last. Every line of code we write is driven by clarity, scalability, and purpose.",
    },
    values: [
      {
        label: "Quality First",
        desc: "We ship code we're proud of — tested, reviewed, and refined.",
      },
      {
        label: "User Obsessed",
        desc: "Every decision starts with the end user experience.",
      },
      {
        label: "Transparent",
        desc: "Open communication, honest timelines, no surprises.",
      },
    ],
    techStack: [
      "React",
      "Next.js",
      "Node.js",
      "TypeScript",
      "MongoDB",
      "PostgreSQL",
      "AWS",
      "Docker",
      "Figma",
      "Tailwind CSS",
      "GraphQL",
      "Redis",
    ],
    stats: [],
  },

  /* ── Footer ──────────────────────────────────────────────── */
  /* Services Section */
  services: [
    {
      id: "website-webapp",
      title: "Website & Web Application Development",
      shortTitle: "Website Development",
      description:
        "Modern, responsive, SEO-friendly websites and custom web applications for businesses, institutions, and startups.",
      icon: "website",
      featured: true,
      examples: [
        "Business and company websites",
        "School, college, and university websites",
        "Landing pages, portfolios, blogs, and news sites",
        "Custom web apps, SaaS tools, and booking systems",
      ],
    },
    {
      id: "mobile-app",
      title: "Mobile App Development",
      shortTitle: "Mobile App Development",
      description:
        "Cross-platform Android and iOS applications with modern UI, smooth performance, and scalable backend integration.",
      icon: "mobile",
      featured: true,
      examples: [
        "Android and iOS apps",
        "Flutter business apps",
        "Education, booking, delivery, and service apps",
        "Firebase-based apps with admin and user roles",
      ],
    },
    {
      id: "fullstack-software",
      title: "Full-Stack Software Development",
      shortTitle: "Custom Software Development",
      description:
        "Complete software solutions from frontend design to backend APIs, databases, admin panels, and deployment.",
      icon: "fullstack",
      examples: [
        "Frontend, backend, and database systems",
        "Authentication and role-based dashboards",
        "File uploads, reports, and notifications",
        "Payment-ready custom software platforms",
      ],
    },
    {
      id: "business-automation",
      title: "Business Automation Solutions",
      shortTitle: "Business Automation",
      description:
        "Automation tools to reduce manual work, manage operations, track clients, generate reports, and improve business efficiency.",
      icon: "automation",
      featured: true,
      examples: [
        "Invoice and report automation",
        "Client, task, inventory, and sales tracking",
        "Employee attendance and CRM systems",
        "WhatsApp, SMS, and email workflow automation",
      ],
    },
    {
      id: "ai-automation",
      title: "AI Agent & AI Automation",
      shortTitle: "AI Agent Development",
      description:
        "Custom AI agents, chatbots, and automation systems that help businesses handle support, data, documents, and repetitive tasks.",
      icon: "ai",
      featured: true,
      examples: [
        "Website and customer support AI assistants",
        "WhatsApp AI bots and lead generation bots",
        "AI document and email assistants",
        "RAG-based knowledge assistants",
      ],
    },
    {
      id: "ecommerce",
      title: "E-commerce Development",
      shortTitle: "E-commerce Solutions",
      description:
        "Complete online store development with product management, cart, order tracking, payment integration, and admin control.",
      icon: "ecommerce",
      featured: true,
      examples: [
        "Online shops and product catalogs",
        "Cart, checkout, coupons, and order tracking",
        "Payment gateway and delivery charge setup",
        "Admin, customer, and inventory dashboards",
      ],
    },
    {
      id: "ui-ux",
      title: "UI/UX Design",
      shortTitle: "UI/UX Design",
      description:
        "Clean, modern, user-friendly interface design for websites, mobile apps, dashboards, and digital products.",
      icon: "design",
      examples: [
        "Website and mobile app UI design",
        "Dashboard UI design",
        "Figma wireframes and prototypes",
        "Landing page and design system creation",
      ],
    },
    {
      id: "dashboard-admin",
      title: "Dashboard & Admin Panel Development",
      shortTitle: "Dashboard Development",
      description:
        "Custom dashboards and admin panels to manage users, content, sales, reports, files, and business operations.",
      icon: "dashboard",
      examples: [
        "Business and sales dashboards",
        "School and university admin panels",
        "E-commerce and analytics dashboards",
        "Employee, client, and content management panels",
      ],
    },
    {
      id: "erp-management",
      title: "Custom ERP & Management Software",
      shortTitle: "Custom Software / ERP",
      description:
        "Tailored management systems for schools, businesses, hospitals, shops, and organizations.",
      icon: "erp",
      featured: true,
      examples: [
        "School, university, and hospital management",
        "Restaurant, shop, and inventory management",
        "HR, payroll, POS, and accounting systems",
        "Client and project management software",
      ],
    },
    {
      id: "mvp-startup",
      title: "MVP & Startup Product Development",
      shortTitle: "MVP Development",
      description:
        "We help startups turn ideas into launch-ready MVPs with planning, UI/UX, development, backend, deployment, and future scaling support.",
      icon: "consulting",
      examples: [
        "Startup MVP",
        "Prototype to product",
        "SaaS MVP",
        "Investor/demo-ready product",
        "Version 1 launch",
      ],
    },
    {
      id: "education-solutions",
      title: "School, College & University Digital Solutions",
      shortTitle: "Education Digital Solutions",
      description:
        "Dedicated digital platforms for educational institutions with websites, portals, result systems, admission forms, and admin control.",
      icon: "website",
      examples: [
        "Academic website",
        "Notice/news management",
        "Student and teacher portals",
        "Result system and admission form",
        "Committee/member management",
      ],
    },
    {
      id: "admin-editable-website",
      title: "Admin-Editable Website Development",
      shortTitle: "Admin-Editable Websites",
      description:
        "Client-friendly websites where your team can update content, galleries, files, members, services, and homepage sections without developer help.",
      icon: "dashboard",
      examples: [
        "Add/edit/delete news",
        "Update gallery",
        "Add team members",
        "Manage services",
        "Upload files",
        "Edit homepage sections",
      ],
    },
    {
      id: "api-integration",
      title: "API Development & Integration",
      shortTitle: "API Integration",
      description:
        "Secure backend APIs and third-party integrations including payment gateways, SMS, email, maps, and business tools.",
      icon: "api",
      examples: [
        "REST API development",
        "Payment gateway integration",
        "SMS, email, WhatsApp, and map APIs",
        "Firebase and third-party business tool integration",
      ],
    },
    {
      id: "crm-client-management",
      title: "CRM & Client Management System",
      shortTitle: "CRM System",
      description:
        "Custom CRM software to manage leads, clients, follow-ups, project status, invoices, payments, files, and communication history.",
      icon: "dashboard",
      examples: [
        "Client database",
        "Follow-up tracking",
        "Project status tracking",
        "Invoice and payment tracking",
        "Client file/document management",
        "Lead management",
      ],
    },
    {
      id: "pos-inventory",
      title: "POS, Inventory & Sales Management Software",
      shortTitle: "POS & Inventory Software",
      description:
        "Practical POS and inventory systems for shops and local businesses that need cleaner sales, stock, purchase, and invoice management.",
      icon: "ecommerce",
      examples: [
        "Shop POS",
        "Stock management",
        "Sales report",
        "Purchase tracking",
        "Invoice generation",
        "Supplier/customer records",
      ],
    },
    {
      id: "whatsapp-automation",
      title: "WhatsApp Business Automation",
      shortTitle: "WhatsApp Automation",
      description:
        "WhatsApp workflows for faster replies, lead collection, order updates, reminders, support, and customer communication.",
      icon: "automation",
      examples: [
        "Auto reply",
        "Lead collection",
        "Order update",
        "Customer support",
        "Payment reminder",
        "Appointment reminder",
      ],
    },
    {
      id: "data-reporting",
      title: "Data Management & Reporting Software",
      shortTitle: "Data & Reporting Software",
      description:
        "Software for businesses moving away from manual Excel files into organized data entry, reporting, dashboards, exports, and analytics.",
      icon: "dashboard",
      examples: [
        "Excel-to-software conversion",
        "Report dashboard",
        "Daily/monthly business reports",
        "Data entry panel",
        "Export PDF/Excel",
        "Analytics dashboard",
      ],
    },
    {
      id: "hosting-deployment",
      title: "Hosting, Deployment & Maintenance",
      shortTitle: "Hosting & Deployment",
      description:
        "Domain, hosting, server setup, deployment, SSL, database configuration, and ongoing technical maintenance.",
      icon: "hosting",
      examples: [
        "Domain, hosting, SSL, and email setup",
        "Vercel, VPS, cPanel, and Firebase deployment",
        "Server and database configuration",
        "Ongoing technical maintenance",
      ],
    },
    {
      id: "technical-support",
      title: "Website Maintenance & Technical Support",
      shortTitle: "Technical Support",
      description:
        "Regular updates, bug fixing, content changes, security monitoring, backup, and performance optimization.",
      icon: "support",
      examples: [
        "Bug fixing and feature updates",
        "Content updates and backups",
        "Security monitoring",
        "Website speed and performance optimization",
      ],
    },
    {
      id: "seo-growth",
      title: "SEO & Digital Growth Setup",
      shortTitle: "SEO Setup",
      description:
        "Technical SEO, analytics, tracking tools, performance optimization, and conversion-focused landing pages.",
      icon: "seo",
      examples: [
        "Technical and on-page SEO setup",
        "Google Search Console and Analytics",
        "Meta Pixel and conversion tracking",
        "Landing page optimization",
      ],
    },
    {
      id: "branding-creative",
      title: "Branding & Creative Design",
      shortTitle: "Branding Design",
      description:
        "Professional brand identity, social media creatives, business cards, company profiles, and marketing materials.",
      icon: "branding",
      examples: [
        "Logo and brand identity",
        "Social media post design",
        "Business cards, brochures, and banners",
        "Company profiles and brand guidelines",
      ],
    },
    {
      id: "software-consulting",
      title: "Software Consulting & Digital Strategy",
      shortTitle: "Software Consulting",
      description:
        "We help businesses understand requirements, plan software systems, choose the right technology, and execute projects efficiently.",
      icon: "consulting",
      examples: [
        "Requirement analysis and project planning",
        "Software idea validation",
        "Tech stack and architecture selection",
        "MVP planning and cost estimation",
      ],
    },
    {
      id: "domain-email-it",
      title: "Domain, Business Email & IT Setup",
      shortTitle: "Domain & Business Email",
      description:
        "Non-technical setup support for domains, professional email, DNS, SSL, hosting connection, and basic email deliverability.",
      icon: "hosting",
      examples: [
        "Domain setup",
        "Professional email",
        "Google Workspace / Zoho Mail setup",
        "DNS setup",
        "SSL",
        "Hosting connection",
        "Email deliverability basics",
      ],
    },
  ],

  /* Why Choose Section */
  whyChoose: [
    {
      title: "Business-Focused Approach",
      description:
        "We first understand your goal, audience, and workflow before starting development.",
      icon: "business",
    },
    {
      title: "Clean & Scalable Code",
      description:
        "We build with organized structure so future updates are easier and safer.",
      icon: "code",
    },
    {
      title: "Modern UI Experience",
      description:
        "We create smooth, responsive, and professional interfaces for web and mobile users.",
      icon: "ui",
    },
    {
      title: "Long-Term Support",
      description:
        "We help after launch with updates, improvements, bug fixing, and technical support.",
      icon: "support",
    },
  ],

  /* Team Section */
  team: [
    {
      name: "Salek Bin Hossain",
      role: "Founder & CEO",
      initials: "SH",
      bio: "Leads Effy Tech's product vision, client strategy, and company direction.",
      photo: "/images/salek.png",
      photoPosition: "82% center",
      detailsUrl: "/salek",
      socials: [
        {
          platform: "facebook",
          url: "https://www.facebook.com/arviman019",
        },
        { platform: "github", url: "https://github.com/Arvi-Saleque" },
        {
          platform: "linkedin",
          url: "https://www.linkedin.com/in/salek-bin-hossain/",
        },
        { platform: "mail", url: "mailto:effttech@gmail.com" },
      ],
    },
    {
      name: "Adnan Bin Wahid",
      role: "Co-Founder & Lead Software Engineer",
      initials: "AW",
      bio: "Builds full-stack systems, developer tools, and scalable product features across modern web and backend stacks.",
      photo: "/images/adnan.png",
      detailsUrl: "/adnan",
      socials: [
        { platform: "facebook", url: "https://www.facebook.com/adnan08072/" },
        { platform: "github", url: "https://github.com/adnan-bin-wahid" },
        {
          platform: "linkedin",
          url: "https://www.linkedin.com/in/adnan-bin-wahid/",
        },
        { platform: "mail", url: "mailto:bsse1442@iit.du.ac.bd" },
      ],
    },
    {
      name: "Abdullah Al Saif",
      role: "Co-Founder & Head of Engineering",
      initials: "AS",
      bio: "Builds mobile, web, IoT, and product-focused software while guiding practical engineering execution.",
      photo: "/images/saif.jpeg",
      detailsUrl: "/saif",
      socials: [
        {
          platform: "facebook",
          url: "https://www.facebook.com/saif17313.remian6501",
        },
        { platform: "github", url: "https://github.com/saif17313" },
        {
          platform: "linkedin",
          url: "https://www.linkedin.com/in/abdullahalsaif2107017/",
        },
        { platform: "mail", url: "mailto:abdullahalsaif17313@gmail.com" },
      ],
    },
  ],

  /* Footer */
  footer: {
    columns: [
      {
        title: "Company",
        links: [
          { label: "About", href: "/#about" },
          { label: "Projects", href: "/#projects" },
          { label: "Team", href: "/#team" },
          { label: "Contact", href: "/#contact" },
        ],
      },
      {
        title: "Services",
        links: [
          { label: "Main Services", href: "/#services" },
          { label: "Build Services", href: "/allservices#build" },
          { label: "Automation Services", href: "/allservices#automate" },
          { label: "Growth Services", href: "/allservices#grow" },
        ],
      },
      {
        title: "Explore",
        links: [
          { label: "Services Overview", href: "/quickservices" },
          { label: "All Services", href: "/allservices" },
          { label: "Project Showcase", href: "/#projects" },
          { label: "Start a Project", href: "/#contact" },
        ],
      },
    ],
    copyright: `© ${new Date().getFullYear()} Effy Tech. All rights reserved.`,
  },
};

export default siteConfig;
