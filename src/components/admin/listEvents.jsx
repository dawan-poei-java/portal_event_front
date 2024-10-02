import React, { useEffect, useState } from "react";
import { useApi } from "../../hooks/useApi";

export default function ListEvents({ page }) {
  const { data: events, loading } = useApi("/events");
  const {sendRequest} = useApi()
  const [filteredEvents, setFilteredEvents] = useState([]);


   const updateState = async (e) => {
     const eventId = e.target.getAttribute("data-value"); // Récupérer l'id de l'événement
     const newState = e.target.value; // Récupérer la nouvelle valeur de l'état

     // Mettre à jour l'état localement
     setFilteredEvents((prevEvents) =>
       prevEvents.map((event) =>
         event.id === parseInt(eventId) ? { ...event, state: newState } : event
       )
     );

     // Envoyer la requête à l'API pour mettre à jour la BDD
     try {
      let data = JSON.stringify({ state: newState });
       const response = await sendRequest("events","POST",data)

       if (!response.ok) {
         throw new Error("Erreur lors de la mise à jour de l'état.");
       }

       console.log("État mis à jour avec succès.");
     } catch (error) {
       console.error("Erreur:", error);
     }
   };

   console.log(filteredEvents && filteredEvents[0]);

  const handleChange = e =>{
    if (e.target.value =="ALL"){

      setFilteredEvents(events)
    }
    else{

      setFilteredEvents(events.filter((item)=>item.state == e.target.value))
    }
  }
  useEffect(()=>{
    setFilteredEvents(events)
  },[loading])




  return (
    <div id="grid-event" className="page-container-profile  grid gap-10">
      <h3>{page}</h3>
      <select name="filterStatus" id="filter" onChange={handleChange}>
        <option value="ALL">Filtrer</option>
        <option value="CANCELLED">CANCELLED</option>
        <option value="PUBLISHED">PUBLISHED</option>
        <option value="WAITING">WAITING</option>
      </select>
      
      <div className="overflow-x-auto w-full">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <th className="px-4 py-3">id</th>
            <th className="px-4 py-3">Titre</th>
            <th className="px-4 py-3">Description</th>
            <th className="px-4 py-3">Type</th>
            <th className="px-4 py-3">Lieu</th>
            <th className="px-4 py-3">Ville</th>
            <th className="px-4 py-3">Organisateur</th>
            <th className="px-4 py-3">State</th>
          </thead>
          <tbody>
            {filteredEvents &&
              filteredEvents.map((event ,  i) => (
                <tr key={i} className="border-b">
                  <td className="px-4 py-3">{event.id}</td>
                  <td className="px-4 py-3">{event.title}</td>
                  <td className="px-4 py-3">{event.description}</td>
                  <td className="px-4 py-3">{event.typeEvent.name}</td>
                  <td className="px-4 py-3">{event.location}</td>
                  <td className="px-4 py-3">{event.city.name}</td>
                  <td className="px-4 py-3">
                    {event.organizer.firstName +" " + event.organizer.lastName}
                  </td>
                  <td className="px-4 py-3">
                    <select name="state" id={event.id} data-value={event.id} value={event.state} className="dropdown" onChange={updateState}>
                      <option value="CANCELLED">CANCELLED</option>
                      <option value="PUBLISHED">PUBLISHED</option>
                      <option value="WAITING">WAITING</option>
                    </select>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
