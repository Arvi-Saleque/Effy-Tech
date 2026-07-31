"use client";

import { useEffect, useState } from "react";

const prefix = "আপনি কি একটি Digital Product-কে ";
const accent = "আকর্ষণীয় Story Video-তে রূপান্তর করতে পারেন?";
const fullText = `${prefix}${accent}`;

const splitIntoGraphemes = (value) => {
  if (typeof Intl.Segmenter === "function") {
    const segmenter = new Intl.Segmenter("bn", { granularity: "grapheme" });
    return Array.from(segmenter.segment(value), ({ segment }) => segment);
  }

  return Array.from(value);
};

const prefixCharacters = splitIntoGraphemes(prefix);
const accentCharacters = splitIntoGraphemes(accent);
const fullTextCharacters = [...prefixCharacters, ...accentCharacters];

export default function TypingHeroTitle() {
  const [visibleLength, setVisibleLength] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    if (prefersReducedMotion.matches) {
      const reducedMotionTimer = window.setTimeout(
        () => setVisibleLength(fullTextCharacters.length),
        0,
      );
      return () => window.clearTimeout(reducedMotionTimer);
    }

    let timer;
    let characterIndex = 0;
    let isActive = true;

    const typeNextCharacter = () => {
      if (!isActive) return;

      characterIndex += 1;
      setVisibleLength(characterIndex);

      if (characterIndex < fullTextCharacters.length) {
        const currentCharacter = fullTextCharacters[characterIndex - 1];
        const delay = /[?।,]/.test(currentCharacter) ? 180 : 46;
        timer = window.setTimeout(typeNextCharacter, delay);
      }
    };

    timer = window.setTimeout(typeNextCharacter, 420);

    return () => {
      isActive = false;
      window.clearTimeout(timer);
    };
  }, []);

  const visiblePrefix = prefixCharacters.slice(0, visibleLength).join("");
  const visibleAccent = accentCharacters
    .slice(0, Math.max(0, visibleLength - prefixCharacters.length))
    .join("");

  return (
    <h1 className="hire-typing-title" aria-label={fullText}>
      <span className="hire-typing-measure" aria-hidden="true">
        {prefix}
        <span className="hire-typing-accent">{accent}</span>
      </span>
      <span className="hire-typing-visual" aria-hidden="true">
        {visiblePrefix}
        <span className="hire-typing-accent">{visibleAccent}</span>
        <span className="hire-typing-cursor" />
      </span>
    </h1>
  );
}
