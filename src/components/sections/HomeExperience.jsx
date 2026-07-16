"use client";

import Image from "next/image";
import Link from "next/link";
import ContactForm from "@/components/sections/ContactForm";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  Braces,
  Check,
  CircuitBoard,
  Code2,
  Database,
  Globe2,
  Layers3,
  Mail,
  Network,
  Building2,
  Gauge,
  Headphones,
  LockKeyhole,
  FileText,
  CheckCircle2,
  Users,
  ArrowUpRight,
  Rocket,
  Search,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Workflow,
  Cloud,
  Server,
  Boxes,
  GraduationCap,
  ShoppingBag,
  HeartPulse,
  Landmark,
} from "lucide-react";

const capabilities = [
  {
    number: "01",
    title: "Web Application Development",
    description: "Business websites, portals, dashboards, and web applications engineered around real operational workflows.",
    icon: Globe2,
  },
  {
    number: "02",
    title: "Mobile App Development",
    description: "Android, iOS, and cross-platform products with reliable architecture, offline capability, and polished interaction.",
    icon: Smartphone,
  },
  {
    number: "03",
    title: "Custom Software & Automation",
    description: "Management systems, internal tools, and connected workflows that reduce repetitive work and centralize operations.",
    icon: Workflow,
  },
  {
    number: "04",
    title: "Backend, Cloud & AI Systems",
    description: "APIs, databases, authentication, cloud delivery, and practical AI features designed for controlled outcomes.",
    icon: Sparkles,
  },
];

const process = [
  { n: "01", title: "Discover", text: "We map the business, users, constraints, and success criteria.", icon: Search },
  { n: "02", title: "Architect", text: "We define the right product structure, workflow, and technical direction.", icon: Layers3 },
  { n: "03", title: "Build", text: "We design, develop, test, and refine the system in focused iterations.", icon: Code2 },
  { n: "04", title: "Launch", text: "We deploy, monitor, support, and improve the product after release.", icon: Rocket },
];

const principles = [
  ["Business-first planning", "Technology follows the actual workflow and business objective.", CircuitBoard],
  ["Scalable engineering", "Clean architecture, clear boundaries, and room for future growth.", Database],
  ["Clear communication", "Direct updates, visible progress, and no unnecessary ambiguity.", Network],
  ["Long-term reliability", "Security, maintainability, and post-launch support are built in.", ShieldCheck],
];

const clientProof = [
  {
    name: "Islamic Amal Tracker",
    proofType: "Effy Tech product",
    status: "Live Android product",
    audience: "Consumer mobile",
    tech: "Flutter · Drift · Supabase",
    note: "An offline-first worship companion with tracking, reminders, insights, widgets, and optional cloud sync.",
    image: "/images/amal/logo.png",
    href: "/projects/IAM",
  },
  {
    name: "Darul Hikmah Academy",
    proofType: "Client platform",
    status: "Production platform",
    audience: "Education operations",
    tech: "Next.js · Supabase",
    note: "A bilingual academic platform with structured public content and dynamic administrative control.",
    image: "/images/dha/case-study/hero.webp",
    href: "/projects/DHA",
  },
  {
    name: "BUEK",
    proofType: "Institutional platform",
    status: "Production platform",
    audience: "University publishing",
    tech: "Next.js · Admin CMS",
    note: "A university publishing system for notices, events, media, academic information, and administration.",
    image: "/images/buek/case-study/hero.webp",
    href: "/projects/BUEK",
  },
];

const outcomes = [
  ["Faster operations", "Replace repeated manual work with structured digital workflows.", Gauge],
  ["Centralized management", "Control content, tasks, and operational data from one dependable system.", Building2],
  ["Better user experience", "Give users clear, responsive, and task-focused interfaces across devices.", Users],
  ["Scalable digital growth", "Build on architecture that can evolve instead of being replaced after launch.", ArrowUpRight],
];

const standards = [
  ["Secure and maintainable", "Permissions, validation, clean boundaries, and a codebase that remains understandable as the product grows.", LockKeyhole, "SECURITY · ARCHITECTURE"],
  ["Responsive and performant", "Core workflows are designed for desktop, tablet, and mobile, with deliberate loading and asset behavior.", Gauge, "EXPERIENCE · PERFORMANCE"],
  ["Tested and supportable", "Critical flows are reviewed before release, with practical documentation, handover, and post-launch support.", CheckCircle2, "QUALITY · HANDOVER"],
];


const technologyGroups = [
  { label: "Frontend", items: ["Next.js", "React", "Tailwind CSS"], icon: Code2 },
  { label: "Mobile", items: ["Flutter", "Android", "Cross-platform"], icon: Smartphone },
  { label: "Backend", items: ["Node.js", "Laravel", "REST APIs"], icon: Server },
  { label: "Data", items: ["PostgreSQL", "Supabase", "Firebase"], icon: Database },
  { label: "Cloud", items: ["Vercel", "Cloudflare", "Secure deployment"], icon: Cloud },
  { label: "Product", items: ["Figma", "Design systems", "QA & handover"], icon: Boxes },
];

const industries = [
  ["Education", "Academic platforms, portals, materials, results, and administration.", GraduationCap],
  ["Islamic Technology", "Purpose-built products for worship, learning, and community workflows.", Landmark],
  ["Business Operations", "Internal tools, dashboards, reporting, and workflow automation.", Building2],
  ["E-commerce", "Product discovery, ordering, management, and operational systems.", ShoppingBag],
  ["Healthcare & Services", "Structured digital experiences for appointments, records, and service delivery.", HeartPulse],
  ["Startups & Product Teams", "MVPs, scalable product foundations, and iterative feature delivery.", Rocket],
];

const faqs = [
  ["What do you need to start a project?", "A clear description of the problem, current workflow, target users, and any deadline or operational constraint. We can help structure the scope from there."],
  ["How are timeline and budget estimated?", "They are based on scope, integrations, design depth, delivery risk, and support requirements—not a generic package price."],
  ["Can you improve an existing system?", "Yes. We can audit an existing codebase, stabilize critical flows, redesign selected parts, or plan a controlled rebuild."],
  ["Who owns the source code and product?", "Ownership is defined before work starts. For client projects, handover and repository access are included according to the agreed scope."],
  ["Do you provide maintenance after launch?", "Yes. Support can include monitoring, bug fixes, controlled improvements, deployment help, and ongoing product work."],
  ["Can you work under an NDA?", "Yes. Confidential workflows, product details, and business information can be covered by an NDA before technical discovery."],
];

const founders = [
  {
    name: "Salek Bin Hossain",
    role: "Founder & CEO",
    image: "/images/profiles/salek.webp",
    summary: "Product strategy, system architecture, backend engineering, and technical leadership.",
  },
  {
    name: "Abdullah Al Saif",
    role: "Co-Founder & Head of Engineering",
    image: "/images/profiles/saif.webp",
    summary: "Engineering execution, responsive delivery, product implementation, and release coordination.",
  },
  {
    name: "Adnan Bin Wahid",
    role: "Co-Founder & Lead Software Engineer",
    image: "/images/profiles/adnan.webp",
    summary: "Full-stack implementation, frontend systems, testing, and delivery quality.",
  },
];

const fade = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
};

function ProductWindow() {
  return (
    <div className="system-window system-window-main">
      <div className="system-window-bar">
        <span /><span /><span />
        <p>operations.effy</p>
      </div>
      <div className="system-dashboard">
        <aside>
          <div className="dashboard-logo"><Braces size={17} /></div>
          {Array.from({ length: 5 }).map((_, i) => <span key={i} className={i === 0 ? "active" : ""} />)}
        </aside>
        <div className="dashboard-content">
          <div className="dashboard-title">
            <div><small>BUSINESS CONTROL</small><strong>Operations overview</strong></div>
            <span>Live</span>
          </div>
          <div className="metric-grid">
            <div><small>Active workflows</small><strong>24</strong><em>+12%</em></div>
            <div><small>Hours recovered</small><strong>186</strong><em>this month</em></div>
            <div><small>Completion rate</small><strong>94%</strong><em>+8.4%</em></div>
          </div>
          <div className="chart-card">
            <div className="chart-heading"><span>System performance</span><small>Last 30 days</small></div>
            <svg viewBox="0 0 480 120" aria-hidden="true">
              <path d="M0 100 C45 92, 55 62, 92 72 S150 96, 188 50 S250 70, 294 38 S360 52, 406 22 S450 26, 480 10" fill="none" stroke="currentColor" strokeWidth="3" />
              <path d="M0 100 C45 92, 55 62, 92 72 S150 96, 188 50 S250 70, 294 38 S360 52, 406 22 S450 26, 480 10 L480 120 L0 120 Z" fill="url(#chartFill)" opacity=".25" />
              <defs><linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="currentColor"/><stop offset="1" stopColor="currentColor" stopOpacity="0"/></linearGradient></defs>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function SystemHeroVisual() {
  return (
    <div className="system-visual" aria-label="Connected digital system illustration">
      <div className="brand-rail brand-rail-one" />
      <div className="brand-rail brand-rail-two" />
      <div className="brand-rail brand-rail-three" />

      <motion.div className="system-orbit system-orbit-a" animate={{ rotate: 360 }} transition={{ duration: 38, repeat: Infinity, ease: "linear" }} />
      <motion.div className="system-orbit system-orbit-b" animate={{ rotate: -360 }} transition={{ duration: 48, repeat: Infinity, ease: "linear" }} />

      <ProductWindow />

      <motion.div className="system-module module-mobile" animate={{ y: [0, -8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
        <div className="module-label"><Smartphone size={15} /> MOBILE PRODUCT</div>
        <Image src="/images/amal/today_dashboard_prayer_times.jpeg" alt="Islamic Amal Tracker mobile interface" width={210} height={420} />
      </motion.div>

      <motion.div className="system-module module-flow" animate={{ y: [0, 7, 0] }} transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut" }}>
        <div className="module-label"><Workflow size={15} /> AUTOMATION</div>
        <div className="flow-list">
          <div><span>01</span><p>New request received</p><i /></div>
          <div><span>02</span><p>Validate and assign</p><i /></div>
          <div><span>03</span><p>Update system</p><Check size={14} /></div>
        </div>
      </motion.div>

      <motion.div className="system-module module-ai" animate={{ y: [0, -5, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}>
        <div className="module-label"><Bot size={15} /> AI LAYER</div>
        <div className="ai-score"><strong>92%</strong><span>forecast confidence</span></div>
        <div className="ai-bars"><i /><i /><i /><i /><i /><i /></div>
      </motion.div>

      <div className="system-core">
        <Image src="/images/logo.png" alt="" width={50} height={50} />
        <span>EFFY SYSTEM</span>
      </div>
    </div>
  );
}

export default function HomeExperience() {
  return (
    <main className="effy-home">
      <section id="hero" className="system-hero">
        <div className="hero-grain" />
        <div className="home-shell hero-grid">
          <motion.div className="hero-copy" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8 }}>
            <div className="eyebrow"><span /> CUSTOM SOFTWARE SYSTEMS</div>
            <h1><span>We turn complex workflows</span><span>into simple digital systems.</span></h1>
            <p>Custom platforms, mobile products, automation, and AI—designed as one connected solution around how your business actually works.</p>
            <div className="hero-actions">
              <a className="button button-dark" href="#contact">Start a Project <ArrowRight size={17} /></a>
              <a className="button button-light" href="#work">Explore Our Work <ArrowRight size={17} /></a>
            </div>
            <div className="hero-proof">
              <div className="proof-mark"><Check size={15} /></div><span>Business-first planning</span>
              <div className="proof-mark"><Check size={15} /></div><span>Scalable engineering</span>
              <div className="proof-mark"><Check size={15} /></div><span>Long-term support</span>
            </div>
          </motion.div>
          <motion.div className="hero-system" initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: .12 }}>
            <SystemHeroVisual />
          </motion.div>
        </div>
        <div className="home-shell audience-strip">
          <span>BUILT FOR</span><p>Businesses</p><i /><p>Startups</p><i /><p>Institutions</p><i /><p>Product Teams</p>
        </div>
      </section>

      <section className="client-trust-section" aria-labelledby="client-trust-title">
        <div className="home-shell client-trust-inner">
          <motion.div className="client-trust-copy" {...fade}>
            <span>00 — SELECTED PRODUCT &amp; PLATFORM PROOF</span>
            <h2 id="client-trust-title">Software already built for real users and operational teams.</h2>
            <p>A mix of Effy Tech-owned products and delivered client or institutional platforms—each designed and engineered for active use.</p>
            <div className="client-trust-assurance" aria-label="Delivery principles">
              <span><CheckCircle2 size={15} /> Clear product ownership</span>
              <span><ShieldCheck size={15} /> Production-minded engineering</span>
            </div>
          </motion.div>

          <div className="client-logo-wall" aria-label="Selected Effy Tech products and delivered platforms">
            {clientProof.map((client, index) => (
              <Link href={client.href} key={client.name} className="client-logo-card">
                <div className="client-logo-media">
                  <Image src={client.image} alt="" fill sizes="(max-width: 820px) 160px, 240px" />
                  <span className="client-proof-index">0{index + 1}</span>
                </div>
                <div className="client-logo-content">
                  <small>{client.proofType}</small>
                  <strong>{client.name}</strong>
                  <p>{client.note}</p>
                  <dl className="client-proof-meta">
                    <div><dt>Status</dt><dd>{client.status}</dd></div>
                    <div><dt>Use case</dt><dd>{client.audience}</dd></div>
                  </dl>
                  <em>{client.tech}</em>
                  <span className="client-project-link">View project <ArrowUpRight size={14} /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="capability-section">
        <div className="home-shell">
          <motion.div className="section-intro section-intro-inverse" {...fade}>
            <span>01 — THE EFFY SYSTEM</span>
            <h2>Capabilities designed to work <em>as one.</em></h2>
            <p>Not isolated services. A connected product system—from interface to infrastructure, workflow, and intelligence.</p>
          </motion.div>
          <div className="capability-system">
            <div className="capability-core">
              <div className="core-mark"><Image src="/images/logo.png" alt="Effy Tech system core" width={66} height={66} /></div>
              <span>ONE CONNECTED SYSTEM</span>
              <strong>Strategy → Product → Operations → Intelligence</strong>
            </div>
            <div className="capability-connectors" aria-hidden="true"><i/><i/><i/><i/></div>
            <div className="capability-orbit">
              {capabilities.map(({ number, title, description, icon: Icon }, index) => (
                <motion.article className={`capability-node capability-node-${index+1}`} key={title} {...fade}>
                  <div className="capability-top"><span>{number}</span><div className="capability-icon"><Icon size={24} /></div></div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <div className="capability-preview">
                    <b>{index === 0 ? "PORTAL / DASHBOARD" : index === 1 ? "MOBILE EXPERIENCE" : index === 2 ? "WORKFLOW ENGINE" : "INSIGHT LAYER"}</b>
                    <div><i/><i/><i/></div>
                  </div>
                  <Link href="/allservices">Explore capability <ArrowRight size={15} /></Link>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="work" className="work-section">
        <div className="home-shell">
          <motion.div className="section-intro" {...fade}>
            <span>02 — FEATURED WORK</span>
            <h2>Products built for real use, not presentation.</h2>
          </motion.div>

          <motion.article className="iam-case" {...fade}>
            <div className="case-copy">
              <span className="case-label">FLAGSHIP MOBILE PRODUCT</span>
              <div className="case-brand"><Image src="/images/amal/logo.png" alt="Islamic Amal Tracker logo" width={52} height={52} /><p>Islamic Amal Tracker</p></div>
              <h3>A complete offline-first system for building consistency in daily worship.</h3>
              <p>Prayer, Kaza, Amal, Dhikr, reading, routines, reminders, statistics, widgets, and cloud sync—engineered as one cohesive mobile product.</p>
              <ul><li><Check size={16}/> Offline-first Flutter architecture</li><li><Check size={16}/> Structured tracking and smart reminders</li><li><Check size={16}/> Detailed progress and consistency insights</li></ul>
              <Link className="button button-ivory" href="/projects/IAM">View Case Study <ArrowRight size={17} /></Link>
            </div>
            <div className="case-visual">
              <div className="case-glow" />
              <div className="phone phone-main"><Image src="/images/amal/today_dashboard_prayer_times.jpeg" alt="Islamic Amal Tracker dashboard" fill sizes="260px" /></div>
              <div className="phone phone-left"><Image src="/images/amal/more_stats_progress_today.jpeg" alt="Islamic Amal Tracker statistics" fill sizes="220px" /></div>
              <div className="phone phone-right"><Image src="/images/amal/dhikr_dashboard.jpeg" alt="Islamic Amal Tracker dhikr screen" fill sizes="220px" /></div>
            </div>
          </motion.article>

          <div className="secondary-projects editorial-projects">
            <motion.article className="project-feature project-feature-dha" {...fade}>
              <div className="project-screen"><Image src="/images/dha/case-study/hero.webp" alt="Darul Hikmah Academy website" fill sizes="(max-width: 768px) 100vw, 50vw" /></div>
              <div className="project-copy"><span>EDUCATION PLATFORM · 02</span><h3>Darul Hikmah Academy</h3><p><b>Problem:</b> Academic information and public content needed one structured, maintainable platform.</p><p><b>Solution:</b> A bilingual website with dynamic administration, course discovery, materials, and responsive public access.</p><ul><li>Status: Production platform</li><li>Stack: Next.js · Supabase</li><li>Outcome: Centralized content management</li></ul><Link href="/projects/DHA">Open case study <ArrowRight size={15}/></Link></div>
            </motion.article>
            <motion.article className="project-feature project-feature-buek" {...fade}>
              <div className="project-screen"><Image src="/images/buek/case-study/hero.webp" alt="BUEK university website" fill sizes="(max-width: 768px) 100vw, 50vw" /></div>
              <div className="project-copy"><span>INSTITUTIONAL PLATFORM · 03</span><h3>BUEK</h3><p><b>Problem:</b> Notices, events, media, and academic information needed a reliable publishing workflow.</p><p><b>Solution:</b> A structured university platform with admin-controlled content and fast public access.</p><ul><li>Status: Production platform</li><li>Stack: Next.js · Admin CMS</li><li>Outcome: Organized institutional publishing</li></ul><Link href="/projects/BUEK">Open case study <ArrowRight size={15}/></Link></div>
            </motion.article>
          </div>
        </div>
      </section>

      <section id="outcomes" className="outcomes-section">
        <div className="home-shell">
          <motion.div className="section-intro" {...fade}>
            <span>03 — CLIENT OUTCOMES</span>
            <h2>Built to create operational value, not just another interface.</h2>
            <p>Every project is shaped around a concrete improvement in how the organization works, serves users, or grows.</p>
          </motion.div>
          <div className="outcome-grid">
            {outcomes.map(([title, text, Icon], index) => (
              <motion.article key={title} {...fade}>
                <div><span>0{index + 1}</span><Icon size={24}/></div>
                <h3>{title}</h3>
                <p>{text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="process-section">
        <div className="home-shell process-grid">
          <motion.div className="section-intro" {...fade}><span>04 — PROCESS</span><h2>A clear path from complexity to launch.</h2></motion.div>
          <div className="process-journey">
            <div className="process-spine" aria-hidden="true" />
            {process.map(({ n, title, text, icon: Icon }, index) => <motion.article key={title} className="process-step" {...fade}>
              <div className="process-number">{n}</div>
              <div className="process-artifact">
                <div className="process-icon"><Icon size={25}/></div>
                <div className="artifact-lines"><i/><i/><i/></div>
              </div>
              <div className="process-copy"><span>{index === 0 ? "UNDERSTAND" : index === 1 ? "STRUCTURE" : index === 2 ? "EXECUTE" : "IMPROVE"}</span><h3>{title}</h3><p>{text}</p></div>
            </motion.article>)}
          </div>
        </div>
      </section>

      <section id="standards" className="standards-section">
        <div className="home-shell standards-layout">
          <motion.div className="standards-heading" {...fade}>
            <span>05 — ENGINEERING STANDARDS & OUTCOMES</span>
            <h2>Engineering discipline behind every practical outcome.</h2>
            <p>We combine business-first planning, secure architecture, performance, testing, documentation, direct communication, and post-launch support in one delivery standard.</p>
          </motion.div>
          <div className="standards-grid">
            {standards.map(([title, text, Icon, label], index) => (
              <motion.article key={title} {...fade}>
                <div className="standards-icon"><Icon size={24}/></div>
                <span>0{index + 1}</span>
                <small>{label}</small>
                <h3>{title}</h3>
                <p>{text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="technology" className="technology-section">
        <div className="home-shell">
          <motion.div className="section-intro" {...fade}>
            <span>06 — TECHNOLOGY STACK</span>
            <h2>Modern tools, selected for the system—not for the trend.</h2>
            <p>We choose the stack around product requirements, operational constraints, maintainability, and the team that will own the system after delivery.</p>
          </motion.div>
          <div className="technology-grid">
            {technologyGroups.map(({ label, items, icon: Icon }, index) => (
              <motion.article key={label} {...fade}>
                <div className="technology-card-top"><span>0{index + 1}</span><Icon size={23}/></div>
                <h3>{label}</h3>
                <div className="technology-tags">{items.map((item) => <span key={item}>{item}</span>)}</div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="about-industries-section">
        <div className="home-shell about-industries-layout">
          <motion.div className="about-company" {...fade}>
            <span>07 — ABOUT EFFY TECH</span>
            <h2>A software company focused on practical systems that stay useful.</h2>
            <p>Effy Tech plans, designs, engineers, deploys, and supports digital products for businesses, institutions, and product teams. We stay close to the workflow, communicate directly, and build with long-term ownership in mind.</p>
            <div className="about-company-points">
              <div><strong>Direct ownership</strong><span>The people planning the work remain involved in delivery.</span></div>
              <div><strong>End-to-end execution</strong><span>Product thinking, interface design, engineering, deployment, and support.</span></div>
            </div>
          </motion.div>
          <div className="industries-panel">
            <div className="industries-heading"><span>WHO WE WORK WITH</span><h3>Relevant experience across focused industries.</h3></div>
            <div className="industries-grid">
              {industries.map(([title, text, Icon]) => (
                <motion.article key={title} {...fade}><Icon size={22}/><div><h4>{title}</h4><p>{text}</p></div></motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="team" className="team-section">
        <div className="home-shell">
          <motion.div className="section-intro" {...fade}><span>08 — THE TEAM</span><h2>Built by people who stay close to the work.</h2></motion.div>
          <div className="founder-stage">
            <div className="founder-statement"><span>ENGINEERING-LED. PRODUCT-FOCUSED.</span><p>Small team, direct ownership, and no distance between the people making decisions and the people building the product.</p></div>
            <div className="founder-grid">
              {founders.map((founder, i) => <motion.article className="founder-card" key={founder.name} {...fade}><span>0{i+1}</span><div className="founder-image"><Image src={founder.image} alt={founder.name} fill sizes="400px" /></div><div className="founder-info"><h3>{founder.name}</h3><strong>{founder.role}</strong><p>{founder.summary}</p><a href="#contact">Work with {founder.name.split(' ')[0]} <ArrowRight size={14}/></a></div></motion.article>)}
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="faq-section">
        <div className="home-shell faq-layout">
          <motion.div className="faq-heading" {...fade}>
            <span>09 — FAQ</span>
            <h2>Important questions before a software project starts.</h2>
            <p>Clear expectations reduce delivery risk. These are the questions clients usually need answered first.</p>
          </motion.div>
          <div className="faq-list">
            {faqs.map(([question, answer], index) => (
              <motion.details key={question} {...fade}>
                <summary><span>0{index + 1}</span>{question}<b>+</b></summary>
                <p>{answer}</p>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="contact-section">
        <div className="home-shell contact-layout">
          <motion.div className="contact-copy" {...fade}>
            <span>10 — START A PROJECT</span>
            <h2>Have a workflow that needs a better system?</h2>
            <p>Share the problem, the current process, and the result you need. We will help define the practical product and technical direction.</p>
            <div className="contact-details">
              <a href="mailto:effytechbd@gmail.com"><Mail size={19}/><div><small>BUSINESS EMAIL</small><strong>effytechbd@gmail.com</strong></div></a>
              <a href="tel:+8801511190270"><Smartphone size={19}/><div><small>PHONE / WHATSAPP</small><strong>+880 1511-190270</strong></div></a>
              <div><Building2 size={19}/><div><small>LOCATION</small><strong>Shyamoli, Dhaka, Bangladesh</strong></div></div>
            </div>
            <div className="contact-response"><CheckCircle2 size={17}/> Usually responds within one business day.</div>
          </motion.div>
          <motion.div className="contact-form-card" {...fade}>
            <div className="contact-form-heading"><span>PROJECT BRIEF</span><h3>Tell us what you are planning.</h3></div>
            <ContactForm />
          </motion.div>
        </div>
      </section>
    </main>
  );
}
