import axios from "axios";
import { BASE_URL } from "./constant";
import { EditTask } from "../helpers/content-interface";

export const getTasks = async (token: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/leader/tasks`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error when trying to get tasks", error);
    throw error;
  }
};

export const getProjects = async (token: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/leader/projects`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error when trying to get projects", error);
    throw error;
  }
};

type FormData = {
  project: string;
  title: string;
  description: string;
  dueDate: string;
  priority: string;
  assignedTo: string;
};

export const createTask = async (token: string, formData: FormData) => {
  try {
    const response = await axios.post(`${BASE_URL}/leader/tasks/add`, formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Task created successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

export const getSingleTask = async (taskId: string, token: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/leader/task/${taskId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Fail to get single task", error);
    throw error;
  }
};

export const editTask = async (taskId: string, token: string, updatedData: EditTask) => {
  try {
    const response = await axios.put(`${BASE_URL}/leader/tasks/edit/${taskId}`, updatedData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Fail to update task", error);
    throw error;
  }
};

export const editTask2 = async (taskId: string, newTaskData: EditTask, token: string) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/leader/tasks/edit/${taskId}`,
      {
        title: newTaskData.title,
        description: newTaskData.description,
        dueDate: newTaskData.dueDate,
        priority: newTaskData.priority,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Fail to update task", error);
    throw error;
  }
};

export const deleteTask = async (taskId: string, token: string) => {
  try {
    const response = await axios.delete(`${BASE_URL}/leader/tasks/delete/${taskId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Fail to delete task", error);
    throw error;
  }
};
