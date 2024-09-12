import React from "react";
import { Link } from "react-router-dom";
import "../styles/villeCard.scss";

export default function villeCard() {
  return (
    <Link to={""}>
      <div className="img-container">
        <img src="https://placehold.co/200x150" alt="" />
      </div>
    </Link>
  );
}
