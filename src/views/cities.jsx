import React from "react";
import "../styles/cities.scss";
import CityCard from "../components/cityCard.jsx";

export default function events() {
  const elements = [
    {
      city: "Paris",
      image: "https://placehold.co/226x150",
      nb_events: 123,
    },
    {
      city: "Lyon",
      image: "https://placehold.co/226x150",
      nb_events: 56,
    },
    {
      city: "Marseille",
      image: "https://placehold.co/226x150",
      nb_events: 78,
    },
    {
      city: "Toulouse",
      image: "https://placehold.co/226x150",
      nb_events: 34,
    },
    {
      city: "Nice",
      image: "https://placehold.co/226x150",
      nb_events: 29,
    },
    {
      city: "Nantes",
      image: "https://placehold.co/226x150",
      nb_events: 45,
    },
    {
      city: "Strasbourg",
      image: "https://placehold.co/226x150",
      nb_events: 52,
    },
    {
      city: "Montpellier",
      image: "https://placehold.co/226x150",
      nb_events: 124,
    },
    {
      city: "Bordeaux",
      image: "https://placehold.co/226x150",
      nb_events: 67,
    },
    {
      city: "Lille",
      image: "https://placehold.co/226x150",
      nb_events: 83,
    },
    {
      city: "Rennes",
      image: "https://placehold.co/226x150",
      nb_events: 48,
    },
    {
      city: "Reims",
      image: "https://placehold.co/226x150",
      nb_events: 22,
    },
    {
      city: "Le Havre",
      image: "https://placehold.co/226x150",
      nb_events: 19,
    },
    {
      city: "Saint-Étienne",
      image: "https://placehold.co/226x150",
      nb_events: 37,
    },
    {
      city: "Toulon",
      image: "https://placehold.co/226x150",
      nb_events: 41,
    },
    {
      city: "Grenoble",
      image: "https://placehold.co/226x150",
      nb_events: 27,
    },
  ];


  return (
    <section className="page-container">
      <div className="grid gap-10">
        <h2>Les Villes</h2>
        <div className="cards-container flex">
          {elements.sort((a,b)=>b.nb_events-a.nb_events).map((elements) => {
            return <CityCard name={elements.city} thumbnail={elements.image} />;
          })}
        </div>
      </div>
    </section>
  );
}
