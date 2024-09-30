import { React, useEffect, useState } from "react";
import "../styles/listAllEvent.scss";
import "../styles/home.scss";
import EventGrid from "../components/eventGrid";
import { useApi } from "../hooks/useApi";

export default function home() {
  const { data: events, loading, error } = useApi("/events/upcoming");
  return (
    <>
      <section className="page-container">
        <div className="grid w-full gap-16">
          <div className="mt-30">
            <h2>À la une</h2>
            <img src="https://placehold.co/960x295" alt="" />
          </div>

          <div>
            {events && (
              <EventGrid
                title={"Prochainement"}
                listeElement={events}
                size={8}
              />
            )}
          </div>
        </div>
      </section>
    </>
  );
}
