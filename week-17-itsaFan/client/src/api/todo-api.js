import { api } from "./api-config";

export const getTodosByCreator = async (token) => {
  try {
    const response = await api.get("/todo/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteTodo = async (todoId, token) => {
  try {
    const response = await api.delete(`/todo/delete/${todoId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createTodo = async (title, description, token) => {
  try {
    const response = await api.post(
      "/todo/add",
      {
        title,
        description,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const editTodo = async (todoId, title, description, token) => {
  try {
    const response = await api.put(
      `/todo/edit/${todoId}`,
      {
        title,
        description,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAllTodos = async (token) => {
  try {
    const response = await api.get("/todo/all", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
