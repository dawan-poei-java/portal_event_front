import "../styles/home.scss";
import React, { useCallback, useEffect, useState } from "react";
import "../styles/listAllEvent.scss";
import EventCard from "../components/eventCard";
import EventGrid from "../components/eventGrid";
import SearchFilter from "../components/searchFilter";
import { useApi } from "../hooks/useApi";

export default function ListAllEvent() {
  // Utilisation du hook useApi pour récupérer les données depuis l'API
  const { data: allEvents, loadingEvent, errorEvent } = useApi("/events"); // Récupération des événements depuis l'API
  const {
    data: allTypesEvent, // Récupération des types d'événements depuis l'API
    loadingTypeEvent, // Indicateur de chargement pour les types d'événements
    errorTypeEvent, // Erreur éventuelle lors de la récupération des types d'événements
  } = useApi("/typeEvents");

  // Création d'un état pour la catégorie sélectionnée avec une valeur initiale de "Tout"
  const [selectedCategory, setSelectedCategory] = useState("Tout");

  // État pour stocker les événements filtrés
  const [filteredEvents, setFilteredEvents] = useState(allEvents);

  // Fonction pour mettre à jour la liste des événements filtrés
  const handleFilterEvent = (events) => {
    setFilteredEvents(events);
  };

  // useEffect est utilisé ici pour filtrer les événements à chaque fois que la liste des événements est mise à jour
  useEffect(() => {
    handleFilterEvent(allEvents); // Appel de la fonction de filtrage avec les événements actuels
  }, [allEvents]); // Ce hook dépend de la variable allEvents

  // Fonction pour mettre à jour la catégorie sélectionnée
  const handleChange = (e) => {
    setSelectedCategory(e.target.value); // Met à jour l'état selectedCategory avec la valeur de l'option sélectionnée
  };

  return (
    <>
      <section className="page-container-allEvent pb-10">
        {/* Titre de la section */}
        <h2>Tous les évènements</h2>

        {/* Barre de recherche et de filtrage */}
        <div className="flex justify-between mb-16">
          {/* Composant SearchFilter pour la recherche et le filtrage */}
          <SearchFilter
            eventsData={allEvents} // Passe la liste des événements au composant SearchFilter
            onFilter={handleFilterEvent} // Fonction à appeler lorsque le filtre est mis à jour
            selectedCategory={selectedCategory} // Passe la catégorie sélectionnée
          />
          {/* Dropdown de sélection des types d'événements */}
          <div className="flex gap-2">
            <select
              onChange={handleChange} // Appelle handleChange lorsque l'utilisateur change la sélection
              className="block w-full rounded-md border-0 px-1.5 py-1.5
              text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
              focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm
              sm:leading-6"
            >
              <option value="Tout">Tout</option> {/* Option par défaut */}
              {allTypesEvent && // Si les types d'événements existent
                allTypesEvent.map(
                  (
                    category // Boucle sur chaque type d'événement pour créer une option dans le select
                  ) => (
                    <option key={category.id} value={category.name}>
                      {category.name.charAt(0).toUpperCase() +
                        category.name.slice(1)}{" "}
                      {/* Première lettre en majuscule */}
                    </option>
                  )
                )}
            </select>
          </div>
        </div>
        {/*         <div className="flex justify-between flex-warp warp event-container-soon">
          {filteredEvents &&
            filteredEvents.map((e) => {
              return <EventCard key={e.id} />;
            })}
        </div> */}
        {/* Si les événements filtrés existent, affiche EventGrid */}
        {filteredEvents && <EventGrid listeElement={filteredEvents} />}
      </section>
    </>
  );
}
