import { React, useEffect, useState } from "react";
import "../styles/listAllEvent.scss";
import "../styles/home.scss";
import EventGrid from "../components/eventGrid";

export default function home() {
  const [events, setEvents] = useState();

  useEffect(() => {
    setEvents([
      {
        title: "Festival de Cannes",
        description:
          "Le plus grand festival international de films avec la participation de stars du monde entier.",
        city: "Cannes",
        date: "2024-05-14",
      },
      {
        title: "Fête de la Musique",
        description:
          "Une fête annuelle célébrant la musique avec des concerts gratuits partout en France.",
        city: "Paris",
        date: "2024-06-21",
      },
      {
        title: "Marathon de Paris",
        description:
          "Un événement sportif majeur attirant des milliers de coureurs du monde entier.",
        city: "Paris",
        date: "2024-04-07",
      },
      {
        title: "Festival des Vieilles Charrues",
        description:
          "Le plus grand festival de musique en France avec des artistes internationaux et locaux.",
        city: "Carhaix",
        date: "2024-07-18",
      },
      {
        title: "Fête des Lumières",
        description:
          "Un spectacle de lumières éblouissant illuminant la ville de Lyon chaque année.",
        city: "Lyon",
        date: "2024-12-08",
      },
      {
        title: "Festival d'Avignon",
        description:
          "Un festival de théâtre renommé avec des performances partout dans la ville.",
        city: "Avignon",
        date: "2024-07-04",
      },
      {
        title: "Salon du Livre de Paris",
        description:
          "Un salon dédié aux amateurs de littérature avec des auteurs de renom.",
        city: "Paris",
        date: "2024-03-22",
      },
      {
        title: "Carnaval de Nice",
        description:
          "Un des plus célèbres carnavals du monde avec des défilés colorés et des chars géants.",
        city: "Nice",
        date: "2024-02-17",
      },
      {
        title: "24 Heures du Mans",
        description:
          "La célèbre course d'endurance automobile de 24 heures au Mans.",
        city: "Le Mans",
        date: "2024-06-15",
      },
      {
        title: "Jazz à Juan",
        description:
          "Un festival de jazz iconique ayant lieu chaque été sur la Côte d'Azur.",
        city: "Juan-les-Pins",
        date: "2024-07-12",
      },
      {
        title: "Eurockéennes de Belfort",
        description:
          "Un festival de musique rock en plein air attirant des artistes de renommée internationale.",
        city: "Belfort",
        date: "2024-07-04",
      },
      {
        title: "Mondial de l'Automobile",
        description:
          "Le plus grand salon automobile au monde, se tenant tous les deux ans à Paris.",
        city: "Paris",
        date: "2024-10-02",
      },
      {
        title: "Nuit Blanche",
        description:
          "Une nuit entière dédiée à l'art contemporain dans toute la ville de Paris.",
        city: "Paris",
        date: "2024-10-05",
      },
      {
        title: "Marché de Noël de Strasbourg",
        description:
          "Un des plus vieux et plus beaux marchés de Noël en Europe.",
        city: "Strasbourg",
        date: "2024-12-01",
      },
      {
        title: "Rock en Seine",
        description:
          "Un festival de musique rock majeur se déroulant chaque année à Saint-Cloud.",
        city: "Saint-Cloud",
        date: "2024-08-23",
      },
      {
        title: "Tour de France",
        description:
          "La célèbre course cycliste traversant les plus belles régions de France.",
        city: "Paris (arrivée)",
        date: "2024-07-28",
      },
    ]);
  }, []);

  return (
    <>
      <section className="page-container">
        <div className="grid w-full gap-16">
          <div className="mt-30">
            <h2>À la une</h2>
            <img src="https://placehold.co/960x295" alt="" />
          </div>
          <div>
            <EventGrid
              title={"Prochainement"}
              listeElement={events}
              size={8}
            />
          </div>
        </div>
      </section>
    </>
  );
}
