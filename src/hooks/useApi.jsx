import { useState, useEffect } from "react";
import api from "../services/api";

export const useApi = (url, method = "GET", body = null) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log(`useEffect déclenché avec l'URL: ${url}, méthode: ${method}`);
    setLoading(true);

    if (!url) {
      console.log("URL vide, pas d'appel API");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        console.log(
          `Début de l'appel API avec l'URL: ${url}, méthode: ${method}`
        );
        let response;
        switch (method.toUpperCase()) {
          case "POST":
            response = await api.post(url, body);
            break;
          case "PUT":
            response = await api.put(url, body);
            break;
          case "DELETE":
            response = await api.delete(url);
            break;
          default:
            response = await api.get(url);
        }
        console.log(`Réponse reçue pour l'URL: ${url}, méthode: ${method}`);
        setData(response.data);
      } catch (err) {
        console.error(`Erreur pour l'URL: ${url}, méthode: ${method}`, err);
        setError(err.response?.data?.message || "Une erreur est survenue");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, method, body]);

  return { data, loading, error };
};
