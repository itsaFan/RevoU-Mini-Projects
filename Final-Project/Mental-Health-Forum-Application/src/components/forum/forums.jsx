/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import ForumItems from "./forum-items";
import { getPostsByForumId } from "../../api/forum-api";
import { useEffect, useState } from "react";
import { socket } from "../../api/socket-client";

export default function Forums({ grabForums, grabLoadingState }) {
  const [posts, setPosts] = useState({});

  const fetchPostsPerForum = async (forumId) => {
    try {
      const data = await getPostsByForumId(forumId);
      setPosts((prevPosts) => ({
        ...prevPosts,
        [forumId]: data.posts,
      }));
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    }
  };

  useEffect(() => {
    grabForums.forEach((forum) => {
      fetchPostsPerForum(forum._id);
    });

    const handleUpdatedPosts = () => {
      grabForums.forEach((forum) => {
        fetchPostsPerForum(forum._id);
      });
    };

    socket.on("postCreated", handleUpdatedPosts);

    return () => {
      socket.off("postCreated", handleUpdatedPosts);
    };
  }, [grabForums]);

  return (
    <motion.div layout className="bg-transparent">
      <ForumItems forums={grabForums} posts={posts} loading={grabLoadingState} />
    </motion.div>
  );
}
