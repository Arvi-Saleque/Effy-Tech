import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const read = (path) => readFileSync(path, "utf8");

test("root layout declares intentional smooth scrolling for Next navigation", () => {
  const layout = read("src/app/layout.js");

  assert.match(layout, /<html lang="en" data-scroll-behavior="smooth">/);
});

test("the root scroll container is positioned and reduced motion stays immediate", () => {
  const styles = read("src/app/globals.css");

  assert.match(
    styles,
    /html\s*\{\s*position: relative;\s*scroll-behavior: smooth;/,
  );
  assert.match(
    styles,
    /@media \(prefers-reduced-motion: reduce\)[\s\S]*?html\s*\{\s*scroll-behavior: auto !important;/,
  );
});

test("the shared logo preserves the source aspect ratio at every display size", () => {
  const logo = read("src/components/ui/Logo.jsx");

  assert.match(logo, /width=\{1115\}/);
  assert.match(logo, /height=\{740\}/);
  assert.match(logo, /style=\{\{ width, height: "auto" \}\}/);
  assert.doesNotMatch(logo, /height=\{(?:img|width)\}/);
});

test("intentional raw-image lint exceptions stay scoped to preview surfaces", () => {
  const config = read("eslint.config.mjs");

  assert.match(config, /CMS URLs, upload previews, or extra-long product/);
  assert.match(
    config,
    /"src\/components\/showcase\/\*\*\/\*.\{js,jsx,ts,tsx\}"/,
  );
  assert.match(config, /"@next\/next\/no-img-element": "off"/);
  assert.doesNotMatch(
    config.match(/rules:\s*\{[\s\S]*?\},\s*\},/)?.[0] || "",
    /"@next\/next\/no-img-element"/,
  );
});

test("public demo autoplay uses stable functional state updates", () => {
  const courses = read(
    "src/features/effy-edu-demo/components/home/CoursesSection.tsx",
  );
  const results = read(
    "src/features/effy-edu-demo/components/home/ResultsSection.tsx",
  );

  assert.match(courses, /setActiveIndex\(\(previous\) =>/);
  assert.match(results, /setActiveIndex\(\(previous\) =>/);
  assert.match(courses, /setInterval\(\(\) => \{[\s\S]*?setActiveIndex/);
  assert.match(results, /setInterval\(\(\) => \{[\s\S]*?setActiveIndex/);
});

test("debounced search synchronizes against the controlled value", () => {
  const input = read(
    "src/features/effy-edu-demo/components/ui/debounced-search-input.tsx",
  );

  assert.match(input, /\[searchParams, paramName, value\]/);
});

test("the IAM case study exposes a semantic main landmark", () => {
  const showcase = read("src/components/showcase/AmalTrackerShowcase.jsx");

  assert.match(
    showcase,
    /<main className="effy-project-page effy-project-page--iam/,
  );
  assert.match(showcase, /<\/main>/);
});

test("the final QA command is available from package scripts", () => {
  const pkg = JSON.parse(read("package.json"));

  assert.equal(
    pkg.scripts["test:qa"],
    "node --test tests/final-global-qa.test.mjs",
  );
});
