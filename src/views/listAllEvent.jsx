import "../styles/home.scss";
import React, { useState } from "react";
import "../styles/listAllEvent.scss";
import EventCard from "../components/eventCard"
import EventGrid from "../components/eventGrid";

export default function ListAllEvent() {
  const allEvents = [
    { id: 1, title: "Événement 1", category: "Spectacle" },
    { id: 2, title: "Événement 2", category: "Concert" },
    { id: 3, title: "Événement 3", category: "Exposition" },
  ];

  const [selectedCategory, setSelectedCategory] = useState("Tout");

  const filteredEvents =
    selectedCategory === "Tout"
      ? allEvents
      : allEvents.filter((event) => event.category === selectedCategory);

  return (
    <>
      <section className="page-container-allEvent">
        <h2>Tout les évènements</h2>
        <div className="flex justify-between ">
          <input
            type="text"
            className="border rounded-full  "
            placeholder="Rechercher"
            name="Search"
          />
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
