import React from "react";
import "../styles/reservationClient.scss";
import SideBar from "../components/sideBar";

export default function ReservationClient() {
  const listButton = ["Mes informations", "Mes Réservations", "Se déconnecter"];
  const reservation = [...Array(6)];

  return (
    <section className="page-container-client">
      <div className="sideBar">
        <SideBar listButton={listButton} />
      </div>
      <div className="main-container">
        <h2>Mes réservations</h2>
        <div className="page-container">
          <table className="border">
            {reservation.map((reservation) => {
              return <tr>Test</tr>;
            })}
          </table>
        </div>
      </div>
    </section>
  );
}
