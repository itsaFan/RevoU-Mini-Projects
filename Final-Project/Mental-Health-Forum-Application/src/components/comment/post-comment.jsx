/* eslint-disable react/prop-types */
import { Button, Spinner } from "flowbite-react";
import { BoldIcon, FileImgIcon, ItalicIcon, LinkIcon, ListIcon, StrikethroughtIcon, UnderlineIcon } from "../ui/comment-icons";
import { useRef, useState } from "react";
import { commentToPost } from "../../api/post-api";
import { useAuth } from "../../context/use-context";
import { message } from "antd";

export default function Comment({ grabPostId }) {
  // const [text, setText] = useState("");
  const textRef = useRef(null);
  const { accessToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCommentToPost = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const text = textRef.current.value;

    try {
      await commentToPost(grabPostId, text, accessToken);
      message.config({
        top: 180,
      });
      message.success("Comment Added Successfully");
      textRef.current.value = "";
    } catch (error) {
      console.error("Failed to create comment: ", error);
      setError("You Must Logged-In First");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex md:flex-row md:gap-0 bg-white border-gray-200 border-solid border-2 shadow p-4 mb-5">
      <div className="rounded-lg border text-card-foreground shadow-sm w-full">
        <div className="flex flex-col space-y-1.5 px-4 py-2">
          <h2 className="text-lg font-bold">Create a Reply</h2>
        </div>
        <div className="px-4 py-2">
          <div className="space-y-2">
            <div className="flex flex-wrap space-x-1 ">
              <BoldIcon />
              <ItalicIcon />
              <UnderlineIcon />
              <StrikethroughtIcon />
              <ListIcon />
              <LinkIcon />
              <FileImgIcon />
            </div>
            <form onSubmit={handleCommentToPost}>
              <textarea
                id="reply-post"
                className="flex min-h-[150px] rounded-md border px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2  focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full h-40"
                placeholder="Type your reply here..."
                ref={textRef}
                required
              ></textarea>
              {error && <span className="text-red-500 text-sm font-semibold italic">{error}</span>}
              <Button size="xs" className="bg-dark-navy dark:bg-dark-navy mt-2 " type="submit">
                {loading ? <Spinner className="mr-2" size="sm" /> : <span>Post Reply</span>}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
