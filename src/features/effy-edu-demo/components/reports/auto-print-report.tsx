// @ts-nocheck -- Isolated generalized demo uses a dynamic local mock adapter.
"use client";

import { useEffect } from "react";

export function AutoPrintReport() {
  useEffect(() => {
    const timer = window.setTimeout(() => window.print(), 600);
    return () => window.clearTimeout(timer);
  }, []);

  return null;
}
