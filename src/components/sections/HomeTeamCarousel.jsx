"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./HomeTeamCarousel.module.css";

const DRAG_THRESHOLD = 48;

function getCardPosition(index, activeIndex, length) {
  if (index === activeIndex) return "active";

  const forwardDistance = (index - activeIndex + length) % length;
  return forwardDistance <= length / 2 ? "next" : "previous";
}

export default function HomeTeamCarousel({ founders }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const pointerStart = useRef(null);
  const suppressClick = useRef(false);
  const wheelLocked = useRef(false);

  const showPrevious = useCallback(() => {
    setActiveIndex(
      (currentIndex) => (currentIndex - 1 + founders.length) % founders.length,
    );
  }, [founders.length]);

  const showNext = useCallback(() => {
    setActiveIndex((currentIndex) => (currentIndex + 1) % founders.length);
  }, [founders.length]);

  useEffect(() => {
    const intervalId = window.setInterval(showNext, 5000);

    return () => window.clearInterval(intervalId);
  }, [showNext]);

  const handlePointerDown = (event) => {
    if (event.button !== 0) return;

    pointerStart.current = {
      id: event.pointerId,
      x: event.clientX,
    };
    suppressClick.current = false;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event) => {
    if (pointerStart.current?.id !== event.pointerId) return;

    const offset = event.clientX - pointerStart.current.x;
    setDragOffset(offset);

    if (Math.abs(offset) > 8) {
      suppressClick.current = true;
    }
  };

  const finishPointerGesture = (event) => {
    if (pointerStart.current?.id !== event.pointerId) return;

    const offset = event.clientX - pointerStart.current.x;

    if (offset <= -DRAG_THRESHOLD) {
      showNext();
    } else if (offset >= DRAG_THRESHOLD) {
      showPrevious();
    }

    pointerStart.current = null;
    setDragOffset(0);
    window.setTimeout(() => {
      suppressClick.current = false;
    }, 0);
  };

  const cancelPointerGesture = () => {
    pointerStart.current = null;
    suppressClick.current = false;
    setDragOffset(0);
  };

  const handleClickCapture = (event) => {
    if (!suppressClick.current) return;

    event.preventDefault();
    event.stopPropagation();
    suppressClick.current = false;
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showPrevious();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      showNext();
    } else if (event.key === "Home") {
      event.preventDefault();
      setActiveIndex(0);
    } else if (event.key === "End") {
      event.preventDefault();
      setActiveIndex(founders.length - 1);
    }
  };

  const handleWheel = (event) => {
    if (
      wheelLocked.current ||
      Math.abs(event.deltaX) <= Math.abs(event.deltaY) ||
      Math.abs(event.deltaX) < 18
    ) {
      return;
    }

    wheelLocked.current = true;
    if (event.deltaX > 0) {
      showNext();
    } else {
      showPrevious();
    }

    window.setTimeout(() => {
      wheelLocked.current = false;
    }, 420);
  };

  const activeFounder = founders[activeIndex];

  return (
    <div
      className={styles.carousel}
      aria-label="Effy Tech leadership carousel"
      aria-roledescription="carousel"
      onKeyDown={handleKeyDown}
    >
      <div className={styles.guide}>
        <span>DRAG OR SWIPE TO EXPLORE</span>
        <p>Select a leader to see their role, responsibility, and profile.</p>
      </div>

      <div
        className={styles.viewport}
        style={{ "--team-drag-offset": `${dragOffset}px` }}
        onClickCapture={handleClickCapture}
        onPointerCancel={cancelPointerGesture}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={finishPointerGesture}
        onWheel={handleWheel}
      >
        <div className={styles.depthField} aria-hidden="true">
          <i />
          <i />
          <i />
        </div>

        <div className={styles.track}>
          {founders.map((founder, index) => {
            const position = getCardPosition(
              index,
              activeIndex,
              founders.length,
            );
            const isActive = position === "active";

            return (
              <article
                className={styles.carouselCard}
                data-position={position}
                key={founder.name}
                role="group"
                aria-label={`${index + 1} of ${founders.length}: ${founder.name}`}
                aria-roledescription="slide"
                aria-hidden={!isActive}
                onClick={() => {
                  if (!isActive) setActiveIndex(index);
                }}
              >
                <span className={styles.cardIndex}>
                  0{index + 1} / 0{founders.length}
                </span>

                <div className={styles.portrait}>
                  <Image
                    src={founder.image}
                    alt=""
                    fill
                    priority={index === 0}
                    sizes="(max-width: 560px) 82vw, (max-width: 980px) 50vw, 440px"
                  />
                  <div className={styles.portraitShade} />
                  <span className={styles.activeMark}>ACTIVE LEADERSHIP</span>
                </div>

                <div className={styles.cardBody}>
                  <small>{founder.role}</small>
                  <h3>{founder.name}</h3>
                  <p>{founder.summary}</p>
                  <Link href={founder.href} tabIndex={isActive ? 0 : -1}>
                    View {founder.name.split(" ")[0]}&apos;s profile
                    <ArrowRight size={15} aria-hidden="true" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <div className={styles.controls}>
        <button
          type="button"
          className={styles.arrowButton}
          onClick={showPrevious}
          aria-label="Show previous team member"
        >
          <ChevronLeft size={20} aria-hidden="true" />
        </button>

        <button
          type="button"
          className={styles.arrowButton}
          onClick={showNext}
          aria-label="Show next team member"
        >
          <ChevronRight size={20} aria-hidden="true" />
        </button>
      </div>

      <p className={styles.liveStatus} aria-live="polite" aria-atomic="true">
        Showing {activeFounder.name}, {activeFounder.role}
      </p>
    </div>
  );
}
