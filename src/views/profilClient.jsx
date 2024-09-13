import React, { useState } from "react";
import "../styles/profilClient.scss";
import SideBar from "../components/sideBar"

export default function ProfilClient() {

  const listBtn = ["Mes informations", "Mes Réservations", "Se déconnecter"];
  const [isChecked, setIsChecked] = useState(false);

 const handleCheckboxChange = (event) => {
   setIsChecked(event.target.checked);
   console.log("first")
 };

  return (
    <section className="page-container-client">
      <div className="sideBar">
        <SideBar listButton={listBtn} />
      </div>
      <div className="main-container">
        <div className="page-container-profile grid gap-10">
          <div className="profile-heading flex items-center gap-10">
            <div className="profile-picture  rounded-full w-44 h-44 bg-black ">
              <img src="" alt="pp" />
            </div>
            <h2 className="text-5xl">Enzo</h2>
          </div>
          <h2 className="text-3xl">Info perso</h2>
          <div className="profile-info border p-9">
            <div className="grid gap-4 grid-cols-2 grid-rows-* mt-4 w-4/6">
              <div className="flex flex-col ">
                <label htmlFor="">Nom</label>
                <input disabled type="text" className="border" />
              </div>

              <div className="grid">
                <label htmlFor="">Prénom</label>
                <input disabled type="text" className="border" />
              </div>

              <div className="grid">
                <label htmlFor="">Adresse mail</label>

                <input type="email" className="border " />
              </div>
              <div className="grid">
                <label htmlFor="">Tel</label>
                <input type="tel" className="border" />
              </div>
              <div className="grid">
                <label htmlFor="">Date de naissance</label>
                <input type="mail" className="border" />
              </div>
              <button className="bg-blue-500 text-white h-8">
                Changer de mot de passe
              </button>
            </div>
          </div>
          <h2 className="text-3xl">Adresses</h2>
          <div className="profile-info border p-9">
            <div className="grid gap-4 grid-cols-2 grid-rows-* mt-4 w-full justify-between">
              <div>
                <h3 className="mb-4">Addresse de livraison</h3>
                <div className="flex flex-col ">
                  <label htmlFor="">Rue</label>
                  <input type="text" className="border" />
                </div>
                <div className="flex flex-col ">
                  <label htmlFor="">Complément</label>
                  <input type="text" className="border" />
                </div>
                <div className="flex flex-col ">
                  <label htmlFor="">Ville</label>
                  <input type="text" className="border" />
                </div>
                <div className="flex flex-col ">
                  <label htmlFor="">Code postal</label>
                  <input type="text" className="border" />
                </div>
                <div className="flex flex-col items-start">
                  <label htmlFor="">Adresse de facturation identique</label>
                  <input
                    type="checkbox"
                    className="border"
                    onClick={handleCheckboxChange}
                  />
                </div>
              </div>
              {!isChecked && (
                <div>
                  <h3 className="mb-4">Addresse de facturation</h3>
                  <div className="flex flex-col ">
                    <label htmlFor="">Rue</label>
                    <input type="text" className="border" />
                  </div>
                  <div className="flex flex-col ">
                    <label htmlFor="">Complément</label>
                    <input type="text" className="border" />
                  </div>
                  <div className="flex flex-col ">
                    <label htmlFor="">Ville</label>
                    <input type="text" className="border" />
                  </div>
                  <div className="flex flex-col ">
                    <label htmlFor="">Code postal</label>
                    <input type="text" className="border" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
