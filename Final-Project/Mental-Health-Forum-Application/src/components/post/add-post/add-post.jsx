import { useCallback, useEffect, useRef, useState } from "react";
import { Modal } from "flowbite-react";
import { PenSquare } from "lucide-react";
import CreatePostForm from "../../forms/add-post-form";
import { getAllForums } from "../../../api/forum-api";
import { useAuth } from "../../../context/use-context";
import { createPost } from "../../../api/post-api";
import { message } from "antd";

export default function AddPost() {
  const [openModal, setOpenModal] = useState(false);
  const [forums, setForums] = useState([]);
  const { accessToken } = useAuth();
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const [selectedForum, setSelectedForum] = useState("");
  const { isLoggedIn } = useAuth();

  const onCloseModal = () => {
    setOpenModal(false);
  };
  const handleForumSelect = (forumId) => {
    setSelectedForum(forumId);
  };

  const fetchForums = useCallback(async () => {
    try {
      const data = await getAllForums();
      setForums(data.forums);
    } catch (error) {
      console.error("Failed to fetch forums:", error);
    }
  }, []);

  const handleAddPost = async (e) => {
    e.preventDefault();

    const title = titleRef.current.value;
    const content = contentRef.current.value;

    try {
      await createPost(selectedForum, title, content, accessToken);
      setOpenModal(false);
      message.config({
        top: 180,
      });
      message.success("New Post Added Successfully");

      titleRef.current.value = "";
      contentRef.current.value = "";
      setSelectedForum("");
    } catch (error) {
      console.error("Failed to create post: ", error);
    }
  };

  useEffect(() => {
    fetchForums();
  }, [fetchForums]);
  //   console.log(forums);
  return (
    <>
      {isLoggedIn ? (
        <>
          <button
            data-modal-target="post-modal"
            data-modal-toggle="post-modal"
            className="flex items-center gap-1 text-white bg-secondary-navy hover:bg-dark-navy focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center"
            type="button"
            onClick={() => setOpenModal(true)}
          >
            <PenSquare size={20} />
            New Post
          </button>
          <Modal show={openModal} size="md" onClose={onCloseModal} position="top-center" className="pt-10" popup>
            <Modal.Header />
            <Modal.Body>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-6">Create a New Post</h3>
              <CreatePostForm forums={forums} titleRef={titleRef} contentRef={contentRef} onSubmit={handleAddPost} onForumSelect={handleForumSelect} />
            </Modal.Body>
          </Modal>
        </>
      ) : (
        <div className="mt-4 h-auto w-full bg-neutral-50 shadow-xl flex flex-row justify-evenly ">
          <div className="w-full flex px-4 py-3 text-gray-200 rounded-lg  bg-secondary-navy">
            <span className="font-semibold text-sm italic underline underline-offset-2">You Must logged-in to Create a Post</span>
          </div>
        </div>
      )}
    </>
  );
}
