import * as Yup from "yup";

export const registerSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  email: Yup.string().required("Email is required").email("Invalid email format"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/^(?=.*[A-Za-z])(?=.*\d)/, "Password must be alphanumeric")
    .required("Password is required"),
});

export const loginSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/^(?=.*[A-Za-z])(?=.*\d)/, "Password must be alphanumeric")
    .required("Password is required"),
});

export const createTaskSchema = Yup.object({
  project: Yup.string().required("Project is required"),
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  dueDate: Yup.date().required("Due Date is required"),
  priority: Yup.string().required("Priority is required"),
  assignedTo: Yup.string().required("Assigned To is required"),
});

export const taskValidationSchema = Yup.object().shape({
  project: Yup.string().required("Project is required"),
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  dueDate: Yup.date().required("Due Date is required"),
  priority: Yup.string().required("Priority is required"),
  assignedTo: Yup.string().required("Assigned To is required"),
});
