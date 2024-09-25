import React, { useState } from "react";
import "../styles/profilClient.scss";
import SideBar from "../components/sideBar";
import ClientInfomations from "../components/profileClient/clientInfomations";
import ClientReservations from "../components/profileClient/clientReservations";
import { Link } from "react-router-dom";


export default function ProfilClient() {
  const listBtn = ["Mes informations", "Mes Réservations", "Se déconnecter"];
  const [pageSelected, setPageSelected] = useState("Mes informations");

  return (
    <section className="page-container-client">
      <div className="sideBar">
        <SideBar listButton={listBtn} setPageSelected={setPageSelected} />
      </div>
      <div className="main-container">
        {pageSelected === "Mes informations" && <ClientInfomations />}
        {pageSelected === "Mes Réservations" && <ClientReservations/>}
      </div>
       <Link className="" to={"/logout"}>
        se déconnecter
      </Link>
    </section>
  );
}
