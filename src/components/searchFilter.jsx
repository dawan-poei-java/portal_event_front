import React, { useEffect, useState } from "react";

// Exemple de données d'événements

const EventSearch = ({ eventsData, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEvents, setFilteredEvents] = useState(eventsData);

  // Fonction de gestion de la recherche
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    // Filtrage des événements en fonction du mot-clé saisi

    //setFilteredEvents(filtered);
  };

  useEffect(() => {
    const filtered = eventsData.filter(
      (event) =>
        event.title.toLowerCase().includes(searchTerm) ||
        event.description.toLowerCase().includes(searchTerm)
    );
    onFilter(filtered);
  }, [eventsData, searchTerm]);
  return (
    <div>
      <h1>Recherche d'événements</h1>
      <input
        type="text"
        placeholder="Rechercher un événement..."
        value={searchTerm}
        onChange={handleSearch}
        style={{ padding: "10px", width: "100%", marginBottom: "20px" }}
      />

      {filteredEvents.length > 0 ? (
        <ul>
          {filteredEvents.map((event) => (
            <li key={event.id}>
              <h2>{event.title}</h2>
              <p>{event.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Aucun événement trouvé.</p>
      )}
    </div>
  );
};

export default EventSearch;
