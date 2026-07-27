import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const testDirectory = dirname(fileURLToPath(import.meta.url));
const repositoryRoot = resolve(testDirectory, "..");

const readSource = (relativePath) =>
  readFileSync(resolve(repositoryRoot, relativePath), "utf8");

const routeSource = readSource(
  "src/app/(website)/effy_edu_management_system/page.js",
);
const dataSource = readSource("src/data/effyEduManagementSystem.js");
const showcaseSource = readSource("src/components/showcase/DHAShowcase.jsx");

const runtimeSources = [
  ["route", routeSource],
  ["showcase data", dataSource],
  ["showcase component", showcaseSource],
];

test("Effy Edu showcase has no direct production data dependency", () => {
  const forbiddenImport =
    /(?:from\s+|import\s*\()\s*["'][^"']*(?:supabase|prisma|mongoose|mongodb|drizzle|mysql|postgres|server-only)[^"']*["']/i;
  const forbiddenRuntime =
    /\b(?:fetch\s*\(|process\.env\b|getServerSideProps\b|getStaticProps\b|createClient\s*\(|use server\b)/i;

  for (const [label, source] of runtimeSources) {
    assert.doesNotMatch(
      source,
      forbiddenImport,
      `${label} must not import a database or server-only client`,
    );
    assert.doesNotMatch(
      source,
      forbiddenRuntime,
      `${label} must not fetch or read production runtime data`,
    );
  }

  assert.doesNotMatch(
    routeSource,
    /export\s+default\s+async\s+function/i,
    "the showcase route must remain synchronously renderable from local data",
  );
});

test("Effy Edu showcase declares its static and privacy-safe demo mode", () => {
  assert.match(
    dataSource,
    /caseStudyPath:\s*["']\/effy_edu_management_system["']/,
  );
  assert.match(dataSource, /staticDemo:\s*\{/);
  assert.match(
    dataSource,
    /Generalized raw data only—no production database connection/,
  );
  assert.match(
    dataSource,
    /does not connect to the live database, authentication store, private APIs, or real student records/,
  );
  assert.match(showcaseSource, /data\.staticDemo/);
  assert.match(routeSource, /data=\{effyEduManagementSystem\}/);
});

test("every Effy Edu showcase asset is local and available", () => {
  const assetPaths = [
    ...dataSource.matchAll(
      /["'](\/images\/effy-edu-management-system\/[^"']+)["']/g,
    ),
  ].map((match) => match[1]);

  assert.ok(assetPaths.length > 0, "the showcase must reference local assets");

  for (const assetPath of new Set(assetPaths)) {
    const localPath = resolve(
      repositoryRoot,
      "public",
      assetPath.replace(/^\//, ""),
    );
    assert.equal(
      existsSync(localPath),
      true,
      `missing local showcase asset: ${assetPath}`,
    );
  }
});
