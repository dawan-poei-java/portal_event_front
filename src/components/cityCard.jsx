import { React, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/cityCard.scss";

export default function CityCard({ name, thumbnail }) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <Link to={"/cities/" + name}>
      <div
        className="img-container"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <h2 className="card-title">{name}</h2>
        <img
          draggable
          className={`${
            isHovered ? "thumbnail-hovered" : "thumbnail"
          } object-cover w-full h-full overflow-hidden`}
          src={thumbnail}
          alt=""
        />
      </div>
    </Link>
  );
}
