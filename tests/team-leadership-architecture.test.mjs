import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

import {
  teamProfileOrder,
  teamProfileRoutes,
  teamProfiles,
} from "../src/data/teamProfiles.js";

const read = (path) =>
  readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

test("the leadership directory has three canonical, accountable profiles", () => {
  assert.deepEqual(teamProfileOrder, ["salek", "saif", "adnan"]);
  assert.deepEqual(Object.keys(teamProfileRoutes).sort(), [
    "adnan",
    "saif",
    "salek",
  ]);

  for (const slug of teamProfileOrder) {
    const profile = teamProfiles[slug];
    assert.ok(profile, `missing profile: ${slug}`);
    assert.ok(profile.name);
    assert.ok(profile.role);
    assert.ok(profile.discipline);
    assert.ok(profile.intro);
    assert.match(teamProfileRoutes[slug], /^\/team\//);
  }
});

test("the team page uses the interactive leadership roster and accountability model", () => {
  const page = read("src/app/(website)/team/page.js");

  assert.match(page, /<LeadershipRoster profiles=\{profiles\}/);
  assert.match(page, /id="leadership"/);
  assert.match(page, /WHO OWNS WHAT/);
  assert.match(page, /HOW THE TEAM OPERATES/);
  assert.match(page, /accountabilityPrinciples\.map/);
  assert.match(page, /href="\/process"/);
});

test("the leadership selector supports mouse and complete keyboard tab navigation", () => {
  const roster = read("src/components/team/LeadershipRoster.jsx");

  for (const pattern of [
    /"use client"/,
    /role="tablist"/,
    /role="tab"/,
    /role="tabpanel"/,
    /aria-selected=\{isActive\}/,
    /aria-controls=\{panelId\}/,
    /aria-labelledby=\{activeTabId\}/,
    /onClick=\{\(\) => selectProfile\(index\)\}/,
    /ArrowRight/,
    /ArrowLeft/,
    /ArrowDown/,
    /ArrowUp/,
    /Home/,
    /End/,
  ]) {
    assert.match(roster, pattern);
  }
});

test("each profile preserves the required professional information architecture", () => {
  const component = read("src/components/team/LeadershipProfile.jsx");

  for (const anchor of [
    "role",
    "client-work",
    "expertise",
    "experience",
    "technical-work",
    "education",
  ]) {
    assert.match(component, new RegExp(`id="${anchor}"`));
  }

  for (const heading of [
    "Core responsibilities",
    "Selected client work",
    "Core expertise",
    "Professional and leadership timeline",
    "Technical work",
    "Education",
    "Detailed professional record",
  ]) {
    assert.match(component, new RegExp(heading));
  }
});

test("working principles are explicit and grounded in each profile", () => {
  for (const slug of teamProfileOrder) {
    const principles = teamProfiles[slug].workingPrinciples;
    assert.equal(principles.length, 3);

    for (const principle of principles) {
      assert.ok(principle.title.length > 8);
      assert.ok(principle.description.length > 35);
    }
  }

  const component = read("src/components/team/LeadershipProfile.jsx");
  assert.match(component, /profile\.workingPrinciples\.map/);
  assert.match(component, /How this role approaches engineering decisions/);
});

test("profiles link expertise to the approved service architecture", () => {
  for (const slug of teamProfileOrder) {
    const links = teamProfiles[slug].serviceLinks;
    assert.ok(links.length >= 2);

    for (const service of links) {
      assert.match(service.href, /^\/services#(?:build|automate|grow)$/);
      assert.ok(service.label);
      assert.ok(service.description);
    }
  }

  const component = read("src/components/team/LeadershipProfile.jsx");
  assert.match(component, /profile\.serviceLinks\.map/);
  assert.match(component, /RELATED SERVICES/);
});

test("profile contribution cards connect to real internal case studies", () => {
  for (const slug of teamProfileOrder) {
    const work = teamProfiles[slug].clientWork;
    assert.ok(work.length >= 2);

    for (const project of work) {
      assert.match(project.caseStudyUrl, /^\/projects\/[a-z0-9-]+$/);
      assert.ok(project.contribution);
      assert.ok(project.description);
    }
  }

  const component = read("src/components/team/LeadershipProfile.jsx");
  assert.match(component, /View case study/);
  assert.match(component, /project\.caseStudyUrl/);
});

test("cross-profile navigation uses canonical leadership routes", () => {
  const component = read("src/components/team/LeadershipProfile.jsx");
  const routeHelper = read("src/lib/leadershipRoute.js");

  assert.match(component, /function LeadershipPeers/);
  assert.match(component, /teamProfileOrder/);
  assert.match(component, /teamProfileRoutes\[peer\.slug\]/);
  assert.match(component, /teamProfileRoutes\[profile\.slug\]/);
  assert.match(routeHelper, /teamProfileRoutes\[profile\.slug\]/);
});

test("canonical and compact leadership routes resolve the same profile pages", () => {
  for (const [canonicalPage, compactPage] of [
    ["team/salek-bin-hossain", "salek"],
    ["team/abdullah-al-saif", "saif"],
    ["team/adnan-bin-wahid", "adnan"],
  ]) {
    const canonical = read(`src/app/(website)/${canonicalPage}/page.js`);
    const compact = read(`src/app/(website)/${compactPage}/page.js`);

    assert.match(canonical, new RegExp(`\\.\\./\\.\\./${compactPage}/page`));
    assert.match(compact, /createLeadershipMetadata\(memberSlug\)/);
    assert.match(compact, /team-leadership-step5\.css/);
  }
});

test("all leadership portraits, OG images, and CV files exist", () => {
  for (const slug of teamProfileOrder) {
    const profile = teamProfiles[slug];

    for (const publicPath of [
      profile.portrait,
      profile.ogImage,
      profile.cvUrl,
      ...profile.clientWork.map((project) => project.image),
    ]) {
      const fileUrl = new URL(`../public${publicPath}`, import.meta.url);
      assert.ok(existsSync(fileUrl), `missing public asset: ${publicPath}`);
    }
  }
});

test("Step 5 styling includes focus, reduced-motion, and 390px safeguards", () => {
  const css = read("src/styles/team-leadership-step5.css");

  assert.match(css, /\.leadership-roster-tab:focus-visible/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(css, /@media \(max-width: 390px\)/);
  assert.match(css, /\.profile-context-bar nav/);
  assert.match(css, /\.profile-peer-grid/);
  assert.match(css, /grid-template-columns: 1fr/);
});
