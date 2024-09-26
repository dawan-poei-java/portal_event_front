import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/eventCardHome.scss";
export default function EventCardHome({ event }) {
  let image = event.image;
  const id = event.id;
  const title = event.title;
  
  const textMaxSize = 3;
  const date =event.date
  image = "https:/placehold.co/300x300";
  return (
    <Link to={'/cities/'+event.city+'/'+event.id} className="card">

        <div class="card-event">
          <div class="content">
            <p class="date">{event.date}</p>
            <p class="title">{title}</p>
          </div>
          <img
            src="https://images.unsplash.com/photo-1482877346909-048fb6477632?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=958&q=80"
            alt="article-cover"
          />
        </div>

    </Link>
  );
}
