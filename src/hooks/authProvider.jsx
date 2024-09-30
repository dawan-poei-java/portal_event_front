import React, { useState, createContext, useContext, useEffect } from "react";
import { useApi } from "./useApi";
import { isTokenExpired } from "../middlewares/authMiddleware";

const AuthContext = createContext();

export const authProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { request, loading, error } = useApi();

  const login = async (email, password) => {
    try {
      const data = await request("post", "/login", { email, password });
      handleAuthSuccess(data);
    } catch (error) {
      console.error("Erreur de connexion", error);
    }
  };

  const register = async (email, password, firstName, lastName) => {
    try {
      const data = await request("post", "/register", {
        email,
        password,
        firstName,
        lastName,
        userRole: "USER",
      });
      handleAuthSuccess(data);
    } catch (error) {
      console.error("Erreur d'inscription", error);
    }
  };

  const handleAuthSuccess = (data) => {
    for (const [key, value] of Object.entries(data)) {
      sessionStorage.setItem(key, value);
    }
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.clear();
  };

  useEffect(() => {
    if (!isTokenExpired()) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, register, loading, error }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
