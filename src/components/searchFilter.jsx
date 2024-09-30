import React, { useState, useEffect } from "react";

const SearchFilter = ({ eventsData, onFilter, selectedCategory }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
  };

  useEffect(() => {
    let filtered = eventsData;

    if (selectedCategory !== "Tout") {
      filtered = filtered.filter(
        (event) =>
          event.typeEvent.name.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    onFilter(filtered);
  }, [searchTerm, selectedCategory]);

  return (
    <div>
      <input
        type="text"
        placeholder="Rechercher un événement..."
        value={searchTerm}
        onChange={handleSearch}
        className="p-2 px-4 py-2 rounded-full bg-slate-200 focus:border-none focus:outline-none"
      />
    </div>
  );
};

export default SearchFilter;
