import React, { useState, useEffect } from "react"; // Import des hooks React nécessaires

// Composant SearchFilter
const SearchFilter = ({ eventsData, onFilter, selectedCategory }) => {
  // State pour stocker le terme de recherche entré par l'utilisateur
  const [searchTerm, setSearchTerm] = useState("");

  // Fonction appelée lorsqu'on tape dans l'input de recherche
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase(); // Convertit le texte en minuscule pour une recherche insensible à la casse
    setSearchTerm(value); // Met à jour le state avec le terme de recherche
  };

  // useEffect est utilisé pour filtrer les événements chaque fois que `searchTerm` ou `selectedCategory` change
  useEffect(() => {
    let filtered = eventsData; // Initialise les données filtrées avec toutes les données d'événements

    // Si une catégorie spécifique est sélectionnée, filtre les événements en fonction de leur type
    if (selectedCategory !== "Tout") {
      filtered = filtered.filter(
        (event) =>
          event.typeEvent.name.toLowerCase() === selectedCategory.toLowerCase() // Compare les types d'événement avec la catégorie sélectionnée (insensible à la casse)
      );
    }

    // Si un terme de recherche est entré, filtre les événements en fonction du titre ou de la description
    if (searchTerm) {
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(searchTerm) || // Vérifie si le titre contient le terme de recherche
          event.description.toLowerCase().includes(searchTerm) // Vérifie si la description contient le terme de recherche
      );
    }

    // Appelle la fonction `onFilter` passée en props avec les événements filtrés
    onFilter(filtered);
  }, [searchTerm, selectedCategory]); // L'effet se déclenche quand `searchTerm` ou `selectedCategory` change

  return (
    <div>
      <input
        type="text"
        placeholder="Rechercher un événement..."
        value={searchTerm} // Valeur de l'input liée à `searchTerm`
        onChange={handleSearch} // Appelle `handleSearch` quand l'utilisateur tape dans l'input
        className="p-2 px-4 py-2 rounded-full bg-slate-200 focus:border-none focus:outline-none"
      />
    </div>
  );
};

export default SearchFilter;
