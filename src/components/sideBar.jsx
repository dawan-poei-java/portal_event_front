import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function SideBar({ listButton, setPageSelected }) {
  const handleClick = (event) => {
    const value = event.target.getAttribute("data-value");
    setPageSelected(value);
  };
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-start gap-4">
        {listButton.map((Element) => {
          return (
            <button
              className="w-fit rounded duration-150 hover:text-white hover:bg-sky-600 text-start px-3 py-1"
              data-value={Element}
              onClick={handleClick}
            >
              {Element}
            </button>
          );
        })}
        {sessionStorage.getItem("role") === "ORGANIZER" && (
          <button
            data-value="event-orga"
            className="w-fit rounded duration-150 hover:text-white hover:bg-sky-600 text-start px-3 py-1"
            onClick={handleClick}
          >
            Événements organisateur
          </button>
        )}
        <Link className="w-fit rounded duration-150 hover:text-white hover:bg-red-700 text-start px-3 py-1" to={"/logout"}>
          Se déconnecter
        </Link>
      </div>
    </div>
  );
}
