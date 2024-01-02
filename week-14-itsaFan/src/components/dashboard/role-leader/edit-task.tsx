import { useContext } from "react";
import { useParams } from "react-router-dom";
import { message } from "antd";
import AuthContext from "../../../context/auth-context";
import { editTask2 } from "../../../api/leader-api";
import TaskEditForm from "./edit-task-form";
import CardBorder from "../../UI/card-border";
import Modal from "../../UI/modal";

interface Task {
  title: string;
  description: string;
  dueDate: string;
  priority: string;
}
interface FilledTaskProps {
  task: Task;
}

export default function EditTask({ task }: FilledTaskProps) {
  const { taskId } = useParams();
  const { token } = useContext(AuthContext);

  const initialValues = {
    title: task.title,
    description: task?.description,
    dueDate: task.dueDate,
    priority: task.priority,
  };

  const handleSubmit = async (formData: Task) => {
    try {
      if (taskId) {
        const response = await editTask2(taskId, formData, token);
        message.config({
          top: 180,
        });
        message.success("Task updated successfully!");
        setTimeout(() => {
          window.location.reload();
        }, 1250);
        console.log(response);
      }
    } catch (error) {
      console.error("Error updating task:", error);
      message.error("Failed to update task. Please try again later.");
    }
  };

  return (
    <Modal buttonTitle="Edit" className="bg-cyan-500 hover:bg-opacity-80 border-none mr-2" bodyStyle={{ margin: "20px 0 0 0" }}>
      <CardBorder title="Edit Task">
        <TaskEditForm initialValues={initialValues} onSubmit={handleSubmit} />
      </CardBorder>
    </Modal>
  );
}
