import React, { useState, createContext, useContext, useEffect } from "react";
import axios from "axios";
import { isTokenExpired } from "../middlewares/authMiddleware";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState(null);
  const baseUrl = "http://localhost:8080";

  const login = async (email, password) => {
    setAuthLoading(true);
    setAuthError(null);
    try {
      const response = await axios.post(baseUrl + "/api/login", {
        email,
        password,
      });
      handleAuthSuccess(response.data);
    } catch (error) {
      console.error(error);
      setAuthError(error.response?.data?.message || "Erreur de connexion");
    } finally {
      setAuthLoading(false);
    }
  };

  const register = async (form) => {
    setAuthLoading(true);
    setAuthError(null);
    try {
      const response = await axios.post(baseUrl + "/api/register", {
        ...form,
        userRole: "USER",
      });
      handleAuthSuccess(response.data);
    } catch (error) {
      setAuthError(error.response?.data?.message || "Erreur d'inscription");
    } finally {
      setAuthLoading(false);
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
      value={{
        isAuthenticated,
        login,
        logout,
        register,
        authLoading,
        authError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
