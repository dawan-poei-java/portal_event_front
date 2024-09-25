import React from "react";
import EventCardHome from "./eventCardHome";

export default function eventGrid({ title, listeElement,size }) {
  return (
    <>
      <h2>{title}</h2>
      <div className="grid event-container-soon">
        {listeElement !== undefined &&
          listeElement.slice(0, size).map((event) => {
            return <EventCardHome event={event} />;
          })}
      </div>
    </>
  );
}
