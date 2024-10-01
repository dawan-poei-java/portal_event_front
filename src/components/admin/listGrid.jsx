import axios from "axios";
import React, { useEffect, useState } from "react";

export default function ListGrid({ req }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [headings, setHeadings] = useState([]);

  useEffect(() => {
    // Remplacez l'URL par l'URL de votre API
    try {
        axios
          .get(req)
          .then((response) => {
            // Traitement des données de réponse
            setData(response.data);
            setLoading(false);
          })
          .catch((error) => {
            // Gestion des erreurs
            setError(error);
            setLoading(false);
          });
    } catch (error) {
        
    }
  }, []);

  useEffect(() => {
    let attributeNames = [];
    for (const key in data[0]) {
      if (data[0].hasOwnProperty(key)) {
        attributeNames.push(key);
      }
    }
    setHeadings(attributeNames);
  }, [loading]);
  console.log(headings);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="page-container-profile grid gap-10">
      <table>
        <thead>
          <tr>
            {headings.map((heading, index) => (
              <th
                key={index}
                className="border border-gray-300 p-2 bg-gray-200"
              >
                {heading}
              </th>
            ))}
            <th className="border border-gray-300 p-2 bg-gray-200">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((object, index) => (
            <tr key={index} className="hover:bg-gray-100">
              {headings.map((heading, i) => (
                <td key={i} className="border border-gray-300 p-2">
                  {object[heading.toLowerCase()]}{" "}
                </td>
              ))}
              <td className="flex gap-4 border border-gray-300 p-2">
                <button className="w-3/12 bg-yellow-400">Modifier</button>
                <button className="w-3/12 bg-red-400">Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
