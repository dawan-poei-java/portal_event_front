import "../styles/home.scss";
import React, { useCallback, useEffect, useState } from "react";
import "../styles/listAllEvent.scss";
import EventCard from "../components/eventCard";
import EventGrid from "../components/eventGrid";
import SearchFilter from "../components/searchFilter";
import { useApi } from "../hooks/useApi";

export default function ListAllEvent() {
  const { data: allEvents, loadingEvent, errorEvent } = useApi("/events");
  const {
    data: allTypesEvent,
    loadingTypeEvent,
    errorTypeEvent,
  } = useApi("/typeEvents");
 

  const [selectedCategory, setSelectedCategory] = useState("Tout");
  const [filteredEvents, setFilteredEvents] = useState(allEvents);

  const handleFilterEvent = (events) => {
    setFilteredEvents(events);
  };

  useEffect(() => {
    handleFilterEvent(allEvents);
  }, [allEvents]);

  const handleChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <>
      <section className="page-container-allEvent pb-10">
        <h2>Tous les évènements</h2>
        <div className="flex justify-between mb-16 ">
          <SearchFilter
            eventsData={allEvents}
            onFilter={handleFilterEvent}
            selectedCategory={selectedCategory}
          />
          <div className="flex gap-2">
            <select
              onChange={handleChange}
              className="block w-full rounded-md border-0 px-1.5 py-1.5
              text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
              focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm
              sm:leading-6"
            >
              <option value="Tout">Tout</option>
              {allTypesEvent &&
                allTypesEvent.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name.charAt(0).toUpperCase() +
                      category.name.slice(1)}
                  </option>
                ))}
            </select>
          </div>
        </div>
        {/*         <div className="flex justify-between flex-warp warp event-container-soon">
          {filteredEvents &&
            filteredEvents.map((e) => {
              return <EventCard key={e.id} />;
            })}
        </div> */}

        {filteredEvents && <EventGrid listeElement={filteredEvents} />}
      </section>
    </>
  );
}
