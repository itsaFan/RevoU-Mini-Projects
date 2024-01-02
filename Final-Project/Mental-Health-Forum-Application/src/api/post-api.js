import { api } from "./api-config";

export const getMostRecentPosts = async () => {
  try {
    const response = await api.get("/post/recent");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createPost = async (forumId, title, content, token) => {
  try {
    const response = await api.post(
      "/post/add",
      {
        forumId,
        title,
        content,
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

export const getPost = async (postId, page) => {
  try {
    const response = await api.get(`/post/${postId}`, {
      withCredentials: true,
      params: {
        commentPage: page,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const commentToPost = async (postId, text, token) => {
  try {
    const response = await api.post(
      `/comment/${postId}`,
      {
        text,
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

export const editPostApi = async (postId, title, content, token) => {
  try {
    const response = await api.patch(
      `/post/edit/${postId}`,
      {
        title,
        content,
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

export const deletePostApi = async (postId, token) => {
  try {
    const response = await api.delete(`/post/delete/${postId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteCommentApi = async (postId, commentId, token) => {
  try {
    const response = await api.delete(`/comment/${postId}`, {
      data: { commentId: commentId },
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const editCommentApi = async (postId, commentId, text, token) => {
  try {
    const response = await api.patch(
      `/comment/${postId}`,
      {
        commentId,
        text,
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
