import { useState, useEffect, useCallback } from "react";
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

  // Ajoutez cette nouvelle fonction
  const sendRequest = useCallback(
    async (newUrl, newMethod = "POST", newBody = null, isFormData = false) => {
      setLoading(true);
      setError(null);
      try {
        console.log(
          `Début de l'appel API avec l'URL: ${newUrl}, méthode: ${newMethod}`
        );
        let response;
        /*         const config = isFormData
          ? {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          : {}; */
        const config = {};
        console.log(`Configuration du callApi : isFormData => ${isFormData}`);
        switch (newMethod.toUpperCase()) {
          case "POST":
            response = await api.post(newUrl, newBody, config);
            break;
          case "PUT":
            response = await api.put(newUrl, newBody, config);
            break;
          case "DELETE":
            response = await api.delete(newUrl, config);
            break;
          case "GET":
            response = await api.get(newUrl);
            break;
          default:
            response = await api.get(newUrl, config);
        }
        console.log(
          `Réponse reçue pour l'URL: ${newUrl}, méthode: ${newMethod}`
        );
        setData(response.data);
        return response.data;
      } catch (err) {
        console.error(
          `Erreur pour l'URL: ${newUrl}, méthode: ${newMethod}`,
          err
        );
        setError(err.response?.data?.message || "Une erreur est survenue");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { data, loading, error, sendRequest };
};
