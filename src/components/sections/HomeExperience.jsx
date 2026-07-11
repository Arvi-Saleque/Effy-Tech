"use client";

import Image from "next/image";
import Link from "next/link";
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
  Rocket,
  Search,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Workflow,
} from "lucide-react";

const capabilities = [
  {
    number: "01",
    title: "Web Platforms",
    description: "Fast, scalable websites and web applications engineered around real business operations.",
    icon: Globe2,
  },
  {
    number: "02",
    title: "Mobile Products",
    description: "Purpose-built mobile experiences with reliable architecture and polished interaction.",
    icon: Smartphone,
  },
  {
    number: "03",
    title: "Business Automation",
    description: "Connected workflows that remove repetitive work and make operations measurable.",
    icon: Workflow,
  },
  {
    number: "04",
    title: "AI Systems",
    description: "Practical AI agents and intelligent features designed for useful, controlled outcomes.",
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

const founders = [
  {
    name: "Salek Bin Hossain",
    role: "Co-Founder · Engineering",
    image: "/images/salek.jpg",
    summary: "Product architecture, software engineering, and technical execution.",
  },
  {
    name: "Saif",
    role: "Co-Founder · Product",
    image: "/images/saif.jpeg",
    summary: "Product strategy, experience design, and solution planning.",
  },
  {
    name: "Adnan",
    role: "Co-Founder · Operations",
    image: "/images/adnan.png",
    summary: "Operations, delivery coordination, and business growth.",
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
            <h1><span>We turn complex</span><span>workflows into simple</span><em>digital systems.</em></h1>
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
              <div className="project-screen"><Image src="/images/dha/img1.png" alt="Darul Hikmah Academy website" fill sizes="(max-width: 768px) 100vw, 50vw" /></div>
              <div className="project-copy"><span>EDUCATION PLATFORM · 02</span><h3>Darul Hikmah Academy</h3><p>A bilingual academic platform connecting public content, course discovery, materials, and dynamic administration.</p><ul><li>Dynamic content management</li><li>Academic information architecture</li><li>Responsive public experience</li></ul><Link href="/projects/DHA">Open case study <ArrowRight size={15}/></Link></div>
            </motion.article>
            <motion.article className="project-feature project-feature-buek" {...fade}>
              <div className="project-screen"><Image src="/images/buek/img1.png" alt="BUEK university website" fill sizes="(max-width: 768px) 100vw, 50vw" /></div>
              <div className="project-copy"><span>INSTITUTIONAL PLATFORM · 03</span><h3>BUEK</h3><p>A structured university platform for notices, events, media, academic content, and administrative publishing.</p><ul><li>Admin-controlled publishing</li><li>Institutional content system</li><li>Fast public access</li></ul><Link href="/projects/BUEK">Open case study <ArrowRight size={15}/></Link></div>
            </motion.article>
          </div>
        </div>
      </section>

      <section id="process" className="process-section">
        <div className="home-shell process-grid">
          <motion.div className="section-intro" {...fade}><span>03 — PROCESS</span><h2>A clear path from complexity to launch.</h2></motion.div>
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

      <section id="about" className="principles-section">
        <div className="home-shell principles-grid">
          <motion.div className="principles-copy" {...fade}><span>04 — WHY EFFY TECH</span><h2>Built for outcomes.<br/>Backed by engineering discipline.</h2><p>We combine product thinking, technical depth, and direct communication to build systems that remain useful after launch.</p></motion.div>
          <div className="principle-list">
            {principles.map(([title, text, Icon], i) => <motion.article key={title} {...fade}><span>0{i+1}</span><Icon size={23}/><div><h3>{title}</h3><p>{text}</p></div></motion.article>)}
          </div>
        </div>
      </section>

      <section id="team" className="team-section">
        <div className="home-shell">
          <motion.div className="section-intro" {...fade}><span>05 — THE TEAM</span><h2>Built by people who stay close to the work.</h2></motion.div>
          <div className="founder-stage">
            <div className="founder-statement"><span>ENGINEERING-LED. PRODUCT-FOCUSED.</span><p>Small team, direct ownership, and no distance between the people making decisions and the people building the product.</p></div>
            <div className="founder-grid">
              {founders.map((founder, i) => <motion.article className="founder-card" key={founder.name} {...fade}><span>0{i+1}</span><div className="founder-image"><Image src={founder.image} alt={founder.name} fill sizes="400px" /></div><div className="founder-info"><h3>{founder.name}</h3><strong>{founder.role}</strong><p>{founder.summary}</p><a href="#contact">Work with {founder.name.split(' ')[0]} <ArrowRight size={14}/></a></div></motion.article>)}
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="contact-cta">
        <div className="home-shell contact-cta-inner">
          <motion.div {...fade}><span>START A CONVERSATION</span><h2>Have a complex workflow that needs a simpler system?</h2><p>Tell us what is slowing the business down. We will help define the right product and technical direction.</p></motion.div>
          <motion.div className="contact-actions" {...fade}><a className="button button-ivory" href="mailto:effytechbd@gmail.com">Discuss Your Project <ArrowRight size={17}/></a><a href="mailto:effytechbd@gmail.com"><Mail size={17}/> effytechbd@gmail.com</a></motion.div>
        </div>
      </section>
    </main>
  );
}
