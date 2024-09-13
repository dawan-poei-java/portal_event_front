import React from "react";
import EventCardHome from "./eventCardHome";

export default function eventGrid(args) {
  console.log(args.title);
  return (
    <>
      <h2>{args.title}</h2>
      <div className="flex flex-warp warp event-container-soon justify-between">
        {args.listeElement.map((element) => {
          return <EventCardHome />;
        })}
      </div>
    </>
  );
}
