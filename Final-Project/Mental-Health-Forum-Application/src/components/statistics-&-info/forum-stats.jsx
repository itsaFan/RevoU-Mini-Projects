import { BarChart3, BookMarked, MessagesSquare, Users } from "lucide-react";
import StatsCard from "../ui/stats-card";
import { useCallback, useEffect, useState } from "react";
import { getForumStats } from "../../api/forum-api";
import LoadingForumContent from "../ui/loading";

export default function ForumStatistics() {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchForumStats = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getForumStats();
      setStats(data.stats);
    } catch (error) {
      console.error("Failed to fetch forums:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchForumStats();
  }, [fetchForumStats]);
  //   console.log(stats);

  return (
    <StatsCard title="Forum Statistics" icon={<BarChart3 size={20} />}>
      {loading ? (
        <div className="my-6">
          <LoadingForumContent />
        </div>
      ) : (
        <div className="flex flex-col gap-2 ">
          <div className="flex gap-2 text-sm items-center">
            <Users />
            <span>Members: {stats.totalMembers}</span>
          </div>
          <div className="flex gap-2 text-sm items-center">
            <BookMarked />
            <span>Posts: {stats.totalPosts}</span>
          </div>
          <div className="flex gap-2 text-sm items-center">
            <MessagesSquare />
            <span>Replies: {stats.totalComments}</span>
          </div>
        </div>
      )}
    </StatsCard>
  );
}
