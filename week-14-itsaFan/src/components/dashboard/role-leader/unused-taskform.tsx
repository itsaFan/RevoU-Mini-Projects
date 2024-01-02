import { Field, Formik, Form as FormikForm } from "formik";
import { createTaskSchema } from "../../../helpers/validation-schema";
import { ChangeEvent } from "react";

interface TaskFormProps {
  initialValues: {
    project: string;
    title: string;
    description: string;
    dueDate: string;
    priority: string;
    assignedTo: string;
  };
  projects: Project[];
  selectedProjectId: string;
  addTaskHandler: (data: { project: string; title: string; description: string; dueDate: string; priority: string; assignedTo: string }) => void;
  inputChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void; // Update this line
}

interface Project {
  _id: string;
  projectName: string;
  assignedGroup: {
    _id: string;
    members: Member[];
  };
}

interface Member {
  _id: string;
  username: string;
}

export default function TaskForm({ initialValues, projects, selectedProjectId, addTaskHandler, inputChange }: TaskFormProps) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={createTaskSchema}
      onSubmit={(data) => {
        addTaskHandler(data);
      }}
    >
      {() => (
        <FormikForm>
          <div>
            <label htmlFor="project">Project:</label>
            <Field as="select" name="project" value={initialValues.project} onChange={inputChange}>
              <option value="">Select a project</option>
              {projects && projects.length > 0 ? (
                projects.map((project) => (
                  <option key={project._id} value={project._id}>
                    {project.projectName}
                  </option>
                ))
              ) : (
                <option value="" disabled>
                  No projects available
                </option>
              )}
            </Field>
          </div>
          <div>
            <label htmlFor="title">Title:</label>
            <Field type="text" name="title" value={initialValues.title} onChange={inputChange} />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <Field type="text" name="description" value={initialValues.description} onChange={inputChange} />
          </div>
          <div>
            <label htmlFor="dueDate">Due Date:</label>
            <Field type="date" name="dueDate" value={initialValues.dueDate} onChange={inputChange} />
          </div>
          <div>
            <label htmlFor="priority">Priority:</label>
            <Field type="text" name="priority" value={initialValues.priority} onChange={inputChange} />
          </div>
          <div>
            <label htmlFor="assignedTo">Assigned To:</label>
            <Field as="select" name="assignedTo" value={initialValues.assignedTo} onChange={inputChange}>
              <option value="">Select a member</option>
              {selectedProjectId &&
                projects
                  .find((project) => project._id === selectedProjectId)
                  ?.assignedGroup.members.map((member) => (
                    <option key={member._id} value={member._id}>
                      {member.username}
                    </option>
                  ))}
            </Field>
          </div>

          <div>
            <button type="submit">Create Task</button>
          </div>
        </FormikForm>
      )}
    </Formik>
  );
}

//   addTaskHandler: (values: { project: string; title: string; description: string; dueDate: string; priority: string; assignedTo: string }) => void;
