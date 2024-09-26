import React, { useEffect, useState } from "react";
import "../styles/cart.scss";
import CartItem from "../components/cartItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

export default function Cart() {
  const [cartItems, setCartItems] = useState();
  const [discountCode, setdiscountCode] = useState([]);
  const [selectedDiscountCode, setSelectedDiscountCode] = useState();
  const [inputValue, setInputValue] = useState("");
  const [invalidCode, setInvalidCode] = useState(false);
  const [cartPrice, setCartPrice] = useState(0);
  const [cartFinalPrice, setCartFinalPrice] = useState(0);

  function handleChange(e) {
    setInputValue(e.target.value);
  }

  function deleteDiscount(){
    setSelectedDiscountCode()
    setCartFinalPrice(cartPrice)
  }

  function handleDiscountCode() {
    let codefound = discountCode.find(
      (code) => code.name === inputValue.toLocaleUpperCase()
    );
    if (codefound !== undefined) {
      setSelectedDiscountCode(codefound);
      setInvalidCode(false);
      setInputValue("");
      setCartFinalPrice(cartPrice - (cartPrice * codefound.discount) / 100);
    } else {
      setInvalidCode(true);
    }
  }


  useEffect(() => {
    let sum =
      cartItems !== undefined &&
      cartItems.reduce((sum, event) => sum + event.price, 0);
    setCartPrice(sum);
    setCartFinalPrice(sum);
  }, [cartItems]);

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
    setdiscountCode([
      { id: 1, name: "SUMMER2024", discount: 20 },
      { id: 2, name: "WELCOME10", discount: 10 },
      { id: 4, name: "BLACKFRIDAY", discount: 50 },
      { id: 5, name: "CYBERMONDAY", discount: 30 },
    ]);
  }, []);

  return (
    <section id="cart-page" className="page-container">
      {/* <h3>Pannier</h3> */}

      <div className="split">
        <div className="item-list p-4 flex flex-col gap-4">
          {cartItems != undefined &&
            cartItems.map((item) => {
              return <CartItem items={item} />;
            })}
        </div>
        <div className="cart-sidebar flex flex-col gap-4">
          <div className="resume">
            <h5>Résumé</h5>
            <div>
              {cartItems != undefined &&
                cartItems.map((e) => {
                  return (
                    <div className="grid grid-cols-2">
                      <p>1x {e.name}</p>
                      <p className="text-end">{e.price} €</p>
                    </div>
                  );
                })}
            </div>
          </div>
          <hr />
          <div className="pay grid gap-4">
            <div className="discount-list">
              {selectedDiscountCode != undefined && (
                <div className="flex justify-between">
                  <div className="flex gap-4 items-center">
                    <FontAwesomeIcon icon={faX} onClick={deleteDiscount}/>
                    <p>{selectedDiscountCode.name}</p>
                  </div>
                  <p>-{selectedDiscountCode.discount} %</p>
                </div>
              )}
            </div>
            <div className="flex justify-between">
              <h5 className="font-bold">Total</h5>
              <p>{cartFinalPrice && cartFinalPrice.toFixed(2)} €</p>
            </div>
            <div>
              <p className={invalidCode ? "text-red-500" : "hidden"}>
                Code promo invalide
              </p>
              <div className="discount flex gap-4">
                <input
                  placeholder="Code promo"
                  type="text"
                  id="discount-code"
                  onChange={handleChange}
                  value={inputValue}
                  className="code border rounded-full px-2 py-1 w-9/12"
                />
                <button
                  onClick={handleDiscountCode}
                  className="apply-discount rounded-full w-fit bg-black text-white w-3/12 px-3 py-1"
                >
                  Appliquer
                </button>
              </div>
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
