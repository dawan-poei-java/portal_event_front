import React from "react";
import { Link } from "react-router-dom";
import "../styles/eventCard.scss";
export default function EventCard({event}) {
  return (
    <Link to={""}>
      <div className="card-img-container">
        <img src="https://placehold.co/300x300" alt="" />
        <span>
          <h3>Title</h3>
        </span>
      </div>
    </Link>
  );
}
