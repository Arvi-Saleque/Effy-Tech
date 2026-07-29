import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const read = (path) =>
  readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

const canonicalRoutes = [
  "src/app/(website)/services/page.js",
  "src/app/(website)/projects/page.js",
  "src/app/(website)/process/page.js",
  "src/app/(website)/about/page.js",
  "src/app/(website)/team/page.js",
  "src/app/(website)/contact/page.js",
  "src/app/(website)/projects/islamic-amal-tracker/page.js",
  "src/app/(website)/projects/effy-edu-management-system/page.js",
  "src/app/(website)/projects/darul-hikmah-academy/page.js",
  "src/app/(website)/projects/bangladesh-university-of-excellence-khulna/page.js",
  "src/app/(website)/team/salek-bin-hossain/page.js",
  "src/app/(website)/team/abdullah-al-saif/page.js",
  "src/app/(website)/team/adnan-bin-wahid/page.js",
];

test("all approved canonical public routes have page modules", () => {
  for (const route of canonicalRoutes) {
    assert.equal(
      existsSync(new URL(`../${route}`, import.meta.url)),
      true,
      `missing canonical route module: ${route}`,
    );
  }
});

test("primary navigation uses pages, active state, and Next Link", () => {
  const navbar = read("src/components/layout/Navbar.jsx");
  const siteConfig = read("src/theme/siteConfig.js");

  for (const href of [
    "/services",
    "/projects",
    "/process",
    "/about",
    "/team",
    "/contact",
  ]) {
    assert.match(siteConfig, new RegExp(`href: "${href.replace("/", "\\/")}"`));
  }

  assert.doesNotMatch(
    siteConfig.match(/navLinks:\s*\[[\s\S]*?\],\n\n  \/\* ── Social/)?.[0] ||
      "",
    /href:\s*"\/#/,
  );
  assert.match(navbar, /import Link from "next\/link"/);
  assert.match(navbar, /aria-current=\{active \? "page"/);
  assert.match(navbar, /desktop-nav-dropdown/);
});

test("legacy public routes permanently redirect to canonical routes", async () => {
  const { default: nextConfig } = await import("../next.config.mjs");
  const redirects = await nextConfig.redirects();

  const expected = new Map([
    ["/quickservices", "/services"],
    ["/allservices", "/services"],
    ["/salek", "/team/salek-bin-hossain"],
    ["/saif", "/team/abdullah-al-saif"],
    ["/adnan", "/team/adnan-bin-wahid"],
    ["/projects/IAM", "/projects/islamic-amal-tracker"],
    ["/projects/EEMS", "/projects/effy-edu-management-system"],
    ["/projects/DHA", "/projects/darul-hikmah-academy"],
    ["/projects/BUEK", "/projects/bangladesh-university-of-excellence-khulna"],
  ]);

  for (const [source, destination] of expected) {
    const redirect = redirects.find((item) => item.source === source);
    assert.ok(redirect, `missing redirect for ${source}`);
    assert.equal(redirect.destination, destination);
    assert.equal(redirect.permanent, true);
  }
});

test("Effy Edu case study and interactive demo are separate destinations", async () => {
  const projects = read("src/data/projects.js");
  const projectIndex = read("src/app/(website)/projects/page.js");
  const { default: nextConfig } = await import("../next.config.mjs");
  const rewrites = await nextConfig.rewrites();

  assert.match(
    projects,
    /caseStudyUrl: "\/projects\/effy-edu-management-system"/,
  );
  assert.match(projects, /demoUrl: "\/demos\/effy-edu-management-system"/);
  assert.match(projectIndex, /target="_blank"/);
  assert.ok(
    rewrites.some(
      (item) =>
        item.source === "/demos/effy-edu-management-system/:path*" &&
        item.destination === "/effy_edu_management_system/:path*",
    ),
  );
});

test("corporate case studies and leadership pages use breadcrumbs", () => {
  for (const path of [
    "src/app/(website)/projects/page.js",
    "src/app/(website)/allservices/page.js",
    "src/app/(website)/process/page.js",
    "src/app/(website)/about/page.js",
    "src/app/(website)/team/page.js",
    "src/app/(website)/contact/page.js",
    "src/components/showcase/AmalTrackerShowcase.jsx",
    "src/components/showcase/DHAShowcase.jsx",
    "src/components/team/LeadershipProfile.jsx",
  ]) {
    assert.match(read(path), /Breadcrumb/, `breadcrumb missing from ${path}`);
  }
});

test("sitemap exposes canonical routes and excludes legacy aliases", () => {
  const sitemap = read("src/app/sitemap.js");

  for (const route of [
    "/services",
    "/projects/islamic-amal-tracker",
    "/projects/effy-edu-management-system",
    "/team/salek-bin-hossain",
    "/contact",
  ]) {
    assert.ok(
      sitemap.includes(route),
      `canonical sitemap route missing: ${route}`,
    );
  }

  for (const legacy of [
    'path: "/quickservices"',
    'path: "/allservices"',
    'path: "/projects/IAM"',
    'path: "/salek"',
  ]) {
    assert.equal(
      sitemap.includes(legacy),
      false,
      `legacy sitemap route found: ${legacy}`,
    );
  }
});
