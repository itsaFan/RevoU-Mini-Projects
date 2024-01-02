/* eslint-disable react/prop-types */
import { Spinner } from "flowbite-react";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../../context/use-context";
import { deletePostApi } from "../../../api/post-api";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

export default function DeletePost({ postId }) {
  const { accessToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      setLoading(true);
      try {
        await deletePostApi(postId, accessToken);
        message.config({
          top: 120,
        });
        message.success("Post Delete Success!");
        navigate('/');
       
      } catch (error) {
        console.error("Failed to delete comment:", error);
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <button type="submit" className="hover:text-red-700" onClick={handleDelete}>
      {loading ? <Spinner size="sm" /> : <Trash2 size={18} />}
    </button>
  );
}
