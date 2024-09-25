import React, { useEffect, useState } from "react";

import SideBar from "../components/sideBar";

export default function ListEventOrga() {
  const listButtonOrga = [
    "Mes informations",
    "Mes Réservations",
    "Mes Evenements",
    "Se déconnecter",
  ];

  const [evenements, setEvenements] = useState([]);
  const [formState, setFormState] = useState({
    title: "",
    description: "",
    date: "",
    editingIndex: null,
  });

  useEffect(() => {
    setEvenements([
      {
        id: 1,
        title: "Concert de Jazz",
        date: "2024-10-05",
        description: "Un concert de jazz avec des musiciens talentueux.",
        category: "Concert",
      },
      {
        id: 2,
        title: "Spectacle de Magie",
        date: "2024-10-12",
        description:
          "Un spectacle de magie époustouflant pour petits et grands.",
        category: "Spectacle",
      },
      {
        id: 3,
        title: "Festival de Rock",
        date: "2024-11-20",
        description:
          "Le meilleur du rock avec des groupes locaux et internationaux.",
        category: "Concert",
      },
      {
        id: 4,
        title: "Pièce de Théâtre",
        date: "2024-09-30",
        description: "Une pièce classique revisitée par une troupe moderne.",
        category: "Spectacle",
      },
      {
        id: 5,
        title: "Concert Symphonique",
        date: "2024-12-01",
        description:
          "Une soirée avec un orchestre symphonique de renommée mondiale.",
        category: "Concert",
      },
      {
        id: 6,
        title: "Spectacle de Danse Contemporaine",
        date: "2024-10-15",
        description:
          "Un spectacle de danse mettant en lumière des chorégraphes innovants.",
        category: "Spectacle",
      },
    ]);
  }, []);
  console.log(evenements);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEvent = {
      title: formState.title,
      description: formState.description,
      date: formState.date,
    };

    if (formState.editingIndex !== null) {
      const updatedEvents = [...evenements];
      updatedEvents[formState.editingIndex] = newEvent;
      setEvenements(updatedEvents);
    } else {
      // Ajout d'un nouvel event
      setEvenements([...evenements, newEvent]);
    }

    // Reset du form

    setFormState({
      title: "",
      description: "",
      date: "",
      editingIndex: null,
    });
  };

  // modif event

  const handleEdit = (index) => {
    const eventToEdit = evenements[index];
    setFormState({
      title: eventToEdit.title,
      description: eventToEdit.description,
      date: eventToEdit.date,
      editingIndex: index,
    });
  };

  //supp event

  const handleDelete = (index) => {
    const updatedEvents = evenements.filter((_, i) => i !== index);
    setEvenements(updatedEvents);
  };

  return (
    <section className="page-container-client">
      <div className="sideBar">
        <SideBar listButton={listButtonOrga} />
      </div>
      <div className="main-container">
        <h2>Mes évenements</h2>
        <div className="page-container">
          <table className="border">
            <thead>
              <tr>
                <th>Titre</th>
                <th>Description</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {evenements.length > 0 &&
                evenements.map((evenement, index) => (
                  <tr key={index}>
                    <td>{evenement.title || "Titre par défaut"}</td>
                    <td>{evenement.description || "Description par défaut"}</td>
                    <td>{evenement.date || "Date par défaut"}</td>
                    <td>
                      <button onClick={() => handleEdit(index)}>
                        Modifier
                      </button>
                      <button onClick={() => handleDelete(index)}>
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <h3>
          {formState.editingIndex !== null ? "Modifier" : "Ajouter"} un
          événement
        </h3>
        <form onSubmit={handleSubmit}>
          <label>
            Titre :
            <input
              type="text"
              value={formState.title}
              onChange={(e) =>
                setFormState({ ...formState, title: e.target.value })
              }
              required
            />
          </label>
          <br />
          <label>
            Description :
            <textarea
              value={formState.description}
              onChange={(e) =>
                setFormState({ ...formState, description: e.target.value })
              }
              required
            />
          </label>
          <br />
          <label>
            Date :
            <input
              type="date"
              value={formState.date}
              onChange={(e) =>
                setFormState({ ...formState, date: e.target.value })
              }
              required
            />
          </label>
          <br />
          <button type="submit">
            {formState.editingIndex !== null ? "Modifier" : "Ajouter"}
          </button>
        </form>
      </div>
    </section>
  );
}
