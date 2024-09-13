import React from "react";
import "../styles/listAllEvent.scss";
import EventGrid from "../components/eventGrid";

export default function ListAllEvent() {
  const allEvents = [...Array(20)];
  return (
    <>
      <section className="page-container">
        <h2>Tout les évènements</h2>
        <EventGrid listeElement={allEvents} />
      </section>
    </>
  );
}
