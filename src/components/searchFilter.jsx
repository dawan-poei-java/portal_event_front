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
        (event) => event.category === selectedCategory
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
        style={{ padding: "10px", width: "100%", marginBottom: "20px" }}
      />
    </div>
  );
};

export default SearchFilter;
