import { createTask, getProjects, getTasks } from "../../../api/leader-api";
import AuthContext from "../../../context/auth-context";
import { useContext, useEffect, useState, ChangeEvent, FormEvent } from "react";
// import Modal from "../../UI/modal";
import CardBorder from "../../UI/card-border";
import { Button, message } from "antd";
import SuccessModal from "../../UI/success-modal";
import { Project } from "../../../helpers/form-interface";
import { useNavigate } from "react-router-dom";
import { Task } from "../../../helpers/content-interface";

type Test = {
  onSubmit?: () => void;
};

export default function AddTaskForm({ onSubmit }: Test) {
  const { token } = useContext(AuthContext);
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string>("");
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [formData, setFormData] = useState({
    project: "",
    title: "",
    description: "",
    dueDate: "",
    priority: "",
    assignedTo: "",
  });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getProjects(token);
        // console.log(response);
        setProjects(response.projects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, [token]);

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

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === "project") {
      setSelectedProjectId(value);
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const lowercaseTitleFormData = formData.title.toLowerCase();

    if (tasks.some((task) => task.title.toLowerCase() === lowercaseTitleFormData)) {
      message.config({
        top: 300,
      });
      message.error("Task with that title already exist");
      // alert('Task with the same title already exists. Please choose a different title.');
      return;
    }
    try {
      await createTask(token, formData);
      console.log("Task created successfully");
      setFormData({
        project: "",
        title: "",
        description: "",
        dueDate: "",
        priority: "",
        assignedTo: "",
      });
      setIsSuccessModalOpen(true);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const handleCloseSuccessModal = () => {
    setIsSuccessModalOpen(false);
    navigate("/dashboard");
    window.location.reload();
  };

  return (
    // <Modal buttonTitle="+ Add" className="bg-green-600 hover:bg-opacity-80 mb-2 ml-6" bodyStyle={{ margin: "90px 0 0 0" }}>
    <CardBorder title="Add Task">
      <form
        onSubmit={(e) => {
          handleFormSubmit(e);
          if (onSubmit) {
            onSubmit();
          }
        }}
      >
        <div className="">
          <label className="font-semibold">Project:</label>
          <div>
            <select aria-label="project" name="project" value={formData.project} onChange={handleInputChange} className="w-full h-10 border border-gray-800 px-3 rounded-lg" required>
              <option value="">Select a project</option>
              {projects.map((project) => (
                <option key={project._id} value={project._id}>
                  {project.projectName}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label className="font-semibold">Title:</label>
          <div>
            <input type="text" name="title" aria-label="title" value={formData.title} onChange={handleInputChange} className="w-full h-10 border border-gray-800 px-3 rounded-lg" required />
          </div>
        </div>
        <div>
          <label className="font-semibold">Description:</label>
          <div>
            <input type="text" name="description" aria-label="description" value={formData.description} onChange={handleInputChange} className="w-full h-10 border border-gray-800 px-3 rounded-lg" required />
          </div>
        </div>
        <div>
          <label className="font-semibold">Due Date:</label>
          <div>
            <input aria-label="dueDate" type="date" name="dueDate" value={formData.dueDate} onChange={handleInputChange} className="w-full h-10 border border-gray-800 px-3 rounded-lg" required />
          </div>
        </div>
        <div>
          <label className="font-semibold">Priority:</label>
          <div>
            <select aria-label="priority" name="priority" value={formData.priority} onChange={handleInputChange} className="w-full h-10 border border-gray-800 px-3 rounded-lg" required>
              <option>Select priority</option>
              <option>low</option>
              <option>medium</option>
              <option>high</option>
            </select>
          </div>
        </div>
        <div>
          <label className="font-semibold">Assigned To:</label>
          <div>
            <select aria-label="assignedTo" name="assignedTo" value={formData.assignedTo} onChange={handleInputChange} className="w-full h-10 border border-gray-800 px-3 rounded-lg" required>
              <option>Select a member</option>
              {selectedProjectId &&
                projects
                  .find((project) => project._id === selectedProjectId)
                  ?.assignedGroup.members.map((member) => (
                    <option key={member._id} value={member._id}>
                      {member.username}
                    </option>
                  ))}
            </select>
          </div>
        </div>
        <div>
          <Button type="primary" htmlType="submit" className="w-full h-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-5">
            Create Task
          </Button>

          <SuccessModal isOpen={isSuccessModalOpen} onClose={handleCloseSuccessModal} title="Success!" textBody="Your Task Has Been Created Successfuly" />
        </div>
      </form>
    </CardBorder>
    // </Modal>
  );
}
