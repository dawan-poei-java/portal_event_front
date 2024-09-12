import React from "react";
import { Link } from "react-router-dom";
import "../styles/cityCard.scss";

export default function cityCard() {
  return (
    <Link to={""}>
      <div className="img-container">
        <img src="https://placehold.co/200x150" alt="" />
      </div>
    </Link>
  );
}
