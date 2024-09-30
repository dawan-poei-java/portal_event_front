import React from "react";
import "../styles/cities.scss";
import CityCard from "../components/cityCard.jsx";
import { Link } from "react-router-dom";
import { useApi } from "../hooks/useApi.jsx";

export default function events() {
  const { data: elements, loading, error } = useApi("/cities");

  return (
    <section className="page-container">
      <div className="grid gap-10">
        <div className="flex items-center justify-between">
          <h2>Les Villes</h2>
          <Link to={"/allEvents/"}>Voir tout les événements</Link>
        </div>

        <div className="flex cards-container ">
          {elements &&
            elements
              .sort((a, b) => b.nb_events - a.nb_events)
              .map((elements) => {
                return (
                  <CityCard
                    name={elements.name}
                    thumbnail={"https://placehold.co/226x150"}
                  />
                );
              })}
        </div>
      </div>
    </section>
  );
}
