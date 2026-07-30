import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const read = (path) =>
  readFileSync(path, "utf8").replaceAll("\r\n", "\n");
const hash = (path) => createHash("sha256").update(read(path)).digest("hex");

const projectDataPath = "src/data/projects.js";
const projectsPagePath = "src/app/(website)/projects/page.js";
const explorerPath = "src/components/showcase/ProjectPortfolioExplorer.jsx";
const relatedWorkPath = "src/components/showcase/CaseStudyFooterNav.jsx";

test("project data is the canonical source for four verified portfolio entries", () => {
  const source = read(projectDataPath);

  assert.equal((source.match(/caseStudyUrl:/g) || []).length, 4);
  assert.equal((source.match(/portfolioCategory:/g) || []).length, 4);
  assert.equal((source.match(/\n    problem:/g) || []).length, 4);
  assert.equal((source.match(/\n    solution:/g) || []).length, 4);
  assert.match(source, /status: "Live on Google Play"/);
  assert.equal(
    (source.match(/status: "Live Client Project"/g) || []).length,
    3,
  );
});

test("portfolio taxonomy covers every delivery type without fake categories", () => {
  const source = read(projectDataPath);

  for (const id of [
    "all",
    "mobile-product",
    "operations-platform",
    "institutional-web",
  ]) {
    assert.match(source, new RegExp(`id: "${id}"`));
  }

  assert.equal(
    (source.match(/portfolioCategory: "operations-platform"/g) || []).length,
    2,
  );
});

test("projects hub uses the filterable portfolio explorer and retains SEO data", () => {
  const source = read(projectsPagePath);

  assert.match(source, /ProjectPortfolioExplorer/);
  assert.match(source, /<ProjectPortfolioExplorer \/>/);
  assert.match(source, /"@type": "ItemList"/);
  assert.match(source, /alternates: \{ canonical: "\/projects" \}/);
});

test("portfolio filters support keyboard and screen-reader interaction", () => {
  const source = read(explorerPath);

  for (const token of [
    'role="tablist"',
    'role="tab"',
    'role="tabpanel"',
    'aria-live="polite"',
    '"ArrowRight"',
    '"ArrowLeft"',
    '"Home"',
    '"End"',
  ]) {
    assert.ok(source.includes(token), `Missing accessibility token: ${token}`);
  }
});

test("portfolio cards expose status, problem, solution, stack, and actions", () => {
  const source = read(explorerPath);

  for (const token of [
    "{project.status}",
    "{project.problem}",
    "{project.solution}",
    "project.tags.map",
    "View Case Study",
    "project.liveUrl",
  ]) {
    assert.ok(source.includes(token), `Missing project-card content: ${token}`);
  }
});

test("all canonical case studies include related-work navigation", () => {
  const pages = [
    ["BUEK", "src/app/(website)/projects/BUEK/page.js"],
    ["DHA", "src/app/(website)/projects/DHA/page.js"],
    ["EEMS", "src/app/(website)/projects/EEMS/page.js"],
    ["IAM", "src/app/(website)/projects/IAM/page.js"],
  ];

  for (const [slug, path] of pages) {
    const source = read(path);
    assert.match(source, /CaseStudyFooterNav/);
    assert.ok(
      source.includes(`currentSlug="${slug}"`),
      `${path} is missing its current project identity`,
    );
  }
});

test("related-work navigation excludes the current project and returns to the hub", () => {
  const source = read(relatedWorkPath);

  assert.match(source, /project\.slug !== currentSlug/);
  assert.match(source, /href="\/projects"/);
  assert.match(source, /project\.caseStudyUrl/);
  assert.match(source, /View All Projects/);
});

test("homepage and Services implementation remain byte-identical to Step 2", () => {
  const protectedFiles = {
    "src/app/(website)/page.js":
      "f82121080787fea4f7c3a6611e904d80b17e2a92a7599279325bfd24f6ed67c0",
    "src/components/sections/HomeExperience.jsx":
      "757836fefadd4a5cefde25524989b2fcf78ed40944eff1175195c65caefc7977",
    "src/app/(website)/services/page.js":
      "afedb01345a947e9c9d45e1a8e33d821a26e3969e860aea736be2178e65d4a9d",
    "src/components/showcase/ServiceExplorer.jsx":
      "42004b9334898c2eedec5af29c499cbfa40649e8c61d1369a41f778a3d2cede7",
    "src/data/serviceExplorer.js":
      "60c597339b62b538a896087e278d43bf31da08ed965b1454a55b95f5ac2f6da9",
    "src/styles/corporate-pages.css":
      "44d6a99cb2f4346afdc494dc4b22bdffda82ad739d943c54146a1305fc7095bb",
  };

  for (const [path, expectedHash] of Object.entries(protectedFiles)) {
    assert.ok(existsSync(path), `Protected file is missing: ${path}`);
    assert.equal(hash(path), expectedHash, `Protected file changed: ${path}`);
  }
});
