import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Layers3, MoveRight, ShieldCheck, Sparkles } from "lucide-react";
import Footer from "@/components/layout/Footer";
import projects from "@/data/projects";

export const metadata = {
  title: "Live Project Case Studies | Effy Tech",
  description: "Explore live Effy Tech products and client platforms: a mobile product, an academic operations platform, and a university website with custom CMS.",
  alternates: { canonical: "/projects" },
  openGraph: { title: "Live Project Case Studies | Effy Tech", description: "Real products and operational systems designed, engineered, launched, and supported by Effy Tech.", url: "/projects", images: [{ url: "/images/projects/og-1200x630.jpg", width: 1200, height: 630, alt: "Effy Tech live project case studies" }] },
  twitter: { card: "summary_large_image", title: "Live Project Case Studies | Effy Tech", description: "Real products and operational systems designed, engineered, launched, and supported by Effy Tech.", images: ["/images/projects/og-1200x630.jpg"] },
};

const sortedProjects = [...projects].sort((a, b) => a.order - b.order);
const capabilities = [
  { icon: Layers3, title: "Connected systems", description: "Public experiences, internal workflows, data, content, and administration designed as one product." },
  { icon: ShieldCheck, title: "Production ownership", description: "Planning, engineering, deployment, analytics, handover, and post-launch support handled end to end." },
  { icon: Sparkles, title: "Purpose-built delivery", description: "Each system is shaped around the organisation, audience, and operational problem - not a generic template." },
];

function ProjectCaseStudy({ project, index }) {
  const reversed = index % 2 === 1;
  return (
    <article id={project.slug.toLowerCase()} className="scroll-mt-28 border-t border-border py-14 sm:py-20 lg:py-24">
      <div className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${reversed ? "lg:[&>*:first-child]:order-2" : ""}`}>
        <div className="relative">
          <div className="absolute -inset-3 rounded-[8px] border border-primary-light/25 bg-primary-lightest/65" />
          <Link href={project.caseStudyUrl} className="group relative block overflow-hidden rounded-[8px] border border-border bg-neutral-white shadow-xl">
            <div className="relative aspect-[1200/630] overflow-hidden">
              <Image src={project.thumbnail} alt={`${project.title} case study preview`} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.025]" priority={index === 0} />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/35 via-transparent to-transparent" />
            </div>
            <div className="absolute bottom-4 right-4 inline-flex h-12 w-12 items-center justify-center rounded-full border border-neutral-white/35 bg-neutral-900/80 text-neutral-white backdrop-blur-sm transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"><ArrowUpRight className="h-5 w-5" /></div>
          </Link>
        </div>
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-primary">{String(index + 1).padStart(2, "0")} - {project.eyebrow}</span>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-neutral-white px-3 py-1 text-xs font-bold text-text-secondary"><span className="h-2 w-2 rounded-full bg-success" />{project.status}</span>
          </div>
          <h2 className="mt-5 max-w-2xl font-heading text-3xl font-black leading-tight text-text-primary sm:text-4xl lg:text-5xl">{project.title}</h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-text-secondary">{project.description}</p>
          <div className="mt-7 rounded-[8px] border border-border bg-neutral-white p-5 shadow-sm sm:p-6"><p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Delivered value</p><p className="mt-3 leading-relaxed text-text-secondary">{project.outcome}</p></div>
          <div className="mt-7 grid gap-3 sm:grid-cols-3">{project.deliverables.map((item) => <div key={item} className="flex gap-3 border-t border-border pt-3 text-sm leading-relaxed text-text-secondary"><Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" /><span>{item}</span></div>)}</div>
          <div className="mt-7 flex flex-wrap gap-2">{project.tags.map((tag) => <span key={tag} className="rounded-full border border-border bg-surface-alt px-3 py-1.5 font-mono text-xs text-text-secondary">{tag}</span>)}</div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href={project.caseStudyUrl} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[8px] bg-surface-dark px-6 py-3 text-sm font-bold text-text-inverse transition-transform hover:-translate-y-0.5">View Case Study<ArrowRight className="h-4 w-4" /></Link>
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[8px] border border-primary/35 bg-primary-lightest px-6 py-3 text-sm font-bold text-primary-dark transition-colors hover:border-primary hover:bg-primary-light/25">{project.liveLabel}<ArrowUpRight className="h-4 w-4" /></a>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function ProjectsPage() {
  const jsonLd = { "@context": "https://schema.org", "@type": "ItemList", name: "Effy Tech live project case studies", itemListElement: sortedProjects.map((project, index) => ({ "@type": "ListItem", position: index + 1, item: { "@type": "CreativeWork", name: project.title, description: project.description, url: `https://www.effytechbd.com${project.caseStudyUrl}`, image: `https://www.effytechbd.com${project.thumbnail}` } })) };
  return (
    <>
      <main className="effy-public-page min-h-screen bg-surface pt-24 text-text-primary">
        <section className="relative overflow-hidden border-b border-border bg-surface pb-16 pt-10 sm:pb-20 lg:pb-24">
          <div className="pointer-events-none absolute inset-0 opacity-50"><div className="absolute -right-24 top-16 h-72 w-72 rounded-full border border-primary-light/30" /><div className="absolute -right-10 top-32 h-72 w-72 rounded-full border border-neutral-300/65" /><div className="absolute inset-0 opacity-[0.28]" style={{ backgroundImage: "radial-gradient(circle, rgba(123,102,58,0.22) 1px, transparent 1px)", backgroundSize: "34px 34px", maskImage: "linear-gradient(to bottom, black, transparent 82%)" }} /></div>
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Link href="/#work" className="inline-flex items-center gap-2 text-sm font-semibold text-text-secondary transition-colors hover:text-primary"><ArrowLeft className="h-4 w-4" />Back to homepage</Link>
            <div className="mt-11 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-16">
              <div><p className="font-mono text-xs font-bold uppercase tracking-[0.24em] text-primary">Selected live work</p><h1 className="mt-5 max-w-5xl font-heading text-4xl font-black leading-[1.02] tracking-[-0.04em] text-text-primary sm:text-6xl lg:text-7xl">Products and platforms built for the real world.</h1><p className="mt-6 max-w-3xl text-lg leading-relaxed text-text-secondary sm:text-xl">These are not design concepts. They are live products and client systems planned, engineered, deployed, and supported by Effy Tech.</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><Link href="/#contact" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[8px] bg-surface-dark px-6 py-3 text-sm font-bold text-text-inverse transition-transform hover:-translate-y-0.5">Start a Project<ArrowRight className="h-4 w-4" /></Link><a href="#case-studies" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[8px] border border-border bg-neutral-white px-6 py-3 text-sm font-bold text-text-primary transition-colors hover:border-primary/45">Explore Case Studies<MoveRight className="h-4 w-4" /></a></div></div>
              <div className="rounded-[8px] border border-neutral-700 bg-surface-dark p-6 text-text-inverse shadow-xl sm:p-8"><p className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-primary-light">What this work demonstrates</p><div className="mt-6 space-y-6">{capabilities.map(({ icon: Icon, title, description }) => <div key={title} className="flex gap-4"><span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-[8px] border border-primary-light/25 bg-primary-light/10 text-primary-light"><Icon className="h-5 w-5" /></span><div><h2 className="font-bold text-neutral-100">{title}</h2><p className="mt-1 text-sm leading-relaxed text-neutral-400">{description}</p></div></div>)}</div></div>
            </div>
          </div>
        </section>
        <section id="case-studies" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{sortedProjects.map((project, index) => <ProjectCaseStudy key={project.slug} project={project} index={index} />)}</section>
        <section className="bg-surface-alt py-16 sm:py-20"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="grid gap-6 border-y border-border py-8 sm:grid-cols-3">{[{k:"Discovery",t:"We clarify the operational problem, audience, scope, risks, and launch priorities before development begins."},{k:"Engineering",t:"Architecture, interface, backend, data, deployment, and quality are designed as one connected delivery."},{k:"Ownership",t:"Clients receive a maintainable system, clear handover, and a team that remains accountable after launch."}].map((item)=><div key={item.k}><p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-primary">{item.k}</p><p className="mt-3 text-sm leading-relaxed text-text-secondary">{item.t}</p></div>)}</div></div></section>
        <section className="bg-surface-dark py-16 text-text-inverse sm:py-20"><div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_auto] lg:items-end lg:px-8"><div><p className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-primary-light">Your system can be next</p><h2 className="mt-4 max-w-3xl font-heading text-3xl font-black leading-tight text-neutral-100 sm:text-5xl">Have a website, platform, or product that needs serious engineering?</h2><p className="mt-4 max-w-2xl leading-relaxed text-neutral-400">Share the problem, current workflow, or product idea. We will help define the right system and a practical route to launch.</p></div><Link href="/#contact" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[8px] bg-primary-light px-7 py-3 text-sm font-black text-neutral-900 transition-transform hover:-translate-y-0.5">Discuss Your Project<ArrowRight className="h-4 w-4" /></Link></div></section>
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
