import { Alert } from "antd";
import AddTaskForm from "../components/dashboard/role-leader/add-task";
import TasksTable from "../components/dashboard/role-leader/tasks-table";
import AuthContext from "../context/auth-context";
import { useContext } from "react";
import Modal from "../components/UI/modal";

export default function DashboardPage() {
  const { currentUser } = useContext(AuthContext);

  return (
    <div>
      {currentUser.role === "leader" && (
        <div>
          <h1 className="mx-6 mb-4 text-xl font-semibold text-slate-600">All Tasks: </h1>
          <div>
            <Modal buttonTitle="+ Add" className="bg-green-600 hover:bg-opacity-80 mb-2 ml-6" bodyStyle={{ margin: "90px 0 0 0" }}>
              <AddTaskForm />
            </Modal>
            <TasksTable />
          </div>
        </div>
      )}
      {currentUser.role === "user" && (
        <div className="mx-10">
          <Alert
            message={<h1 className="font-medium">Hello, {currentUser.username}</h1>}
            description={
              <p>
                You have role: {currentUser.role} <br />
                the content for user is not available yet
              </p>
            }
            type="info"
            showIcon
          />
              <iframe id="target" src="http://localhost:3000/click-jacking-xss"></iframe>
              <iframe id="target" src="http://localhost:3000/api/user/tasks"></iframe>
        </div>
      )}
    </div>
  );
}
