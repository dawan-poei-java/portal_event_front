import axios from "axios";
import React, { useEffect, useState } from "react";
import { useApi } from "../../hooks/useApi";
import EditPopup from "./editPopup";

export default function ListGrid({ controller, page }) {
  const { data: data, loading } = useApi(controller);
  const [error, setError] = useState(null);
  const [headings, setHeadings] = useState([]);
  const { sendRequest } = useApi();
  const [popup, setPopup] = useState(false);
  const [popupItem, setPopupItem] = useState()
  const [updateValue, setUpdateValue] = useState()


  function openPopup(e) {
    let item =  data.find((item)=>item.id == e.target.value) 
    setPopupItem(item)
    setPopup(true)
  }

  

  useEffect(() => {
    async function updateItem(){
      try {
        if(updateValue != undefined){

          await sendRequest(controller+'/'+updateValue.id, "PUT",updateValue)
        }
      } catch (error) {
        console.log(error)
      }
    }
    updateItem()
  }, [updateValue]);

  console.log("data----", data && data);
  useEffect(() => {
    if (data) {
      let attributeNames = [];
      for (const key in data[0]) {
        if (data[0].hasOwnProperty(key)) {
          attributeNames.push(key);
        }
      }
      setHeadings(attributeNames);
    }
  }, [loading]);

  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      {data ? (
        <div className="page-container-profile grid gap-10">
          <h2>{page}</h2>
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
                      {object[heading.toLowerCase()]}{" "}
                    </td>
                  ))}
                  <td className="px-4 py-3 flex gap-4 justify-center">
                    <button
                      value={object.id}
                      onClick={openPopup}
                      className="w-3/12 p-1 rounded border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white duration-200"
                    >
                      Modifier
                    </button>
                    <button
                      value={object.id}
                      className="w-3/12 p-1 rounded border border-red-500 text-red-500 hover:bg-red-500 hover:text-white duration-200"
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
