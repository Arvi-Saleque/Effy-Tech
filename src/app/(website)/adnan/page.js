import LeadershipProfile from "@/components/team/LeadershipProfile";
import {
  createLeadershipMetadata,
  getLeadershipProfile,
} from "@/lib/leadershipRoute";
import "@/styles/spatial-components.css";
import "@/styles/team-profile-spatial.css";
import "@/styles/team-leadership-step5.css";

const memberSlug = "adnan";

export const metadata = createLeadershipMetadata(memberSlug);

export default function AdnanProfilePage() {
  return <LeadershipProfile profile={getLeadershipProfile(memberSlug)} />;
}
