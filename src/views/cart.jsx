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
  function handleDelete(e) {
    const updateItems = cartItems.filter(
      (item) => item.id !== parseInt(e.target.value)
    );
    setCartItems(updateItems);
  }

  function deleteDiscount() {
    setSelectedDiscountCode();
    setCartFinalPrice(cartPrice);
  }

  function handleDiscountCode() {
    let codefound = discountCode.find(
      (code) => code.name === inputValue.toLocaleUpperCase()
    );
    if (codefound) {
      setSelectedDiscountCode(codefound); // Mémorise le code sélectionné
      setInvalidCode(false); // Pas d'erreur, le code est valide
      setInputValue(""); // Réinitialise le champ de saisie
    } else {
      setInvalidCode(true); // Affiche l'erreur si le code est invalide
    }
  }


  useEffect(() => {
    if (cartItems) {
      let sum = cartItems.reduce((acc, item) => acc + item.price, 0); // Somme des prix des items

      setCartPrice(sum); // Mets à jour le prix total du panier

      // Si un code promo est sélectionné, applique la réduction
      if (selectedDiscountCode) {
        let discountedPrice = sum - (sum * selectedDiscountCode.discount) / 100;
        setCartFinalPrice(discountedPrice > 0 ? discountedPrice : 0); // S'assure que le prix ne soit pas négatif
      } else {
        setCartFinalPrice(sum); // Si pas de code promo, le prix final est égal au prix total
      }
    }
  }, [cartItems, selectedDiscountCode]); // Exécute à chaque changement de cartItems ou selectedDiscountCode

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
              return <CartItem items={item} handleDelete={handleDelete} />;
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
                    <FontAwesomeIcon icon={faX} onClick={deleteDiscount} />
                    <p>{selectedDiscountCode.name}</p>
                  </div>
                  <p>-{selectedDiscountCode.discount} %</p>
                </div>
              )}
            </div>
            <div className="flex justify-between">
              <h5 className="font-bold">Total</h5>
              <p>{selectedDiscountCode ?cartFinalPrice.toFixed(2): cartPrice} €</p>
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
