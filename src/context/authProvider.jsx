import React, { useState, createContext, useContext, useEffect } from "react";
import axios from "axios";
import { isTokenExpired } from "../middlewares/authMiddleware";

const AuthContext = createContext();

export const authProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (email, password) => {
    authRequest("login", {
      email: email,
      password: password,
    });
    setIsAuthenticated(true);
  };

  const register = (email, password, firstName, lastName) => {
    authRequest("register", {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      userRole: "USER",
    });
    setIsAuthenticated(true);
  };
  const logout = () => {
    setIsAuthenticated(false);
    localStorage.clear();
  };

  const authRequest = async (url, data) => {
    try {
      axios.post("http://localhost:8080/api/" + url, data).then((res) => {
        console.log(res.data);
        for (const [key, value] of Object.entries(res.data)) {
          localStorage.setItem(key, value);
          console.log(key, value);
        }
        //let token = localStorage.getItem("token");
        //Check if it works
        //axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      });
    } catch (error) {
      console.error("Error during request", error.response || error.message);
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
