import AuthContext from "../../../context/auth-context";
import { useContext, useEffect, useState } from "react";
import { getTasks } from "../../../api/leader-api";
import { Table, Tag, Button, TableProps, ConfigProvider } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import type { FilterValue } from "antd/es/table/interface";
import { Task } from "../../../helpers/content-interface";

// interface Task {
//   _id: string;
//   title: string;
//   description: string;
//   priority: string;
//   dueDate: string;
//   status: string;
//   assignedTo: {
//     username: string;
//   };
//   project: {
//     projectName: string;
//   };
// }

export default function TasksTable() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { token } = useContext(AuthContext);
  const [filteredInfo, setFilteredInfo] = useState<Record<string, FilterValue | null>>({});
  const clearFilters = () => {
    setFilteredInfo({});
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTasks(token);
        // console.log(response)
        setTasks(response.tasks.reverse());
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchData();
  }, [token]);

  const columns: ColumnsType<Task> = [
    {
      title: "Title",
      dataIndex: "title",
      className: "capitalize",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      className: "capitalize",
      key: "description",
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      filters: [
        {
          text: "Low",
          value: "low",
        },
        {
          text: "Medium",
          value: "medium",
        },
        {
          text: "High",
          value: "high",
        },
      ],
      filteredValue: filteredInfo.priority || null,
      onFilter: (value: string | number | boolean, record: Task) => {
        const stringValue = String(value);
        return record.priority.includes(stringValue);
      },
      render: (priority: string) => {
        let color = "white";

        if (priority === "low") {
          color = "green";
        } else if (priority === "medium") {
          color = "blue";
        } else if (priority === "high") {
          color = "red";
        }

        return (
          <Tag color={color} className="w-16 text-center capitalize">
            {priority}
          </Tag>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        {
          text: "Pending",
          value: "pending",
        },
        {
          text: "In-Progress",
          value: "in-progress",
        },
        {
          text: "Completed",
          value: "completed",
        },
      ],
      filteredValue: filteredInfo.status || null,
      onFilter: (value: string | number | boolean, record: Task) => {
        const stringValue = String(value);
        return record.status.includes(stringValue);
      },
      render: (status: string) => {
        let color = "white";
        if (status === "completed") {
          color = "green";
        } else if (status === "in-progress") {
          color = "blue";
        } else if (status === "pending") {
          color = "red";
        }

        return (
          <Tag color={color} className="w-24 text-center uppercase">
            {status}
          </Tag>
        );
      },
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
      key: "dueDate",
      render: (dueDate) => {
        const date = new Date(dueDate);
        const formattedDate = date.toISOString().split("T")[0];
        return formattedDate;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (task) => (
        <Button className="bg-violet-400 hover:bg-opacity-80 border-none ">
          <Link to={`/dashboard/task-detail/${task._id}`}>
            <p className="text-white">View Details</p>
          </Link>
        </Button>
      ),
    },
  ];

  const handleChange: TableProps<Task>["onChange"] = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
  };

  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Button: {
              primaryColor: "#fff",
            },
          },
        }}
      >
        <Button onClick={clearFilters} className="text-white bg-amber-500 border-none hover:opacity-80 ml-2">
          <p className="text-white">Clear Filter</p>
        </Button>

        <Table
          columns={columns}
          bordered
          onChange={handleChange}
          className="mx-6"
          dataSource={tasks}
          rowKey={(task) => task._id}
          expandable={{
            expandedRowRender: (task) => (
              <>
                <p className="m-0">This task is assigned to: {task.assignedTo.username}</p>
                <p className="capitalize">For Project: {task.project.projectName}</p>
              </>
            ),
            rowExpandable: (task) => task._id !== "",
          }}
        />
      </ConfigProvider>
    </>
  );
}
