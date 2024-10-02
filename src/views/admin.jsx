import React, { useEffect, useMemo, useState } from "react";
import SideBar from "../components/sideBar";
import ClientInfomations from "../components/profileClient/clientInfomations";
import ClientReservations from "../components/profileClient/clientReservations";
import { Link } from "react-router-dom";
import ListGrid from "../components/admin/listGrid";
import Header from "../components/header";

export default function Admin() {
  const api = "http://localhost:8080/api/";
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
        {pageSelected === "Liste des événements" && <ListGrid page={pageSelected} req={api + "events"} />}
        {pageSelected === "Liste des utilisateurs" && <ListGrid page={pageSelected} req={api + "users"} />}
        {pageSelected === "Liste des catégories" && <ListGrid page={pageSelected} req={api + "categories"} />}
        {pageSelected === "Liste des catégories" && <ListGrid page={pageSelected} req={api + "categories"} />}
      </div>
    </section>
  );
}
