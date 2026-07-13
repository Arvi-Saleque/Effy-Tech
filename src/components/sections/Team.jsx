"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa";
import {
  HiOutlineArrowLeft,
  HiOutlineArrowRight,
  HiOutlineMail,
} from "react-icons/hi";
import siteConfig from "@/theme/siteConfig";

const socialIconMap = {
  facebook: FaFacebookF,
  github: FaGithub,
  linkedin: FaLinkedinIn,
  mail: HiOutlineMail,
};

const memberDetails = {
  "Salek Bin Hossain": {
    tag: "Vision",
    focus: ["Product Direction", "Client Strategy", "Launch Planning"],
    note: "Turns business goals into a clear product roadmap and keeps the team aligned from idea to delivery.",
  },
  "Adnan Bin Wahid": {
    tag: "Systems",
    focus: ["Full-Stack Builds", "Backend Architecture", "Developer Tools"],
    note: "Shapes reliable systems with clean interfaces, scalable foundations, and practical engineering discipline.",
  },
  "Abdullah Al Saif": {
    tag: "Execution",
    focus: ["Mobile Apps", "IoT Products", "Engineering Delivery"],
    note: "Connects software, hardware, and launch-ready implementation with a strong focus on usable results.",
  },
};

const cardMotion = {
  initial: { opacity: 0, y: 34, filter: "blur(8px)" },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay,
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

function getOffset(index, activeIndex, total) {
  const rawOffset = index - activeIndex;
  if (rawOffset > total / 2) return rawOffset - total;
  if (rawOffset < -total / 2) return rawOffset + total;
  return rawOffset;
}

function TeamSocials({ links = [] }) {
  if (!links.length) return null;

  return (
    <div className="flex items-center gap-2">
      {links.map(({ platform, url }) => {
        const Icon = socialIconMap[platform];
        if (!Icon || !url) return null;

        const isExternal = url.startsWith("http");

        return (
          <a
            key={`${platform}-${url}`}
            href={url}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            aria-label={platform}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-700 bg-neutral-950 text-neutral-300 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-light hover:bg-primary-light hover:text-neutral-950"
          >
            <Icon className="h-4 w-4" />
          </a>
        );
      })}
    </div>
  );
}

function MemberCard({ member, offset, isActive, onSelect, index }) {
  const distance = Math.abs(offset);
  const position = Math.max(-1, Math.min(1, offset));
  const scale = isActive ? 1 : 0.72;
  const rotate = 0;
  const opacity = isActive ? 1 : 0.48;
  const blur = isActive ? "blur(0px)" : "blur(1px)";
  const grayscale = isActive ? "grayscale(0)" : "grayscale(1)";

  return (
    <motion.button
      type="button"
      onClick={onSelect}
      aria-label={`Show ${member.name}`}
      className="absolute left-1/2 top-1/2 h-[260px] w-[205px] overflow-hidden rounded-[8px] border border-neutral-200 bg-neutral-white shadow-xl outline-none transition-shadow duration-300 hover:shadow-2xl sm:h-[320px] sm:w-[245px] md:h-[350px] md:w-[270px]"
      initial={false}
      animate={{
        opacity,
        scale,
        rotate,
        x: `calc(-50% + (${position} * clamp(6.1rem, 22vw, 14.5rem)))`,
        y: "-50%",
        zIndex: isActive ? 30 : 20 - distance,
        filter: `${blur} ${grayscale}`,
      }}
      style={{
        transformOrigin: "center",
      }}
      transition={{
        type: "spring",
        stiffness: 180,
        damping: 24,
        mass: 0.8,
      }}
      whileHover={isActive ? { y: "-52%" } : { scale: 0.82 }}
    >
      <span className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-transparent to-neutral-950/15" />
      <Image
        src={member.photo}
        alt={member.name}
        fill
        priority={index === 0}
        sizes="(max-width: 640px) 205px, (max-width: 768px) 245px, 270px"
        className="object-cover"
        style={{ objectPosition: member.photoPosition || "center" }}
      />
      <span className="pointer-events-none absolute inset-x-4 bottom-4 z-20 rounded-[8px] border border-neutral-white/50 bg-neutral-white/85 px-3 py-2 text-center shadow-lg backdrop-blur-md sm:hidden">
        <span className="block font-heading text-base font-bold text-neutral-950">
          {member.name}
        </span>
        <span className="block text-[10px] font-bold uppercase tracking-widest text-primary">
          {member.role}
        </span>
      </span>
    </motion.button>
  );
}

function ProfileConsole({ member, details }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={member.name}
        initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -12, filter: "blur(8px)" }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto mt-10 max-w-3xl overflow-hidden rounded-[8px] border border-neutral-800 bg-neutral-950 text-left shadow-2xl shadow-neutral-950/20"
      >
        <div className="flex items-center justify-between border-b border-neutral-800 bg-neutral-900 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-error" />
            <span className="h-3 w-3 rounded-full bg-warning" />
            <span className="h-3 w-3 rounded-full bg-success" />
            <span className="ml-2 text-xs font-semibold uppercase tracking-widest text-neutral-400">
              Team Profile
            </span>
          </div>
          <span className="hidden text-xs font-semibold text-neutral-400 sm:block">
            Effy Tech / {details.tag}
          </span>
        </div>

        <div className="grid gap-6 p-5 sm:p-6 md:grid-cols-[1.25fr_0.75fr]">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-primary-light">
              {details.tag}
            </p>
            <p className="mt-3 text-base leading-relaxed text-neutral-200 sm:text-lg">
              {details.note}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-neutral-400">
              {member.bio}
            </p>
          </div>

          <div className="space-y-5">
            <div className="flex flex-wrap gap-2">
              {details.focus.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-primary-light/20 bg-primary-light/10 px-3 py-1 text-xs font-semibold text-primary-light"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <TeamSocials links={member.socials} />
              <a
                href={member.detailsUrl}
                className="inline-flex items-center gap-2 rounded-full border border-primary-light/40 bg-primary-light/10 px-4 py-2 text-sm font-bold text-primary-light transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-light hover:text-neutral-950"
              >
                View Details
                <HiOutlineArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Team() {
  const prefersReduced = useReducedMotion();
  const team = useMemo(() => siteConfig.team || [], []);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const activeMember = team[activeIndex];
  const activeDetails = memberDetails[activeMember?.name] || {
    tag: "Craft",
    focus: ["Product", "Design", "Engineering"],
    note: activeMember?.bio || "",
  };

  const goTo = (index) => {
    if (!team.length) return;
    setActiveIndex((index + team.length) % team.length);
  };

  useEffect(() => {
    if (prefersReduced || isPaused || team.length < 2) return undefined;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % team.length);
    }, 2500);

    return () => window.clearInterval(timer);
  }, [isPaused, prefersReduced, team.length]);

  if (!team.length) return null;

  return (
    <section
      id="team"
      className="relative overflow-hidden bg-surface-dark py-20 text-neutral-white sm:py-28"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-28 top-1/4 h-[360px] w-[360px] rounded-full bg-primary/5 blur-[130px] sm:h-[560px] sm:w-[560px]" />
        <div className="absolute bottom-1/4 right-0 h-[300px] w-[300px] rounded-full bg-accent/6 blur-[120px] sm:h-[440px] sm:w-[440px]" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(185,154,90,0.7) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          variants={cardMotion}
          initial="initial"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          custom={0}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-primary-light/20 bg-primary-light/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary-light">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary-light" />
            Effy Tech Crew
          </span>
          <h2 className="mt-5 font-heading text-4xl font-black tracking-tight text-neutral-white sm:text-5xl">
            The Minds Behind Effy Tech
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base font-semibold leading-relaxed text-neutral-400 sm:text-lg">
            A focused team of builders, strategists, and engineers — turning
            ideas into products that work.
          </p>
        </motion.div>

        <motion.div
          variants={cardMotion}
          initial="initial"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          custom={0.08}
          className="relative mx-auto mt-12 h-[310px] max-w-5xl sm:h-[400px]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="pointer-events-none absolute left-1/2 top-3 -translate-x-1/2 select-none font-heading text-6xl font-black uppercase tracking-wide text-neutral-700/50 blur-[1px] sm:text-8xl md:text-9xl">
            Our Team
          </div>

          <button
            type="button"
            onClick={() => goTo(activeIndex - 1)}
            aria-label="Previous team member"
            className="absolute left-0 top-1/2 z-40 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-primary/20 bg-primary/85 text-neutral-white shadow-lg transition-all duration-300 hover:-translate-x-1 hover:bg-primary-dark sm:left-6"
          >
            <HiOutlineArrowLeft className="h-5 w-5" />
          </button>

          <div className="absolute inset-x-8 top-0 h-full sm:inset-x-16">
            {team.map((member, index) => {
              const offset = getOffset(index, activeIndex, team.length);
              const isActive = offset === 0;

              return (
                <MemberCard
                  key={member.name}
                  member={member}
                  offset={offset}
                  isActive={isActive}
                  onSelect={() => goTo(index)}
                  index={index}
                />
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => goTo(activeIndex + 1)}
            aria-label="Next team member"
            className="absolute right-0 top-1/2 z-40 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-700 bg-neutral-950 text-neutral-white shadow-lg transition-all duration-300 hover:translate-x-1 hover:bg-neutral-800 sm:right-6"
          >
            <HiOutlineArrowRight className="h-5 w-5" />
          </button>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeMember.name}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="mx-auto mt-6 hidden min-h-[72px] max-w-md px-12 text-center sm:block"
          >
            <div className="flex items-center justify-center gap-4">
              <span className="h-px w-16 bg-primary/40" />
              <h3 className="font-heading text-xl font-black text-primary-light sm:text-2xl">
                {activeMember.name}
              </h3>
              <span className="h-px w-16 bg-primary/40" />
            </div>
            <p className="mt-2 text-xs font-bold uppercase tracking-[0.25em] text-neutral-400">
              {activeMember.role}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="mt-6 flex items-center justify-center gap-2">
          {team.map((member, index) => (
            <button
              key={`${member.name}-dot`}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`Show ${member.name}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "w-7 bg-primary"
                  : "w-2 bg-neutral-700 hover:bg-neutral-500"
              }`}
            />
          ))}
        </div>

        <ProfileConsole member={activeMember} details={activeDetails} />
      </div>
    </section>
  );
}

