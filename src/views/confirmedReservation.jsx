import React from "react";
import { Link } from "react-router-dom";

export default function confirmedReservation() {
  return (
    <div className="page-container flex flex-col items-center gap-5">
      <h3>Commande validée</h3>

      <h4> Vous pouvez revenir sur la page d'accueil</h4>
      <Link to={"/"} className="w-fit p-4 text-white bg-black rounded">
        Retour a l'accueil
      </Link>
    </div>
  );
}
