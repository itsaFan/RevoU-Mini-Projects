/* eslint-disable react/prop-types */
import { Clock } from "lucide-react";
import { formatDateV2, timePassed } from "../../utils/date-converter";
import { convertToInitial } from "../../utils/helper-converter";
import LoadingForumContent from "../ui/loading";
import { useAuth } from "../../context/use-context";
import DeleteComment from "../comment/delete-comment";
import EditComment from "../comment/edit-comment";
import EditPost from "./edit-post/edit-post";
import DeletePost from "./delete-post/delete-post";

export default function PostDetail({ post, loading, reFetching }) {
  const { userPayload } = useAuth();
  const userId = userPayload?.userId;
  const isPostOwner = userId === post.author._id;
  // console.log(isPostOwner)
  // console.log(userId);
  // console.log(post.author.username);

  return (
    <div className="">
      {loading ? (
        <div className="border border-gray-200 bg-white py-10 px- ">
          <LoadingForumContent />
        </div>
      ) : (
        <>
          <div className=" bg-dark-navy py-3 pr-2 gap-2 pl-4 shadow mt-5 mb-1 text-white rounded-t-lg flex justify-between">
            <h1 className="text-lg font-semibold">{post.title}</h1>
            <span className="flex justify-end flex-grow items-center text-xs md:text-sm font-normal gap-1">
              <Clock size={15} />
              {formatDateV2(post.createdAt)} by {post.author.username}
            </span>
            {isPostOwner && (
              <div className="flex">
                <EditPost postId={post._id} currentContent={post.content} currentTitle={post.title} onEdit={reFetching} />
                <DeletePost postId={post._id} />
              </div>
            )}
          </div>
          <div className="flex md:flex-row md:gap-0 bg-gray-100 border-white border-solid border-2 shadow text-custom-gray">
            <div className="flex flex-col justify-start md:justify-center items-center p-1 md:p-4 border-white border-r-2">
              <div className="relative  md:text-4xl font-medium inline-flex items-center justify-center w-10 h-10 md:w-24 md:h-24 overflow-hidden bg-gray-300 rounded-full">{convertToInitial(post.author.username)}</div>
              <div>
                <p className="text-sm md:text-base break-all">{post.author.username}</p>
              </div>
            </div>
            <div className="mt-2 px-2 md:px-1 flex md:divide-y flex-col w-11/12 ">
              <p className="text-base mb-4">{post.content}</p>
            </div>
          </div>
          <div>
            {post.comments.map((comment) => {
              const isOwner = userId === comment.commenter._id;
              return (
                <div key={comment._id} className="flex md:flex-row md:gap-0 my-2 shadow bg-white border-gray-200 border-solid border-2 text-custom-gray">
                  <div className="flex flex-col justify-start md:justify-center w-16 md:w-auto items-center p-1 md:p-4 border-gray-200 border-r-2">
                    <div className="relative md:text-4xl font-medium inline-flex items-center justify-center w-10 h-10 md:w-24 md:h-24 overflow-hidden bg-gray-300 rounded-full">{convertToInitial(comment.commenter.username)}</div>
                    <div className="">
                      <p className="text-sm md:text-base break-all">{comment.commenter.username}</p>
                    </div>
                  </div>
                  <div className="mt-2 px-2 md:px-1 flex md:divide-y flex-col w-11/12">
                    <span className="mb-1 flex md:justify-end text-xs md:text-sm font-extralight">{timePassed(comment.createdAt)}</span>
                    <p className="text-sm md:text-base mb-4">{comment.text} </p>
                  </div>
                  <div className="relative ">
                    <div className="absolute  bottom-0 right-2">
                      {isOwner && (
                        <div className="flex mb-1">
                          <DeleteComment commentId={comment._id} postId={post._id} onDeleted={reFetching} />
                          <EditComment currentComment={comment.text} commentId={comment._id} postId={post._id} onEdit={reFetching} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
