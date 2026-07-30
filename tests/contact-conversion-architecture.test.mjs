import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const read = (path) => readFileSync(path, "utf8");

const pagePath = "src/app/(website)/contact/page.js";
const formPath = "src/components/contact/ContactInquiryForm.jsx";
const dataPath = "src/data/contactPage.js";
const stylesPath = "src/styles/contact-step6.css";

test("Contact keeps canonical metadata and a focused project-inquiry message", () => {
  const page = read(pagePath);

  assert.match(page, /alternates: \{ canonical: "\/contact" \}/);
  assert.match(page, /openGraph:/);
  assert.match(page, /Start with the problem\. Build the right system\./);
  assert.match(page, /workflow, users, constraints, and outcome/);
});

test("visible contact channels come from the central site configuration", () => {
  const page = read(pagePath);
  const data = read(dataPath);

  assert.match(data, /import siteConfig from "@\/theme\/siteConfig"/);
  assert.match(data, /siteConfig\.contact\.email/);
  assert.match(data, /siteConfig\.contact\.phone/);
  assert.match(data, /siteConfig\.contact\.address/);
  assert.match(data, /siteConfig\.socials/);
  assert.doesNotMatch(page, /8801511190270|effytechbd@gmail\.com/);
});

test("the project brief explains the information clients should provide", () => {
  const data = read(dataPath);
  const form = read(formPath);

  for (const statement of [
    "Current workflow",
    "Users and roles",
    "Required outcome",
    "Delivery context",
    "optional budget range",
  ]) {
    assert.match(
      `${data}\n${form}`,
      new RegExp(statement, "i"),
      `missing project-brief guidance: ${statement}`,
    );
  }
});

test("the existing six-field submission contract is preserved", () => {
  const form = read(formPath);

  for (const field of [
    'name: "name"',
    'name: "email"',
    'name: "phone"',
    'name: "company"',
    'id="service"',
    'id="message"',
  ]) {
    assert.match(
      form,
      new RegExp(field.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")),
    );
  }

  assert.match(form, /submitContact/);
  assert.match(form, /contactSchema/);
  assert.match(form, /serviceOptions/);
  assert.match(form, /formAction\(formData\)/);
});

test("labels, errors, guidance, loading, and success states are accessible", () => {
  const form = read(formPath);

  for (const token of [
    "<label",
    "htmlFor={field.name}",
    "aria-invalid={Boolean(error)}",
    "aria-describedby=",
    'role="alert"',
    'role="status"',
    'aria-live="polite"',
    "shouldFocusError: true",
    "aria-busy={isPending}",
    "disabled={isPending}",
  ]) {
    assert.match(
      form,
      new RegExp(token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")),
    );
  }
});

test("conversion analytics fires once and only after server success", () => {
  const form = read(formPath);

  assert.equal((form.match(/contact_form_submit/g) || []).length, 1);
  assert.match(
    form,
    /if \(!serverState\?\.success \|\| analyticsSent\.current\)/,
  );
  assert.match(form, /form_name: "home_contact_form"/);
  assert.match(form, /page_path: window\.location\.pathname/);
  assert.doesNotMatch(form, /trackContactSubmit/);
});

test("Contact removes unsupported response-time promises", () => {
  const source = `${read(pagePath)}\n${read(formPath)}\n${read(dataPath)}`;

  assert.doesNotMatch(source, /24 hours|business day|responds within/i);
});

test("the page explains the post-inquiry decision path", () => {
  const page = read(pagePath);
  const data = read(dataPath);

  for (const statement of [
    "AFTER THE INQUIRY",
    "Context review",
    "Scope clarification",
    "Practical next action",
  ]) {
    assert.match(`${page}\n${data}`, new RegExp(statement));
  }
});

test("Contact uses isolated Step 6 styles and leaves shared corporate styles alone", () => {
  const page = read(pagePath);

  assert.match(page, /@\/styles\/contact-step6\.css/);
  assert.doesNotMatch(page, /corporate-pages\.css/);
});

test("Step 6 styles include focus, reduced motion, and 390px safeguards", () => {
  const styles = read(stylesPath);

  for (const token of [
    ":focus-visible",
    "@media (max-width: 1024px)",
    "@media (max-width: 720px)",
    "@media (max-width: 390px)",
    "@media (prefers-reduced-motion: reduce)",
    "overflow-wrap: anywhere",
    "grid-template-columns: 1fr",
  ]) {
    assert.match(
      styles,
      new RegExp(token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")),
    );
  }
});
