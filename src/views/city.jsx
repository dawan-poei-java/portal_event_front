import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EventGrid from "../components/eventGrid";
import { useApi } from "../hooks/useApi";

export default function city() {
  const { city } = useParams();
  const navigate = useNavigate();
  const { data: elements,loading } = useApi("/events/city/" + city);
  const { data: cities,citiesLoading } = useApi("/cities");

useEffect(()=>{
  if (cities){
    let cityFounded = cities.some(
      (item) => item.name.toLowerCase() === city.toLowerCase()
    );
    if (!cityFounded){
      navigate("/not-found");
    }
  }
  

},[city,navigate,cities])


  return (
    <>
      {elements && (
        <section className="page-container">
          <h2>{city}</h2>
          <div>
            <EventGrid
              title={"Prochainement"}
              listeElement={elements}
              size={8}
            />
          </div>
          <div>
            <EventGrid title={"Tout les évènements"} listeElement={elements} />
          </div>
        </section>
      )}
    </>
  );
}
