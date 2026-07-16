import { notFound } from "next/navigation";
import LeadershipProfile from "@/components/team/LeadershipProfile";
import { getTeamProfile, teamProfiles } from "@/data/teamProfiles";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(teamProfiles).map((memberSlug) => ({ memberSlug }));
}

export async function generateMetadata({ params }) {
  const { memberSlug } = await params;
  const profile = getTeamProfile(memberSlug);

  if (!profile) {
    return {
      title: "Leadership Profile | Effy Tech",
      robots: { index: false, follow: false },
    };
  }

  const title = `${profile.name} — ${profile.role} | Effy Tech`;
  const description = `${profile.name} is ${profile.role} at Effy Tech. Explore leadership responsibilities, live client work, engineering expertise, and selected technical projects.`;
  const canonical = `/${profile.slug}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Effy Tech",
      type: "profile",
      images: [
        {
          url: profile.ogImage,
          width: 1200,
          height: 630,
          alt: `${profile.name}, ${profile.role} at Effy Tech`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [profile.ogImage],
    },
  };
}

export default async function TeamMemberPage({ params }) {
  const { memberSlug } = await params;
  const profile = getTeamProfile(memberSlug);

  if (!profile) notFound();

  return <LeadershipProfile profile={profile} />;
}
