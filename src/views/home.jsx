import { React, useState } from "react";
import "../styles/listAllEvent.scss";
import "../styles/home.scss";
import EventGrid from "../components/eventGrid";

export default function home() {
  const elements = [...Array(8)];


  return (
    <>
      <section className="page-container">
        <div className="grid">
          <div className="mt-30">
            <h2>À la une</h2>
            <img src="https://placehold.co/856x295" alt="" />
          </div>
          <div>
            <EventGrid 
            title={"Prochainement"}
            listeElement={elements} 
            />
          </div>
        </div>
      </section>
    </>
  );
}
