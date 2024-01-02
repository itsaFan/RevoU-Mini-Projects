export interface TaskData {
  project: string;
  title: string;
  description: string;
  dueDate: string;
  priority: string;
  status: string;
  assignedTo: {
    _id: string;
    username: string;
  };
  createdBy: {
    _id: string;
    username: string;
  };
  group: {
    _id: string;
    name: string;
  };
}

export interface EditTask {
  title: string;
  description: string;
  dueDate: string;
  priority: string;
}
export type EditTaskProps = {
  initialValues: {
    title: string;
    description: string;
    dueDate: string;
    priority: string;
  };
  onSubmit: (data: { title: string; description: string; dueDate: string; priority: string }) => void;
};

export interface Task {
  _id: string;
  title: string;
  description: string;
  priority: string;
  dueDate: string;
  status: string;
  assignedTo: {
    username: string;
  };
  project: {
    projectName: string;
  };
}
