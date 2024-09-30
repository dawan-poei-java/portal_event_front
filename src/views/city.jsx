import React from "react";
import { useParams } from "react-router-dom";
import EventGrid from "../components/eventGrid";
import { useApi } from "../hooks/useApi";

export default function city() {
  const { city } = useParams();
  const { data: elements } = useApi("/events/city/" + city);

  return (
    <>
      {elements && (
        <section className="page-container">
          <h2>{city}</h2>
          <div>
            <EventGrid
              title={"Prochainement"}
              listeElement={elements}
              size={8}
            />
          </div>
          <div>
            <EventGrid title={"Tout les évènements"} listeElement={elements} />
          </div>
        </section>
      )}
    </>
  );
}
