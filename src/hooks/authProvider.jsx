import React, { useState, createContext, useContext, useEffect } from "react";
import axios from "axios";

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
      console.log("Catch Login");
      console.error(error);
      setAuthError(error.response?.data?.message || "Erreur de connexion");
      throw error;
    } finally {
      setAuthLoading(false);
    }
  };

  const register = async (form) => {
    setAuthLoading(true);
    setAuthError(null);
    try {
      const response = await axios.post(baseUrl + "/api/register", form);
      handleAuthSuccess(response.data);
    } catch (error) {
      console.log("Catch Register");
      console.error(error);
      setAuthError(error.response?.data?.message || "Erreur d'inscription");
      throw error;
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

  const checkAuth = () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      console.log("Token trouvé, utilisateur authentifié");
    } else {
      setIsAuthenticated(false);
      console.log("Aucun token trouvé, utilisateur non authentifié");
    }
  };

  useEffect(() => {
    checkAuth();
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
