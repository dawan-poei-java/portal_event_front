import React from "react";

import SideBar from "../components/sideBar";

export default function ListEventOrga() {
  const listButtonOrga = [
    "Mes informations",
    "Mes Réservations",
    "Mes Evenements",
    "Se déconnecter",
  ];

  const evenement = [...Array(6)];

  return (
    <section className="page-container-client">
      <div className="sideBar">
        <SideBar listButton={listButtonOrga} />
      </div>
      <div className="main-container">
        <h2>Mes évenements</h2>
        <div className="page-container">
          <table className="border">
            {evenement.map((evenement) => {
              return <tr>TestOrga</tr>;
            })}
          </table>
        </div>
      </div>
    </section>
  );
}
