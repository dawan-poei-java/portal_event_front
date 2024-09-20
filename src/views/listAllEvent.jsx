import React from "react";
import "../styles/home.scss";
import "../styles/listAllEvent.scss";
import EventCard from "../components/eventCard"

export default function ListAllEvent() {
  const allEvents = [...Array(20)];
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
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
              Filtre
            </button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full  ">
              Trier par
            </button>
          </div>
        </div>
        <div className="flex flex-warp warp event-container-soon justify-between">

        {allEvents.map((e)=>{
          return <EventCard/>
        })}
        </div>
      </section>
    </>
  );
}
