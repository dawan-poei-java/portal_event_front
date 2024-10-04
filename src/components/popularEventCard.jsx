import React from "react";
import { Link } from "react-router-dom";
import "../styles/popularEventCard.scss";

export default function PopularEventCard({ event }) {
  return (
    <>
      {event && (
        <Link
          to={"/cities/" + event.city.name + "/" + event.id}
          className="card relative block w-[960px] h-[295px] rounded-xl transition-all hover:shadow-[0 0 28px rgba(0, 0, 0, 0.25)]"
        >
          <div className="absolute bottom-0 p-2.5 text-white">
            {event && event.title}
          </div>
          <img
            className="object-cover w-full h-full rounded-xl"
            src={event.images[0]}
            alt=""
          />
        </Link>
      )}
    </>
  );
}
