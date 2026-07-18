"use client";

import useMediaQuery from "./useMediaQuery";

export default function useCoarsePointer() {
  return useMediaQuery("(hover: none), (pointer: coarse)");
}
