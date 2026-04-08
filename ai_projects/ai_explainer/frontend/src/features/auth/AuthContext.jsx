/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { apiClient } from "../../services/apiClient";

const AuthContext = createContext(null);
const TOKEN_KEY = "ai_explorer_token";

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem(TOKEN_KEY));
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(false);

  const authHeaders = useMemo(
    () => (token ? { Authorization: `Bearer ${token}` } : {}),
    [token],
  );

  const refreshUser = async () => {
    if (!token) {
      setUser(null);
      return;
    }
    setLoadingUser(true);
    try {
      const data = await apiClient.request("/api/auth/me", { headers: authHeaders });
      setUser(data);
    } catch {
      localStorage.removeItem(TOKEN_KEY);
      setToken(null);
      setUser(null);
    } finally {
      setLoadingUser(false);
    }
  };

  useEffect(() => {
    refreshUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const signup = async (payload) => {
    const data = await apiClient.request("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    localStorage.setItem(TOKEN_KEY, data.access_token);
    setToken(data.access_token);
  };

  const login = async (payload) => {
    const data = await apiClient.request("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    localStorage.setItem(TOKEN_KEY, data.access_token);
    setToken(data.access_token);
  };

  const forgotPassword = async (payload) =>
    apiClient.request("/api/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify(payload),
    });

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({ token, user, loadingUser, signup, login, forgotPassword, logout, authHeaders }),
    [token, user, loadingUser, authHeaders],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}
