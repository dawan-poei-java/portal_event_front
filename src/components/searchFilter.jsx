import React, { useState } from "react";

// Exemple de données d'événements
const eventsData = [
  {
    id: 1,
    title: "Concert de Jazz",
    description: "Un super concert de Jazz au centre-ville.",
  },
  {
    id: 2,
    title: "Conférence Tech",
    description: "Une conférence sur les dernières tendances technologiques.",
  },
  {
    id: 3,
    title: "Atelier de Peinture",
    description: "Un atelier créatif pour débutants et amateurs de peinture.",
  },
  {
    id: 4,
    title: "Exposition d'Art Moderne",
    description: "Une exposition de peintures modernes dans la galerie d'art.",
  },
  {
    id: 5,
    title: "Match de Football",
    description: "Un match de football entre deux équipes locales.",
  },
];

const EventSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEvents, setFilteredEvents] = useState(eventsData);

  // Fonction de gestion de la recherche
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    // Filtrage des événements en fonction du mot-clé saisi
    const filtered = eventsData.filter(
      (event) =>
        event.title.toLowerCase().includes(value) ||
        event.description.toLowerCase().includes(value)
    );

    setFilteredEvents(filtered);
  };

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
