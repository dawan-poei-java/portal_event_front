import React, { useEffect, useState } from "react";
import { useApi } from "../../hooks/useApi";
import { FaPlusCircle, FaFilter } from "react-icons/fa";
import { Link } from "react-router-dom";
import EventForm from "./eventForm";

export default function EventOrga() {
  const { data: events } = useApi("/events/organizer");
  const [orgaEvents, setOrgaEvents] = useState(null);
  const [filteredEvents, setFilteredEvents] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [dropdownVisibility, setDropdownVisibility] = useState({});
  const [showEventForm, setShowEventForm] = useState(false);

  useEffect(() => {
    setOrgaEvents(events);
  }, [events]);

  useEffect(() => {
    if (orgaEvents) {
      const filteredResults = orgaEvents.filter((event) => {
        const matchesSearch =
          event.title.toLowerCase().includes(search.toLowerCase()) ||
          event.description.toLowerCase().includes(search.toLowerCase());

        const matchesFilter = filter === "" || event.typeEvent.name === filter;

        return matchesSearch && matchesFilter;
      });
      setFilteredEvents(filteredResults);
    }
  }, [search, filter, orgaEvents]);

  const handleFilterChange = (value) => {
    setFilter(value);
    setIsFilterOpen(!isFilterOpen);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const toggleDropdown = (eventId) => {
    setDropdownVisibility((prev) => ({
      ...prev,
      [eventId]: !prev[eventId],
    }));
  };

  return (
    <>
      <div className="overflow-x-auto">
        <div className="flex justify-between mb-4">
          <div className="flex px-4 py-3 rounded-md border-2 overflow-hidden max-w-[75%] mx-auto font-[sans-serif]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 192.904 192.904"
              width="16px"
              className="mr-3 rotate-90 fill-gray-600"
            >
              <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
            </svg>
            <input
              type="email"
              placeholder="Search Something..."
              className="w-full text-sm text-gray-600 bg-transparent outline-none"
              value={search}
              onChange={handleSearch}
            />
          </div>
          <div className="flex items-center">
            <button
              onClick={() => setShowEventForm(true)}
              className="flex items-center justify-between gap-4 px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-700"
            >
              <FaPlusCircle />
              Ajouter un événement
            </button>
            {showEventForm && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="relative p-6 bg-white rounded-lg max-h-[70vh] mt-10 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300">
                  <button
                    onClick={() => setShowEventForm(false)}
                    className="absolute text-gray-500 top-2 right-2 hover:text-gray-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                  <EventForm onClose={() => setShowEventForm(false)} />
                </div>
              </div>
            )}
            <div className="relative">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center justify-between gap-4 px-4 py-2 ml-2 text-white bg-green-500 rounded-md hover:bg-green-700"
              >
                <FaFilter />
                Filtrer
              </button>
              {isFilterOpen && (
                <select
                  className="absolute left-0 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg top-full"
                  onChange={(e) => handleFilterChange(e.target.value)}
                >
                  <option value="" selected={filter === ""}>
                    Tous les événements
                  </option>
                  <option value="concert" selected={filter === "concert"}>
                    Concerts
                  </option>
                  <option value="spectacle" selected={filter === "spectacle"}>
                    Spectacles
                  </option>
                  <option value="exposition" selected={filter === "exposition"}>
                    Expositions
                  </option>
                </select>
              )}
            </div>
          </div>
        </div>
        <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400 whitespace-nowrap">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-4 py-3">
                Event title
              </th>
              <th scope="col" className="px-4 py-3">
                Type
              </th>
              <th scope="col" className="px-4 py-3">
                Address
              </th>
              <th scope="col" className="px-4 py-3">
                Description
              </th>
              <th scope="col" className="px-4 py-3">
                Prices
              </th>
              <th scope="col" className="px-4 py-3">
                Date
              </th>
              <th scope="col" className="px-4 py-3">
                State
              </th>
              <th scope="col" className="px-4 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {orgaEvents &&
              filteredEvents &&
              filteredEvents.map((event) => (
                <tr key={event.id} className="border-b dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {event.title}
                  </th>
                  <td className="px-4 py-3">{event.typeEvent.name}</td>
                  <td className="px-4 py-3">{event.address}</td>
                  <td className="px-4 py-3">
                    {event.description.substring(0, 30)}
                  </td>
                  <td className="px-4 py-3">
                    {event.pricings && event.pricings.length > 0 ? (
                      <>
                        {Math.min(...event.pricings.map((p) => p.price))}€ -{" "}
                        {Math.max(...event.pricings.map((p) => p.price))}€
                      </>
                    ) : (
                      "Pas de prix"
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {new Date(event.startDate).toLocaleDateString("fr-FR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center h-full">
                      {event.state === "PUBLISHED" && (
                        <span className="top-0 left-0 inline-block w-auto px-2 py-1 font-semibold text-center text-white bg-green-400 rounded-md">
                          {event.state}
                        </span>
                      )}
                      {event.state === "CANCELLED" && (
                        <span className="top-0 left-0 inline-block w-auto px-2 py-1 font-semibold text-center text-white bg-red-400 rounded-md">
                          {event.state}
                        </span>
                      )}
                      {event.state === "WAITING" && (
                        <span className="top-0 left-0 inline-block w-auto px-2 py-1 font-semibold text-center text-white bg-yellow-400 rounded-md">
                          {event.state}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="relative flex items-center justify-end px-4 py-3">
                    <button
                      onClick={() => toggleDropdown(event.id)}
                      className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
                      type="button"
                    >
                      <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                      </svg>
                    </button>
                    <div
                      className={`z-10 ${
                        dropdownVisibility[event.id] ? "" : "hidden"
                      } absolute right-0 top-8 mt-2 bg-white divide-y divide-gray-100 rounded shadow w-44 dark:bg-gray-700 dark:divide-gray-600`}
                    >
                      <div
                        className="py-1 text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby="apple-imac-27-dropdown-button"
                      >
                        <div>
                          <Link
                            to={`/cities/Paris/${event.id}`}
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Afficher
                          </Link>
                        </div>
                        <div>
                          <Link
                            to="#"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Modifier
                          </Link>
                        </div>
                      </div>
                      <div className="py-1">
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                        >
                          Supprimer
                        </a>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
