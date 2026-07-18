import LeadershipProfile from "@/components/team/LeadershipProfile";
import {
  createLeadershipMetadata,
  getLeadershipProfile,
} from "@/lib/leadershipRoute";
import "@/styles/spatial-components.css";
import "@/styles/team-profile-spatial.css";

const memberSlug = "saif";

export const metadata = createLeadershipMetadata(memberSlug);

export default function SaifProfilePage() {
  return <LeadershipProfile profile={getLeadershipProfile(memberSlug)} />;
}
