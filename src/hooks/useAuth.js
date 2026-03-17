import { useState, useEffect } from "react";
import { login as apiLogin, register as apiRegister } from "../api/loginService";

export const useAuth = () => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const login = async (username, password) => {
    setLoading(true);
    setError("");

    const result = await apiLogin(username, password);

    if (!result.success) {
      setError(result.error);
      setLoading(false);
      return false;
    }

    const storedUser = {
      id: result.data.user.id,
      username: result.data.user.username,
      token: result.data.token
    };

    localStorage.setItem("user", JSON.stringify(storedUser));
    setUser(storedUser);

    setLoading(false);
    return true;
  };

  const register = async (username, password) => {
    setLoading(true);
    setError("");

    const result = await apiRegister(username, password);

    if (!result.success) {
      setError(result.error);
      setLoading(false);
      return false;
    }

    setLoading(false);
    return true;
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return {
    user,
    loading,
    error,
    login,
    register,
    logout
  };
};
