import React, { useEffect, useState } from "react";
import ReservationPopup from "./reservationPopup";
import { useApi } from "../../hooks/useApi";

export default function ClientReservations() {
  const { sendRequest } = useApi();

  const [reservations, setReservations] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState();
  const [selectedReservation, setSelectedReservation] = useState();

  const [popup, setPopup] = useState(false);

  //Récupère la réservation et l'event - puis ouvre la popup
  const isOpen = async (e) => {
    let res = reservations.find((item) => item.id == e.target.value);
    const event = await sendRequest("events/" + res.pricing.event.id, "GET");
    setSelectedReservation(res);
    setSelectedEvent(event);
    console.log("event", event);
    setPopup(true);
  };

  //Récupère les infos de l'user et ses réservaiton depuis la BDD
  useEffect(() => {
    async function fetchReservation() {
      const me = await sendRequest("/users/me", "GET");
      const response = await sendRequest("/reservations/user/" + me.id, "GET");

      setReservations(response);
    }
    fetchReservation();
  }, []);

  console.log("----------", reservations);

  return (
    <>
      <div
        id="client-reservation"
        className="page-container-profile  grid gap-10"
      >
        <h2>Mes réservations</h2>
        <table className="w-full text-sm text-left text-gray-500" border="1">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <th className="px-4 py-3">Intitullé</th>
            <th className="px-4 py-3">Prix (€)</th>
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3">Billet</th>
          </thead>
          <tbody>
            {reservations &&
              reservations.map((res) => {
                const formattedDate = new Date(
                  res.date.toLocaleString("fr-FR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                ).toLocaleString();
                console.log("date", formattedDate);
                return (
                  <tr key={res.id} className="border-b">
                    <td className="px-4 py-3">{res.pricing.name}</td>
                    <td className="px-4 py-3">{res.pricing.price}</td>
                    <td className="px-4 py-3">{formattedDate}</td>
                    <td className="px-4 py-3">
                      <button
                        value={res.id}
                        className="table-popup text-blue-400 underline"
                        onClick={isOpen}
                      >
                        Voir
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        {popup && (
          <ReservationPopup
            reservation={selectedReservation}
            setPopup={setPopup}
            event={selectedEvent}
          />
        )}
      </div>
    </>
  );
}
