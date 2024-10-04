import { React, useEffect, useState } from "react";
import "../styles/listAllEvent.scss";
import "../styles/home.scss";
import EventGrid from "../components/eventGrid";
import { useApi } from "../hooks/useApi";
import PopularEventCard from "../components/popularEventCard";

export default function home() {
  const { data: events } = useApi("/events/upcoming");
  const { data: popularEvent } = useApi("/events/popular");
  return (
    <>
      <section className="page-container">
        <div className="grid w-full gap-16">
          <div className="mt-30">
            <h2>À la une</h2>
            <PopularEventCard event={popularEvent} />
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
