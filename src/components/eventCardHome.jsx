import React from "react";
import { Link } from "react-router-dom";
import "../styles/eventCardHome.scss";
export default function EventCardHome({event}) {
  return (
    <Link to={""}>
      <div className="card-img-container-home">
        <img src="https://placehold.co/300x300" alt="" />
        <span>
          <h3>{event.title}</h3>
          <h3>{event.date}</h3>
        </span>
      </div>
    </Link>
  );
}
