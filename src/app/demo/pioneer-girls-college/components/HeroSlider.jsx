"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Building2, GraduationCap, Quote } from "lucide-react";
import { heroSlides, institution, principal } from "../data/college-data";

const AUTOPLAY_DELAY = 6000;
const SWIPE_THRESHOLD = 42;

export default function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isTabHidden, setIsTabHidden] = useState(false);
  const touchStartXRef = useRef(null);
  const activeSlide = heroSlides[activeIndex];
  const principalExcerpt = getPrincipalExcerpt(principal.message);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncReducedMotion = () => setIsReducedMotion(mediaQuery.matches);
    syncReducedMotion();
    mediaQuery.addEventListener("change", syncReducedMotion);
    return () => mediaQuery.removeEventListener("change", syncReducedMotion);
  }, [setIsReducedMotion]);

  useEffect(() => {
    const syncVisibility = () => setIsTabHidden(document.hidden);
    syncVisibility();
    document.addEventListener("visibilitychange", syncVisibility);
    return () => document.removeEventListener("visibilitychange", syncVisibility);
  }, [setIsTabHidden]);

  useEffect(() => {
    if (isPaused || isReducedMotion || isTabHidden) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setActiveIndex((index) => nextIndex(index));
    }, AUTOPLAY_DELAY);

    return () => window.clearTimeout(timer);
  }, [activeIndex, isPaused, isReducedMotion, isTabHidden, setActiveIndex]);

  const goToSlide = (index) => setActiveIndex(normalizeIndex(index));
  const goToPrevious = () => setActiveIndex((index) => previousIndex(index));
  const goToNext = () => setActiveIndex((index) => nextIndex(index));

  const handleKeyDown = (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goToPrevious();
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      goToNext();
    }
  };

  const handleBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsPaused(false);
    }
  };

  const handleMouseLeave = (event) => {
    if (!event.currentTarget.contains(document.activeElement)) {
      setIsPaused(false);
    }
  };

  const handleTouchStart = (event) => {
    touchStartXRef.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event) => {
    if (touchStartXRef.current === null) {
      return;
    }

    const deltaX = (event.changedTouches[0]?.clientX ?? touchStartXRef.current) - touchStartXRef.current;
    touchStartXRef.current = null;

    if (Math.abs(deltaX) < SWIPE_THRESHOLD) {
      return;
    }

    if (deltaX > 0) {
      goToPrevious();
    } else {
      goToNext();
    }
  };

  return (
    <section
      className="pgc-hero"
      aria-label="প্রধান পরিচিতি স্লাইডার"
      aria-roledescription="carousel"
      tabIndex={0}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={handleMouseLeave}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={handleBlur}
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="pgc-hero__media" aria-hidden="true">
        <Image
          className="pgc-hero__image"
          key={activeSlide.id}
          src={activeSlide.image}
          alt=""
          fill
          priority
          sizes="100vw"
        />
        <div className="pgc-hero__overlay" />
      </div>

      <button
        className="pgc-hero-nav pgc-hero-nav--prev"
        type="button"
        aria-label="পূর্ববর্তী স্লাইড"
        onClick={goToPrevious}
      >
        <ArrowLeft size={20} aria-hidden="true" />
      </button>
      <button
        className="pgc-hero-nav pgc-hero-nav--next"
        type="button"
        aria-label="পরবর্তী স্লাইড"
        onClick={goToNext}
      >
        <ArrowRight size={20} aria-hidden="true" />
      </button>

      <div className="pgc-container pgc-hero__inner">
        <div
          className="pgc-hero__content"
          role="group"
          aria-roledescription="slide"
          aria-label={`${activeIndex + 1} / ${heroSlides.length}`}
        >
          <span className="pgc-hero__eyebrow">{activeSlide.eyebrow}</span>
          <h1>
            <span>{activeSlide.titleLineOne}</span>
            <span>{activeSlide.titleHighlight}</span>
          </h1>
          <p>{activeSlide.description}</p>
          <div className="pgc-hero__fact-row" aria-label="প্রাতিষ্ঠানিক তথ্য">
            প্রতিষ্ঠিত {institution.established} <span aria-hidden="true">•</span> সরকারিকরণ{" "}
            {institution.governmentized} <span aria-hidden="true">•</span> EIIN {institution.eiin}
          </div>
          <div className="pgc-hero__actions">
            <Link className="pgc-button pgc-button--gold" href={activeSlide.primaryAction.href}>
              <Building2 size={18} aria-hidden="true" /> {activeSlide.primaryAction.label}
            </Link>
            <Link className="pgc-button pgc-button--light" href={activeSlide.secondaryAction.href}>
              <GraduationCap size={18} aria-hidden="true" /> {activeSlide.secondaryAction.label}
            </Link>
          </div>
        </div>

        <aside className="pgc-hero-principal" aria-label="অধ্যক্ষের বাণী">
          <Quote className="pgc-hero-principal__quote" size={36} aria-hidden="true" />
          <span className="pgc-hero-principal__eyebrow">অধ্যক্ষের বাণী</span>
          <p>{principalExcerpt}</p>
          <div className="pgc-hero-principal__person">
            <Image
              src={principal.image}
              alt={`${principal.name}, ${principal.designation}`}
              width={92}
              height={92}
              sizes="92px"
            />
            <div>
              <strong>{principal.name}</strong>
              <span>{principal.designation}</span>
              <small>{principal.subject}</small>
              <small>{institution.nameBn}</small>
            </div>
          </div>
        </aside>
      </div>

      <div className="pgc-hero-dots" aria-label="স্লাইড নির্বাচন">
        {heroSlides.map((slide, index) => (
          <button
            className={index === activeIndex ? "is-active" : undefined}
            type="button"
            key={slide.id}
            aria-label={`${index + 1} নম্বর স্লাইড দেখুন`}
            aria-current={index === activeIndex ? "true" : undefined}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
      <span className="pgc-sr-only">
        স্লাইড {activeIndex + 1} / {heroSlides.length}: {activeSlide.titleLineOne}{" "}
        {activeSlide.titleHighlight}
      </span>
    </section>
  );
}

function getPrincipalExcerpt(message) {
  return message
    .split("।")
    .map((sentence) => sentence.trim())
    .filter(Boolean)
    .slice(0, 2)
    .join("। ")
    .concat("।");
}

function normalizeIndex(index) {
  return (index + heroSlides.length) % heroSlides.length;
}

function previousIndex(index) {
  return normalizeIndex(index - 1);
}

function nextIndex(index) {
  return normalizeIndex(index + 1);
}
