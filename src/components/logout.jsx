import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authProvider";

const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    // Nettoyer le token ou l'état d'authentification
    logout(); // ou une fonction pour gérer l'état global
    navigate("/"); // Rediriger vers la page d'accueil
  }, [logout, navigate]);

  return null; // Ce composant ne rend rien
};

export default Logout;
