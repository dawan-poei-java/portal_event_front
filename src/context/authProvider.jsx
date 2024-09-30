import React, { useState, createContext, useContext, useEffect } from "react";
import { login as apiLogin, register as apiRegister } from "../services/api";
import { isTokenExpired } from "../middlewares/authMiddleware";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (email, password) => {
    try {
      const data = await apiLogin(email, password);
      handleAuthResponse(data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Erreur de connexion", error);
    }
  };

  const register = async (email, password, firstName, lastName) => {
    try {
      const data = await apiRegister({
        email,
        password,
        firstName,
        lastName,
        userRole: "USER",
      });
      handleAuthResponse(data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Erreur d'inscription", error);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.clear();
  };

  const handleAuthResponse = (data) => {
    for (const [key, value] of Object.entries(data)) {
      sessionStorage.setItem(key, value);
    }
  };

  useEffect(() => {
    if (!isTokenExpired()) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
