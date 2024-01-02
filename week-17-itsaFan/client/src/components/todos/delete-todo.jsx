/* eslint-disable react/prop-types */
import { message } from "antd";
import { HiTrash } from "react-icons/hi";
import { useAuth } from "../../context/auth-context";
import { deleteTodo } from "../../api/todo-api";

export default function DeleteTodo({ todoId }) {
  const { accessToken } = useAuth();

  const handleDeleteTodo = async () => {
    try {
      await deleteTodo(todoId, accessToken);
      message.config({
        top: 100,
      });
      message.success("Todo Delete Success!");
      setTimeout(() => {
        window.location.reload();
      }, 1250);
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };

  return (
    <button type="submit" onClick={handleDeleteTodo}>
      <HiTrash size={25} />
    </button>
  );
}
