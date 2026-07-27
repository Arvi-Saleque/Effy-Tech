// @ts-nocheck -- Isolated generalized demo uses a dynamic local mock adapter.
"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { SiteInfo, siteInfo as defaultSiteInfo } from "@/features/effy-edu-demo/data/site";

const SiteSettingsContext = createContext<SiteInfo>(defaultSiteInfo);

export function SiteSettingsProvider({
  children,
  settings
}: {
  children: ReactNode;
  settings: SiteInfo;
}) {
  return (
    <SiteSettingsContext.Provider value={settings}>
      {children}
    </SiteSettingsContext.Provider>
  );
}

export function useSiteSettings() {
  return useContext(SiteSettingsContext);
}
