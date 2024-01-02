/* eslint-disable react/prop-types */
import { Trash2 } from "lucide-react";
import { useAuth } from "../../context/use-context";
import { deleteCommentApi } from "../../api/post-api";
import { message } from "antd";
import { useState } from "react";
import { Spinner } from "flowbite-react";

export default function DeleteComment({ postId, commentId, onDeleted }) {
  const { accessToken } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteCommentApi(postId, commentId, accessToken);
      message.config({
        top: 120,
      });
      message.success("Comment Delete Success!");

      if (onDeleted) {
        onDeleted();
      }
    } catch (error) {
      console.error("Failed to delete comment:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button type="submit" onClick={handleDelete} className="hover:text-red-700">
      {loading ? <Spinner size="sm" /> : <Trash2 size={18} />}
    </button>
  );
}
