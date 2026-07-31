import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const read = (path) => readFileSync(path, "utf8");

const pagePath =
  "src/app/(website)/hire/project-based-video-editor/page.js";
const dataPath = "src/data/videoEditorHiring.js";

test("the canonical video editor hiring route and scoped styles exist", () => {
  assert.equal(existsSync(pagePath), true);
  assert.equal(existsSync("src/styles/video-editor-hiring.css"), true);

  const page = read(pagePath);
  assert.match(page, /canonical: "\/hire\/project-based-video-editor"/);
  assert.match(page, /video-editor-hiring\.css/);
  assert.match(page, /<Breadcrumb current="Video Editor Opening"/);
  assert.match(page, /<Footer \/>/);
});

test("the role keeps editing and campaign responsibilities separate", () => {
  const page = read(pagePath);
  const data = read(dataPath);

  assert.match(
    page,
    /Meta[\s\S]*campaign setup[\s\S]*lead handling[\s\S]*Effy Tech manage/,
  );
  assert.match(data, /Campaign by Effy Tech/);
  assert.match(data, /Ad setup, targeting, budget, lead handling/);
  assert.match(data, /male candidate preferred/);
});

test("WhatsApp and email applications open structured candidate templates", () => {
  const data = read(dataPath);
  const button = read("src/components/ui/WhatsAppButton.jsx");

  for (const field of [
    "Full Name:",
    "Portfolio Link:",
    "Best 2 Video Sample Links:",
    "CV / Resume Link:",
    "Expected Fee Per Video:",
    "Short Concept:",
  ]) {
    assert.ok(data.includes(field), `missing application field: ${field}`);
  }

  assert.match(data, /https:\/\/wa\.me\/\$\{whatsappNumber\}/);
  assert.match(data, /mailto:\$\{siteConfig\.contact\.email\}/);
  assert.match(button, /isHiringPage/);
  assert.match(button, /applicationLinks\.whatsapp/);
});

test("the public opportunity explains the exact five-percent commission", () => {
  const page = read(pagePath);

  assert.match(page, /first project-এর collected value-এর 5%/);
  assert.match(page, /\["৳20,000", "৳1,000"\]/);
  assert.match(page, /\["৳50,000", "৳2,500"\]/);
  assert.match(page, /\["৳1,00,000", "৳5,000"\]/);
});

test("the hiring route is discoverable through search and sitemap", () => {
  const navbar = read("src/components/layout/Navbar.jsx");
  const sitemap = read("src/app/sitemap.js");

  assert.match(navbar, /href: "\/hire\/project-based-video-editor"/);
  assert.match(sitemap, /path: "\/hire\/project-based-video-editor"/);
});

