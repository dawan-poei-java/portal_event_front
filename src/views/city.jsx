import React from "react";
import { useParams } from "react-router-dom";
import EventGrid from "../components/eventGrid";


export default function city() {
  const { city } = useParams();
  const elements = [...Array(8)];

  return (
    <>
      <section className="page-container">
        <h2>{city}</h2>
        <div>
            <EventGrid 
            title={"Prochainement"}
            listeElement={elements} 
            />
          </div>
          <div>
            <EventGrid 
            title={"Tout les évènements"}
            listeElement={elements} 
            />
          </div>
      </section>
    </>
  );
}
