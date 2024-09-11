import React from "react";
import { useParams } from "react-router-dom";

export default function eventsVille() {
  const { city } = useParams();
  console.log(city)
  return (
    <>
    <div>{city}</div>
    </>
  );
}
