import "../styles/home.scss";
import React, { useCallback, useState } from "react";
import "../styles/listAllEvent.scss";
import EventCard from "../components/eventCard";
import EventGrid from "../components/eventGrid";
import SearchFilter from "../components/searchFilter";

export default function ListAllEvent() {
  const allEvents = [
    { id: 1, title: "Atelier de peinture", category: "Spectacle" },
    { id: 2, title: "Concert de Jazz", category: "Concert" },
    { id: 3, title: "Exposition d'Art Moderne", category: "Exposition" },
  ];

  const [selectedCategory, setSelectedCategory] = useState("Tout");

  const [filteredEvents, setFilteredEvents] = useState(allEvents);


  const handleFilterEvent = useCallback((EventFilter) => {
    setFilteredEvents(EventFilter);
  }, []);
  return (
    <>
      <section className="page-container-allEvent">
        <h2>Tout les évènements</h2>
        <div className="flex justify-between ">
          <SearchFilter eventsData={allEvents} onFilter={handleFilterEvent} />
          <div className="flex gap-2">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              onClick={() => setSelectedCategory("Spectacle")}
            >
              Spectacle
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              onClick={() => setSelectedCategory("Concert")}
            >
              Concert
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              onClick={() => setSelectedCategory("Exposition")}
            >
              Exposition
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              onClick={() => setSelectedCategory("Tout")}
            >
              Tout
            </button>
          </div>
        </div>
        <div className="flex flex-warp warp event-container-soon justify-between">
          {allEvents.map((e) => {
            return <EventCard />;
          })}
        </div>

        <EventGrid listeElement={filteredEvents} />
      </section>
    </>
  );
}
