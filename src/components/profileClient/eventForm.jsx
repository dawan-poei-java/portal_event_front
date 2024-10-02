import React, { useState, useEffect, useRef } from "react";
import { useApi } from "../../hooks/useApi";

export default function EventForm() {
  const [typeEvents, setTypeEvents] = useState([]);
  const [cities, setCities] = useState([]);
  const [pricings, setPricings] = useState([{ name: "", price: "" }]);
  const { data: types } = useApi("/typeEvents");
  const { data: citiesResult } = useApi("/cities");
  const [formError, setFormError] = useState("");
  const formRef = useRef(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    typeEvent: {},
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    city: {},
    address: "",
    zipCode: "",
    state: "WAITING",
    images: [],
  });

  const { sendRequest } = useApi();

  useEffect(() => {
    // Ici, vous devriez récupérer les typeEvents et les villes depuis votre base de données
    setTypeEvents(types);
    setCities(citiesResult);
  }, [types, cities]);

  const handleAddPrice = () => {
    setPricings([...pricings, { name: "", price: "" }]);
  };

  const handlePriceChange = (index, field, value) => {
    const newPricings = [...pricings];
    newPricings[index][field] = value;
    setPricings(newPricings);
  };

  const handleRemovePrice = (index) => {
    const newPricings = pricings.filter((_, i) => i !== index);
    setPricings(newPricings);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]:
        id === "typeEvent" || id === "city"
          ? (id === "typeEvent" ? typeEvents : cities).find(
              (item) => item.id === parseInt(value)
            )
          : id === "startDate" || id === "endDate"
          ? value + "T00:00:00" // Ajoute l'heure au format ISO
          : value,
    }));
  };

  const handleSendingForm = async (e) => {
    e.preventDefault();
    const errors = [];
    setFormError(errors);
    const regexZipCode = /^(0[1-9]|[1-9][0-9]|2[AB])\d{3}$/; //Prends en compte les codes postaux français ainsi que la particularité corse
    // Gestion des erreurs
    if (formData.images.length < 2) {
      errors.push("Veuillez sélectionner au moins deux images.");
    }

    if (formData.startDate >= formData.endDate) {
      errors.push("La date de début doit être antérieure à la date de fin.");
    }
    if (
      formData.startTime >= formData.endTime &&
      formData.startDate === formData.endDate
    ) {
      errors.push("L'heure de début doit être antérieure à l'heure de fin.");
    }
    if (!regexZipCode.test(formData.zipCode)) {
      errors.push("Le code postal n'est pas du format français.");
    }
    if (errors.length > 0) {
      setFormError(errors);
      formRef.current.scrollIntoView({ behavior: "smooth" });
      return;
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    try {
      const { images, ...eventData } = formData;
      const event = {
        ...eventData,
        pricings,
      };
      const formDataToSend = new FormData();
      formDataToSend.append(
        "event",
        new Blob([JSON.stringify(event)], { type: "application/json" })
      );
      images.forEach((image, index) => {
        formDataToSend.append(`images`, image);
      });
      const result = await sendRequest("/events", "POST", formDataToSend, true);
      console.log("Événement créé avec succès:", result);
      // Réinitialiser le formulaire ou rediriger l'utilisateur
    } catch (err) {
      console.error("Erreur lors de l'envoi:", err);
      setFormError([
        "Une erreur est survenue lors de l'envoi du formulaire. Veuillez réessayer.",
      ]);
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div ref={formRef} className="max-w-lg p-4 mx-auto">
      <form className="space-y-6" onSubmit={handleSendingForm}>
        {formError && formError.length > 0 && (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <ul className="pl-5 list-disc">
              {formError.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}

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
            value={formData.title}
            onChange={handleInputChange}
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
            value={formData.description}
            onChange={handleInputChange}
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
            value={formData.typeEvent.id || ""}
            onChange={handleInputChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          >
            <option value="">Sélectionnez un type d'événement</option>
            {typeEvents &&
              typeEvents.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name.charAt(0).toUpperCase() +
                    type.name.slice(1).toLowerCase()}
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
              value={formData.startDate ? formData.startDate.split("T")[0] : ""}
              onChange={handleInputChange}
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
              value={formData.endDate ? formData.endDate.split("T")[0] : ""}
              onChange={handleInputChange}
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
              value={formData.startTime}
              onChange={handleInputChange}
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
              value={formData.endTime}
              onChange={handleInputChange}
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
            value={formData.city.id || ""}
            onChange={handleInputChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          >
            <option value="">Sélectionnez une ville</option>
            {cities &&
              cities.map((city) => (
                <option key={city.id} value={city.id}>
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
            value={formData.address}
            onChange={handleInputChange}
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
            value={formData.zipCode}
            onChange={handleInputChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Prix
          </label>
          {pricings.map((pricing, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                placeholder="Nom"
                value={pricing.name}
                onChange={(e) =>
                  handlePriceChange(index, "name", e.target.value)
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mr-2"
              />
              <input
                type="number"
                placeholder="Prix"
                value={pricing.price}
                onChange={(e) =>
                  handlePriceChange(index, "price", e.target.value)
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mr-2"
              />
              {pricings.length > 1 && (
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

        <input type="hidden" id="state" value="WAITING" />

        <div className="mb-5">
          <label
            htmlFor="images"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Images
          </label>
          <input
            type="file"
            id="images"
            multiple
            minLength={2}
            accept="image/*"
            onChange={(e) =>
              setFormData({ ...formData, images: Array.from(e.target.files) })
            }
            className="block w-full text-sm text-gray-900 rounded-lg cursor-pointer hover:shadow hover:bg-gray-100 bg-gray-50 file:rounded-lg file:border-none file:mr-4 file:outline-none file:p-2 file:cursor-pointer"
          />
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
            Sélectionnez au minimum deux images pour votre événement.
          </p>
        </div>

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
