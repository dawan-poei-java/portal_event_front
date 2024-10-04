import React, { useEffect, useMemo, useState } from "react";
import SideBar from "../components/sideBar";
import ClientInfomations from "../components/profileClient/clientInfomations";
import ClientReservations from "../components/profileClient/clientReservations";
import { Link, useNavigate } from "react-router-dom";
import ListGrid from "../components/admin/listGrid";
import Header from "../components/header";
import "../styles/admin.scss"
import ListUsers from "../components/admin/listUsers";
import ListEvents from "../components/admin/listEvents";
import { useApi } from "../hooks/useApi";


export default function Admin() {
  const [pageSelected, setPageSelected] = useState("Mes informations");
  const navigate = useNavigate()
  const {data : me, loading } = useApi("users/me")

  const listBtn = [
    "Mes informations",
    "Mes Réservations",
    "Liste des utilisateurs",
    "Liste des événements",
    "Liste des catégories",
    "Liste des villes"];


    useEffect(()=>{
      async function fetchMe(){
        try {
        await me
          if(me.role !== "ADMIN"){
            navigate("/not-found")
          }
        } catch (error) {
          
        }
      }
      fetchMe()

    },[loading])

  return (
    <>
    {loading ? <div class="loader"></div> : 
    
    <section className="page-container-client">
      <div className="sideBar">
        <SideBar listButton={listBtn} setPageSelected={setPageSelected} />
        
      </div>
      <div className="main-container">
        {pageSelected === "Mes informations" && <ClientInfomations />}
        {pageSelected === "Mes Réservations" && <ClientReservations />}
        {pageSelected === "Liste des événements" && <ListEvents page={pageSelected}  />}
        {pageSelected === "Liste des utilisateurs" && <ListUsers page={pageSelected}  />}
        {pageSelected === "Liste des catégories" && <ListGrid page={pageSelected} controller={"categories"}  />}
        {pageSelected === "Liste des villes" && <ListGrid page={pageSelected} controller={"cities"} />}
      </div>
    </section>
    }
    </>
  );
}
