import { TaskData } from "../../../helpers/content-interface";
import { Descriptions } from "antd";
import type { DescriptionsProps } from "antd";
import EditTask from "./edit-task";
import DeleteTask from "./delete-task";


type Props = {
  task: TaskData;
};

export default function TaskDetailLogistics({ task }: Props) {
  const dueDateParts = task.dueDate.split("T");
  const formattedDueDate = dueDateParts[0];


  const items: DescriptionsProps["items"] = [
    {
      label: "Task Title",
      children: task.title,
    },
    {
      label: "Task Priority",
      children: task.priority,
    },
    {
      label: "Task Due Date",
      children: formattedDueDate,
    },
    {
      label: "Assigned To",
      children: task.assignedTo.username,
    },
    {
      label: "Task Created By",
      children: task.createdBy.username,
    },
    {
      label: "From Group",
      children: task.group.name,
    },
    {
      label: "Task Description",
      children: task.description,
    },
  ];

  return (
    <div>
      <Descriptions
        title="Task Detail: "
        bordered
        className="m-6"
        items={items}
        extra={
          <>
            <EditTask task={task}/>
            <DeleteTask />
          </>
        }
      />
    </div>
  );
}
