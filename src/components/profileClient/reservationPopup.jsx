import React from "react";
import { Link } from "react-router-dom";

export default function ReservationPopup({ e, setPopup }) {

    function handleClick(){
        setPopup(false)
    }


  return (
    <>
      <div onClick={handleClick} id="overlay" className="overlay"></div>
      <div className="reservation-popup flex flex-col gap-5">
        <div>
          <div>
            <p>event.type</p>
          </div>
          <div className="flex justify-between">
            <h1>event.title</h1>
            <p className="text-lg">organize by</p>
          </div>
          <div className="tags-container">
            <p className="tag">tag</p>
          </div>
        </div>
        <div className="flex justify-between w-full">
          <div className="event-location">
            <p id="location">Lieu</p>
            <p id="address">adresse complement ville , zipcode</p>
          </div>
          <div className="event-date flex gap-6">
            <p>date</p>
            <p>heure</p>
          </div>
        </div>
        <div>
          <p>event.description</p>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque
            distinctio quasi velit sequi aperiam voluptate harum! Ipsum minus
            laboriosam laborum assumenda cumque. Voluptates maiores consectetur
            ex distinctio voluptas recusandae veritatis! 
          </p>
        </div>
        <Link>Voir l'event</Link>
        <hr />
        <div>
          <p>reservation : </p>
          <div className="grid grid-col-2">
            <p>user.name</p>
            <p>date</p>
            <p>{e.name}</p>
            <p>{e.price}</p>
          </div>
        </div>
      </div>
    </>
  );
}
