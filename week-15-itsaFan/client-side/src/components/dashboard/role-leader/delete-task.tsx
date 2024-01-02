import { Button } from "antd";
import AuthContext from "../../../context/auth-context";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteTask } from "../../../api/leader-api";
import { message } from "antd";

export default function DeleteTask() {
  const { token } = useContext(AuthContext);
  const { taskId } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      if (taskId) {
        await deleteTask(taskId, token);
        message.config({
          top: 100,
        });
        message.success("Task Delete Success!");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error in deleting task:", error);
    }
  };

  return (
    <Button onClick={handleDelete} className="bg-red-500 hover:bg-opacity-80 border-none">
      <p className="text-white">Delete</p>
    </Button>
  );
}
