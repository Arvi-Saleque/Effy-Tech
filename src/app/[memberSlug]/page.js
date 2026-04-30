import Link from "next/link";
import { notFound } from "next/navigation";
import { FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa";
import { HiOutlineArrowLeft, HiOutlineMail } from "react-icons/hi";
import siteConfig from "@/theme/siteConfig";

const socialIconMap = {
  facebook: FaFacebookF,
  github: FaGithub,
  linkedin: FaLinkedinIn,
  mail: HiOutlineMail,
};

function getMember(slug) {
  return siteConfig.team.find(
    (member) => member.detailsUrl?.replace("/", "") === slug,
  );
}

export function generateStaticParams() {
  return siteConfig.team
    .filter((member) => member.detailsUrl)
    .map((member) => ({
      memberSlug: member.detailsUrl.replace("/", ""),
    }));
}

export function generateMetadata({ params }) {
  const member = getMember(params.memberSlug);

  if (!member) {
    return {
      title: "Team Member | Effy Tech",
    };
  }

  return {
    title: `${member.name} | Effy Tech`,
    description: `${member.name}, ${member.role} at Effy Tech.`,
  };
}

export default function TeamMemberPage({ params }) {
  const member = getMember(params.memberSlug);

  if (!member) notFound();

  return (
    <main className="min-h-screen overflow-hidden bg-surface-dark pt-28 text-text-inverse">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-1/4 h-[420px] w-[420px] rounded-full bg-primary/5 blur-[130px]" />
        <div className="absolute bottom-1/4 right-1/4 h-[340px] w-[340px] rounded-full bg-accent/6 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(45,212,191,0.7) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <section className="relative z-10 mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <Link
          href="/#team"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-primary-light transition-colors hover:text-accent-light"
        >
          <HiOutlineArrowLeft className="h-4 w-4" />
          Back to Team
        </Link>

        <div className="grid overflow-hidden rounded-2xl border border-neutral-700/40 bg-neutral-800/60 shadow-[0_0_42px_rgba(45,212,191,0.08)] backdrop-blur-sm lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative min-h-[420px] overflow-hidden">
            <img
              src={member.photo}
              alt={member.name}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-neutral-950/75 to-transparent" />
          </div>

          <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
            <span className="mb-4 w-fit rounded-full border border-primary-light/20 bg-primary-light/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-primary-light">
              Effy Tech Team
            </span>
            <h1 className="font-heading text-4xl font-bold tracking-tight text-neutral-100 sm:text-5xl">
              {member.name}
            </h1>
            <p className="mt-3 text-sm font-semibold uppercase tracking-widest text-primary-light">
              {member.role}
            </p>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-neutral-400">
              {member.bio}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              {member.socials.map(({ platform, url }) => {
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
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-700/50 bg-neutral-900/40 text-neutral-400 transition-all duration-300 hover:border-primary-light/40 hover:bg-primary-light/10 hover:text-primary-light"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>

            <Link
              href="/#contact"
              className="mt-10 inline-flex w-fit items-center justify-center rounded-full bg-gradient-primary px-6 py-3 text-sm font-semibold text-text-inverse shadow-accent transition-all hover:scale-[1.02]"
            >
              Contact Effy Tech
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
