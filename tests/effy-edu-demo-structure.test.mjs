import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, extname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const testDirectory = dirname(fileURLToPath(import.meta.url));
const repositoryRoot = resolve(testDirectory, "..");
const demoAppRoot = join(
  repositoryRoot,
  "src",
  "app",
  "effy_edu_management_system",
);
const demoFeatureRoot = join(
  repositoryRoot,
  "src",
  "features",
  "effy-edu-demo",
);
const demoPublicRoot = join(
  repositoryRoot,
  "public",
  "effy_edu_management_system",
);

const walk = (root) => {
  const files = [];
  for (const entry of readdirSync(root, { withFileTypes: true })) {
    const absolutePath = join(root, entry.name);
    if (entry.isDirectory()) files.push(...walk(absolutePath));
    else files.push(absolutePath);
  }
  return files;
};

const sourceFiles = [...walk(demoAppRoot), ...walk(demoFeatureRoot)].filter(
  (file) => [".ts", ".tsx", ".css"].includes(extname(file)),
);

test("the complete coaching demo is mounted below the Effy Edu subpath", () => {
  const pageFiles = walk(demoAppRoot).filter((file) => file.endsWith("page.tsx"));
  const apiRoutes = walk(demoAppRoot).filter((file) => file.endsWith("route.ts"));

  assert.ok(pageFiles.length >= 130, `expected at least 130 pages, got ${pageFiles.length}`);
  assert.ok(apiRoutes.length >= 7, `expected at least 7 API routes, got ${apiRoutes.length}`);

  const requiredPaths = [
    join(demoAppRoot, "(public)", "page.tsx"),
    join(demoAppRoot, "(auth)", "login", "page.tsx"),
    join(demoAppRoot, "student", "page.tsx"),
    join(demoAppRoot, "teacher", "page.tsx"),
    join(demoAppRoot, "teacher", "website", "page.tsx"),
    join(demoFeatureRoot, "lib", "demo", "mock-data.ts"),
    join(demoFeatureRoot, "lib", "demo", "mock-supabase.ts"),
    join(demoFeatureRoot, "components", "demo", "DemoControlDock.tsx"),
    join(demoPublicRoot, "images", "edupilot-logo.svg"),
    join(demoPublicRoot, "demo", "vector-formulas.pdf"),
    join(repositoryRoot, "src", "app", "(website)", "projects", "EEMS", "page.js"),
  ];

  for (const requiredPath of requiredPaths) {
    assert.equal(
      existsSync(requiredPath),
      true,
      `missing integrated demo path: ${relative(repositoryRoot, requiredPath)}`,
    );
  }
});

test("demo controls expose distinct student, teacher, and admin experiences", () => {
  const dockSource = readFileSync(
    join(demoFeatureRoot, "components", "demo", "DemoControlDock.tsx"),
    "utf8",
  );

  assert.match(dockSource, /Student demo/);
  assert.match(dockSource, /Teacher demo/);
  assert.match(dockSource, /Admin demo/);
  assert.match(dockSource, /STUDENT: `\$\{DEMO_HOME\}\/student`/);
  assert.match(dockSource, /TEACHER: `\$\{DEMO_HOME\}\/teacher\/academic`/);
  assert.match(dockSource, /ADMIN: `\$\{DEMO_HOME\}\/teacher`/);
});

test("demo imports and internal URLs remain isolated under their namespace", () => {
  const unscopedImport =
    /@\/(?:components|data|lib|pdf)\/|@\/features\/(?!effy-edu-demo\/)|@\/app\/(?!effy_edu_management_system\/)/;
  const unprefixedRoute =
    /(["'`])\/(?:teacher|student|login|register|forgot-password|reset-password|pending-approval|account-disabled|about|academic|academic-calendar|class-routine|contact|courses|gallery|materials|news-events|projects|results|reviews|api|images|demo)(?:\/|["'`?#])/;

  for (const file of sourceFiles) {
    const source = readFileSync(file, "utf8");
    const label = relative(repositoryRoot, file);
    const sourceWithAllowedExitLinksRemoved = source.replaceAll(
      '"/projects/EEMS"',
      '"/effy_edu_management_system/project-details"',
    );
    assert.doesNotMatch(source, unscopedImport, `unscoped demo import in ${label}`);
    assert.doesNotMatch(
      sourceWithAllowedExitLinksRemoved,
      unprefixedRoute,
      `unprefixed demo URL in ${label}`,
    );
  }
});

test("demo data layer has no production backend or credential dependency", () => {
  const demoSource = sourceFiles
    .map((file) => readFileSync(file, "utf8"))
    .join("\n");

  assert.doesNotMatch(demoSource, /from\s+["']@supabase\//i);
  assert.doesNotMatch(demoSource, /from\s+["']cloudinary(?:\/|["'])/i);
  assert.doesNotMatch(demoSource, /from\s+["']@aws-sdk\//i);
  assert.doesNotMatch(
    demoSource,
    /process\.env\.(?:NEXT_PUBLIC_SUPABASE|SUPABASE_|CLOUDINARY_|CLOUDFLARE_R2|AWS_)/i,
  );
  assert.doesNotMatch(demoSource, /postgres(?:ql)?:\/\//i);
  assert.doesNotMatch(demoSource, /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/i);

  const browserClient = readFileSync(
    join(demoFeatureRoot, "lib", "supabase", "client.ts"),
    "utf8",
  );
  const serverClient = readFileSync(
    join(demoFeatureRoot, "lib", "supabase", "server.ts"),
    "utf8",
  );
  assert.match(browserClient, /createMockSupabase/);
  assert.match(serverClient, /createMockSupabase/);
});

test("all static demo assets referenced by source are available locally", () => {
  const missingAssets = new Set();
  const assetPattern =
    /["'`](\/effy_edu_management_system\/(?:images|demo)\/[^"'`?#)\s]+)["'`]/g;

  for (const file of sourceFiles) {
    const source = readFileSync(file, "utf8");
    for (const match of source.matchAll(assetPattern)) {
      if (match[1].includes("${")) continue;
      const assetPath = join(repositoryRoot, "public", match[1].replace(/^\//, ""));
      if (!existsSync(assetPath)) missingAssets.add(match[1]);
    }
  }

  assert.deepEqual([...missingAssets], []);
});
