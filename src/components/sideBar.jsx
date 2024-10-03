import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function SideBar({ listButton, setPageSelected }) {
  const handleClick = (event) => {
    const value = event.target.getAttribute("data-value");
    setPageSelected(value);
  };
  return (
    <div className="flex flex-col gap-4">
      {listButton.map((Element) => {
        return (
          <button data-value={Element} onClick={handleClick}>
            {Element}
          </button>
        );
      })}
      {sessionStorage.getItem("role") === "ORGANIZER" && (
        <button data-value="event-orga" onClick={handleClick}>
          Événements organisateur
        </button>
      )}
    </div>
  );
}
