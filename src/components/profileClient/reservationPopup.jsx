import React from "react";
import { Link } from "react-router-dom";
import city from "../../views/city";

export default function ReservationPopup({ reservation, setPopup }) {

  const event = reservation.event
  const pricing = reservation.pricing
  const user = reservation.user
  const reservationDate = new Date(
    reservation.date.toLocaleString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  ).toLocaleDateString(); 
  const startDate = new Date(
    reservation.event.startDate.toLocaleString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  ).toLocaleDateString(); 
  const endDate = new Date(
    reservation.event.endDate.toLocaleString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  ).toLocaleDateString(); 

  // const startTime =  event.startTime.toLocaleTimeString("fr-FR",{
  //   hour:"2-digit",
  //   minute :"2-digit",
  //   hour12:"false"
  // })
  // const endTime = event.endTime.toLocaleTimeString("fr-FR", {
  //   hour: "2-digit",
  //   minute: "2-digit",
  //   hour12: "false",
  // });

  
  
  
  
    function handleClick(){
        setPopup(false)
    }


  return (
    <>
      <div onClick={handleClick} id="overlay" className="overlay"></div>
      <div className="reservation-popup flex flex-col gap-5">
        <div>
          <div>
            <p>{event.typeEvent.name}</p>
          </div>
          <div className="flex justify-between">
            <h1>{event.title}</h1>
            <p className="text-lg">
              {event.organizer.firstName + " " + event.organizer.lastName}
            </p>
          </div>
          <div className="tags-container">
            <p className="tag">tag</p>
          </div>
        </div>
        <div className="flex justify-between w-full">
          <div className="event-location">
            <p id="">Lieu</p>
            <p id="address">{event.location} </p>
            <p>{event.address}, </p>
            <p>{event.complement}</p>
            <p>
              {event.city.name}
            </p>
          </div>
          <div className="event-date grid">
            <p>
              {startDate === endDate ? startDate : startDate + " " + endDate}
            </p>
            <p>
              {event.startTime} - {event.endTime}
            </p>
          </div>
        </div>
        <div>
          <p>{event.description}</p>
        </div>
        <Link to={"/cities/"+event.city.name+"/"+event.id}>Voir l'event</Link>
        <hr />
        <div className="">
          <p>reservation #{reservation.id}</p>
          <table className="w-full">
            <thead>
              <td>
                <th>Name</th>
              </td>
              <td>
                <th>Article</th>
              </td>
              <td>
                <th>Prix</th>
              </td>
              <td>
                <th>Date réservation</th>
              </td>
            </thead>
            <tbody>
              <tr>
                <td>
                  {user.firstName} {user.lastName}
                </td>
                <td>{pricing.name}</td>
                <td>{pricing.price} €</td>
                <td>{reservationDate}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
