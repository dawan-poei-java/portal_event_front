import React, { useEffect, useState } from 'react'
import ReservationPopup from './reservationPopup';

export default function ClientReservations() {

    const [events,setEvents] = useState();
    const [popup,setPopup] =useState(false)

    const isOpen = () =>{
        setPopup(true)
    }

    useEffect(()=>{
        setEvents([
          {
            id: 1,
            name: "John Doe",
            price: 100,
            date: "2024-10-01",
            event_id: "EVT1001",
          },
          {
            id: 2,
            name: "Jane Smith",
            price: 75,
            date: "2024-11-15",
            event_id: "EVT1002",
          },
          {
            id: 3,
            name: "Paul Martin",
            price: 120,
            date: "2024-12-30",
            event_id: "EVT1003",
          },
          {
            id: 4,
            name: "Anna Johnson",
            price: 80,
            date: "2024-10-05",
            event_id: "EVT1004",
          },
          {
            id: 5,
            name: "Mark Wilson",
            price: 95,
            date: "2024-11-20",
            event_id: "EVT1005",
          },
        ]);
    },[])

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
            {events !== undefined &&
              events.map((e) => {
                return (
                  <tr key={e.id} className="body-row">
                    <td>{e.name}</td>
                    <td>{e.price}</td>
                    <td>{e.date}</td>
                    <td>
                      <button className="table-popup" onClick={isOpen}>
                        Voir
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        {popup && <ReservationPopup e={events} setPopup={setPopup} />}
      </div>
    </>
  );
}
