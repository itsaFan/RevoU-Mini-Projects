import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../../../context/auth-context";
import { getSingleTask } from "../../../api/leader-api";
import TaskDetailLogistics from "./task-content";

export default function SingleTaskView() {
  const { taskId } = useParams<{ taskId: string | undefined }>();
  const [task, setTask] = useState({
    project: "",
    title: "",
    description: "",
    dueDate: "",
    priority: "",
    status: "",
    assignedTo: { _id: "", username: "" },
    createdBy: { _id: "", username: "" },
    group: { _id: "", name: "" },
  });
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        if (taskId) {
          const response = await getSingleTask(taskId, token);
          console.log(response);
          setTask(response.task);
        }
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    };
    fetchTask();
  }, [token, taskId]);

  return (
    <>
      <TaskDetailLogistics task={task} />
    </>
  );
}
