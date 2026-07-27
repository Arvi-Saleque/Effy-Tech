// @ts-nocheck -- Isolated generalized demo uses a dynamic local mock adapter.
import React from "react";
import { SiteLoader } from "@/features/effy-edu-demo/components/common/SiteLoader";

export default function NewsEventsLoading() {
  return <SiteLoader message="Loading News & Events..." />;
}
