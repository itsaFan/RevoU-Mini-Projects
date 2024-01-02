import axios from "axios";

// baseURL: "https://final-project-image-wo3wakb2jq-wl.a.run.app/api",
// baseURL: "http://localhost:8080/api",
// baseURL: "http://35.222.50.193:8080/api",


export const api = axios.create({
  baseURL: "https://personal-d9ef9.el.r.appspot.com/api",
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry && originalRequest.url !== "/refreshToken") {
      originalRequest._retry = true;

      const response = await api.post("/refreshToken", {}, { withCredentials: true });
      const newToken = response.data.accessToken;

      localStorage.setItem("accessToken", newToken);
      originalRequest.headers["Authorization"] = "Bearer " + newToken;
      window.location.reload();

      return axios(originalRequest);
    }
    return Promise.reject(error);
  }
);
