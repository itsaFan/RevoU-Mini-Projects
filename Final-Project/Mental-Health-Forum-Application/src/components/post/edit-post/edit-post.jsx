/* eslint-disable react/prop-types */
import { FileEdit } from "lucide-react";
import { useRef, useState } from "react";
import { useAuth } from "../../../context/use-context";
import { Modal } from "flowbite-react";
import { editPostApi } from "../../../api/post-api";
import { message } from "antd";
import EditPostForm from "../../forms/edit-post-form";

export default function EditPost({ currentTitle, currentContent, postId, onEdit }) {
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { accessToken } = useAuth();
  const titleRef = useRef(null);
  const contentRef = useRef(null);

  const onCloseModal = () => {
    setOpenModal(false);
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const title = titleRef.current.value;
    const content = contentRef.current.value;
    try {
      await editPostApi(postId, title, content, accessToken);
      message.config({
        top: 120,
      });
      message.success("Edit Comment Success!");
      if (onEdit) {
        onEdit();
      }
    } catch (error) {
      console.error("Failed to edit comment:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button data-modal-target="editPost-modal" data-modal-toggle="editPost-modal" type="button" onClick={() => setOpenModal(true)} className="hover:text-cyan-800">
        <FileEdit size={18} />
      </button>
      <Modal show={openModal} size="md" onClose={onCloseModal} position="top-center" className="pt-20" popup>
        <Modal.Header />
        <Modal.Body>
          <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">Edit Your Post</h3>
          <EditPostForm onSubmit={handleEdit} titleRef={titleRef} contentRef={contentRef} loading={loading} defaultTitle={currentTitle} defaultContent={currentContent} />
        </Modal.Body>
      </Modal>
    </>
  );
}
