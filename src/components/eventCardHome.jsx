import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/eventCardHome.scss";
export default function EventCardHome({ event }) {
  let image = event.image;
  const id = event.id;
  const title = event.title;

  const textMaxSize = 3;
  const date = event.date;
  image = "https:/placehold.co/300x300";
  return (
    <Link to={"/cities/" + event.city.name + "/" + event.id} className="card">
      <div class="card-event">
        <div class="content">
          <p class="date">{event.date}</p>
          <p class="title">{title}</p>
        </div>
        <img src={event.images[0]} alt="article-cover" />
      </div>
    </Link>
  );
}
