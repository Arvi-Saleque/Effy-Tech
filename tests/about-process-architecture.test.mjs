import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const read = (path) => readFileSync(path, "utf8");

const aboutPath = "src/app/(website)/about/page.js";
const processPath = "src/app/(website)/process/page.js";
const explorerPath = "src/components/showcase/ProcessExplorer.jsx";
const stylesPath = "src/styles/about-process.css";

test("About positions Effy Tech as a product-minded engineering studio", () => {
  const source = read(aboutPath);

  for (const statement of [
    "DIGITAL PRODUCT & SOFTWARE STUDIO",
    "Product-minded",
    "Engineering-led",
    "Direct ownership",
    "Built to evolve",
    "practical AI",
  ]) {
    assert.ok(source.includes(statement), `Missing positioning: ${statement}`);
  }
});

test("About connects the three approved delivery groups to canonical Services anchors", () => {
  const source = read(aboutPath);

  for (const anchor of [
    'link: "/services#build"',
    'link: "/services#automate"',
    'link: "/services#grow"',
  ]) {
    assert.ok(source.includes(anchor), `Missing Services route: ${anchor}`);
  }

  assert.match(source, /View all 20 capabilities/);
});

test("About uses canonical project data instead of duplicated claims", () => {
  const source = read(aboutPath);

  assert.match(source, /import projects from "@\/data\/projects"/);
  assert.match(source, /liveProjects\.map/);
  assert.match(source, /\{project\.status\}/);
  assert.match(source, /\{project\.outcome\}/);
  assert.match(source, /href=\{project\.caseStudyUrl\}/);
});

test("About exposes company, capability, proof, and contact routes", () => {
  const source = read(aboutPath);

  for (const route of [
    'href="/team"',
    'href="/services"',
    'href="/projects"',
    'href="/process"',
    'href="/contact"',
  ]) {
    assert.ok(source.includes(route), `Missing internal route: ${route}`);
  }
});

test("Process presents all seven approved delivery phases", () => {
  const source = read(explorerPath);

  for (const title of [
    "Discovery",
    "Scope & Planning",
    "Architecture & Design",
    "Development",
    "Testing & Review",
    "Deployment",
    "Support & Iteration",
  ]) {
    assert.match(source, new RegExp(`title: "${title.replace("&", "\\&")}"`));
  }

  assert.equal((source.match(/\n    number: "/g) || []).length, 7);
});

test("Every Process phase defines work, client input, deliverables, and approval", () => {
  const source = read(explorerPath);

  for (const field of ["effy:", "client:", "deliverables:", "checkpoint:"]) {
    assert.equal(
      (source.match(new RegExp(`\\n    ${field}`, "g")) || []).length,
      7,
      `Expected seven ${field} definitions`,
    );
  }

  for (const label of [
    "What Effy Tech does",
    "What the client provides",
    "Visible deliverables",
    "REVIEW & APPROVAL CHECKPOINT",
  ]) {
    assert.ok(source.includes(label), `Missing detail label: ${label}`);
  }
});

test("Process selector implements accessible tabs and complete keyboard navigation", () => {
  const source = read(explorerPath);

  for (const token of [
    'role="tablist"',
    'role="tab"',
    'role="tabpanel"',
    "aria-selected={selected}",
    'aria-controls="process-stage-panel"',
    '"ArrowRight"',
    '"ArrowLeft"',
    '"ArrowDown"',
    '"ArrowUp"',
    '"Home"',
    '"End"',
  ]) {
    assert.ok(source.includes(token), `Missing accessibility token: ${token}`);
  }
});

test("Process page includes production controls, handover, and canonical actions", () => {
  const source = read(processPath);

  for (const statement of [
    "Decision clarity",
    "Review checkpoints",
    "Production discipline",
    "Maintainable handover",
    "Support and iteration scope agreed",
    'href="/projects"',
    'href="/services"',
    'href="/contact"',
  ]) {
    assert.ok(
      source.includes(statement),
      `Missing process proof: ${statement}`,
    );
  }
});

test("About and Process use isolated styles instead of modifying shared corporate pages", () => {
  const about = read(aboutPath);
  const process = read(processPath);

  assert.match(about, /@\/styles\/about-process\.css/);
  assert.match(process, /@\/styles\/about-process\.css/);
  assert.doesNotMatch(about, /corporate-pages\.css/);
  assert.doesNotMatch(process, /corporate-pages\.css/);
});

test("Step 4 styles cover desktop, tablet, mobile, focusable tabs, and reduced motion", () => {
  const source = read(stylesPath);

  for (const token of [
    "@media (max-width: 1120px)",
    "@media (max-width: 960px)",
    "@media (max-width: 720px)",
    "@media (prefers-reduced-motion: reduce)",
    ".process-tabs button.is-active",
    "overflow-x: auto",
  ]) {
    assert.ok(source.includes(token), `Missing responsive token: ${token}`);
  }
});

test("Step 4 metadata keeps About and Process canonical", () => {
  const about = read(aboutPath);
  const process = read(processPath);

  assert.match(about, /alternates: \{ canonical: "\/about" \}/);
  assert.match(process, /alternates: \{ canonical: "\/process" \}/);
  assert.match(about, /openGraph:/);
  assert.match(process, /openGraph:/);
});
