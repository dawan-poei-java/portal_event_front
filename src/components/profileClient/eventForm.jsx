import React, { useState, useEffect } from "react";
import { useApi } from "../../hooks/useApi";

export default function EventForm() {
  const [typeEvents, setTypeEvents] = useState([]);
  const [cities, setCities] = useState([]);
  const [prices, setPrices] = useState([{ name: "", price: "" }]);
  const { data: types } = useApi("/typeEvents");
  const { data: citiesResult } = useApi("/cities");

  useEffect(() => {
    // Ici, vous devriez récupérer les typeEvents et les villes depuis votre base de données
    setTypeEvents(types);
    setCities(citiesResult);
  }, [types, cities]);

  const handleAddPrice = () => {
    setPrices([...prices, { name: "", price: "" }]);
  };

  const handlePriceChange = (index, field, value) => {
    const newPrices = [...prices];
    newPrices[index][field] = value;
    setPrices(newPrices);
  };

  const handleRemovePrice = (index) => {
    const newPrices = prices.filter((_, i) => i !== index);
    setPrices(newPrices);
  };

  return (
    <div className="max-w-lg p-4 mx-auto">
      <form className="space-y-6">
        <div className="mb-5">
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Titre
          </label>
          <input
            type="text"
            id="title"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Description
          </label>
          <textarea
            id="description"
            rows="4"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          ></textarea>
        </div>

        <div className="mb-5">
          <label
            htmlFor="typeEvent"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Type d'événement
          </label>
          <select
            id="typeEvent"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          >
            {typeEvents &&
              typeEvents.map((type, index) => (
                <option key={index} value={type.id}>
                  {type.name.charAt(0).toUpperCase() + type.name.slice(1).toLowerCase()}
                </option>
              ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-5">
          <div>
            <label
              htmlFor="startDate"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Date de début
            </label>
            <input
              type="date"
              id="startDate"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="endDate"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Date de fin
            </label>
            <input
              type="date"
              id="endDate"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-5">
          <div>
            <label
              htmlFor="startTime"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Heure de début
            </label>
            <input
              type="time"
              id="startTime"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="endTime"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Heure de fin
            </label>
            <input
              type="time"
              id="endTime"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
        </div>

        <div className="mb-5">
          <label
            htmlFor="city"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Ville
          </label>
          <select
            id="city"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          >
            {cities &&
              cities.map((city, index) => (
                <option key={index} value={city.id}>
                  {city.name}
                </option>
              ))}
          </select>
        </div>

        <div className="mb-5">
          <label
            htmlFor="address"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Adresse
          </label>
          <input
            type="text"
            id="address"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="zipCode"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Code postal
          </label>
          <input
            type="text"
            id="zipCode"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Prix
          </label>
          {prices.map((price, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                placeholder="Nom"
                value={price.name}
                onChange={(e) =>
                  handlePriceChange(index, "name", e.target.value)
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mr-2"
              />
              <input
                type="number"
                placeholder="Prix"
                value={price.price}
                onChange={(e) =>
                  handlePriceChange(index, "price", e.target.value)
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mr-2"
              />
              {prices.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemovePrice(index)}
                  className="px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                >
                  Supprimer
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddPrice}
            className="mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Ajouter un prix
          </button>
        </div>

        <input type="hidden" id="status" value="WAITING" />

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Soumettre
        </button>
      </form>
    </div>
  );
}