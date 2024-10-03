import React, { useState } from "react";

export default function EditPopup({ item, setPopup, setUpdateValue }) {
  const [newValue, setNewValue] = useState();

  function handleChange(e) {
    if(e.target.value != ""){
        setNewValue({
            ...item,
            name : e.target.value});

    }
    else{
        setNewValue(item.name)
    }
  }
  function submit() {
    setUpdateValue(newValue);
    setPopup(false);
  }
  function closePopup() {setPopup(false)}

  return (
    <>
      <div className="absolute h-full w-full inset-0 backdrop-blur-md"></div>
      <div className="edit-popup w-96 shadow-2xl rounded p-6 absolute bg-white  left-1/2 top-1/2 ">
        <div className="grid gap-2">
          <label htmlFor="">Modifier : {item.name}</label>
          <input
            className="bg-gray-100 rounded px-3 py-1"
            value={newValue&&newValue.name}
            type="text"
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-between mt-5">
          <button
            className="rounded border border-green-400 text-green-400 px-4 py-1 hover:bg-green-400 duration-150 hover:text-white"
            onClick={submit}
          >
            Valider
          </button>
          <button
            className="rounded px-4 py-1 border border-red-400 text-red-400 hover:bg-red-400 duration-150 hover:text-white"
            onClick={closePopup}
          >
            Annuler
          </button>
        </div>
      </div>
    </>
  );
}
