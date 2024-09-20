import React from "react";
import EventCardHome from "./eventCardHome";

export default function eventGrid({ title, listeElement }) {
  return (
    <>
      <h2>{title}</h2>
      <div className="flex flex-warp warp event-container-soon justify-between">
        {listeElement.map((event) => {
          return <EventCardHome event={event}/>;
        })}
      </div>
    </>
  );
}
