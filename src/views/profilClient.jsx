import React from "react";
import "../styles/profilClient.scss";
import { Link } from "react-router-dom";

export default function ProfilClient() {
  return (
    <section className="page-container">
      <div>profilClient</div>
      <Link className="" to={"/logout"}>
        se déconnecter
      </Link>
    </section>
  );
}
