import api from "./api";

export const login = async (username, password) => {
  try {
    const response = await api.post("/auth/login", { username, password });
    return { success: true, data: response.data, error: null };
  } catch (err) {
    return { success: false, data: null, error: err.response?.data?.message || "Server error" };
  }
};

export const register = async (username, password) => {
  try {
    const response = await api.post("/auth/register", { username, password });
    return { success: true, data: response.data, error: null };
  } catch (err) {
    return { success: false, data: null, error: err.response?.data?.message || "Server error" };
  }
};
