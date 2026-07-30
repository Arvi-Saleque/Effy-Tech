import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import test from "node:test";

import { explorerServices } from "../src/data/serviceExplorer.js";

const read = (path) =>
  readFileSync(new URL(`../${path}`, import.meta.url), "utf8").replaceAll(
    "\r\n",
    "\n",
  );

const sha256 = (path) => createHash("sha256").update(read(path)).digest("hex");

test("the services hub preserves the three approved delivery pillars", () => {
  const page = read("src/app/(website)/allservices/page.js");

  for (const [number, label, groupId] of [
    ["01", "Build", "Build"],
    ["02", "Automate", "Automate"],
    ["03", "Launch & Grow", "Grow"],
  ]) {
    assert.match(page, new RegExp(`number: "${number}"`));
    assert.match(page, new RegExp(`label: "${label.replace("&", "\\&")}"`));
    assert.match(page, new RegExp(`groupId: "${groupId}"`));
  }

  assert.match(page, /<ServiceExplorer/);
  assert.match(page, /groupId=\{group\.groupId\}/);
});

test("all 20 selectable capabilities remain complete and grouped", () => {
  const counts = Object.fromEntries(
    ["Build", "Automate", "Grow"].map((group) => [
      group,
      explorerServices.filter((service) => service.group === group).length,
    ]),
  );

  assert.equal(explorerServices.length, 20);
  assert.deepEqual(counts, { Build: 8, Automate: 7, Grow: 5 });

  for (const service of explorerServices) {
    assert.ok(service.id);
    assert.ok(service.shortTitle);
    assert.ok(service.title);
    assert.ok(service.description);
    assert.equal(service.features.length, 6);
  }
});

test("service selection remains interactive instead of becoming a static grid", () => {
  const explorer = read("src/components/showcase/ServiceExplorer.jsx");

  assert.match(explorer, /useState\(services\[0\]\?\.id\)/);
  assert.match(explorer, /function select\(id/);
  assert.match(explorer, /<SidebarItem/);
  assert.match(explorer, /<AnimatePresence mode="wait">/);
  assert.match(explorer, /key=\{activeService\.id\}/);
  assert.match(explorer, /scrollIntoView/);
});

test("the selector supports keyboard tabs and an identified detail panel", () => {
  const explorer = read("src/components/showcase/ServiceExplorer.jsx");

  for (const pattern of [
    /role="tablist"/,
    /role="tab"/,
    /role="tabpanel"/,
    /aria-selected=\{active\}/,
    /aria-controls=\{panelId\}/,
    /aria-labelledby=\{tabId\}/,
    /ArrowRight/,
    /ArrowLeft/,
    /ArrowDown/,
    /ArrowUp/,
    /Home/,
    /End/,
  ]) {
    assert.match(explorer, pattern);
  }
});

test("every capability has best-fit guidance and a relevant-work destination", () => {
  const explorer = read("src/components/showcase/ServiceExplorer.jsx");

  for (const service of explorerServices) {
    const escapedId = service.id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    assert.match(
      explorer,
      new RegExp(`(?:["']${escapedId}["']|${escapedId})\\s*:`),
      `missing service context for ${service.id}`,
    );
  }

  assert.match(explorer, /Best fit/);
  assert.match(explorer, /Featured deliverables/);
  assert.match(explorer, /Relevant work/);
});

test("legacy service aliases and contact paths remain canonical", async () => {
  const { default: nextConfig } = await import("../next.config.mjs");
  const redirects = await nextConfig.redirects();

  for (const source of ["/quickservices", "/allservices"]) {
    const redirect = redirects.find((item) => item.source === source);
    assert.ok(redirect, `missing redirect for ${source}`);
    assert.equal(redirect.destination, "/services");
    assert.equal(redirect.permanent, true);
  }

  const page = read("src/app/(website)/allservices/page.js");
  assert.match(page, /href="\/contact"/);
  assert.match(page, /href="\/projects"/);
});

test("the approved homepage shell remains byte-identical", () => {
  assert.equal(
    sha256("src/app/(website)/page.js"),
    "f82121080787fea4f7c3a6611e904d80b17e2a92a7599279325bfd24f6ed67c0",
  );
  assert.equal(
    sha256("src/components/sections/HomeExperience.jsx"),
    "097e7302f43f61ef70a4bb6b45a763f55c5a81e09fdc0b87b4142da6e5977cee",
  );
});
