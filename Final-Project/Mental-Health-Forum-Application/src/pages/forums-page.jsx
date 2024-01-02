import { useCallback, useEffect, useState } from "react";
import Forums from "../components/forum/forums";
import { getAllForums } from "../api/forum-api";
import SocialInfo from "../components/statistics-&-info/social-info";
import MostRecentPosts from "../components/statistics-&-info/recent-posts";
import AddPost from "../components/post/add-post/add-post";
import ForumStatistics from "../components/statistics-&-info/forum-stats";

export default function ForumsPage() {
  const [loading, setLoading] = useState(false);
  const [forums, setForums] = useState([]);

  const fetchForums = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAllForums();
      setForums(data.forums);
    } catch (error) {
      console.error("Failed to fetch forums:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchForums();
  }, [fetchForums]);

  return (
    <div className="flex flex-col md:flex-row gap-2 ">
      <div className="md:w-3/4 md:h-120vh md:pb-10 md:scrollbar-thin scrollbar-thumb-light-navy scrollbar-track-blue-300 overflow-y-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-full pr-1">
        <div className="flex justify-end mt-5 md:hidden ">
          <AddPost />
        </div>
        <div className="mt-5 mb-5">
          <Forums grabForums={forums} grabLoadingState={loading} />
        </div>
      </div>
      <div className="md:w-1/4 md:pb-10 md:h-120vh md:scrollbar-thin scrollbar-thumb-light-navy scrollbar-track-blue-300 overflow-y-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-full px-1">
        <div className="hidden md:flex justify-start mt-2 ">
          <AddPost />
        </div>
        <div className="mt-2 mb-5">
          <ForumStatistics />
          <SocialInfo />
          <MostRecentPosts />
        </div>
      </div>
    </div>
  );
}
