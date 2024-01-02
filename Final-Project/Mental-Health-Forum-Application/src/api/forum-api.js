import { api } from "./api-config";

export const getAllForums = async () => {
  try {
    const response = await api.get("/forum/all", { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getPostsByForumId = async (forumId) => {
  try {
    const response = await api.get(`/forum/${forumId}`, {
      withCredentials: true,
    });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getForumStats = async () => {
  try {
    const response = await api.get("/forum/stats", { withCredentials: true });
    // console.log(response)
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getPaginatedPostsOnSpecificForum = async (forumId, page) => {
  try {
    const response = await api.get(`/forum/${forumId}/posts`, {
      withCredentials: true,
      params: {
        page: page,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const searchApi = async (q, page) => {
  
  try {
    const response = await api.get("/forum/search", {
      withCredentials: true,
      params: {
        q: q,
        page: page,
      },
    });
    return response.data;

  } catch (error) {
    console.error(error);
    throw error;
  }
};
