import React, { useEffect, useState } from "react";
import "../styles/cart.scss";
import CartItem from "../components/cartItem";

export default function Cart() {

  const [cartItems, setCartItems] = useState()
  const [discountCode, setdiscountCode] = useState()
  let total = 0;

  useEffect(() => {
    setCartItems([
      { id: 1, name: "Festival de Cannes", price: 120.99, event_id: "EVT001" },
      { id: 2, name: "Fête de la Musique", price: 0, event_id: "EVT002" },
      { id: 3, name: "Marathon de Paris", price: 50, event_id: "EVT003" },
      {
        id: 4,
        name: "Festival des Vieilles Charrues",
        price: 90,
        event_id: "EVT004",
      },
      { id: 5, name: "Fête des Lumières", price: 30, event_id: "EVT005" },
    ]);
  

  }, [])
  

  return (
    <section id="cart-page" className="page-container">
      {/* <h3>Pannier</h3> */}

      <div className="split">
        <div className="item-list p-4 flex flex-col gap-4">
          {cartItems !=undefined  && (
            cartItems.map((item)=>{
              return(
                <CartItem items={item}/>
              )
            })
          )}
        </div>
        <div className="cart-sidebar flex flex-col gap-4">
          <div className="resume">
            <h5>Résumé</h5>
            <div>
              {cartItems != undefined && cartItems.map((e)=>{
                total +=e.price;
                return (<div className="grid grid-cols-2">
                  <p>1x {e.name}</p>
                  <p className="text-end">{e.price} €</p>
                </div>);
              })}
            </div>
          </div>
          <hr />
          <div className="pay grid gap-4">
            <div className="flex justify-between">
              <h5 className="font-bold">Total</h5>
              <p>{total} €</p>
            </div>
            <div className="discount flex gap-4">
              <input
                placeholder="Code promo"
                type="text"
                className="code border rounded-full px-2 py-1 w-9/12"
              />
              <button className="apply-discount rounded-full bg-black text-white w-3/12 px-2 py-1">
                Appliquer
              </button>
            </div>
            <button className="w-full rounded-full bg-black text-white py-1">
              Valider et payer
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
