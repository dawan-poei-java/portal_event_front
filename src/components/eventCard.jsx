import React from "react";
import { Link } from "react-router-dom";
import "../styles/eventCard.scss";
export default function eventCard(event) {
  return (
    <Link to={""}>
      <div>
        <img src="https://placehold.co/200x200" alt="" />
        <span>
          <h3>Title</h3>
        </span>
      </div>
    </Link>
  );
}
