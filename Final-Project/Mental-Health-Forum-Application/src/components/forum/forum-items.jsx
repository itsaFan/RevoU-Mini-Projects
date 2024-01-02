/* eslint-disable react/prop-types */
import { Folder, MessagesSquare } from "lucide-react";
import ForumCard from "../ui/forum-card";
import { motion } from "framer-motion";
import { formatDateV2 } from "../../utils/date-converter";
import LoadingForumContent from "../ui/loading";
// import { Avatar } from "flowbite-react";
import { convertToInitial, createSlug, randomBgColor } from "../../utils/helper-converter";
import { springVariants } from "../../utils/animate-variants";
import { useNavigate } from "react-router-dom";

export default function ForumItems({ forums, loading, posts }) {
  const navigate = useNavigate();

  const forumGroupingByCategory = (forums) => {
    return forums.reduce((acc, forum) => {
      const category = forum.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(forum);
      return acc;
    }, {});
  };

  const groupedForums = forumGroupingByCategory(forums);

  return (
    <div>
      {Object.entries(groupedForums).map(([category, forumsInCategory], index) => (
        <ForumCard title={category} id={category} key={index} icon={<Folder />}>
          <motion.div variants={springVariants} initial="initial" animate="animate" exit="exit" layout className="text-custom-gray divide-y divide-gray-200 dark:divide-gray-300 ">
            {forumsInCategory.map((forum) => {
              const randomBgAvatar = randomBgColor();
              const titleSlug = createSlug(forum.title);
              const postCount = posts[forum._id] ? posts[forum._id].length : 0;
              const forumPosts = posts[forum._id] || [];
              const latestPost = forumPosts.reduce((latest, current) => (new Date(latest.createdAt) > new Date(current.createdAt) ? latest : current), forumPosts[0]);
              return (
                <motion.div key={forum._id} className="grid md:grid-cols-3 p-4 gap-0 md:gap-2 font-semibold transition duration-300 ease-in-out hover:bg-slate-100 ">
                  {loading ? (
                    <div className="-ml-28">
                      <LoadingForumContent />
                    </div>
                  ) : (
                    <>
                      <div className="flex gap-2 h-10 items-center">
                        <MessagesSquare />
                        <p className="hover:font-bold hover:opacity-90 capitalize " title={forum.description} onClick={() => navigate(`/forum/${titleSlug}/${forum._id}/1`)}>
                          {forum.title}
                        </p>
                      </div>
                      <div className="flex gap-1 md:justify-center items-center h-10 underline md:no-underline underline-offset-4">
                        <p className="font-semibold">
                          Posts: <span className="font-normal">{postCount}</span>
                        </p>
                      </div>
                      <motion.div className="h-10 items-center">
                        {latestPost ? (
                          <div className="flex flex-row md:flex-row gap-2 md:gap-1 ">
                            <div className="">
                              <div className={`relative inline-flex items-center justify-center w-10 h-10 overflow-hidden rounded-full ${randomBgAvatar}`} title={latestPost.author.username}>
                                {convertToInitial(latestPost.author.username)}
                              </div>
                              {/* <Avatar rounded placeholderInitials={convertToInitial(latestPost.author.username)} title={latestPost.author.username} className="bg-black" /> */}
                            </div>
                            <div className="flex flex-col">
                              <p className="line-clamp-1 text-sm hover:font-bold hover:opacity-90" title={latestPost.title}>
                                {latestPost.title}
                              </p>
                              <span className="font-light text-xs">{formatDateV2(latestPost.createdAt)}</span>
                            </div>
                          </div>
                        ) : (
                          <p className="text-red-500 md:text-end mt-1">No Post</p>
                        )}
                      </motion.div>
                    </>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </ForumCard>
      ))}
    </div>
  );
}
