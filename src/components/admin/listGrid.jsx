import axios from "axios";
import React, { useEffect, useState } from "react";
import { useApi } from "../../hooks/useApi";
import EditPopup from "./editPopup";

export default function ListGrid({ controller, page }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [headings, setHeadings] = useState([]);
  const { sendRequest } = useApi();
  const [popup, setPopup] = useState(false);
  const [popupItem, setPopupItem] = useState();
  const [updateValue, setUpdateValue] = useState();
  const [addValue, setAddValue] = useState({});

  // Fonction qui gère les changements de valeurs des inputs
  function handleChange(e, key) {
    setAddValue((prev) => ({ ...prev, [key]: e.target.value }));
  }

  // Fonction qui ajoute un nouvel objet avec les valeurs d'attributs dynamiques
  async function handleAdd() {
    try {
      await sendRequest("/" + controller, "POST", addValue);
      fetchData(); // Recharger les données après l'ajout
      setAddValue({})
    } catch (error) {
      console.log(error);
    }
  }

  function openPopup(e) {
    let item = data.find((item) => item.id == e.target.value);
    setPopupItem(item);
    setPopup(true);
  }

  async function fetchData() {
    try {
      let response = await sendRequest("/" + controller, "GET");
      setData(response);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [loading]);

  useEffect(() => {
    async function updateItem() {
      try {
        if (updateValue != undefined) {
          await sendRequest(
            controller + "/" + updateValue.id,
            "PUT",
            updateValue
          );
          fetchData(); // Recharger les données après la mise à jour
        }
      } catch (error) {
        console.log(error);
      }
    }
    updateItem();
  }, [updateValue]);

  useEffect(() => {
    if (data.length > 0) {
      const attributeNames = Object.keys(data[0]); // Récupérer les clés des attributs de data[0]
      setHeadings(attributeNames);
    }
  }, [loading]);

  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      {data.length > 0 ? (
        <div
          id="listGrid"
          className="max-w-full page-container-profile grid gap-10"
        >
          <h2 className="sticky left-0 w-1/2">{page}</h2>
          {/* Formulaire dynamique d'ajout */}
          <div className="flex gap-4 sticky left-0 w-1/3">
            {headings.map((key, index) => (
              <>
                {key != "id" && (
                  <div key={index} className="flex gap-4 items-center">
                    <label htmlFor={key}>{key}</label>
                    <input
                      value={addValue[key] || ""}
                      onChange={(e) => handleChange(e, key)}
                      type="text"
                      id={key}
                      className="bg-gray-100 px-3 py-1 rounded focus:ring focus:ring-gray-300 outline-none"
                      placeholder={`Ajouter ${key}`}
                    />
                  </div>
                )}
              </>
            ))}
            <button
              className="px-3 py-1 duration-100 border border-sky-400 text-sky-400 hover:shadow-md hover:shadow-sky-100 hover:text-white hover:bg-sky-400 rounded"
              onClick={handleAdd}
            >
              Ajouter
            </button>
          </div>

          {/* Tableau d'affichage des objets */}
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                {headings.map((heading, index) => (
                  <th key={index} className="px-4 py-3">
                    {heading}
                  </th>
                ))}
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((object, index) => (
                <tr key={index} className="hover:bg-gray-100 duration-150">
                  {headings.map((heading, i) => (
                    <td key={i} className="px-4 py-3">
                      {object[heading]}{" "}
                    </td>
                  ))}
                  <td className="px-4 py-3 flex gap-4 justify-center">
                    <button
                      value={object.id}
                      onClick={openPopup}
                      className="w-24 p-1 rounded border border-yellow-500 text-yellow-500  hover:shadow-md hover:shadow-yellow-100 hover:bg-yellow-500 hover:text-white duration-200"
                    >
                      Modifier
                    </button>
                    <button
                      value={object.id}
                      className="w-24 p-1 rounded border border-red-500 text-red-500  hover:shadow-md hover:shadow-red-100 hover:bg-red-500 hover:text-white duration-200"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {popup && (
            <EditPopup
              setUpdateValue={setUpdateValue}
              item={popupItem}
              setPopup={setPopup}
            />
          )}
        </div>
      ) : (
        <p>loading</p>
      )}
    </>
  );
}
