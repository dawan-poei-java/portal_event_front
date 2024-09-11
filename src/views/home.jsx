import { React, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
import "../styles/variables.scss"
import "../styles/home.scss"
import EventCard from "../components/eventCard";

export default function home() {

  const elements = [...Array(8)]

  return (
    <>
      <section>
        <div className="page-container grid gap-36 ">
          <div className="mt-40">

          <h2 >À la une</h2>
          <img src="https://placehold.co/856x295" alt="" />
          </div>
          <div>

          <h2 >Prochainement</h2>
          <div className="flex flex-warp warp event-container-soon">
          {elements.map((elements)=>{
            return((<EventCard/>))
          })}
          </div>
          </div>
        </div>
      </section>
    </>
  );
}
