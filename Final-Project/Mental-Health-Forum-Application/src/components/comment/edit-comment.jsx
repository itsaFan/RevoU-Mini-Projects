/* eslint-disable react/prop-types */
import { FileEdit } from "lucide-react";
import { Modal } from "flowbite-react";
import { useRef, useState } from "react";
import EditCommentForm from "../forms/edit-comment-form";
import { useAuth } from "../../context/use-context";
import { editCommentApi } from "../../api/post-api";
import { message } from "antd";

export default function EditComment({ currentComment, postId, commentId, onEdit }) {
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { accessToken } = useAuth();
  const textRef = useRef(null);

  const onCloseModal = () => {
    setOpenModal(false);
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const text = textRef.current.value;
      await editCommentApi(postId, commentId, text, accessToken);
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
      <button data-modal-target="editComment-modal" data-modal-toggle="editComment-modal" type="button" onClick={() => setOpenModal(true)} className="hover:text-cyan-800">
        <FileEdit size={18} />
      </button>
      <Modal show={openModal} size="md" onClose={onCloseModal} position="top-center" className="pt-20" popup>
        <Modal.Header />
        <Modal.Body>
          <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">Edit Your Comment</h3>
          <EditCommentForm defaultText={currentComment} onSubmit={handleEdit} textRef={textRef} loading={loading} />
        </Modal.Body>
      </Modal>
    </>
  );
}
