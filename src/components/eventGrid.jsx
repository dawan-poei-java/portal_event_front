import React from "react";
import EventCardHome from "./eventCardHome";

export default function eventGrid({ title, listeElement,size }) {
  return (
    <>
    <div className="flex flex-col gap-3">

      <h3>{title}</h3>
      <div className="grid event-container-soon">
        {listeElement !== undefined &&
          listeElement.slice(0, size).map((event) => {
            return <EventCardHome event={event} />;
          })}
      </div>
    </div>
    </>
  );
}
