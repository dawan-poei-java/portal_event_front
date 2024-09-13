import React from "react";
import "../styles/listAllEvent.scss";
import EventGrid from "../components/eventGrid";

export default function ListAllEvent() {
  const allEvents = [...Array(20)];
  return (
    <>
      <section className="page-container">
        <h2>Tout les évènements</h2>
        <div className="flex justify-between ">
          <input
            type="text"
            className="border rounded-full  "
            placeholder="Rechercher"
            name="Search"
          />
          <div className="flex gap-2">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
              Filtre
            </button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full  ">
              Trier par
            </button>
          </div>
        </div>

        <EventGrid listeElement={allEvents} />
      </section>
    </>
  );
}
