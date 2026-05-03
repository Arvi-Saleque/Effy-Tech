"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa";
import {
  HiOutlineArrowRight,
  HiOutlineMail,
  HiOutlineUserCircle,
} from "react-icons/hi";
import siteConfig from "@/theme/siteConfig";

const socialIconMap = {
  facebook: FaFacebookF,
  github: FaGithub,
  linkedin: FaLinkedinIn,
  mail: HiOutlineMail,
};

const portraitGradients = [
  "from-primary-darkest via-neutral-900 to-neutral-800",
  "from-neutral-800 via-primary-darkest to-neutral-900",
  "from-neutral-900 via-neutral-800 to-primary-darkest",
];

const tileReveal = {
  hidden: { opacity: 0, y: 36 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

function TeamSocials({ links = [] }) {
  if (!links.length) return null;

  return (
    <div className="mt-6 flex items-center justify-center gap-3">
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
            className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-700/50 bg-neutral-900/40 text-neutral-400 transition-all duration-300 hover:border-primary-light/40 hover:bg-primary-light/10 hover:text-primary-light"
          >
            <Icon className="h-4 w-4" />
          </a>
        );
      })}
    </div>
  );
}

function PortraitTile({ member, index, prefersReduced, className = "" }) {
  const hoverMotion = prefersReduced
    ? {}
    : {
        whileHover: {
          y: -8,
          transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
        },
      };

  return (
    <motion.article
      variants={tileReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      custom={index}
      className={`group relative min-h-[300px] overflow-hidden rounded-2xl border border-neutral-700/40 bg-neutral-800/60 shadow-sm backdrop-blur-sm transition-all duration-500 hover:border-primary/30 hover:shadow-[0_0_40px_rgba(45,212,191,0.08)] sm:min-h-[340px] ${className}`}
      {...hoverMotion}
    >
      {member.photo ? (
        <img
          src={member.photo}
          alt={member.name}
          style={{ objectPosition: member.photoPosition || "center" }}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      ) : (
        <div
          className={`relative flex h-full min-h-[300px] items-end justify-center overflow-hidden bg-gradient-to-br ${portraitGradients[index % portraitGradients.length]} p-8 sm:min-h-[340px]`}
        >
          <div className="absolute inset-0 opacity-[0.06] bg-dot-grid" />
          <div className="absolute left-1/2 top-12 h-36 w-36 -translate-x-1/2 rounded-full bg-primary-light/10 blur-3xl transition-transform duration-700 group-hover:scale-125" />
          <div className="absolute bottom-0 left-1/2 h-56 w-56 -translate-x-1/2 rounded-t-full border border-primary-light/10 bg-primary-light/5" />
          <div className="relative z-10 flex flex-col items-center pb-6 text-center">
            <div className="mb-5 flex h-32 w-32 items-center justify-center rounded-full border border-primary-light/25 bg-neutral-900/55 text-primary-light shadow-[0_0_35px_rgba(45,212,191,0.12)] backdrop-blur-md">
              <HiOutlineUserCircle className="absolute h-24 w-24 text-primary-light/15" />
              <span className="relative font-heading text-4xl font-bold tracking-tight">
                {member.initials}
              </span>
            </div>
            <span className="rounded-full border border-primary-light/20 bg-neutral-900/60 px-3 py-1 text-xs font-medium uppercase tracking-widest text-primary-light">
              {member.role}
            </span>
          </div>
        </div>
      )}

      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-neutral-950/70 to-transparent" />
    </motion.article>
  );
}

function ProfileTile({ member, index, prefersReduced, className = "" }) {
  const hoverMotion = prefersReduced
    ? {}
    : {
        whileHover: {
          y: -8,
          transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
        },
      };

  return (
    <motion.article
      variants={tileReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      custom={index}
      className={`group relative flex min-h-[300px] flex-col items-center justify-center overflow-hidden rounded-2xl border border-neutral-700/40 bg-neutral-800/60 p-7 text-center shadow-sm backdrop-blur-sm transition-all duration-500 hover:border-primary/30 hover:bg-neutral-800/70 hover:shadow-[0_0_40px_rgba(45,212,191,0.08)] sm:min-h-[340px] sm:p-9 ${className}`}
      {...hoverMotion}
    >
      <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-primary-light/5 blur-3xl transition-transform duration-700 group-hover:scale-125" />
      <div className="absolute -bottom-16 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />

      <h3 className="font-heading text-2xl font-bold tracking-tight text-neutral-100">
        {member.name}
      </h3>
      <p className="mt-1 text-sm font-semibold uppercase tracking-widest text-primary-light">
        {member.role}
      </p>
      <p className="mx-auto mt-5 max-w-xs text-sm leading-relaxed text-neutral-400">
        {member.bio}
      </p>

      <TeamSocials links={member.socials} />

      <a
        href={member.detailsUrl}
        className="relative z-10 mt-6 inline-flex items-center gap-2 rounded-full border border-primary-light/25 bg-primary-light/10 px-5 py-2 text-sm font-semibold text-primary-light transition-all duration-300 hover:border-accent-light/35 hover:bg-accent/10 hover:text-accent-light"
      >
        View Details
        <HiOutlineArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </a>
    </motion.article>
  );
}

export default function Team() {
  const prefersReduced = useReducedMotion();
  const team = siteConfig.team || [];

  const mosaicTiles = team.flatMap((member, memberIndex) => [
    {
      type: "portrait",
      member,
      className:
        memberIndex === 1 ? "order-3 lg:order-5" : memberIndex === 2 ? "order-5 lg:order-3" : "order-1",
    },
    {
      type: "profile",
      member,
      className:
        memberIndex === 0
          ? "order-2 lg:order-4"
          : memberIndex === 1
            ? "order-4 lg:order-2"
            : "order-6",
    },
  ]);

  return (
    <section
      id="team"
      className="relative overflow-hidden bg-surface-dark py-24 sm:py-32"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-1/4 h-[300px] w-[300px] rounded-full bg-primary/5 blur-[130px] sm:h-[520px] sm:w-[520px]" />
        <div className="absolute bottom-1/4 right-1/4 h-[260px] w-[260px] rounded-full bg-accent/6 blur-[120px] sm:h-[420px] sm:w-[420px]" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(45,212,191,0.7) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary-light/20 bg-primary-light/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-primary-light">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary-light" />
            Our Team
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-text-inverse sm:text-4xl lg:text-5xl">
            Meet the People Behind{" "}
            <span className="text-gradient-primary">Effy Tech</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-neutral-400">
            A focused crew blending product thinking, design craft, and
            engineering discipline.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {mosaicTiles.map(({ type, member, className }, index) =>
            type === "portrait" ? (
              <PortraitTile
                key={`${member.name}-portrait`}
                member={member}
                index={index}
                prefersReduced={prefersReduced}
                className={className}
              />
            ) : (
              <ProfileTile
                key={`${member.name}-profile`}
                member={member}
                index={index}
                prefersReduced={prefersReduced}
                className={className}
              />
            ),
          )}
        </div>
      </div>
    </section>
  );
}
