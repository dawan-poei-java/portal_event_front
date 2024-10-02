import React, { useEffect, useMemo, useState } from "react";
import SideBar from "../components/sideBar";
import ClientInfomations from "../components/profileClient/clientInfomations";
import ClientReservations from "../components/profileClient/clientReservations";
import { Link } from "react-router-dom";
import ListGrid from "../components/admin/listGrid";
import Header from "../components/header";
import "../styles/admin.scss"
import ListUsers from "../components/admin/listUsers";
import ListEvents from "../components/admin/listEvents";

export default function Admin() {
  const [pageSelected, setPageSelected] = useState("Mes informations");

  const listBtn = [
    "Mes informations",
    "Mes Réservations",
    "Liste des utilisateurs",
    "Liste des événements",
    "Liste des catégories",
    "Liste des villes"];

  return (
    <section className="page-container-client">
      <div className="sideBar">
        <SideBar listButton={listBtn} setPageSelected={setPageSelected} />
        <Link className="" to={"/logout"}>
          Se déconnecter
        </Link>
      </div>
      <div className="main-container">
        {pageSelected === "Mes informations" && <ClientInfomations />}
        {pageSelected === "Mes Réservations" && <ClientReservations />}
        {pageSelected === "Liste des événements" && <ListEvents page={pageSelected}  />}
        {pageSelected === "Liste des utilisateurs" && <ListUsers page={pageSelected}  />}
        {pageSelected === "Liste des catégories" && <ListGrid page={pageSelected}  />}
        {pageSelected === "Liste des catégories" && <ListGrid page={pageSelected}  />}
      </div>
    </section>
  );
}
