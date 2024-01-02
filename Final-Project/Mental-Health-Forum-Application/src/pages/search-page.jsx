import { useCallback, useEffect, useState } from "react";
import { searchApi } from "../api/forum-api";
import { useNavigate, useParams } from "react-router-dom";
import { Pagination } from "flowbite-react";
import AddPost from "../components/post/add-post/add-post";
import MostRecentPosts from "../components/statistics-&-info/recent-posts";
import ForumStatistics from "../components/statistics-&-info/forum-stats";
import SocialInfo from "../components/statistics-&-info/social-info";
import SearchResultLists from "../components/statistics-&-info/search-result";

export default function SearchResultPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const query = params.query;
  const currentPage = parseInt(params.searchPage) || 1;
  const [posts, setPosts] = useState([]);
  const [totalPages, setTotalPages] = useState("");
  const [totalSearchResults, setTotalSearchResults] = useState("");

  //   console.log(posts);

  const fetchSearchResults = useCallback(async () => {
    setLoading(true);
    try {
      const data = await searchApi(query, currentPage);
      setPosts(data.posts);
      setTotalPages(data.totalPages);
      setTotalSearchResults(data.totalResults);
    } catch (error) {
      console.error("Failed to fetch posts by postId", error);
    } finally {
      setLoading(false);
    }
  }, [query, currentPage]);

  useEffect(() => {
    fetchSearchResults();
  }, [fetchSearchResults]);

  const onNextPage = (newPage) => {
    navigate(`/search/${query}/${newPage}`);
  };

  return (
    <div className="flex flex-col md:flex-row gap-2 ">
      <div className="md:w-3/4 md:h-screen md:scrollbar-thin scrollbar-thumb-light-navy scrollbar-track-blue-300 overflow-y-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-full pr-1">
        <div className="mb-10">
          <SearchResultLists posts={posts} loading={loading} totalSearchResults={totalSearchResults} />
          <Pagination showIcons currentPage={currentPage} totalPages={totalPages} onPageChange={onNextPage} className="flex justify-end mb-4" />
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
