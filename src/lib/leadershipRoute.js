import { getTeamProfile } from "@/data/teamProfiles";

const canonicalProfileRoutes = {
  salek: "/team/salek-bin-hossain",
  saif: "/team/abdullah-al-saif",
  adnan: "/team/adnan-bin-wahid",
};

export function getLeadershipProfile(memberSlug) {
  const profile = getTeamProfile(memberSlug);

  if (!profile) {
    throw new Error(`Unknown Effy Tech leadership profile: ${memberSlug}`);
  }

  return profile;
}

export function createLeadershipMetadata(memberSlug) {
  const profile = getLeadershipProfile(memberSlug);
  const title = `${profile.name} — ${profile.role} | Effy Tech`;
  const description = `${profile.name} is ${profile.role} at Effy Tech. Explore leadership responsibilities, live client work, engineering expertise, and selected technical projects.`;
  const canonical = canonicalProfileRoutes[profile.slug];

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
