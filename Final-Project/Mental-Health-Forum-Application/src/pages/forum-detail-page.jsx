import { useCallback, useEffect, useState } from "react";
import PostLists from "../components/post/post-lists";
import { getPaginatedPostsOnSpecificForum } from "../api/forum-api";
import { useNavigate, useParams } from "react-router-dom";
import AddPost from "../components/post/add-post/add-post";
import SocialInfo from "../components/statistics-&-info/social-info";
import MostRecentPosts from "../components/statistics-&-info/recent-posts";
import ForumStatistics from "../components/statistics-&-info/forum-stats";

export default function ForumDetailPage() {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [totalPages, setTotalPages] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const forumId = params.forumId;
  const title = params.title;
  const currentPage = parseInt(params.page) || 1;


  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getPaginatedPostsOnSpecificForum(forumId, currentPage);
      setPosts(data.posts);
      setTotalPages(data.totalPages);
      // console.log(totalPages)
    } catch (error) {
      console.error("Failed to fetch posts by forumId", error);
    } finally {
      setLoading(false);
    }
  }, [forumId, currentPage]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);
  // console.log(posts)

  const onPageChange = (newPage) => {
    navigate(`/forum/${title}/${forumId}/${newPage}`);
  };

  return (
    <div className="flex flex-col md:flex-row gap-2 ">
      <div className="md:w-3/4 md:h-screen md:scrollbar-thin scrollbar-thumb-light-navy scrollbar-track-blue-300 overflow-y-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-full pr-1">
        <div className="flex justify-end mt-5 md:hidden ">
          <AddPost />
        </div>
        <div className="mt-5 mb-5">
          <PostLists posts={posts} loading={loading} currentPage={currentPage} onPageChange={onPageChange} totalPages={totalPages} />
        </div>
      </div>
      <div className="md:w-1/4 pb-10 md:h-screen md:scrollbar-thin scrollbar-thumb-light-navy scrollbar-track-blue-300 overflow-y-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-full px-1">
        <div className="hidden md:flex justify-start mt-2 ">
          <AddPost />
        </div>
        <div className="mt-2 mb-5">
          <MostRecentPosts />
          <ForumStatistics />
          <SocialInfo />
        </div>
      </div>
    </div>
  );
}
