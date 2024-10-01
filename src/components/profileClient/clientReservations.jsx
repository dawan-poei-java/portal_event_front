import React, { useEffect, useState } from 'react'
import ReservationPopup from './reservationPopup';
import { useApi } from '../../hooks/useApi';

export default function ClientReservations() {

  const { data: reservations,loading } = useApi("/reservations/user/"+ sessionStorage.getItem("userId")
  );
    const [clickedReservation, setClickedReservation] = useState()
    const [popup,setPopup] =useState(false);
    const isOpen = (e) =>{
      setClickedReservation(reservations.find((item)=>item.id == e.target.value))

        setPopup(true)
    }



  return (
    <>
      <div
        id="client-reservation"
        className="page-container-profile grid gap-10"
      >
        <h2>Mes réservations</h2>
        <table className="table" border="1">
          <thead>
            <tr className="heading-row">
              <th>Intitullé</th>
              <th>Prix (€)</th>
              <th>Date</th>
              <th>Billet</th>
            </tr>
          </thead>
          <tbody>
            {reservations &&
              reservations.map((e) => {
                const formattedDate = new Date(
                  e.date.toLocaleString("fr-FR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                ).toLocaleString();
                console.log("date",formattedDate)
                return (
                  <tr key={e.id} className="body-row">
                    <td>{e.event.title}</td>
                    <td>{e.pricing.price}</td>
                    <td>{formattedDate}</td>
                    <td>
                      <button value={e.id} className="table-popup" onClick={isOpen}>
                        Voir
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        {popup && <ReservationPopup reservation={clickedReservation} setPopup={setPopup} />}
      </div>
    </>
  );
}
