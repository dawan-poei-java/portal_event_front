import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import "../styles/event.scss";
import { useApi } from "../hooks/useApi";

export default function event() {
  const { eventId } = useParams();
  const { data: event, loading } = useApi("/events/" + eventId);
  const guest = [];
  const [images, setImages] = useState(
    "https://placehold.co/1920x1080",
    "https://placehold.co/1920x1081",
    "https://placehold.co/1920x1082"
  );
  const [selectedImg, setSelectedImg] = useState(0);

  function changeImgUp() {
    if (selectedImg === images.length - 1) {
      setSelectedImg(0);
    } else {
      setSelectedImg(selectedImg + 1);
    }
  }
  function changeImgDown() {
    if (selectedImg <= 0) {
      setSelectedImg(images.length - 1);
    } else {
      setSelectedImg(selectedImg - 1);
    }
  }

  const passes = [
    { id: 1, name: "Pass VIP", price: 150 },
    { id: 2, name: "Pass Standard", price: 75 },
    { id: 3, name: "Pass Étudiant", price: 50 },
  ];

  useEffect(() => {
    if (event && event.images && event.images.length > 0) {
      setImages(event.images);
      setSelectedImg(0);
    }
  }, [event]);

  return (
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
              <div className="p-1 bg-white rounded-full" onClick={changeImgUp}>
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
                {event.typeEvent.name.charAt(0).toUpperCase() +
                  event.typeEvent.name.slice(1)}
              </p>
            </div>
            <div className="flex justify-between">
              <h1>{event.title}</h1>
              <p className="text-lg">
                organized by
                {" " +
                  event.organizer.firstName +
                  " " +
                  event.organizer.lastName}
              </p>
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
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque
              distinctio quasi velit sequi aperiam voluptate harum! Ipsum minus
              laboriosam laborum assumenda cumque. Voluptates maiores
              consectetur ex distinctio voluptas recusandae veritatis!
              Explicabo, ea. Eos necessitatibus reprehenderit maiores quo velit
              dolore voluptatum? Aperiam quasi ad incidunt qui consequatur,
              eveniet, repudiandae dolores cumque ipsa iusto recusandae eius
              impedit doloremque maiores officia facere facilis. Doloribus
              quibusdam minima nihil laborum at debitis praesentium facilis est
              consectetur atque vitae, ipsa soluta magnam cupiditate aliquid
              similique eum doloremque repudiandae eveniet quam placeat
              provident iure perspiciatis repellendus. Ducimus! Magnam aliquam
              ducimus deleniti magni, aspernatur quisquam deserunt quasi nobis
              veniam qui sequi. Rem consectetur tempore illo repellendus, dolore
              officia corporis, autem iure ea nulla assumenda ipsam, est sint
              voluptatem? Ullam blanditiis accusantium non voluptates iste nam
              harum enim omnis cumque maxime velit consequatur atque cum alias a
              reiciendis optio repudiandae, quae iure numquam! Quia quo mollitia
              nesciunt impedit nostrum.
            </p>
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
                {passes.map((pass) => {
                  return (
                    <div
                      key={pass.id}
                      className="grid grid-cols-3 justify-items-end"
                    >
                      <p className="w-full">{pass.name}</p>
                      <p className="text-end">{pass.price}€</p>
                      <button className="add-cart">Ajouter</button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div>
            <h3>Prestations</h3>
            <div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Laudantium enim quibusdam consequuntur rerum cum fugit, error
                similique. Voluptas incidunt explicabo beatae at vel, tenetur
                commodi? Magnam illo blanditiis animi rerum. Quia deleniti aut
                voluptates, dolor quibusdam deserunt asperiores. Pariatur vero
                natus aperiam repellat animi ullam! Ducimus eius totam odit
                animi veritatis ipsa tenetur sit? Libero animi similique fugit
                repellendus itaque? Earum quis eos assumenda inventore omnis
                architecto adipisci impedit veniam, fugit hic nulla repellendus
                laboriosam. Repellendus dolores quo sint voluptatibus culpa
                quae, nihil dignissimos, dolore vitae, nostrum repudiandae
                distinctio quas. Laudantium, asperiores ex impedit architecto
                obcaecati inventore voluptas eligendi deleniti amet adipisci hic
                totam illo vel doloremque, porro molestias nulla nobis! Neque
                fugiat quasi, nemo ex provident culpa in soluta? Tempora
                molestias ullam quibusdam aut quasi ab amet earum maxime
                temporibus consectetur laborum, cum iste eligendi exercitationem
                dolore dolorem officia quod ad commodi dolor natus repellendus
                impedit laudantium aspernatur. Officiis!
              </p>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
