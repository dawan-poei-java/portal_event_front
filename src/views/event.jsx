import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import "../styles/event.scss";
import { useApi } from "../hooks/useApi";
import cartService from "../services/cart";

export default function event() {
  const { city, eventId } = useParams(); // Récupère les paramètres de la route comme 'city' et 'eventId'

  // Utilise un hook personnalisé 'useApi' pour récupérer les données de l'événement
  const {
    data: event,
    loading,
    error,
  } = useApi("/events/city/" + city + "/" + eventId);

  const navigate = useNavigate(); // Hook pour naviguer entre les pages

  const guest = []; // Tableau pour stocker les invités (vide ici)

  // Utilise un state pour gérer les images de l'événement
  const [images, setImages] = useState(
    "https://placehold.co/1920x1080",
    "https://placehold.co/1920x1081",
    "https://placehold.co/1920x1082"
  );
  // State pour l'image actuellement sélectionnée
  const [selectedImg, setSelectedImg] = useState(0);

  // Fonction pour changer l'image dans un carrousel en remontant
  function changeImgUp() {
    if (selectedImg === images.length - 1) {
      setSelectedImg(0);
    } else {
      setSelectedImg(selectedImg + 1);
    }
  }

  // Fonction pour changer l'image dans un carrousel en descendant
  function changeImgDown() {
    if (selectedImg <= 0) {
      setSelectedImg(images.length - 1);
    } else {
      setSelectedImg(selectedImg - 1);
    }
  }

  // Utilise useEffect pour vérifier si l'événement existe après que les données sont chargées
  useEffect(() => {
    if (event && loading) {
      let eventFounded = event.some((item) => item.id === eventId);
      console.log(eventFounded);
      if (!eventFounded) {
        navigate("/not-found");
      }
    } else if (error) {
      navigate("/not-found");
    }
  }, [eventId, navigate, loading]);

  // Si les données de l'événement changent, met à jour les images affichées
  useEffect(() => {
    if (event) {
      setImages(event.images);
    }
  }, [loading]);

  // Utilise useEffect pour mettre à jour l'image sélectionnée lorsqu'on charge les images d'un événement
  useEffect(() => {
    if (event && event.images && event.images.length > 0) {
      setImages(event.images);
      setSelectedImg(0);
    }
  }, [event]);

  console.log(event && event.pricings);

  // Fonction pour ajouter un billet au panier lors d'un clic sur un bouton
  const handleClick = (e) => {
    cartService.addToCart(
      event.pricings.find((item) => item.id == e.target.value) // Trouve le billet sélectionné et l'ajoute au panier
    );
    console.log("added");
  };

  return (
    <>
      {event && (
        <>
          <div className="blank"></div>
          {images.length > 0 && (
            <div
              className="event-banner"
              style={{ backgroundImage: `url(${images[selectedImg]})` }}
            >
              {images.length > 1 && (
                <>
                  <div
                    className="p-1 bg-white rounded-full"
                    onClick={changeImgDown}
                  >
                    <FontAwesomeIcon
                      className="-rotate-90 fa-2xl "
                      icon={faChevronUp}
                    />
                  </div>
                  <div
                    className="p-1 bg-white rounded-full"
                    onClick={changeImgUp}
                  >
                    <FontAwesomeIcon
                      className="rotate-90 fa-2xl"
                      icon={faChevronUp}
                    />
                  </div>
                </>
              )}
            </div>
          )}
          {!loading && (
            <section id="event" className="flex flex-col gap-10 page-container">
              <div>
                <div>
                  <p>
                    {event &&
                      event.typeEvent.name.charAt(0).toUpperCase() +
                        event.typeEvent.name.slice(1)}
                  </p>
                </div>
                <div className="flex justify-between">
                  <h1>{event && event.title}</h1>
                  <div className="flex gap-3 items-center">
                    <p>Organisé par</p>
                    <p className="text-lg">
                      {" " +
                        event.organizer.firstName +
                        " " +
                        event.organizer.lastName}
                    </p>
                  </div>
                </div>
                <div className="tags-container">
                  <p className="tag">tag</p>
                </div>
              </div>
              <div className="flex justify-between w-full">
                <div className="event-location">
                  <p id="location">Lieu</p>
                  <p id="address">
                    {event.address} {event.addressComplement} , {event.zipCode}
                  </p>
                </div>
                <div className="flex gap-6 event-date">
                  <p>
                    {new Date(event.startDate).toLocaleDateString("fr-FR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </p>
                  <p>{event.startTime}</p>
                </div>
              </div>
              <div>
                <p>{event.description}</p>
              </div>
              <div className="flex gap-4">
                {guest.length > 0 && (
                  <div className="w-full">
                    <h3>Guests</h3>
                    <div className="p-5 border rounded">
                      {guest.map((g) => (
                        <p>{g}</p>
                      ))}
                    </div>
                  </div>
                )}
                <div className="pricing-container">
                  <h3>Billeterie</h3>
                  <div className="flex flex-col gap-2 p-5 border rounded">
                    {event.pricings.map((pass) => {
                      return (
                        <div
                          key={pass.id}
                          className="grid grid-cols-3 justify-items-end"
                        >
                          <p className="w-full">{pass.name}</p>
                          <p className="text-end">{pass.price}€</p>
                          <button
                            value={pass.id}
                            className="add-cart"
                            onClick={handleClick}
                          >
                            Ajouter
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              {/* <div>
                <h3>Prestations</h3>
                <div>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Laudantium enim quibusdam consequuntur rerum cum fugit,
                    error similique. Voluptas incidunt explicabo beatae at vel,
                    tenetur commodi? Magnam illo blanditiis animi rerum. Quia
                    deleniti aut voluptates, dolor quibusdam deserunt
                    asperiores. Pariatur vero natus aperiam repellat animi
                    ullam! Ducimus eius totam odit animi veritatis ipsa tenetur
                    sit? Libero animi similique fugit repellendus itaque? Earum
                    quis eos assumenda inventore omnis architecto adipisci
                    impedit veniam, fugit hic nulla repellendus laboriosam.
                    Repellendus dolores quo sint voluptatibus culpa quae, nihil
                    dignissimos, dolore vitae, nostrum repudiandae distinctio
                    quas. Laudantium, asperiores ex impedit architecto obcaecati
                    inventore voluptas eligendi deleniti amet adipisci hic totam
                    illo vel doloremque, porro molestias nulla nobis! Neque
                    fugiat quasi, nemo ex provident culpa in soluta? Tempora
                    molestias ullam quibusdam aut quasi ab amet earum maxime
                    temporibus consectetur laborum, cum iste eligendi
                    exercitationem dolore dolorem officia quod ad commodi dolor
                    natus repellendus impedit laudantium aspernatur. Officiis!
                  </p>
                </div>
              </div> */}
            </section>
          )}
        </>
      )}
    </>
  );
}
