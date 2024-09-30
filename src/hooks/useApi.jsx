import { useState, useEffect } from "react";
import api from "../services/api";

export const useApi = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("useEffect déclenché avec l'URL:", url);
    setLoading(true);

    if (!url) {
      console.log("URL vide, pas d'appel API");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        console.log("Début de l'appel API avec l'URL:", url);
        const response = await api.get(url);
        console.log("Réponse reçue pour l'URL:", url);
        setData(response.data);
      } catch (err) {
        console.error("Erreur pour l'URL:", url, err);
        setError(err.response?.data?.message || "Une erreur est survenue");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};
