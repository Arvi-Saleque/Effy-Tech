import LeadershipProfile from "@/components/team/LeadershipProfile";
import {
  createLeadershipMetadata,
  getLeadershipProfile,
} from "@/lib/leadershipRoute";
import "@/styles/spatial-components.css";
import "@/styles/team-profile-spatial.css";

const memberSlug = "salek";

export const metadata = createLeadershipMetadata(memberSlug);

export default function SalekProfilePage() {
  return <LeadershipProfile profile={getLeadershipProfile(memberSlug)} />;
}
