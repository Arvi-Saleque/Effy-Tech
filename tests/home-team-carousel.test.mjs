import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const homeSource = readFileSync(
  new URL("../src/components/sections/HomeExperience.jsx", import.meta.url),
  "utf8",
);
const carouselSource = readFileSync(
  new URL("../src/components/sections/HomeTeamCarousel.jsx", import.meta.url),
  "utf8",
);
const carouselStyles = readFileSync(
  new URL(
    "../src/components/sections/HomeTeamCarousel.module.css",
    import.meta.url,
  ),
  "utf8",
);

test("homepage keeps the existing Team section and verified founder data", () => {
  assert.match(homeSource, /<section id="team" className="team-section">/);
  assert.match(homeSource, /<HomeTeamCarousel founders=\{founders\} \/>/);
  assert.match(homeSource, /Salek Bin Hossain/);
  assert.match(homeSource, /Abdullah Al Saif/);
  assert.match(homeSource, /Adnan Bin Wahid/);
});

test("carousel supports cyclic previous and next navigation", () => {
  assert.match(carouselSource, /showPrevious/);
  assert.match(carouselSource, /showNext/);
  assert.match(
    carouselSource,
    /\(currentIndex - 1 \+ founders\.length\) % founders\.length/,
  );
  assert.match(carouselSource, /\(currentIndex \+ 1\) % founders\.length/);
});

test("carousel supports mouse drag and mobile swipe through pointer events", () => {
  assert.match(carouselSource, /onPointerDown=\{handlePointerDown\}/);
  assert.match(carouselSource, /onPointerMove=\{handlePointerMove\}/);
  assert.match(carouselSource, /onPointerUp=\{finishPointerGesture\}/);
  assert.match(carouselStyles, /touch-action:\s*pan-y/);
});

test("profile links bypass drag pointer capture and remain navigable", () => {
  assert.match(
    carouselSource,
    /event\.target\.closest\?\.\("a, button, input, select, textarea"\)/,
  );
  assert.match(carouselSource, /<Link href=\{founder\.href\}/);
  assert.match(carouselSource, /setPointerCapture/);

  const interactiveGuardIndex = carouselSource.indexOf(
    'event.target.closest?.("a, button, input, select, textarea")',
  );
  const pointerCaptureIndex = carouselSource.indexOf("setPointerCapture");
  assert.ok(interactiveGuardIndex >= 0);
  assert.ok(interactiveGuardIndex < pointerCaptureIndex);
});

test("carousel supports keyboard navigation", () => {
  for (const key of ["ArrowLeft", "ArrowRight", "Home", "End"]) {
    assert.ok(carouselSource.includes(`event.key === "${key}"`));
  }
});

test("carousel exposes accessible arrow controls and a live active-member status", () => {
  assert.match(carouselSource, /aria-roledescription="carousel"/);
  assert.match(carouselSource, /aria-label="Show previous team member"/);
  assert.match(carouselSource, /aria-label="Show next team member"/);
  assert.match(carouselSource, /aria-live="polite"/);
  assert.doesNotMatch(carouselSource, /styles\.pagination/);
  assert.doesNotMatch(carouselSource, /aria-pressed=/);
});

test("carousel advances automatically every five seconds", () => {
  assert.match(
    carouselSource,
    /window\.setInterval\(showNext, 5000\)/,
  );
});

test("active card links to the existing canonical leadership profile", () => {
  assert.match(carouselSource, /<Link href=\{founder\.href\}/);
  assert.match(carouselSource, /tabIndex=\{isActive \? 0 : -1\}/);
});

test("desktop layout uses a centered active card and angled side cards", () => {
  assert.match(
    carouselStyles,
    /\.carouselCard\[data-position="active"\][\s\S]*rotateY\(0deg\)/,
  );
  assert.match(
    carouselStyles,
    /\.carouselCard\[data-position="previous"\][\s\S]*rotateY\(22deg\)/,
  );
  assert.match(
    carouselStyles,
    /\.carouselCard\[data-position="next"\][\s\S]*rotateY\(-22deg\)/,
  );
});

test("carousel preserves the Effy Tech theme tokens and gold accent", () => {
  assert.match(carouselStyles, /var\(--effy-ivory\)/);
  assert.match(carouselStyles, /var\(--effy-ink\)/);
  assert.match(carouselStyles, /#c5b77d/i);
});

test("carousel includes dedicated 390px safeguards", () => {
  assert.match(carouselStyles, /@media \(max-width:\s*390px\)/);
  assert.match(carouselStyles, /--team-card-width:\s*82vw/);
});

test("carousel respects reduced-motion preferences", () => {
  assert.match(carouselStyles, /@media \(prefers-reduced-motion:\s*reduce\)/);
  assert.match(carouselStyles, /transition-duration:\s*0\.01ms/);
});
