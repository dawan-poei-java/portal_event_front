import React from "react";
import { useParams } from "react-router-dom";
import "../styles/event.scss";

export default function event() {
  const { eventId } = useParams();
  const guest = [];
  const image = "https://placehold.co/1440x400";

  const passes = [
    { id: 1, name: "Pass VIP", price: 150 },
    { id: 2, name: "Pass Standard", price: 75 },
    { id: 3, name: "Pass Étudiant", price: 50 },
  ];


  return (
    <>
      <div className="event-banner">
        <img src={image} alt="banner" />
      </div>
      <section id="event" className="page-container flex flex-col gap-10">
        <div>
          <div>
            <p>event.type</p>
          </div>
          <div className="flex justify-between">
            <h1>event.title</h1>
            <p className="text-lg">organize by</p>
          </div>
          <div className="tags-container">
            <p className="tag">tag</p>
          </div>
        </div>
        <div className="flex justify-between w-full">
          <div className="event-location">
            <p id="location">Lieu</p>
            <p id="address">adresse complement ville , zipcode</p>
          </div>
          <div className="event-date flex gap-6">
            <p>date</p>
            <p>heure</p>
          </div>
        </div>
        <div>
          <p>event.description</p>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque
            distinctio quasi velit sequi aperiam voluptate harum! Ipsum minus
            laboriosam laborum assumenda cumque. Voluptates maiores consectetur
            ex distinctio voluptas recusandae veritatis! Explicabo, ea. Eos
            necessitatibus reprehenderit maiores quo velit dolore voluptatum?
            Aperiam quasi ad incidunt qui consequatur, eveniet, repudiandae
            dolores cumque ipsa iusto recusandae eius impedit doloremque maiores
            officia facere facilis. Doloribus quibusdam minima nihil laborum at
            debitis praesentium facilis est consectetur atque vitae, ipsa soluta
            magnam cupiditate aliquid similique eum doloremque repudiandae
            eveniet quam placeat provident iure perspiciatis repellendus.
            Ducimus! Magnam aliquam ducimus deleniti magni, aspernatur quisquam
            deserunt quasi nobis veniam qui sequi. Rem consectetur tempore illo
            repellendus, dolore officia corporis, autem iure ea nulla assumenda
            ipsam, est sint voluptatem? Ullam blanditiis accusantium non
            voluptates iste nam harum enim omnis cumque maxime velit consequatur
            atque cum alias a reiciendis optio repudiandae, quae iure numquam!
            Quia quo mollitia nesciunt impedit nostrum.
          </p>
        </div>
        <div className="flex gap-4">
          {guest.length>0 && (
            <div className="w-full">
              <h3>Guests</h3>
              <div className="border rounded p-5">{guest.map((g)=><p>{g}</p>)}</div>
            </div>
          )}
          <div className="pricing-container">
            <h3>Billeterie</h3>
            <div className="border rounded p-5 flex flex-col gap-2">
              {passes.map((pass)=>{
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
          <div><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium enim quibusdam consequuntur rerum cum fugit, error similique. Voluptas incidunt explicabo beatae at vel, tenetur commodi? Magnam illo blanditiis animi rerum.
          Quia deleniti aut voluptates, dolor quibusdam deserunt asperiores. Pariatur vero natus aperiam repellat animi ullam! Ducimus eius totam odit animi veritatis ipsa tenetur sit? Libero animi similique fugit repellendus itaque?
          Earum quis eos assumenda inventore omnis architecto adipisci impedit veniam, fugit hic nulla repellendus laboriosam. Repellendus dolores quo sint voluptatibus culpa quae, nihil dignissimos, dolore vitae, nostrum repudiandae distinctio quas.
          Laudantium, asperiores ex impedit architecto obcaecati inventore voluptas eligendi deleniti amet adipisci hic totam illo vel doloremque, porro molestias nulla nobis! Neque fugiat quasi, nemo ex provident culpa in soluta?
          Tempora molestias ullam quibusdam aut quasi ab amet earum maxime temporibus consectetur laborum, cum iste eligendi exercitationem dolore dolorem officia quod ad commodi dolor natus repellendus impedit laudantium aspernatur. Officiis!</p></div>
        </div>
      </section>
    </>
  );
}
