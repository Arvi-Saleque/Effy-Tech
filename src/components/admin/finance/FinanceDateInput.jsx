"use client";

import { useCallback, useRef } from "react";
import { CalendarDays } from "lucide-react";

export default function FinanceDateInput({
  className = "",
  containerClassName = "",
  calendarLabel = "Open date picker",
  onClick,
  onKeyDown,
  style,
  disabled = false,
  ...props
}) {
  const inputRef = useRef(null);

  const openPicker = useCallback(() => {
    const input = inputRef.current;
    if (!input || disabled) return;

    input.focus({ preventScroll: true });
    try {
      if (typeof input.showPicker === "function") input.showPicker();
    } catch {
      // Some browsers only allow showPicker during a direct user gesture.
      // The visible date input remains focused as the native fallback.
    }
  }, [disabled]);

  return (
    <span className={`relative inline-block w-full ${containerClassName}`}>
      <input
        {...props}
        ref={inputRef}
        type="date"
        disabled={disabled}
        onClick={(event) => {
          onClick?.(event);
          if (!event.defaultPrevented) openPicker();
        }}
        onKeyDown={(event) => {
          onKeyDown?.(event);
          if (!event.defaultPrevented && (event.key === "Enter" || event.key === " ")) {
            event.preventDefault();
            openPicker();
          }
        }}
        className={`finance-date-native ${className}`}
        style={{ ...style, colorScheme: "dark", paddingRight: "2.75rem" }}
      />
      <button
        type="button"
        disabled={disabled}
        aria-label={calendarLabel}
        onClick={openPicker}
        className="absolute right-1.5 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-neutral-400 transition hover:bg-emerald-500/10 hover:text-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 disabled:pointer-events-none disabled:opacity-40"
      >
        <CalendarDays className="h-4 w-4" aria-hidden="true" />
      </button>
      <style jsx>{`
        .finance-date-native::-webkit-calendar-picker-indicator {
          width: 0;
          margin: 0;
          opacity: 0;
          pointer-events: none;
        }
      `}</style>
    </span>
  );
}
