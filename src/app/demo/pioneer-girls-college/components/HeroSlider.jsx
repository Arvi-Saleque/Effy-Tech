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
  const [failedImageIds, setFailedImageIds] = useState(() => new Set());
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
  const markImageFailed = (slideId) => {
    setFailedImageIds((current) => {
      if (current.has(slideId)) {
        return current;
      }

      const next = new Set(current);
      next.add(slideId);
      return next;
    });
  };

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
        {heroSlides.map((slide, index) => {
          const imageFailed = failedImageIds.has(slide.id);

          return (
            <div
              className={[
                "pgc-hero__slide-media",
                slide.fallback ? `pgc-hero__slide-media--${slide.fallback}` : "",
                index === activeIndex ? "is-active" : "",
                imageFailed ? "has-fallback" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              key={slide.id}
            >
              <div className="pgc-hero__fallback" />
              {slide.image && !imageFailed ? (
                <Image
                  className="pgc-hero__image"
                  src={slide.image}
                  alt=""
                  fill
                  priority={index === 0}
                  loading={index === 0 ? undefined : "lazy"}
                  sizes="100vw"
                  onError={() => markImageFailed(slide.id)}
                />
              ) : null}
            </div>
          );
        })}
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
          key={activeSlide.id}
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

        <aside className="pgc-hero-principal" aria-labelledby="pgc-principal-card-title">
          <Quote className="pgc-hero-principal__quote" size={44} aria-hidden="true" />
          <h2 className="pgc-hero-principal__eyebrow" id="pgc-principal-card-title">
            অধ্যক্ষের বাণী
          </h2>
          <span className="pgc-hero-principal__divider" aria-hidden="true" />
          <p>{principalExcerpt}</p>
          <div className="pgc-hero-principal__person">
            <figure className="pgc-hero-principal__portrait">
              <Image
                className="pgc-principal-card__portrait-image"
                src={principal.image}
                alt={`${principal.name}, ${principal.designation}`}
                fill
                sizes="(max-width: 760px) 92px, 118px"
              />
            </figure>
            <dl className="pgc-hero-principal__details">
              <dt className="pgc-sr-only">নাম</dt>
              <dd className="pgc-hero-principal__name">{principal.name}</dd>
              <dt className="pgc-sr-only">পদবি</dt>
              <dd className="pgc-hero-principal__designation">{principal.designation}</dd>
              <dt className="pgc-sr-only">বিষয়</dt>
              <dd>{principal.subject}</dd>
              <dt className="pgc-sr-only">প্রতিষ্ঠান</dt>
              <dd>{institution.nameBn}</dd>
            </dl>
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
