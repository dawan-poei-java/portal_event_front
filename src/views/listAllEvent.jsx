import "../styles/home.scss";
import React, { useCallback, useEffect, useState } from "react";
import "../styles/listAllEvent.scss";
import EventCard from "../components/eventCard";
import EventGrid from "../components/eventGrid";
import SearchFilter from "../components/searchFilter";

export default function ListAllEvent() {
  const allEvents = [
    {
      id: 1,
      title: "Atelier de peinture",
      category: "Spectacle",
      description: "description",
    },
    {
      id: 2,
      title: "Concert de Jazz",
      category: "Concert",
      description: "description",
    },
    {
      id: 3,
      title: "Exposition d'Art Moderne",
      category: "Exposition",
      description: "description",
    },
    {
      id: 4,
      title: "Concert de Rock",
      category: "Concert",
      description: "description",
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState("Tout");
  const [filteredEvents, setFilteredEvents] = useState(allEvents);

  const handleFilterEvent = (events) => {
    setFilteredEvents(events);
  };

  return (
    <>
      <section className="page-container-allEvent">
        <h2>Tout les évènements</h2>
        <div className="flex justify-between ">
          <SearchFilter
            eventsData={allEvents}
            onFilter={handleFilterEvent}
            selectedCategory={selectedCategory}
          />
          <div className="flex gap-2">
            <button
              className="px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700"
              onClick={() => setSelectedCategory("Spectacle")}
            >
              Spectacle
            </button>
            <button
              className="px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700"
              onClick={() => setSelectedCategory("Concert")}
            >
              Concert
            </button>
            <button
              className="px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700"
              onClick={() => setSelectedCategory("Exposition")}
            >
              Exposition
            </button>
            <button
              className="px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700"
              onClick={() => setSelectedCategory("Tout")}
            >
              Tout
            </button>
          </div>
        </div>
        <div className="flex justify-between flex-warp warp event-container-soon">
          {filteredEvents.map((e) => {
            return <EventCard key={e.id} />;
          })}
        </div>

        <EventGrid listeElement={filteredEvents} />
      </section>
    </>
  );
}
