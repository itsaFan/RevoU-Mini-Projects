import { useLocation, useNavigate, useParams } from "react-router-dom";
import PostDetail from "../components/post/post-detail";
import { useCallback, useEffect, useState } from "react";
import { getPost } from "../api/post-api";
import Comment from "../components/comment/post-comment";
import { socket } from "../api/socket-client";
import { Pagination } from "flowbite-react";

export default function PostPage() {
  const location = useLocation();
  const postId = location.state?.postId;
  const [storedPostId] = useState(postId);
  const [post, setPost] = useState({ comments: [], author: {} });
  const [loading, setLoading] = useState(false);
  const [totalCommentPages, setTotalCommentPages] = useState("");
  const params = useParams();
  const currentPage = parseInt(params.postPage) || 1;
  const navigate = useNavigate();
  const title = params.postTitle;
  // console.log(storedPostId);
  //   console.log(post);
  // console.log(postId);

  const fetchPostDetail = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getPost(storedPostId, currentPage);
      setPost(data.post);
      setTotalCommentPages(data.totalCommentPages);
    } catch (error) {
      console.error("Failed to fetch posts by postId", error);
    } finally {
      setLoading(false);
    }
  }, [storedPostId, currentPage]);

  useEffect(() => {
    fetchPostDetail();

    const handleUpdatePostDetail = () => {
      fetchPostDetail();
    };
    socket.on("commentCreated", handleUpdatePostDetail);

    return () => {
      socket.off("commentCreated", handleUpdatePostDetail);
    };
  }, [fetchPostDetail]);

  const reFetching = () => {
    fetchPostDetail();
  };

  const onNextComment = (newPage) => {
    navigate(`/forum/post/${title}/${newPage}`, { state: { storedPostId } });
  };

  return (
    <div className="flex flex-col mb-10 md:mb-20">
      <PostDetail post={post} loading={loading} reFetching={reFetching} />
      <Pagination showIcons currentPage={currentPage} totalPages={totalCommentPages} onPageChange={onNextComment} className="flex justify-end mb-4" />
      <Comment grabPostId={storedPostId} />
    </div>
  );
}
