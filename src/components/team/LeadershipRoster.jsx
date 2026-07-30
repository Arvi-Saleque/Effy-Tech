"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { ArrowRight, CheckCircle2, ExternalLink, Layers3 } from "lucide-react";
import { teamProfileRoutes } from "@/data/teamProfiles";

function nextTabIndex(key, currentIndex, total) {
  if (key === "Home") return 0;
  if (key === "End") return total - 1;
  if (key === "ArrowRight" || key === "ArrowDown") {
    return (currentIndex + 1) % total;
  }
  if (key === "ArrowLeft" || key === "ArrowUp") {
    return (currentIndex - 1 + total) % total;
  }
  return null;
}

export default function LeadershipRoster({ profiles }) {
  const [activeSlug, setActiveSlug] = useState(profiles[0]?.slug);
  const tabRefs = useRef([]);
  const activeIndex = Math.max(
    profiles.findIndex((profile) => profile.slug === activeSlug),
    0,
  );
  const activeProfile = profiles[activeIndex];

  function selectProfile(index, moveFocus = false) {
    const profile = profiles[index];
    if (!profile) return;

    setActiveSlug(profile.slug);
    if (moveFocus) {
      tabRefs.current[index]?.focus();
    }
  }

  function handleTabKeyDown(event, index) {
    const targetIndex = nextTabIndex(event.key, index, profiles.length);
    if (targetIndex === null) return;

    event.preventDefault();
    selectProfile(targetIndex, true);
  }

  if (!activeProfile) return null;

  const activeTabId = `leadership-tab-${activeProfile.slug}`;
  const activePanelId = `leadership-panel-${activeProfile.slug}`;

  return (
    <div className="leadership-roster">
      <div
        className="leadership-roster-tabs"
        role="tablist"
        aria-label="Effy Tech leadership profiles"
      >
        {profiles.map((profile, index) => {
          const isActive = profile.slug === activeProfile.slug;
          const tabId = `leadership-tab-${profile.slug}`;
          const panelId = `leadership-panel-${profile.slug}`;

          return (
            <button
              key={profile.slug}
              ref={(element) => {
                tabRefs.current[index] = element;
              }}
              id={tabId}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={panelId}
              tabIndex={isActive ? 0 : -1}
              className="leadership-roster-tab"
              onClick={() => selectProfile(index)}
              onKeyDown={(event) => handleTabKeyDown(event, index)}
            >
              <span className="leadership-roster-number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="leadership-roster-tab-copy">
                <strong>{profile.name}</strong>
                <small>{profile.role}</small>
              </span>
              <ArrowRight aria-hidden="true" size={18} />
            </button>
          );
        })}
      </div>

      <article
        key={activeProfile.slug}
        id={activePanelId}
        role="tabpanel"
        aria-labelledby={activeTabId}
        className="leadership-roster-panel"
      >
        <div className="leadership-roster-portrait">
          <Image
            src={activeProfile.portrait}
            alt={`${activeProfile.name}, ${activeProfile.role} at Effy Tech`}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 42vw"
            className="object-cover"
          />
          <div className="leadership-roster-portrait-label">
            <span>{String(activeIndex + 1).padStart(2, "0")}</span>
            <small>EFFY TECH LEADERSHIP</small>
          </div>
        </div>

        <div className="leadership-roster-detail">
          <p className="corporate-eyebrow">ACCOUNTABLE OWNER</p>
          <h2>{activeProfile.name}</h2>
          <strong>{activeProfile.role}</strong>
          <small>{activeProfile.discipline}</small>
          <p className="leadership-roster-intro">{activeProfile.intro}</p>

          <div className="leadership-roster-responsibility">
            <p>
              <Layers3 aria-hidden="true" size={18} />
              Role in delivery
            </p>
            <h3>{activeProfile.leadership.title}</h3>
            <ul>
              {activeProfile.leadership.responsibilities
                .slice(0, 3)
                .map((responsibility) => (
                  <li key={responsibility}>
                    <CheckCircle2 aria-hidden="true" size={17} />
                    <span>{responsibility}</span>
                  </li>
                ))}
            </ul>
          </div>

          <div className="leadership-roster-proof">
            <p>Relevant delivery areas</p>
            <div>
              {activeProfile.serviceLinks.map((service) => (
                <Link key={service.href} href={service.href}>
                  {service.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="leadership-roster-actions">
            <Link
              href={teamProfileRoutes[activeProfile.slug]}
              className="corporate-button-primary"
            >
              View full profile <ArrowRight aria-hidden="true" size={17} />
            </Link>
            <Link href="/projects" className="corporate-button-secondary">
              See delivered work <ExternalLink aria-hidden="true" size={16} />
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
